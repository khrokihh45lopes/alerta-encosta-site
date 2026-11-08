# Uso de IA · Front-end Design e Web Development

## Ferramenta

| | |
|---|---|
| Ferramenta | Claude Code (modelo Claude Opus 5.5, da Anthropic), dentro do VS Code |
| Quando | Novembro de 2026, período da GS |
| Prompts | Registrados em [`prompts.md`](prompts.md) |

## Para que usamos

| Etapa | O que a IA fez | O que a equipe fez |
|---|---|---|
| Estrutura | Propôs a organização em `domain/` (regras), `services/` (API), `hooks/` (estado) e `components/` (tela) | **TODO:** revisar e explicar a separação com as próprias palavras |
| Código React | Gerou a primeira versão dos componentes, dos 4 custom hooks e do CRUD | **TODO:** o que vocês mudaram, testaram ou reescreveram |
| Visual | Propôs a direção visual (placa de Defesa Civil + curvas de nível), as cores das faixas e a fonte para baixa visão | **TODO:** o que vocês aprovaram ou ajustaram |
| Testes | Rodou um teste automático no navegador (criar, editar, mudar situação, excluir, simulador, checklist, tema) e revisou capturas no celular e no desktop | **TODO:** testes manuais da equipe, inclusive no celular de alguém real |
| Revisão (08/11) | Revisou o código com regras de boas práticas de React (Vercel) e de interface web: `useRef` para ignorar resposta velha, pausa da atualização com a aba escondida, foco no primeiro campo com erro, `autoComplete="off"` no ponto de referência, menu do celular com sinal de rolagem. Repetiu o teste automático completo, inclusive com a API de relatos fora do ar | **TODO:** explicar com as próprias palavras por que o `useRef` não redesenha a tela e por que o `visibilitychange` ajuda quem está com o celular bloqueado |

## O que conferimos antes de entregar

- [ ] Cada integrante sabe explicar `useTema`, `useLeiturasEncosta` (inclusive o `useRef`), `useRelatos` e `useFormRelato`
- [ ] Sabemos explicar por que componente não faz `fetch`
- [ ] Rodamos o CRUD com a API local e com o MockAPI
- [ ] Os textos foram lidos por alguém que mora em encosta (ou parecido) e fazem sentido para essa pessoa
- [ ] Os commits mostram a evolução feita pela equipe

## Limites que respeitamos

- Nenhum dado pessoal real foi enviado à IA.
- Os números da Defesa Civil (critério das sirenes) vieram de busca na web e estão com fonte; a confirmar com o órgão.
- A IA não substitui a conversa com o morador: a pesquisa de campo é da equipe (ver `docs/experiencia/`).
