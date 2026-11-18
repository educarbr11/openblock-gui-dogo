# Fingerprint UART — AS608/R307

A extensão Fingerprint permite cadastrar e reconhecer digitais com sensores
UART compatíveis com a biblioteca Adafruit Fingerprint. Ela gera um programa
Arduino para **Uno, Nano e Leonardo**, no modo programação. A leitura ocorre na
placa depois do upload, e não como uma extensão realtime do palco.

## Comportamento esperado

O aluno configura a serial do sensor, cadastra duas amostras da mesma digital
em um ID e depois consulta o ID e a confiança de uma busca bem-sucedida. Cada
operação disponibiliza seu status. Ausência de dedo, digital desconhecida e erro
de comunicação não podem ser tratados como reconhecimento válido nem reutilizar
o ID de uma leitura anterior.

O cadastro é dividido em etapas explícitas para permitir instruções na tela,
LEDs, botões ou display. A extensão não espera indefinidamente por um dedo e
não oferece um comando para apagar todo o banco de uma vez.

## Ligação e configuração

| Sensor | Arduino padrão | Função |
| --- | --- | --- |
| TX | pino 10 (RX da placa) | Dados enviados pelo sensor |
| RX | pino 11 (TX da placa) | Dados enviados pela placa |
| GND | GND | Referência comum |
| Alimentação | Conforme a especificação do módulo | Respeitar tensão e corrente do modelo |

O padrão usa `SoftwareSerial` a **57600 baud**. TX e RX são cruzados; os nomes
RX/TX no bloco se referem à placa. Se o sensor foi configurado para outra taxa,
selecione a mesma taxa no bloco de inicialização.

Na Leonardo, a recepção de `SoftwareSerial` depende de pinos com interrupção de
mudança; os pinos RX válidos são 8, 9, 10, 11, 14, 15 e 16. O padrão RX 10 é
compatível com as três placas. Confira os conflitos com outros módulos antes de
trocar os pinos. Usar outra biblioteca de `SoftwareSerial` simultaneamente exige
cuidado, pois apenas uma porta pode escutar por vez.

## Blocos por etapa

| Etapa | Blocos e resultados |
| --- | --- |
| Configuração | Inicializar com RX/TX/taxa; verificar comunicação/senha do sensor |
| Captura | Capturar imagem; converter imagem no buffer 1 ou 2 |
| Cadastro | Criar modelo com os dois buffers; gravar modelo no ID escolhido |
| Reconhecimento | Buscar digital: capturar, converter e pesquisar no banco do sensor |
| Manutenção | Excluir modelo por ID; atualizar a quantidade de digitais |
| Resultado | Último status, operação bem-sucedida, ID reconhecido, confiança e quantidade |
| Condições | Constantes de status em menu para comparar o resultado |

Os reporters consultam resultados guardados; não fazem uma nova leitura apenas
por aparecerem em uma condição ou expressão. O status e o booleano de sucesso
se referem à última operação. ID e confiança se referem à **última busca**:
capturar/converter uma imagem para cadastro não executa uma busca nem atualiza
esses dois valores. Execute buscar antes de avaliar um reconhecimento atual.

A quantidade de digitais vale **-1 quando desconhecida**. A gravação e a
exclusão tentam atualizar esse total; se a consulta falhar, o programa não
recebe uma contagem antiga como se fosse atual. O ID e a confiança reconhecidos
valem 0 até uma busca bem-sucedida.

## Fluxo de cadastro

1. Selecione Uno, Nano ou Leonardo no editor e ative o modo programação.
2. Adicione Fingerprint e configure RX 10, TX 11 e 57600 baud.
3. Confira o status da inicialização/verificação do sensor.
4. Solicite que a pessoa coloque o dedo. Execute **capturar imagem** até obter
   sucesso, com uma espera curta entre tentativas e uma condição de cancelamento
   ou timeout no programa.
5. Converta a imagem para o **buffer 1** e prossiga somente se houver sucesso.
6. Solicite a retirada do dedo. Aguarde uma captura retornar **sem dedo** antes
   de pedir a segunda amostra.
7. Solicite o mesmo dedo novamente, capture a imagem e converta para o
   **buffer 2**, verificando o sucesso de cada operação.
8. Execute **criar modelo**. Se as amostras não corresponderem, reinicie a
   captura das duas amostras.
9. Grave o modelo em um ID válido e confira o status. Use IDs inteiros a partir
   de 1, menores que a capacidade informada pelo sensor. Valores negativos,
   fracionários ou não finitos são rejeitados antes da gravação.
10. Atualize a quantidade de digitais caso precise exibir o total atual.

Não coloque gravação ou exclusão de modelo em um laço sem uma ação deliberada
do usuário. Gravar em um ID já ocupado pode substituir a digital desse ID.

## Fluxo de reconhecimento

```text
inicializar sensor
repetir com intervalo e condição de saída:
    buscar digital
    se operação bem-sucedida:
        usar ID reconhecido e confiança
    senão:
        comparar último status
        informar ausência de dedo, digital desconhecida ou falha
```

O bloco de busca realiza captura, conversão no buffer 1 e pesquisa. Uma busca
sem sucesso limpa o ID e a confiança do reconhecimento anterior. O valor de
confiança vem do algoritmo do sensor; não o apresente como uma porcentagem.
A pesquisa considera a capacidade lida do sensor, sem um limite fixo de 163
posições imposto pelo método de busca rápida da biblioteca.

## Exclusão e diagnóstico

Para excluir uma digital, informe um ID válido ao bloco de exclusão e verifique
o status. Atualize a quantidade de digitais após a manutenção quando for
necessário mostrar o número atualizado.

| Resultado | Próxima ação |
| --- | --- |
| `FINGERPRINT_OK` | Prosseguir com a próxima etapa |
| `FINGERPRINT_NOFINGER` | Solicitar um dedo e tentar outra captura |
| `FINGERPRINT_NOTFOUND` | Informar que a digital não foi encontrada |
| `FINGERPRINT_ENROLLMISMATCH` | Refazer as duas amostras do cadastro |
| Erro de imagem/conversão | Reposicionar ou limpar o dedo/sensor e repetir a etapa |
| Erro de pacote/timeout/senha | Conferir alimentação, GND, RX/TX cruzados e taxa serial |
| `FINGERPRINT_BADLOCATION` | Corrigir o ID: ele deve ser maior que 0 e menor que a capacidade |
| `FINGERPRINT_INVALIDIMAGE` | Fazer uma captura nova antes de converter a imagem |
| `FINGERPRINT_DBRANGEFAIL` | Criar um modelo válido antes de gravá-lo |

Consulte os valores e métodos da
[biblioteca oficial Adafruit Fingerprint](https://adafruit.github.io/Adafruit-Fingerprint-Sensor-Library/html/class_adafruit___fingerprint.html)
para detalhes do protocolo. Modelos comercializados como AS608/R307 podem ter
capacidades, alimentação e firmware diferentes; a compatibilidade depende do
protocolo UART implementado pelo módulo.

## Organização e validação para desenvolvedores

A origem do plugin fica em `static/device-extensions/fingerprint/`. Os blocos,
toolbox, mensagens e gerador seguem o contrato de extensões Arduino existente.
As bibliotecas em `lib/` incluem a Adafruit Fingerprint e o adaptador
`DoGoFingerprint`, que concentra o estado das operações e a validação das etapas.
A biblioteca Adafruit está fixada na versão **2.1.4**, com a origem e a licença
preservadas nos recursos vendorizados.

A extensão também precisa estar registrada no catálogo/allowlist da VM e
disponível no compilador online e nos recursos offline. Siga o
[fluxo de desenvolvimento](../development-workflow.md) para alterar ou distribuir
a implementação.

Execute no GUI:

```bash
npm run test:fingerprint
node scripts/sync-device-extensions.js fingerprint --check
```

Os testes automatizados verificam contratos dos blocos, geração de código,
estados do adaptador e integração de recursos conforme os runners configurados.
A compilação AVR valida o sketch gerado contra a biblioteca/core reais; ela não
simula a óptica, alimentação ou comunicação física do sensor.

O runner `scripts/test-fingerprint-compile.js` permite configurar o toolchain com
`ARDUINO_CLI`, `ARDUINO_DATA_DIR` e `ARDUINO_USER_DIR`. Para atualizar também os
toolchains existentes do Agent/Desktop, sincronize com a opção
`--with-toolchains` antes de preparar os aplicativos offline.

Antes de liberar a versão, registre separadamente o resultado deste roteiro em
cada placa anunciada:

- Inicializar e reconhecer o sensor conectado.
- Cadastrar duas amostras, salvar, reiniciar a placa e reconhecer a digital.
- Buscar sem dedo e com uma digital não cadastrada, sem reaproveitar resultado
  anterior.
- Excluir o ID e confirmar que a digital deixou de ser reconhecida.
- Testar ID inválido, dedo retirado no meio do cadastro e falha de comunicação;
  reconectar e completar uma nova operação.
- Salvar/reabrir o projeto `.sb3` e compilar/enviar pelos destinos online e
  offline disponíveis.

O banco biométrico permanece no sensor. Os blocos não exportam templates de
digitais. Evite registrar dados biométricos em logs ou adicioná-los a exemplos
versionados; use somente IDs/resultados necessários ao exercício.
