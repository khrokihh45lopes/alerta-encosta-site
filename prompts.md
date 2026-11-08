# Registro de prompts (IA como copiloto)

Combinado da GS: *"IA permitida para aprender e revisar. Registrem os prompts em um arquivo prompts.md e saibam explicar cada linha."*

Ferramenta: **Claude Code** (Claude Opus 5.5) no VS Code.

---

## Sessão 1 · 04/11/2026 · Estrutura inicial do projeto

**Prompt:** enviamos o PDF do desafio (`Desafio-FIAP-GS-CitizenTech 1ES RJ.pdf`) sem texto adicional. A IA perguntou por onde começar e qual problema; respondemos:

- Escopo: **"Estrutura completa"** (repositório com uma pasta por parte, README com a Ficha e prompts.md, e depois cada parte).
- Problema: **"Chuvas e encostas"**.

**O que a IA gerou:**

| Parte | Arquivos |
|---|---|
| Sensor | `esp32/sketch.ino`, `diagram.json`, `libraries.txt`, `README.md` |
| Lógica | `python/main.py`, `backup.json` (dados simulados), `README.md` |
| Matemática | `matematica/modelo_encosta.py`, `graficos/`, `relatorio.html` → `relatorio.pdf` |
| Interface + Interação | `web/` inteiro (React + Vite, json-server) |
| Documentos | `README.md` (Ficha), `docs/experiencia/`, `docs/pitch/`, `AI.md`, `Integrantes.md` |

**Como a IA verificou:** rodou o Python com testes de rede caída, backup corrompido, entrada inválida e configuração inválida; chamou a API real do ThingSpeak (canal público 9); rodou o modelo matemático; testou o site no Chrome (CRUD, simulador, checklist, tema) e conferiu capturas em celular e desktop. Pesquisou na web o critério das sirenes do Rio.

**O que a equipe ainda precisa fazer (não dá para a IA fazer por nós):**

- [ ] Conversar com uma pessoa real que mora em encosta e registrar em `docs/experiencia/`
- [ ] Criar o projeto no Wokwi e o canal no ThingSpeak; colocar os links
- [ ] Preencher nomes, RMs, bairro e links (procurar por `TODO`)
- [ ] Gravar o vídeo pitch
- [ ] Ler e entender **cada função**: "Código que a equipe não sabe explicar não pontua"

---

## Sessão 2 · 08/11/2026 · Revisão de todas as partes com skills

**Quem:** **TODO** (integrante que conduziu a sessão)

**Prompts (texto exato):**

1. Uma lista de skills populares ("design-taste-frontend", "grilling", "agent-browser", "hyperframes", "find-skills", "Taste Skill", "Web Design Guidelines", "Awesome Design", "Image to Code", "Playwright CLI") com o pedido *"add todas essas skills pesquisando na internet"*.
2. O PDF do desafio com *"quais skills me ajudariam a fazer isso e add todas"*.
3. *"faz o projeto ai"* e, em seguida, *"utilize as skills para melhorar"*.

**O que a IA fez:** instalou as skills (pacotes de instruções para o Claude Code) e revisou cada parte do projeto com a skill correspondente. Rodou e testou tudo de novo.

| Parte | Skill usada | O que mudou |
|---|---|---|
| Lógica (Python) | `python-patterns` | Apelidos de tipo (`Config`, `Feed`, `Leitura`); `leitura_valida` para o histórico não derrubar o programa; `entry_id` inválido descartado; opção 7 (**busca binária** por horário) e opção 8 (**hoje × ontem**); `historico.json` e `relatorio.csv` gerados |
| Interface (React) | `vercel-react-best-practices`, `web-design-guidelines`, `design-taste-frontend` (só o verificador), `playwright-cli` | `useRef` contra resposta velha; pausa a atualização com a aba escondida; foco no primeiro campo com erro; `autoComplete="off"` no ponto de referência; menu do topo com sinal de que rola no celular; placeholder que não corta. O verificador da `design-taste-frontend` achou: anel de foco quase invisível no "Ligar 199" (azul sobre vermelho, 1,12:1), botão "Ligar 199" cortado na primeira tela de um celular de 320 px, logo com 40 px de área de toque e formulário sem região de status fixa. Os quatro foram corrigidos e o verificador passou a aprovar. As regras dela de site institucional (uma seção por tela, fotos, efeitos) não se aplicam a um app de alerta e foram ignoradas. Teste automático no navegador: criar, editar, mudar situação, excluir, tema, simulador e API fora do ar |
| Experiência | `user-story`, `docx` | Histórias reescritas com o "para" (o porquê); 14 critérios de aceite Dado/Quando/Então; indicadores de impacto e riscos; RF21 e RF22; relatório em `.docx` com capa e índice |
| Pitch | `technical-video-script` | Roteiro em 10 trechos de 10 a 25 s com estado inicial, orçamento de tempo, plano de corte, capítulos e descrição do YouTube; "imagine a Dona Marlene" (personagem, não pessoa real) |
| Matemática | `sympy` | `verificacao_simbolica.py`: o SymPy refaz as 13 contas feitas à mão (derivadas, integral, limites, regra da cadeia) e todas conferem; seção 5.4 no relatório; PDF gerado de novo |
| Sensor (ESP32) | `arduino-code-generator` | Média de 8 leituras do ADC; espera máxima de 3 s pelo ThingSpeak. **Compilado e executado no Wokwi** pela primeira vez |

**O que a equipe precisa conferir:** ler cada mudança acima e saber explicar, principalmente a busca binária (`buscar_por_horario`), o `useRef` em `useLeiturasEncosta` e o `verificacao_simbolica.py`.

**Depois, na mesma sessão:** pedimos o histórico de commits (*"sim"*) e avisamos *"sao entregas separadas so a do site é junto"*. A IA separou o projeto em **3 repositórios independentes**: site (Front-end Design e Web Development juntos), sensor (Edge Computing) e Python. Cada um tem a Ficha da CitizenTech no topo do README, os integrantes, este `prompts.md` e a sua pasta de evidências. Matemática, Experiência e Pitch são arquivos entregues no Teams. Os commits foram feitos com a skill `git-commit`, uma parte por commit.

---

## Modelo para os próximos prompts

```
## Sessão N · DD/11/2026 · <assunto>
**Quem:** <integrante>
**Prompt:** <cole o texto exato>
**O que veio:** <resumo>
**O que mudamos / por quê:** <...>
```
