import { useCallback, useEffect, useMemo, useState } from 'react'
import { aplicarEdicao, criarRelatoNovo, ordenarRelatos } from '../domain/relatos'
import { atualizarRelato, criarRelato, listarRelatos, removerRelato } from '../services/relatosApi'

/**
 * Estado dos relatos da comunidade + operações de CRUD na API.
 * Os componentes só chamam criar / editar / mudarStatus / remover;
 * não sabem que existe fetch nem URL.
 */
export function useRelatos() {
  const [relatos, setRelatos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  const recarregar = useCallback(async () => {
    setCarregando(true)
    setErro(null)
    try {
      const lista = await listarRelatos()
      setRelatos(Array.isArray(lista) ? lista : [])
    } catch (falha) {
      setErro(falha.message)
    } finally {
      setCarregando(false)
    }
  }, [])

  useEffect(() => {
    recarregar()
  }, [recarregar])

  const substituir = useCallback((salvo) => {
    setRelatos((lista) => lista.map((relato) => (relato.id === salvo.id ? salvo : relato)))
  }, [])

  const criar = useCallback(async (valores) => {
    const novo = await criarRelato(criarRelatoNovo(valores))
    setRelatos((lista) => [...lista, novo])
    return novo
  }, [])

  const editar = useCallback(
    async (relato, valores) => {
      const salvo = await atualizarRelato(aplicarEdicao(relato, valores))
      substituir(salvo)
      return salvo
    },
    [substituir],
  )

  const mudarStatus = useCallback(
    async (relato, status) => {
      const salvo = await atualizarRelato({ ...relato, status, atualizadoEm: new Date().toISOString() })
      substituir(salvo)
      return salvo
    },
    [substituir],
  )

  const remover = useCallback(async (id) => {
    await removerRelato(id)
    setRelatos((lista) => lista.filter((relato) => relato.id !== id))
  }, [])

  const ordenados = useMemo(() => ordenarRelatos(relatos), [relatos])

  return { relatos: ordenados, carregando, erro, recarregar, criar, editar, mudarStatus, remover }
}
