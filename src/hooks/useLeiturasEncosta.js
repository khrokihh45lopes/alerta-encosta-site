import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CONFIG_APP } from '../config'
import { analisarTendencia, converterFeeds } from '../domain/risco'
import { buscarFeeds } from '../services/thingspeakApi'
import { lerFeedsDoAparelho, salvarFeedsNoAparelho } from '../services/cacheLeituras'
import feedsDemo from '../data/leituras-demo.json'

/**
 * Leituras da encosta, com plano B em camadas:
 *   1. ao-vivo -> ThingSpeak respondeu
 *   2. cache   -> sem internet: última busca boa guardada no aparelho
 *   3. demo    -> canal não configurado (ou nunca conectou): dados simulados
 * Atualiza sozinho a cada 20 s quando há canal configurado, pausa com a aba
 * escondida e busca na hora quando a pessoa volta para a página.
 */
export function useLeiturasEncosta() {
  const [feeds, setFeeds] = useState([])
  const [origem, setOrigem] = useState('carregando')
  const [erro, setErro] = useState(null)
  const [carregando, setCarregando] = useState(true)
  // Número do pedido mais recente. useRef guarda um valor entre renderizações
  // sem redesenhar a tela quando ele muda.
  const ultimoPedido = useRef(0)

  const { canalId } = CONFIG_APP.thingspeak

  const carregar = useCallback(async () => {
    if (!canalId) {
      setFeeds(feedsDemo.feeds)
      setOrigem('demo')
      setCarregando(false)
      return
    }
    const pedido = ++ultimoPedido.current
    // Se um pedido mais novo começou enquanto este esperava a resposta, esta
    // resposta está velha: ignoramos para não sobrescrever o dado mais novo.
    const ficouVelho = () => pedido !== ultimoPedido.current
    setCarregando(true)
    try {
      const novos = await buscarFeeds(CONFIG_APP.thingspeak)
      if (ficouVelho()) return
      if (converterFeeds(novos).length === 0) throw new Error('o canal ainda não tem leituras válidas')
      salvarFeedsNoAparelho(novos)
      setFeeds(novos)
      setOrigem('ao-vivo')
      setErro(null)
    } catch (falha) {
      if (ficouVelho()) return
      setErro(falha.message)
      const guardados = lerFeedsDoAparelho()
      if (guardados.length > 0) {
        setFeeds(guardados)
        setOrigem('cache')
      } else {
        setFeeds(feedsDemo.feeds)
        setOrigem('demo')
      }
    } finally {
      if (!ficouVelho()) setCarregando(false)
    }
  }, [canalId])

  useEffect(() => {
    carregar()
    if (!canalId) return undefined

    // Com a aba escondida não adianta buscar: ninguém está olhando.
    function buscarSeVisivel() {
      if (!document.hidden) carregar()
    }
    const intervalo = setInterval(buscarSeVisivel, CONFIG_APP.intervaloAtualizacaoMs)
    // Quando a pessoa desbloqueia o celular e volta para a página, busca na hora.
    document.addEventListener('visibilitychange', buscarSeVisivel)
    return () => {
      clearInterval(intervalo)
      document.removeEventListener('visibilitychange', buscarSeVisivel)
    }
  }, [carregar, canalId])

  const leituras = useMemo(() => converterFeeds(feeds), [feeds])
  const tendencia = useMemo(() => analisarTendencia(leituras), [leituras])
  const atual = leituras.at(-1) ?? null

  return { leituras, atual, tendencia, origem, erro, carregando, atualizar: carregar }
}
