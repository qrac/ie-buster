import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { test } from "node:test"
import vm from "node:vm"
import { parse } from "acorn"

function environment(code, ie = true) {
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
  // Exercise the actual distribution with APIs unavailable in IE11 removed.
  vm.runInContext("Object.assign = undefined; Symbol = undefined", context)
  vm.runInContext(code, context)
  return { api: context.ieBuster, body }
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
      textStyles: { fontWeight: 700 },
      linkStyles: { background: "URL(example.png)" },
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
    assert.equal(api.check(), false)
    api.init()
    assert.equal(body.children.length, 0)
    api.create()
    assert.equal(body.children.length, 1)
    api.clear()
    assert.doesNotThrow(() => api.create({ parentSelector: "#missing" }))
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
