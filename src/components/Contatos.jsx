import { Icone } from './Icone'

const TELEFONES = [
  { numero: '199', nome: 'Defesa Civil', quando: 'Risco de deslizamento, rachadura, desabamento' },
  { numero: '193', nome: 'Bombeiros', quando: 'Pessoa presa, soterrada ou em perigo' },
  { numero: '192', nome: 'SAMU', quando: 'Pessoa ferida ou passando mal' },
]

const MOCHILA = ['Documentos num saco plástico', 'Remédios de uso contínuo', 'Lanterna e pilhas', 'Carregador ou bateria do celular', 'Água e um agasalho']

export function Contatos() {
  return (
    <section id="contatos" className="secao secao--larga" aria-labelledby="contatos-titulo">
      <h2 id="contatos-titulo">Contatos e preparo</h2>

      <div className="contatos">
        <ul className="telefones">
          {TELEFONES.map((tel) => (
            <li key={tel.numero}>
              <a className="telefone" href={`tel:${tel.numero}`}>
                <span className="telefone__numero">{tel.numero}</span>
                <span className="telefone__texto">
                  <strong>{tel.nome}</strong>
                  <span>{tel.quando}</span>
                </span>
                <Icone nome="telefone" />
              </a>
            </li>
          ))}
          <li>
            <a className="telefone" href="sms:40199?body=SEU%20CEP">
              <span className="telefone__numero telefone__numero--sms">40199</span>
              <span className="telefone__texto">
                <strong>Alerta por SMS, de graça</strong>
                <span>Mande o CEP da sua casa por SMS e receba os alertas da Defesa Civil</span>
              </span>
              <Icone nome="mensagem" />
            </a>
          </li>
        </ul>

        <div className="mochila">
          <h3>Deixe pronta uma mochila de emergência</h3>
          <ul>
            {MOCHILA.map((item) => (
              <li key={item}>
                <Icone nome="check" tamanho={18} />
                {item}
              </li>
            ))}
          </ul>
          <p>
            <strong>Ponto de apoio:</strong> pergunte ao agente comunitário de Defesa Civil qual é o mais perto da sua casa e combine com a família o caminho até lá.
          </p>
        </div>
      </div>
    </section>
  )
}
