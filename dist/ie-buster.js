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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
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

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
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
            boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.4)",
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
            backgroundColor: "#0078d4",
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

        options.appStyles && (this.appStyles = _objectSpread2(_objectSpread2({}, defaultOptions.appStyles), options.appStyles));
        options.cardStyles && (this.cardStyles = _objectSpread2(_objectSpread2({}, defaultOptions.cardStyles), options.cardStyles));
        options.textStyles && (this.textStyles = _objectSpread2(_objectSpread2({}, defaultOptions.textStyles), options.textStyles));
        options.linkStyles && (this.linkStyles = _objectSpread2(_objectSpread2({}, defaultOptions.linkStyles), options.linkStyles));
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
