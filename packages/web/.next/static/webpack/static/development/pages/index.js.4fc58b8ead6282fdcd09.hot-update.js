webpackHotUpdate("static/development/pages/index.js",{

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
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/taggedTemplateLiteral */ "./node_modules/@babel/runtime-corejs2/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-apollo */ "./node_modules/react-apollo/lib/react-apollo.esm.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! graphql-tag */ "./node_modules/graphql-tag/src/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _date__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./date */ "./components/date.tsx");

var _jsxFileName = "/home/admin/src/github.com/mishguruorg/services/logview/packages/web/components/list.tsx";


function _templateObject() {
  var data = Object(_babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__["default"])(["\n  query {\n    searchLogs(input: { last: 20, afterDate: \"2019-08-11T00:00:00.000Z\" }) {\n      results {\n        id\n        userId\n        sentFrom\n        type\n        sentAt\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}




var searchLogsQuery = graphql_tag__WEBPACK_IMPORTED_MODULE_3___default()(_templateObject());
function PostList() {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_2__["Query"], {
    query: searchLogsQuery,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }, function (_ref) {
    var loading = _ref.loading,
        error = _ref.error,
        data = _ref.data;

    if (error) {
      console.error(error);
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        },
        __self: this
      }, "Error loading posts.");
    }

    if (loading) {
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        },
        __self: this
      }, "Loading");
    }

    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("section", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 34
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("table", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 35
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tbody", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 36
      },
      __self: this
    }, data.searchLogs.results.reverse().map(function (log) {
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", {
        key: log.id,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 39
        },
        __self: this
      }, log.userId), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 40
        },
        __self: this
      }, log.sentFrom), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        },
        __self: this
      }, log.type), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 42
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_date__WEBPACK_IMPORTED_MODULE_4__["default"], {
        value: new _date__WEBPACK_IMPORTED_MODULE_4__["default"](log.sentAt),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 42
        },
        __self: this
      })));
    }))));
  });
}

/***/ })

})
//# sourceMappingURL=index.js.4fc58b8ead6282fdcd09.hot-update.js.map