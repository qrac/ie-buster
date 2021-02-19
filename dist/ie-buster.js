/*! IE Buster v1.1.0 MIT by Qrac */
this['ie-buster'] = (function () {
  'use strict';

  var ieBuster = function ieBuster(options) {
    var defaultOptions = {
      mainText: "ご利用のインターネットブラウザは推奨環境ではありません。Webサイトの動作が保証できませんので、最新の Google Chrome をご利用ください。",
      linkText: "ダウンロードページへ",
      linkUrl: "https://www.google.com/chrome/"
    };
    options = options || {};
    options.mainText = options.mainText || defaultOptions.mainText;
    options.linkText = options.linkText || defaultOptions.linkText;
    options.linkUrl = options.linkUrl || defaultOptions.linkUrl;

    var isIE = function isIE() {
      if (!!window.MSInputMethodContext && !!document.documentMode || false) {
        return true;
      }
    };

    var reset = function reset() {
      var target = document.getElementById("ie-buster-app");
      target && target.remove();
    };

    var create = function create() {
      var body = document.getElementsByTagName("body")[0];
      var app = document.createElement("div");
      app.id = "ie-buster-app";
      app.setAttribute("style", "position: fixed; top: 0; left: 0; width: 100%; padding: 16px; box-sizing: border-box; z-index: 999999;");
      app.innerHTML = "<div style=\"width: 100%; max-width:866px; margin: 0 auto; padding: 16px 20px; background-color: #fff; box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 5px 0px; box-sizing: border-box; font-family: SegoeUI, Meiryo, sans-serif;\">" + "<p style=\"display: block; float: left; width: 100%; max-width: 664px; margin: 0; color: #000; font-size: 14px; font-weight: 400; line-height: 1.5;\">" + options.mainText + "</p>" + "<a style=\"display: block; float: right; height: 36px; width: 154px; padding: 0 16px; background-color: rgb(0, 120, 212); box-sizing: border-box; color: #fff; font-size: 12px; font-weight: 400; line-height: 36px; text-align: center; text-decoration: none; white-space: nowrap;\" href=\"" + options.linkUrl + "\" target=\"_blank\" rel=\"noopener noreferrer\">" + options.linkText + "</a>" + "<div style=\"clear: both;\"></div>" + "</div>";
      body.appendChild(app);
    };

    var init = function init() {
      if (isIE()) {
        reset();
        create();
      }
    };

    return init();
  };
  window.ieBuster = ieBuster;

  window.onload = function () {
    ieBuster();
  };

  return ieBuster;

}());
