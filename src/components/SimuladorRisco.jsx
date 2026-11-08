import { useState } from 'react'
import { CONFIG_RISCO, FAIXAS, calcularNivel, calcularRisco, classificarFaixa } from '../domain/risco'
import { formatarDecimal } from '../domain/formatos'
import { ReguaRisco } from './ReguaRisco'

/** Um controle deslizante com rótulo, valor e dica. */
function Controle({ id, rotulo, unidade, min, max, passo, valor, onMudar, dica }) {
  return (
    <div className="controle">
      <label className="controle__rotulo" htmlFor={id}>
        <span>{rotulo}</span>
        <output htmlFor={id}>
          {formatarDecimal(valor)}
          {unidade}
        </output>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={passo}
        value={valor}
        onChange={(evento) => onMudar(Number(evento.target.value))}
        aria-describedby={`${id}-dica`}
      />
      <p id={`${id}-dica`} className="controle__dica">
        {dica}
      </p>
    </div>
  )
}

/**
 * Interação 1 (Web Development): o morador mexe nos controles e vê,
 * na hora, a mesma conta que o sensor faz na encosta.
 */
export function SimuladorRisco() {
  const [umidade, setUmidade] = useState(60)
  const [inclinacao, setInclinacao] = useState(1)

  const { umidadeSolo: mU, inclinacao: mI } = CONFIG_RISCO.medidas
  const nivelUmidade = calcularNivel(umidade, mU.min, mU.max)
  const nivelInclinacao = calcularNivel(inclinacao, mI.min, mI.max)
  const risco = calcularRisco({ umidadeSolo: umidade, inclinacao })
  const faixa = classificarFaixa(risco)

  return (
    <section id="simulador" className="secao" aria-labelledby="simulador-titulo">
      <h2 id="simulador-titulo">Entenda o risco</h2>
      <p className="secao__intro">Mexa nos controles e veja como o alerta decide. É a mesma conta que o sensor faz lá na encosta.</p>

      <Controle id="sim-umidade" rotulo="Umidade do solo" unidade="%" min={0} max={100} passo={1} valor={umidade} onMudar={setUmidade} dica="Seco: perto de 30%. Encharcado: perto de 90%." />
      <Controle id="sim-inclinacao" rotulo="Inclinação do terreno" unidade="°" min={0} max={12} passo={0.5} valor={inclinacao} onMudar={setInclinacao} dica="Estaca em pé: 0°. Acima de 2°, a terra começou a se mover." />

      <ReguaRisco valor={risco} rotulo="Risco simulado" />

      <p className="resultado" data-faixa={faixa} aria-live="polite">
        <span className="selo" data-faixa={faixa}>
          {FAIXAS[faixa].nome}
        </span>
        <span>{FAIXAS[faixa].aviso}</span>
      </p>

      <details className="conta">
        <summary>Ver a conta</summary>
        <ol>
          <li>
            Umidade: ({formatarDecimal(umidade)} − {mU.min}) ÷ ({mU.max} − {mU.min}) × 100 = <strong>{formatarDecimal(nivelUmidade)}</strong>
          </li>
          <li>
            Inclinação: ({formatarDecimal(inclinacao)} − {mI.min}) ÷ ({mI.max} − {mI.min}) × 100 = <strong>{formatarDecimal(nivelInclinacao)}</strong>
          </li>
          <li>
            Risco: {mU.peso} × {formatarDecimal(nivelUmidade)} + {mI.peso} × {formatarDecimal(nivelInclinacao)} = <strong>{formatarDecimal(risco)}</strong>
          </li>
        </ol>
        <p>Cada nível vai de 0 a 100. A umidade pesa mais (0,6) porque é a chuva encharcando o solo que dispara os deslizamentos; a inclinação (0,4) confirma que a terra já se mexeu.</p>
      </details>
    </section>
  )
}
