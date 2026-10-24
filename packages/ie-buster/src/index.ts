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

const defaultOptions: Required<Options> = {
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

const dataBuster = "data-ie-buster"

function styling(target: HTMLElement, styles: Styles): void {
  Object.keys(styles).forEach(function (key) {
    const value = String(styles[key])
    if (value.toLowerCase().indexOf("url(") === -1) {
      ;(target.style as unknown as Record<string, string>)[key] = value
    }
  })
}

function check(): boolean {
  return !!(
    (window as Window & { MSInputMethodContext?: unknown })
      .MSInputMethodContext &&
    (document as Document & { documentMode?: number }).documentMode
  )
}

function clear(): void {
  const targets = document.querySelectorAll("[" + dataBuster + "]")
  Array.prototype.forEach.call(targets, function (target: HTMLElement) {
    if (target.parentNode) target.parentNode.removeChild(target)
  })
}

function create(options: Options = {}): void {
  const settings = { ...defaultOptions, ...options }
  const wrap = document.querySelector(settings.parentSelector)
  if (!wrap) return

  clear()
  const app = document.createElement("div")
  const card = document.createElement("div")
  const text = document.createElement("p")
  const link = document.createElement("a")
  const edge = settings.linkUrl.indexOf("microsoft-edge") === 0

  app.id = settings.appId
  app.setAttribute(dataBuster, "")
  styling(app, { ...defaultOptions.appStyles, ...options.appStyles })
  styling(card, { ...defaultOptions.cardStyles, ...options.cardStyles })
  styling(text, { ...defaultOptions.textStyles, ...options.textStyles })
  styling(link, { ...defaultOptions.linkStyles, ...options.linkStyles })

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
  wrap.appendChild(app)
}

function init(options?: Options): void {
  if (check()) create(options)
}

export default { check, clear, create, init }
