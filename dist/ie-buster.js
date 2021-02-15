/*! IE Buster v1.1.0 MIT by Qrac */
(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var IEBuster = /*#__PURE__*/function () {
    function IEBuster() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, IEBuster);

      var defaultOptions = {
        mainText: "ご利用のインターネットブラウザは推奨環境ではありません。Webサイトの動作が保証できませんので、最新の Google Chrome をご利用ください。",
        linkText: "ダウンロードページへ",
        linkUrl: "https://www.google.com/chrome/"
      };
      Object.assign(this, defaultOptions, options);
    }

    _createClass(IEBuster, [{
      key: "init",
      value: function init() {
        if (this.isIE) {
          this.reset();
          this.create();
        }
      }
    }, {
      key: "isIE",
      value: function isIE() {
        //if ((!!window.MSInputMethodContext && !!document.documentMode) || false) {
        return true; //}
      }
    }, {
      key: "reset",
      value: function reset() {
        var resetItem = document.getElementById("ie-buster-app");

        if (resetItem) {
          resetItem.parentNode.removeChild(resetItem);
        }
      }
    }, {
      key: "create",
      value: function create() {
        var ieBusterTarget = document.getElementsByTagName("body")[0];
        var ieBusterApp = document.createElement("div");
        ieBusterApp.id = "ie-buster-app";
        ieBusterApp.setAttribute("style", "position: fixed; top: 0; left: 0; width: 100%; padding: 16px; box-sizing: border-box; z-index: 999999;");
        ieBusterApp.innerHTML = "<div style=\"width: 100%; max-width:866px; margin: 0 auto; padding: 16px 20px; background-color: #fff; box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 5px 0px; box-sizing: border-box; font-family: SegoeUI, Meiryo, sans-serif;\">" + "<p style=\"display: block; float: left; width: 100%; max-width: 664px; margin: 0; color: #000; font-size: 14px; font-weight: 400; line-height: 1.5;\">" + this.mainText + "</p>" + "<a style=\"display: block; float: right; height: 36px; width: 154px; padding: 0 16px; background-color: rgb(0, 120, 212); box-sizing: border-box; color: #fff; font-size: 12px; font-weight: 400; line-height: 36px; text-align: center; text-decoration: none; white-space: nowrap;\" href=\"" + this.linkUrl + "\" target=\"_blank\" rel=\"noopener noreferrer\">" + this.linkText + "</a>" + "<div style=\"clear: both;\"></div>" + "</div>";
        ieBusterTarget.appendChild(ieBusterApp);
      }
    }]);

    return IEBuster;
  }();

  window.onload = function () {
    var ieBuster = new IEBuster({});
    ieBuster.init();
  };

}());
