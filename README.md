<p align="center">
  <img width="230" src="https://i.gyazo.com/a238286ee75bc88afb08abb435192bf1.png" alt="IE Buster Logo Illustration">
</p>

# IE Buster

<p>
  <a aria-label="Made by QRANOKO" href="https://qranoko.jp">
    <img src="https://img.shields.io/badge/MADE%20BY%20QRANOKO-212121.svg?style=for-the-badge&labelColor=212121">
  </a>
  <a aria-label="NPM version" href="https://www.npmjs.com/package/ie-buster">
    <img alt="" src="https://img.shields.io/npm/v/ie-buster.svg?style=for-the-badge&labelColor=212121">
  </a>
  <a aria-label="License" href="https://github.com/qrac/ie-buster/blob/master/LICENSE">
    <img alt="" src="https://img.shields.io/npm/l/ie-buster.svg?style=for-the-badge&labelColor=212121">
  </a>
</p>

## Site & Documentation

https://ie-buster.qranoko.jp

## Quick Test

https://codepen.io/qrac/pen/MWbrZNQ

## About

![IE Buster Image](https://i.gyazo.com/9d06f4a348768f7fb6559ffe487a166a.png)

IE Buster（アイイーバスター）は、IE ユーザーに Chrome を促す軽量なポップアップ JS です。Web 制作者みんなを救うために開発しました。

多くの場合、IE ユーザーはブラウザの種類を認識していません。IE を強烈に否定しても「IE？なんのこっちゃ？」と暖簾に腕押し状態となってしまうので、もっと自然な移行シーンを増やそうと考えました。そこで、開発したのが IE Buster です。

IE Buster を導入して IE11 でアクセスすると、自動的に Chrome ダウンロードを促すポップアップが表示されます。UI は Microsoft 風でオフィシャル感を意識。

閉じるボタンはありません。推奨環境でないブラウザで閲覧を続けられては困るからです。真っ当な提案を、できるだけ礼儀正しく IE ユーザーに届けます。

ネーミング程の破壊力はないかもしれませんが、IE Buster が Web 制作者を救う一手になれば幸いです。

## How To Use

### [CDN](https://www.jsdelivr.com/package/npm/ie-buster)

<!-- prettier-ignore -->
```html
<script nomodule src="https://cdn.jsdelivr.net/npm/ie-buster@2.0.1/dist/ie-buster.min.js"></script>
<script nomodule>ieBuster.init()</script>
```

`<script>` に `nomodule` を付与すると、ES Modules に対応しているモダンブラウザで JavaScript の読み込み自体をキャンセルできます。

### [npm](https://www.npmjs.com/package/ie-buster)

```bash
$ npm i ie-buster
```

```js
import ieBuster from "ie-buster"

// Use
ieBuster.init()

// OR (If window becomes undefined)
process.browser && ieBuster.init()

// OR (If process is not defined)
useEffect(() => {
  ieBuster.init()
})
```

TypeScript 向けに型情報も提供しています。

## Methods

| Method              | Result                                          |
| ------------------- | ----------------------------------------------- |
| `ieBuster.init()`   | 通常の実行：IE 検出をしてポップアップ表示       |
| `ieBuster.check()`  | IE 検出のみ：付随する処理を同時に行う場合に使う |
| `ieBuster.create()` | ポップアップ表示のみ：IE 検出を含まない         |
| `ieBuster.clear()`  | ポップアップをすべて削除                        |

## Options

<!-- prettier-ignore -->
```js
// Example
ieBuster.init({
  appId: "your-custom-id",
  mainText: "ご利用の Internet Explorer は推奨環境ではありません。最新の Firefox を推奨します。",
  linkText: "Download",
  linkUrl: "https://www.mozilla.org/ja/firefox/new/",
  linkNewTab: false,
  appStyles: { top: "auto", bottom: "0" },
  cardStyles: { maxWidth: "540px", borderRadius: "8px" },
  textStyles: { fontWeight: "700" },
  linkStyles: { background: "purple", borderRadius: "4px" },
})
```

<!-- prettier-ignore -->
| Option  | Type     | Default           |
| ------- | -------- | ----------------- |
| `appId` | `string` | `ie-buster-app` |
| `parentSelector` | `string` | `body` |
| `mainText` | `string` | `ご利用のインターネットブラウザは推奨環境ではありません。Webサイトの動作が保証できませんので、最新の Google Chrome をご利用ください。` |
| `linkText` | `string` | `ダウンロードページへ` |
| `linkUrl` | `string` | `https://www.google.com/chrome/` |
| `linkNewTab` | `boolean` | `true` |
| `appStyles` | `{}` | CSS Objects |
| `cardStyles` | `{}` | CSS Objects |
| `textStyles` | `{}` | CSS Objects |
| `linkStyles` | `{}` | CSS Objects |

`appStyles`・`cardStyles`・`textStyles`・`linkStyles` は `camelCaseKey: value` 形式のオブジェクトを設定することでデフォルトの CSS を上書きできます。CSS Injection 攻撃を防ぐため、`value` に `url(...)` を設定することはできません。

## WordPress

![WP IE Buster Install Image](https://i.gyazo.com/2fffbb18f83a7287a2be3063b7bd53a8.png)

[WP IE Buster](https://wordpress.org/plugins/wp-ie-buster/) として WordPress プラグインをリリースしました 🎉

## Support

- IE 11

## License

- MIT

## Credit

- Author: [Qrac](https://qrac.jp)
- Illustration: [Mainoko](https://mainoko.jp)
- Organization: [QRANOKO](https://qranoko.jp)
