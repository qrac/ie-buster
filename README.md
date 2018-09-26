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

![IE Buster Image](https://i.gyazo.com/a8e2283b557bda08820bf938b9288546.png)

IE Buster（アイイーバスター）は、IE ユーザーに Chrome を促す 1.5KB のポップアップ JS です。Web 制作者みんなを救うために開発しました。

多くの場合、IE ユーザーはブラウザの種類を認識していません。IE を強烈に否定しても「IE？なんのこっちゃ？」と暖簾に腕押し状態となってしまうので、もっと自然な移行シーンを増やそうと考えました。そこで、開発したのが IE Buster です。

`ie-buster.js` を読み込んだページに IE8〜11 でアクセスすると、自動的に Chrome ダウンロードを促すポップアップが表示されます。UI は Microsoft の Fabric 風でオフィシャル感を出し、文言はセキュリティに訴えかけてみました。

閉じるボタンはありません。推奨環境でないブラウザで閲覧を続けられては困るからです。真っ当な提案を、できるだけ礼儀正しく IE ユーザーに届けます。

ネーミング程の破壊力はないかもしれませんが、IE Buster が Web 制作者を救う一手になれば幸いです。

## How To Use

### [CDN](https://www.jsdelivr.com/package/npm/ie-buster)

```html
<script src="https://cdn.jsdelivr.net/npm/ie-buster@1.0.3/dist/ie-buster.min.js"></script>
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
import "ie-buster/dist/ie-buster.min.js"
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
    vendor: ["ie-buster"]
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
          "https://cdn.jsdelivr.net/npm/ie-buster@1.0.3/dist/ie-buster.min.js"
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

![WP IE Buster Install Image](https://i.gyazo.com/fb4631c122e62ff28f4f5d4e01088bfe.png)

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
