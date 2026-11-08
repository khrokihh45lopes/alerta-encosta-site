import { useCallback, useEffect, useState } from 'react'

/**
 * Modo claro / escuro.
 * - Começa pelo que a pessoa escolheu antes (localStorage) ou pelo tema do celular.
 * - Aplica o tema mudando o atributo data-theme da tag <html> (manipulação do DOM);
 *   o CSS em styles/tokens.css troca as cores a partir desse atributo.
 */
const CHAVE = 'alerta-encosta:tema'

function temaInicial() {
  try {
    const salvo = localStorage.getItem(CHAVE)
    if (salvo === 'claro' || salvo === 'escuro') return salvo
  } catch {
    // localStorage bloqueado: usa o tema do sistema
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro'
}

export function useTema() {
  const [tema, setTema] = useState(temaInicial)

  useEffect(() => {
    const raiz = document.documentElement
    raiz.dataset.theme = tema === 'escuro' ? 'dark' : 'light'
    // Pinta a barra do navegador no celular com a mesma cor do fundo da página
    const corFundo = getComputedStyle(document.body).backgroundColor
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', corFundo)
    try {
      localStorage.setItem(CHAVE, tema)
    } catch {
      // segue sem lembrar a escolha
    }
  }, [tema])

  const alternarTema = useCallback(() => {
    setTema((atual) => (atual === 'escuro' ? 'claro' : 'escuro'))
  }, [])

  return { tema, alternarTema }
}
