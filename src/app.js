import "./style.scss"

function ieBusterFuncCheck() {
  let userAgent = window.navigator.userAgent.toLowerCase()
  if (userAgent.indexOf("msie") !== -1 || userAgent.indexOf("trident") !== -1) {
    return true
  }
  return false
}

if (ieBusterFuncCheck()) {
  let ieBusterBody = document.getElementsByTagName("body")[0]
  let ieBusterAlert = document.createElement("div")
  ieBusterAlert.classList.add("ie-buster-alert")
  ieBusterAlert.innerHTML = `<p class="ie-buster-alert-note">ご利用のインターネットブラウザは推奨環境ではありません。セキュリティリスクが高い状態ですので、最新の Google Chrome をご利用ください。</p>
  <a class="ie-buster-alert-link" href="https://www.google.com/chrome/" target="_blank" rel="noopener noreferrer">ダウンロードページへ</a>`
  ieBusterBody.appendChild(ieBusterAlert)
}
