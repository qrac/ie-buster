# 開発

## 構成

```text
packages/ie-buster/
  src/index.ts                ライブラリのソース
  rolldown.config.ts          配布 JS のビルド・構文検証
  tsconfig.build.json         型定義の生成設定
  tests/                     配布物と公開済み v2.0.2 の動作比較
  dist/                      クラシックスクリプトの生成先
  lib/                       CommonJS・ES Modules の生成先
  types/                     型定義の生成先
docs/                        minista によるドキュメントサイト
play/_default/index.html     通常表示の手動検証用ページ
play/secure/index.html       スタイルの URL 制限の手動検証用ページ
wrangler.jsonc               Cloudflare Workers の静的配信設定
```

npm workspaces は `docs` と `packages/*`。ルートは private で、開発ツールを管理します。
Node.js 24 以上と npm を使用し、以下のコマンドはリポジトリのルートから実行します。

## コマンド

```sh
npm install
npm run build
npm run check
npm run docs
```

| コマンド | 用途 |
| --- | --- |
| `npm run dev` | 配布 JS のビルドを監視モードで実行 |
| `npm run build` | Rolldown で配布 JS、TypeScript で型定義を生成 |
| `npm run check` | ライブラリとサイトの型チェック |
| `npm test` | 配布物をビルドし、公開済み v2.0.2 との動作比較などを実行 |
| `npm run play` | ライブラリをビルドし、Vite で手動検証用ページを配信 |
| `npm run docs` | ライブラリをビルドし、minista の開発サーバーを起動 |
| `npm run docs:check` | サイトの型チェック |
| `npm run docs:build` | ライブラリとサイトをビルド。サイトの出力先は docs/dist |
| `npm run docs:preview` | ビルド済みサイトをプレビュー |

Workers でのプレビューとデプロイは [release.md](release.md) を参照してください。

## IE11 互換性

配布 JS は IE11 向けに ES5 互換の構文で記述し、ビルド時に構文検証します。TypeScript は型チェックと型定義の生成に使用します。
配布パスは v2.0.2 と同じ構成を維持します。各ファイルの用途は [release.md](release.md) を参照してください。

`npm test` で公開済み v2.0.2 との動作比較を行います。比較元の情報は [テスト用 fixture の README](../packages/ie-buster/tests/fixtures/README.md) を参照してください。
IE11 の実機確認には、`play` の HTML とビルド済みのクラシックスクリプトを使用してください。
`npm run play` の `/_default/` は通常表示、`/secure/` はスタイルの URL 制限の確認用です。

## 変更後の確認

- ライブラリ・ビルド変更: `npm run check` と `npm test`。IE11 での表示に関わる変更は実機でも確認します。
- サイト変更: `npm run docs:check` と `npm run docs:build`。見た目を変更した場合はプレビューでも確認します。
- Workers 設定変更: `npm run docs:preview:workers` で静的配信を確認します。
- 文書のみの変更: 記述・参照先・`git diff --check` を確認します。サイトの再ビルドは不要です。
