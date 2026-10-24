# 配布と公開

## npm

ルートは private。配布対象は `packages/ie-buster` です。
配布パスは v2.0.2 と同じ構成を維持します。

| ファイル | 用途 |
| --- | --- |
| `dist/ie-buster.js` | クラシックスクリプトの通常版 |
| `dist/ie-buster.min.js` | クラシックスクリプトの圧縮版。CDN サンプルの参照先 |
| `lib/cjs/index.js` | CommonJS。main・require の参照先 |
| `lib/esm/index.js` | ES Modules。module・import の参照先 |
| `types/index.d.ts` | TypeScript の型定義 |

配布ディレクトリは package.json の `files` で `dist`・`lib`・`types` を指定しています。
公開する場合のコマンドは `npm run release`（`npm publish -w ie-buster`）です。
配布パッケージの `prepublishOnly` が公開前にビルドを実行します。

## Cloudflare Workers

ドキュメントサイトは `wrangler.jsonc` の設定で `docs/dist` を静的配信します。
Worker 名は `ie-buster`。HTML は `auto-trailing-slash`、存在しない URL は `404-page` の設定です。

### ローカルでの確認・デプロイ

リポジトリのルートから実行します。どちらもサイトのビルドを含みます。

```sh
npm run docs:preview:workers
npm run docs:deploy
```

### Workers Builds

Cloudflare Workers Builds で GitHub リポジトリを連携する場合は、以下を設定します。

| 項目 | 値 |
| --- | --- |
| ルートディレクトリ | リポジトリルート |
| ビルドコマンド | `npm run docs:build` |
| デプロイコマンド | `npx wrangler deploy` |
| ビルド環境変数 | `NODE_VERSION=24` |
| Worker 名 | `ie-buster`（wrangler.jsonc の name と一致させる） |

`npm run build` はライブラリのみを生成するため、サイトのビルドには `docs:build` を使用します。
