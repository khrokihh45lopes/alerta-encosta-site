import { FAIXAS } from '../domain/risco'
import { formatarDecimal } from '../domain/formatos'
import { CurvasDeNivel } from './CurvasDeNivel'
import { FonteDados } from './FonteDados'
import { GraficoRisco } from './GraficoRisco'
import { Icone } from './Icone'
import { ReguaRisco } from './ReguaRisco'

/**
 * "Agora na encosta": a placa de status que o morador precisa entender em 3 segundos.
 * A cor da placa acompanha a faixa (NORMAL, ATENÇÃO, PERIGO).
 */
export function PainelAgora({ atual, leituras, tendencia, origem, erro, carregando, onAtualizar }) {
  if (!atual) {
    return (
      <section id="agora" className="agora agora--vazio" aria-busy={carregando}>
        <h2>Agora na encosta</h2>
        <p>{carregando ? 'Buscando a última leitura da encosta…' : 'Ainda não chegou nenhuma leitura do sensor.'}</p>
      </section>
    )
  }

  const faixa = FAIXAS[atual.faixa]

  return (
    <section id="agora" className="agora" data-faixa={atual.faixa} aria-labelledby="agora-titulo">
      <div className="agora__placa">
        <CurvasDeNivel className="agora__curvas" />
        <h2 id="agora-titulo" className="agora__rotulo">
          Agora na encosta
        </h2>
        <p className="agora__faixa" aria-live="polite">
          {faixa.nome}
        </p>
        <p className="agora__titulo">{faixa.titulo}</p>
        <p className="agora__aviso">{faixa.aviso}</p>

        {tendencia.tipo === 'PIORANDO' && (
          <p className="agora__tendencia">
            <Icone nome="sobe" tamanho={22} />
            <span>
              <strong>Piorando:</strong> o risco subiu {tendencia.passos} vezes seguidas.{' '}
              {atual.faixa === 'NORMAL' ? 'Fique de olho na chuva.' : 'Não espere a sirene para se preparar.'}
            </span>
          </p>
        )}
        {tendencia.tipo === 'MELHORANDO' && (
          <p className="agora__tendencia">
            <Icone nome="desce" tamanho={22} />
            <span>
              <strong>Melhorando:</strong> o risco caiu {tendencia.passos} vezes seguidas.
            </span>
          </p>
        )}

        {atual.faixa === 'PERIGO' && (
          <a className="botao botao--sos" href="tel:199">
            <Icone nome="telefone" tamanho={22} />
            Ligar 199 · Defesa Civil
          </a>
        )}
      </div>

      <div className="agora__dados">
        <FonteDados origem={origem} erro={erro} horario={atual.horario} carregando={carregando} onAtualizar={onAtualizar} />
        <ReguaRisco valor={atual.risco} />
        <dl className="medidas">
          <div className="medida">
            <dt>
              <Icone nome="gota" tamanho={18} /> Umidade do solo
            </dt>
            <dd>
              {formatarDecimal(atual.medidas.umidadeSolo)}
              <small>%</small>
            </dd>
          </div>
          <div className="medida">
            <dt>
              <Icone nome="terreno" tamanho={18} /> Inclinação do terreno
            </dt>
            <dd>
              {formatarDecimal(atual.medidas.inclinacao)}
              <small>°</small>
            </dd>
          </div>
        </dl>
        <GraficoRisco leituras={leituras} />
      </div>
    </section>
  )
}
