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

**Quem:** Victor Lopes Tavares da Fonseca

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

## Sessão 3 · 18/11/2026 · Canal do ThingSpeak

**Quem:** Victor Lopes Tavares da Fonseca

**Prompts (texto exato):**

1. *"oq falta fazer"*
2. *"como crio o thingspeak"*
3. A Write API Key e o número do canal, sem mais texto.
4. Prints dos gráficos do ThingSpeak, da simulação no Wokwi e da execução do Python, e o link do projeto no Wokwi, sem mais texto.
5. *"n vou fazer a conversa use dados de entrevistas na internet"*, com o nome completo e o RM do único integrante.
6. O link do Wokwi de novo e a turma, sem mais texto.
7. Os arquivos do kit de Python da disciplina (`main.py` inicial, `backup.json`, `prompts.md`, modelos de README) e o texto da tarefa no Teams, com *"vc ja tinha esses doc"*.

**O que a IA fez:**

- Listou as pendências e explicou passo a passo como criar a conta e o canal (4 campos, canal público, chaves).
- Colocou o número do canal (**3584820**) no `CONFIG` do `main.py`, no `.env` e no `.env.example` do site e no README do sensor. Colocou a Write API Key no `sketch.ino`.
- Achou um problema no Python: com o canal configurado mas ainda **vazio**, a opção 1 gravava a lista vazia por cima do `backup.json` e apagava os dados simulados. A IA corrigiu `obter_feeds`: o backup só é sobrescrito quando o canal devolve pelo menos uma leitura válida; se não, o programa usa o backup. O site já fazia isso (`useLeiturasEncosta`). Testou os dois casos (canal vazio e campos vazios) e o `backup.json` não mudou.
- Conferiu os links do Wokwi. O primeiro (`305569599398609473`) era o exemplo "wifi-scan" do próprio Wokwi, não o nosso projeto. O segundo é o nosso: baixou o projeto e comparou com o repositório (`sketch.ino` idêntico, mesmas peças e ligações). Esse link foi para o README do sensor. O projeto salvo ficou sem o `libraries.txt`.
- Olhou os prints dos gráficos e comparou cada leitura do canal com o Python (o risco bateu em todas). Apontou que os primeiros testes tinham inclinação de até 125° (estaca de cabeça para baixo) e que o PERIGO foi feito com 63°. Sugeriu limpar o canal e seguir o roteiro do README (accelX 0.10 = 5,7°) antes do print.
- Salvou os prints do Wokwi (NORMAL, ATENÇÃO e PERIGO) e dos gráficos em `esp32/evidencias/` e mostrou as imagens no README do sensor.
- Pelo print do Python (*"6 leituras · 0 novas · histórico 29"*), achou outro problema: o histórico juntava as leituras pelo `entry_id`, e o canal real recomeça do 1 (canal novo ou depois do Clear Channel), com os mesmos números da noite simulada. As leituras reais eram descartadas como repetidas. A IA trocou a chave para o horário (`mesclar_historico`) e passou a ordenar o histórico por horário, que é o que a busca binária precisa. Testou: 6 novas na primeira busca, 0 na segunda, e a busca binária certa nos dois dias.
- Como a conversa com um morador não foi feita, trocou a entrevista por **depoimentos públicos com fonte**. Pesquisou reportagens (Lunetas, 2021; Folhapress, 2023; Agência Brasil, 2019) e um estudo científico (Melo et al., *Natural Hazards*, 2017), baixou as matérias para copiar as falas exatas e reescreveu a seção 3.1 do relatório de Experiência (`.md` e `.docx`). O relatório diz com clareza que não houve entrevista presencial, e as pessoas aparecem sem o nome, como pede a regra de dados pessoais. Por causa dos depoimentos, a história 5.5 (ponto de apoio no mapa) subiu de C para S.
- Preencheu o integrante (projeto individual) nos READMEs, no `Integrantes.md`, na capa da matemática (gerou o PDF de novo) e no relatório de Experiência. Adaptou o roteiro do pitch para uma pessoa só e pôs a fala da moradora no beat 3. Bairro de referência: Morro do Borel (Tijuca). Validou o `.docx` com o verificador do formato Word. Depois, colocou a turma (1ESSRA-2026) nas tabelas e nas capas e conferiu que o projeto do Wokwi passou a ter o `libraries.txt` com as 5 bibliotecas.
- Explicou que o kit de Python não tinha sido enviado antes (a sessão 1 recebeu só o PDF geral) e comparou o programa com ele. Todos os requisitos da tarefa já estavam atendidos, mas em quatro pontos o programa não seguia o kit. Mudou: o `relatorio.csv` agora sai com `;` e com as colunas `id;data;horario;...`, como o kit pede; o cabeçalho do `main.py` ganhou integrante, RM, CitizenTech e problema; o README do Python ganhou "De onde vêm os dados", um exemplo calculado à mão e uma tabela que liga cada requisito e nome de função do kit às funções e opções do nosso menu; e os textos que ainda falavam da noite simulada no `backup.json` foram corrigidos.
- Conferiu pela API pública que o canal está aberto, com os 4 campos na ordem certa, e que recebeu a primeira entrada do Wokwi (#1: solo 46,3 %, inclinação 45°, risco 56,3, ATENÇÃO), o mesmo valor que a fórmula dá.

**O que a equipe precisa conferir:** saber explicar por que uma busca vazia não pode apagar o `backup.json` (ele é o plano B quando não há internet), por que o histórico usa o horário e não o `entry_id` para não repetir leituras, de onde vieram os depoimentos da seção 3.1 (e por que eles não são uma entrevista própria) e por que 45° de inclinação com o solo seco dá só ATENÇÃO (a inclinação sozinha vale no máximo 40 pontos).

---

## Modelo para os próximos prompts

```
## Sessão N · DD/11/2026 · <assunto>
**Quem:** <integrante>
**Prompt:** <cole o texto exato>
**O que veio:** <resumo>
**O que mudamos / por quê:** <...>
```
