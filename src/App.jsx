import { CONFIG_APP } from './config'
import { useLeiturasEncosta } from './hooks/useLeiturasEncosta'
import { useTema } from './hooks/useTema'
import { Cabecalho } from './components/Cabecalho'
import { ChecklistSinais } from './components/ChecklistSinais'
import { Contatos } from './components/Contatos'
import { PainelAgora } from './components/PainelAgora'
import { Rodape } from './components/Rodape'
import { SecaoRelatos } from './components/SecaoRelatos'
import { SimuladorRisco } from './components/SimuladorRisco'

export default function App() {
  const { tema, alternarTema } = useTema()
  const encosta = useLeiturasEncosta()

  return (
    <>
      <a className="pular visually-hidden" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Cabecalho local={CONFIG_APP.local} tema={tema} onAlternarTema={alternarTema} />
      <main id="conteudo" className="container principal">
        <PainelAgora
          atual={encosta.atual}
          leituras={encosta.leituras}
          tendencia={encosta.tendencia}
          origem={encosta.origem}
          erro={encosta.erro}
          carregando={encosta.carregando}
          onAtualizar={encosta.atualizar}
        />
        <div className="dupla">
          <SimuladorRisco />
          <ChecklistSinais />
        </div>
        <SecaoRelatos />
        <Contatos />
      </main>
      <Rodape />
    </>
  )
}
