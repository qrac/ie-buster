# IE Buster

## Site & Documentation

https://ie-buster.qranoko.jp

## Quick Test

https://codepen.io/qrac/pen/MWbrZNQ

## About

IE Buster（アイイーバスター）は、IEユーザーにChromeを促す軽量なポップアップJSです。Web制作者みんなを救うために開発しました。

多くの場合、IEユーザーはブラウザの種類を認識していません。IEを強烈に否定しても「IE？なんのこっちゃ？」と暖簾に腕押し状態となってしまうので、もっと自然な移行シーンを増やそうと考えました。そこで、開発したのがIE Busterです。

IE Busterを導入してIE11でアクセスすると、自動的にChromeダウンロードを促すポップアップが表示されます。UIはMicrosoft風でオフィシャル感を意識。

閉じるボタンはありません。推奨環境でないブラウザで閲覧を続けられては困るからです。真っ当な提案を、できるだけ礼儀正しくIEユーザーに届けます。

ネーミング程の破壊力はないかもしれませんが、IE BusterがWeb制作者を救う一手になれば幸いです。

## Setup

### [CDN](https://www.jsdelivr.com/package/npm/ie-buster)

<!-- prettier-ignore -->
```html
<script nomodule src="https://cdn.jsdelivr.net/npm/ie-buster@2.0.2/dist/ie-buster.min.js"></script>
<script nomodule>ieBuster.init()</script>
```

`<script>`に`nomodule`を付与すると、ES Modulesに対応しているモダンブラウザでJavaScriptの読み込み自体をキャンセルできます。

### [npm](https://www.npmjs.com/package/ie-buster)

```bash
$ npm install ie-buster
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
}, [])
```

TypeScript向けに型情報も提供しています。

## Methods

| Method              | Result                                          |
| ------------------- | ----------------------------------------------- |
| `ieBuster.init()`   | 通常の実行：IE検出をしてポップアップ表示       |
| `ieBuster.check()`  | IE検出のみ：付随する処理を同時に行う場合に使う |
| `ieBuster.create()` | ポップアップ表示のみ：IE検出を含まない         |
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

`appStyles`・`cardStyles`・`textStyles`・`linkStyles`は`camelCaseKey: value`形式のオブジェクトを設定することでデフォルトのCSSを上書きできます。CSS Injection攻撃を防ぐため、`value`に`url(...)`を設定することはできません。

## WordPress

![WP IE Buster Install Image](https://i.gyazo.com/2fffbb18f83a7287a2be3063b7bd53a8.png)

[WP IE Buster](https://wordpress.org/plugins/wp-ie-buster/)としてWordPressプラグインをリリースしました 🎉

## Support

- IE 11

## License

- MIT

## Credit

- Author: [Qrac](https://qrac.jp)
- Illustration: [Mainoko](https://mainoko.jp)
- Organization: [QRANOKO](https://qranoko.jp)
