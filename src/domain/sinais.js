/**
 * Sinais de que o terreno pode estar se movendo (orientação comum das Defesas Civis).
 * `critico: true` = sinal de movimento do solo -> sair de casa.
 */
export const SINAIS = Object.freeze([
  { id: 'rachaduras', texto: 'Rachaduras novas ou aumentando nas paredes, no chão ou no quintal', critico: true },
  { id: 'portas', texto: 'Portas e janelas emperrando de repente', critico: true },
  { id: 'muro', texto: 'Muro estufado, embarrigado ou tombando', critico: true },
  { id: 'arvores', texto: 'Árvores, postes ou cercas inclinando', critico: true },
  { id: 'agua', texto: 'Água minando do barranco ou descendo barrenta', critico: true },
  { id: 'barulho', texto: 'Estalos ou barulho de terra se mexendo', critico: true },
  { id: 'lixo', texto: 'Lixo ou entulho jogado na encosta', critico: false },
  { id: 'valas', texto: 'Valas e canaletas entupidas', critico: false },
])

/**
 * Avalia os sinais marcados.
 * Qualquer sinal crítico -> PERIGO. Só sinais de cuidado -> ATENCAO. Nenhum -> NORMAL.
 */
export function avaliarSinais(idsMarcados) {
  const marcados = SINAIS.filter((sinal) => idsMarcados.includes(sinal.id))
  const criticos = marcados.filter((sinal) => sinal.critico).length

  if (criticos > 0) {
    return {
      faixa: 'PERIGO',
      titulo: criticos === 1 ? 'Há 1 sinal de que a terra está se movendo' : `Há ${criticos} sinais de que a terra está se movendo`,
      orientacao: 'Saia de casa com a família agora, sem esperar a sirene, e ligue 199 para a Defesa Civil.',
    }
  }
  if (marcados.length > 0) {
    return {
      faixa: 'ATENCAO',
      titulo: 'Isso aumenta o risco quando chover',
      orientacao: 'Registre um relato abaixo para a comunidade e a associação organizarem a limpeza.',
    }
  }
  return {
    faixa: 'NORMAL',
    titulo: 'Nenhum sinal marcado',
    orientacao: 'Olhe a casa e o quintal depois de cada chuva forte. Se algo mudar, marque aqui.',
  }
}
