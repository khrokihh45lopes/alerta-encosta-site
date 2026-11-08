import { Icone } from './Icone'

/** Botão de modo claro / escuro. O texto diz o que vai acontecer ao tocar. */
export function BotaoTema({ tema, onAlternar }) {
  const escuro = tema === 'escuro'
  return (
    <button type="button" className="botao botao--fantasma botao-tema" onClick={onAlternar}>
      <Icone nome={escuro ? 'sol' : 'lua'} />
      <span className="botao-tema__texto">{escuro ? 'Modo claro' : 'Modo escuro'}</span>
    </button>
  )
}
