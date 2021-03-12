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

TypeScript 向けに型情報も提供しています。
