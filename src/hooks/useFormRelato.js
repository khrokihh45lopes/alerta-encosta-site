import { useState } from 'react'
import { RELATO_VAZIO, validarRelato } from '../domain/relatos'

/**
 * Estado do formulário de relato: valores, erros de validação, envio e mensagem.
 * `onSalvar(valores)` é quem fala com a API (vem do useRelatos).
 * Para "zerar" o formulário ao trocar de relato, o componente usa a prop `key`.
 */
/**
 * Leva o foco ao primeiro campo com erro, na ordem em que aparecem na tela.
 * Quem usa teclado ou leitor de tela cai direto no que precisa corrigir.
 */
function focarPrimeiroErro(formulario, erros) {
  const campo = Array.from(formulario.elements).find((elemento) => erros[elemento.name])
  campo?.focus()
}

export function useFormRelato({ inicial = RELATO_VAZIO, onSalvar, mensagemSucesso }) {
  const [valores, setValores] = useState(() => ({ ...RELATO_VAZIO, ...inicial }))
  const [erros, setErros] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [mensagem, setMensagem] = useState(null)

  function alterarCampo(evento) {
    const { name, value } = evento.target
    setValores((atuais) => ({ ...atuais, [name]: value }))
    if (erros[name]) setErros((atuais) => ({ ...atuais, [name]: undefined }))
  }

  async function enviar(evento) {
    evento.preventDefault()
    const formulario = evento.currentTarget
    const encontrados = validarRelato(valores)
    setErros(encontrados)
    if (Object.keys(encontrados).length > 0) {
      setMensagem({ tipo: 'erro', texto: 'Confira os campos marcados.' })
      focarPrimeiroErro(formulario, encontrados)
      return false
    }

    setEnviando(true)
    setMensagem(null)
    try {
      await onSalvar(valores)
      setMensagem({ tipo: 'sucesso', texto: mensagemSucesso })
      setValores({ ...RELATO_VAZIO })
      return true
    } catch (falha) {
      setMensagem({ tipo: 'erro', texto: `Não deu para salvar: ${falha.message}. Tente de novo.` })
      return false
    } finally {
      setEnviando(false)
    }
  }

  return { valores, erros, enviando, mensagem, alterarCampo, enviar }
}
