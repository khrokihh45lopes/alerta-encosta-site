/**
 * Regras de negócio dos relatos da comunidade (sinais de risco vistos na encosta).
 */
export const TIPOS_RELATO = Object.freeze([
  'Rachadura em parede ou chão',
  'Muro estufado ou inclinado',
  'Água minando do barranco',
  'Árvore ou poste inclinando',
  'Pequeno deslizamento de terra',
  'Lixo ou entulho na encosta',
  'Vala ou canaleta entupida',
])

export const GRAVIDADES = Object.freeze({ baixa: 'Baixa', media: 'Média', alta: 'Alta' })

export const STATUS_RELATO = Object.freeze({
  aberto: 'Aberto',
  em_analise: 'Em análise',
  resolvido: 'Resolvido',
})

export const LIMITES_RELATO = Object.freeze({ localMin: 5, localMax: 80, descricaoMax: 280 })

export const RELATO_VAZIO = Object.freeze({ tipo: '', local: '', gravidade: 'media', descricao: '' })

// Telefone (8 ou 9 dígitos, com ou sem DDD) ou CPF: dado pessoal não entra no relato.
const PADRAO_DADO_PESSOAL = /(\d[\s.-]?){8,}/

/** Diz se o texto parece ter telefone, CPF ou outro número pessoal longo. */
export function contemDadoPessoal(texto) {
  return PADRAO_DADO_PESSOAL.test(texto)
}

/** Valida o formulário. Devolve { campo: 'mensagem' } (objeto vazio = tudo certo). */
export function validarRelato(valores) {
  const erros = {}
  const local = valores.local.trim()
  const descricao = valores.descricao.trim()

  if (!TIPOS_RELATO.includes(valores.tipo)) {
    erros.tipo = 'Escolha o que você viu.'
  }
  if (local.length < LIMITES_RELATO.localMin) {
    erros.local = 'Diga um ponto de referência (ex.: "Beco 3, perto da caixa d\'água").'
  } else if (local.length > LIMITES_RELATO.localMax) {
    erros.local = `Use no máximo ${LIMITES_RELATO.localMax} letras.`
  } else if (contemDadoPessoal(local)) {
    erros.local = 'Não coloque telefone, CPF ou número de documento.'
  }
  if (!(valores.gravidade in GRAVIDADES)) {
    erros.gravidade = 'Escolha a gravidade.'
  }
  if (descricao.length > LIMITES_RELATO.descricaoMax) {
    erros.descricao = `Use no máximo ${LIMITES_RELATO.descricaoMax} letras.`
  } else if (contemDadoPessoal(descricao)) {
    erros.descricao = 'Não coloque telefone, CPF ou número de documento.'
  }
  return erros
}

/** Campos do formulário já limpos (sem espaços sobrando). */
function limparCampos(valores) {
  return {
    tipo: valores.tipo,
    local: valores.local.trim(),
    gravidade: valores.gravidade,
    descricao: valores.descricao.trim(),
  }
}

/** Monta um relato novo para enviar à API: começa sempre "aberto". */
export function criarRelatoNovo(valores, agora = new Date()) {
  return { ...limparCampos(valores), status: 'aberto', criadoEm: agora.toISOString() }
}

/** Junta as alterações do formulário ao relato existente. */
export function aplicarEdicao(relato, valores, agora = new Date()) {
  return { ...relato, ...limparCampos(valores), atualizadoEm: agora.toISOString() }
}

const ORDEM_STATUS = { aberto: 0, em_analise: 1, resolvido: 2 }
const ORDEM_GRAVIDADE = { alta: 0, media: 1, baixa: 2 }

/** Abertos primeiro; dentro do status, os mais graves; depois os mais recentes. */
export function ordenarRelatos(relatos) {
  return [...relatos].sort(
    (a, b) =>
      (ORDEM_STATUS[a.status] ?? 9) - (ORDEM_STATUS[b.status] ?? 9) ||
      (ORDEM_GRAVIDADE[a.gravidade] ?? 9) - (ORDEM_GRAVIDADE[b.gravidade] ?? 9) ||
      new Date(b.criadoEm) - new Date(a.criadoEm),
  )
}

/** Quantos relatos há em cada status (para os filtros). */
export function contarPorStatus(relatos) {
  const contagem = { todos: relatos.length, aberto: 0, em_analise: 0, resolvido: 0 }
  for (const relato of relatos) {
    if (relato.status in contagem) contagem[relato.status]++
  }
  return contagem
}
