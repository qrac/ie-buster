# AGENTS.md

IE Buster は IE11 ユーザーに Chrome のダウンロードを促すポップアップ JS。npm workspaces で配布パッケージとドキュメントサイトを管理します。

## 最初に読むもの

- [context/README.md](context/README.md): 開発情報の索引
- [context/development.md](context/development.md): 構成・コマンド・互換性・変更後の確認
- [context/release.md](context/release.md): npm の配布内容・Cloudflare Workers

## 作業方針

- 作業前に上記の context/ を読み、変更対象の構成と確認手順を把握してください。
- ルートの README.md は利用者向けに、概要・導入方法・対応ブラウザを簡潔に記載します。開発手順や AI 向けの設計判断は context/ にまとめます。
- ライブラリの正本は `packages/ie-buster/src/index.ts`。`dist`・`lib`・`types` や `node_modules` の生成物を直接編集しません。
- 配布 JS の IE11 向け ES5 互換性と既存の配布パスを維持します。ライブラリやビルドを変更したら、公開済み v2.0.2 との動作比較を含む `npm test` で確認します。
- サイトは `docs`、手動検証用ページは `play`。IE11 の実機確認にはビルド済みのクラシックスクリプトと `play` の HTML を使用します。
- 開発ツールの依存はルートで管理します。コマンドは各 package.json、Workers の配信設定は `wrangler.jsonc` を正本とします。
- 構成や運用を変更したら、該当する context/ の記述も更新します。
