# IE Buster

## Site & Documentation

- デモ: https://ie-buster.qranoko.jp
- npm: https://www.npmjs.com/package/ie-buster

## About

IE Buster（アイイーバスター）は、IE ユーザーに Chrome を促す軽量なポップアップ JS です。Web 制作者みんなを救うために開発しました。

- IE11 を検出して Chrome ダウンロードを促すポップアップを表示
- テキスト・リンク・スタイルのカスタマイズに対応
- TypeScript 向けの型定義を同梱

## Packages

- [ie-buster](./packages/ie-buster) - IE ユーザー向けのポップアップ JS

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

Node.js 24 以上と npm を使用します。

```bash
npm install
npm run build
npm run check
npm run docs
```

- `packages/ie-buster`: Rolldown / TypeScript によるライブラリと型定義
- `docs`: minista によるドキュメントサイト。`npm run docs:build` で静的出力
- `play`: `npm run play` で手動検証用ページを配信。`/_default/` は通常表示、`/secure/` はスタイルの URL 制限を確認

配布先は v2.0.2 と同じ `dist/ie-buster.js`・`dist/ie-buster.min.js`・`lib/cjs/index.js`・`lib/esm/index.js`・`types/index.d.ts` です。`npm test` で公開済み v2.0.2 との動作比較を行います。

配布 JS は IE11 向けに ES5 互換の構文で記述し、ビルド時に構文検証します。TypeScript は型チェックと型定義の生成に使用します。IE11 の実機確認には、`play` の HTML とビルド済みのクラシックスクリプトを使用してください。

## License

- MIT

## Credit

- Author: [Qrac](https://qrac.jp)
- Illustration: [Mainoko](https://mainoko.jp)
- Organization: [QRANOKO](https://qranoko.jp)
