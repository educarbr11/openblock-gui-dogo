# LAN entre computadores

A categoria LAN troca mensagens entre editores DoGoBlock abertos na mesma rede
Wi-Fi ou Ethernet. Funciona no modo palco/realtime, sem um servidor na internet.
Não gera código Arduino nem usa o rádio ESP-NOW das placas.

## Preparação e exemplo

1. Use uma versão atual do editor e do Link/Agent nos dois computadores, ou o
   aplicativo desktop atualizado, que já inclui o serviço local.
2. Conecte os computadores à mesma rede e adicione **LAN** na biblioteca de
   extensões do modo palco. A categoria tenta conectar automaticamente; o botão
   **Conectar à LAN** permite tentar novamente.
3. Mantenha o mesmo canal nos dois projetos. O padrão é **6**, com opções de
   **1 a 16**. Esses canais são grupos de mensagens; não alteram o canal do Wi-Fi.
4. No computador receptor, monte:

   ```text
   quando receber [temperatura] transmitida na LAN
       dizer (valor recebido da mensagem [temperatura] na LAN)
   ```

5. No emissor, execute:

   ```text
   quando bandeira verde clicada
       transmitir mensagem [temperatura] com valor [23] na LAN
   ```

O receptor exibe `23`. O emissor não recebe sua própria transmissão. Para usar
outro canal, execute **definir canal LAN** antes de enviar nos dois projetos.
Um projeto recém-aberto começa no canal 6; salve o bloco de configuração no
início do programa para selecionar outro grupo ao executar.

## Contrato dos blocos

| Bloco | Resultado |
| --- | --- |
| Transmitir mensagem | Envia um sinal com valor vazio |
| Transmitir mensagem com valor | Envia texto ou número, convertido para texto Scratch |
| Quando receber mensagem | Inicia o script correspondente ao nome e canal |
| Valor recebido da mensagem | Retorna o valor do evento atual ou o último recebido para esse nome; vazio antes de receber |
| Definir canal LAN | Seleciona um grupo de 1 a 16 e limpa os valores anteriores |

Os nomes diferenciam maiúsculas e minúsculas; espaços nas extremidades são
removidos. Aceitam até 128 caracteres Unicode, com valor de até 1024 caracteres.
O reporter aceita blocos de texto e expressões no nome. Ele não oferece monitor
por checkbox, pois o monitor legado da VM não preserva esse argumento livre.

Mensagens consecutivas são enfileiradas por script. Um script ocupado termina
antes de processar a próxima mensagem correspondente; mensagens de outros nomes
não o reiniciam. O valor consultado dentro do evento permanece associado àquela
mensagem, mesmo que outra chegue durante a execução.

**Parar tudo** limpa a fila e impede novos eventos até clicar na bandeira verde,
executar um comando LAN ou usar o botão de conexão. Sair do editor ou entrar no
modo programação suspende a conexão, inclusive para laços que ainda executem
na VM. Voltar ao modo palco retoma o serviço mantendo os blocos. Remover a extensão ou abrir
outro projeto limpa conexões, listeners, filas e valores de rede. Valores
recebidos não são embutidos no arquivo `.sb3`.

## Conexão e limites

O navegador usa o serviço local por WebSocket em `127.0.0.1:20111/openblock/lan`;
o Electron utiliza a porta 20113. O aplicativo Tauri desktop possui o mesmo
endpoint embarcado. Versões antigas do Link não incluem essa rota.

Entre computadores, o serviço usa multicast IPv4 `239.255.68.71`, UDP 20114,
TTL 1. Redes de convidados, isolamento entre clientes ou bloqueio de multicast
podem impedir a comunicação. Quando necessário, permita o aplicativo e a porta
UDP na rede local pelo firewall. O canal é um grupo compartilhado, não uma senha.

A entrega é de melhor esforço, sem confirmação do computador receptor. Uma
mensagem não é reenviada automaticamente após uma falha, para evitar executar
ações duas vezes. Cada sessão aceita até 100 envios por segundo; as filas e o
cache de valores possuem limite de 128. Ao encher a fila, as mensagens mais
antigas são descartadas e o editor informa o problema. Use esperas em laços de
transmissão. IDs deduplicados e validação de tamanho/protocolo limitam os pacotes
aceitos pelo serviço.

## Desenvolvimento e validação

- VM: `src/extensions/scratch3_lan/` e `src/util/lan-client.js`.
- GUI: catálogo `src/lib/libraries/extensions/lan/`, callback da toolbox e alertas.
- Link: `src/lan/` e `src/session/lan.js`.
- Tauri: `src-tauri/src/link/lan.rs`.
- Agent/Electron: scripts de preparação sincronizam o Link da workspace;
  `OPENBLOCK_LINK_PATH` permite indicar outra cópia atualizada. O Agent isolado
  com snapshot antigo precisa dessa fonte até atualizar sua dependência publicada.

Na pasta GUI, execute:

```bash
npm run test:lan
npm run test:lan -- --tauri
npm --prefix ../openblock-vm run build
npm run build
```

O runner verifica contrato dos blocos, scheduler real, valores por evento,
isolamento por canal, timeout/reconexão, suspensão, limpeza, arquivo SB3 real,
alertas e dois editores/serviços independentes com WebSocket e UDP multicast em
loopback. A opção `--tauri` inclui os testes do bridge Rust. Esses testes não
substituem conferir duas máquinas físicas na rede que será usada em aula.

O protocolo é próprio do DoGoBlock; os blocos foram inspirados na referência
visual, sem interoperabilidade de rádio com CyberPi/mBlock.
