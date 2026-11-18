import { formatarDataHora } from '../domain/formatos'
import { Icone } from './Icone'

/**
 * O ESP32 publica a cada 20 s. Se a leitura mais nova tem mais de 5 minutos,
 * o sensor parou (falta de luz, sem rede): não dá para chamar de "ao vivo".
 */
const LIMITE_SEM_LEITURA_MS = 5 * 60 * 1000

/** Diz de onde vem a leitura: ao vivo, sensor parado, guardada no aparelho (sem internet) ou demonstração. */
export function FonteDados({ origem, erro, horario, carregando, onAtualizar }) {
  const parado = origem === 'ao-vivo' && Date.now() - horario.getTime() > LIMITE_SEM_LEITURA_MS

  let estado = origem
  let icone = 'aoVivo'
  let texto = `Ao vivo · leitura de ${formatarDataHora(horario)}`
  if (parado) {
    estado = 'parado'
    icone = 'alerta'
    texto = `Sensor sem leitura nova desde ${formatarDataHora(horario)} · a faixa abaixo pode estar velha: siga a sirene e a Defesa Civil`
  } else if (origem === 'cache') {
    icone = 'semSinal'
    texto = `Sem internet · última leitura salva: ${formatarDataHora(horario)}`
  } else if (origem === 'demo') {
    icone = 'alerta'
    texto = erro
      ? `Sem conexão com o sensor · mostrando dados simulados de ${formatarDataHora(horario)}`
      : `Demonstração · dados simulados de ${formatarDataHora(horario)}`
  }

  // Sem canal configurado, a demonstração é tudo o que existe; com canal, sempre dá para tentar de novo.
  const podeAtualizar = origem !== 'demo' || Boolean(erro)

  return (
    <div className="fonte" data-origem={estado}>
      <p className="fonte__texto">
        <Icone nome={icone} tamanho={18} />
        <span>{texto}</span>
      </p>
      {podeAtualizar && (
        <button type="button" className="botao botao--fantasma botao--pequeno" onClick={onAtualizar} disabled={carregando}>
          <Icone nome="atualizar" tamanho={18} className={carregando ? 'girando' : undefined} />
          {carregando ? 'Buscando…' : 'Atualizar'}
        </button>
      )}
      {erro && origem !== 'ao-vivo' && <p className="fonte__erro">Motivo: {erro}.</p>}
    </div>
  )
}
