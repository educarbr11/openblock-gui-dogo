# App instalável (PWA) e modo offline

O build Web do DoGoBlock pode ser instalado como app pelo Chrome (Chromebook,
Windows, Linux e macOS). Depois de instalado e aberto uma vez com internet, o
editor abre sem conexão. Para enviar código Arduino sem internet, o app usa o
DoGoBlock Agent Offline. O guia de instalação para professores está em
[`openblock-agent/docs/chromebook.md`](../../openblock-agent/docs/chromebook.md).

## Peças

| Arquivo | Função |
| --- | --- |
| `src/playground/manifest.webmanifest` | Manifest do app, copiado para `build/manifest.webmanifest`. Abre direto em `#/editor`. |
| `static/pwa/*.png` | Ícones 192/512 e o ícone `maskable`, gerados de `static/dogoblock_logo_icon.svg`. |
| `src/playground/service-worker.js` | Template do service worker. Não entra no bundle: vira `build/sw.js`. |
| `PwaServiceWorkerPlugin` (`webpack.config.js`) | Gera `sw.js` com a lista de arquivos do build e o hash de conteúdo de cada um. |
| `src/lib/register-service-worker.js` | Registra o `sw.js` no build de produção, só na janela do app instalado (`display-mode: standalone`). |
| `src/lib/local-compiler.js` | Cliente da rota `ws://127.0.0.1:20111/openblock/compiler` do Agent Offline. |
| `static/firmwares/arduino/*.hex` | Cópia do firmware realtime de `openblock-api/firmwares/arduino`, usada quando a API não responde. |

O manifest e o service worker só são gerados no build Web. O build mobile
(`OPENBLOCK_TAURI_LIGHT=true`) não inclui nenhum dos dois.

## Cache

- **Precache:** todos os arquivos do build, exceto mapas, as páginas de exemplo
  (`player`, `blocks-only`, `compatibility-testing`), os modelos de
  `static/ml-vendor` e as imagens dos passos dos tutoriais. A primeira
  instalação baixa cerca de 20 MB além do que o editor já carregou. Nas
  atualizações, só baixam de novo os arquivos cujo conteúdo mudou.
- **Atualização:** uma nova versão é instalada em segundo plano e passa a valer
  quando todas as janelas do app forem fechadas. Assim um editor aberto nunca
  mistura arquivos de dois builds.
- **CDN de assets:** sprites, cenários e sons usam nomes por md5 e ficam em cache
  depois do primeiro uso (cache-first).
- **Outros arquivos do mesmo domínio** (modelos de ML, imagens dos tutoriais):
  rede primeiro, com cópia em cache para uso offline.
- **Dogoblock API:** nunca passa pelo cache.

Abrir o site em uma aba comum não registra o service worker. Isso evita que cada
visita baixe o cache offline completo.

## Compilação Arduino

`HardwareHeader.compileArduino` segue esta ordem:

1. Se `navigator.onLine` for `false`, compila no Agent.
2. Senão, compila na Dogoblock API.
3. Se a API não responder (erro de rede ou HTTP 5xx), compila no Agent. Erros de
   compilação devolvidos pela API são mostrados normalmente, sem fallback.

O `.hex` resultante segue o fluxo de upload que já existia: Web Serial para Uno
e Nano, DoGoBlock Link para Leonardo.

O Agent só aceita compilar para origens permitidas (`https://*.dogomaker.com` e
`localhost`, por padrão). Se o DoGoBlock Web for publicado em outro domínio,
inclua-o em `DEFAULT_ALLOWED_ORIGINS`, em
`openblock-link/src/session/compiler.js`.

## Testar localmente

O service worker só é registrado no build de produção e na janela do app
instalado:

```bash
VERCEL=1 npm run build
npx http-server build -p 8601 -c-1
```

Abra `http://localhost:8601`, instale o app pelo Chrome e abra a janela
instalada. Em DevTools > Application > Service workers, confira o `sw.js`
ativo. Para simular a falta de internet, use DevTools > Network > Offline.
