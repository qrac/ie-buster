import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { test } from "node:test"
import vm from "node:vm"
import { parse } from "acorn"

function esmAsScript(code) {
  const ast = parse(code, { ecmaVersion: "latest", sourceType: "module" })
  const statement = ast.body.find(node => node.type === "ExportNamedDeclaration")
  const name = statement.specifiers.find(node => node.exported.name === "default").local.name
  return code.slice(0, statement.start) + "this.ieBuster = " + name + ";" + code.slice(statement.end)
}

function environment(code, ie = true, commonjs = false) {
  const nodes = []
  function element(tagName) {
    return {
      tagName,
      style: {},
      attributes: {},
      children: [],
      setAttribute(key, value) {
        this.attributes[key] = value
      },
      appendChild(child) {
        child.parentNode = this
        this.children.push(child)
        nodes.push(child)
      },
      removeChild(child) {
        this.children.splice(this.children.indexOf(child), 1)
        nodes.splice(nodes.indexOf(child), 1)
      },
    }
  }
  const body = element("body")
  const context = vm.createContext({
    window: ie ? { MSInputMethodContext: {} } : {},
    document: {
      documentMode: ie ? 11 : undefined,
      querySelector: (selector) => (selector === "body" ? body : null),
      querySelectorAll: () =>
        nodes.filter((node) => "data-ie-buster" in node.attributes),
      createElement: element,
    },
  })
  if (commonjs) {
    context.module = { exports: {} }
    context.exports = context.module.exports
  }
  // Exercise the actual distribution with APIs unavailable in IE11 removed.
  vm.runInContext("Object.assign = undefined; Symbol = undefined", context)
  vm.runInContext(code, context)
  return { api: commonjs ? context.module.exports : context.ieBuster, body }
}

for (const filename of ["ie-buster.js", "ie-buster.min.js"]) {
  const code = readFileSync(
    new URL(`../dist/${filename}`, import.meta.url),
    "utf8",
  )
  test(`${filename}: ES5 syntax and IE11 runtime`, () => {
    parse(code, { ecmaVersion: 5 })
    const { api, body } = environment(code)
    assert.equal(api.check(), true)
    api.init({
      textStyles: { fontWeight: "700" },
      linkStyles: { background: "url(example.png)" },
    })
    assert.equal(body.children.length, 1)
    const card = body.children[0].children[0]
    assert.equal(card.children[0].style.fontWeight, "700")
    assert.equal(card.children[0].style.fontSize, "14px")
    assert.equal(card.children[1].style.background, undefined)
    assert.equal(card.children[1].attributes.target, "_blank")
    assert.equal(card.children[1].attributes.rel, "noopener noreferrer")
    api.create({ linkUrl: "microsoft-edge:https://example.com" })
    assert.equal(body.children.length, 1)
    assert.equal(
      body.children[0].children[0].children[1].attributes.target,
      undefined,
    )
    api.clear()
    assert.equal(body.children.length, 0)
  })
  test(`${filename}: modern browsers do not initialize a popup`, () => {
    const { api, body } = environment(code, false)
    assert.equal(api.check(), undefined)
    api.init()
    assert.equal(body.children.length, 0)
    api.create()
    assert.equal(body.children.length, 1)
    api.clear()
    assert.throws(() => api.create({ parentSelector: "#missing" }))
  })
}

test("package default export resolves in ESM and CommonJS", async () => {
  const esm = (await import("ie-buster")).default
  const cjs = createRequire(import.meta.url)("ie-buster")
  for (const api of [esm, cjs]) {
    assert.deepEqual(Object.keys(api).sort(), [
      "check",
      "clear",
      "create",
      "init",
    ])
  }
})

const reference = readFileSync(new URL("./fixtures/ie-buster-2.0.2.js", import.meta.url), "utf8")

function snapshot(node) {
  return {
    tagName: node.tagName,
    id: node.id,
    attributes: node.attributes,
    style: node.style,
    innerText: node.innerText,
    href: node.href,
    children: node.children.map(snapshot),
  }
}

const scenarios = [
  { name: "IE detection and initialization", ie: true, actions: [["check"], ["init"], ["clear"]] },
  { name: "non-IE detection and initialization", ie: false, actions: [["check"], ["init"], ["create"], ["clear"]] },
  {
    name: "custom text, URL, ID and merged styles",
    actions: [["create", {
      appId: "custom-app",
      parentSelector: "body",
      mainText: "最新のブラウザをご利用ください。",
      linkText: "Download",
      linkUrl: "https://example.com/日本語",
      linkNewTab: false,
      appStyles: { top: "auto", bottom: "0" },
      cardStyles: { maxWidth: "540px", borderRadius: "8px" },
      textStyles: { fontWeight: "700" },
      linkStyles: { background: "purple", borderRadius: "4px" },
    }]],
  },
  { name: "Edge links", actions: [["create", { linkUrl: "microsoft-edge:https://example.com" }]] },
  { name: "recreation and repeated clearing", actions: [["create"], ["create", { mainText: "Replaced" }], ["clear"], ["clear"]] },
  { name: "CSS URL exclusion", actions: [["create", { cardStyles: { background: "url(example.png)", backgroundColor: "#f3ecec" } }]] },
  { name: "missing parent", actions: [["create"], ["create", { parentSelector: "#missing" }]] },
  { name: "explicit undefined styles", actions: [["create", { appStyles: undefined }]] },
  { name: "numeric style behavior", actions: [["create", { textStyles: { fontWeight: 700 } }]] },
]

for (const path of ["dist/ie-buster.js", "dist/ie-buster.min.js", "lib/cjs/index.js", "lib/esm/index.js"]) {
  const raw = readFileSync(new URL(`../${path}`, import.meta.url), "utf8")
  const code = path.includes("esm") ? esmAsScript(raw) : raw
  test(`${path}: runtime body parses as ES5`, () => {
    parse(code, { ecmaVersion: 5 })
  })
  for (const scenario of scenarios) {
    test(`${path}: matches v2.0.2 — ${scenario.name}`, () => {
      const old = environment(reference, scenario.ie ?? true)
      const current = environment(code, scenario.ie ?? true, path.includes("cjs"))
      for (const [method, options] of scenario.actions) {
        const run = ({ api }) => {
          try { return { result: api[method](options) } }
          catch (error) { return { error: error.name } }
        }
        assert.deepEqual(run(current), run(old))
        assert.deepEqual(snapshot(current.body), snapshot(old.body))
      }
    })
  }
}

test("distribution entry paths match the published v2.0.2 package", () => {
  const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"))
  assert.equal(pkg.cdn, "dist/ie-buster.js")
  assert.equal(pkg["cdn:min"], "dist/ie-buster.min.js")
  assert.equal(pkg.main, "lib/cjs/index.js")
  assert.equal(pkg.module, "lib/esm/index.js")
  assert.equal(pkg.types, "types/index.d.ts")
  for (const entry of [pkg.cdn, pkg["cdn:min"], pkg.main, pkg.module, pkg.types]) {
    assert.ok(readFileSync(new URL(`../${entry}`, import.meta.url)).length)
  }
})

test("UMD also resolves through AMD and CommonJS paths", () => {
  for (const filename of ["ie-buster.js", "ie-buster.min.js"]) {
    const code = readFileSync(new URL(`../dist/${filename}`, import.meta.url), "utf8")
    let amd
    const define = (...args) => { amd = args[args.length - 1]() }
    define.amd = {}
    vm.runInNewContext(code, { define })
    assert.deepEqual(Object.keys(amd).sort(), ["check", "clear", "create", "init"])
    const cjs = createRequire(import.meta.url)(`ie-buster/dist/${filename}`)
    assert.deepEqual(Object.keys(cjs).sort(), Object.keys(amd).sort())
  }
})
