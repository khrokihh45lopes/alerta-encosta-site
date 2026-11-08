import { GRAVIDADES, LIMITES_RELATO, TIPOS_RELATO } from '../domain/relatos'
import { useFormRelato } from '../hooks/useFormRelato'

/** Mensagem de erro ligada ao campo (lida pelo leitor de tela via aria-describedby). */
function ErroCampo({ id, texto }) {
  if (!texto) return null
  return (
    <p id={id} className="campo__erro">
      {texto}
    </p>
  )
}

/**
 * Formulário de relato: serve para CRIAR (sem `relato`) e para EDITAR (com `relato`).
 * Toda a lógica de estado e validação está no hook useFormRelato.
 */
export function FormRelato({ relato, onSalvar, onCancelar }) {
  const editando = Boolean(relato)
  const { valores, erros, enviando, mensagem, alterarCampo, enviar } = useFormRelato({
    inicial: relato,
    onSalvar,
    mensagemSucesso: editando ? 'Relato atualizado.' : 'Relato enviado. Obrigado por avisar a comunidade!',
  })
  const prefixo = editando ? `editar-${relato.id}` : 'novo'

  return (
    <form className="form-relato" onSubmit={enviar} noValidate aria-label={editando ? 'Editar relato' : 'Novo relato'}>
      <div className="campo">
        <label htmlFor={`${prefixo}-tipo`}>O que você viu?</label>
        <select
          id={`${prefixo}-tipo`}
          name="tipo"
          value={valores.tipo}
          onChange={alterarCampo}
          aria-invalid={Boolean(erros.tipo)}
          aria-describedby={erros.tipo ? `${prefixo}-tipo-erro` : undefined}
        >
          <option value="">Escolha uma opção</option>
          {TIPOS_RELATO.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
        <ErroCampo id={`${prefixo}-tipo-erro`} texto={erros.tipo} />
      </div>

      <div className="campo">
        <label htmlFor={`${prefixo}-local`}>
          Onde? <span className="campo__complemento">(ponto de referência)</span>
        </label>
        <input
          id={`${prefixo}-local`}
          name="local"
          type="text"
          value={valores.local}
          onChange={alterarCampo}
          maxLength={LIMITES_RELATO.localMax}
          autoComplete="off"
          placeholder="Ex.: Beco 3, perto da caixa d’água…"
          aria-invalid={Boolean(erros.local)}
          aria-describedby={`${prefixo}-local-dica${erros.local ? ` ${prefixo}-local-erro` : ''}`}
        />
        <p id={`${prefixo}-local-dica`} className="campo__dica">
          Não coloque nome, telefone nem número da casa de ninguém.
        </p>
        <ErroCampo id={`${prefixo}-local-erro`} texto={erros.local} />
      </div>

      <fieldset className="campo">
        <legend>Gravidade</legend>
        <div className="opcoes">
          {Object.entries(GRAVIDADES).map(([valor, rotulo]) => (
            <label key={valor} className="opcao" data-gravidade={valor}>
              <input type="radio" name="gravidade" value={valor} checked={valores.gravidade === valor} onChange={alterarCampo} />
              <span>{rotulo}</span>
            </label>
          ))}
        </div>
        <ErroCampo id={`${prefixo}-gravidade-erro`} texto={erros.gravidade} />
      </fieldset>

      <div className="campo">
        <label htmlFor={`${prefixo}-descricao`}>
          Detalhes <span className="campo__opcional">(opcional)</span>
        </label>
        <textarea
          id={`${prefixo}-descricao`}
          name="descricao"
          rows={3}
          value={valores.descricao}
          onChange={alterarCampo}
          maxLength={LIMITES_RELATO.descricaoMax}
          aria-invalid={Boolean(erros.descricao)}
          aria-describedby={`${prefixo}-descricao-contador${erros.descricao ? ` ${prefixo}-descricao-erro` : ''}`}
        />
        <p id={`${prefixo}-descricao-contador`} className="campo__dica">
          {valores.descricao.length} de {LIMITES_RELATO.descricaoMax} letras
        </p>
        <ErroCampo id={`${prefixo}-descricao-erro`} texto={erros.descricao} />
      </div>

      <div className="form-relato__acoes">
        <button type="submit" className="botao botao--primario" disabled={enviando}>
          {enviando ? 'Salvando…' : editando ? 'Salvar alterações' : 'Enviar relato'}
        </button>
        {onCancelar && (
          <button type="button" className="botao botao--fantasma" onClick={onCancelar} disabled={enviando}>
            Cancelar
          </button>
        )}
      </div>

      {/* A região "aria-live" existe desde o início: assim o leitor de tela
          percebe quando a mensagem aparece e lê "Relato enviado" em voz alta. */}
      <div className="form-relato__status" aria-live="polite">
        {mensagem && (
          <p className="aviso" data-tipo={mensagem.tipo} role={mensagem.tipo === 'erro' ? 'alert' : undefined}>
            {mensagem.texto}
          </p>
        )}
      </div>
    </form>
  )
}
