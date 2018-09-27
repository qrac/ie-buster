# IE Buster

<p align="center">
  <img width="230" src="https://i.gyazo.com/a238286ee75bc88afb08abb435192bf1.png" alt="IE Buster Logo Illustration">
</p>

## Site

https://ie-buster.qranoko.jp

## Quick Test

https://codepen.io/qrac/full/gdPNXN/

`Change View` → `Open on CrossBrowserTesting` から IE 表示をテストできます。

## About

![IE Buster Image](https://i.gyazo.com/9d06f4a348768f7fb6559ffe487a166a.png)

IE Buster（アイイーバスター）は、IE ユーザーに Chrome を促す軽量なポップアップ JS です。Web 制作者みんなを救うために開発しました。

多くの場合、IE ユーザーはブラウザの種類を認識していません。IE を強烈に否定しても「IE？なんのこっちゃ？」と暖簾に腕押し状態となってしまうので、もっと自然な移行シーンを増やそうと考えました。そこで、開発したのが IE Buster です。

`ie-buster.js` を読み込んだページに IE8〜11 でアクセスすると、自動的に Chrome ダウンロードを促すポップアップが表示されます（オプションで文言やリンクの調整が可能）。UI は Microsoft の Fabric 風でオフィシャル感を意識。

閉じるボタンはありません。推奨環境でないブラウザで閲覧を続けられては困るからです。真っ当な提案を、できるだけ礼儀正しく IE ユーザーに届けます。

ネーミング程の破壊力はないかもしれませんが、IE Buster が Web 制作者を救う一手になれば幸いです。

## How To Use

### [CDN](https://www.jsdelivr.com/package/npm/ie-buster)

```html
<script src="https://cdn.jsdelivr.net/npm/ie-buster@1.1.0/dist/ie-buster.min.js"></script>
```

HTML 内に CDN のリンクを貼るだけで、ポップアップを表示できます。

### [npm](https://www.npmjs.com/package/ie-buster)

```bash
$ npm i -D ie-buster
```

`npm install` も利用可能です。

### Vue.js

npm でインストール後、 `App.vue` に下記を追記します。

```js
import 'ie-buster/dist/ie-buster.min.js'
```

### Nuxt.js

npm でインストール後、Vue ファイルで呼び出して利用できます。IE Buster は JavaScript 内で`window`を使用しているので、Nuxt.js では [SSR を迂回する記述](https://ja.nuxtjs.org/faq/window-document-undefined/)で呼び出します。重複しないよう、`nuxt.config.js` の `build > vendor` にも加えます。

```html
<script>
if (process.browser) {
  require('ie-buster');
}
</script>
```

```js
module.exports = {
  build: {
    vendor: ['ie-buster']
  }
}
```

`nuxt.config.js` に CDN のスクリプトタグを記述する方法でも使用可能です。

```js
module.exports = {
  head: {
    script: [
      {
        src:
          'https://cdn.jsdelivr.net/npm/ie-buster@1.1.0/dist/ie-buster.min.js'
      }
    ]
  }
}
```

### Netlify

Netlify にサイトをデプロイしている場合は、Snippet injection で CDN リンク挿入 → 再デプロイするだけで IE Buster が導入できます。

![Netlify Snippet Injection Image](https://i.gyazo.com/ef81f2d9153b817a5a1b851656289d75.png)

### WordPress Plugin

[WP IE Buster](https://github.com/qrac/wp-ie-buster-dev) として[WordPress 公式プラグインディレクトリ](https://wordpress.org/plugins/wp-ie-buster/)に追加されました。`ie buster` などで検索・インストール後、有効化するだけで WordPress サイトにポップアップを表示できます。

※WordPress Plugin 版には、まだカスタマイズ用のオプションが実装されていません

![WP IE Buster Install Image](https://i.gyazo.com/2fffbb18f83a7287a2be3063b7bd53a8.png)

## Options

`ie-buster.js` を読み込んだ後に、オプションを使ってテキストやリンクを差し替えられます。デフォルトでは以下の内容が設定されています。差し替える場合は、文言とリンク内容に齟齬がでないよう気をつけてください。

```html
<script src="js/ie-buster.js"></script>
<script>
  ieBuster({
    mainText: "ご利用のインターネットブラウザは推奨環境ではありません。Webサイトの動作が保証できませんので、最新の Google Chrome をご利用ください。",
    linkText: "ダウンロードページへ",
    linkUrl: "https://www.google.com/chrome/"
  })
</script>
```

## Support

- IE 8
- IE 9
- IE 10
- IE 11

## Develop

- MacBook Pro: 13-inch 2016 No-touchbar
- OS: macOS High Sierra 10.13.6
- Node.js: v10.9.0

## License

- MIT

## Credit

- Author: [Qrac](https://qrac.jp)
- Illustration: [Mainoko](https://mainoko.jp)
- Organization: [QRANOKO](https://qranoko.jp)
