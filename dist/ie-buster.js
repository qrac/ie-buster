/*! IE Buster v1.1.0 MIT by Qrac */

function ieBusterUserAgentCheck() {
  var ieBusterUserAgent = window.navigator.userAgent.toLowerCase()
  if (
    ~ieBusterUserAgent.indexOf('msie') ||
    ~ieBusterUserAgent.indexOf('trident')
  )
    return true
}

function ieBuster(options) {
  var ieBusterAlready = document.getElementById('ie-buster-app')
  if (ieBusterAlready) {
    ieBusterAlready.parentNode.removeChild(ieBusterAlready)
  }
  if (ieBusterUserAgentCheck()) {
    options = options || {}
    if (options.mainText == null)
      options.mainText =
        'ご利用のインターネットブラウザは推奨環境ではありません。Webサイトの動作が保証できませんので、最新の Google Chrome をご利用ください。'
    if (options.linkText == null) options.linkText = 'ダウンロードページへ'
    if (options.linkUrl == null)
      options.linkUrl = 'https://www.google.com/chrome/'
    var ieBusterTarget = document.getElementsByTagName('body')[0]
    var ieBusterApp = document.createElement('div')
    ieBusterApp.id = 'ie-buster-app'
    ieBusterApp.setAttribute(
      'style',
      'position: fixed; top: 0px; left: 0; width: 100%; padding: 16px; box-sizing: border-box; z-index: 999999;'
    )
    ieBusterApp.innerHTML =
      '<div style="width: 100%; max-width:866px; margin: 0 auto; padding: 16px 20px; background-color: #fff; box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 5px 0px; box-sizing: border-box; font-family: SegoeUI, Meiryo, sans-serif;">' +
      '<p style="display: block; float: left; width: 100%; max-width: 664px; margin: 0; color: #000; font-size: 14px; font-weight: 400; line-height: 1.5;">' +
      options.mainText +
      '</p>' +
      '<a style="display: block; float: right; height: 36px; width: 154px; padding: 0 16px; background-color: rgb(0, 120, 212); box-sizing: border-box; color: #fff; font-size: 12px; font-weight: 400; line-height: 36px; text-align: center; text-decoration: none; white-space: nowrap;" href="' +
      options.linkUrl +
      '" target="_blank" rel="noopener noreferrer">' +
      options.linkText +
      '</a>' +
      '<div style="clear: both;"></div>' +
      '</div>'
    ieBusterTarget.appendChild(ieBusterApp)
  }
}

window.onload = ieBuster()
