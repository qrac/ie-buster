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

`appStyles`・`cardStyles`・`textStyles`・`linkStyles` は `camelCaseKey: value` 形式のオブジェクトを設定することでデフォルトの CSS を上書きできます。CSS Injection 攻撃を防ぐため、`value` に `url(...)` を設定することはできません。[（ → オプション詳細 ）](https://github.com/qrac/ie-buster/#options)
