# IE Buster

## Site & Documentation

- デモ: https://ie-buster.qranoko.jp
- npm: https://www.npmjs.com/package/ie-buster

## About

IE Buster（アイイーバスター）は、IEユーザーにChromeを促す軽量なポップアップJSです。Web制作者みんなを救うために開発しました。

- IE11を検出してChromeダウンロードを促すポップアップを表示
- テキスト・リンク・スタイルのカスタマイズに対応
- TypeScript向けの型定義を同梱

## Packages

- [ie-buster](./packages/ie-buster) - IEユーザー向けのポップアップJS

## Quick Start

```html
<script
  nomodule
  src="https://cdn.jsdelivr.net/npm/ie-buster@2.0.2/dist/ie-buster.min.js"
></script>
<script nomodule>
  ieBuster.init()
</script>
```

## Support

- IE11

## Development

Node.js 24以上とnpmを使用します。

```bash
npm install
npm run build
npm run check
npm run docs
```

- `packages/ie-buster`: Rolldown / TypeScriptによるライブラリと型定義
- `docs`: ministaによるドキュメントサイト。`npm run docs:build`で静的出力
- `play`: `npm run play`で手動検証用ページを配信。`/_default/`は通常表示、`/secure/`はスタイルのURL制限を確認

配布先はv2.0.2と同じ`dist/ie-buster.js`・`dist/ie-buster.min.js`・`lib/cjs/index.js`・`lib/esm/index.js`・`types/index.d.ts`です。`npm test`で公開済みv2.0.2との動作比較を行います。

配布JSはIE11向けにES5互換の構文で記述し、ビルド時に構文検証します。TypeScriptは型チェックと型定義の生成に使用します。IE11の実機確認には、`play`のHTMLとビルド済みのクラシックスクリプトを使用してください。

## Cloudflare Workers

ドキュメントサイトは`wrangler.jsonc`の設定で`docs/dist`を静的配信します。

```bash
npm run docs:preview:workers
npm run docs:deploy
```

Cloudflare Workers BuildsでGitHubリポジトリを連携する場合は、以下を設定します。

- ルートディレクトリ: リポジトリルート
- ビルドコマンド: `npm run docs:build`
- デプロイコマンド: `npx wrangler deploy`
- ビルド環境変数: `NODE_VERSION=24`
- Worker名: `ie-buster`（`wrangler.jsonc`の`name`と一致させる）

## License

- MIT

## Credit

- Author: [Qrac](https://qrac.jp)
- Illustration: [Mainoko](https://mainoko.jp)
- Organization: [QRANOKO](https://qranoko.jp)
