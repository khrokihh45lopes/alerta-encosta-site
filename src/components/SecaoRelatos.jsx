import { useState } from 'react'
import { CONFIG_APP } from '../config'
import { STATUS_RELATO, contarPorStatus } from '../domain/relatos'
import { useRelatos } from '../hooks/useRelatos'
import { CartaoRelato } from './CartaoRelato'
import { FormRelato } from './FormRelato'
import { Icone } from './Icone'

const FILTROS = [['todos', 'Todos'], ...Object.entries(STATUS_RELATO)]

/**
 * Relatos da comunidade: CRUD completo na API externa.
 * Criar (formulário), Ler (lista + filtro), Atualizar (editar e mudar situação), Excluir.
 */
export function SecaoRelatos() {
  const { relatos, carregando, erro, recarregar, criar, editar, mudarStatus, remover } = useRelatos()
  const [filtro, setFiltro] = useState('todos')
  const [emEdicao, setEmEdicao] = useState(null)

  const contagem = contarPorStatus(relatos)
  const visiveis = filtro === 'todos' ? relatos : relatos.filter((relato) => relato.status === filtro)

  async function salvarEdicao(valores) {
    await editar(emEdicao, valores)
    setEmEdicao(null)
  }

  return (
    <section id="relatos" className="secao secao--larga" aria-labelledby="relatos-titulo">
      <h2 id="relatos-titulo">Relatos da comunidade</h2>
      <p className="secao__intro">Viu rachadura, muro estufado ou vala entupida? Avise aqui. O agente comunitário acompanha cada relato até resolver.</p>

      <div className="relatos">
        <div className="relatos__form">
          {emEdicao ? (
            <>
              <h3 className="relatos__subtitulo">Editando relato</h3>
              <FormRelato key={emEdicao.id} relato={emEdicao} onSalvar={salvarEdicao} onCancelar={() => setEmEdicao(null)} />
            </>
          ) : (
            <>
              <h3 className="relatos__subtitulo">
                <Icone nome="mais" /> Novo relato
              </h3>
              <FormRelato key="novo" onSalvar={criar} />
            </>
          )}
        </div>

        <div className="relatos__lista">
          <div className="filtros" role="group" aria-label="Filtrar relatos por situação">
            {FILTROS.map(([valor, rotulo]) => (
              <button key={valor} type="button" className="filtro" aria-pressed={filtro === valor} onClick={() => setFiltro(valor)}>
                {rotulo} <span className="filtro__qtd">{contagem[valor]}</span>
              </button>
            ))}
          </div>

          {carregando && <p className="estado">Carregando relatos…</p>}

          {!carregando && erro && (
            <div className="estado estado--erro" role="alert">
              <p>
                <strong>Os relatos estão fora do ar agora</strong> ({erro}).
              </p>
              <p className="estado__tecnico">Servidor: {CONFIG_APP.apiUrl}. Rodando local? Use <code>npm run api</code>.</p>
              <button type="button" className="botao botao--fantasma botao--pequeno" onClick={recarregar}>
                <Icone nome="atualizar" tamanho={18} /> Tentar de novo
              </button>
            </div>
          )}

          {!carregando && !erro && visiveis.length === 0 && (
            <p className="estado">{filtro === 'todos' ? 'Nenhum relato ainda. Seja o primeiro a avisar.' : 'Nenhum relato nessa situação.'}</p>
          )}

          <ul className="lista-relatos">
            {visiveis.map((relato) => (
              <li key={relato.id}>
                <CartaoRelato
                  relato={relato}
                  onEditar={(escolhido) => {
                    setEmEdicao(escolhido)
                    document.getElementById('relatos')?.scrollIntoView({ block: 'start' })
                  }}
                  onMudarStatus={mudarStatus}
                  onExcluir={remover}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
