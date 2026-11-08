import { CONFIG_RISCO } from '../domain/risco'

/**
 * Régua graduada de 0 a 100, como a régua de um pluviômetro.
 * Zonas coloridas mostram onde começa ATENÇÃO (40) e PERIGO (70).
 */
const MARCAS = Array.from({ length: 11 }, (_, i) => i * 10)
const { ATENCAO, PERIGO } = CONFIG_RISCO.limites
const ROTULADAS = new Set([0, ATENCAO, PERIGO, 100])

export function ReguaRisco({ valor, rotulo = 'Índice de risco' }) {
  const posicao = Math.min(100, Math.max(0, valor))
  return (
    <div
      className="regua"
      role="meter"
      aria-label={rotulo}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(valor)}
      aria-valuetext={`${Math.round(valor)} de 100`}
    >
      <div className="regua__topo">
        <span className="regua__rotulo">{rotulo}</span>
        <span className="regua__valor">
          {Math.round(valor)}
          <small>/100</small>
        </span>
      </div>
      <div className="regua__trilho" style={{ '--atencao-inicio': `${ATENCAO}%`, '--perigo-inicio': `${PERIGO}%` }}>
        <span className="regua__marcador" style={{ left: `${posicao}%` }} />
      </div>
      <div className="regua__escala" aria-hidden="true">
        {MARCAS.map((marca) => (
          <span key={marca} className={ROTULADAS.has(marca) ? 'regua__marca regua__marca--forte' : 'regua__marca'} style={{ left: `${marca}%` }}>
            {ROTULADAS.has(marca) && <b>{marca}</b>}
          </span>
        ))}
      </div>
    </div>
  )
}
