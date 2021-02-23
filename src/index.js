const ieBuster = (() => {
  class Buster {
    constructor(options = {}) {
      const defaultOptions = {
        appId: "ie-buster-app",
        insertSelector: "body",
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
      Object.assign(this, defaultOptions, options)

      const subAssignKeys = [
        "appStyles",
        "cardStyles",
        "textStyles",
        "linkStyles",
      ]
      const subAssignMap = (keys) => {
        keys.map((key) => {
          return (
            options[key] &&
            (this[key] = {
              ...defaultOptions[key],
              ...options[key],
            })
          )
        })
      }
      subAssignMap(subAssignKeys)
    }

    createBuster() {
      const wrap = document.querySelector(this.insertSelector)
      const app = document.createElement("div")
      const card = document.createElement("div")
      const text = document.createElement("p")
      const link = document.createElement("a")
      const edge = !this.linkUrl.indexOf("microsoft-edge")
      const tab = !edge && this.linkNewTab

      app.id = this.appId

      styling(app, this.appStyles)
      styling(card, this.cardStyles)
      styling(text, this.textStyles)
      styling(link, this.linkStyles)

      text.innerText = this.mainText
      link.innerText = this.linkText
      link.href = encodeURI(this.linkUrl)
      tab && link.setAttribute("target", "_blank")
      tab && link.setAttribute("rel", "noopener noreferrer")

      card.appendChild(text)
      card.appendChild(link)
      app.appendChild(card)
      wrap.appendChild(app)
    }

    removeBuster() {
      const target = document.getElementById(this.appId)
      target && target.parentNode.removeChild(target)
    }
  }

  let activeBuster = null

  const styling = (target, styles) => {
    Object.keys(styles).map((key) => {
      ~styles[key].indexOf("url(") || (target.style[key] = styles[key])
    })
  }

  const check = () => {
    if ((!!window.MSInputMethodContext && !!document.documentMode) || false) {
      return true
    }
  }

  const create = (options) => {
    activeBuster = new Buster(options)
    activeBuster.createBuster()
  }

  const remove = (options) => {
    activeBuster = new Buster(options)
    activeBuster.removeBuster()
  }

  const init = (options) => {
    if (check()) {
      create(options)
    }
  }

  return { check, create, remove, init }
})()

export default ieBuster
