import { CONFIG_RISCO } from '../domain/risco'
import { formatarHora } from '../domain/formatos'

/** Linha do risco nas últimas leituras, com as linhas de ATENÇÃO (40) e PERIGO (70). */
const LARGURA = 320
const ALTURA = 96
const MARGEM = 6

function paraY(risco) {
  return MARGEM + (1 - risco / 100) * (ALTURA - 2 * MARGEM)
}

export function GraficoRisco({ leituras }) {
  if (leituras.length < 2) return null

  const passoX = (LARGURA - 2 * MARGEM) / (leituras.length - 1)
  const pontos = leituras.map((leitura, i) => [MARGEM + i * passoX, paraY(leitura.risco)])
  const linha = pontos.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const [ultimoX, ultimoY] = pontos.at(-1)
  const primeira = leituras[0]
  const ultima = leituras.at(-1)
  const maior = Math.max(...leituras.map((l) => l.risco))

  return (
    <figure className="grafico">
      <figcaption className="grafico__legenda">
        Risco nas últimas {leituras.length} leituras · {formatarHora(primeira.horario)} a {formatarHora(ultima.horario)}
      </figcaption>
      <svg
        viewBox={`0 0 ${LARGURA} ${ALTURA}`}
        role="img"
        aria-label={`O risco foi de ${Math.round(primeira.risco)} para ${Math.round(ultima.risco)}; o maior valor foi ${Math.round(maior)}.`}
        preserveAspectRatio="none"
      >
        <line className="grafico__limite grafico__limite--perigo" x1="0" x2={LARGURA} y1={paraY(CONFIG_RISCO.limites.PERIGO)} y2={paraY(CONFIG_RISCO.limites.PERIGO)} />
        <line className="grafico__limite grafico__limite--atencao" x1="0" x2={LARGURA} y1={paraY(CONFIG_RISCO.limites.ATENCAO)} y2={paraY(CONFIG_RISCO.limites.ATENCAO)} />
        <polyline className="grafico__linha" points={linha} />
        <circle className="grafico__ponto" cx={ultimoX} cy={ultimoY} r="4" />
      </svg>
    </figure>
  )
}
