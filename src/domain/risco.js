/**
 * Regras do Índice de Risco de deslizamento.
 *
 * São OS MESMOS valores do ESP32 (esp32/sketch.ino) e do Python (python/main.py):
 * o morador vê a mesma faixa no OLED da encosta, no terminal do agente e no celular.
 *
 *   nivel = (valor - min) / (max - min) * 100   (limitado entre 0 e 100)
 *   risco = 0,6 * nivel_umidade + 0,4 * nivel_inclinacao
 */
export const CONFIG_RISCO = Object.freeze({
  medidas: {
    umidadeSolo: { campo: 'field1', rotulo: 'Umidade do solo', unidade: '%', min: 30, max: 90, peso: 0.6 },
    inclinacao: { campo: 'field2', rotulo: 'Inclinação do terreno', unidade: '°', min: 0, max: 10, peso: 0.4 },
  },
  limites: { ATENCAO: 40, PERIGO: 70 },
  altasParaPiorando: 3,
})

export const FAIXAS = Object.freeze({
  NORMAL: {
    id: 'NORMAL',
    nome: 'Normal',
    titulo: 'Sem sinal de risco agora',
    aviso: 'Mantenha valas e calhas limpas e não jogue lixo na encosta.',
  },
  ATENCAO: {
    id: 'ATENCAO',
    nome: 'Atenção',
    titulo: 'Solo encharcado',
    aviso: 'Separe documentos, remédios e lanterna e fique atento à sirene.',
  },
  PERIGO: {
    id: 'PERIGO',
    nome: 'Perigo',
    titulo: 'Risco de deslizamento',
    aviso: 'Saia de casa e vá para o ponto de apoio. Defesa Civil: 199.',
  },
})

export const AVISO_PIORANDO = 'A situação está piorando: não espere a sirene para se preparar.'

/** Converte um valor bruto em nível de 0 a 100 dentro da faixa [min, max]. */
export function calcularNivel(valor, min, max) {
  const nivel = ((valor - min) / (max - min)) * 100
  return Math.min(100, Math.max(0, nivel))
}

/** Soma ponderada dos níveis. `medidas` = { umidadeSolo: 72, inclinacao: 1.5 }. */
export function calcularRisco(medidas, config = CONFIG_RISCO) {
  let risco = 0
  for (const [nome, valor] of Object.entries(medidas)) {
    const medida = config.medidas[nome]
    risco += medida.peso * calcularNivel(valor, medida.min, medida.max)
  }
  return Math.round(risco * 10) / 10
}

/** NORMAL abaixo de 40, ATENCAO de 40 a 70, PERIGO a partir de 70. */
export function classificarFaixa(risco, config = CONFIG_RISCO) {
  if (risco >= config.limites.PERIGO) return 'PERIGO'
  if (risco >= config.limites.ATENCAO) return 'ATENCAO'
  return 'NORMAL'
}

/**
 * Converte um "feed" do ThingSpeak ({ entry_id, created_at, field1, field2 })
 * em leitura. Devolve null se faltar algum campo (sensor falhou naquele envio).
 */
export function feedParaLeitura(feed, config = CONFIG_RISCO) {
  const medidas = {}
  for (const [nome, medida] of Object.entries(config.medidas)) {
    const valor = Number.parseFloat(feed?.[medida.campo])
    if (!Number.isFinite(valor)) return null
    medidas[nome] = valor
  }
  const horario = new Date(feed.created_at)
  if (Number.isNaN(horario.getTime())) return null

  const risco = calcularRisco(medidas, config)
  return { id: feed.entry_id, horario, medidas, risco, faixa: classificarFaixa(risco, config) }
}

/** Converte a lista de feeds, descarta os inválidos e ordena do mais antigo ao mais novo. */
export function converterFeeds(feeds, config = CONFIG_RISCO) {
  return feeds
    .map((feed) => feedParaLeitura(feed, config))
    .filter((leitura) => leitura !== null)
    .sort((a, b) => a.id - b.id)
}

/** Conta quantas variações seguidas, no fim da série, obedecem à comparação. */
function contarVariacoesFinais(leituras, comparar) {
  let seguidas = 0
  for (let i = leituras.length - 1; i > 0; i--) {
    if (!comparar(leituras[i].risco, leituras[i - 1].risco)) break
    seguidas++
  }
  return seguidas
}

/** PIORANDO com 3+ altas seguidas no fim, MELHORANDO com 3+ quedas, senão ESTAVEL. */
export function analisarTendencia(leituras, minimo = CONFIG_RISCO.altasParaPiorando) {
  const altas = contarVariacoesFinais(leituras, (atual, anterior) => atual > anterior)
  if (altas >= minimo) return { tipo: 'PIORANDO', passos: altas }
  const quedas = contarVariacoesFinais(leituras, (atual, anterior) => atual < anterior)
  if (quedas >= minimo) return { tipo: 'MELHORANDO', passos: quedas }
  return { tipo: 'ESTAVEL', passos: 0 }
}
