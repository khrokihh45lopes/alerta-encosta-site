/** Símbolo do Alerta Encosta: a encosta com a estaca do sensor e a bandeira de alerta. */
export function Marca({ tamanho = 36 }) {
  return (
    <svg className="marca" width={tamanho} height={tamanho} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="7" fill="var(--marca-fundo)" />
      <path d="M4 27h24V11L4 27z" fill="var(--marca-terra)" />
      <path d="M17 19.2V6.5" stroke="var(--marca-estaca)" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M17.6 6.2 24 8.9l-6.4 2.7z" fill="var(--marca-bandeira)" />
    </svg>
  )
}
