import { formatarDataHora, formatarHora } from '../domain/formatos'
import { Icone } from './Icone'

/** Diz de onde vem a leitura: ao vivo, guardada no aparelho (sem internet) ou demonstração. */
export function FonteDados({ origem, erro, horario, carregando, onAtualizar }) {
  let icone = 'aoVivo'
  let texto = `Ao vivo · leitura das ${formatarHora(horario)}`
  if (origem === 'cache') {
    icone = 'semSinal'
    texto = `Sem internet · última leitura salva: ${formatarDataHora(horario)}`
  } else if (origem === 'demo') {
    icone = 'alerta'
    texto = `Demonstração · dados simulados de ${formatarDataHora(horario)}`
  }

  return (
    <div className="fonte" data-origem={origem}>
      <p className="fonte__texto">
        <Icone nome={icone} tamanho={18} />
        <span>{texto}</span>
      </p>
      {origem !== 'demo' && (
        <button type="button" className="botao botao--fantasma botao--pequeno" onClick={onAtualizar} disabled={carregando}>
          <Icone nome="atualizar" tamanho={18} className={carregando ? 'girando' : undefined} />
          {carregando ? 'Buscando…' : 'Atualizar'}
        </button>
      )}
      {erro && origem !== 'ao-vivo' && <p className="fonte__erro">Motivo: {erro}.</p>}
    </div>
  )
}
