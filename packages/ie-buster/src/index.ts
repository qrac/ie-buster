export type Styles = Record<string, string | number>

export interface Options {
  appId?: string
  parentSelector?: string
  mainText?: string
  linkText?: string
  linkUrl?: string
  linkNewTab?: boolean
  appStyles?: Styles
  cardStyles?: Styles
  textStyles?: Styles
  linkStyles?: Styles
}

var defaultOptions: Required<Options> = {
  appId: "ie-buster-app",
  parentSelector: "body",
  mainText:
    "ご利用のインターネットブラウザは推奨環境ではありません。Webサイトの動作が保証できませんので、最新の Google Chrome をご利用ください。",
  linkText: "ダウンロードページへ",
  linkUrl: "https://www.google.com/chrome/",
  linkNewTab: true,
  appStyles: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    padding: "16px",
    boxSizing: "border-box",
    zIndex: "999999",
  },
  cardStyles: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    maxWidth: "886px",
    margin: "0 auto",
    padding: "16px",
    background: "#fff",
    boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.4)",
    boxSizing: "border-box",
    fontFamily: "SegoeUI, Meiryo, sans-serif",
  },
  textStyles: {
    flex: "1 0 0%",
    maxWidth: "100%",
    margin: "0",
    color: "#000",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "1.5",
  },
  linkStyles: {
    flex: "none",
    display: "flex",
    margin: "0 0 0 16px",
    padding: "12px 24px",
    background: "#0078d4",
    boxSizing: "border-box",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "1",
    textAlign: "center",
    textDecoration: "none",
    whiteSpace: "nowrap",
  },
}

var dataBuster = "data-ie-buster"

function styling(target: HTMLElement, styles: Styles): void {
  Object.keys(styles).forEach(function (key) {
    var value = styles[key]
    if ((value as string).indexOf("url(") === -1) {
      ;(target.style as unknown as Styles)[key] = value
    }
  })
}

function check(): boolean | undefined {
  if (
    (window as Window & { MSInputMethodContext?: unknown }).MSInputMethodContext &&
    (document as Document & { documentMode?: number }).documentMode
  ) {
    return true
  }
}

function clear(): void {
  var targets = document.querySelectorAll("[" + dataBuster + "]")
  Array.prototype.forEach.call(targets, function (target: HTMLElement) {
    target.parentNode!.removeChild(target)
  })
}

// Keep runtime syntax compatible with ES5. The build rejects newer syntax in
// classic scripts so IE11 support does not depend on a compiler's ES5 backend.
function merge<T extends object>(defaults: T, overrides?: Partial<T>): T {
  var result = {} as T
  Object.keys(defaults).forEach(function (key) {
    result[key as keyof T] = defaults[key as keyof T]
  })
  if (overrides) {
    Object.keys(overrides).forEach(function (key) {
      result[key as keyof T] = overrides[key as keyof T] as T[keyof T]
    })
  }
  return result
}

function create(options?: Options): void {
  options = options === undefined ? {} : options
  var settings = merge(defaultOptions, options)
  if (options.appStyles) {
    settings.appStyles = merge(defaultOptions.appStyles, options.appStyles)
  }
  if (options.cardStyles) {
    settings.cardStyles = merge(defaultOptions.cardStyles, options.cardStyles)
  }
  if (options.textStyles) {
    settings.textStyles = merge(defaultOptions.textStyles, options.textStyles)
  }
  if (options.linkStyles) {
    settings.linkStyles = merge(defaultOptions.linkStyles, options.linkStyles)
  }
  clear()
  var wrap = document.querySelector(settings.parentSelector)
  var app = document.createElement("div")
  var card = document.createElement("div")
  var text = document.createElement("p")
  var link = document.createElement("a")
  var edge = settings.linkUrl.indexOf("microsoft-edge") === 0

  app.id = settings.appId
  app.setAttribute(dataBuster, "")
  styling(app, settings.appStyles)
  styling(card, settings.cardStyles)
  styling(text, settings.textStyles)
  styling(link, settings.linkStyles)

  text.innerText = settings.mainText
  link.innerText = settings.linkText
  link.href = encodeURI(settings.linkUrl)
  if (!edge && settings.linkNewTab) {
    link.setAttribute("target", "_blank")
    link.setAttribute("rel", "noopener noreferrer")
  }
  card.appendChild(text)
  card.appendChild(link)
  app.appendChild(card)
  wrap!.appendChild(app)
}

function init(options?: Options): void {
  if (check()) create(options)
}

export default { check: check, clear: clear, create: create, init: init }
