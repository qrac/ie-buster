/*! IE Buster v1.1.0 MIT by Qrac */
this['ie-buster'] = (function () {
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

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  var ieBuster = function () {
    var Buster = /*#__PURE__*/function () {
      function Buster() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Buster);

        var defaultOptions = {
          id: "ie-buster-app",
          mainText: "ご利用のインターネットブラウザは推奨環境ではありません。Webサイトの動作が保証できませんので、最新の Google Chrome をご利用ください。",
          linkText: "ダウンロードページへ",
          linkUrl: "https://www.google.com/chrome/",
          appStyles: {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            padding: "16px",
            boxSizing: "border-box",
            zIndex: "999999"
          },
          cardStyles: {
            display: "flex",
            alignItems: "center",
            width: "100%",
            maxWidth: "886px",
            margin: "0 auto",
            padding: "16px",
            backgroundColor: "#fff",
            boxShadow: "rgba(0, 0, 0, 0.4) 0px 0px 5px 0px",
            boxSizing: "border-box",
            fontFamily: "SegoeUI, Meiryo, sans-serif"
          },
          textStyles: {
            flex: "1 0 0%",
            maxWidth: "100%",
            margin: "0",
            color: "#000",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "1.5"
          },
          linkStyles: {
            flex: "none",
            display: "flex",
            margin: "0 0 0 16px",
            padding: "12px 24px",
            backgroundColor: "rgb(0, 120, 212)",
            boxSizing: "border-box",
            color: "#fff",
            fontSize: "12px",
            fontWeight: "400",
            lineHeight: "1",
            textAlign: "center",
            textDecoration: "none",
            whiteSpace: "nowrap"
          }
        };

        _extends(this, defaultOptions, options);
      }

      _createClass(Buster, [{
        key: "createBuster",
        value: function createBuster() {
          var body = document.getElementsByTagName("body")[0];
          var app = document.createElement("div");
          var card = document.createElement("div");
          var text = document.createElement("p");
          var link = document.createElement("a"); //const edge = this.linkUrl.startsWith("microsoft-edge")

          app.id = this.id;
          styling(app, this.appStyles);
          styling(card, this.cardStyles);
          styling(text, this.textStyles);
          styling(link, this.linkStyles);
          text.innerText = this.mainText;
          link.innerText = this.linkText;
          link.href = encodeURIComponent(this.linkUrl); //edge ?? link.setAttribute("target", "_blank")
          //edge ?? link.setAttribute("rel", "noopener noreferrer")

          card.appendChild(text);
          card.appendChild(link);
          app.appendChild(card);
          body.appendChild(app);
        }
      }, {
        key: "removeBuster",
        value: function removeBuster() {
          var target = document.getElementById(this.id);
          target && target.remove();
        }
      }]);

      return Buster;
    }();

    var activeBuster = null;

    var styling = function styling(target, styles) {
      Object.keys(styles).map(function (key) {
        return target.style[key] = styles[key];
      });
    };

    var check = function check() {
      if (!!window.MSInputMethodContext && !!document.documentMode || false) {
        return true;
      }
    };

    var create = function create(options) {
      activeBuster = new Buster(options);
      activeBuster.createBuster();
    };

    var remove = function remove(options) {
      activeBuster = new Buster(options);
      activeBuster.removeBuster();
    };

    var init = function init(options) {
      if (check()) {
        create(options);
      }
    };

    return {
      check: check,
      create: create,
      remove: remove,
      init: init
    };
  }();
  window.ieBuster = ieBuster;

  return ieBuster;

}());
