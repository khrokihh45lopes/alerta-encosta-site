# Uso de IA · Front-end Design e Web Development

## Ferramenta e contexto

| | |
|---|---|
| Ferramenta de apoio | Claude Code no VS Code (apoio para estrutura, rascunhos, revisão e testes) |
| Período | Novembro de 2026 (GS 2026.2 · entrega em 19/11/2026 às 23h55 via Teams) |
| Registro | Detalhado em [`prompts.md`](prompts.md) |

## Como usamos no desenvolvimento e na revisão

| Etapa | Apoio recebido da IA |
|---|---|
| Estrutura | Sugestão de divisão em `domain/` (regras: risco, relatos, sinais, formatos), `services/` (`http`, `thingspeakApi`, `relatosApi`, `cacheLeituras`), `hooks/` (`useTema`, `useLeiturasEncosta`, `useRelatos`, `useFormRelato`) e `components/` (interface) |
| Código React | Rascunho inicial dos componentes, dos 4 custom hooks e do fluxo de CRUD (com `json-server` / MockAPI) |
| Direção visual | Sugestões de identidade visual (referência de placa de Defesa Civil e curvas de nível), cores das faixas (NORMAL/ATENÇÃO/PERIGO) e legibilidade |
| Testes | Apoio na execução de cenários automatizados no navegador (CRUD, simulador, checklist, tema) e conferência de layout em telas mobile e desktop |
| Revisão pontual (08/11 e 18/11) | Apoio na conferência de boas práticas de React e interface: `useRef` contra resposta obsoleta, pausa em aba oculta, foco no primeiro campo inválido, `autoComplete="off"`, sinalização de rolagem no mobile, aviso de leitura antiga (> 5 min) no plano B da placa, estado sem rede e sincronização em `SecaoRelatos` |

## Conferências antes da entrega

- [ ] Dominar e saber explicar `useTema`, `useLeiturasEncosta` (incluindo `useRef` e camadas do plano B), `useRelatos` e `useFormRelato`
- [ ] Saber explicar por que os componentes não fazem `fetch` diretamente (isolamento em `services/`)
- [ ] Validar o CRUD com a API local (porta 3001, via `npm run dev:tudo`) e com o MockAPI
- [ ] Conferir se os textos fazem sentido para moradores de encosta (ex.: Morro do Borel) e NUDEC
- [ ] Garantir que o histórico de commits reflita a evolução do projeto e gerar o ZIP via `git archive`

## Critérios e limites observados

- Nenhum dado pessoal sensível foi informado nos prompts.
- Referências numéricas sobre critérios de alerta/sirenes da Defesa Civil foram consultadas em fontes públicas e constam sujeitas a confirmação oficial.