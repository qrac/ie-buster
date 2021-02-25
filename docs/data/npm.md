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
```

TypeScript 向けに型情報も提供しています。
