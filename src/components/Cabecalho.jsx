import { BotaoTema } from './BotaoTema'
import { Marca } from './Marca'

const SECOES = [
  { href: '#agora', texto: 'Agora' },
  { href: '#simulador', texto: 'Entenda o risco' },
  { href: '#sinais', texto: 'Sinais de perigo' },
  { href: '#relatos', texto: 'Relatos' },
  { href: '#contatos', texto: 'Contatos' },
]

export function Cabecalho({ local, tema, onAlternarTema }) {
  return (
    <header className="cabecalho">
      <div className="container cabecalho__linha">
        <h1 className="cabecalho__titulo">
          <a className="cabecalho__marca" href="#agora">
            <Marca />
            <span className="cabecalho__nome">
              <strong>Alerta Encosta</strong>
              <small>{local}</small>
            </span>
          </a>
        </h1>
        <BotaoTema tema={tema} onAlternar={onAlternarTema} />
      </div>
      <nav className="container cabecalho__nav" aria-label="Seções da página">
        <ul>
          {SECOES.map((secao) => (
            <li key={secao.href}>
              <a href={secao.href}>{secao.texto}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
