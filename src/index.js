const ieBuster = (() => {
  class Buster {
    constructor(options = {}) {
      const defaultOptions = {
        id: "ie-buster-app",
        mainText:
          "ご利用のインターネットブラウザは推奨環境ではありません。Webサイトの動作が保証できませんので、最新の Google Chrome をご利用ください。",
        linkText: "ダウンロードページへ",
        linkUrl: "https://www.google.com/chrome/",
      }
      Object.assign(this, defaultOptions, options)
    }

    createBuster() {
      const body = document.getElementsByTagName("body")[0]
      const app = document.createElement("div")

      app.id = this.id
      app.setAttribute(
        "style",
        `position: fixed; top: 0; left: 0; width: 100%; padding: 16px; box-sizing: border-box; z-index: 999999;`
      )

      app.innerHTML =
        `<div style="width: 100%; max-width:866px; margin: 0 auto; padding: 16px 20px; background-color: #fff; box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 5px 0px; box-sizing: border-box; font-family: SegoeUI, Meiryo, sans-serif;">` +
        `<p style="display: block; float: left; width: 100%; max-width: 664px; margin: 0; color: #000; font-size: 14px; font-weight: 400; line-height: 1.5;">` +
        this.mainText +
        `</p>` +
        `<a style="display: block; float: right; height: 36px; width: 154px; padding: 0 16px; background-color: rgb(0, 120, 212); box-sizing: border-box; color: #fff; font-size: 12px; font-weight: 400; line-height: 36px; text-align: center; text-decoration: none; white-space: nowrap;" href="` +
        this.linkUrl +
        `" target="_blank" rel="noopener noreferrer">` +
        this.linkText +
        `</a>` +
        `<div style="clear: both;"></div>` +
        `</div>`

      body.appendChild(app)
    }

    removeBuster() {
      const target = document.getElementById(this.id)
      target && target.remove()
    }
  }

  let activeBuster = null

  const init = (options) => {
    if (check()) {
      create(options)
    }
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

  return { init, check, create, remove }
})()

export default ieBuster
window.ieBuster = ieBuster
