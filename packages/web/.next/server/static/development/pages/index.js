module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/date-string.tsx":
/*!************************************!*\
  !*** ./components/date-string.tsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! luxon */ "luxon");
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(luxon__WEBPACK_IMPORTED_MODULE_1__);



const DateString = props => {
  const {
    value
  } = props;
  const string = luxon__WEBPACK_IMPORTED_MODULE_1__["DateTime"].fromJSDate(value).toFormat('LLL d, y, HH:mm:ss');
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, string);
};

/* harmony default export */ __webpack_exports__["default"] = (DateString);

/***/ }),

/***/ "./components/list.tsx":
/*!*****************************!*\
  !*** ./components/list.tsx ***!
  \*****************************/
/*! exports provided: searchLogsQuery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchLogsQuery", function() { return searchLogsQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PostList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-apollo */ "react-apollo");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_apollo__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! graphql-tag */ "graphql-tag");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _date_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./date-string */ "./components/date-string.tsx");
var _jsxFileName = "/home/admin/src/github.com/mishguruorg/services/logview/packages/web/components/list.tsx";




const searchLogsQuery = graphql_tag__WEBPACK_IMPORTED_MODULE_2___default.a`
  query {
    searchLogs(input: { last: 20, afterDate: "2019-08-11T00:00:00.000Z" }) {
      results {
        id
        userId
        sentFrom
        type
        sentAt
      }
    }
  }
`;
function PostList() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_1__["Query"], {
    query: searchLogsQuery,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }, ({
    loading,
    error,
    data
  }) => {
    if (error) {
      console.error(error);
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        },
        __self: this
      }, "Error loading posts.");
    }

    if (loading) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        },
        __self: this
      }, "Loading");
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 34
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 35
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 36
      },
      __self: this
    }, data.searchLogs.results.reverse().map(log => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
      key: log.id,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 38
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 39
      },
      __self: this
    }, log.userId), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40
      },
      __self: this
    }, log.sentFrom), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41
      },
      __self: this
    }, log.type), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_date_string__WEBPACK_IMPORTED_MODULE_4__["default"], {
      value: new Date(log.sentAt),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42
      },
      __self: this
    })))))));
  });
}

/***/ }),

/***/ "./components/login-form.tsx":
/*!***********************************!*\
  !*** ./components/login-form.tsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_auth0__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/auth0 */ "./lib/auth0.tsx");
var _jsxFileName = "/home/admin/src/github.com/mishguruorg/services/logview/packages/web/components/login-form.tsx";



const LoginForm = () => {
  const {
    loginWithRedirect
  } = Object(_lib_auth0__WEBPACK_IMPORTED_MODULE_1__["useAuth0"])();
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: () => loginWithRedirect(),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: undefined
  }, "Log in"));
};

/* harmony default export */ __webpack_exports__["default"] = (LoginForm);

/***/ }),

/***/ "./components/nav-bar.tsx":
/*!********************************!*\
  !*** ./components/nav-bar.tsx ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_auth0__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/auth0 */ "./lib/auth0.tsx");
var _jsxFileName = "/home/admin/src/github.com/mishguruorg/services/logview/packages/web/components/nav-bar.tsx";



const NavBar = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    user
  } = Object(_lib_auth0__WEBPACK_IMPORTED_MODULE_1__["useAuth0"])();

  if (isAuthenticated) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 10
      },
      __self: undefined
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      onClick: () => logout({
        returnTo: 'http://localhost:3000/'
      }),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 11
      },
      __self: undefined
    }, "Log out"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      },
      __self: undefined
    }, user.name));
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: undefined
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    onClick: () => loginWithRedirect({}),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: undefined
  }, "Log in"));
};

/* harmony default export */ __webpack_exports__["default"] = (NavBar);

/***/ }),

/***/ "./lib/auth0.tsx":
/*!***********************!*\
  !*** ./lib/auth0.tsx ***!
  \***********************/
/*! exports provided: getAuth0, Auth0Context, useAuth0, Auth0Provider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAuth0", function() { return getAuth0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Auth0Context", function() { return Auth0Context; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useAuth0", function() { return useAuth0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Auth0Provider", function() { return Auth0Provider; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _auth0_auth0_spa_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @auth0/auth0-spa-js */ "@auth0/auth0-spa-js");
/* harmony import */ var _auth0_auth0_spa_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_auth0_auth0_spa_js__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/home/admin/src/github.com/mishguruorg/services/logview/packages/web/lib/auth0.tsx";


let GLOBAL_AUTH0 = null;
const getAuth0 = () => GLOBAL_AUTH0;
const Auth0Context = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext(undefined);
const useAuth0 = () => Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(Auth0Context);

const onRedirectCallback = appState => {
  window.history.replaceState({}, document.title, appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
};

const Auth0Provider = ({
  children
}) => {
  const [isAuthenticated, setIsAuthenticated] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const [user, setUser] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const [auth0Client, setAuth0] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const [loading, setLoading] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await _auth0_auth0_spa_js__WEBPACK_IMPORTED_MODULE_1___default()({
        redirect_uri: 'http://localhost:3000/',
        domain: 'mishguruadmin.auth0.com',
        client_id: 'lj6liY2gXGfmrKijjPNX2rVTtGsXh6t3',
        audience: 'https://logview.mish.guru/'
      });
      setAuth0(auth0FromHook);
      GLOBAL_AUTH0 = auth0FromHook;

      if (window.location.search.includes("code=")) {
        try {
          const {
            appState
          } = await auth0FromHook.handleRedirectCallback();
          onRedirectCallback(appState);
        } catch (error) {
          console.error(error);
        }
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();
      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setLoading(false);
    };

    initAuth0().catch(console.error);
  }, []);

  const handleRedirectCallback = async () => {
    try {
      setLoading(true);
      await auth0Client.handleRedirectCallback();
      const user = await auth0Client.getUser();
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Auth0Context.Provider, {
    value: {
      isAuthenticated,
      user,
      loading,
      handleRedirectCallback,
      getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
      loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
      getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
      logout: (...p) => auth0Client.logout(...p)
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80
    },
    __self: undefined
  }, children);
};

/***/ }),

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_nav_bar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/nav-bar */ "./components/nav-bar.tsx");
/* harmony import */ var _components_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/list */ "./components/list.tsx");
/* harmony import */ var _components_login_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/login-form */ "./components/login-form.tsx");
/* harmony import */ var _lib_auth0__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/auth0 */ "./lib/auth0.tsx");
var _jsxFileName = "/home/admin/src/github.com/mishguruorg/services/logview/packages/web/pages/index.tsx";






const Index = () => {
  const {
    isAuthenticated,
    loading
  } = Object(_lib_auth0__WEBPACK_IMPORTED_MODULE_4__["useAuth0"])();

  if (loading) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 12
      },
      __self: undefined
    }, "Loading...");
  }

  if (isAuthenticated === false) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_login_form__WEBPACK_IMPORTED_MODULE_3__["default"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18
      },
      __self: undefined
    });
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_nav_bar__WEBPACK_IMPORTED_MODULE_1__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: undefined
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_list__WEBPACK_IMPORTED_MODULE_2__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    },
    __self: undefined
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (Index);

/***/ }),

/***/ 3:
/*!*******************************!*\
  !*** multi ./pages/index.tsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/admin/src/github.com/mishguruorg/services/logview/packages/web/pages/index.tsx */"./pages/index.tsx");


/***/ }),

/***/ "@auth0/auth0-spa-js":
/*!**************************************!*\
  !*** external "@auth0/auth0-spa-js" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@auth0/auth0-spa-js");

/***/ }),

/***/ "graphql-tag":
/*!******************************!*\
  !*** external "graphql-tag" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphql-tag");

/***/ }),

/***/ "luxon":
/*!************************!*\
  !*** external "luxon" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("luxon");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-apollo":
/*!*******************************!*\
  !*** external "react-apollo" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-apollo");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map