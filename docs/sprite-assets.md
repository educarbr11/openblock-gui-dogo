# Fluxo de sprites do DoGo Block

Este documento descreve como preparar, publicar e cadastrar sprites na biblioteca do DoGo Block.

## Visão geral

O fluxo possui quatro etapas:

1. Padronizar os trajes no Figma.
2. Exportar SVG/PNG e enviar pelo Upload Files Dogoblock.
3. Publicar os arquivos no Cloudflare R2.
4. Adicionar o JSON retornado em `src/lib/libraries/sprites.json`.

## Preparação no Figma

Para personagens verticais, use como referência aproximada um frame de **115 x 240 px**.

- Preserve a proporção original da arte.
- Centralize o personagem horizontalmente.
- Alinhe os pés na mesma linha em todos os trajes.
- Mantenha frame, escala e posição consistentes em toda a animação.
- Use fundo transparente.
- Nomeie os trajes em ordem: `personagem-andando-01`, `personagem-andando-02` e assim por diante.

Essa dimensão não é uma regra rígida. O palco possui `480 x 360` unidades, portanto sprites horizontais ou objetos podem usar outra proporção. O objetivo é manter uma escala visual consistente entre os itens da biblioteca.

## Exportação

### SVG

Use SVG para arte vetorial. O frame do Figma deve resultar em um `viewBox` coerente, pois o uploader calcula dimensões e centro de rotação a partir dele. No JSON, SVG usa:

```json
{
  "bitmapResolution": 1,
  "dataFormat": "svg"
}
```

### PNG

Use PNG transparente para arte bitmap. Para um tamanho visual de `115 x 240`, a exportação pode ser feita em `2x`, resultando em `230 x 480 px`. No JSON, PNG usa `bitmapResolution: 2`, então o tamanho visual no palco corresponde à metade das dimensões processadas.

O uploader normaliza PNGs quando necessário, limitado ao equivalente do palco em `2x` (`960 x 720 px`). Esse processamento não corrige proporções ou alinhamento entre trajes; faça esses ajustes no Figma.

## Upload no Cloudflare R2

Na interface do Upload Files Dogoblock:

1. Selecione `Sprite`.
2. Preencha nome e tags.
3. Adicione os arquivos em `Fantasias`.
4. Ordene os trajes arrastando os cartões.
5. Adicione WAVs em `Sons do sprite`, se necessário.
6. Escolha `Cloudflare R2` e envie.
7. Revise a prévia, as dimensões e os centros de rotação.

Os objetos devem ficar na raiz pública configurada para o editor, usando o formato `<md5>.<ext>`:

```text
https://dogoblockcdn.dogomaker.com/<assetId>.<dataFormat>
```

O host é configurado por `DOGOBLOCK_ASSET_HOST`. O valor padrão está em `src/lib/dogoblock-api-config.js`.

## Cadastro no GUI

Copie o objeto JSON retornado pelo uploader para o array em:

```text
src/lib/libraries/sprites.json
```

Estrutura básica:

```json
{
  "name": "Meu sprite",
  "tags": ["personagem"],
  "isStage": false,
  "variables": {},
  "costumes": [
    {
      "assetId": "md5-do-arquivo",
      "name": "meu-sprite-01",
      "bitmapResolution": 1,
      "md5ext": "md5-do-arquivo.svg",
      "dataFormat": "svg",
      "rotationCenterX": 58,
      "rotationCenterY": 120
    }
  ],
  "sounds": [],
  "blocks": {}
}
```

Não altere o hash depois do upload. `assetId` deve ser o MD5 do conteúdo final e `md5ext` deve combinar esse hash com a extensão correta.

## Sprite padrão e uso offline

Sprites da biblioteca são carregados pelo CDN. Um sprite usado no projeto padrão também precisa ser incluído localmente em `src/lib/default-project/`, pois o desktop deve criar projetos mesmo sem internet.

Para alterar o sprite padrão:

1. Adicione os assets em `src/lib/default-project/` com nome `<assetId>.<ext>`.
2. Atualize os trajes em `src/lib/default-project/project-data.js`.
3. Importe e registre os assets em `src/lib/default-project/index.js`.
4. Mantenha `x: 0` e `y: 0` para iniciar no centro do palco.

## Checklist de validação

- As URLs `<assetId>.<ext>` abrem diretamente no CDN.
- O CDN retorna cabeçalhos CORS para os domínios web do DoGo Block.
- Todos os trajes têm escala, frame e alinhamento equivalentes.
- O centro de rotação mantém o personagem estável durante a animação.
- A ordem de `costumes[]` corresponde à ordem esperada.
- A miniatura aparece na biblioteca.
- O sprite aparece corretamente no centro do palco.
- O build do GUI termina sem erros.
- Se for o sprite padrão, o desktop funciona sem acesso ao CDN.
