/**
 * Guarda no aparelho a última busca que deu certo.
 * Se a internet cair no meio da chuva, a página ainda mostra a última leitura conhecida.
 */
const CHAVE = 'alerta-encosta:ultimas-leituras'

export function salvarFeedsNoAparelho(feeds) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify({ salvoEm: new Date().toISOString(), feeds }))
  } catch {
    // Navegador sem espaço ou em modo privado: segue sem cache.
  }
}

export function lerFeedsDoAparelho() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE))
    return Array.isArray(dados?.feeds) ? dados.feeds : []
  } catch {
    return []
  }
}
