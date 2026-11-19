# Registro de uso de IA e revisão · Alerta Encosta

Diretriz da disciplina: *"IA permitida para aprender e revisar. Registrem os prompts em um arquivo prompts.md e saibam explicar cada linha."*

Contexto: **Alerta Encosta** — FIAP Global Solution 2026.2 (Engenharia de Software, 1º ano, turma **1ESSRA-2026**), tema *"CitizenTech da Minha Cidade"* (Chuvas e encostas — Morro do Borel, Tijuca, RJ). Projeto individual de **Victor Lopes Tavares da Fonseca** (RM 571315).

Ferramenta de apoio: **Claude Code** no VS Code (apoio para rascunhos, revisão técnica, verificação de casos de borda e conferência de requisitos).

---

## Sessão 1 · 04/11/2026 · Organização inicial da estrutura

**Prompt:** *"Com base no PDF do desafio (`Desafio-FIAP-GS-CitizenTech 1ES RJ.pdf`), vamos organizar a estrutura inicial do projeto para o tema 'Chuvas e encostas', separando as frentes em pastas próprias, README com a ficha e registro de apoio de IA."*

**O que desenvolvemos e revisamos:**
- Estruturei a organização do projeto por disciplina (`esp32/`, `python/`, `web/`, `matematica/`, `docs/experiencia/`, `docs/pitch/`, `README.md` e `prompts.md`), com repositórios separados para `esp32/`, `python/` e `web/`.
- Executei verificações no módulo Python (falha de rede, `backup.json` corrompido, entradas inválidas e configuração inválida), consultas ao ThingSpeak e checagens de layout em desktop e mobile.
- Consultei referências públicas sobre critérios de alerta e sirenes no Rio de Janeiro para contextualizar o problema.

**Etapas para conclusão e validação:**
- [ ] Registrar o levantamento/referências de vivência em área de encosta em `docs/experiencia/`
- [ ] Vincular o projeto no Wokwi (`481157574379012097`) e o canal no ThingSpeak (`3584820`) nos READMEs
- [ ] Gravar o vídeo do pitch (até 3 minutos, com a personagem Dona Marlene)
- [ ] Revisar e dominar cada função e linha implementada para explicação oral

---

## Sessão 2 · 08/11/2026 · Revisão técnica, testes e separação de entregas

**Responsável:** Victor Lopes Tavares da Fonseca (RM 571315)

**Prompts:**
1. *"Quais critérios e referências de boas práticas podemos aplicar para revisar front-end, usabilidade, testes de fluxo e organização do código?"*
2. *"Considerando os requisitos do PDF do desafio, onde devemos focar a revisão técnica em cada frente do projeto?"*
3. *"Vamos revisar e refinar os pontos críticos identificados em cada módulo, validando comportamento e legibilidade."*

**Ajustes e validações realizadas:**

| Frente | Pontos revisados | Melhorias aplicadas e conferidas |
|---|---|---|
| Lógica (`python/`) | Tipagem, validação e consultas | Tipagem (`Config`, `Feed`, `Leitura`), `leitura_valida`, descarte de `entry_id` inválido, busca binária por horário, comparativo hoje × ontem e exportação (`historico.json` e `relatorio.csv`) |
| Interface (`web/`) | Estado, acessibilidade e fluxo | `useRef` contra resposta antiga, pausa de atualização com aba escondida, foco no primeiro campo inválido, `autoComplete="off"`, sinalização de rolagem no mobile, ajustes de contraste/espaçamento em tela estreita e testes de fluxo na interface |
| Experiência (`docs/experiencia/`) | Requisitos e documentação | Histórias com objetivo do usuário, critérios de aceite, indicadores/riscos, RF21/RF22 e relatórios em `.md`, `.docx` e `.pdf` |
| Pitch (`docs/pitch/`) | Estrutura e ritmo | Roteiro em 10 partes (até 3 min) com a personagem Dona Marlene (68 anos), integração das frentes e slides em PDF |
| Matemática (`matematica/`) | Conferência algébrica | `verificacao_simbolica.py` conferindo derivadas, integrais, limites e regra da cadeia (19/19) e `modelo_encosta.py` (antecedência de ~1h51 com alerta em 70% de umidade) |
| Sensor (`esp32/`) | Aquisição e estabilidade | Média de 8 leituras do ADC, timeout HTTP de 3 s e validação em simulação no Wokwi |

**Pontos de atenção para revisão:** Dominar e explicar a busca binária por horário (`buscar_por_horario`), o controle de referência em `useLeiturasEncosta` e a verificação simbólica em `verificacao_simbolica.py`.

**Separação de entregas:** Organizei `web/` (Front-end Design e Web Development no mesmo repositório), `esp32/` e `python/` como repositórios independentes, mantendo `prompts.md` idêntico entre eles.

---

## Sessão 3 · 18/11/2026 · Integração com ThingSpeak, Wokwi e alinhamento de entregas

**Responsável:** Victor Lopes Tavares da Fonseca (RM 571315)

**Prompts:**
1. *"Quais pendências ainda restam para concluir e validar todas as frentes do projeto?"*
2. *"Como estruturar a configuração do canal no ThingSpeak (4 campos, visibilidade pública e chaves) para integrar com o projeto?"*
3. *"Aqui estão os dados do canal ThingSpeak (ID 3584820 e Write API Key) para integrarmos e testarmos o fluxo de leitura."*
4. *"Seguem os registros gráficos do ThingSpeak, da simulação no Wokwi, da execução do Python e o link do projeto no Wokwi para conferência."*
5. *"Não farei entrevista presencial; vamos utilizar relatos e dados de fontes públicas verificáveis, preenchendo os dados individuais do projeto."*
6. *"Segue o link atualizado do Wokwi e a identificação da turma (1ESSRA-2026) para conferência da documentação."*
7. *"Considerando os arquivos de referência da disciplina de Python e o enunciado da atividade, vamos conferir aderência e ajustar o que for necessário."*

**Conferências e ajustes realizados:**
- Configurei o canal público **3584820** (4 campos: umidade, inclinação, risco e faixa `0/1/2`) e as chaves/variáveis de ambiente nos módulos correspondentes.
- Ajustei `obter_feeds` para não sobrescrever o `backup.json` quando a consulta retornar vazia, preservando o fallback local.
- Conferi o projeto no Wokwi (`481157574379012097`), validando circuito/código e a presença de `libraries.txt`, e salvei evidências em `esp32/evidencias/`.
- Cruzei os gráficos e logs com o cálculo de risco (umidade 30–90% com peso 0,6; inclinação 0–10° com peso 0,4; faixas < 40 NORMAL, 40–70 ATENÇÃO, ≥ 70 PERIGO), ajustando medições de teste fora do roteiro.
- Ajustei `mesclar_historico` para deduplicar por `(entry_id, horário)` e manter a ordenação por horário para a busca binária.
- Substituí a entrevista presencial por fontes públicas verificáveis na seção 3.1 do relatório de Experiência (com anonimização e registro explícito de que não houve entrevista direta), ajustando a história 5.5 e contextualizando no Morro do Borel (Tijuca).
- Preenchi dados individuais e da turma (`1ESSRA-2026`) e alinhei o Python ao padrão esperado na disciplina (CSV com `;`, cabeçalho, origem dos dados, exemplo manual e mapeamento de requisitos/funções).

**Pontos de domínio para revisão:** Explicar o papel do `backup.json` sem rede, a deduplicação por `(entry_id, horário)` e ordenação por horário, a procedência pública dos relatos na seção 3.1 e o cálculo de risco com limites e pesos.

---

## Sessão 4 · 18/11/2026 · Auditoria linha a linha e conferência de requisitos

**Responsável:** Victor Lopes Tavares da Fonseca (RM 571315)

**Prompt:** *"Vamos fazer uma auditoria linha a linha em todas as frentes e cruzar com os requisitos do edital para identificar possíveis inconsistências e validar os ajustes."*

**Revisão e correções pontuais:**

| Frente | Ponto identificado | Ajuste aplicado | Conferência |
|---|---|---|---|
| Sensor × Python × Web | Divergência de arredondamento próxima aos limiares (40 e 70) | Padronização do arredondamento antes da classificação e exibição com 1 casa decimal no OLED | Testes em lote simulando valores e limiares |
| Python | Entradas não finitas (`nan`, `inf`, `-inf`) | Tratamento com `math.isfinite` em `ler_medidas` | Testes com valores `nan`, `inf` e `-inf` |
| Python | Formato inválido em `historico.json` manual | Validação de fuso horário e valores numéricos (`numero_valido`) em `leitura_valida` | Testes com entradas inválidas |
| Python | Controle de duplicidade por `(entry_id, horário)` | Uso de conjunto de pares em `mesclar_historico` | Execuções repetidas sem duplicação indevida |
| Python | Separador decimal para planilha em pt-BR | Saída numérica com vírgula (`numero_br`) e separador `;` no CSV | Conferência do arquivo CSV gerado |
| Python | Virada de ano na consulta por horário | Ajuste de ano de referência em `ler_horario` na transição de ano | Teste cobrindo 30/12 a 02/01 |
| Web | Status "Ao vivo" com leitura defasada | Indicação de leitura antiga (> 5 min) com data e hora em `FonteDados` | Teste com dados reais do canal |
| Web | Estado inicial sem conectividade | Exibição de ação de atualizar e mensagem de indisponibilidade sem ocultar o controle | Teste com bloqueio de rede no navegador |
| Web | Conflito entre edição de relato e alteração de status | Sincronização do estado mais recente em `SecaoRelatos` e fechamento ao excluir | Teste de fluxo na interface |
| Matemática | Cobertura das funções do modelo na validação simbólica | Comparação das expressões simbólicas com as funções de `modelo_encosta.py` | Verificação das funções e teste de falha proposital |

Mantive separadas `contar_altas_finais` e `contar_quedas_finais` pela clareza de leitura e explicação; adicionei a seção de objetivo da solução no README do sensor e atualizei os documentos e relatórios correspondentes.

**Próxima conferência:** Atualizar o código no Wokwi com a versão revisada, gerar o ZIP do site (`git archive`), publicar os 3 repositórios no GitHub e revisar as explicações técnicas antes da entrega (19/11/2026 às 23h55, pelo Teams).