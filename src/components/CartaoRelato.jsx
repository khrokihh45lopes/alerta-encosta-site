import { useState } from 'react'
import { GRAVIDADES, STATUS_RELATO } from '../domain/relatos'
import { formatarDataHora } from '../domain/formatos'
import { Icone } from './Icone'

/** Um relato na lista, com as ações de mudar situação, editar e excluir. */
export function CartaoRelato({ relato, onEditar, onMudarStatus, onExcluir }) {
  const [confirmando, setConfirmando] = useState(false)
  const [ocupado, setOcupado] = useState(false)
  const [erro, setErro] = useState(null)

  async function executar(acao) {
    setOcupado(true)
    setErro(null)
    try {
      await acao()
    } catch (falha) {
      setErro(`Não deu certo: ${falha.message}.`)
      setOcupado(false)
    }
  }

  async function mudarStatus(evento) {
    await executar(() => onMudarStatus(relato, evento.target.value))
    setOcupado(false)
  }

  const idStatus = `status-${relato.id}`

  return (
    <article className="relato" data-gravidade={relato.gravidade} data-status={relato.status}>
      <header className="relato__topo">
        <h3>{relato.tipo}</h3>
        <span className="selo-status" data-status={relato.status}>
          {STATUS_RELATO[relato.status] ?? relato.status}
        </span>
      </header>

      <p className="relato__local">
        <Icone nome="pin" tamanho={18} />
        {relato.local}
      </p>
      {relato.descricao && <p className="relato__descricao">{relato.descricao}</p>}
      <p className="relato__meta">
        Gravidade <strong>{GRAVIDADES[relato.gravidade] ?? relato.gravidade}</strong> · {formatarDataHora(relato.criadoEm)}
      </p>

      <div className="relato__acoes">
        <label className="relato__situacao" htmlFor={idStatus}>
          Situação
          <select id={idStatus} value={relato.status} onChange={mudarStatus} disabled={ocupado}>
            {Object.entries(STATUS_RELATO).map(([valor, rotulo]) => (
              <option key={valor} value={valor}>
                {rotulo}
              </option>
            ))}
          </select>
        </label>

        <button type="button" className="botao botao--fantasma botao--pequeno" onClick={() => onEditar(relato)} disabled={ocupado}>
          <Icone nome="lapis" tamanho={18} /> Editar
        </button>

        {confirmando ? (
          <span className="relato__confirmar" role="group" aria-label="Confirmar exclusão">
            <button type="button" className="botao botao--perigo botao--pequeno" onClick={() => executar(() => onExcluir(relato.id))} disabled={ocupado}>
              {ocupado ? 'Excluindo…' : 'Sim, excluir'}
            </button>
            <button type="button" className="botao botao--fantasma botao--pequeno" onClick={() => setConfirmando(false)} disabled={ocupado}>
              Não
            </button>
          </span>
        ) : (
          <button type="button" className="botao botao--fantasma botao--pequeno" onClick={() => setConfirmando(true)} disabled={ocupado}>
            <Icone nome="lixeira" tamanho={18} /> Excluir
          </button>
        )}
      </div>

      {erro && (
        <p className="aviso" data-tipo="erro" role="alert">
          {erro}
        </p>
      )}
    </article>
  )
}
