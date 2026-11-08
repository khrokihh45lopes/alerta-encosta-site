export function Rodape() {
  return (
    <footer className="rodape">
      <div className="container rodape__conteudo">
        <p>
          <strong>Alerta Encosta</strong> · protótipo acadêmico da FIAP Global Solution 2026.2 (Engenharia de Software, 1º ano).
        </p>
        <p>
          Contribui com os ODS 11 (cidades e comunidades sustentáveis) e 13 (ação contra a mudança do clima). Quando o sensor não está conectado, a página mostra
          dados simulados e avisa isso no topo. Este site não substitui a sirene nem os alertas oficiais.
        </p>
        <p className="rodape__emergencia">Em emergência, ligue 199.</p>
      </div>
    </footer>
  )
}
