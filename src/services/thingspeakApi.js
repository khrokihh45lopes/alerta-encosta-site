import { requisitarJson } from './http'

/**
 * Busca as últimas leituras publicadas pelo ESP32 no ThingSpeak.
 * Documentação: https://www.mathworks.com/help/thingspeak/readdata.html
 */
export async function buscarFeeds({ canalId, chaveLeitura, resultados }) {
  const parametros = new URLSearchParams({ results: String(resultados) })
  if (chaveLeitura) parametros.set('api_key', chaveLeitura)

  const url = `https://api.thingspeak.com/channels/${encodeURIComponent(canalId)}/feeds.json?${parametros}`
  const dados = await requisitarJson(url)

  if (!dados || !Array.isArray(dados.feeds)) {
    throw new Error('o canal não devolveu leituras (ele é público?)')
  }
  return dados.feeds
}
