/**
 * Curvas de nível, como nas cartas de risco geotécnico: o "morro" desenhado
 * atrás da placa de status. Geradas por conta (seno/cosseno), sem imagem externa.
 */
function gerarCurva(raio, fase, centroX, centroY) {
  const pontos = []
  for (let i = 0; i <= 72; i++) {
    const angulo = (i / 72) * Math.PI * 2
    const r = raio * (1 + 0.09 * Math.sin(3 * angulo + fase) + 0.05 * Math.cos(5 * angulo - fase * 1.7))
    pontos.push(`${(centroX + r * Math.cos(angulo) * 1.4).toFixed(1)} ${(centroY + r * Math.sin(angulo)).toFixed(1)}`)
  }
  return `M${pontos.join(' L')}Z`
}

const CURVAS = Array.from({ length: 11 }, (_, k) => gerarCurva(14 + k * 17, k * 0.55, 330, 70))

export function CurvasDeNivel({ className }) {
  return (
    <svg className={className} viewBox="0 0 400 260" preserveAspectRatio="xMaxYMin slice" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.1">
        {CURVAS.map((d, i) => (
          <path key={i} d={d} strokeWidth={i % 5 === 4 ? 2 : 1.1} />
        ))}
      </g>
    </svg>
  )
}
