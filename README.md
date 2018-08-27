# IE Buster

## Demo

https://codepen.io/qrac/full/gdPNXN/

`Change View` > `Open on CrossBrowserTesting →` から IE 表示をテストできます。

## About

![IE Buster Image](https://i.gyazo.com/29f848ce07303cc0bf84348faaf43931.png)

IE Buster（アイイーバスター）は、IE ユーザーに Chrome を促すポップアップです。Web 制作者みんなを救うために開発しました。

多くの場合、IE ユーザーはブラウザの種類を認識していません。IE を強烈に否定しても「IE？なんのこっちゃ？」と暖簾に腕押し状態になってしまうので、もっと自然な移行シーンを増やそうと考えました。そこで、開発したのが IE Buster です。

`ie-buster.js` を読み込んだページに IE10・IE11 でアクセスすると、自動的に Chrome ダウンロードを促すポップアップが表示されます。UI は Microsoft の Fabric 風でオフィシャル感を出し、文言はセキュリティに訴えかけてみました。

閉じるボタンはありません。推奨環境でないブラウザで閲覧を続けられては困るからです。真っ当な提案を、できるだけ礼儀正しく IE ユーザーに届けます。

ネーミング程の破壊力は無いかもしれませんが、IE Buster が Web 制作者を救う一手になれば幸いです。

## Use

### [CDN](https://www.jsdelivr.com/package/npm/ie-buster)

```html
<script src="https://cdn.jsdelivr.net/npm/ie-buster@0.1.0/dist/ie-buster.js"></script>
```

### [npm](https://www.npmjs.com/package/ie-buster)

```bash
$ npm i -D ie-buster
```

## Support

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
- Organization: [QRANOKO](https://qranoko.jp)
