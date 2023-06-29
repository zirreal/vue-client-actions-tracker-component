module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "2b27":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Vue Cookies v1.8.3
 * https://github.com/cmp-cc/vue-cookies
 *
 * Copyright 2016, cmp-cc
 * Released under the MIT license
 */

 (function () {

  var defaultConfig = {
    expires: '1d',
    path: '; path=/',
    domain: '',
    secure: '',
    sameSite: '; SameSite=Lax'
  };

  var VueCookies = {
    // install of Vue
    install: function (Vue, options) {
      if (options) this.config(options.expires, options.path, options.domain, options.secure, options.sameSite);
      if (Vue.prototype) Vue.prototype.$cookies = this;
      if (Vue.config && Vue.config.globalProperties) {
        Vue.config.globalProperties.$cookies = this;
        Vue.provide('$cookies', this);
      }
      Vue.$cookies = this;
    },
    config: function (expires, path, domain, secure, sameSite) {
      defaultConfig.expires = expires ? expires : '1d';
      defaultConfig.path = path ? '; path=' + path : '; path=/';
      defaultConfig.domain = domain ? '; domain=' + domain : '';
      defaultConfig.secure = secure ? '; Secure' : '';
      defaultConfig.sameSite = sameSite ? '; SameSite=' + sameSite : '; SameSite=Lax';
    },
    get: function (key) {
      var value = decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;

      if (value && ((value.substring(0, 1) === '{' && value.substring(value.length - 1, value.length) === '}') || (value.substring(0, 1) === '[' && value.substring(value.length - 1, value.length) === ']'))) {
        try {
          value = JSON.parse(value);
        } catch (e) {
          return value;
        }
      }
      return value;
    },
    set: function (key, value, expires, path, domain, secure, sameSite) {
      if (!key) {
        throw new Error('Cookie name is not found in the first argument.');
      } else if (/^(?:expires|max\-age|path|domain|secure|SameSite)$/i.test(key)) {
        throw new Error('Cookie name illegality. Cannot be set to ["expires","max-age","path","domain","secure","SameSite"]\t current key name: ' + key);
      }
      // support json object
      if (value && typeof value === 'object') {
        value = JSON.stringify(value);
      }
      var _expires = '';
      expires = expires == undefined ? defaultConfig.expires : expires;
      if (expires && expires != 0) {
        switch (expires.constructor) {
          case Number:
            if (expires === Infinity || expires === -1) _expires = '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
            else _expires = '; max-age=' + expires;
            break;
          case String:
            if (/^(?:\d+(y|m|d|h|min|s))$/i.test(expires)) {
              // get capture number group
              var _expireTime = expires.replace(/^(\d+)(?:y|m|d|h|min|s)$/i, '$1');
              // get capture type group , to lower case
              switch (expires.replace(/^(?:\d+)(y|m|d|h|min|s)$/i, '$1').toLowerCase()) {
                  // Frequency sorting
                case 'm':
                  _expires = '; max-age=' + +_expireTime * 2592000;
                  break; // 60 * 60 * 24 * 30
                case 'd':
                  _expires = '; max-age=' + +_expireTime * 86400;
                  break; // 60 * 60 * 24
                case 'h':
                  _expires = '; max-age=' + +_expireTime * 3600;
                  break; // 60 * 60
                case 'min':
                  _expires = '; max-age=' + +_expireTime * 60;
                  break; // 60
                case 's':
                  _expires = '; max-age=' + _expireTime;
                  break;
                case 'y':
                  _expires = '; max-age=' + +_expireTime * 31104000;
                  break; // 60 * 60 * 24 * 30 * 12
                default:
                  new Error('unknown exception of "set operation"');
              }
            } else {
              _expires = '; expires=' + expires;
            }
            break;
          case Date:
            _expires = '; expires=' + expires.toUTCString();
            break;
        }
      }
      document.cookie =
          encodeURIComponent(key) + '=' + encodeURIComponent(value) +
          _expires +
          (domain ? '; domain=' + domain : defaultConfig.domain) +
          (path ? '; path=' + path : defaultConfig.path) +
          (secure == undefined ? defaultConfig.secure : secure ? '; Secure' : '') +
          (sameSite == undefined ? defaultConfig.sameSite : (sameSite ? '; SameSite=' + sameSite : ''));
      return this;
    },
    remove: function (key, path, domain) {
      if (!key || !this.isKey(key)) {
        return false;
      }
      document.cookie = encodeURIComponent(key) +
          '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
          (domain ? '; domain=' + domain : defaultConfig.domain) +
          (path ? '; path=' + path : defaultConfig.path) +
          '; SameSite=Lax';
      return true;
    },
    isKey: function (key) {
      return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
    },
    keys: function () {
      if (!document.cookie) return [];
      var _keys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
      for (var _index = 0; _index < _keys.length; _index++) {
        _keys[_index] = decodeURIComponent(_keys[_index]);
      }
      return _keys;
    }
  };

  if (true) {
    module.exports = VueCookies;
  } else {}
  // vue-cookies can exist independently,no dependencies library
  if (typeof window !== 'undefined') {
    window.$cookies = VueCookies;
  }

})();


/***/ }),

/***/ "d638":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f1e6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_userTracker_vue_vue_type_style_index_0_id_9780558c_prod_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d638");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_userTracker_vue_vue_type_style_index_0_id_9780558c_prod_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_userTracker_vue_vue_type_style_index_0_id_9780558c_prod_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/vue-cookies/vue-cookies.js
var vue_cookies = __webpack_require__("2b27");
var vue_cookies_default = /*#__PURE__*/__webpack_require__.n(vue_cookies);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"83c8a13e-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/userTracker.vue?vue&type=template&id=9780558c&
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.cookies && !_vm.cookies.get('userTracker') && !_vm.isChosen,
      expression: "cookies && !cookies.get('userTracker') && !isChosen"
    }],
    staticClass: "user-tracker",
    class: _vm.classCustom
  }, [_c('div', {
    staticClass: "user-tracker__wrapper"
  }, [_vm.privacyPolicyLink ? _c('a', {
    staticClass: "user-tracker__info",
    attrs: {
      "href": _vm.privacyPolicyLink
    }
  }, [_vm._v("i")]) : _vm._e(), _c('h3', {
    staticClass: "user-tracker__title"
  }, [_vm._v(" " + _vm._s(_vm.title) + " ")])]), _c('form', {
    staticClass: "user-tracker__form",
    on: {
      "submit": function ($event) {
        $event.preventDefault();
        return _vm.allowUserTracker.apply(null, arguments);
      }
    }
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.option,
      expression: "option"
    }],
    class: {
      'small': _vm.option === 'allow metrics'
    },
    attrs: {
      "name": "privacy-policy"
    },
    on: {
      "change": function ($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
          return o.selected;
        }).map(function (o) {
          var val = "_value" in o ? o._value : o.value;
          return val;
        });
        _vm.option = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
      }
    }
  }, [_c('option', {
    attrs: {
      "selected": "",
      "value": "allow metrics"
    }
  }, [_vm._v(" " + _vm._s(_vm.allowTitle) + " ")]), _vm.criticalTitle ? _c('option', {
    attrs: {
      "value": "only critical"
    }
  }, [_vm._v(_vm._s(_vm.criticalTitle))]) : _vm._e(), _c('option', {
    attrs: {
      "value": "no actions"
    }
  }, [_vm._v(_vm._s(_vm.disallowTitle))])]), _c('button', {
    staticClass: "user-tracker__btn"
  }, [_vm._v(_vm._s(_vm.buttonTitle))])])]);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/userTracker.vue?vue&type=template&id=9780558c&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/userTracker.vue?vue&type=script&lang=js&

/* harmony default export */ var userTrackervue_type_script_lang_js_ = ({
  name: "UserTrackerComponent",
  props: {
    privacyPolicyLink: {
      type: String,
      default: '',
      required: false
    },
    title: {
      type: String,
      default: 'Choose the way to communicate with this website:',
      required: false
    },
    buttonTitle: {
      type: String,
      default: 'Ok',
      required: false
    },
    allowTitle: {
      type: String,
      default: 'Allow metrics',
      required: false
    },
    criticalTitle: {
      type: String,
      default: 'Only critical actions',
      required: false
    },
    disallowTitle: {
      type: String,
      default: 'Disallow any actions',
      required: false
    },
    classCustom: {
      type: String,
      default: '',
      required: false
    }
  },
  data() {
    return {
      option: 'allow metrics',
      cookies: null,
      isChosen: false
    };
  },
  methods: {
    allowUserTracker() {
      this.isChosen = true;
      switch (this.option) {
        case 'only critical':
          vue_cookies_default.a.set('userTracker', this.option);
          break;
        case 'allow metrics':
          vue_cookies_default.a.set('userTracker', this.option);
          break;
        default:
          vue_cookies_default.a.set('userTracker', this.option);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.cookies = $cookies;
      if ($cookies.get('userTracker') === 'allow metrics') {
        this.$emit('activateTracker');
      }
    });
  }
});
// CONCATENATED MODULE: ./src/components/userTracker.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_userTrackervue_type_script_lang_js_ = (userTrackervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/userTracker.vue?vue&type=style&index=0&id=9780558c&prod&lang=css&
var userTrackervue_type_style_index_0_id_9780558c_prod_lang_css_ = __webpack_require__("f1e6");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/userTracker.vue






/* normalize component */

var component = normalizeComponent(
  components_userTrackervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var userTracker = (component.exports);
// CONCATENATED MODULE: ./src/main.js


// component

const main_userTracker = {
  install(Vue, options) {
    Vue.use(vue_cookies_default.a, {
      expire: options && options.cookiesExpirationDate ? options.cookiesExpirationDate : '90d'
    });
    Vue.$cookies.config(options && options.cookiesExpirationDate ? options.cookiesExpirationDate : '90d');
    Vue.component('userTracker', userTracker);
  }
};
/* harmony default export */ var main = (main_userTracker);
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(main_userTracker, {
    cookiesExpirationDate: '90d'
  });
}
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (main);



/***/ })

/******/ });
//# sourceMappingURL=vue-client-actions-tracker-component.common.js.map