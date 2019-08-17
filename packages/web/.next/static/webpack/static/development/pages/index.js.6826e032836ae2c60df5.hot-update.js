webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/date.tsx":
/*!*****************************!*\
  !*** ./components/date.tsx ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! luxon */ "./node_modules/luxon/build/cjs-browser/luxon.js");
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(luxon__WEBPACK_IMPORTED_MODULE_1__);



var Date = function Date(props) {
  var value = props.value;
  var string = luxon__WEBPACK_IMPORTED_MODULE_1__["DateTime"].fromJSDate(value).toFormat('LLL d, y, HH:mm:ss.SSS');
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, string);
};

/* harmony default export */ __webpack_exports__["default"] = (Date);

/***/ })

})
//# sourceMappingURL=index.js.6826e032836ae2c60df5.hot-update.js.map