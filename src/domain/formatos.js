/** Formatação no padrão brasileiro e no fuso do Rio. */
const FUSO = 'America/Sao_Paulo'

const decimal = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
const hora = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: FUSO })
const dia = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', timeZone: FUSO })

export const formatarDecimal = (valor) => decimal.format(valor)
export const formatarHora = (data) => hora.format(new Date(data))
export const formatarDia = (data) => dia.format(new Date(data))
export const formatarDataHora = (data) => `${formatarDia(data)} às ${formatarHora(data)}`
