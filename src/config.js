/**
 * Configuração da aplicação, lida das variáveis de ambiente do Vite (.env).
 * Nada de chave escrita direto no código.
 */
export const CONFIG_APP = Object.freeze({
  local: import.meta.env.VITE_LOCAL || 'Rio de Janeiro',
  apiUrl: (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/+$/, ''),
  thingspeak: Object.freeze({
    canalId: (import.meta.env.VITE_THINGSPEAK_CHANNEL_ID || '').trim(),
    chaveLeitura: (import.meta.env.VITE_THINGSPEAK_READ_KEY || '').trim(),
    resultados: 30,
  }),
  // O ESP32 publica a cada 20 s; buscar mais rápido que isso não traz nada novo.
  intervaloAtualizacaoMs: 20000,
})
