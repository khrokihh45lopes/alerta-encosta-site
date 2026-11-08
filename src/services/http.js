/**
 * fetch com tempo-limite e mensagens de erro em português.
 * Toda conversa com API externa passa por aqui.
 */
export async function requisitarJson(url, { metodo = 'GET', corpo, timeoutMs = 8000 } = {}) {
  const controle = new AbortController()
  const temporizador = setTimeout(() => controle.abort(), timeoutMs)

  try {
    const resposta = await fetch(url, {
      method: metodo,
      headers: corpo ? { 'Content-Type': 'application/json' } : undefined,
      body: corpo ? JSON.stringify(corpo) : undefined,
      signal: controle.signal,
    })
    if (!resposta.ok) {
      throw new Error(`o servidor respondeu ${resposta.status}`)
    }
    const texto = await resposta.text()
    return texto ? JSON.parse(texto) : null
  } catch (erro) {
    if (erro.name === 'AbortError') throw new Error('o servidor demorou demais para responder')
    if (erro instanceof TypeError) throw new Error('sem conexão com o servidor')
    if (erro instanceof SyntaxError) throw new Error('resposta do servidor em formato inesperado')
    throw erro
  } finally {
    clearTimeout(temporizador)
  }
}
