# Desenvolvimento de funcionalidades, blocos e extensões DoGoBlock

Este roteiro acompanha uma mudança desde o comportamento esperado até a versão
que o usuário instala. Os repositórios do ecossistema são independentes e ficam
lado a lado. Um teste no GUI não confirma, sozinho, que a biblioteca chegou ao
compilador online ou ao instalador offline.

Os exemplos completos são [Fingerprint UART](./extensions/fingerprint.md), para
Arduino, e [LAN entre computadores](./extensions/lan.md), para execução Scratch
com transporte local no Link e no desktop.

## 1. Definir a expectativa antes do código

Registre na tarefa ou no PR:

- **Problema e usuário:** o que hoje impede o uso e quem será beneficiado.
- **Entradas:** argumentos dos blocos, menus, dispositivo, modo e conexão.
- **Saídas:** efeito esperado, retorno de reporter, código gerado e artefato.
- **Sucesso:** um exemplo observável do fluxo completo.
- **Erro:** entrada inválida, dispositivo ausente, falha de comunicação,
  timeout e recuperação, conforme a funcionalidade.
- **Compatibilidade:** placas, idiomas, projetos antigos e distribuições.
- **Verificação:** quais comportamentos serão automatizados e quais exigem
  hardware real.

Exemplo: “No modo programação, na Uno/Nano/Leonardo, o aluno cadastra duas
amostras de uma digital em um ID válido, envia o programa e consulta o ID de uma
digital reconhecida. Uma busca sem dedo limpa o resultado anterior e informa
o status correspondente.”

Escolha o menor ajuste que atenda à expectativa. Uma nova extensão de sensor
Arduino não exige criar uma tela React, alterar o protocolo Link ou modificar
os blocos internos do Blockly se o mecanismo de plugins já atender ao caso.

## 2. Escolher a camada responsável

| Mudança | Responsável principal | Integrações a conferir |
| --- | --- | --- |
| Tela, menu, editor ou feedback ao usuário | `openblock-gui/src` | Estados, acessibilidade, traduções e build dos consumidores |
| Execução Scratch, conexão realtime ou nova placa | `openblock-vm/src` | Transporte, firmware e catálogo de dispositivos |
| Extensão Arduino no modo programação | `openblock-gui/static/device-extensions/<id>` | Catálogo VM, compiladores e recursos empacotados |
| Bloco estrutural/campo Blockly ou gerador de placa compartilhado | `openblock-blocks` | Reconstrução de bundles e versão consumida pelo GUI/Desktop |
| Leitura e distribuição do catálogo local | `openblock-resource` | `index.js`, traduções e caminhos absolutos de `library` |
| Protocolo USB/serial, firmware ou gravação local | `openblock-link` | VM, Agent, Desktop e implementações equivalentes no Tauri |
| Validação/compilação online | `openblock-api` | DTO, lista de bibliotecas, imagem do compilador e artefatos |
| Compilação offline e instalador Agent | `openblock-agent` | Bibliotecas preservadas, recursos e verificação do pacote |
| Aplicativo Electron | `openblock-desktop` | Dependências fixadas, catálogo local, recursos e instalador |
| Aplicativo Tauri/Android | `openblock-tauri` | Build atual do GUI e, no desktop, recursos do Agent offline |

Não anuncie suporte a uma placa apenas porque o código C++ compila. Confira o
transporte, pinos, capacidade de memória e possibilidade de upload no produto.
Extensão de programação e extensão Scratch realtime têm contratos diferentes.
Para a segunda, consulte também
[`openblock-vm/docs/extensions.md`](../../openblock-vm/docs/extensions.md).

Para extensões Scratch com comunicação externa, siga o contrato da LAN:
registre o builtin na VM e o catálogo no GUI, separe transporte da semântica dos
blocos e integre o serviço nativo em Node e Tauri quando ambos forem anunciados.
Não execute pilhas Scratch diretamente em callbacks de rede: entregue eventos
ao scheduler. Defina tamanho, fila, timeout, reconexão e limpeza ao parar, sair
do editor, remover a extensão ou trocar de projeto. Verifique a persistência em
SB3 sem embutir resultados recebidos, além de um teste entre dois runtimes e
serviços reais. Canais lógicos e indicação de conexão precisam ter a mesma
semântica em todos os consumidores.

## 3. Preparar uma alteração revisável

Confira `git status --short` em cada repositório afetado. Preserve alterações do
usuário. Identifique as dependências e scripts em `package.json`, mantenha o
gerenciador e o lockfile existentes e evite reinstalar todo o ecossistema para
uma mudança de código.

No GUI, `webpack.config.js` usa a VM irmã quando ela existe; `OPENBLOCK_VM_PATH`
permite selecionar outra cópia. Isso não troca automaticamente a revisão de VM
usada no deploy nem a dependência fixada no Desktop. Registre quais fontes cada
validação consome e atualize os consumidores na entrega.

## 4. Implementar uma extensão Arduino

Use um ID estável e nomes de blocos prefixados pelo ID. O ID da extensão e os
opcodes aparecem nos projetos salvos: renomeá-los exige migração e teste de
compatibilidade.

```text
openblock-gui/static/device-extensions/<id>/
├── index.js          # metadados do catálogo local
├── msg.json          # mensagens-fonte dos blocos
├── blocks.js         # definições visuais e tipos de entrada/saída
├── generator.js      # código Arduino de cada opcode
├── toolbox.js        # categoria, ordem, campos e valores iniciais
├── translations.js   # mensagens dos blocos e do catálogo
├── assets/           # ícone da extensão
└── lib/              # bibliotecas Arduino, quando necessárias
```

Siga o registro usado pelas extensões existentes: `registerBlocks`,
`registerGenerators`, `registerToolboxs` e `registerBlocksMessages`. Esses scripts
são carregados pelo gerenciador da VM; não são componentes React.

Para os blocos:

- Separe comandos, reporters numéricos e booleanos, usando os formatos já
  registrados pelo projeto.
- Mantenha cor de categoria, nomes de argumentos e valores iniciais coerentes
  entre bloco, toolbox e gerador.
- Use menus de valores estáveis para opções finitas; traduza o rótulo sem
  alterar o valor salvo.
- Use sombras adequadas para argumentos que aceitam reporters.
- Informe ao usuário os pré-requisitos e o significado de erros recuperáveis.
  Reporters de resultado devem deixar claro se consultam o hardware ou retornam
  o último resultado.

Para menus de pinos, use a API compartilhada `Blockly.Device.getPinOptions`,
integrada aos metadados da placa selecionada pelo adaptador
`src/lib/device-pin-options.js`, instalado em `src/lib/blocks.js`. O registro de
uma extensão deve funcionar antes de o flyout estar disponível. Não extraia as
opções de `getField('PIN')` de um bloco visível: menus com
`acceptReporters: true` colocam esse campo em um bloco shadow conectado à entrada,
e a categoria pode nem estar renderizada naquele momento.

No gerador, registre includes, objetos e inicialização em `includes_`,
`definitions_` e `setups_`. Evite duplicá-los a cada uso do bloco. Faça a
configuração explícita prevalecer sobre valores padrão, independentemente da
ordem de visita dos blocos. Cada reporter deve devolver a expressão e sua
precedência, conforme o contrato de `Blockly.Arduino`.

Valide entradas antes de converter tipos estreitos em C++: um ID negativo não
pode se transformar em um ID válido por conversão para `uint16_t`. Quando o
bloco exige um ID inteiro, rejeite também frações, valores não finitos e valores
fora da capacidade do dispositivo antes da conversão. Defina
timeouts e recuperação quando houver espera; não crie laços infinitos internos
para aguardar interação física. Não use um resultado antigo como sucesso após
uma operação que falhou.

Implemente inglês e português em `msg.json`/`translations.js`, com fallback para
os demais idiomas. Garanta que todos os placeholders das mensagens coincidam
com os argumentos. Preserve versão, licença e origem das bibliotecas de
terceiros; fixe uma versão ou commit, em vez de baixar `master` durante o build.

## 5. Registrar e distribuir

Em `openblock-vm/src/extension-support/extension-manager.js`:

1. Inclua o ID na allowlist de extensões de dispositivo.
2. Inclua a entrada do catálogo estático com caminhos, ícone, descrição,
   `supportDevice`, tag e `library`, quando aplicável.
3. Mantenha esse contrato coerente com `index.js` do plugin.

O navegador/Tauri carrega `/static/device-extensions/`. O Electron pode usar o
catálogo do servidor local de recursos em `127.0.0.1:20112`. Nesse caminho,
`openblock-resource` lê os metadados dos plugins e transforma `library` em um
caminho local absoluto. Um servidor não substitui o outro: teste os dois
caminhos quando a mudança atender às duas distribuições.

Sincronize a origem da extensão antes dos builds. Execute a partir do GUI:

```bash
node scripts/sync-device-extensions.js fingerprint
node scripts/sync-device-extensions.js fingerprint --check
```

Substitua `fingerprint` pelo ID implementado. Revise o diff das cópias no Agent e
Desktop em `local-resources/extensions/<id>` e das bibliotecas em
`openblock-api/compiler/libraries`. Mantenha o plugin do GUI como origem; não
evolua cada cópia manualmente.

Quando os toolchains já estiverem instalados na workspace, prepare e confira
também as bibliotecas locais usadas na compilação offline:

```bash
node scripts/sync-device-extensions.js fingerprint --with-toolchains
node scripts/sync-device-extensions.js fingerprint --with-toolchains --check
```

Essa opção sincroniza os diretórios de ferramentas existentes; não instala o
compilador nem substitui a preparação dos recursos de cada aplicativo.

Confira também os pontos que não são resolvidos apenas copiando arquivos:

- API: permita o ID em `src/compiler/arduino-boards.ts`, preserve a validação
  do DTO e reconstrua a imagem `compiler/Dockerfile` para incluir as bibliotecas.
- Agent offline: preserve/copíe as bibliotecas no script de preparação de
  recursos e inclua-as na verificação do pacote. O Agent leve usa a API para
  compilar e não inclui o compilador completo.
- Desktop Electron: atualize a allowlist de extensões locais e a verificação
  dos recursos para que a poda do instalador não remova o plugin.
- Tauri desktop: prepare os recursos a partir do Agent offline atualizado. O
  build do GUI sozinho não atualiza bibliotecas do compilador embarcado.
- Link: só altere protocolo ou upload se o novo comportamento os exigir. O
  compilador deve receber o diretório de bibliotecas efetivamente empacotado.

## 6. Testar o comportamento em camadas

| Camada | Evidência esperada |
| --- | --- |
| Contrato da extensão | Todo bloco da toolbox existe, tem mensagem e gerador; argumentos e tipos são compatíveis |
| Blockly real | Primeiro carregamento na ordem do editor (mensagens → gerador → blocos → idioma), toolbox, conexões, valores iniciais, XML de ida e volta e geração de workspace |
| Menus de pinos | API compartilhada com metadados reais da placa, entrada com `acceptReporters` e menu shadow; primeiro registro com o flyout indisponível |
| Gerador | Includes/objetos únicos, configuração explícita, reporters válidos e combinação com blocos existentes |
| Biblioteca C++ | Sucesso, erros do sensor, limites de argumentos, pré-condições e limpeza de estado antigo |
| VM | Catálogo, carregamento dos scripts, evento de registro, falha de recurso e recarga da extensão ao abrir projeto |
| Interface de carregamento | Sucesso, erro visível, fim do processamento e nova tentativa; uma falha não pode deixar a extensão parcialmente registrada |
| Compilação real | Sketch gerado compila com core/bibliotecas usados pelo produto em cada placa anunciada |
| Distribuição | Bibliotecas e scripts estão no pacote, sem depender de arquivos da máquina do desenvolvedor |
| Hardware | Cadastro/leitura/exclusão e recuperação após falhas no sensor e na conexão reais |

Nos testes de integração de extensões, carregue também o adaptador de pinos e
os metadados reais usados no editor. Substituir `getPinOptions` por uma lista
fixa no helper mascara incompatibilidades entre o plugin e o runtime. Stubs
podem isolar um teste unitário, mas não substituem essa verificação da cadeia
que será entregue ao usuário.

Para Fingerprint, a cadeia específica está disponível no GUI:

```bash
npm run test:fingerprint
```

Esse runner reúne testes dos blocos/Blockly, carregamento e persistência na VM,
adaptador C++, contrato da API, sincronização de recursos e compilação real para
as três placas AVR. O teste de persistência grava um arquivo SB3 real e o
recarrega, verificando campos, entradas, blocos e reinstalação da extensão.
Instale as dependências dos repositórios envolvidos e tenha um compilador C++11
disponível para o teste nativo (`CXX`, com padrão `g++`). Para a etapa AVR em outro
ambiente, configure `ARDUINO_CLI`,
`ARDUINO_DATA_DIR` e `ARDUINO_USER_DIR` com os caminhos do toolchain instalado;
o runner de compilação é `scripts/test-fingerprint-compile.js`.

Os recursos offline também têm testes de preparação isolados, sem podar as
ferramentas instaladas na máquina:

```bash
node --test ../openblock-agent/test/fingerprint-resources.test.js
node ../openblock-tauri/scripts/test-prepare-desktop-resources.js
```

Esses testes verificam a cópia das bibliotecas, os arquivos obrigatórios e a
rejeição de um toolchain incompleto antes de preparar o aplicativo.

Os testes específicos da funcionalidade devem rodar de verdade. Neste projeto,
há scripts históricos `test:unit` do GUI e `tap:unit` da VM vazios; uma execução
deles com saída zero não prova cobertura. Execute o runner específico ou os
arquivos diretamente pelo Jest/Tap configurado no repositório.

Valide o build das fontes afetadas:

```bash
npm --prefix ../openblock-vm run build
npm run build
git diff --check
```

Se houver mudança em `openblock-blocks`, execute seus testes e reconstrua os
bundles com `npm run prepublish` nesse repositório. Confirme que o consumidor
usa o bundle reconstruído. Para uma extensão externa com gerador próprio,
alterar o bundle central normalmente não é necessário.

No editor, selecione a placa, entre no modo programação, adicione a extensão e
monte um exemplo. Salve em `.sb3`, reabra e confira blocos, campos e extensão.
Inspecione o código, compile e envie. Teste também ausência do sensor e retorno
ao estado funcional. Esse ensaio complementa os testes automatizados.

## 7. Preparar a entrega completa

Publique ou disponibilize as revisões na ordem de dependência: VM/Blocks quando
alterados, GUI que os consome, API com a imagem de compilação atualizada e
aplicativos que incorporam esses recursos. Não confunda preparar um build com
publicá-lo em produção.

Para validar os destinos escolhidos, use os scripts dos respectivos projetos:

- GUI: `npm run build`.
- API: `npm run build` e build da imagem com
  `docker build -f compiler/Dockerfile -t dogoblock-api-compiler .`.
- Agent offline: `npm run dist:offline` e `npm run verify:package:offline`.
- Electron: `npm run build:dir` e `npm run verify:resources`.
- Tauri desktop: `npm run desktop:build`; para desenvolvimento,
  `npm run desktop:dev`.
- Tauri Android: `npm run build:gui` e o comando `android:apk`/`android:aab`
  correspondente ao artefato necessário.

Execute cada comando no seu repositório, com os pré-requisitos descritos no
README correspondente. Build de aplicativo não substitui teste em uma máquina
limpa e não confirma que o hardware funciona.

Antes da revisão, confirme:

- [ ] As expectativas têm exemplos de sucesso e erro verificáveis.
- [ ] IDs/opcodes antigos e projetos salvos continuam compatíveis.
- [ ] Mensagens, toolbox, gerador, catálogo e placas suportadas coincidem.
- [ ] Bibliotecas têm origem/versionamento/licença e chegaram aos compiladores.
- [ ] Os testes e builds reportados foram realmente executados.
- [ ] Há um exemplo reproduzível e um roteiro de teste físico.
- [ ] Revisões dos consumidores e recursos empacotados foram conferidos.
- [ ] O PR registra limitações e verificações ainda pendentes, sem declarar
  hardware ou publicação como testados quando não foram.
