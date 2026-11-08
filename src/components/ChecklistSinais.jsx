import { useState } from 'react'
import { SINAIS, avaliarSinais } from '../domain/sinais'
import { FAIXAS } from '../domain/risco'

/**
 * Interação 2 (Web Development): o morador marca o que está vendo em casa
 * e recebe uma orientação na hora.
 */
export function ChecklistSinais() {
  const [marcados, setMarcados] = useState([])
  const resultado = avaliarSinais(marcados)

  function alternar(id) {
    setMarcados((atuais) => (atuais.includes(id) ? atuais.filter((item) => item !== id) : [...atuais, id]))
  }

  return (
    <section id="sinais" className="secao" aria-labelledby="sinais-titulo">
      <h2 id="sinais-titulo">Sinais de perigo na sua casa</h2>
      <p className="secao__intro">Depois de uma chuva forte, olhe a casa e o quintal. Marque o que você está vendo.</p>

      <fieldset className="lista-sinais">
        <legend className="visually-hidden">Sinais que você está vendo</legend>
        {SINAIS.map((sinal) => (
          <label key={sinal.id} className="sinal" data-critico={sinal.critico}>
            <input type="checkbox" checked={marcados.includes(sinal.id)} onChange={() => alternar(sinal.id)} />
            <span>{sinal.texto}</span>
          </label>
        ))}
      </fieldset>

      <div className="resultado resultado--bloco" data-faixa={resultado.faixa} aria-live="polite">
        <span className="selo" data-faixa={resultado.faixa}>
          {FAIXAS[resultado.faixa].nome}
        </span>
        <div>
          <p className="resultado__titulo">{resultado.titulo}</p>
          <p>{resultado.orientacao}</p>
          {resultado.faixa === 'PERIGO' && (
            <a className="botao botao--perigo" href="tel:199">
              Ligar 199 · Defesa Civil
            </a>
          )}
        </div>
      </div>

      {marcados.length > 0 && (
        <button type="button" className="botao botao--fantasma botao--pequeno" onClick={() => setMarcados([])}>
          Desmarcar tudo
        </button>
      )}
    </section>
  )
}
