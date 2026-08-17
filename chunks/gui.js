var GUI =
(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[7],{

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(2058);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(23)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 1222:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/assets/4c6a5e88d07eebfe480ecb247d793925.png";

/***/ }),

/***/ 1228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var es6_object_assign_auto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1229);
/* harmony import */ var es6_object_assign_auto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(es6_object_assign_auto__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_fn_array_includes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1231);
/* harmony import */ var core_js_fn_array_includes__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_fn_array_includes__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_fn_promise_finally__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1243);
/* harmony import */ var core_js_fn_promise_finally__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_fn_promise_finally__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var intl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1260);
/* harmony import */ var intl__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(intl__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(120);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lib_analytics__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(114);
/* harmony import */ var _lib_app_state_hoc_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(214);
/* harmony import */ var _components_browser_modal_browser_modal_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(411);
/* harmony import */ var _lib_supported_browser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(412);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(969);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_10__);
// Polyfills



 // For Safari 9









var getAnalyticsPage = function getAnalyticsPage() {
  var hashPath = window.location.hash.replace(/^#/, '') || '/';
  return "/community/web".concat(hashPath.startsWith('/') ? hashPath : "/".concat(hashPath));
};

Object(_lib_analytics__WEBPACK_IMPORTED_MODULE_6__[/* initialAnalytics */ "b"])();
_lib_analytics__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].send({
  hitType: 'pageview',
  page: getAnalyticsPage(),
  title: document.title
});
window.addEventListener('hashchange', function () {
  _lib_analytics__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].send({
    hitType: 'pageview',
    page: getAnalyticsPage(),
    title: document.title
  });
});
var appTarget = document.createElement('div');
appTarget.className = _index_css__WEBPACK_IMPORTED_MODULE_10___default.a.app;
document.body.appendChild(appTarget);

if (Object(_lib_supported_browser__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"])()) {
  // require needed here to avoid importing unsupported browser-crashing code
  // at the top level
  __webpack_require__(2076).default(appTarget);
} else {
  _components_browser_modal_browser_modal_jsx__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"].setAppElement(appTarget);
  var WrappedBrowserModalComponent = Object(_lib_app_state_hoc_jsx__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(_components_browser_modal_browser_modal_jsx__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], true
  /* localesOnly */
  );

  var handleBack = function handleBack() {}; // eslint-disable-next-line react/jsx-no-bind


  react_dom__WEBPACK_IMPORTED_MODULE_5___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(WrappedBrowserModalComponent, {
    onBack: handleBack
  }), appTarget);
}

/***/ }),

/***/ 1262:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(2061);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(23)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 1670:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(22)(false);
// imports


// module
exports.push([module.i, "html,\nbody,\n.index_app_3Qs6X {\n    /* probably unecessary, transitional until layout is refactored */\n    width: 100%; \n    height: 100%;\n    margin: 0;\n\n    /* Setting min height/width makes the UI scroll below those sizes */\n    min-width: 1024px;\n    min-height: 640px; /* Min height to fit sprite/backdrop button */\n}\n\n/* @todo: move globally? Safe / side FX, for blocks particularly? */\n\n* { -webkit-box-sizing: border-box; box-sizing: border-box; }\n\n@media screen and (orientation: landscape) and (max-height: 520px) and (max-width: 960px) {\n    html,\n    body,\n    .index_app_3Qs6X {\n        min-width: 0;\n        min-height: 0;\n        overflow: hidden;\n    }\n}\n", ""]);

// exports
exports.locals = {
	"app": "index_app_3Qs6X"
};

/***/ }),

/***/ 2058:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(22)(false);
// imports


// module
exports.push([module.i, ".notifications-bell_wrap_2Gb76 {\n    position: relative;\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n\n/* ── Bell button ──────────────────────────────────────────────────────── */\n\n.notifications-bell_bell-button_3oITE {\n    position: relative;\n    min-width: 2.2rem;\n    min-height: 2.2rem;\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    border: 0;\n    border-radius: 999px;\n    color: #ffffff;\n    background: rgba(255, 255, 255, 0.12);\n    cursor: pointer;\n    -webkit-transition: background 0.15s;\n    -o-transition: background 0.15s;\n    transition: background 0.15s;\n}\n\n.notifications-bell_bell-button_3oITE:hover,\n.notifications-bell_bell-button_3oITE:focus {\n    background: rgba(255, 255, 255, 0.22);\n    outline: none;\n}\n\n.notifications-bell_bell-icon_3P5Oj {\n    width: 1.05rem;\n    height: 1.05rem;\n    stroke-width: 2.6;\n    -webkit-transition: -webkit-transform 0.15s;\n    transition: -webkit-transform 0.15s;\n    -o-transition: transform 0.15s;\n    transition: transform 0.15s;\n    transition: transform 0.15s, -webkit-transform 0.15s;\n}\n\n/* ── Shake animation ──────────────────────────────────────────────────── */\n\n.notifications-bell_bell-shake_3toDR {\n    -webkit-animation: notifications-bell_bell-shake_3toDR 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;\n            animation: notifications-bell_bell-shake_3toDR 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;\n    -webkit-transform-origin: top center;\n        -ms-transform-origin: top center;\n            transform-origin: top center;\n}\n\n@-webkit-keyframes notifications-bell_bell-shake_3toDR {\n    0%   { -webkit-transform: rotate(0deg); transform: rotate(0deg); }\n    15%  { -webkit-transform: rotate(18deg); transform: rotate(18deg); }\n    30%  { -webkit-transform: rotate(-16deg); transform: rotate(-16deg); }\n    45%  { -webkit-transform: rotate(12deg); transform: rotate(12deg); }\n    60%  { -webkit-transform: rotate(-10deg); transform: rotate(-10deg); }\n    75%  { -webkit-transform: rotate(6deg); transform: rotate(6deg); }\n    90%  { -webkit-transform: rotate(-4deg); transform: rotate(-4deg); }\n    100% { -webkit-transform: rotate(0deg); transform: rotate(0deg); }\n}\n\n@keyframes notifications-bell_bell-shake_3toDR {\n    0%   { -webkit-transform: rotate(0deg); transform: rotate(0deg); }\n    15%  { -webkit-transform: rotate(18deg); transform: rotate(18deg); }\n    30%  { -webkit-transform: rotate(-16deg); transform: rotate(-16deg); }\n    45%  { -webkit-transform: rotate(12deg); transform: rotate(12deg); }\n    60%  { -webkit-transform: rotate(-10deg); transform: rotate(-10deg); }\n    75%  { -webkit-transform: rotate(6deg); transform: rotate(6deg); }\n    90%  { -webkit-transform: rotate(-4deg); transform: rotate(-4deg); }\n    100% { -webkit-transform: rotate(0deg); transform: rotate(0deg); }\n}\n\n/* ── Badge ────────────────────────────────────────────────────────────── */\n\n.notifications-bell_badge_1o5qe {\n    position: absolute;\n    top: -0.25rem;\n    right: -0.2rem;\n    min-width: 1rem;\n    height: 1rem;\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    border: 0.12rem solid #243f8f;\n    border-radius: 999px;\n    padding: 0 0.18rem;\n    color: #ffffff;\n    background: #ff2b2b;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 0.52rem;\n    line-height: 1;\n    -webkit-animation: notifications-bell_badge-pop_3YlRb 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n            animation: notifications-bell_badge-pop_3YlRb 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n}\n\n@-webkit-keyframes notifications-bell_badge-pop_3YlRb {\n    from { -webkit-transform: scale(0.4); transform: scale(0.4); opacity: 0; }\n    to   { -webkit-transform: scale(1); transform: scale(1);   opacity: 1; }\n}\n\n@keyframes notifications-bell_badge-pop_3YlRb {\n    from { -webkit-transform: scale(0.4); transform: scale(0.4); opacity: 0; }\n    to   { -webkit-transform: scale(1); transform: scale(1);   opacity: 1; }\n}\n\n/* ── Dropdown ─────────────────────────────────────────────────────────── */\n\n.notifications-bell_dropdown_2ae_J {\n    position: absolute;\n    top: calc(100% + 0.65rem);\n    right: 0;\n    z-index: 1000;\n    width: min(22rem, calc(100vw - 1rem));\n    overflow: hidden;\n    border: 0.18rem solid #182b63;\n    border-radius: 0.85rem;\n    color: #182b63;\n    background: #ffffff;\n    -webkit-box-shadow: 0.4rem 0.45rem 0 rgba(24, 43, 99, 0.18);\n            box-shadow: 0.4rem 0.45rem 0 rgba(24, 43, 99, 0.18);\n    -webkit-animation: notifications-bell_dropdown-in_bj8P7 0.22s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n            animation: notifications-bell_dropdown-in_bj8P7 0.22s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n}\n\n@-webkit-keyframes notifications-bell_dropdown-in_bj8P7 {\n    from { opacity: 0; -webkit-transform: translateY(-0.4rem) scale(0.97); transform: translateY(-0.4rem) scale(0.97); }\n    to   { opacity: 1; -webkit-transform: translateY(0) scale(1); transform: translateY(0) scale(1); }\n}\n\n@keyframes notifications-bell_dropdown-in_bj8P7 {\n    from { opacity: 0; -webkit-transform: translateY(-0.4rem) scale(0.97); transform: translateY(-0.4rem) scale(0.97); }\n    to   { opacity: 1; -webkit-transform: translateY(0) scale(1); transform: translateY(0) scale(1); }\n}\n\n.notifications-bell_dropdown-header_1YQG6 {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    gap: 0.75rem;\n    padding: 0.8rem;\n    background: #eaf2ff;\n}\n\n.notifications-bell_dropdown-title_24Sfo {\n    margin: 0;\n    color: #243f8f;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 0.78rem;\n    font-weight: 400;\n}\n\n.notifications-bell_read-all-button_2Twre {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.28rem;\n    border: 0;\n    border-radius: 0.4rem;\n    padding: 0.42rem 0.55rem;\n    color: #243f8f;\n    background: #ffffff;\n    -webkit-box-shadow: inset 0 0 0 0.1rem #c6d6ff;\n            box-shadow: inset 0 0 0 0.1rem #c6d6ff;\n    font-family: \"Montserrat\", sans-serif;\n    font-size: 0.72rem;\n    font-weight: 800;\n    cursor: pointer;\n    -webkit-transition: background 0.12s, -webkit-box-shadow 0.12s;\n    transition: background 0.12s, -webkit-box-shadow 0.12s;\n    -o-transition: background 0.12s, box-shadow 0.12s;\n    transition: background 0.12s, box-shadow 0.12s;\n    transition: background 0.12s, box-shadow 0.12s, -webkit-box-shadow 0.12s;\n}\n\n.notifications-bell_read-all-button_2Twre:hover:not(:disabled) {\n    background: #f0f4ff;\n    -webkit-box-shadow: inset 0 0 0 0.1rem #8099d9;\n            box-shadow: inset 0 0 0 0.1rem #8099d9;\n}\n\n.notifications-bell_read-all-button_2Twre:disabled {\n    cursor: default;\n    opacity: 0.55;\n}\n\n.notifications-bell_read-all-icon_2ThKc,\n.notifications-bell_item-icon_3BmDd,\n.notifications-bell_load-more-icon_2DJBp {\n    width: 0.85rem;\n    height: 0.85rem;\n    stroke-width: 2.6;\n}\n\n/* ── List ─────────────────────────────────────────────────────────────── */\n\n.notifications-bell_list_kcgAh {\n    max-height: 24rem;\n    overflow-y: auto;\n}\n\n/* ── Item ─────────────────────────────────────────────────────────────── */\n\n.notifications-bell_item_IWcJ6 {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: stretch;\n    -webkit-align-items: stretch;\n        -ms-flex-align: stretch;\n            align-items: stretch;\n    border-top: 0.08rem solid #d7e0f5;\n    background: #ffffff;\n    -webkit-animation: notifications-bell_item-in_2lgiW 0.2s ease both;\n            animation: notifications-bell_item-in_2lgiW 0.2s ease both;\n}\n\n@-webkit-keyframes notifications-bell_item-in_2lgiW {\n    from { opacity: 0; -webkit-transform: translateY(-0.3rem); transform: translateY(-0.3rem); }\n    to   { opacity: 1; -webkit-transform: translateY(0); transform: translateY(0); }\n}\n\n@keyframes notifications-bell_item-in_2lgiW {\n    from { opacity: 0; -webkit-transform: translateY(-0.3rem); transform: translateY(-0.3rem); }\n    to   { opacity: 1; -webkit-transform: translateY(0); transform: translateY(0); }\n}\n\n.notifications-bell_item-unread_Ph7eH {\n    background: #fff8e7;\n}\n\n.notifications-bell_item-main_nJoht {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    min-width: 0;\n    display: grid;\n    grid-template-columns: auto minmax(0, 1fr) auto;\n    gap: 0.65rem;\n    padding: 0.7rem 0.5rem 0.7rem 0.8rem;\n    border: 0;\n    color: inherit;\n    background: transparent;\n    text-align: left;\n    cursor: pointer;\n}\n\n.notifications-bell_item-main_nJoht:hover,\n.notifications-bell_item-main_nJoht:focus {\n    background: #f6f9ff;\n    outline: none;\n}\n\n.notifications-bell_item-unread_Ph7eH .notifications-bell_item-main_nJoht:hover,\n.notifications-bell_item-unread_Ph7eH .notifications-bell_item-main_nJoht:focus {\n    background: #fff3cc;\n}\n\n/* ── Delete button ────────────────────────────────────────────────────── */\n\n.notifications-bell_delete-btn_3zHD6 {\n    -webkit-flex-shrink: 0;\n        -ms-flex-negative: 0;\n            flex-shrink: 0;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    padding: 0 0.6rem;\n    border: 0;\n    border-left: 0.08rem solid #e8eef8;\n    background: transparent;\n    color: #b0bad8;\n    cursor: pointer;\n    opacity: 0;\n    -webkit-transition: opacity 0.12s, color 0.12s, background 0.12s;\n    -o-transition: opacity 0.12s, color 0.12s, background 0.12s;\n    transition: opacity 0.12s, color 0.12s, background 0.12s;\n}\n\n.notifications-bell_item_IWcJ6:hover .notifications-bell_delete-btn_3zHD6,\n.notifications-bell_item_IWcJ6:focus-within .notifications-bell_delete-btn_3zHD6 {\n    opacity: 1;\n}\n\n.notifications-bell_delete-btn_3zHD6:hover {\n    background: #fff0f0;\n    color: #d93838;\n}\n\n.notifications-bell_delete-btn-icon_OWac4 {\n    width: 0.8rem;\n    height: 0.8rem;\n    stroke-width: 2.6;\n}\n\n/* ── Avatar ─────────────────────────────────────────────────────────── */\n\n.notifications-bell_avatar_2SaaP {\n    width: 2.15rem;\n    height: 2.15rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    overflow: hidden;\n    border-radius: 0.55rem;\n    color: #ffffff;\n    background: #7e55d8;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 0.72rem;\n}\n\n.notifications-bell_avatar_2SaaP img {\n    width: 100%;\n    height: 100%;\n    -o-object-fit: cover;\n       object-fit: cover;\n}\n\n/* ── Item body ──────────────────────────────────────────────────────── */\n\n.notifications-bell_item-body_2lOVb {\n    min-width: 0;\n}\n\n.notifications-bell_message_2YmvN {\n    margin: 0;\n    color: #344473;\n    font-size: 0.82rem;\n    font-weight: 700;\n    line-height: 1.35;\n}\n\n.notifications-bell_actor_iFRfs {\n    color: #243f8f;\n    font-weight: 900;\n}\n\n.notifications-bell_project_1u-DJ {\n    margin: 0.25rem 0 0;\n    overflow: hidden;\n    color: #56648e;\n    font-size: 0.72rem;\n    font-weight: 700;\n    -o-text-overflow: ellipsis;\n       text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n.notifications-bell_date_3WZ9n {\n    margin: 0.28rem 0 0;\n    color: #7280a8;\n    font-size: 0.68rem;\n    font-weight: 700;\n}\n\n.notifications-bell_unread-dot_Kc_ji {\n    width: 0.58rem;\n    height: 0.58rem;\n    -webkit-align-self: start;\n        -ms-flex-item-align: start;\n            align-self: start;\n    border-radius: 999px;\n    background: #ff2b2b;\n}\n\n/* ── Empty / loading ────────────────────────────────────────────────── */\n\n.notifications-bell_empty_1HBoX,\n.notifications-bell_loading_Zw28E {\n    padding: 1.25rem;\n    color: #56648e;\n    font-size: 0.86rem;\n    font-weight: 800;\n    text-align: center;\n}\n\n/* ── Load more ──────────────────────────────────────────────────────── */\n\n.notifications-bell_load-more-wrap_1lg2a {\n    border-top: 0.08rem solid #d7e0f5;\n    padding: 0.45rem 0.8rem;\n    background: #f6f9ff;\n}\n\n.notifications-bell_load-more-button_rJIdR {\n    width: 100%;\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    gap: 0.3rem;\n    border: 0;\n    border-radius: 0.45rem;\n    padding: 0.4rem;\n    color: #243f8f;\n    background: transparent;\n    font-family: \"Montserrat\", sans-serif;\n    font-size: 0.72rem;\n    font-weight: 800;\n    cursor: pointer;\n    -webkit-transition: background 0.12s;\n    -o-transition: background 0.12s;\n    transition: background 0.12s;\n}\n\n.notifications-bell_load-more-button_rJIdR:hover:not(:disabled) {\n    background: #e5edff;\n}\n\n.notifications-bell_load-more-button_rJIdR:disabled {\n    opacity: 0.55;\n    cursor: default;\n}\n\n/* ── Footer ─────────────────────────────────────────────────────────── */\n\n.notifications-bell_footer_2pZPQ {\n    border-top: 0.08rem solid #d7e0f5;\n    padding: 0.65rem 0.8rem;\n    color: #7280a8;\n    background: #f6f9ff;\n    font-size: 0.72rem;\n    font-weight: 700;\n    text-align: center;\n}\n\n/* ── Responsive ─────────────────────────────────────────────────────── */\n\n@media (max-width: 48rem) {\n    .notifications-bell_dropdown_2ae_J {\n        right: -4rem;\n    }\n}\n", ""]);

// exports
exports.locals = {
	"wrap": "notifications-bell_wrap_2Gb76",
	"bell-button": "notifications-bell_bell-button_3oITE",
	"bellButton": "notifications-bell_bell-button_3oITE",
	"bell-icon": "notifications-bell_bell-icon_3P5Oj",
	"bellIcon": "notifications-bell_bell-icon_3P5Oj",
	"bell-shake": "notifications-bell_bell-shake_3toDR",
	"bellShake": "notifications-bell_bell-shake_3toDR",
	"badge": "notifications-bell_badge_1o5qe",
	"badge-pop": "notifications-bell_badge-pop_3YlRb",
	"badgePop": "notifications-bell_badge-pop_3YlRb",
	"dropdown": "notifications-bell_dropdown_2ae_J",
	"dropdown-in": "notifications-bell_dropdown-in_bj8P7",
	"dropdownIn": "notifications-bell_dropdown-in_bj8P7",
	"dropdown-header": "notifications-bell_dropdown-header_1YQG6",
	"dropdownHeader": "notifications-bell_dropdown-header_1YQG6",
	"dropdown-title": "notifications-bell_dropdown-title_24Sfo",
	"dropdownTitle": "notifications-bell_dropdown-title_24Sfo",
	"read-all-button": "notifications-bell_read-all-button_2Twre",
	"readAllButton": "notifications-bell_read-all-button_2Twre",
	"read-all-icon": "notifications-bell_read-all-icon_2ThKc",
	"readAllIcon": "notifications-bell_read-all-icon_2ThKc",
	"item-icon": "notifications-bell_item-icon_3BmDd",
	"itemIcon": "notifications-bell_item-icon_3BmDd",
	"load-more-icon": "notifications-bell_load-more-icon_2DJBp",
	"loadMoreIcon": "notifications-bell_load-more-icon_2DJBp",
	"list": "notifications-bell_list_kcgAh",
	"item": "notifications-bell_item_IWcJ6",
	"item-in": "notifications-bell_item-in_2lgiW",
	"itemIn": "notifications-bell_item-in_2lgiW",
	"item-unread": "notifications-bell_item-unread_Ph7eH",
	"itemUnread": "notifications-bell_item-unread_Ph7eH",
	"item-main": "notifications-bell_item-main_nJoht",
	"itemMain": "notifications-bell_item-main_nJoht",
	"delete-btn": "notifications-bell_delete-btn_3zHD6",
	"deleteBtn": "notifications-bell_delete-btn_3zHD6",
	"delete-btn-icon": "notifications-bell_delete-btn-icon_OWac4",
	"deleteBtnIcon": "notifications-bell_delete-btn-icon_OWac4",
	"avatar": "notifications-bell_avatar_2SaaP",
	"item-body": "notifications-bell_item-body_2lOVb",
	"itemBody": "notifications-bell_item-body_2lOVb",
	"message": "notifications-bell_message_2YmvN",
	"actor": "notifications-bell_actor_iFRfs",
	"project": "notifications-bell_project_1u-DJ",
	"date": "notifications-bell_date_3WZ9n",
	"unread-dot": "notifications-bell_unread-dot_Kc_ji",
	"unreadDot": "notifications-bell_unread-dot_Kc_ji",
	"empty": "notifications-bell_empty_1HBoX",
	"loading": "notifications-bell_loading_Zw28E",
	"load-more-wrap": "notifications-bell_load-more-wrap_1lg2a",
	"loadMoreWrap": "notifications-bell_load-more-wrap_1lg2a",
	"load-more-button": "notifications-bell_load-more-button_rJIdR",
	"loadMoreButton": "notifications-bell_load-more-button_rJIdR",
	"footer": "notifications-bell_footer_2pZPQ"
};

/***/ }),

/***/ 2059:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(22)(false);
// imports


// module
exports.push([module.i, "/* ── Toast container ────────────────────────────────────────────────────── */\n.notification-toast_toast_3t5-8 {\n    position: relative;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: stretch;\n    -webkit-align-items: stretch;\n        -ms-flex-align: stretch;\n            align-items: stretch;\n    gap: 0;\n    overflow: hidden;\n    width: min(22rem, calc(100vw - 2rem));\n    border: 0.15rem solid rgba(36, 63, 143, 0.18);\n    border-radius: 1rem;\n    background: rgba(255, 255, 255, 0.92);\n    -webkit-box-shadow:\n        0 0.5rem 2rem rgba(24, 43, 99, 0.18),\n        0 0.1rem 0.4rem rgba(24, 43, 99, 0.1);\n            box-shadow:\n        0 0.5rem 2rem rgba(24, 43, 99, 0.18),\n        0 0.1rem 0.4rem rgba(24, 43, 99, 0.1);\n    backdrop-filter: blur(12px);\n    -webkit-backdrop-filter: blur(12px);\n    -webkit-animation: notification-toast_toast-in_1lRea 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n            animation: notification-toast_toast-in_1lRea 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n}\n.notification-toast_toast_3t5-8.notification-toast_toast-out_LGIyu {\n    -webkit-animation: notification-toast_toast-out_LGIyu 0.28s ease-in both;\n            animation: notification-toast_toast-out_LGIyu 0.28s ease-in both;\n}\n/* ── Toast body (clickable area) ──────────────────────────────────────── */\n.notification-toast_toast-body_1hxjp {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    min-width: 0;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.7rem;\n    padding: 0.75rem 0.6rem 0.75rem 0.8rem;\n    border: 0;\n    background: transparent;\n    text-align: left;\n    cursor: pointer;\n}\n.notification-toast_toast-body_1hxjp:hover {\n    background: rgba(36, 63, 143, 0.04);\n}\n/* ── Avatar ─────────────────────────────────────────────────────────── */\n.notification-toast_toast-avatar_oFeUP {\n    -webkit-flex-shrink: 0;\n        -ms-flex-negative: 0;\n            flex-shrink: 0;\n    width: 2.1rem;\n    height: 2.1rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    overflow: hidden;\n    border-radius: 0.5rem;\n    color: #fff;\n    background: #7e55d8;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 0.68rem;\n}\n.notification-toast_toast-avatar_oFeUP img {\n    width: 100%;\n    height: 100%;\n    -o-object-fit: cover;\n       object-fit: cover;\n}\n/* ── Content ────────────────────────────────────────────────────────── */\n.notification-toast_toast-content_--F1_ {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    min-width: 0;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    gap: 0.4rem;\n}\n.notification-toast_toast-icon-wrap_K925M {\n    -webkit-flex-shrink: 0;\n        -ms-flex-negative: 0;\n            flex-shrink: 0;\n    margin-top: 0.06rem;\n    color: #243f8f;\n}\n.notification-toast_toast-icon_1ZhHv {\n    width: 0.9rem;\n    height: 0.9rem;\n    stroke-width: 2.5;\n}\n.notification-toast_toast-text_1ZbvV {\n    min-width: 0;\n    color: #344473;\n    font-family: \"Montserrat\", sans-serif;\n    font-size: 0.8rem;\n    font-weight: 700;\n    line-height: 1.35;\n    overflow: hidden;\n    display: -webkit-box;\n    -webkit-line-clamp: 2;\n    -webkit-box-orient: vertical;\n}\n.notification-toast_toast-actor_3YZcs {\n    color: #243f8f;\n    font-weight: 900;\n}\n/* ── Close button ───────────────────────────────────────────────────── */\n.notification-toast_toast-close_2DkFH {\n    -webkit-flex-shrink: 0;\n        -ms-flex-negative: 0;\n            flex-shrink: 0;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    padding: 0 0.65rem;\n    border: 0;\n    border-left: 0.08rem solid rgba(36, 63, 143, 0.1);\n    background: transparent;\n    color: #7280a8;\n    cursor: pointer;\n    -webkit-transition: color 0.15s, background 0.15s;\n    -o-transition: color 0.15s, background 0.15s;\n    transition: color 0.15s, background 0.15s;\n}\n.notification-toast_toast-close_2DkFH:hover {\n    background: rgba(36, 63, 143, 0.06);\n    color: #243f8f;\n}\n.notification-toast_toast-close-icon_-lReU {\n    width: 0.85rem;\n    height: 0.85rem;\n    stroke-width: 2.5;\n}\n/* ── Progress bar ───────────────────────────────────────────────────── */\n.notification-toast_toast-progress_2tyeZ {\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    height: 0.2rem;\n    width: 100%;\n    background: -webkit-gradient(linear, left top, right top, from(#243f8f), to(#7e55d8));\n    background: -o-linear-gradient(left, #243f8f, #7e55d8);\n    background: linear-gradient(90deg, #243f8f, #7e55d8);\n    -webkit-transform-origin: left;\n        -ms-transform-origin: left;\n            transform-origin: left;\n    -webkit-animation: notification-toast_toast-progress_2tyeZ 5s linear forwards;\n            animation: notification-toast_toast-progress_2tyeZ 5s linear forwards;\n}\n/* ── Keyframes ──────────────────────────────────────────────────────── */\n@-webkit-keyframes notification-toast_toast-in_1lRea {\n    from {\n        opacity: 0;\n        -webkit-transform: translateX(2rem) scale(0.95);\n                transform: translateX(2rem) scale(0.95);\n    }\n    to {\n        opacity: 1;\n        -webkit-transform: translateX(0) scale(1);\n                transform: translateX(0) scale(1);\n    }\n}\n@keyframes notification-toast_toast-in_1lRea {\n    from {\n        opacity: 0;\n        -webkit-transform: translateX(2rem) scale(0.95);\n                transform: translateX(2rem) scale(0.95);\n    }\n    to {\n        opacity: 1;\n        -webkit-transform: translateX(0) scale(1);\n                transform: translateX(0) scale(1);\n    }\n}\n@-webkit-keyframes notification-toast_toast-out_LGIyu {\n    from {\n        opacity: 1;\n        -webkit-transform: translateX(0) scale(1);\n                transform: translateX(0) scale(1);\n        max-height: 6rem;\n        margin-bottom: 0.5rem;\n    }\n    to {\n        opacity: 0;\n        -webkit-transform: translateX(2rem) scale(0.95);\n                transform: translateX(2rem) scale(0.95);\n        max-height: 0;\n        margin-bottom: 0;\n    }\n}\n@keyframes notification-toast_toast-out_LGIyu {\n    from {\n        opacity: 1;\n        -webkit-transform: translateX(0) scale(1);\n                transform: translateX(0) scale(1);\n        max-height: 6rem;\n        margin-bottom: 0.5rem;\n    }\n    to {\n        opacity: 0;\n        -webkit-transform: translateX(2rem) scale(0.95);\n                transform: translateX(2rem) scale(0.95);\n        max-height: 0;\n        margin-bottom: 0;\n    }\n}\n@-webkit-keyframes notification-toast_toast-progress_2tyeZ {\n    from { -webkit-transform: scaleX(1); transform: scaleX(1); }\n    to   { -webkit-transform: scaleX(0); transform: scaleX(0); }\n}\n@keyframes notification-toast_toast-progress_2tyeZ {\n    from { -webkit-transform: scaleX(1); transform: scaleX(1); }\n    to   { -webkit-transform: scaleX(0); transform: scaleX(0); }\n}\n", ""]);

// exports
exports.locals = {
	"toast": "notification-toast_toast_3t5-8",
	"toast-in": "notification-toast_toast-in_1lRea",
	"toastIn": "notification-toast_toast-in_1lRea",
	"toast-out": "notification-toast_toast-out_LGIyu",
	"toastOut": "notification-toast_toast-out_LGIyu",
	"toast-body": "notification-toast_toast-body_1hxjp",
	"toastBody": "notification-toast_toast-body_1hxjp",
	"toast-avatar": "notification-toast_toast-avatar_oFeUP",
	"toastAvatar": "notification-toast_toast-avatar_oFeUP",
	"toast-content": "notification-toast_toast-content_--F1_",
	"toastContent": "notification-toast_toast-content_--F1_",
	"toast-icon-wrap": "notification-toast_toast-icon-wrap_K925M",
	"toastIconWrap": "notification-toast_toast-icon-wrap_K925M",
	"toast-icon": "notification-toast_toast-icon_1ZhHv",
	"toastIcon": "notification-toast_toast-icon_1ZhHv",
	"toast-text": "notification-toast_toast-text_1ZbvV",
	"toastText": "notification-toast_toast-text_1ZbvV",
	"toast-actor": "notification-toast_toast-actor_3YZcs",
	"toastActor": "notification-toast_toast-actor_3YZcs",
	"toast-close": "notification-toast_toast-close_2DkFH",
	"toastClose": "notification-toast_toast-close_2DkFH",
	"toast-close-icon": "notification-toast_toast-close-icon_-lReU",
	"toastCloseIcon": "notification-toast_toast-close-icon_-lReU",
	"toast-progress": "notification-toast_toast-progress_2tyeZ",
	"toastProgress": "notification-toast_toast-progress_2tyeZ"
};

/***/ }),

/***/ 2060:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(22)(false);
// imports


// module
exports.push([module.i, ".project-page_page_1Wbb7 {\n    width: 100%;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    color: #182b63;\n    font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n}\n\n.project-page_panel_2Q9q6 {\n    width: 100%;\n}\n\n.project-page_header_3kFLm {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    gap: 1.25rem;\n    margin-bottom: 1rem;\n}\n\n.project-page_thumbnail_2k3iF,\n.project-page_thumbnailPlaceholder_3SgYt {\n    width: 5.25rem;\n    height: 5.25rem;\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    overflow: hidden;\n    border: 0.18rem solid #182b63;\n    border-radius: 0.75rem;\n    background: #d8e4ff;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n}\n\n.project-page_thumbnail_2k3iF {\n    display: block;\n    -o-object-fit: cover;\n       object-fit: cover;\n}\n\n.project-page_thumbnailWrap_36kdU {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    gap: 0.45rem;\n}\n\n.project-page_coverInput_B94Bd {\n    display: none;\n}\n\n.project-page_coverButton_Fa8rm,\n.project-page_titleEditButton_1fEXY {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    gap: 0.3rem;\n    border: 0;\n    border-radius: 0.42rem;\n    padding: 0.45rem 0.65rem;\n    color: #ffffff;\n    background: #243f8f;\n    -webkit-box-shadow: 0 0.18rem 0 #182b63;\n            box-shadow: 0 0.18rem 0 #182b63;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 0.55rem;\n    line-height: 1;\n    cursor: pointer;\n}\n\n.project-page_coverButton_Fa8rm:disabled {\n    cursor: default;\n    opacity: 0.65;\n}\n\n.project-page_thumbnailPlaceholder_3SgYt {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    color: #d800ff;\n    background:\n        -o-radial-gradient(82% 12%, circle, #ff8a1d 0 12%, transparent 13%),\n        -o-linear-gradient(315deg, #bcc8dd 0 45%, #7e8da8 46% 100%);\n    background:\n        radial-gradient(circle at 82% 12%, #ff8a1d 0 12%, transparent 13%),\n        linear-gradient(135deg, #bcc8dd 0 45%, #7e8da8 46% 100%);\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 1.6rem;\n    text-shadow: 0.08rem 0.08rem 0 #182b63;\n}\n\n.project-page_meta_2vh4S {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    min-width: 0;\n}\n\n.project-page_title_1ioNB {\n    margin: 0;\n    overflow: hidden;\n    color: #243f8f;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: clamp(1.8rem, 3vw, 3rem);\n    font-weight: 400;\n    letter-spacing: 0;\n    line-height: 1.05;\n    -o-text-overflow: ellipsis;\n       text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n.project-page_titleRow_lshee {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.7rem;\n    min-width: 0;\n}\n\n.project-page_titleEditButton_1fEXY {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    color: #243f8f;\n    background: #ffffff;\n    -webkit-box-shadow: inset 0 0 0 0.12rem #d7e0f5, 0 0.18rem 0 #c6d6ff;\n            box-shadow: inset 0 0 0 0.12rem #d7e0f5, 0 0.18rem 0 #c6d6ff;\n}\n\n.project-page_titleEditRow_SzVYH {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n    gap: 0.5rem;\n}\n\n.project-page_titleInput_11LDv {\n    min-width: min(26rem, 100%);\n    border: 0.13rem solid #d7e0f5;\n    border-radius: 0.55rem;\n    padding: 0.5rem 0.65rem;\n    color: #243f8f;\n    background: #ffffff;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 1.25rem;\n    line-height: 1.1;\n    outline: none;\n}\n\n.project-page_titleInput_11LDv:focus {\n    border-color: #7e55d8;\n    -webkit-box-shadow: 0 0 0 0.2rem rgba(126, 85, 216, 0.15);\n            box-shadow: 0 0 0 0.2rem rgba(126, 85, 216, 0.15);\n}\n\n.project-page_authorRow_hCaxE {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.5rem;\n    margin-top: 0.35rem;\n    color: #56648e;\n    font-size: 0.95rem;\n    font-weight: 700;\n}\n\n.project-page_avatar_1IJtx,\n.project-page_commentAvatar_VbgXq {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    overflow: hidden;\n    color: #ffffff;\n    background: #7e55d8;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n}\n\n.project-page_avatar_1IJtx {\n    width: 1.85rem;\n    height: 1.85rem;\n    border-radius: 0.5rem;\n    font-size: 0.78rem;\n}\n\n.project-page_authorName_2ztee strong {\n    color: #7e55d8;\n}\n\n.project-page_dateLine_1vSTc {\n    margin-top: 0.35rem;\n    color: #56648e;\n    font-size: 0.82rem;\n    font-weight: 700;\n}\n\n.project-page_visibilityBadge_1tzjs {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.35rem;\n    margin-top: 0.7rem;\n    border-radius: 999px;\n    padding: 0.3rem 0.75rem;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 0.58rem;\n    font-weight: 400;\n    line-height: 1;\n    text-transform: uppercase;\n}\n\n.project-page_badgeIcon_2mjY2,\n.project-page_buttonIcon_1X05D,\n.project-page_metricIcon_21pgh,\n.project-page_lowerHeaderIcon_nAxp7 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    stroke-width: 2.5;\n}\n\n.project-page_badgeIcon_2mjY2 {\n    width: 0.78rem;\n    height: 0.78rem;\n}\n\n.project-page_buttonIcon_1X05D {\n    width: 1rem;\n    height: 1rem;\n}\n\n.project-page_metricIcon_21pgh,\n.project-page_lowerHeaderIcon_nAxp7 {\n    width: 1.05rem;\n    height: 1.05rem;\n}\n\n.project-page_badgePublic_3hLam {\n    color: #0d6a2d;\n    background: #dff8e7;\n}\n\n.project-page_badgeUnlisted_1afrX {\n    color: #835600;\n    background: #fff1c6;\n}\n\n.project-page_badgePrivate_3RUiz {\n    color: #8d1111;\n    background: #ffe0e0;\n}\n\n.project-page_actionBar_DZpl2 {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n    gap: 0.65rem;\n    margin: 1.1rem 0 1.35rem;\n}\n\n.project-page_statBtn_2hEla,\n.project-page_remixBtn_-D20-,\n.project-page_editorLink_11Wot {\n    min-height: 2.15rem;\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    gap: 0.35rem;\n    border: 0;\n    border-radius: 0.45rem;\n    padding: 0 0.85rem;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 0.62rem;\n    font-weight: 400;\n    letter-spacing: 0;\n    line-height: 1;\n    text-decoration: none;\n    text-transform: uppercase;\n    cursor: pointer;\n    -webkit-transition: -webkit-transform 120ms ease, -webkit-box-shadow 120ms ease;\n    transition: -webkit-transform 120ms ease, -webkit-box-shadow 120ms ease;\n    -o-transition: transform 120ms ease, box-shadow 120ms ease;\n    transition: transform 120ms ease, box-shadow 120ms ease;\n    transition: transform 120ms ease, box-shadow 120ms ease, -webkit-transform 120ms ease, -webkit-box-shadow 120ms ease;\n}\n\n.project-page_statBtn_2hEla {\n    color: #243f8f;\n    background: #ffffff;\n    -webkit-box-shadow: inset 0 0 0 0.12rem #d7e0f5, 0 0.2rem 0 #c6d6ff;\n            box-shadow: inset 0 0 0 0.12rem #d7e0f5, 0 0.2rem 0 #c6d6ff;\n}\n\n.project-page_editorLink_11Wot,\n.project-page_remixBtn_-D20- {\n    color: #ffffff;\n    background: #243f8f;\n    -webkit-box-shadow: 0 0.2rem 0 #182b63;\n            box-shadow: 0 0.2rem 0 #182b63;\n}\n\n.project-page_statBtn_2hEla:hover:not(:disabled),\n.project-page_remixBtn_-D20-:hover:not(:disabled),\n.project-page_editorLink_11Wot:hover {\n    -webkit-transform: translateY(-0.08rem);\n        -ms-transform: translateY(-0.08rem);\n            transform: translateY(-0.08rem);\n}\n\n.project-page_statBtn_2hEla:active:not(:disabled),\n.project-page_remixBtn_-D20-:active:not(:disabled),\n.project-page_editorLink_11Wot:active {\n    -webkit-transform: translateY(0.05rem);\n        -ms-transform: translateY(0.05rem);\n            transform: translateY(0.05rem);\n}\n\n.project-page_statBtn_2hEla:disabled {\n    cursor: default;\n    opacity: 0.55;\n}\n\n.project-page_statBtnLiked_1KFkd {\n    color: #ffffff;\n    background: #ff2b2b;\n    -webkit-box-shadow: 0 0.2rem 0 #b51616;\n            box-shadow: 0 0.2rem 0 #b51616;\n}\n\n.project-page_statBtnFavorited_2nsH0 {\n    color: #182b63;\n    background: #ffd84d;\n    -webkit-box-shadow: 0 0.2rem 0 #d6a900;\n            box-shadow: 0 0.2rem 0 #d6a900;\n}\n\n.project-page_deleteProjectBtn_1_P5H {\n    color: #ffffff;\n    background: #ff2b2b;\n    -webkit-box-shadow: 0 0.2rem 0 #b51616;\n            box-shadow: 0 0.2rem 0 #b51616;\n}\n\n.project-page_viewStat_1nEPM {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.3rem;\n    color: #56648e;\n    font-size: 1rem;\n    font-weight: 800;\n}\n\n.project-page_tabs_hgF9n {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.5rem;\n    margin-bottom: 1rem;\n}\n\n.project-page_tab_1DiCC {\n    min-height: 2.1rem;\n    border: 0;\n    border-radius: 999px;\n    padding: 0 0.95rem;\n    color: #243f8f;\n    background: #e7efff;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 0.62rem;\n    font-weight: 400;\n    cursor: pointer;\n}\n\n.project-page_tabActive_1hzjj {\n    color: #ffffff;\n    background: #ff7a1a;\n}\n\n.project-page_body_C8AKw {\n    display: grid;\n    gap: 1rem;\n}\n\n.project-page_mainGrid_1I9rQ {\n    display: grid;\n    grid-template-columns: minmax(22rem, 32rem) minmax(20rem, 1fr);\n    gap: 1.35rem;\n    -webkit-box-align: start;\n    -webkit-align-items: start;\n        -ms-flex-align: start;\n            align-items: start;\n}\n\n.project-page_playerColumn_iZODB,\n.project-page_infoColumn_t5rZ6 {\n    min-width: 0;\n}\n\n.project-page_playerFrame_2rQly {\n    width: 100%;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    overflow: auto;\n    border-radius: 0.8rem;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n}\n\n.project-page_playerFrame_2rQly > img {\n    width: 100%;\n    display: block;\n}\n\n.project-page_playerFrame_2rQly [class*=\"stage-wrapper_stage-wrapper\"] {\n    margin: 0 auto;\n}\n\n.project-page_playerFallback_10Pka {\n    color: #d800ff;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 2rem;\n    text-shadow: 0.12rem 0.12rem 0 #182b63;\n}\n\n.project-page_lowerBand_1kVWh {\n    display: grid;\n    grid-template-columns: minmax(0, 1fr) minmax(16rem, 22rem);\n    gap: 2.5rem;\n    margin: 2rem calc((100vw - min(100vw, 79rem)) / -2) -3rem;\n    padding: 2.2rem max(1rem, calc((100vw - 79rem) / 2)) 3rem;\n    background: #eaf2ff;\n}\n\n.project-page_lowerHeader_2fXDr {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    gap: 0.75rem;\n    margin-bottom: 1rem;\n}\n\n.project-page_lowerHeader_2fXDr h2 {\n    margin: 0;\n    color: #243f8f;\n    font-size: 1.18rem;\n    font-weight: 800;\n}\n\n.project-page_lowerHeader_2fXDr span {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.35rem;\n    color: #7e55d8;\n    font-weight: 800;\n}\n\n.project-page_remixPlaceholder_bhMmA {\n    height: 9.4rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    overflow: hidden;\n    border: 0.18rem solid #c6d6ff;\n    border-radius: 0.65rem;\n    color: #d800ff;\n    background: #d8e4ff;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    text-shadow: 0.08rem 0.08rem 0 #182b63;\n}\n\n.project-page_remixPlaceholder_bhMmA img {\n    width: 100%;\n    height: 100%;\n    -o-object-fit: cover;\n       object-fit: cover;\n}\n\n.project-page_section_2WswC,\n.project-page_commentBubble_1zoUg,\n.project-page_commentInput_3W8bO,\n.project-page_loginPrompt_3uGQJ,\n.project-page_noComments_lfEVZ {\n    border: 0.12rem solid #d7e0f5;\n    border-radius: 0.75rem;\n    background: #eaf2ff;\n}\n\n.project-page_section_2WswC {\n    margin-bottom: 1rem;\n    padding: 1rem;\n}\n\n.project-page_sectionTitle_3FVsa {\n    margin: 0 0 0.65rem;\n    color: #243f8f;\n    font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 1.08rem;\n    font-weight: 800;\n}\n\n.project-page_sectionText_rXaIH,\n.project-page_emptyText_2HTQR {\n    margin: 0;\n    color: #344473;\n    font-size: 1rem;\n    font-weight: 600;\n    line-height: 1.5;\n    white-space: pre-wrap;\n    word-break: break-word;\n}\n\n.project-page_emptyText_2HTQR {\n    color: #7280a8;\n}\n\n.project-page_editBar_2hbQJ {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n    gap: 0.55rem;\n    margin-bottom: 1rem;\n    color: #56648e;\n    font-weight: 800;\n}\n\n.project-page_visibilitySelect_3a5Bg,\n.project-page_editArea_3SHT2,\n.project-page_commentInputField_2IaoT,\n.project-page_replyInputField_3d7f_ {\n    border: 0.14rem solid #c6d6ff;\n    border-radius: 0.55rem;\n    color: #182b63;\n    background: #ffffff;\n    font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-weight: 700;\n    outline: none;\n}\n\n.project-page_visibilitySelect_3a5Bg {\n    min-height: 2.35rem;\n    padding: 0 0.7rem;\n}\n\n.project-page_editArea_3SHT2,\n.project-page_commentInputField_2IaoT,\n.project-page_replyInputField_3d7f_ {\n    width: 100%;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    padding: 0.75rem;\n    font-size: 0.95rem;\n    line-height: 1.45;\n    resize: vertical;\n}\n\n.project-page_visibilitySelect_3a5Bg:focus,\n.project-page_editArea_3SHT2:focus,\n.project-page_commentInputField_2IaoT:focus,\n.project-page_replyInputField_3d7f_:focus {\n    border-color: #243f8f;\n    -webkit-box-shadow: 0 0 0 0.16rem rgba(36, 63, 143, 0.12);\n            box-shadow: 0 0 0 0.16rem rgba(36, 63, 143, 0.12);\n}\n\n.project-page_saveRow_1Htd2 {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: end;\n    -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n    gap: 0.65rem;\n    margin-top: 0.75rem;\n}\n\n.project-page_editBtn_2P_Oq,\n.project-page_saveBtn_2UXdt,\n.project-page_cancelBtn_16Ezz,\n.project-page_loadMoreBtn_2hGBH,\n.project-page_commentSubmitBtn_34U5K,\n.project-page_commentReplyBtn_1maxA,\n.project-page_replyCancelBtn_3d2ZC,\n.project-page_replySubmitBtn_1k3mB {\n    min-height: 2.15rem;\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    gap: 0.35rem;\n    border: 0;\n    border-radius: 0.45rem;\n    padding: 0 0.85rem;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 0.62rem;\n    font-weight: 400;\n    line-height: 1;\n    text-transform: uppercase;\n    cursor: pointer;\n}\n\n.project-page_editBtn_2P_Oq,\n.project-page_cancelBtn_16Ezz,\n.project-page_loadMoreBtn_2hGBH,\n.project-page_commentReplyBtn_1maxA,\n.project-page_replyCancelBtn_3d2ZC {\n    color: #243f8f;\n    background: #ffffff;\n    -webkit-box-shadow: inset 0 0 0 0.12rem #d7e0f5, 0 0.2rem 0 #c6d6ff;\n            box-shadow: inset 0 0 0 0.12rem #d7e0f5, 0 0.2rem 0 #c6d6ff;\n}\n\n.project-page_saveBtn_2UXdt,\n.project-page_commentSubmitBtn_34U5K,\n.project-page_replySubmitBtn_1k3mB {\n    color: #ffffff;\n    background: #243f8f;\n    -webkit-box-shadow: 0 0.2rem 0 #182b63;\n            box-shadow: 0 0.2rem 0 #182b63;\n}\n\n.project-page_editBtn_2P_Oq {\n    margin-top: 0.75rem;\n}\n\n.project-page_commentInput_3W8bO {\n    display: grid;\n    grid-template-columns: minmax(0, 1fr) auto;\n    gap: 0.65rem;\n    margin-bottom: 1rem;\n    padding: 0.75rem;\n}\n\n.project-page_commentSubmitBtn_34U5K {\n    -webkit-align-self: end;\n        -ms-flex-item-align: end;\n            align-self: end;\n    min-width: 2.65rem;\n    padding: 0 0.7rem;\n}\n\n.project-page_commentList_1RCq7 {\n    display: grid;\n    gap: 0.85rem;\n}\n\n.project-page_comment_1GL26 {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    gap: 0.65rem;\n}\n\n.project-page_commentReply_1XENR {\n    margin-top: 0.75rem;\n    gap: 0.5rem;\n}\n\n.project-page_commentReply_1XENR .project-page_commentAvatar_VbgXq {\n    width: 1.8rem;\n    height: 1.8rem;\n    border-radius: 0.5rem;\n    font-size: 0.65rem;\n}\n\n.project-page_commentAvatar_VbgXq {\n    width: 2.35rem;\n    height: 2.35rem;\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    border-radius: 0.65rem;\n    font-size: 0.8rem;\n}\n\n.project-page_commentAvatar_VbgXq img {\n    width: 100%;\n    height: 100%;\n    -o-object-fit: cover;\n       object-fit: cover;\n}\n\n.project-page_commentBubble_1zoUg {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    padding: 0.8rem;\n}\n\n.project-page_commentHeader_3R5J5 {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n    gap: 0.5rem;\n    margin-bottom: 0.4rem;\n}\n\n.project-page_commentAuthor_2v59M {\n    color: #243f8f;\n    font-weight: 800;\n}\n\n.project-page_commentDate_24PA1 {\n    color: #56648e;\n    font-size: 0.78rem;\n    font-weight: 700;\n}\n\n.project-page_commentDeleteBtn_3h4Eb {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    margin-left: auto;\n    border: 0;\n    border-radius: 0.35rem;\n    color: #8d1111;\n    background: #ffe0e0;\n    cursor: pointer;\n}\n\n.project-page_commentContent_14yaH {\n    color: #344473;\n    font-size: 0.95rem;\n    font-weight: 600;\n    line-height: 1.45;\n    white-space: pre-wrap;\n    word-break: break-word;\n}\n\n.project-page_commentLink_lzqAC {\n    color: #243f8f;\n    font-weight: 800;\n    text-decoration: underline;\n    text-decoration-thickness: 0.12rem;\n    text-underline-offset: 0.16rem;\n}\n\n.project-page_commentLink_lzqAC:hover,\n.project-page_commentLink_lzqAC:focus {\n    color: #7e55d8;\n}\n\n.project-page_commentActions_3JW2k {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.5rem;\n    margin-top: 0.55rem;\n}\n\n.project-page_commentReplyBtn_1maxA {\n    min-height: 1.75rem;\n    padding: 0 0.6rem;\n    font-size: 0.52rem;\n}\n\n.project-page_replyInput_22svb {\n    margin-top: 0.75rem;\n    border-top: 0.12rem solid #d7e0f5;\n    padding-top: 0.75rem;\n}\n\n.project-page_replyInputField_3d7f_ {\n    min-height: 4.25rem;\n    font-size: 0.9rem;\n}\n\n.project-page_replyActions_q0-4D {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: end;\n    -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n    gap: 0.5rem;\n    margin-top: 0.55rem;\n}\n\n.project-page_replyCancelBtn_3d2ZC,\n.project-page_replySubmitBtn_1k3mB {\n    min-height: 1.9rem;\n    padding: 0 0.7rem;\n    font-size: 0.55rem;\n}\n\n.project-page_replySubmitBtn_1k3mB:disabled {\n    cursor: default;\n    opacity: 0.55;\n}\n\n.project-page_replyList_1KEKp {\n    margin-top: 0.8rem;\n    border-left: 0.18rem solid #c6d6ff;\n    padding-left: 0.75rem;\n}\n\n.project-page_replyList_1KEKp .project-page_commentBubble_1zoUg {\n    padding: 0.65rem;\n    background: #ffffff;\n}\n\n.project-page_loginPrompt_3uGQJ,\n.project-page_noComments_lfEVZ {\n    padding: 1rem;\n    color: #56648e;\n    font-weight: 800;\n    text-align: center;\n}\n\n.project-page_loadMoreBtn_2hGBH {\n    width: 100%;\n    margin-top: 1rem;\n}\n\n.project-page_remixBadge_u69PK {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.35rem;\n    color: #7e55d8;\n    font-weight: 800;\n    text-decoration: none;\n}\n\n.project-page_loadingWrap_HicOB {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    gap: 1rem;\n    min-height: 16rem;\n    color: #56648e;\n    font-weight: 800;\n}\n\n.project-page_spinner_2e7Qd {\n    width: 2.35rem;\n    height: 2.35rem;\n    border: 0.25rem solid #d8e4ff;\n    border-top-color: #243f8f;\n    border-radius: 999px;\n    -webkit-animation: project-page_spin_2zBiE 0.8s linear infinite;\n            animation: project-page_spin_2zBiE 0.8s linear infinite;\n}\n\n@-webkit-keyframes project-page_spin_2zBiE {\n    to { -webkit-transform: rotate(360deg); transform: rotate(360deg); }\n}\n\n@keyframes project-page_spin_2zBiE {\n    to { -webkit-transform: rotate(360deg); transform: rotate(360deg); }\n}\n\n@media (max-width: 640px) {\n    .project-page_header_3kFLm {\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n        -webkit-flex-direction: column;\n            -ms-flex-direction: column;\n                flex-direction: column;\n    }\n\n    .project-page_title_1ioNB {\n        white-space: normal;\n    }\n\n    .project-page_commentInput_3W8bO {\n        grid-template-columns: 1fr;\n    }\n}\n\n@media (max-width: 900px) {\n    .project-page_mainGrid_1I9rQ,\n    .project-page_lowerBand_1kVWh {\n        grid-template-columns: 1fr;\n    }\n\n    .project-page_lowerBand_1kVWh {\n        margin-right: -1rem;\n        margin-left: -1rem;\n        padding-right: 1rem;\n        padding-left: 1rem;\n    }\n}\n", ""]);

// exports
exports.locals = {
	"page": "project-page_page_1Wbb7",
	"panel": "project-page_panel_2Q9q6",
	"header": "project-page_header_3kFLm",
	"thumbnail": "project-page_thumbnail_2k3iF",
	"thumbnailPlaceholder": "project-page_thumbnailPlaceholder_3SgYt",
	"thumbnailWrap": "project-page_thumbnailWrap_36kdU",
	"coverInput": "project-page_coverInput_B94Bd",
	"coverButton": "project-page_coverButton_Fa8rm",
	"titleEditButton": "project-page_titleEditButton_1fEXY",
	"meta": "project-page_meta_2vh4S",
	"title": "project-page_title_1ioNB",
	"titleRow": "project-page_titleRow_lshee",
	"titleEditRow": "project-page_titleEditRow_SzVYH",
	"titleInput": "project-page_titleInput_11LDv",
	"authorRow": "project-page_authorRow_hCaxE",
	"avatar": "project-page_avatar_1IJtx",
	"commentAvatar": "project-page_commentAvatar_VbgXq",
	"authorName": "project-page_authorName_2ztee",
	"dateLine": "project-page_dateLine_1vSTc",
	"visibilityBadge": "project-page_visibilityBadge_1tzjs",
	"badgeIcon": "project-page_badgeIcon_2mjY2",
	"buttonIcon": "project-page_buttonIcon_1X05D",
	"metricIcon": "project-page_metricIcon_21pgh",
	"lowerHeaderIcon": "project-page_lowerHeaderIcon_nAxp7",
	"badgePublic": "project-page_badgePublic_3hLam",
	"badgeUnlisted": "project-page_badgeUnlisted_1afrX",
	"badgePrivate": "project-page_badgePrivate_3RUiz",
	"actionBar": "project-page_actionBar_DZpl2",
	"statBtn": "project-page_statBtn_2hEla",
	"remixBtn": "project-page_remixBtn_-D20-",
	"editorLink": "project-page_editorLink_11Wot",
	"statBtnLiked": "project-page_statBtnLiked_1KFkd",
	"statBtnFavorited": "project-page_statBtnFavorited_2nsH0",
	"deleteProjectBtn": "project-page_deleteProjectBtn_1_P5H",
	"viewStat": "project-page_viewStat_1nEPM",
	"tabs": "project-page_tabs_hgF9n",
	"tab": "project-page_tab_1DiCC",
	"tabActive": "project-page_tabActive_1hzjj",
	"body": "project-page_body_C8AKw",
	"mainGrid": "project-page_mainGrid_1I9rQ",
	"playerColumn": "project-page_playerColumn_iZODB",
	"infoColumn": "project-page_infoColumn_t5rZ6",
	"playerFrame": "project-page_playerFrame_2rQly",
	"playerFallback": "project-page_playerFallback_10Pka",
	"lowerBand": "project-page_lowerBand_1kVWh",
	"lowerHeader": "project-page_lowerHeader_2fXDr",
	"remixPlaceholder": "project-page_remixPlaceholder_bhMmA",
	"section": "project-page_section_2WswC",
	"commentBubble": "project-page_commentBubble_1zoUg",
	"commentInput": "project-page_commentInput_3W8bO",
	"loginPrompt": "project-page_loginPrompt_3uGQJ",
	"noComments": "project-page_noComments_lfEVZ",
	"sectionTitle": "project-page_sectionTitle_3FVsa",
	"sectionText": "project-page_sectionText_rXaIH",
	"emptyText": "project-page_emptyText_2HTQR",
	"editBar": "project-page_editBar_2hbQJ",
	"visibilitySelect": "project-page_visibilitySelect_3a5Bg",
	"editArea": "project-page_editArea_3SHT2",
	"commentInputField": "project-page_commentInputField_2IaoT",
	"replyInputField": "project-page_replyInputField_3d7f_",
	"saveRow": "project-page_saveRow_1Htd2",
	"editBtn": "project-page_editBtn_2P_Oq",
	"saveBtn": "project-page_saveBtn_2UXdt",
	"cancelBtn": "project-page_cancelBtn_16Ezz",
	"loadMoreBtn": "project-page_loadMoreBtn_2hGBH",
	"commentSubmitBtn": "project-page_commentSubmitBtn_34U5K",
	"commentReplyBtn": "project-page_commentReplyBtn_1maxA",
	"replyCancelBtn": "project-page_replyCancelBtn_3d2ZC",
	"replySubmitBtn": "project-page_replySubmitBtn_1k3mB",
	"commentList": "project-page_commentList_1RCq7",
	"comment": "project-page_comment_1GL26",
	"commentReply": "project-page_commentReply_1XENR",
	"commentHeader": "project-page_commentHeader_3R5J5",
	"commentAuthor": "project-page_commentAuthor_2v59M",
	"commentDate": "project-page_commentDate_24PA1",
	"commentDeleteBtn": "project-page_commentDeleteBtn_3h4Eb",
	"commentContent": "project-page_commentContent_14yaH",
	"commentLink": "project-page_commentLink_lzqAC",
	"commentActions": "project-page_commentActions_3JW2k",
	"replyInput": "project-page_replyInput_22svb",
	"replyActions": "project-page_replyActions_q0-4D",
	"replyList": "project-page_replyList_1KEKp",
	"remixBadge": "project-page_remixBadge_u69PK",
	"loadingWrap": "project-page_loadingWrap_HicOB",
	"spinner": "project-page_spinner_2e7Qd",
	"spin": "project-page_spin_2zBiE"
};

/***/ }),

/***/ 2061:
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(462);
exports = module.exports = __webpack_require__(22)(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css2?family=Bungee&family=Montserrat:wght@400;600;700;800&display=swap);", ""]);

// module
exports.push([module.i, ".dogoblock-web-app_app-shell_2PA39 {\n    min-height: 100vh;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    background: #ffffff;\n    color: #182b63;\n    font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n}\n\n.dogoblock-web-app_topbar_3aLHW {\n    width: 100%;\n    background: #182b63;\n    color: #ffffff;\n    -webkit-box-shadow: 0 0.18rem 0 rgba(0, 0, 0, 0.25);\n            box-shadow: 0 0.18rem 0 rgba(0, 0, 0, 0.25);\n    padding: 0.35rem 0;\n}\n\n.dogoblock-web-app_topbar-inner_1PVrq {\n    width: min(100% - 2rem, 80rem);\n    margin: 0 auto;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    gap: 1.25rem;\n    position: relative;\n}\n\n.dogoblock-web-app_brand_25VAQ {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    min-width: 8.5rem;\n    cursor: pointer;\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n}\n\n.dogoblock-web-app_logo_2DRMj {\n    display: block;\n    width: 7.75rem;\n    height: auto;\n}\n\n.dogoblock-web-app_nav-center_23sFd {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    gap: 1.35rem;\n    position: absolute;\n    left: 50%;\n    -webkit-transform: translateX(-50%);\n        -ms-transform: translateX(-50%);\n            transform: translateX(-50%);\n    font-size: 0.78rem;\n    font-weight: 700;\n}\n\n.dogoblock-web-app_nav-right_1hx6M {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: end;\n    -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n    gap: 1.35rem;\n    font-size: 0.78rem; \n    font-weight: 700;\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n}\n\n.dogoblock-web-app_nav-button_1dItK,\n.dogoblock-web-app_inline-button_wEmD4 {\n    border: 0;\n    padding: 0;\n    background: transparent;\n    color: inherit;\n    font: inherit;\n    cursor: pointer;\n}\n\n.dogoblock-web-app_nav-button_1dItK {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.32rem;\n    color: #ffffff;\n    line-height: 1.2;\n}\n\n.dogoblock-web-app_nav-icon_27ZE8 {\n    width: 0.9rem;\n    height: 0.9rem;\n    stroke-width: 2.4;\n}\n\n.dogoblock-web-app_icon-wrap_sITAL,\n.dogoblock-web-app_inline-icon_3pGo_ {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n}\n\n.dogoblock-web-app_icon-wrap_sITAL {\n    width: 1rem;\n    height: 1rem;\n    margin-right: 0.35rem;\n}\n\n.dogoblock-web-app_icon-wrap_sITAL svg,\n.dogoblock-web-app_inline-icon_3pGo_ {\n    width: 1rem;\n    height: 1rem;\n    stroke-width: 2.6;\n}\n\n.dogoblock-web-app_inline-icon_3pGo_ {\n    margin-right: 0.32rem;\n    vertical-align: -0.18rem;\n}\n\n.dogoblock-web-app_nav-button_1dItK:hover,\n.dogoblock-web-app_inline-button_wEmD4:hover {\n    text-decoration: underline;\n}\n\n.dogoblock-web-app_user-badge_38q0T {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.35rem;\n    color: #ffffff;\n    font-weight: 800;\n}\n\n.dogoblock-web-app_user-badge_38q0T::before {\n    content: \"\";\n    width: 0.75rem;\n    height: 0.75rem;\n    border-radius: 999px;\n    background: #ffffff;\n    -webkit-box-shadow: inset 0 -0.22rem 0 #c6d6ff;\n            box-shadow: inset 0 -0.22rem 0 #c6d6ff;\n}\n\n.dogoblock-web-app_page_z_onn {\n    width: min(100% - 2rem, 74rem);\n    margin: 0 auto;\n    padding: 2.3rem 0 3rem;\n}\n\n.dogoblock-web-app_home-page_4fkF1 {\n    padding-top: 3.25rem;\n}\n\n.dogoblock-web-app_hero_1xxqp {\n    min-height: 29rem;\n    display: grid;\n    grid-template-columns: minmax(0, 1.1fr) minmax(16rem, 0.9fr);\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 2.5rem;\n}\n\n.dogoblock-web-app_hero-copy_156mN {\n    max-width: 44rem;\n}\n\n.dogoblock-web-app_kicker_1y7vH {\n    margin: 0 0 0.65rem;\n    color: #ff2b2b;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 0.9rem;\n}\n\n.dogoblock-web-app_hero_1xxqp h1,\n.dogoblock-web-app_page-header_2q-ME h1,\n.dogoblock-web-app_panel_Q0s02 h1 {\n    margin: 0;\n    color: #243f8f;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-weight: 400;\n    letter-spacing: 0;\n    line-height: 1.05;\n}\n\n.dogoblock-web-app_hero_1xxqp h1 {\n    max-width: 40rem;\n    font-size: clamp(2.2rem, 5vw, 4.8rem);\n}\n\n.dogoblock-web-app_hero-text_2OLVS {\n    max-width: 35rem;\n    margin: 1.2rem 0 0;\n    color: #344473;\n    font-size: 1.05rem;\n    font-weight: 600;\n    line-height: 1.55;\n}\n\n.dogoblock-web-app_hero-actions_2Mbfc,\n.dogoblock-web-app_actions_XinWC {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n    gap: 0.65rem;\n}\n\n.dogoblock-web-app_hero-actions_2Mbfc {\n    margin-top: 1.5rem;\n}\n\n.dogoblock-web-app_hero-preview_SVneW {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: end;\n    -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n}\n\n.dogoblock-web-app_preview-card_vDMIu {\n    width: min(100%, 23rem);\n    padding: 0.75rem;\n    border: 0.42rem solid #182b63;\n    border-radius: 1.25rem;\n    background: #0739a5;\n    color: #ffffff;\n    -webkit-box-shadow: 0.6rem 0.7rem 0 #d8e4ff;\n            box-shadow: 0.6rem 0.7rem 0 #d8e4ff;\n}\n\n.dogoblock-web-app_preview-window_3Grs6 {\n    height: 14rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    margin-bottom: 0.75rem;\n    border-radius: 0.65rem;\n    background:\n        -o-radial-gradient(76% 18%, circle, #ff8a1d 0 10%, transparent 11%),\n        -o-linear-gradient(315deg, #b4c4df 0 42%, #7f8ea8 43% 100%);\n    background:\n        radial-gradient(circle at 76% 18%, #ff8a1d 0 10%, transparent 11%),\n        linear-gradient(135deg, #b4c4df 0 42%, #7f8ea8 43% 100%);\n    overflow: hidden;\n}\n\n.dogoblock-web-app_preview-window_3Grs6 span {\n    color: #d800ff;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 2.1rem;\n    text-shadow: 0.12rem 0.12rem 0 #182b63;\n}\n\n.dogoblock-web-app_preview-card_vDMIu strong,\n.dogoblock-web-app_preview-card_vDMIu small {\n    display: block;\n    padding: 0 0.2rem;\n}\n\n.dogoblock-web-app_preview-card_vDMIu strong {\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 1rem;\n    font-weight: 400;\n}\n\n.dogoblock-web-app_preview-card_vDMIu small {\n    margin-top: 0.15rem;\n    font-size: 0.72rem;\n    font-weight: 800;\n}\n\n.dogoblock-web-app_narrow-page_186pT {\n    width: min(100% - 2rem, 28rem);\n    padding-top: 3.5rem;\n}\n\n.dogoblock-web-app_auth-section_2gv_4 {\n    width: 100%;\n    min-height: calc(100vh - 8rem);\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    padding: 3.5rem 1.5rem;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    background-color: #ffffff;\n    background-image: url(" + escape(__webpack_require__(2062)) + ");\n    background-repeat: no-repeat;\n    background-position: center center;\n    background-size: cover;\n}\n\n.dogoblock-web-app_auth-card-wrap_JtkmG {\n    width: min(100%, 28rem);\n    margin: 0 auto;\n}\n\n.dogoblock-web-app_auth-card-wrap_JtkmG .dogoblock-web-app_panel_Q0s02 {\n    -webkit-box-shadow: 0 0.8rem 2rem rgba(11, 23, 60, 0.4), 0.35rem 0.45rem 0 #d8e4ff;\n            box-shadow: 0 0.8rem 2rem rgba(11, 23, 60, 0.4), 0.35rem 0.45rem 0 #d8e4ff;\n}\n\n.dogoblock-web-app_panel_Q0s02 {\n    background: #ffffff;\n    border: 0.18rem solid #243f8f;\n    border-radius: 0.85rem;\n    padding: 1.4rem;\n    -webkit-box-shadow: 0.35rem 0.45rem 0 #d8e4ff;\n            box-shadow: 0.35rem 0.45rem 0 #d8e4ff;\n}\n\n.dogoblock-web-app_panel_Q0s02 h1 {\n    margin-bottom: 1rem;\n    font-size: 1.75rem;\n}\n\n.dogoblock-web-app_page-header_2q-ME {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    gap: 1rem;\n    margin-bottom: 1.25rem;\n}\n\n.dogoblock-web-app_page-header_2q-ME h1 {\n    font-size: 1.9rem;\n    text-transform: uppercase;\n}\n\n.dogoblock-web-app_search-bar_2Winb {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    background-color: #ffffff;\n    border: 2px solid #e0e7ff;\n    border-radius: 99px;\n    padding: 0.4rem 1rem;\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    max-width: 400px;\n    margin: 0 1rem;\n    -webkit-transition: border-color 0.2s ease, -webkit-box-shadow 0.2s ease;\n    transition: border-color 0.2s ease, -webkit-box-shadow 0.2s ease;\n    -o-transition: border-color 0.2s ease, box-shadow 0.2s ease;\n    transition: border-color 0.2s ease, box-shadow 0.2s ease;\n    transition: border-color 0.2s ease, box-shadow 0.2s ease, -webkit-box-shadow 0.2s ease;\n}\n\n.dogoblock-web-app_search-bar_2Winb:focus-within {\n    border-color: #243f8f;\n    -webkit-box-shadow: 0 0 0 3px rgba(36, 63, 143, 0.1);\n            box-shadow: 0 0 0 3px rgba(36, 63, 143, 0.1);\n}\n\n.dogoblock-web-app_search-icon_1Qs5C {\n    color: #8d9ec4;\n    margin-right: 0.5rem;\n}\n\n.dogoblock-web-app_search-input_3D28S {\n    border: none;\n    background: transparent;\n    outline: none;\n    font-size: 0.95rem;\n    font-family: inherit;\n    color: #344473;\n    width: 100%;\n}\n\n.dogoblock-web-app_search-input_3D28S::-webkit-input-placeholder {\n    color: #aab0c4;\n}\n\n.dogoblock-web-app_search-input_3D28S::-moz-placeholder {\n    color: #aab0c4;\n}\n\n.dogoblock-web-app_search-input_3D28S:-ms-input-placeholder {\n    color: #aab0c4;\n}\n\n.dogoblock-web-app_search-input_3D28S::-ms-input-placeholder {\n    color: #aab0c4;\n}\n\n.dogoblock-web-app_search-input_3D28S::placeholder {\n    color: #aab0c4;\n}\n\n.dogoblock-web-app_primary-button_J8O77,\n.dogoblock-web-app_secondary-button_1TFxG,\n.dogoblock-web-app_danger-button_1pdOP,\n.dogoblock-web-app_light-button_KaXx_ {\n    min-height: 2.15rem;\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    border: 0;\n    border-radius: 0.45rem;\n    padding: 0 0.85rem;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 0.62rem;\n    font-weight: 400;\n    letter-spacing: 0;\n    line-height: 1;\n    text-transform: uppercase;\n    cursor: pointer;\n    -webkit-transition: -webkit-transform 120ms ease, -webkit-box-shadow 120ms ease;\n    transition: -webkit-transform 120ms ease, -webkit-box-shadow 120ms ease;\n    -o-transition: transform 120ms ease, box-shadow 120ms ease;\n    transition: transform 120ms ease, box-shadow 120ms ease;\n    transition: transform 120ms ease, box-shadow 120ms ease, -webkit-transform 120ms ease, -webkit-box-shadow 120ms ease;\n}\n\n.dogoblock-web-app_primary-button_J8O77 {\n    color: #ffffff;\n    background: #243f8f;\n    -webkit-box-shadow: 0 0.2rem 0 #182b63;\n            box-shadow: 0 0.2rem 0 #182b63;\n}\n\n.dogoblock-web-app_secondary-button_1TFxG {\n    color: #243f8f;\n    background: #ffffff;\n    -webkit-box-shadow: inset 0 0 0 0.12rem #d7e0f5, 0 0.2rem 0 #c6d6ff;\n            box-shadow: inset 0 0 0 0.12rem #d7e0f5, 0 0.2rem 0 #c6d6ff;\n}\n\n.dogoblock-web-app_danger-button_1pdOP {\n    color: #ffffff;\n    background: #ff2b2b;\n    -webkit-box-shadow: 0 0.2rem 0 #b51616;\n            box-shadow: 0 0.2rem 0 #b51616;\n}\n\n.dogoblock-web-app_light-button_KaXx_ {\n    color: #243f8f;\n    background: #e7efff;\n    -webkit-box-shadow: 0 0.2rem 0 #c6d6ff;\n            box-shadow: 0 0.2rem 0 #c6d6ff;\n}\n\n.dogoblock-web-app_primary-button_J8O77:hover,\n.dogoblock-web-app_secondary-button_1TFxG:hover,\n.dogoblock-web-app_danger-button_1pdOP:hover,\n.dogoblock-web-app_light-button_KaXx_:hover,\n.dogoblock-web-app_project-card_2NByI:hover {\n    -webkit-transform: translateY(-0.08rem);\n        -ms-transform: translateY(-0.08rem);\n            transform: translateY(-0.08rem);\n}\n\n.dogoblock-web-app_primary-button_J8O77:active,\n.dogoblock-web-app_secondary-button_1TFxG:active,\n.dogoblock-web-app_danger-button_1pdOP:active,\n.dogoblock-web-app_light-button_KaXx_:active,\n.dogoblock-web-app_project-card_2NByI:active {\n    -webkit-transform: translateY(0.05rem);\n        -ms-transform: translateY(0.05rem);\n            transform: translateY(0.05rem);\n}\n\n.dogoblock-web-app_field_VXAJd {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    gap: 0.4rem;\n    margin-bottom: 0.85rem;\n    color: #243f8f;\n    font-size: 0.78rem;\n    font-weight: 800;\n}\n\n.dogoblock-web-app_field_VXAJd input,\n.dogoblock-web-app_field_VXAJd textarea {\n    min-height: 2.65rem;\n    border: 0.14rem solid #c6d6ff;\n    border-radius: 0.55rem;\n    padding: 0 0.75rem;\n    color: #182b63;\n    font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 0.95rem;\n    font-weight: 700;\n    outline: none;\n}\n\n.dogoblock-web-app_field_VXAJd textarea {\n    min-height: 5.5rem;\n    padding-top: 0.7rem;\n    padding-bottom: 0.7rem;\n    line-height: 1.4;\n    resize: vertical;\n}\n\n.dogoblock-web-app_field_VXAJd input:focus,\n.dogoblock-web-app_field_VXAJd textarea:focus {\n    border-color: #243f8f;\n    -webkit-box-shadow: 0 0 0 0.16rem rgba(36, 63, 143, 0.12);\n            box-shadow: 0 0 0 0.16rem rgba(36, 63, 143, 0.12);\n}\n\n.dogoblock-web-app_form-hint_1ve3y {\n    margin: 1rem 0 0;\n    color: #344473;\n    font-size: 0.82rem;\n    font-weight: 700;\n}\n\n.dogoblock-web-app_inline-button_wEmD4 {\n    color: #243f8f;\n    font-weight: 800;\n}\n\n.dogoblock-web-app_error_3uIrk {\n    margin-bottom: 0.9rem;\n    border-radius: 0.45rem;\n    padding: 0.7rem 0.8rem;\n    color: #8d1111;\n    background: #ffe7e7;\n    font-weight: 800;\n}\n\n.dogoblock-web-app_project-grid_W2vKL {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(13.9rem, 13.9rem));\n    gap: 1rem;\n}\n\n.dogoblock-web-app_project-card-wrap_3i3y1 {\n    position: relative;\n    width: 13.9rem;\n}\n\n.dogoblock-web-app_project-card_2NByI {\n    width: 13.9rem;\n    min-height: 11rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-align: stretch;\n    -webkit-align-items: stretch;\n        -ms-flex-align: stretch;\n            align-items: stretch;\n    gap: 0;\n    border: 0.35rem solid #182b63;\n    border-radius: 0.85rem;\n    padding: 0;\n    background: #0739a5;\n    color: #ffffff;\n    text-align: left;\n    -webkit-box-shadow: 0 0.18rem 0 rgba(24, 43, 99, 0.35);\n            box-shadow: 0 0.18rem 0 rgba(24, 43, 99, 0.35);\n    cursor: pointer;\n    overflow: hidden;\n}\n\n.dogoblock-web-app_project-delete-button_1ypDz {\n    position: absolute;\n    top: 0.62rem;\n    right: 0.62rem;\n    width: 2rem;\n    height: 2rem;\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    border: 0.12rem solid #ffffff;\n    border-radius: 0.55rem;\n    color: #ffffff;\n    background: #ff2b2b;\n    -webkit-box-shadow: 0 0.15rem 0 #b51616;\n            box-shadow: 0 0.15rem 0 #b51616;\n    cursor: pointer;\n}\n\n.dogoblock-web-app_project-delete-button_1ypDz:hover {\n    -webkit-transform: translateY(-0.06rem);\n        -ms-transform: translateY(-0.06rem);\n            transform: translateY(-0.06rem);\n}\n\n.dogoblock-web-app_project-thumbnail_26w0a {\n    height: 7rem;\n    display: block;\n    overflow: hidden;\n    border-radius: 0;\n    background: #d8e4ff;\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n}\n\n.dogoblock-web-app_project-thumbnail-image_2HJxW {\n    width: 100%;\n    height: 100%;\n    display: block;\n    -o-object-fit: cover;\n       object-fit: cover;\n}\n\n.dogoblock-web-app_project-thumbnail-fallback_18iRF {\n    height: 100%;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    background:\n        -o-radial-gradient(82% 12%, circle, #ff8a1d 0 12%, transparent 13%),\n        -o-linear-gradient(315deg, #bcc8dd 0 45%, #7e8da8 46% 100%);\n    background:\n        radial-gradient(circle at 82% 12%, #ff8a1d 0 12%, transparent 13%),\n        linear-gradient(135deg, #bcc8dd 0 45%, #7e8da8 46% 100%);\n}\n\n.dogoblock-web-app_project-thumbnail-fallback_18iRF span {\n    color: #d800ff;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 1.05rem;\n    text-shadow: 0.08rem 0.08rem 0 #182b63;\n}\n\n.dogoblock-web-app_project-title_1UyeV {\n    display: block;\n    min-height: 1rem;\n    margin-top: 0.15rem;\n    overflow: hidden;\n    color: #ffffff;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 0.74rem;\n    font-weight: 400;\n    line-height: 1.05;\n    -o-text-overflow: ellipsis;\n       text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n.dogoblock-web-app_project-meta_p_s94 {\n    display: block;\n    position: relative;\n    padding-left: 0.55rem;\n    color: #ffffff;\n    font-size: 0.58rem;\n    font-weight: 800;\n    line-height: 1.05;\n}\n\n.dogoblock-web-app_project-meta_p_s94::before {\n    content: \"\";\n    position: absolute;\n    left: 0.05rem;\n    top: 0.22rem;\n    width: 0.24rem;\n    height: 0.24rem;\n    border-radius: 999px;\n    background: #ffffff;\n}\n\n.dogoblock-web-app_card-body_2RDB_ {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.65rem;\n    padding: 0.5rem 0.55rem 0.55rem;\n    width: 100%;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n}\n\n.dogoblock-web-app_featured-card_3hVgO .dogoblock-web-app_card-body_2RDB_ {\n    padding: 0.65rem 0.75rem 0.75rem;\n}\n\n.dogoblock-web-app_card-avatar-col_GPjdL {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n}\n\n.dogoblock-web-app_card-avatar-icon_2H8lk {\n    width: 2.15rem;\n    height: 2.15rem;\n    color: #ffffff;\n    fill: #ffffff;\n    stroke-width: 1.8;\n}\n\n.dogoblock-web-app_card-info-col_3pwGi {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    min-width: 0;\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    gap: 0.12rem;\n}\n\n.dogoblock-web-app_card-title_1OH15 {\n    display: block;\n    font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 0.85rem;\n    font-weight: 800;\n    color: #ffffff;\n    white-space: nowrap;\n    overflow: hidden;\n    -o-text-overflow: ellipsis;\n       text-overflow: ellipsis;\n    line-height: 1.15;\n}\n\n.dogoblock-web-app_card-author_1lvNV {\n    display: block;\n    font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 0.68rem;\n    font-weight: 700;\n    color: #a8b8ff;\n    white-space: nowrap;\n    overflow: hidden;\n    -o-text-overflow: ellipsis;\n       text-overflow: ellipsis;\n    line-height: 1.15;\n}\n\n.dogoblock-web-app_empty-state_oJImC {\n    width: min(100%, 28rem);\n    margin-top: 1rem;\n    border: 0.18rem dashed #c6d6ff;\n    border-radius: 0.75rem;\n    padding: 1.4rem;\n    color: #344473;\n    font-weight: 800;\n    text-align: center;\n}\n\n.dogoblock-web-app_project-details-page_HYCVs {\n    width: min(100% - 2rem, 79rem);\n}\n\n.dogoblock-web-app_details-header_3-XXe {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    gap: 1.5rem;\n    margin-bottom: 1.45rem;\n}\n\n.dogoblock-web-app_details-title-area_2N4tl {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    min-width: 0;\n    gap: 1rem;\n}\n\n.dogoblock-web-app_details-title-area_2N4tl h1 {\n    margin: 0;\n    overflow: hidden;\n    color: #243f8f;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: clamp(1.8rem, 3vw, 3rem);\n    font-weight: 400;\n    line-height: 1.05;\n    -o-text-overflow: ellipsis;\n       text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n.dogoblock-web-app_details-title-area_2N4tl p {\n    margin: 0.2rem 0 0;\n    color: #56648e;\n    font-size: 0.95rem;\n    font-weight: 700;\n}\n\n.dogoblock-web-app_details-title-area_2N4tl strong {\n    color: #7e55d8;\n}\n\n.dogoblock-web-app_details-avatar_eht0D {\n    width: 4.6rem;\n    height: 4.6rem;\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    overflow: hidden;\n    border: 0.18rem solid #182b63;\n    border-radius: 0.7rem;\n    background: #d8e4ff;\n}\n\n.dogoblock-web-app_details-main-grid_3v5Ue {\n    display: grid;\n    grid-template-columns: minmax(22rem, 38rem) minmax(20rem, 1fr);\n    gap: 1.35rem;\n    -webkit-box-align: start;\n    -webkit-align-items: start;\n        -ms-flex-align: start;\n            align-items: start;\n}\n\n.dogoblock-web-app_details-player-column_boimX {\n    min-width: 0;\n}\n\n.dogoblock-web-app_detail-stage-player_1iQg7 {\n    width: 100%;\n    max-width: 100%;\n    min-height: 30.2rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    overflow: auto;\n    border: 0.18rem solid #182b63;\n    border-radius: 0.8rem;\n    background: #ffffff;\n}\n\n.dogoblock-web-app_detail-stage-player_1iQg7 [class*=\"stage-wrapper_stage-wrapper\"] {\n    margin: 0 auto;\n}\n\n.dogoblock-web-app_detail-stats_favx8 {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n    gap: 1.4rem;\n    margin-top: 1rem;\n    color: #56648e;\n    font-size: 1.08rem;\n    font-weight: 800;\n}\n\n.dogoblock-web-app_details-info-column_JMmlU {\n    min-width: 0;\n}\n\n.dogoblock-web-app_detail-text-section_2cGjb {\n    margin-bottom: 1rem;\n}\n\n.dogoblock-web-app_detail-text-section_2cGjb h2,\n.dogoblock-web-app_comments-section_3ZgUT h2,\n.dogoblock-web-app_remix-section_1yYhw h2 {\n    margin: 0 0 0.6rem;\n    color: #243f8f;\n    font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 1.18rem;\n    font-weight: 800;\n}\n\n.dogoblock-web-app_detail-text-box_2PJp4 {\n    min-height: 9.8rem;\n    border: 0.12rem solid #d7e0f5;\n    border-radius: 0.75rem;\n    padding: 1rem;\n    color: #344473;\n    background: #eaf2ff;\n    font-size: 1.05rem;\n    font-weight: 600;\n    line-height: 1.45;\n    white-space: pre-wrap;\n}\n\n.dogoblock-web-app_detail-meta-bar_Wnt9Z {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: end;\n    -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n    gap: 1rem;\n    margin-top: 0.55rem;\n    color: #56648e;\n    font-weight: 700;\n}\n\n.dogoblock-web-app_details-lower-band_1Y7DY {\n    display: grid;\n    grid-template-columns: minmax(0, 1fr) minmax(16rem, 22rem);\n    gap: 2.5rem;\n    margin: 2rem calc((100vw - min(100vw, 79rem)) / -2) -3rem;\n    padding: 2.2rem max(1rem, calc((100vw - 79rem) / 2)) 3rem;\n    background: #eaf2ff;\n}\n\n.dogoblock-web-app_comment-composer_1fFS2 {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.65rem;\n    margin-top: 2rem;\n}\n\n.dogoblock-web-app_comment-avatar_AxAjx {\n    width: 2.5rem;\n    height: 2.5rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    border-radius: 0.65rem;\n    color: #ffffff;\n    background: #7e55d8;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 1rem;\n}\n\n.dogoblock-web-app_comment-composer_1fFS2 input {\n    width: min(100%, 28rem);\n    min-height: 2.55rem;\n    border: 0.12rem solid #d7e0f5;\n    border-radius: 0.55rem;\n    padding: 0 0.85rem;\n    color: #56648e;\n    background: #ffffff;\n    font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-weight: 800;\n}\n\n.dogoblock-web-app_empty-comment_1h0gb {\n    margin-top: 1rem;\n    color: #56648e;\n    font-weight: 700;\n}\n\n.dogoblock-web-app_section-title-row_2aVtI {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    gap: 0.75rem;\n}\n\n.dogoblock-web-app_section-title-row_2aVtI span {\n    color: #7e55d8;\n    font-weight: 800;\n}\n\n.dogoblock-web-app_remix-placeholder_1jarv {\n    height: 9.4rem;\n    overflow: hidden;\n    border: 0.18rem solid #c6d6ff;\n    border-radius: 0.65rem;\n    background: #d8e4ff;\n}\n\n.dogoblock-web-app_remix-placeholder_1jarv .dogoblock-web-app_project-thumbnail-image_2HJxW,\n.dogoblock-web-app_remix-placeholder_1jarv .dogoblock-web-app_project-thumbnail-fallback_18iRF {\n    width: 100%;\n    height: 100%;\n}\n\n.dogoblock-web-app_muted_1seQ1 {\n    color: #56648e;\n    font-size: 0.85rem;\n}\n\n.dogoblock-web-app_editor-shell_3Zz5e {\n    height: 100vh;\n}\n\n.dogoblock-web-app_hidden-input_2pI22 {\n    display: none;\n}\n\n.dogoblock-web-app_user-badge-button_2xFBg {\n    font-weight: 800;\n}\n\n.dogoblock-web-app_profile-page_2dR7P {\n    width: min(100% - 2rem, 78rem);\n    padding-top: 2rem;\n    padding-bottom: 3rem;\n}\n\n/* ── TOP ROW ─────────────────────────────────────── */\n\n.dogoblock-web-app_profile-top-row_2pjAA {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    gap: 1.2rem;\n    margin-bottom: 1.4rem;\n    -webkit-box-align: stretch;\n    -webkit-align-items: stretch;\n        -ms-flex-align: stretch;\n            align-items: stretch;\n}\n\n/* LEFT — user info card */\n\n.dogoblock-web-app_profile-info-card_3p37B {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    gap: 0;\n    padding: 0;\n    overflow: hidden;\n}\n\n.dogoblock-web-app_profile-info-header_9XpmA {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 1rem;\n    padding: 0.75rem 1.35rem;\n    background: #182b63;\n}\n\n.dogoblock-web-app_profile-info-body_3BmaB {\n    padding: 1.1rem 1.35rem 1.25rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n}\n\n.dogoblock-web-app_profile-avatar_r_K2L {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    width: 4.8rem;\n    height: 4.8rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    overflow: hidden;\n    border: 0.22rem solid #182b63;\n    border-radius: 0.85rem;\n    color: #ffffff;\n    background: #7e55d8;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 1.75rem;\n}\n\n.dogoblock-web-app_profile-avatar_r_K2L img {\n    width: 100%;\n    height: 100%;\n    display: block;\n    -o-object-fit: cover;\n       object-fit: cover;\n}\n\nh1.dogoblock-web-app_profile-name_xdCx7 {\n    margin: 0;\n    color: #ffffff;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 2rem;\n    font-weight: 400;\n    line-height: 1.1;\n    text-transform: uppercase;\n}\n\n.dogoblock-web-app_profile-name-stack_dupRO {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    gap: 0.2rem;\n}\n\n.dogoblock-web-app_profile-username_xpxIA {\n    color: #cacaca;\n    font-size: 0.82rem;\n    font-weight: 700;\n}\n\n.dogoblock-web-app_profile-section_3mhFz {\n    margin-bottom: 1.1rem;\n}\n\n.dogoblock-web-app_profile-section-title_23Dve {\n    margin: 0 0 0.4rem;\n    color: #243f8f;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 1.2rem;\n    font-weight: 400;\n}\n\n.dogoblock-web-app_profile-section-text_ay6bA {\n    margin: 0.45rem 0 0;\n    color: #344473;\n    font-size: 0.88rem;\n    font-weight: 600;\n    line-height: 1.6;\n}\n\n.dogoblock-web-app_profile-edit-button_2AMzd {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    gap: 0.4rem;\n    margin-top: auto;\n    padding: 0.55rem 1.2rem;\n    border: 0;\n    border-radius: 0.55rem;\n    background: #182b63;\n    color: #ffffff;\n    font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 0.78rem;\n    font-weight: 700;\n    cursor: pointer;\n    -webkit-transition: opacity 120ms ease;\n    -o-transition: opacity 120ms ease;\n    transition: opacity 120ms ease;\n}\n\n.dogoblock-web-app_profile-edit-button_2AMzd:hover {\n    opacity: 0.85;\n}\n\n/* RIGHT — featured project card */\n\n.dogoblock-web-app_profile-featured-card_2-syp {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    gap: 0;\n    padding: 0;\n    overflow: hidden;\n}\n\n.dogoblock-web-app_profile-featured-header_wo1pS {\n    padding: 0.6rem 1.5rem;\n    background: #182b63;\n    text-align: center;\n}\n\n.dogoblock-web-app_profile-featured-title_b9KMP {\n    margin: 0;\n    color: #ffffff;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 1.8rem;\n    font-weight: 400;\n    text-align: center;\n    text-transform: uppercase;\n    white-space: pre-line;\n    line-height: 1.3;\n    display: block;\n}\n\n.dogoblock-web-app_profile-featured-body_ylNPD {\n    padding: 1.1rem 1.35rem 1.2rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    gap: 0;\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n}\n\n.dogoblock-web-app_profile-featured-thumb_B6_VG {\n    display: block;\n    width: 100%;\n    aspect-ratio: 16 / 9;\n    overflow: hidden;\n    border-radius: 0.65rem;\n    border: 0;\n    padding: 0;\n    cursor: pointer;\n    background: #d8e4ff;\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n}\n\n.dogoblock-web-app_profile-featured-thumb_B6_VG img {\n    width: 100%;\n    height: 100%;\n    display: block;\n    -o-object-fit: cover;\n       object-fit: cover;\n    -webkit-transition: -webkit-transform 240ms ease;\n    transition: -webkit-transform 240ms ease;\n    -o-transition: transform 240ms ease;\n    transition: transform 240ms ease;\n    transition: transform 240ms ease, -webkit-transform 240ms ease;\n}\n\n.dogoblock-web-app_profile-featured-thumb_B6_VG:hover img {\n    -webkit-transform: scale(1.06);\n        -ms-transform: scale(1.06);\n            transform: scale(1.06);\n}\n\n.dogoblock-web-app_profile-featured-thumb_B6_VG > div {\n    width: 100%;\n    height: 100%;\n}\n\n.dogoblock-web-app_profile-featured-empty_2VneF {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    border-radius: 0.65rem;\n    background: #d8e4ff;\n    color: #56648e;\n    font-weight: 700;\n    font-size: 0.82rem;\n    padding: 2rem;\n    text-align: center;\n}\n\n.dogoblock-web-app_profile-featured-stats_2miVh {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 1.2rem;\n    margin-top: 0.85rem;\n}\n\n.dogoblock-web-app_profile-featured-stat_ylXqE {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.4rem;\n    color: #243f8f;\n    font-size: 1rem;\n    font-weight: 700;\n}\n\n/* ── SECTION BLOCKS (projects / favorites) ──────── */\n\n.dogoblock-web-app_profile-section-2_3aWOC {\n    border: 0.22rem solid #243f8f;\n    border-radius: 0.95rem;\n    padding: 0;\n    background: #ffffff;\n    -webkit-box-shadow: 0.35rem 0.45rem 0 #d8e4ff;\n            box-shadow: 0.35rem 0.45rem 0 #d8e4ff;\n    margin-bottom: 1.4rem;\n    overflow: hidden;\n}\n\n.dogoblock-web-app_profile-section-header_2CEuH {\n    margin: 0;\n    padding: 0.6rem 1.5rem;\n    background: #182b63;\n    text-align: center;\n}\n\n.dogoblock-web-app_profile-section-heading_2Axcz {\n    margin: 0;\n    color: #ffffff;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 1.15rem;\n    font-weight: 400;\n    text-align: center;\n    text-transform: uppercase;\n    display: block;\n}\n\n.dogoblock-web-app_profile-section-body_TwpfC {\n    padding: 1.25rem 1.35rem 1.5rem;\n}\n\n/* ── EDIT FORM ───────────────────────────────────── */\n\n.dogoblock-web-app_profile-form_3eCSN {\n    width: 100%;\n    margin-bottom: 1.4rem;\n}\n\n.dogoblock-web-app_profile-form-actions_1GpBH {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    gap: 0.65rem;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n}\n\n/* ── LOGOUT ROW ─────────────────────────────────── */\n\n.dogoblock-web-app_profile-logout-row_1H6A9 {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: end;\n    -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n    margin-top: 0.5rem;\n}\n\n/* Legacy classes kept for any remaining references */\n\n.dogoblock-web-app_profile-hero_3T3MG { display: none; }\n\n.dogoblock-web-app_profile-tabs_2hl_k { display: none; }\n\n.dogoblock-web-app_profile-tab_G5MbT { display: none; }\n\n.dogoblock-web-app_profile-tab-active_fjXNE { display: none; }\n\n.dogoblock-web-app_profile-grid_3XVac { display: none; }\n\n.dogoblock-web-app_profile-panel_1O9VV { display: none; }\n\n.dogoblock-web-app_profile-actions_1Jgif { display: none; }\n\n.dogoblock-web-app_profile-stats_2Y3vS { display: none; }\n\n@media (max-width: 900px) {\n    .dogoblock-web-app_topbar_3aLHW {\n        padding: 0.45rem 0;\n    }\n\n    .dogoblock-web-app_topbar-inner_1PVrq {\n        padding: 0 1rem;\n    }\n\n    .dogoblock-web-app_nav_5Hvdh {\n        gap: 0.75rem;\n        font-size: 0.72rem;\n    }\n\n    .dogoblock-web-app_hero_1xxqp {\n        grid-template-columns: 1fr;\n        gap: 1.5rem;\n    }\n\n    .dogoblock-web-app_hero-preview_SVneW {\n        -webkit-box-pack: start;\n        -webkit-justify-content: flex-start;\n            -ms-flex-pack: start;\n                justify-content: flex-start;\n    }\n\n    .dogoblock-web-app_details-header_3-XXe,\n    .dogoblock-web-app_details-main-grid_3v5Ue,\n    .dogoblock-web-app_details-lower-band_1Y7DY {\n        grid-template-columns: 1fr;\n    }\n\n    .dogoblock-web-app_details-header_3-XXe {\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n        -webkit-flex-direction: column;\n            -ms-flex-direction: column;\n                flex-direction: column;\n    }\n\n    .dogoblock-web-app_details-lower-band_1Y7DY {\n        margin-right: -1rem;\n        margin-left: -1rem;\n        padding-right: 1rem;\n        padding-left: 1rem;\n    }\n\n    .dogoblock-web-app_profile-top-row_2pjAA {\n        grid-template-columns: 1fr;\n    }\n}\n\n@media (max-width: 640px) {\n    .dogoblock-web-app_topbar_3aLHW {\n        padding: 0.75rem 0;\n    }\n\n    .dogoblock-web-app_topbar-inner_1PVrq {\n        -webkit-box-align: start;\n        -webkit-align-items: flex-start;\n            -ms-flex-align: start;\n                align-items: flex-start;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n        -webkit-flex-direction: column;\n            -ms-flex-direction: column;\n                flex-direction: column;\n        min-height: auto;\n        padding: 0 1rem;\n        gap: 1rem;\n    }\n\n    .dogoblock-web-app_nav_5Hvdh {\n        -webkit-box-pack: start;\n        -webkit-justify-content: flex-start;\n            -ms-flex-pack: start;\n                justify-content: flex-start;\n    }\n\n    .dogoblock-web-app_page_z_onn {\n        width: min(100% - 1.25rem, 74rem);\n        padding-top: 1.5rem;\n    }\n\n    .dogoblock-web-app_page-header_2q-ME {\n        -webkit-box-align: start;\n        -webkit-align-items: flex-start;\n            -ms-flex-align: start;\n                align-items: flex-start;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n        -webkit-flex-direction: column;\n            -ms-flex-direction: column;\n                flex-direction: column;\n    }\n\n    .dogoblock-web-app_project-grid_W2vKL {\n        grid-template-columns: repeat(auto-fill, minmax(12.5rem, 1fr));\n    }\n\n    .dogoblock-web-app_project-card_2NByI,\n    .dogoblock-web-app_project-card-wrap_3i3y1 {\n        width: 100%;\n    }\n\n    .dogoblock-web-app_details-title-area_2N4tl {\n        -webkit-box-align: start;\n        -webkit-align-items: flex-start;\n            -ms-flex-align: start;\n                align-items: flex-start;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n        -webkit-flex-direction: column;\n            -ms-flex-direction: column;\n                flex-direction: column;\n    }\n\n    .dogoblock-web-app_details-title-area_2N4tl h1 {\n        white-space: normal;\n    }\n\n    .dogoblock-web-app_detail-meta-bar_Wnt9Z {\n        -webkit-box-align: start;\n        -webkit-align-items: flex-start;\n            -ms-flex-align: start;\n                align-items: flex-start;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n        -webkit-flex-direction: column;\n            -ms-flex-direction: column;\n                flex-direction: column;\n    }\n\n    .dogoblock-web-app_profile-top-row_2pjAA {\n        grid-template-columns: 1fr;\n    }\n}\n\n/* ═══════════════════════════════════════════════════\n   NAVBAR — institutional links\n═══════════════════════════════════════════════════ */\n\n.dogoblock-web-app_nav-link_1wf1m {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.32rem;\n    border: 0;\n    padding: 0;\n    background: transparent;\n    color: #ffffff;\n    font: inherit;\n    font-size: 0.82rem;\n    font-weight: 700;\n    line-height: 1.2;\n    text-decoration: none;\n    cursor: pointer;\n    -webkit-transition: opacity 120ms ease;\n    -o-transition: opacity 120ms ease;\n    transition: opacity 120ms ease;\n}\n\n.dogoblock-web-app_nav-link_1wf1m:hover {\n    opacity: 0.8;\n}\n\n/* Botão \"</> Editor\" — borda amarela */\n\n.dogoblock-web-app_nav-btn-editor_kCCmG {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    min-height: 2rem;\n    padding: 0 1.1rem;\n    border: 0.14rem solid #FFB800;\n    border-radius: 999px;\n    background: transparent;\n    color: #FFB800;\n    font: inherit;\n    font-size: 0.78rem;\n    font-weight: 700;\n    cursor: pointer;\n    white-space: nowrap;\n    -webkit-transition: background 120ms ease, -webkit-transform 120ms ease;\n    transition: background 120ms ease, -webkit-transform 120ms ease;\n    -o-transition: background 120ms ease, transform 120ms ease;\n    transition: background 120ms ease, transform 120ms ease;\n    transition: background 120ms ease, transform 120ms ease, -webkit-transform 120ms ease;\n}\n\n.dogoblock-web-app_nav-btn-editor_kCCmG:hover {\n    background: rgba(255, 184, 0, 0.12);\n    -webkit-transform: translateY(-1px);\n        -ms-transform: translateY(-1px);\n            transform: translateY(-1px);\n}\n\n/* Botão \"Criar Conta\" — preenchido amarelo */\n\n.dogoblock-web-app_nav-btn-criar-conta_f8GdL {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    min-height: 2rem;\n    padding: 0 1.25rem;\n    border: 0;\n    border-radius: 999px;\n    background: #FFB800;\n    color: #182b63;\n    font: inherit;\n    font-size: 0.78rem;\n    font-weight: 800;\n    cursor: pointer;\n    white-space: nowrap;\n    -webkit-transition: -webkit-transform 120ms ease, -webkit-box-shadow 120ms ease;\n    transition: -webkit-transform 120ms ease, -webkit-box-shadow 120ms ease;\n    -o-transition: transform 120ms ease, box-shadow 120ms ease;\n    transition: transform 120ms ease, box-shadow 120ms ease;\n    transition: transform 120ms ease, box-shadow 120ms ease, -webkit-transform 120ms ease, -webkit-box-shadow 120ms ease;\n    -webkit-box-shadow: 0 0.18rem 0 #b87800;\n            box-shadow: 0 0.18rem 0 #b87800;\n}\n\n.dogoblock-web-app_nav-btn-criar-conta_f8GdL:hover {\n    -webkit-transform: translateY(-1px);\n        -ms-transform: translateY(-1px);\n            transform: translateY(-1px);\n    -webkit-box-shadow: 0 0.28rem 0 #b87800;\n            box-shadow: 0 0.28rem 0 #b87800;\n}\n\n.dogoblock-web-app_nav-btn-criar-conta_f8GdL:active {\n    -webkit-transform: translateY(1px);\n        -ms-transform: translateY(1px);\n            transform: translateY(1px);\n    -webkit-box-shadow: 0 0.06rem 0 #b87800;\n            box-shadow: 0 0.06rem 0 #b87800;\n}\n\n/* Botão username e Sair — estilo sutil */\n\n.dogoblock-web-app_nav-btn-user_2a2-x {\n    font-weight: 800;\n}\n\n.dogoblock-web-app_nav-btn-sair_2e95R {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.35rem;\n    min-height: 2.1rem;\n    padding: 0 1rem;\n    border: 0;\n    border-radius: 0.55rem;\n    background: #e02020;\n    color: #ffffff;\n    -webkit-box-shadow: 0 0.18rem 0 #971212;\n            box-shadow: 0 0.18rem 0 #971212;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 0.72rem;\n    font-weight: 400;\n    text-transform: uppercase;\n    cursor: pointer;\n    -webkit-transition: -webkit-transform 120ms ease, -webkit-box-shadow 120ms ease;\n    transition: -webkit-transform 120ms ease, -webkit-box-shadow 120ms ease;\n    -o-transition: transform 120ms ease, box-shadow 120ms ease;\n    transition: transform 120ms ease, box-shadow 120ms ease;\n    transition: transform 120ms ease, box-shadow 120ms ease, -webkit-transform 120ms ease, -webkit-box-shadow 120ms ease;\n}\n\n.dogoblock-web-app_nav-btn-sair_2e95R:hover {\n    -webkit-transform: translateY(-1px);\n        -ms-transform: translateY(-1px);\n            transform: translateY(-1px);\n    -webkit-box-shadow: 0 0.28rem 0 #971212;\n            box-shadow: 0 0.28rem 0 #971212;\n}\n\n.dogoblock-web-app_nav-btn-sair_2e95R:active {\n    -webkit-transform: translateY(1px);\n        -ms-transform: translateY(1px);\n            transform: translateY(1px);\n    -webkit-box-shadow: 0 0.06rem 0 #971212;\n            box-shadow: 0 0.06rem 0 #971212;\n}\n\n.dogoblock-web-app_nav-user-icon-btn_1M-Tc {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    width: 2.1rem;\n    height: 2.1rem;\n    border: 0;\n    border-radius: 50%;\n    background: rgba(255, 255, 255, 0.12);\n    color: #ffffff;\n    cursor: pointer;\n    -webkit-transition: background 150ms ease, -webkit-transform 120ms ease;\n    transition: background 150ms ease, -webkit-transform 120ms ease;\n    -o-transition: background 150ms ease, transform 120ms ease;\n    transition: background 150ms ease, transform 120ms ease;\n    transition: background 150ms ease, transform 120ms ease, -webkit-transform 120ms ease;\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n}\n\n.dogoblock-web-app_nav-user-icon-btn_1M-Tc:hover {\n    background: rgba(255, 255, 255, 0.25);\n    -webkit-transform: translateY(-1px);\n        -ms-transform: translateY(-1px);\n            transform: translateY(-1px);\n}\n\n.dogoblock-web-app_nav-user-icon-btn_1M-Tc:active {\n    background: rgba(255, 255, 255, 0.35);\n    -webkit-transform: translateY(1px);\n        -ms-transform: translateY(1px);\n            transform: translateY(1px);\n}\n\n/* ═══════════════════════════════════════════════════\n   HOME PAGE — full-width layout\n═══════════════════════════════════════════════════ */\n\n.dogoblock-web-app_home-page_4fkF1 {\n    width: 100%;\n    padding: 0;\n}\n\n/* ── HERO ──────────────────────────────────────────── */\n\n.dogoblock-web-app_hero-section_kEmie {\n    position: relative;\n    overflow: hidden;\n    background-color: #182b63;\n    background-image: url(" + escape(__webpack_require__(2063)) + ");\n    background-repeat: no-repeat;\n    background-position: center center;\n    background-size: cover;\n}\n\n.dogoblock-web-app_hero-inner_1BSXF {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    width: 100%;\n    padding: 0;\n    margin: 0 auto;\n    min-height: 25rem;\n    position: relative;\n    z-index: 2;\n}\n\n.dogoblock-web-app_hero-copy-new_1-NFP {\n    padding: 3rem 1rem 3rem max(1rem, calc((100% - 80rem) / 2));\n    max-width: none;\n    position: relative;\n    z-index: 2;\n}\n\n.dogoblock-web-app_hero-title_3vzv9 {\n    margin: 0;\n    color: #ffffff;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: clamp(1.8rem, 3vw, 3.2rem);\n    font-weight: 400;\n    line-height: 1.12;\n    text-transform: uppercase;\n}\n\n.dogoblock-web-app_hero-accent_fT7jP {\n    color: #FC0006;\n}\n\n.dogoblock-web-app_hero-actions-new_3rUsr {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n    gap: 0.75rem;\n    margin-top: 2rem;\n}\n\n.dogoblock-web-app_hero-btn-primary_1OBbc {\n    min-height: 2.4rem;\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    padding: 0 1.4rem;\n    border: 0;\n    border-radius: 0.4rem;\n    background: #e02020;\n    color: #ffffff;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 0.68rem;\n    text-transform: uppercase;\n    cursor: pointer;\n    -webkit-box-shadow: 0 0.22rem 0 #9e0f0f;\n            box-shadow: 0 0.22rem 0 #9e0f0f;\n    -webkit-transition: -webkit-transform 120ms ease, -webkit-box-shadow 120ms ease;\n    transition: -webkit-transform 120ms ease, -webkit-box-shadow 120ms ease;\n    -o-transition: transform 120ms ease, box-shadow 120ms ease;\n    transition: transform 120ms ease, box-shadow 120ms ease;\n    transition: transform 120ms ease, box-shadow 120ms ease, -webkit-transform 120ms ease, -webkit-box-shadow 120ms ease;\n}\n\n.dogoblock-web-app_hero-btn-primary_1OBbc:hover {\n    -webkit-transform: translateY(-2px);\n        -ms-transform: translateY(-2px);\n            transform: translateY(-2px);\n    -webkit-box-shadow: 0 0.35rem 0 #9e0f0f;\n            box-shadow: 0 0.35rem 0 #9e0f0f;\n}\n\n.dogoblock-web-app_hero-btn-primary_1OBbc:active {\n    -webkit-transform: translateY(1px);\n        -ms-transform: translateY(1px);\n            transform: translateY(1px);\n    -webkit-box-shadow: 0 0.1rem 0 #9e0f0f;\n            box-shadow: 0 0.1rem 0 #9e0f0f;\n}\n\n.dogoblock-web-app_hero-btn-outline_344fC {\n    min-height: 2.4rem;\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    padding: 0 1.4rem;\n    border: 0.16rem solid #ffffff;\n    border-radius: 0.4rem;\n    background: transparent;\n    color: #ffffff;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 0.68rem;\n    text-transform: uppercase;\n    cursor: pointer;\n    -webkit-transition: background 120ms ease, -webkit-transform 120ms ease;\n    transition: background 120ms ease, -webkit-transform 120ms ease;\n    -o-transition: transform 120ms ease, background 120ms ease;\n    transition: transform 120ms ease, background 120ms ease;\n    transition: transform 120ms ease, background 120ms ease, -webkit-transform 120ms ease;\n}\n\n.dogoblock-web-app_hero-btn-outline_344fC:hover {\n    -webkit-transform: translateY(-2px);\n        -ms-transform: translateY(-2px);\n            transform: translateY(-2px);\n    background: rgba(255, 255, 255, 0.1);\n}\n\n.dogoblock-web-app_hero-btn-outline_344fC:active {\n    -webkit-transform: translateY(1px);\n        -ms-transform: translateY(1px);\n            transform: translateY(1px);\n}\n\n.dogoblock-web-app_hero-illustration_Xpfzt {\n    position: absolute;\n    right: 0;\n    bottom: 0;\n    height: 100%;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: end;\n    -webkit-align-items: flex-end;\n        -ms-flex-align: end;\n            align-items: flex-end;\n    -webkit-box-pack: end;\n    -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n    z-index: 1;\n    pointer-events: none;\n}\n\n.dogoblock-web-app_hero-illustration_Xpfzt img {\n    display: block;\n    width: auto;\n    height: 100%;\n    max-height: 25rem;\n    -o-object-fit: contain;\n       object-fit: contain;\n    -o-object-position: bottom right;\n       object-position: bottom right;\n}\n\n/* ── PROJETOS EM DESTAQUE ──────────────────────────── */\n\n.dogoblock-web-app_featured-section_3NRT3 {\n    padding: 5rem 0 5rem;\n    width: min(100% - 2rem, 80rem);\n    margin: 0 auto;\n}\n\n.dogoblock-web-app_featured-title_tVGCx {\n    margin: 0 0 1.8rem;\n    color: #182b63;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 1.6rem;\n    font-weight: 400;\n    text-align: center;\n    text-transform: uppercase;\n}\n\n.dogoblock-web-app_featured-empty_2RA0I {\n    color: #56648e;\n    text-align: center;\n    font-weight: 700;\n    padding: 2rem 0;\n}\n\n.dogoblock-web-app_featured-grid_3At29 {\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    gap: 1.1rem;\n}\n\n.dogoblock-web-app_featured-card_3hVgO {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    border: 0.3rem solid #182b63;\n    border-radius: 0.85rem;\n    overflow: hidden;\n    background: #1a3aad;\n    color: #ffffff;\n    text-align: left;\n    cursor: pointer;\n    padding: 0;\n    -webkit-box-shadow: 0 0.18rem 0 rgba(24, 43, 99, 0.35);\n            box-shadow: 0 0.18rem 0 rgba(24, 43, 99, 0.35);\n    -webkit-transition: -webkit-transform 130ms ease, -webkit-box-shadow 130ms ease;\n    transition: -webkit-transform 130ms ease, -webkit-box-shadow 130ms ease;\n    -o-transition: transform 130ms ease, box-shadow 130ms ease;\n    transition: transform 130ms ease, box-shadow 130ms ease;\n    transition: transform 130ms ease, box-shadow 130ms ease, -webkit-transform 130ms ease, -webkit-box-shadow 130ms ease;\n}\n\n.dogoblock-web-app_featured-card_3hVgO:hover {\n    -webkit-transform: translateY(-4px);\n        -ms-transform: translateY(-4px);\n            transform: translateY(-4px);\n    -webkit-box-shadow: 0 8px 20px rgba(24, 43, 99, 0.28);\n            box-shadow: 0 8px 20px rgba(24, 43, 99, 0.28);\n}\n\n.dogoblock-web-app_featured-card_3hVgO:active {\n    -webkit-transform: translateY(0);\n        -ms-transform: translateY(0);\n            transform: translateY(0);\n}\n\n.dogoblock-web-app_featured-thumbnail_1W30t {\n    height: 9rem;\n    overflow: hidden;\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n}\n\n.dogoblock-web-app_featured-thumbnail_1W30t img {\n    width: 100%;\n    height: 100%;\n    -o-object-fit: cover;\n       object-fit: cover;\n    display: block;\n}\n\n.dogoblock-web-app_featured-thumbnail_1W30t>div {\n    width: 100%;\n    height: 100%;\n}\n\n.dogoblock-web-app_featured-card-body_3t-kX {\n    padding: 0.6rem 0.7rem 0.75rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    gap: 0.18rem;\n}\n\n.dogoblock-web-app_featured-card-title_2I_HI {\n    display: block;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 0.8rem;\n    font-weight: 400;\n    color: #ffffff;\n    white-space: nowrap;\n    overflow: hidden;\n    -o-text-overflow: ellipsis;\n       text-overflow: ellipsis;\n}\n\n.dogoblock-web-app_featured-card-author_fatHU {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.28rem;\n    font-size: 0.6rem;\n    font-weight: 800;\n    color: rgba(255, 255, 255, 0.75);\n}\n\n.dogoblock-web-app_featured-card-author_fatHU::before {\n    content: \"\";\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    width: 0.52rem;\n    height: 0.52rem;\n    border-radius: 999px;\n    border: 0.1rem solid rgba(255, 255, 255, 0.65);\n}\n\n/* ═══════════════════════════════════════════════════\n   SITE FOOTER\n═══════════════════════════════════════════════════ */\n\n.dogoblock-web-app_site-footer_1iprI {\n    margin-top: auto;\n    background: #182b63;\n    color: #ffffff;\n}\n\n.dogoblock-web-app_footer-inner_2qcat {\n    display: grid;\n    grid-template-columns: auto 1fr 1fr 1.4fr;\n    gap: 2.5rem;\n    -webkit-box-align: start;\n    -webkit-align-items: start;\n        -ms-flex-align: start;\n            align-items: start;\n    width: min(100% - 2rem, 80rem);\n    margin: 0 auto;\n    padding: 3rem 0 2.5rem;\n}\n\n.dogoblock-web-app_footer-brand_Gbx7N {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n}\n\n.dogoblock-web-app_footer-logo_1Vta7 {\n    width: 10rem;\n    height: auto;\n    display: block;\n}\n\n.dogoblock-web-app_footer-links_2GnH_,\n.dogoblock-web-app_footer-lei_2aRPq,\n.dogoblock-web-app_footer-contact_kixSb {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    gap: 0.5rem;\n    font-size: 0.78rem;\n}\n\n.dogoblock-web-app_footer-links_2GnH_ strong,\n.dogoblock-web-app_footer-lei_2aRPq strong,\n.dogoblock-web-app_footer-contact_kixSb strong {\n    display: block;\n    margin-bottom: 0.35rem;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 0.8rem;\n    font-weight: 400;\n    letter-spacing: 0.02em;\n    color: #ffffff;\n}\n\n.dogoblock-web-app_footer-links_2GnH_ a,\n.dogoblock-web-app_footer-lei_2aRPq a {\n    color: rgba(255, 255, 255, 0.75);\n    text-decoration: none;\n    font-weight: 600;\n    line-height: 1.4;\n    -webkit-transition: color 120ms ease;\n    -o-transition: color 120ms ease;\n    transition: color 120ms ease;\n}\n\n.dogoblock-web-app_footer-links_2GnH_ a:hover,\n.dogoblock-web-app_footer-lei_2aRPq a:hover {\n    color: #ffffff;\n    text-decoration: underline;\n}\n\n.dogoblock-web-app_footer-contact_kixSb span {\n    color: rgba(255, 255, 255, 0.75);\n    font-weight: 600;\n    line-height: 1.5;\n}\n\n.dogoblock-web-app_footer-bottom_18YbC {\n    border-top: 1px solid rgba(255, 255, 255, 0.1);\n    text-align: center;\n    padding: 1.1rem 1rem;\n    font-size: 0.68rem;\n    font-weight: 700;\n    color: rgba(255, 255, 255, 0.45);\n    letter-spacing: 0.03em;\n}\n\n/* ── HOME RESPONSIVE ─────────────────────────────── */\n\n@media (max-width: 960px) {\n    .dogoblock-web-app_hero-inner_1BSXF {\n        grid-template-columns: 1fr;\n        min-height: auto;\n    }\n\n    .dogoblock-web-app_hero-copy-new_1-NFP {\n        padding-bottom: 0;\n    }\n\n    .dogoblock-web-app_hero-illustration_Xpfzt {\n        max-width: 55%;\n        margin: 0 auto;\n        padding-top: 1.5rem;\n    }\n\n    .dogoblock-web-app_featured-grid_3At29 {\n        grid-template-columns: repeat(2, 1fr);\n    }\n\n    .dogoblock-web-app_footer-inner_2qcat {\n        grid-template-columns: 1fr 1fr;\n        gap: 2rem;\n    }\n\n    .dogoblock-web-app_footer-brand_Gbx7N {\n        grid-column: 1 / -1;\n    }\n\n    .dogoblock-web-app_footer-lei_2aRPq {\n        grid-column: auto;\n    }\n}\n\n@media (max-width: 620px) {\n    .dogoblock-web-app_hero-title_3vzv9 {\n        font-size: clamp(1.6rem, 6vw, 2.2rem);\n    }\n\n    .dogoblock-web-app_hero-illustration_Xpfzt {\n        max-width: 80%;\n    }\n\n    .dogoblock-web-app_featured-grid_3At29 {\n        grid-template-columns: repeat(2, 1fr);\n        gap: 0.75rem;\n    }\n\n    .dogoblock-web-app_footer-inner_2qcat {\n        grid-template-columns: 1fr;\n    }\n}\n\n/* ═══════════════════════════════════════════════════\n   PROJECT DETAILS PAGE — wireframe-faithful layout\n═══════════════════════════════════════════════════ */\n\n/* Page wrapper */\n\n.dogoblock-web-app_pd-page_KaiaO {\n    width: min(100% - 2rem, 78rem);\n    margin: 0 auto;\n    padding: 1.8rem 0 3.5rem;\n    font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n}\n\n.dogoblock-web-app_pd-loading_2yBGM {\n    color: #56648e;\n    font-weight: 700;\n    margin-bottom: 1rem;\n}\n\n/* ── HEADER ─────────────────────────────────────── */\n\n.dogoblock-web-app_pd-header_15sVF {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    gap: 1.5rem;\n    margin-bottom: 1.5rem;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n}\n\n.dogoblock-web-app_pd-header-left_Ywyhv {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 1rem;\n    min-width: 0;\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n}\n\n/* Project thumbnail in header */\n\n.dogoblock-web-app_pd-thumb-box_2-Fq4 {\n    position: relative;\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    width: 5rem;\n    height: 5rem;\n    border: 0.18rem solid #c6d6ff;\n    border-radius: 0.75rem;\n    overflow: hidden;\n    background: #d8e4ff;\n}\n\n.dogoblock-web-app_pd-thumb-img_1KW1w {\n    width: 100%;\n    height: 100%;\n    display: block;\n    -o-object-fit: cover;\n       object-fit: cover;\n}\n\n.dogoblock-web-app_pd-thumb-fallback_tB_L1 {\n    width: 100%;\n    height: 100%;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    background: -o-linear-gradient(315deg, #bcc8dd 0 45%, #7e8da8 46% 100%);\n    background: linear-gradient(135deg, #bcc8dd 0 45%, #7e8da8 46% 100%);\n}\n\n.dogoblock-web-app_pd-thumb-fallback_tB_L1 span {\n    color: #d800ff;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 1rem;\n    text-shadow: 0.06rem 0.06rem 0 #182b63;\n}\n\n.dogoblock-web-app_pd-title-group_15Btu {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    gap: 0.15rem;\n    min-width: 0;\n}\n\n.dogoblock-web-app_pd-title_3OX_1 {\n    margin: 0;\n    color: #182b63;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: clamp(1.3rem, 3vw, 2.2rem);\n    font-weight: 400;\n    line-height: 1.1;\n    white-space: nowrap;\n    overflow: hidden;\n    -o-text-overflow: ellipsis;\n       text-overflow: ellipsis;\n}\n\n.dogoblock-web-app_pd-author_3AAnG,\n.dogoblock-web-app_pd-date_cKn04 {\n    margin: 0;\n    color: #56648e;\n    font-size: 0.82rem;\n    font-weight: 600;\n}\n\n/* Right action buttons */\n\n.dogoblock-web-app_pd-header-actions_2py2D {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-align: stretch;\n    -webkit-align-items: stretch;\n        -ms-flex-align: stretch;\n            align-items: stretch;\n    gap: 0.55rem;\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n}\n\n.dogoblock-web-app_pd-btn-visibility_1jaCu {\n    min-width: 8rem;\n    min-height: 2rem;\n    padding: 0.35rem 0.8rem;\n    border: 0.12rem solid #c6d6ff;\n    border-radius: 0.45rem;\n    background: #f0f4ff;\n    color: #243f8f;\n    font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 0.72rem;\n    font-weight: 700;\n    text-align: center;\n    cursor: pointer;\n    -webkit-transition: background 120ms ease;\n    -o-transition: background 120ms ease;\n    transition: background 120ms ease;\n}\n\n.dogoblock-web-app_pd-btn-visibility_1jaCu:hover:not(:disabled) {\n    background: #dde6ff;\n}\n\n.dogoblock-web-app_pd-btn-visibility_1jaCu:disabled {\n    opacity: 0.75;\n    cursor: default;\n}\n\n.dogoblock-web-app_pd-btn-delete_eb3sI {\n    min-width: 8rem;\n    min-height: 2rem;\n    padding: 0.35rem 0.8rem;\n    border: 0.12rem solid #ffc5c5;\n    border-radius: 0.45rem;\n    background: #fff0f0;\n    color: #c02020;\n    font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 0.72rem;\n    font-weight: 700;\n    text-align: center;\n    cursor: pointer;\n    -webkit-transition: background 120ms ease;\n    -o-transition: background 120ms ease;\n    transition: background 120ms ease;\n}\n\n.dogoblock-web-app_pd-btn-delete_eb3sI:hover {\n    background: #ffdede;\n}\n\n/* ── MAIN GRID ───────────────────────────────────── */\n\n.dogoblock-web-app_pd-main-grid_FNx8H {\n    display: grid;\n    grid-template-columns: minmax(0, 1.65fr) minmax(0, 1fr);\n    gap: 1.5rem;\n    -webkit-box-align: start;\n    -webkit-align-items: start;\n        -ms-flex-align: start;\n            align-items: start;\n    margin-bottom: 2rem;\n}\n\n/* LEFT COLUMN — player */\n\n.dogoblock-web-app_pd-player-col_BxfGo {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    gap: 0;\n    border: 0.14rem solid #c6d6ff;\n    border-radius: 0.75rem;\n    overflow: hidden;\n    background: #ffffff;\n}\n\n/* Toolbar bar */\n\n.dogoblock-web-app_pd-toolbar_3dhry {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    padding: 0.35rem 0.65rem;\n    background: #f5f7ff;\n    border-bottom: 0.12rem solid #e0e7ff;\n}\n\n.dogoblock-web-app_pd-toolbar-flags_TXL2k {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.45rem;\n}\n\n.dogoblock-web-app_pd-flag-green_1Yb_a,\n.dogoblock-web-app_pd-flag-red_OuNdy {\n    display: inline-block;\n    width: 0.85rem;\n    height: 0.85rem;\n    border-radius: 999px;\n    cursor: pointer;\n}\n\n.dogoblock-web-app_pd-flag-green_1Yb_a {\n    background: #22b455;\n    -webkit-box-shadow: 0 0 0 0.1rem #178a3e;\n            box-shadow: 0 0 0 0.1rem #178a3e;\n}\n\n.dogoblock-web-app_pd-flag-red_OuNdy {\n    background: #e83030;\n    -webkit-box-shadow: 0 0 0 0.1rem #b51616;\n            box-shadow: 0 0 0 0.1rem #b51616;\n}\n\n.dogoblock-web-app_pd-toolbar-right_1SdU2 {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.5rem;\n}\n\n.dogoblock-web-app_pd-bar-icon_3WJm_ {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    color: #56648e;\n    font-size: 0.7rem;\n    cursor: pointer;\n    opacity: 0.7;\n    -webkit-transition: opacity 120ms ease;\n    -o-transition: opacity 120ms ease;\n    transition: opacity 120ms ease;\n}\n\n.dogoblock-web-app_pd-bar-icon_3WJm_:hover {\n    opacity: 1;\n}\n\n/* Stage */\n\n.dogoblock-web-app_pd-stage_2YPmb {\n    width: 100%;\n    min-height: 21rem;\n    background: #f0f4ff;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    overflow: hidden;\n    position: relative;\n}\n\n.dogoblock-web-app_pd-stage_2YPmb [class*=\"stage-wrapper_stage-wrapper\"] {\n    margin: 0 auto;\n}\n\n/* Stats + \"Ver por dentro\" row */\n\n.dogoblock-web-app_pd-stats-row_3md3- {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    gap: 1rem;\n    padding: 0.65rem 0.85rem;\n    background: #ffffff;\n    border-top: 0.12rem solid #e0e7ff;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n}\n\n.dogoblock-web-app_pd-stats_32ety {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 1.1rem;\n}\n\n.dogoblock-web-app_pd-stat_a_ebm {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.35rem;\n    color: #344473;\n    font-size: 0.92rem;\n    font-weight: 700;\n}\n\n.dogoblock-web-app_pd-btn-see-inside_1mD05 {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.4rem;\n    min-height: 2.1rem;\n    padding: 0 1.1rem;\n    border: 0.12rem solid #c6d6ff;\n    border-radius: 0.45rem;\n    background: #f0f4ff;\n    color: #243f8f;\n    font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 0.78rem;\n    font-weight: 700;\n    cursor: pointer;\n    -webkit-transition: background 120ms ease, -webkit-transform 120ms ease;\n    transition: background 120ms ease, -webkit-transform 120ms ease;\n    -o-transition: background 120ms ease, transform 120ms ease;\n    transition: background 120ms ease, transform 120ms ease;\n    transition: background 120ms ease, transform 120ms ease, -webkit-transform 120ms ease;\n}\n\n.dogoblock-web-app_pd-btn-see-inside_1mD05:hover {\n    background: #dde6ff;\n    -webkit-transform: translateY(-1px);\n        -ms-transform: translateY(-1px);\n            transform: translateY(-1px);\n}\n\n.dogoblock-web-app_pd-btn-see-inside_1mD05:active {\n    -webkit-transform: translateY(0);\n        -ms-transform: translateY(0);\n            transform: translateY(0);\n}\n\n/* RIGHT COLUMN — info textareas */\n\n.dogoblock-web-app_pd-info-col_28UnO {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    gap: 1rem;\n}\n\n.dogoblock-web-app_pd-info-section_5wpZ9 {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    gap: 0.35rem;\n}\n\n.dogoblock-web-app_pd-info-label_3e4_s {\n    color: #243f8f;\n    font-size: 0.82rem;\n    font-weight: 800;\n}\n\n.dogoblock-web-app_pd-info-textarea_1VRTO {\n    width: 100%;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    min-height: 8rem;\n    padding: 0.65rem 0.75rem;\n    border: 0.12rem solid #c6d6ff;\n    border-radius: 0.55rem;\n    background: #f5f7ff;\n    color: #344473;\n    font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 0.88rem;\n    font-weight: 600;\n    line-height: 1.5;\n    resize: vertical;\n    outline: none;\n    -webkit-transition: border-color 120ms ease, -webkit-box-shadow 120ms ease;\n    transition: border-color 120ms ease, -webkit-box-shadow 120ms ease;\n    -o-transition: border-color 120ms ease, box-shadow 120ms ease;\n    transition: border-color 120ms ease, box-shadow 120ms ease;\n    transition: border-color 120ms ease, box-shadow 120ms ease, -webkit-box-shadow 120ms ease;\n}\n\n.dogoblock-web-app_pd-info-textarea_1VRTO:focus {\n    border-color: #243f8f;\n    -webkit-box-shadow: 0 0 0 0.14rem rgba(36, 63, 143, 0.12);\n            box-shadow: 0 0 0 0.14rem rgba(36, 63, 143, 0.12);\n    background: #ffffff;\n}\n\n.dogoblock-web-app_pd-info-textarea_1VRTO[readonly] {\n    background: #eaf0fa;\n    color: #56648e;\n    cursor: default;\n}\n\n/* ── COMMENTS SECTION ────────────────────────────── */\n\n.dogoblock-web-app_pd-comments_3XlQU {\n    padding-top: 0.5rem;\n}\n\n.dogoblock-web-app_pd-comments-title_1bOdq {\n    margin: 0 0 0.85rem;\n    color: #182b63;\n    font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 1.05rem;\n    font-weight: 800;\n}\n\n.dogoblock-web-app_pd-comment-composer_3lF9C {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    gap: 0.75rem;\n}\n\n.dogoblock-web-app_pd-comment-avatar_32eUa {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    width: 2.8rem;\n    height: 2.8rem;\n    border: 0.14rem solid #c6d6ff;\n    border-radius: 0.65rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    background: #d8e4ff;\n    color: #56648e;\n}\n\n.dogoblock-web-app_pd-comment-input-wrap_NelRJ {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    gap: 0.55rem;\n}\n\n.dogoblock-web-app_pd-comment-input_3zPZo {\n    width: 100%;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    min-height: 4rem;\n    padding: 0.65rem 0.85rem;\n    border: 0.12rem solid #c6d6ff;\n    border-radius: 0.55rem;\n    background: #f5f7ff;\n    color: #344473;\n    font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 0.9rem;\n    font-weight: 600;\n    line-height: 1.4;\n    resize: vertical;\n    outline: none;\n    -webkit-transition: border-color 120ms ease, -webkit-box-shadow 120ms ease;\n    transition: border-color 120ms ease, -webkit-box-shadow 120ms ease;\n    -o-transition: border-color 120ms ease, box-shadow 120ms ease;\n    transition: border-color 120ms ease, box-shadow 120ms ease;\n    transition: border-color 120ms ease, box-shadow 120ms ease, -webkit-box-shadow 120ms ease;\n}\n\n.dogoblock-web-app_pd-comment-input_3zPZo::-webkit-input-placeholder {\n    color: #8d9ec4;\n    font-weight: 500;\n}\n\n.dogoblock-web-app_pd-comment-input_3zPZo::-moz-placeholder {\n    color: #8d9ec4;\n    font-weight: 500;\n}\n\n.dogoblock-web-app_pd-comment-input_3zPZo:-ms-input-placeholder {\n    color: #8d9ec4;\n    font-weight: 500;\n}\n\n.dogoblock-web-app_pd-comment-input_3zPZo::-ms-input-placeholder {\n    color: #8d9ec4;\n    font-weight: 500;\n}\n\n.dogoblock-web-app_pd-comment-input_3zPZo::placeholder {\n    color: #8d9ec4;\n    font-weight: 500;\n}\n\n.dogoblock-web-app_pd-comment-input_3zPZo:focus {\n    border-color: #243f8f;\n    -webkit-box-shadow: 0 0 0 0.14rem rgba(36, 63, 143, 0.12);\n            box-shadow: 0 0 0 0.14rem rgba(36, 63, 143, 0.12);\n    background: #ffffff;\n}\n\n.dogoblock-web-app_pd-comment-actions_2XheL {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.5rem;\n}\n\n.dogoblock-web-app_pd-btn-publish_1qnjo,\n.dogoblock-web-app_pd-btn-cancel_3KsTS {\n    min-height: 1.75rem;\n    padding: 0 0.85rem;\n    border-radius: 0.35rem;\n    border: 0;\n    font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 0.72rem;\n    font-weight: 700;\n    cursor: pointer;\n    -webkit-transition: background 120ms ease, -webkit-transform 120ms ease;\n    transition: background 120ms ease, -webkit-transform 120ms ease;\n    -o-transition: background 120ms ease, transform 120ms ease;\n    transition: background 120ms ease, transform 120ms ease;\n    transition: background 120ms ease, transform 120ms ease, -webkit-transform 120ms ease;\n}\n\n.dogoblock-web-app_pd-btn-publish_1qnjo {\n    background: #c6d6ff;\n    color: #182b63;\n}\n\n.dogoblock-web-app_pd-btn-publish_1qnjo:hover {\n    background: #b0c2f5;\n    -webkit-transform: translateY(-1px);\n        -ms-transform: translateY(-1px);\n            transform: translateY(-1px);\n}\n\n.dogoblock-web-app_pd-btn-cancel_3KsTS {\n    background: #e8ecf5;\n    color: #56648e;\n}\n\n.dogoblock-web-app_pd-btn-cancel_3KsTS:hover {\n    background: #d7dff0;\n    -webkit-transform: translateY(-1px);\n        -ms-transform: translateY(-1px);\n            transform: translateY(-1px);\n}\n\n/* Responsive — single column on smaller screens */\n\n@media (max-width: 860px) {\n    .dogoblock-web-app_pd-main-grid_FNx8H {\n        grid-template-columns: 1fr;\n    }\n\n    .dogoblock-web-app_pd-header_15sVF {\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n        -webkit-flex-direction: column;\n            -ms-flex-direction: column;\n                flex-direction: column;\n    }\n\n    .dogoblock-web-app_pd-header-actions_2py2D {\n        -webkit-box-orient: horizontal;\n        -webkit-box-direction: normal;\n        -webkit-flex-direction: row;\n            -ms-flex-direction: row;\n                flex-direction: row;\n        -webkit-flex-wrap: wrap;\n            -ms-flex-wrap: wrap;\n                flex-wrap: wrap;\n        width: 100%;\n    }\n\n    .dogoblock-web-app_pd-btn-visibility-public_1XRR_,\n    .dogoblock-web-app_pd-btn-visibility-private_2D01B,\n    .dogoblock-web-app_pd-btn-delete_eb3sI {\n        -webkit-box-flex: 1;\n        -webkit-flex: 1;\n            -ms-flex: 1;\n                flex: 1;\n    }\n}\n\n/* ── Visibility badge / button — state-based colours ── */\n\n.dogoblock-web-app_pd-btn-visibility-public_1XRR_,\n.dogoblock-web-app_pd-btn-visibility-private_2D01B {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    min-width: 8rem;\n    min-height: 2rem;\n    padding: 0.35rem 0.9rem;\n    border-radius: 0.45rem;\n    font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 0.72rem;\n    font-weight: 700;\n    text-align: center;\n    cursor: pointer;\n    -webkit-transition: background 120ms ease, -webkit-transform 120ms ease;\n    transition: background 120ms ease, -webkit-transform 120ms ease;\n    -o-transition: background 120ms ease, transform 120ms ease;\n    transition: background 120ms ease, transform 120ms ease;\n    transition: background 120ms ease, transform 120ms ease, -webkit-transform 120ms ease;\n    border: 0;\n}\n\n.dogoblock-web-app_pd-btn-visibility-public_1XRR_ {\n    background: #22b455;\n    color: #ffffff;\n    -webkit-box-shadow: 0 0.18rem 0 #178a3e;\n            box-shadow: 0 0.18rem 0 #178a3e;\n}\n\n.dogoblock-web-app_pd-btn-visibility-public_1XRR_:hover {\n    background: #1da04c;\n    -webkit-transform: translateY(-1px);\n        -ms-transform: translateY(-1px);\n            transform: translateY(-1px);\n}\n\n.dogoblock-web-app_pd-btn-visibility-private_2D01B {\n    background: #e02020;\n    color: #ffffff;\n    -webkit-box-shadow: 0 0.18rem 0 #971212;\n            box-shadow: 0 0.18rem 0 #971212;\n}\n\n.dogoblock-web-app_pd-btn-visibility-private_2D01B:hover {\n    background: #c41a1a;\n    -webkit-transform: translateY(-1px);\n        -ms-transform: translateY(-1px);\n            transform: translateY(-1px);\n}\n\n/* span version (non-owner, not clickable) */\n\nspan.dogoblock-web-app_pd-btn-visibility-public_1XRR_,\nspan.dogoblock-web-app_pd-btn-visibility-private_2D01B {\n    cursor: default;\n    pointer-events: none;\n    opacity: 0.85;\n}\n\n/* ── Interactive stat buttons (like / fav) ── */\n\n.dogoblock-web-app_pd-stat-btn_2G3OI,\n.dogoblock-web-app_pd-stat-btn-active-like_2k0RH,\n.dogoblock-web-app_pd-stat-btn-active-fav_34SY0 {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.35rem;\n    padding: 0.3rem 0.65rem;\n    border: 0.12rem solid transparent;\n    border-radius: 999px;\n    font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 0.88rem;\n    font-weight: 700;\n    cursor: pointer;\n    -webkit-transition: background 120ms ease, color 120ms ease, -webkit-transform 100ms ease;\n    transition: background 120ms ease, color 120ms ease, -webkit-transform 100ms ease;\n    -o-transition: background 120ms ease, color 120ms ease, transform 100ms ease;\n    transition: background 120ms ease, color 120ms ease, transform 100ms ease;\n    transition: background 120ms ease, color 120ms ease, transform 100ms ease, -webkit-transform 100ms ease;\n    background: transparent;\n    color: #344473;\n}\n\n.dogoblock-web-app_pd-stat-btn_2G3OI:hover {\n    background: #eaf0fa;\n    -webkit-transform: scale(1.06);\n        -ms-transform: scale(1.06);\n            transform: scale(1.06);\n}\n\n.dogoblock-web-app_pd-stat-btn-active-like_2k0RH {\n    color: #e02020;\n    background: #ffeaea;\n    border-color: #ffc5c5;\n}\n\n.dogoblock-web-app_pd-stat-btn-active-like_2k0RH:hover {\n    background: #ffd6d6;\n    -webkit-transform: scale(1.06);\n        -ms-transform: scale(1.06);\n            transform: scale(1.06);\n}\n\n.dogoblock-web-app_pd-stat-btn-active-fav_34SY0 {\n    color: #d69800;\n    background: #fff8e5;\n    border-color: #ffe699;\n}\n\n.dogoblock-web-app_pd-stat-btn-active-fav_34SY0:hover {\n    background: #fff2cc;\n    -webkit-transform: scale(1.06);\n        -ms-transform: scale(1.06);\n            transform: scale(1.06);\n}\n\n/* ── Thumbnail overlay (change cover) ── */\n\n.dogoblock-web-app_pd-thumb-overlay_1FiyH {\n    position: absolute;\n    inset: 0;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    border-radius: 0.75rem;\n    background: rgba(0, 0, 0, 0.45);\n    color: #ffffff;\n    opacity: 0;\n    cursor: pointer;\n    -webkit-transition: opacity 160ms ease;\n    -o-transition: opacity 160ms ease;\n    transition: opacity 160ms ease;\n}\n\n.dogoblock-web-app_pd-thumb-box_2-Fq4:hover .dogoblock-web-app_pd-thumb-overlay_1FiyH {\n    opacity: 1;\n}\n\n/* ── Save details button ── */\n\n.dogoblock-web-app_pd-btn-save-details_RNirf,\n.dogoblock-web-app_pd-btn-save-details-done_k0fD4 {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.4rem;\n    min-height: 2.1rem;\n    padding: 0 1.1rem;\n    border: 0;\n    border-radius: 0.45rem;\n    font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 0.78rem;\n    font-weight: 700;\n    cursor: pointer;\n    -webkit-transition: background 120ms ease, -webkit-transform 120ms ease;\n    transition: background 120ms ease, -webkit-transform 120ms ease;\n    -o-transition: background 120ms ease, transform 120ms ease;\n    transition: background 120ms ease, transform 120ms ease;\n    transition: background 120ms ease, transform 120ms ease, -webkit-transform 120ms ease;\n    -webkit-align-self: flex-start;\n        -ms-flex-item-align: start;\n            align-self: flex-start;\n    margin-top: 0.35rem;\n}\n\n.dogoblock-web-app_pd-btn-save-details_RNirf {\n    background: #243f8f;\n    color: #ffffff;\n    -webkit-box-shadow: 0 0.18rem 0 #182b63;\n            box-shadow: 0 0.18rem 0 #182b63;\n}\n\n.dogoblock-web-app_pd-btn-save-details_RNirf:hover:not(:disabled) {\n    background: #1b3070;\n    -webkit-transform: translateY(-1px);\n        -ms-transform: translateY(-1px);\n            transform: translateY(-1px);\n}\n\n.dogoblock-web-app_pd-btn-save-details_RNirf:disabled {\n    opacity: 0.65;\n    cursor: default;\n}\n\n.dogoblock-web-app_pd-btn-save-details-done_k0fD4 {\n    background: #22b455;\n    color: #ffffff;\n    -webkit-box-shadow: 0 0.18rem 0 #178a3e;\n            box-shadow: 0 0.18rem 0 #178a3e;\n}\n\n/* ── Comment avatar initials ── */\n\n.dogoblock-web-app_pd-comment-avatar-initials_1IO8e {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    width: 100%;\n    height: 100%;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 0.9rem;\n    color: #56648e;\n}\n\n/* ── Comment list ── */\n\n.dogoblock-web-app_pd-comment-list_27QY8 {\n    list-style: none;\n    margin: 1rem 0 0;\n    padding: 0;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    gap: 0.75rem;\n}\n\n.dogoblock-web-app_pd-comment-item_9DLQt {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    gap: 0.65rem;\n    padding: 0.75rem 0.9rem;\n    border: 0.12rem solid #e0e7ff;\n    border-radius: 0.65rem;\n    background: #f9fbff;\n    position: relative;\n}\n\n.dogoblock-web-app_pd-comment-item-avatar_3j-Br {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    width: 2rem;\n    height: 2rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    color: #8d9ec4;\n}\n\n.dogoblock-web-app_pd-comment-item-body_3-T6S {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    min-width: 0;\n}\n\n.dogoblock-web-app_pd-comment-item-author_1pVLK {\n    display: block;\n    font-size: 0.9rem;\n    font-weight: 800;\n    color: #243f8f;\n    margin-bottom: 0.25rem;\n}\n\n.dogoblock-web-app_pd-comment-item-author-link_39xdr {\n    display: block;\n    border: none;\n    background: transparent;\n    padding: 0;\n    font-family: inherit;\n    font-size: 0.9rem;\n    font-weight: 800;\n    color: #243f8f;\n    margin-bottom: 0.25rem;\n    cursor: pointer;\n    text-align: left;\n    text-decoration: underline;\n    text-underline-offset: 2px;\n    -webkit-text-decoration-color: transparent;\n            text-decoration-color: transparent;\n    -webkit-transition: color 0.15s ease, -webkit-text-decoration-color 0.15s ease;\n    transition: color 0.15s ease, -webkit-text-decoration-color 0.15s ease;\n    -o-transition: text-decoration-color 0.15s ease, color 0.15s ease;\n    transition: text-decoration-color 0.15s ease, color 0.15s ease;\n    transition: text-decoration-color 0.15s ease, color 0.15s ease, -webkit-text-decoration-color 0.15s ease;\n}\n\n.dogoblock-web-app_pd-comment-item-author-link_39xdr:hover {\n    color: #7e55d8;\n    -webkit-text-decoration-color: #7e55d8;\n            text-decoration-color: #7e55d8;\n}\n\n.dogoblock-web-app_pd-comment-item-text_1Ll3B {\n    margin: 0;\n    font-size: 0.88rem;\n    font-weight: 600;\n    color: #344473;\n    line-height: 1.5;\n    word-break: break-word;\n}\n\n.dogoblock-web-app_pd-comment-item-delete_kSpog {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    width: 1.6rem;\n    height: 1.6rem;\n    border: 0;\n    border-radius: 0.35rem;\n    background: transparent;\n    color: #aab0c4;\n    cursor: pointer;\n    -webkit-transition: background 120ms ease, color 120ms ease;\n    -o-transition: background 120ms ease, color 120ms ease;\n    transition: background 120ms ease, color 120ms ease;\n}\n\n.dogoblock-web-app_pd-comment-item-delete_kSpog:hover {\n    background: #ffe7e7;\n    color: #e02020;\n}\n\n.dogoblock-web-app_pd-comment-empty_1I3-k {\n    margin: 1rem 0 0;\n    color: #8d9ec4;\n    font-size: 0.85rem;\n    font-weight: 600;\n}\n\n/* ── Publish button disabled state ── */\n\n.dogoblock-web-app_pd-btn-publish_1qnjo:disabled {\n    opacity: 0.55;\n    cursor: default;\n}\n\n/* ── Reply button (inline, below comment text) ── */\n\n.dogoblock-web-app_pd-comment-reply-btn_3Lyzg {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.28rem;\n    margin-top: 0.4rem;\n    padding: 0.18rem 0.55rem;\n    border: 0.1rem solid #c6d6ff;\n    border-radius: 999px;\n    background: transparent;\n    color: #56648e;\n    font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 0.8rem;\n    font-weight: 700;\n    cursor: pointer;\n    -webkit-transition: background 120ms ease, color 120ms ease, -webkit-transform 100ms ease;\n    transition: background 120ms ease, color 120ms ease, -webkit-transform 100ms ease;\n    -o-transition: background 120ms ease, color 120ms ease, transform 100ms ease;\n    transition: background 120ms ease, color 120ms ease, transform 100ms ease;\n    transition: background 120ms ease, color 120ms ease, transform 100ms ease, -webkit-transform 100ms ease;\n}\n\n.dogoblock-web-app_pd-comment-reply-btn_3Lyzg:hover {\n    background: #e8f0ff;\n    color: #182b63;\n    -webkit-transform: translateY(-1px);\n        -ms-transform: translateY(-1px);\n            transform: translateY(-1px);\n}\n\n/* ── Inline reply composer ── */\n\n.dogoblock-web-app_pd-reply-composer_1PY6w {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    gap: 0.55rem;\n    margin-top: 0.65rem;\n    padding: 0.65rem 0.75rem;\n    background: #f0f5ff;\n    border: 0.1rem solid #c6d6ff;\n    border-radius: 0.55rem;\n    -webkit-animation: dogoblock-web-app_replyFadeIn_flhdW 160ms ease;\n            animation: dogoblock-web-app_replyFadeIn_flhdW 160ms ease;\n}\n\n@-webkit-keyframes dogoblock-web-app_replyFadeIn_flhdW {\n    from { opacity: 0; -webkit-transform: translateY(-4px); transform: translateY(-4px); }\n    to   { opacity: 1; -webkit-transform: translateY(0); transform: translateY(0); }\n}\n\n@keyframes dogoblock-web-app_replyFadeIn_flhdW {\n    from { opacity: 0; -webkit-transform: translateY(-4px); transform: translateY(-4px); }\n    to   { opacity: 1; -webkit-transform: translateY(0); transform: translateY(0); }\n}\n\n/* ── Threaded replies list ── */\n\n.dogoblock-web-app_pd-reply-list_1RzXI {\n    list-style: none;\n    margin: 0.65rem 0 0 2.2rem;\n    padding: 0;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    gap: 0.45rem;\n    border-left: 0.22rem solid #c6d6ff;\n    padding-left: 0.75rem;\n}\n\n.dogoblock-web-app_pd-reply-item_2r86P {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    gap: 0.5rem;\n    padding: 0.5rem 0.7rem;\n    border: 0.1rem solid #e8eeff;\n    border-radius: 0.5rem;\n    background: #ffffff;\n    position: relative;\n}\n\n/* ── Toast container ─────────────────────────────────────────────────────── */\n\n.dogoblock-web-app_toast-container_3681H {\n    position: fixed;\n    bottom: 1.5rem;\n    right: 1.5rem;\n    z-index: 9999;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: reverse;\n    -webkit-flex-direction: column-reverse;\n        -ms-flex-direction: column-reverse;\n            flex-direction: column-reverse;\n    gap: 0.5rem;\n    pointer-events: none;\n}\n\n.dogoblock-web-app_toast-container_3681H > * {\n    pointer-events: auto;\n}\n\n@media (max-width: 48rem) {\n    .dogoblock-web-app_toast-container_3681H {\n        bottom: 1rem;\n        right: 0.75rem;\n        left: 0.75rem;\n    }\n}\n\n/* ─── Forgot Password & Public Profile Styles ──────────────────────────────── */\n\n.dogoblock-web-app_forgot-password-row_2uwgY {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: end;\n    -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n    margin: -0.35rem 0 0.85rem;\n}\n\n.dogoblock-web-app_success-box_3icZ5 {\n    padding: 1rem;\n    border-radius: 0.55rem;\n    background: #e8f5e9;\n    color: #2e7d32;\n    font-weight: 700;\n    font-size: 0.95rem;\n    line-height: 1.4;\n    text-align: center;\n}\n\n.dogoblock-web-app_author-link_PZTpH {\n    border: none;\n    background: transparent;\n    padding: 0;\n    color: inherit;\n    font: inherit;\n    font-weight: 800;\n    cursor: pointer;\n    text-decoration: underline;\n    text-underline-offset: 2px;\n}\n\n.dogoblock-web-app_author-link_PZTpH:hover {\n    color: #243f8f;\n}\n\n.dogoblock-web-app_public-profile-page_1Cr0u {\n    max-width: 64rem;\n}\n\n.dogoblock-web-app_public-profile-header_1LMjz {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    gap: 1.75rem;\n    margin-bottom: 2rem;\n    padding: 2rem;\n}\n\n.dogoblock-web-app_public-profile-avatar_3QxQA {\n    width: 6.5rem;\n    height: 6.5rem;\n    border-radius: 50%;\n    background: #243f8f;\n    color: #ffffff;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 2.2rem;\n    overflow: hidden;\n    -webkit-flex-shrink: 0;\n        -ms-flex-negative: 0;\n            flex-shrink: 0;\n    -webkit-box-shadow: 0 0.4rem 0 #182b63;\n            box-shadow: 0 0.4rem 0 #182b63;\n}\n\n.dogoblock-web-app_public-profile-avatar_3QxQA img {\n    width: 100%;\n    height: 100%;\n    -o-object-fit: cover;\n       object-fit: cover;\n}\n\n.dogoblock-web-app_public-profile-info_1DbDk {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    gap: 0.4rem;\n    -webkit-box-flex: 1;\n    -webkit-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n}\n\n.dogoblock-web-app_public-profile-name_2MKE8 {\n    margin: 0;\n    font-size: 1.8rem;\n    color: #243f8f;\n    line-height: 1.1;\n}\n\n.dogoblock-web-app_public-profile-username_987Nm {\n    font-size: 1.05rem;\n    font-weight: 800;\n    color: #7e55d8;\n}\n\n.dogoblock-web-app_public-profile-bio_1_c2s {\n    margin: 0.5rem 0 0;\n    color: #344473;\n    font-size: 0.98rem;\n    line-height: 1.5;\n    font-weight: 600;\n}\n\n.dogoblock-web-app_public-profile-working_Od1ZL {\n    margin: 0.25rem 0 0;\n    color: #56648e;\n    font-size: 0.9rem;\n}\n\n.dogoblock-web-app_public-profile-stats_CkAnG {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    gap: 1.5rem;\n    margin-top: 0.85rem;\n    padding-top: 0.85rem;\n    border-top: 1px solid #e0e7ff;\n}\n\n.dogoblock-web-app_public-profile-stat_2cnC- {\n    font-size: 0.92rem;\n    color: #344473;\n    font-weight: 700;\n}\n\n.dogoblock-web-app_public-profile-stat_2cnC- strong {\n    color: #243f8f;\n    font-size: 1.15rem;\n}\n", ""]);

// exports
exports.locals = {
	"app-shell": "dogoblock-web-app_app-shell_2PA39",
	"appShell": "dogoblock-web-app_app-shell_2PA39",
	"topbar": "dogoblock-web-app_topbar_3aLHW",
	"topbar-inner": "dogoblock-web-app_topbar-inner_1PVrq",
	"topbarInner": "dogoblock-web-app_topbar-inner_1PVrq",
	"brand": "dogoblock-web-app_brand_25VAQ",
	"logo": "dogoblock-web-app_logo_2DRMj",
	"nav-center": "dogoblock-web-app_nav-center_23sFd",
	"navCenter": "dogoblock-web-app_nav-center_23sFd",
	"nav-right": "dogoblock-web-app_nav-right_1hx6M",
	"navRight": "dogoblock-web-app_nav-right_1hx6M",
	"nav-button": "dogoblock-web-app_nav-button_1dItK",
	"navButton": "dogoblock-web-app_nav-button_1dItK",
	"inline-button": "dogoblock-web-app_inline-button_wEmD4",
	"inlineButton": "dogoblock-web-app_inline-button_wEmD4",
	"nav-icon": "dogoblock-web-app_nav-icon_27ZE8",
	"navIcon": "dogoblock-web-app_nav-icon_27ZE8",
	"icon-wrap": "dogoblock-web-app_icon-wrap_sITAL",
	"iconWrap": "dogoblock-web-app_icon-wrap_sITAL",
	"inline-icon": "dogoblock-web-app_inline-icon_3pGo_",
	"inlineIcon": "dogoblock-web-app_inline-icon_3pGo_",
	"user-badge": "dogoblock-web-app_user-badge_38q0T",
	"userBadge": "dogoblock-web-app_user-badge_38q0T",
	"page": "dogoblock-web-app_page_z_onn",
	"home-page": "dogoblock-web-app_home-page_4fkF1",
	"homePage": "dogoblock-web-app_home-page_4fkF1",
	"hero": "dogoblock-web-app_hero_1xxqp",
	"hero-copy": "dogoblock-web-app_hero-copy_156mN",
	"heroCopy": "dogoblock-web-app_hero-copy_156mN",
	"kicker": "dogoblock-web-app_kicker_1y7vH",
	"page-header": "dogoblock-web-app_page-header_2q-ME",
	"pageHeader": "dogoblock-web-app_page-header_2q-ME",
	"panel": "dogoblock-web-app_panel_Q0s02",
	"hero-text": "dogoblock-web-app_hero-text_2OLVS",
	"heroText": "dogoblock-web-app_hero-text_2OLVS",
	"hero-actions": "dogoblock-web-app_hero-actions_2Mbfc",
	"heroActions": "dogoblock-web-app_hero-actions_2Mbfc",
	"actions": "dogoblock-web-app_actions_XinWC",
	"hero-preview": "dogoblock-web-app_hero-preview_SVneW",
	"heroPreview": "dogoblock-web-app_hero-preview_SVneW",
	"preview-card": "dogoblock-web-app_preview-card_vDMIu",
	"previewCard": "dogoblock-web-app_preview-card_vDMIu",
	"preview-window": "dogoblock-web-app_preview-window_3Grs6",
	"previewWindow": "dogoblock-web-app_preview-window_3Grs6",
	"narrow-page": "dogoblock-web-app_narrow-page_186pT",
	"narrowPage": "dogoblock-web-app_narrow-page_186pT",
	"auth-section": "dogoblock-web-app_auth-section_2gv_4",
	"authSection": "dogoblock-web-app_auth-section_2gv_4",
	"auth-card-wrap": "dogoblock-web-app_auth-card-wrap_JtkmG",
	"authCardWrap": "dogoblock-web-app_auth-card-wrap_JtkmG",
	"search-bar": "dogoblock-web-app_search-bar_2Winb",
	"searchBar": "dogoblock-web-app_search-bar_2Winb",
	"search-icon": "dogoblock-web-app_search-icon_1Qs5C",
	"searchIcon": "dogoblock-web-app_search-icon_1Qs5C",
	"search-input": "dogoblock-web-app_search-input_3D28S",
	"searchInput": "dogoblock-web-app_search-input_3D28S",
	"primary-button": "dogoblock-web-app_primary-button_J8O77",
	"primaryButton": "dogoblock-web-app_primary-button_J8O77",
	"secondary-button": "dogoblock-web-app_secondary-button_1TFxG",
	"secondaryButton": "dogoblock-web-app_secondary-button_1TFxG",
	"danger-button": "dogoblock-web-app_danger-button_1pdOP",
	"dangerButton": "dogoblock-web-app_danger-button_1pdOP",
	"light-button": "dogoblock-web-app_light-button_KaXx_",
	"lightButton": "dogoblock-web-app_light-button_KaXx_",
	"project-card": "dogoblock-web-app_project-card_2NByI",
	"projectCard": "dogoblock-web-app_project-card_2NByI",
	"field": "dogoblock-web-app_field_VXAJd",
	"form-hint": "dogoblock-web-app_form-hint_1ve3y",
	"formHint": "dogoblock-web-app_form-hint_1ve3y",
	"error": "dogoblock-web-app_error_3uIrk",
	"project-grid": "dogoblock-web-app_project-grid_W2vKL",
	"projectGrid": "dogoblock-web-app_project-grid_W2vKL",
	"project-card-wrap": "dogoblock-web-app_project-card-wrap_3i3y1",
	"projectCardWrap": "dogoblock-web-app_project-card-wrap_3i3y1",
	"project-delete-button": "dogoblock-web-app_project-delete-button_1ypDz",
	"projectDeleteButton": "dogoblock-web-app_project-delete-button_1ypDz",
	"project-thumbnail": "dogoblock-web-app_project-thumbnail_26w0a",
	"projectThumbnail": "dogoblock-web-app_project-thumbnail_26w0a",
	"project-thumbnail-image": "dogoblock-web-app_project-thumbnail-image_2HJxW",
	"projectThumbnailImage": "dogoblock-web-app_project-thumbnail-image_2HJxW",
	"project-thumbnail-fallback": "dogoblock-web-app_project-thumbnail-fallback_18iRF",
	"projectThumbnailFallback": "dogoblock-web-app_project-thumbnail-fallback_18iRF",
	"project-title": "dogoblock-web-app_project-title_1UyeV",
	"projectTitle": "dogoblock-web-app_project-title_1UyeV",
	"project-meta": "dogoblock-web-app_project-meta_p_s94",
	"projectMeta": "dogoblock-web-app_project-meta_p_s94",
	"card-body": "dogoblock-web-app_card-body_2RDB_",
	"cardBody": "dogoblock-web-app_card-body_2RDB_",
	"featured-card": "dogoblock-web-app_featured-card_3hVgO",
	"featuredCard": "dogoblock-web-app_featured-card_3hVgO",
	"card-avatar-col": "dogoblock-web-app_card-avatar-col_GPjdL",
	"cardAvatarCol": "dogoblock-web-app_card-avatar-col_GPjdL",
	"card-avatar-icon": "dogoblock-web-app_card-avatar-icon_2H8lk",
	"cardAvatarIcon": "dogoblock-web-app_card-avatar-icon_2H8lk",
	"card-info-col": "dogoblock-web-app_card-info-col_3pwGi",
	"cardInfoCol": "dogoblock-web-app_card-info-col_3pwGi",
	"card-title": "dogoblock-web-app_card-title_1OH15",
	"cardTitle": "dogoblock-web-app_card-title_1OH15",
	"card-author": "dogoblock-web-app_card-author_1lvNV",
	"cardAuthor": "dogoblock-web-app_card-author_1lvNV",
	"empty-state": "dogoblock-web-app_empty-state_oJImC",
	"emptyState": "dogoblock-web-app_empty-state_oJImC",
	"project-details-page": "dogoblock-web-app_project-details-page_HYCVs",
	"projectDetailsPage": "dogoblock-web-app_project-details-page_HYCVs",
	"details-header": "dogoblock-web-app_details-header_3-XXe",
	"detailsHeader": "dogoblock-web-app_details-header_3-XXe",
	"details-title-area": "dogoblock-web-app_details-title-area_2N4tl",
	"detailsTitleArea": "dogoblock-web-app_details-title-area_2N4tl",
	"details-avatar": "dogoblock-web-app_details-avatar_eht0D",
	"detailsAvatar": "dogoblock-web-app_details-avatar_eht0D",
	"details-main-grid": "dogoblock-web-app_details-main-grid_3v5Ue",
	"detailsMainGrid": "dogoblock-web-app_details-main-grid_3v5Ue",
	"details-player-column": "dogoblock-web-app_details-player-column_boimX",
	"detailsPlayerColumn": "dogoblock-web-app_details-player-column_boimX",
	"detail-stage-player": "dogoblock-web-app_detail-stage-player_1iQg7",
	"detailStagePlayer": "dogoblock-web-app_detail-stage-player_1iQg7",
	"detail-stats": "dogoblock-web-app_detail-stats_favx8",
	"detailStats": "dogoblock-web-app_detail-stats_favx8",
	"details-info-column": "dogoblock-web-app_details-info-column_JMmlU",
	"detailsInfoColumn": "dogoblock-web-app_details-info-column_JMmlU",
	"detail-text-section": "dogoblock-web-app_detail-text-section_2cGjb",
	"detailTextSection": "dogoblock-web-app_detail-text-section_2cGjb",
	"comments-section": "dogoblock-web-app_comments-section_3ZgUT",
	"commentsSection": "dogoblock-web-app_comments-section_3ZgUT",
	"remix-section": "dogoblock-web-app_remix-section_1yYhw",
	"remixSection": "dogoblock-web-app_remix-section_1yYhw",
	"detail-text-box": "dogoblock-web-app_detail-text-box_2PJp4",
	"detailTextBox": "dogoblock-web-app_detail-text-box_2PJp4",
	"detail-meta-bar": "dogoblock-web-app_detail-meta-bar_Wnt9Z",
	"detailMetaBar": "dogoblock-web-app_detail-meta-bar_Wnt9Z",
	"details-lower-band": "dogoblock-web-app_details-lower-band_1Y7DY",
	"detailsLowerBand": "dogoblock-web-app_details-lower-band_1Y7DY",
	"comment-composer": "dogoblock-web-app_comment-composer_1fFS2",
	"commentComposer": "dogoblock-web-app_comment-composer_1fFS2",
	"comment-avatar": "dogoblock-web-app_comment-avatar_AxAjx",
	"commentAvatar": "dogoblock-web-app_comment-avatar_AxAjx",
	"empty-comment": "dogoblock-web-app_empty-comment_1h0gb",
	"emptyComment": "dogoblock-web-app_empty-comment_1h0gb",
	"section-title-row": "dogoblock-web-app_section-title-row_2aVtI",
	"sectionTitleRow": "dogoblock-web-app_section-title-row_2aVtI",
	"remix-placeholder": "dogoblock-web-app_remix-placeholder_1jarv",
	"remixPlaceholder": "dogoblock-web-app_remix-placeholder_1jarv",
	"muted": "dogoblock-web-app_muted_1seQ1",
	"editor-shell": "dogoblock-web-app_editor-shell_3Zz5e",
	"editorShell": "dogoblock-web-app_editor-shell_3Zz5e",
	"hidden-input": "dogoblock-web-app_hidden-input_2pI22",
	"hiddenInput": "dogoblock-web-app_hidden-input_2pI22",
	"user-badge-button": "dogoblock-web-app_user-badge-button_2xFBg",
	"userBadgeButton": "dogoblock-web-app_user-badge-button_2xFBg",
	"profile-page": "dogoblock-web-app_profile-page_2dR7P",
	"profilePage": "dogoblock-web-app_profile-page_2dR7P",
	"profile-top-row": "dogoblock-web-app_profile-top-row_2pjAA",
	"profileTopRow": "dogoblock-web-app_profile-top-row_2pjAA",
	"profile-info-card": "dogoblock-web-app_profile-info-card_3p37B",
	"profileInfoCard": "dogoblock-web-app_profile-info-card_3p37B",
	"profile-info-header": "dogoblock-web-app_profile-info-header_9XpmA",
	"profileInfoHeader": "dogoblock-web-app_profile-info-header_9XpmA",
	"profile-info-body": "dogoblock-web-app_profile-info-body_3BmaB",
	"profileInfoBody": "dogoblock-web-app_profile-info-body_3BmaB",
	"profile-avatar": "dogoblock-web-app_profile-avatar_r_K2L",
	"profileAvatar": "dogoblock-web-app_profile-avatar_r_K2L",
	"profile-name": "dogoblock-web-app_profile-name_xdCx7",
	"profileName": "dogoblock-web-app_profile-name_xdCx7",
	"profile-name-stack": "dogoblock-web-app_profile-name-stack_dupRO",
	"profileNameStack": "dogoblock-web-app_profile-name-stack_dupRO",
	"profile-username": "dogoblock-web-app_profile-username_xpxIA",
	"profileUsername": "dogoblock-web-app_profile-username_xpxIA",
	"profile-section": "dogoblock-web-app_profile-section_3mhFz",
	"profileSection": "dogoblock-web-app_profile-section_3mhFz",
	"profile-section-title": "dogoblock-web-app_profile-section-title_23Dve",
	"profileSectionTitle": "dogoblock-web-app_profile-section-title_23Dve",
	"profile-section-text": "dogoblock-web-app_profile-section-text_ay6bA",
	"profileSectionText": "dogoblock-web-app_profile-section-text_ay6bA",
	"profile-edit-button": "dogoblock-web-app_profile-edit-button_2AMzd",
	"profileEditButton": "dogoblock-web-app_profile-edit-button_2AMzd",
	"profile-featured-card": "dogoblock-web-app_profile-featured-card_2-syp",
	"profileFeaturedCard": "dogoblock-web-app_profile-featured-card_2-syp",
	"profile-featured-header": "dogoblock-web-app_profile-featured-header_wo1pS",
	"profileFeaturedHeader": "dogoblock-web-app_profile-featured-header_wo1pS",
	"profile-featured-title": "dogoblock-web-app_profile-featured-title_b9KMP",
	"profileFeaturedTitle": "dogoblock-web-app_profile-featured-title_b9KMP",
	"profile-featured-body": "dogoblock-web-app_profile-featured-body_ylNPD",
	"profileFeaturedBody": "dogoblock-web-app_profile-featured-body_ylNPD",
	"profile-featured-thumb": "dogoblock-web-app_profile-featured-thumb_B6_VG",
	"profileFeaturedThumb": "dogoblock-web-app_profile-featured-thumb_B6_VG",
	"profile-featured-empty": "dogoblock-web-app_profile-featured-empty_2VneF",
	"profileFeaturedEmpty": "dogoblock-web-app_profile-featured-empty_2VneF",
	"profile-featured-stats": "dogoblock-web-app_profile-featured-stats_2miVh",
	"profileFeaturedStats": "dogoblock-web-app_profile-featured-stats_2miVh",
	"profile-featured-stat": "dogoblock-web-app_profile-featured-stat_ylXqE",
	"profileFeaturedStat": "dogoblock-web-app_profile-featured-stat_ylXqE",
	"profile-section-2": "dogoblock-web-app_profile-section-2_3aWOC",
	"profileSection2": "dogoblock-web-app_profile-section-2_3aWOC",
	"profile-section-header": "dogoblock-web-app_profile-section-header_2CEuH",
	"profileSectionHeader": "dogoblock-web-app_profile-section-header_2CEuH",
	"profile-section-heading": "dogoblock-web-app_profile-section-heading_2Axcz",
	"profileSectionHeading": "dogoblock-web-app_profile-section-heading_2Axcz",
	"profile-section-body": "dogoblock-web-app_profile-section-body_TwpfC",
	"profileSectionBody": "dogoblock-web-app_profile-section-body_TwpfC",
	"profile-form": "dogoblock-web-app_profile-form_3eCSN",
	"profileForm": "dogoblock-web-app_profile-form_3eCSN",
	"profile-form-actions": "dogoblock-web-app_profile-form-actions_1GpBH",
	"profileFormActions": "dogoblock-web-app_profile-form-actions_1GpBH",
	"profile-logout-row": "dogoblock-web-app_profile-logout-row_1H6A9",
	"profileLogoutRow": "dogoblock-web-app_profile-logout-row_1H6A9",
	"profile-hero": "dogoblock-web-app_profile-hero_3T3MG",
	"profileHero": "dogoblock-web-app_profile-hero_3T3MG",
	"profile-tabs": "dogoblock-web-app_profile-tabs_2hl_k",
	"profileTabs": "dogoblock-web-app_profile-tabs_2hl_k",
	"profile-tab": "dogoblock-web-app_profile-tab_G5MbT",
	"profileTab": "dogoblock-web-app_profile-tab_G5MbT",
	"profile-tab-active": "dogoblock-web-app_profile-tab-active_fjXNE",
	"profileTabActive": "dogoblock-web-app_profile-tab-active_fjXNE",
	"profile-grid": "dogoblock-web-app_profile-grid_3XVac",
	"profileGrid": "dogoblock-web-app_profile-grid_3XVac",
	"profile-panel": "dogoblock-web-app_profile-panel_1O9VV",
	"profilePanel": "dogoblock-web-app_profile-panel_1O9VV",
	"profile-actions": "dogoblock-web-app_profile-actions_1Jgif",
	"profileActions": "dogoblock-web-app_profile-actions_1Jgif",
	"profile-stats": "dogoblock-web-app_profile-stats_2Y3vS",
	"profileStats": "dogoblock-web-app_profile-stats_2Y3vS",
	"nav": "dogoblock-web-app_nav_5Hvdh",
	"nav-link": "dogoblock-web-app_nav-link_1wf1m",
	"navLink": "dogoblock-web-app_nav-link_1wf1m",
	"nav-btn-editor": "dogoblock-web-app_nav-btn-editor_kCCmG",
	"navBtnEditor": "dogoblock-web-app_nav-btn-editor_kCCmG",
	"nav-btn-criar-conta": "dogoblock-web-app_nav-btn-criar-conta_f8GdL",
	"navBtnCriarConta": "dogoblock-web-app_nav-btn-criar-conta_f8GdL",
	"nav-btn-user": "dogoblock-web-app_nav-btn-user_2a2-x",
	"navBtnUser": "dogoblock-web-app_nav-btn-user_2a2-x",
	"nav-btn-sair": "dogoblock-web-app_nav-btn-sair_2e95R",
	"navBtnSair": "dogoblock-web-app_nav-btn-sair_2e95R",
	"nav-user-icon-btn": "dogoblock-web-app_nav-user-icon-btn_1M-Tc",
	"navUserIconBtn": "dogoblock-web-app_nav-user-icon-btn_1M-Tc",
	"hero-section": "dogoblock-web-app_hero-section_kEmie",
	"heroSection": "dogoblock-web-app_hero-section_kEmie",
	"hero-inner": "dogoblock-web-app_hero-inner_1BSXF",
	"heroInner": "dogoblock-web-app_hero-inner_1BSXF",
	"hero-copy-new": "dogoblock-web-app_hero-copy-new_1-NFP",
	"heroCopyNew": "dogoblock-web-app_hero-copy-new_1-NFP",
	"hero-title": "dogoblock-web-app_hero-title_3vzv9",
	"heroTitle": "dogoblock-web-app_hero-title_3vzv9",
	"hero-accent": "dogoblock-web-app_hero-accent_fT7jP",
	"heroAccent": "dogoblock-web-app_hero-accent_fT7jP",
	"hero-actions-new": "dogoblock-web-app_hero-actions-new_3rUsr",
	"heroActionsNew": "dogoblock-web-app_hero-actions-new_3rUsr",
	"hero-btn-primary": "dogoblock-web-app_hero-btn-primary_1OBbc",
	"heroBtnPrimary": "dogoblock-web-app_hero-btn-primary_1OBbc",
	"hero-btn-outline": "dogoblock-web-app_hero-btn-outline_344fC",
	"heroBtnOutline": "dogoblock-web-app_hero-btn-outline_344fC",
	"hero-illustration": "dogoblock-web-app_hero-illustration_Xpfzt",
	"heroIllustration": "dogoblock-web-app_hero-illustration_Xpfzt",
	"featured-section": "dogoblock-web-app_featured-section_3NRT3",
	"featuredSection": "dogoblock-web-app_featured-section_3NRT3",
	"featured-title": "dogoblock-web-app_featured-title_tVGCx",
	"featuredTitle": "dogoblock-web-app_featured-title_tVGCx",
	"featured-empty": "dogoblock-web-app_featured-empty_2RA0I",
	"featuredEmpty": "dogoblock-web-app_featured-empty_2RA0I",
	"featured-grid": "dogoblock-web-app_featured-grid_3At29",
	"featuredGrid": "dogoblock-web-app_featured-grid_3At29",
	"featured-thumbnail": "dogoblock-web-app_featured-thumbnail_1W30t",
	"featuredThumbnail": "dogoblock-web-app_featured-thumbnail_1W30t",
	"featured-card-body": "dogoblock-web-app_featured-card-body_3t-kX",
	"featuredCardBody": "dogoblock-web-app_featured-card-body_3t-kX",
	"featured-card-title": "dogoblock-web-app_featured-card-title_2I_HI",
	"featuredCardTitle": "dogoblock-web-app_featured-card-title_2I_HI",
	"featured-card-author": "dogoblock-web-app_featured-card-author_fatHU",
	"featuredCardAuthor": "dogoblock-web-app_featured-card-author_fatHU",
	"site-footer": "dogoblock-web-app_site-footer_1iprI",
	"siteFooter": "dogoblock-web-app_site-footer_1iprI",
	"footer-inner": "dogoblock-web-app_footer-inner_2qcat",
	"footerInner": "dogoblock-web-app_footer-inner_2qcat",
	"footer-brand": "dogoblock-web-app_footer-brand_Gbx7N",
	"footerBrand": "dogoblock-web-app_footer-brand_Gbx7N",
	"footer-logo": "dogoblock-web-app_footer-logo_1Vta7",
	"footerLogo": "dogoblock-web-app_footer-logo_1Vta7",
	"footer-links": "dogoblock-web-app_footer-links_2GnH_",
	"footerLinks": "dogoblock-web-app_footer-links_2GnH_",
	"footer-lei": "dogoblock-web-app_footer-lei_2aRPq",
	"footerLei": "dogoblock-web-app_footer-lei_2aRPq",
	"footer-contact": "dogoblock-web-app_footer-contact_kixSb",
	"footerContact": "dogoblock-web-app_footer-contact_kixSb",
	"footer-bottom": "dogoblock-web-app_footer-bottom_18YbC",
	"footerBottom": "dogoblock-web-app_footer-bottom_18YbC",
	"pd-page": "dogoblock-web-app_pd-page_KaiaO",
	"pdPage": "dogoblock-web-app_pd-page_KaiaO",
	"pd-loading": "dogoblock-web-app_pd-loading_2yBGM",
	"pdLoading": "dogoblock-web-app_pd-loading_2yBGM",
	"pd-header": "dogoblock-web-app_pd-header_15sVF",
	"pdHeader": "dogoblock-web-app_pd-header_15sVF",
	"pd-header-left": "dogoblock-web-app_pd-header-left_Ywyhv",
	"pdHeaderLeft": "dogoblock-web-app_pd-header-left_Ywyhv",
	"pd-thumb-box": "dogoblock-web-app_pd-thumb-box_2-Fq4",
	"pdThumbBox": "dogoblock-web-app_pd-thumb-box_2-Fq4",
	"pd-thumb-img": "dogoblock-web-app_pd-thumb-img_1KW1w",
	"pdThumbImg": "dogoblock-web-app_pd-thumb-img_1KW1w",
	"pd-thumb-fallback": "dogoblock-web-app_pd-thumb-fallback_tB_L1",
	"pdThumbFallback": "dogoblock-web-app_pd-thumb-fallback_tB_L1",
	"pd-title-group": "dogoblock-web-app_pd-title-group_15Btu",
	"pdTitleGroup": "dogoblock-web-app_pd-title-group_15Btu",
	"pd-title": "dogoblock-web-app_pd-title_3OX_1",
	"pdTitle": "dogoblock-web-app_pd-title_3OX_1",
	"pd-author": "dogoblock-web-app_pd-author_3AAnG",
	"pdAuthor": "dogoblock-web-app_pd-author_3AAnG",
	"pd-date": "dogoblock-web-app_pd-date_cKn04",
	"pdDate": "dogoblock-web-app_pd-date_cKn04",
	"pd-header-actions": "dogoblock-web-app_pd-header-actions_2py2D",
	"pdHeaderActions": "dogoblock-web-app_pd-header-actions_2py2D",
	"pd-btn-visibility": "dogoblock-web-app_pd-btn-visibility_1jaCu",
	"pdBtnVisibility": "dogoblock-web-app_pd-btn-visibility_1jaCu",
	"pd-btn-delete": "dogoblock-web-app_pd-btn-delete_eb3sI",
	"pdBtnDelete": "dogoblock-web-app_pd-btn-delete_eb3sI",
	"pd-main-grid": "dogoblock-web-app_pd-main-grid_FNx8H",
	"pdMainGrid": "dogoblock-web-app_pd-main-grid_FNx8H",
	"pd-player-col": "dogoblock-web-app_pd-player-col_BxfGo",
	"pdPlayerCol": "dogoblock-web-app_pd-player-col_BxfGo",
	"pd-toolbar": "dogoblock-web-app_pd-toolbar_3dhry",
	"pdToolbar": "dogoblock-web-app_pd-toolbar_3dhry",
	"pd-toolbar-flags": "dogoblock-web-app_pd-toolbar-flags_TXL2k",
	"pdToolbarFlags": "dogoblock-web-app_pd-toolbar-flags_TXL2k",
	"pd-flag-green": "dogoblock-web-app_pd-flag-green_1Yb_a",
	"pdFlagGreen": "dogoblock-web-app_pd-flag-green_1Yb_a",
	"pd-flag-red": "dogoblock-web-app_pd-flag-red_OuNdy",
	"pdFlagRed": "dogoblock-web-app_pd-flag-red_OuNdy",
	"pd-toolbar-right": "dogoblock-web-app_pd-toolbar-right_1SdU2",
	"pdToolbarRight": "dogoblock-web-app_pd-toolbar-right_1SdU2",
	"pd-bar-icon": "dogoblock-web-app_pd-bar-icon_3WJm_",
	"pdBarIcon": "dogoblock-web-app_pd-bar-icon_3WJm_",
	"pd-stage": "dogoblock-web-app_pd-stage_2YPmb",
	"pdStage": "dogoblock-web-app_pd-stage_2YPmb",
	"pd-stats-row": "dogoblock-web-app_pd-stats-row_3md3-",
	"pdStatsRow": "dogoblock-web-app_pd-stats-row_3md3-",
	"pd-stats": "dogoblock-web-app_pd-stats_32ety",
	"pdStats": "dogoblock-web-app_pd-stats_32ety",
	"pd-stat": "dogoblock-web-app_pd-stat_a_ebm",
	"pdStat": "dogoblock-web-app_pd-stat_a_ebm",
	"pd-btn-see-inside": "dogoblock-web-app_pd-btn-see-inside_1mD05",
	"pdBtnSeeInside": "dogoblock-web-app_pd-btn-see-inside_1mD05",
	"pd-info-col": "dogoblock-web-app_pd-info-col_28UnO",
	"pdInfoCol": "dogoblock-web-app_pd-info-col_28UnO",
	"pd-info-section": "dogoblock-web-app_pd-info-section_5wpZ9",
	"pdInfoSection": "dogoblock-web-app_pd-info-section_5wpZ9",
	"pd-info-label": "dogoblock-web-app_pd-info-label_3e4_s",
	"pdInfoLabel": "dogoblock-web-app_pd-info-label_3e4_s",
	"pd-info-textarea": "dogoblock-web-app_pd-info-textarea_1VRTO",
	"pdInfoTextarea": "dogoblock-web-app_pd-info-textarea_1VRTO",
	"pd-comments": "dogoblock-web-app_pd-comments_3XlQU",
	"pdComments": "dogoblock-web-app_pd-comments_3XlQU",
	"pd-comments-title": "dogoblock-web-app_pd-comments-title_1bOdq",
	"pdCommentsTitle": "dogoblock-web-app_pd-comments-title_1bOdq",
	"pd-comment-composer": "dogoblock-web-app_pd-comment-composer_3lF9C",
	"pdCommentComposer": "dogoblock-web-app_pd-comment-composer_3lF9C",
	"pd-comment-avatar": "dogoblock-web-app_pd-comment-avatar_32eUa",
	"pdCommentAvatar": "dogoblock-web-app_pd-comment-avatar_32eUa",
	"pd-comment-input-wrap": "dogoblock-web-app_pd-comment-input-wrap_NelRJ",
	"pdCommentInputWrap": "dogoblock-web-app_pd-comment-input-wrap_NelRJ",
	"pd-comment-input": "dogoblock-web-app_pd-comment-input_3zPZo",
	"pdCommentInput": "dogoblock-web-app_pd-comment-input_3zPZo",
	"pd-comment-actions": "dogoblock-web-app_pd-comment-actions_2XheL",
	"pdCommentActions": "dogoblock-web-app_pd-comment-actions_2XheL",
	"pd-btn-publish": "dogoblock-web-app_pd-btn-publish_1qnjo",
	"pdBtnPublish": "dogoblock-web-app_pd-btn-publish_1qnjo",
	"pd-btn-cancel": "dogoblock-web-app_pd-btn-cancel_3KsTS",
	"pdBtnCancel": "dogoblock-web-app_pd-btn-cancel_3KsTS",
	"pd-btn-visibility-public": "dogoblock-web-app_pd-btn-visibility-public_1XRR_",
	"pdBtnVisibilityPublic": "dogoblock-web-app_pd-btn-visibility-public_1XRR_",
	"pd-btn-visibility-private": "dogoblock-web-app_pd-btn-visibility-private_2D01B",
	"pdBtnVisibilityPrivate": "dogoblock-web-app_pd-btn-visibility-private_2D01B",
	"pd-stat-btn": "dogoblock-web-app_pd-stat-btn_2G3OI",
	"pdStatBtn": "dogoblock-web-app_pd-stat-btn_2G3OI",
	"pd-stat-btn-active-like": "dogoblock-web-app_pd-stat-btn-active-like_2k0RH",
	"pdStatBtnActiveLike": "dogoblock-web-app_pd-stat-btn-active-like_2k0RH",
	"pd-stat-btn-active-fav": "dogoblock-web-app_pd-stat-btn-active-fav_34SY0",
	"pdStatBtnActiveFav": "dogoblock-web-app_pd-stat-btn-active-fav_34SY0",
	"pd-thumb-overlay": "dogoblock-web-app_pd-thumb-overlay_1FiyH",
	"pdThumbOverlay": "dogoblock-web-app_pd-thumb-overlay_1FiyH",
	"pd-btn-save-details": "dogoblock-web-app_pd-btn-save-details_RNirf",
	"pdBtnSaveDetails": "dogoblock-web-app_pd-btn-save-details_RNirf",
	"pd-btn-save-details-done": "dogoblock-web-app_pd-btn-save-details-done_k0fD4",
	"pdBtnSaveDetailsDone": "dogoblock-web-app_pd-btn-save-details-done_k0fD4",
	"pd-comment-avatar-initials": "dogoblock-web-app_pd-comment-avatar-initials_1IO8e",
	"pdCommentAvatarInitials": "dogoblock-web-app_pd-comment-avatar-initials_1IO8e",
	"pd-comment-list": "dogoblock-web-app_pd-comment-list_27QY8",
	"pdCommentList": "dogoblock-web-app_pd-comment-list_27QY8",
	"pd-comment-item": "dogoblock-web-app_pd-comment-item_9DLQt",
	"pdCommentItem": "dogoblock-web-app_pd-comment-item_9DLQt",
	"pd-comment-item-avatar": "dogoblock-web-app_pd-comment-item-avatar_3j-Br",
	"pdCommentItemAvatar": "dogoblock-web-app_pd-comment-item-avatar_3j-Br",
	"pd-comment-item-body": "dogoblock-web-app_pd-comment-item-body_3-T6S",
	"pdCommentItemBody": "dogoblock-web-app_pd-comment-item-body_3-T6S",
	"pd-comment-item-author": "dogoblock-web-app_pd-comment-item-author_1pVLK",
	"pdCommentItemAuthor": "dogoblock-web-app_pd-comment-item-author_1pVLK",
	"pd-comment-item-author-link": "dogoblock-web-app_pd-comment-item-author-link_39xdr",
	"pdCommentItemAuthorLink": "dogoblock-web-app_pd-comment-item-author-link_39xdr",
	"pd-comment-item-text": "dogoblock-web-app_pd-comment-item-text_1Ll3B",
	"pdCommentItemText": "dogoblock-web-app_pd-comment-item-text_1Ll3B",
	"pd-comment-item-delete": "dogoblock-web-app_pd-comment-item-delete_kSpog",
	"pdCommentItemDelete": "dogoblock-web-app_pd-comment-item-delete_kSpog",
	"pd-comment-empty": "dogoblock-web-app_pd-comment-empty_1I3-k",
	"pdCommentEmpty": "dogoblock-web-app_pd-comment-empty_1I3-k",
	"pd-comment-reply-btn": "dogoblock-web-app_pd-comment-reply-btn_3Lyzg",
	"pdCommentReplyBtn": "dogoblock-web-app_pd-comment-reply-btn_3Lyzg",
	"pd-reply-composer": "dogoblock-web-app_pd-reply-composer_1PY6w",
	"pdReplyComposer": "dogoblock-web-app_pd-reply-composer_1PY6w",
	"replyFadeIn": "dogoblock-web-app_replyFadeIn_flhdW",
	"pd-reply-list": "dogoblock-web-app_pd-reply-list_1RzXI",
	"pdReplyList": "dogoblock-web-app_pd-reply-list_1RzXI",
	"pd-reply-item": "dogoblock-web-app_pd-reply-item_2r86P",
	"pdReplyItem": "dogoblock-web-app_pd-reply-item_2r86P",
	"toast-container": "dogoblock-web-app_toast-container_3681H",
	"toastContainer": "dogoblock-web-app_toast-container_3681H",
	"forgot-password-row": "dogoblock-web-app_forgot-password-row_2uwgY",
	"forgotPasswordRow": "dogoblock-web-app_forgot-password-row_2uwgY",
	"success-box": "dogoblock-web-app_success-box_3icZ5",
	"successBox": "dogoblock-web-app_success-box_3icZ5",
	"author-link": "dogoblock-web-app_author-link_PZTpH",
	"authorLink": "dogoblock-web-app_author-link_PZTpH",
	"public-profile-page": "dogoblock-web-app_public-profile-page_1Cr0u",
	"publicProfilePage": "dogoblock-web-app_public-profile-page_1Cr0u",
	"public-profile-header": "dogoblock-web-app_public-profile-header_1LMjz",
	"publicProfileHeader": "dogoblock-web-app_public-profile-header_1LMjz",
	"public-profile-avatar": "dogoblock-web-app_public-profile-avatar_3QxQA",
	"publicProfileAvatar": "dogoblock-web-app_public-profile-avatar_3QxQA",
	"public-profile-info": "dogoblock-web-app_public-profile-info_1DbDk",
	"publicProfileInfo": "dogoblock-web-app_public-profile-info_1DbDk",
	"public-profile-name": "dogoblock-web-app_public-profile-name_2MKE8",
	"publicProfileName": "dogoblock-web-app_public-profile-name_2MKE8",
	"public-profile-username": "dogoblock-web-app_public-profile-username_987Nm",
	"publicProfileUsername": "dogoblock-web-app_public-profile-username_987Nm",
	"public-profile-bio": "dogoblock-web-app_public-profile-bio_1_c2s",
	"publicProfileBio": "dogoblock-web-app_public-profile-bio_1_c2s",
	"public-profile-working": "dogoblock-web-app_public-profile-working_Od1ZL",
	"publicProfileWorking": "dogoblock-web-app_public-profile-working_Od1ZL",
	"public-profile-stats": "dogoblock-web-app_public-profile-stats_CkAnG",
	"publicProfileStats": "dogoblock-web-app_public-profile-stats_CkAnG",
	"public-profile-stat": "dogoblock-web-app_public-profile-stat_2cnC-",
	"publicProfileStat": "dogoblock-web-app_public-profile-stat_2cnC-"
};

/***/ }),

/***/ 2062:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/assets/a0f2f98e8648fcb6c90756bd16e5eb7d.png";

/***/ }),

/***/ 2063:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/assets/6ab57785fe92515fe2b802064b584d42.png";

/***/ }),

/***/ 2076:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(120);
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: ./node_modules/redux/es/index.js + 6 modules
var es = __webpack_require__(82);

// EXTERNAL MODULE: ./node_modules/react-intl/lib/index.es.js + 1 modules
var index_es = __webpack_require__(4);

// EXTERNAL MODULE: ./src/lib/app-state-hoc.jsx + 1 modules
var app_state_hoc = __webpack_require__(214);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(0);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 14 modules
var react_redux_es = __webpack_require__(20);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/circle-user.js
var circle_user = __webpack_require__(2112);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/log-out.js
var log_out = __webpack_require__(2113);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/user.js
var icons_user = __webpack_require__(2114);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/log-in.js
var log_in = __webpack_require__(2115);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/user-plus.js
var user_plus = __webpack_require__(2116);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/search.js
var search = __webpack_require__(2117);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/upload.js
var upload = __webpack_require__(2110);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/plus.js
var plus = __webpack_require__(2118);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/trash-2.js
var trash_2 = __webpack_require__(2105);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/save.js
var save = __webpack_require__(2119);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/heart.js
var heart = __webpack_require__(2095);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/star.js
var star = __webpack_require__(2096);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/folder-open.js
var folder_open = __webpack_require__(2120);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/message-circle.js
var message_circle = __webpack_require__(2093);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/copy.js
var copy = __webpack_require__(2121);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/code-xml.js
var code_xml = __webpack_require__(2109);

// EXTERNAL MODULE: ./src/containers/gui.jsx + 300 modules
var gui = __webpack_require__(199);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/reply.js
var icons_reply = __webpack_require__(2094);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/repeat-2.js
var repeat_2 = __webpack_require__(2097);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/bell.js
var bell = __webpack_require__(2098);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/x.js
var x = __webpack_require__(2099);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/check-check.js
var check_check = __webpack_require__(2100);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/chevron-down.js
var chevron_down = __webpack_require__(2101);

// EXTERNAL MODULE: ./src/components/notifications/notifications-bell.css
var notifications_bell = __webpack_require__(102);
var notifications_bell_default = /*#__PURE__*/__webpack_require__.n(notifications_bell);

// CONCATENATED MODULE: ./src/components/notifications/notifications-bell.jsx
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var typeIcon = {
  PROJECT_COMMENT: message_circle["a" /* default */],
  COMMENT_REPLY: icons_reply["a" /* default */],
  PROJECT_LIKE: heart["a" /* default */],
  PROJECT_FAVORITE: star["a" /* default */],
  PROJECT_REMIX: repeat_2["a" /* default */]
};

var formatDate = function formatDate(value) {
  if (!value) return '';
  var date = new Date(value);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
};

var getInitials = function getInitials(user) {
  return (user && (user.name || user.username) || '?').split(' ').map(function (part) {
    return part[0];
  }).slice(0, 2).join('').toUpperCase();
};

var notifications_bell_NotificationAvatar = function NotificationAvatar(_ref) {
  var user = _ref.user;
  return /*#__PURE__*/react_default.a.createElement("span", {
    className: notifications_bell_default.a.avatar
  }, user && user.avatarUrl ? /*#__PURE__*/react_default.a.createElement("img", {
    alt: "",
    src: user.avatarUrl
  }) : getInitials(user));
};

notifications_bell_NotificationAvatar.propTypes = {
  user: prop_types_default.a.object
};

var notifications_bell_NotificationItem = function NotificationItem(_ref2) {
  var notification = _ref2.notification,
      onOpen = _ref2.onOpen,
      onDelete = _ref2.onDelete;
  var NotificationIcon = typeIcon[notification.type] || bell["a" /* default */];
  var actorName = notification.actor && (notification.actor.name || notification.actor.username);
  var unread = !notification.readAt;
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: "".concat(notifications_bell_default.a.item, " ").concat(unread ? notifications_bell_default.a.itemUnread : '')
  }, /*#__PURE__*/react_default.a.createElement("button", {
    className: notifications_bell_default.a.itemMain,
    onClick: function onClick() {
      return onOpen(notification);
    }
  }, /*#__PURE__*/react_default.a.createElement(notifications_bell_NotificationAvatar, {
    user: notification.actor
  }), /*#__PURE__*/react_default.a.createElement("span", {
    className: notifications_bell_default.a.itemBody
  }, /*#__PURE__*/react_default.a.createElement("p", {
    className: notifications_bell_default.a.message
  }, /*#__PURE__*/react_default.a.createElement("span", {
    className: notifications_bell_default.a.actor
  }, actorName || 'Alguém'), ' ', notification.message), notification.project ? /*#__PURE__*/react_default.a.createElement("p", {
    className: notifications_bell_default.a.project
  }, notification.project.title) : null, /*#__PURE__*/react_default.a.createElement("p", {
    className: notifications_bell_default.a.date
  }, formatDate(notification.createdAt))), unread ? /*#__PURE__*/react_default.a.createElement("span", {
    "aria-label": "N\xE3o lida",
    className: notifications_bell_default.a.unreadDot
  }) : /*#__PURE__*/react_default.a.createElement(NotificationIcon, {
    "aria-hidden": "true",
    className: notifications_bell_default.a.itemIcon
  })), /*#__PURE__*/react_default.a.createElement("button", {
    "aria-label": "Remover notifica\xE7\xE3o",
    className: notifications_bell_default.a.deleteBtn,
    title: "Remover",
    onClick: function onClick(e) {
      e.stopPropagation();
      onDelete(notification);
    }
  }, /*#__PURE__*/react_default.a.createElement(x["a" /* default */], {
    "aria-hidden": "true",
    className: notifications_bell_default.a.deleteBtnIcon
  })));
};

notifications_bell_NotificationItem.propTypes = {
  notification: prop_types_default.a.object.isRequired,
  onDelete: prop_types_default.a.func.isRequired,
  onOpen: prop_types_default.a.func.isRequired
};

var notifications_bell_NotificationsDropdown = function NotificationsDropdown(_ref3) {
  var loading = _ref3.loading,
      loadingMore = _ref3.loadingMore,
      notifications = _ref3.notifications,
      unreadCount = _ref3.unreadCount,
      hasMore = _ref3.hasMore,
      onMarkAllRead = _ref3.onMarkAllRead,
      onOpenNotification = _ref3.onOpenNotification,
      onDeleteNotification = _ref3.onDeleteNotification,
      onLoadMore = _ref3.onLoadMore;
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: notifications_bell_default.a.dropdown
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: notifications_bell_default.a.dropdownHeader
  }, /*#__PURE__*/react_default.a.createElement("h2", {
    className: notifications_bell_default.a.dropdownTitle
  }, "Notifica\xE7\xF5es"), /*#__PURE__*/react_default.a.createElement("button", {
    className: notifications_bell_default.a.readAllButton,
    disabled: unreadCount === 0,
    onClick: onMarkAllRead
  }, /*#__PURE__*/react_default.a.createElement(check_check["a" /* default */], {
    "aria-hidden": "true",
    className: notifications_bell_default.a.readAllIcon
  }), 'Marcar lidas')), /*#__PURE__*/react_default.a.createElement("div", {
    "aria-live": "polite",
    "aria-relevant": "additions",
    className: notifications_bell_default.a.list
  }, loading && notifications.length === 0 ? /*#__PURE__*/react_default.a.createElement("div", {
    className: notifications_bell_default.a.loading
  }, 'Carregando...') : notifications.length === 0 ? /*#__PURE__*/react_default.a.createElement("div", {
    className: notifications_bell_default.a.empty
  }, 'Nenhuma notificação.') : notifications.map(function (notification) {
    return /*#__PURE__*/react_default.a.createElement(notifications_bell_NotificationItem, {
      key: notification.id,
      notification: notification,
      onDelete: onDeleteNotification,
      onOpen: onOpenNotification
    });
  })), hasMore ? /*#__PURE__*/react_default.a.createElement("div", {
    className: notifications_bell_default.a.loadMoreWrap
  }, /*#__PURE__*/react_default.a.createElement("button", {
    className: notifications_bell_default.a.loadMoreButton,
    disabled: loadingMore,
    onClick: onLoadMore
  }, loadingMore ? 'Carregando...' : /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement(chevron_down["a" /* default */], {
    "aria-hidden": "true",
    className: notifications_bell_default.a.loadMoreIcon
  }), 'Ver mais'))) : null, /*#__PURE__*/react_default.a.createElement("div", {
    className: notifications_bell_default.a.footer
  }, unreadCount > 0 ? "".concat(unreadCount, " n\xE3o lida(s)") : 'Tudo em dia ✓'));
};

notifications_bell_NotificationsDropdown.propTypes = {
  hasMore: prop_types_default.a.bool,
  loading: prop_types_default.a.bool,
  loadingMore: prop_types_default.a.bool,
  notifications: prop_types_default.a.array,
  unreadCount: prop_types_default.a.number,
  onDeleteNotification: prop_types_default.a.func.isRequired,
  onLoadMore: prop_types_default.a.func.isRequired,
  onMarkAllRead: prop_types_default.a.func.isRequired,
  onOpenNotification: prop_types_default.a.func.isRequired
};
notifications_bell_NotificationsDropdown.defaultProps = {
  hasMore: false,
  loading: false,
  loadingMore: false,
  notifications: [],
  unreadCount: 0
};

var notifications_bell_NotificationsBell = /*#__PURE__*/function (_React$Component) {
  _inherits(NotificationsBell, _React$Component);

  var _super = _createSuper(NotificationsBell);

  function NotificationsBell(props) {
    var _this;

    _classCallCheck(this, NotificationsBell);

    _this = _super.call(this, props);
    _this.state = {
      open: false,
      shaking: false
    };
    _this.handleToggle = _this.handleToggle.bind(_assertThisInitialized(_this));
    _this.handleDocumentClick = _this.handleDocumentClick.bind(_assertThisInitialized(_this));
    _this.handleOpenNotification = _this.handleOpenNotification.bind(_assertThisInitialized(_this));
    _this.setWrapRef = _this.setWrapRef.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(NotificationsBell, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('mousedown', this.handleDocumentClick);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // Trigger shake animation when unread count increases
      if (this.props.unreadCount > prevProps.unreadCount && !this.state.open) {
        this.triggerShake();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleDocumentClick);
      if (this._shakeTimer) clearTimeout(this._shakeTimer);
    }
  }, {
    key: "triggerShake",
    value: function triggerShake() {
      var _this2 = this;

      this.setState({
        shaking: true
      });
      this._shakeTimer = setTimeout(function () {
        return _this2.setState({
          shaking: false
        });
      }, 700);
    }
  }, {
    key: "setWrapRef",
    value: function setWrapRef(node) {
      this.wrapRef = node;
    }
  }, {
    key: "handleDocumentClick",
    value: function handleDocumentClick(event) {
      if (!this.state.open || !this.wrapRef || this.wrapRef.contains(event.target)) return;
      this.setState({
        open: false
      });
    }
  }, {
    key: "handleToggle",
    value: function handleToggle() {
      var _this3 = this;

      this.setState(function (prevState) {
        var open = !prevState.open;
        if (open) _this3.props.onOpen();
        return {
          open: open
        };
      });
    }
  }, {
    key: "handleOpenNotification",
    value: function handleOpenNotification(notification) {
      this.setState({
        open: false
      });
      this.props.onOpenNotification(notification);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          loading = _this$props.loading,
          loadingMore = _this$props.loadingMore,
          notifications = _this$props.notifications,
          unreadCount = _this$props.unreadCount,
          hasMore = _this$props.hasMore,
          onMarkAllRead = _this$props.onMarkAllRead,
          onDeleteNotification = _this$props.onDeleteNotification,
          onLoadMore = _this$props.onLoadMore;
      var badgeText = unreadCount > 99 ? '99+' : unreadCount;
      var bellClass = [notifications_bell_default.a.bellIcon, this.state.shaking ? notifications_bell_default.a.bellShake : ''].filter(Boolean).join(' ');
      return /*#__PURE__*/react_default.a.createElement("span", {
        className: notifications_bell_default.a.wrap,
        ref: this.setWrapRef
      }, /*#__PURE__*/react_default.a.createElement("button", {
        "aria-label": "Abrir notifica\xE7\xF5es",
        className: notifications_bell_default.a.bellButton,
        title: "Notifica\xE7\xF5es",
        onClick: this.handleToggle
      }, /*#__PURE__*/react_default.a.createElement(bell["a" /* default */], {
        "aria-hidden": "true",
        className: bellClass
      }), unreadCount > 0 ? /*#__PURE__*/react_default.a.createElement("span", {
        className: notifications_bell_default.a.badge
      }, badgeText) : null), this.state.open ? /*#__PURE__*/react_default.a.createElement(notifications_bell_NotificationsDropdown, {
        hasMore: hasMore,
        loading: loading,
        loadingMore: loadingMore,
        notifications: notifications,
        unreadCount: unreadCount,
        onDeleteNotification: onDeleteNotification,
        onLoadMore: onLoadMore,
        onMarkAllRead: onMarkAllRead,
        onOpenNotification: this.handleOpenNotification
      }) : null);
    }
  }]);

  return NotificationsBell;
}(react_default.a.Component);

notifications_bell_NotificationsBell.propTypes = {
  hasMore: prop_types_default.a.bool,
  loading: prop_types_default.a.bool,
  loadingMore: prop_types_default.a.bool,
  notifications: prop_types_default.a.array,
  unreadCount: prop_types_default.a.number,
  onDeleteNotification: prop_types_default.a.func.isRequired,
  onLoadMore: prop_types_default.a.func.isRequired,
  onMarkAllRead: prop_types_default.a.func.isRequired,
  onOpen: prop_types_default.a.func.isRequired,
  onOpenNotification: prop_types_default.a.func.isRequired
};
notifications_bell_NotificationsBell.defaultProps = {
  hasMore: false,
  loading: false,
  loadingMore: false,
  notifications: [],
  unreadCount: 0
};
/* harmony default export */ var notifications_notifications_bell = (notifications_bell_NotificationsBell);
// EXTERNAL MODULE: ./src/components/notifications/notification-toast.css
var notification_toast = __webpack_require__(224);
var notification_toast_default = /*#__PURE__*/__webpack_require__.n(notification_toast);

// CONCATENATED MODULE: ./src/components/notifications/notification-toast.jsx




var notification_toast_typeIcon = {
  PROJECT_COMMENT: message_circle["a" /* default */],
  COMMENT_REPLY: icons_reply["a" /* default */],
  PROJECT_LIKE: heart["a" /* default */],
  PROJECT_FAVORITE: star["a" /* default */],
  PROJECT_REMIX: repeat_2["a" /* default */]
};

var notification_toast_getInitials = function getInitials(user) {
  return (user && (user.name || user.username) || '?').split(' ').map(function (part) {
    return part[0];
  }).slice(0, 2).join('').toUpperCase();
};

var notification_toast_NotificationToast = function NotificationToast(_ref) {
  var notification = _ref.notification,
      onDismiss = _ref.onDismiss,
      onClick = _ref.onClick;
  var Icon = notification_toast_typeIcon[notification.type] || bell["a" /* default */];
  var actorName = notification.actor && (notification.actor.name || notification.actor.username);
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: notification_toast_default.a.toast,
    role: "alert",
    "aria-live": "polite"
  }, /*#__PURE__*/react_default.a.createElement("button", {
    className: notification_toast_default.a.toastBody,
    onClick: onClick
  }, /*#__PURE__*/react_default.a.createElement("span", {
    className: notification_toast_default.a.toastAvatar
  }, notification.actor && notification.actor.avatarUrl ? /*#__PURE__*/react_default.a.createElement("img", {
    alt: "",
    src: notification.actor.avatarUrl
  }) : notification_toast_getInitials(notification.actor)), /*#__PURE__*/react_default.a.createElement("span", {
    className: notification_toast_default.a.toastContent
  }, /*#__PURE__*/react_default.a.createElement("span", {
    className: notification_toast_default.a.toastIconWrap
  }, /*#__PURE__*/react_default.a.createElement(Icon, {
    "aria-hidden": "true",
    className: notification_toast_default.a.toastIcon
  })), /*#__PURE__*/react_default.a.createElement("span", {
    className: notification_toast_default.a.toastText
  }, /*#__PURE__*/react_default.a.createElement("strong", {
    className: notification_toast_default.a.toastActor
  }, actorName || 'Alguém'), ' ', notification.message))), /*#__PURE__*/react_default.a.createElement("button", {
    "aria-label": "Fechar",
    className: notification_toast_default.a.toastClose,
    onClick: onDismiss
  }, /*#__PURE__*/react_default.a.createElement(x["a" /* default */], {
    "aria-hidden": "true",
    className: notification_toast_default.a.toastCloseIcon
  })), /*#__PURE__*/react_default.a.createElement("span", {
    "aria-hidden": "true",
    className: notification_toast_default.a.toastProgress
  }));
};

notification_toast_NotificationToast.propTypes = {
  notification: prop_types_default.a.object.isRequired,
  onClick: prop_types_default.a.func.isRequired,
  onDismiss: prop_types_default.a.func.isRequired
};
/* harmony default export */ var notifications_notification_toast = (notification_toast_NotificationToast);
// EXTERNAL MODULE: ./src/reducers/project-state.js
var project_state = __webpack_require__(38);

// EXTERNAL MODULE: ./src/reducers/project-interactions.js
var project_interactions = __webpack_require__(237);

// EXTERNAL MODULE: ./src/lib/dogoblock-api.js
var dogoblock_api = __webpack_require__(50);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/lock-open.js
var lock_open = __webpack_require__(2102);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/share-2.js
var share_2 = __webpack_require__(2103);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/lock.js
var lock = __webpack_require__(2104);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/pen-line.js
var pen_line = __webpack_require__(2106);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/ellipsis.js
var ellipsis = __webpack_require__(2107);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/send.js
var send = __webpack_require__(2108);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/eye.js
var eye = __webpack_require__(2111);

// EXTERNAL MODULE: ./src/components/project-page/project-page.css
var project_page = __webpack_require__(34);
var project_page_default = /*#__PURE__*/__webpack_require__.n(project_page);

// CONCATENATED MODULE: ./src/components/project-page/project-page.jsx
function project_page_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { project_page_typeof = function _typeof(obj) { return typeof obj; }; } else { project_page_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return project_page_typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function project_page_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function project_page_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function project_page_createClass(Constructor, protoProps, staticProps) { if (protoProps) project_page_defineProperties(Constructor.prototype, protoProps); if (staticProps) project_page_defineProperties(Constructor, staticProps); return Constructor; }

function project_page_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) project_page_setPrototypeOf(subClass, superClass); }

function project_page_setPrototypeOf(o, p) { project_page_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return project_page_setPrototypeOf(o, p); }

function project_page_createSuper(Derived) { var hasNativeReflectConstruct = project_page_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = project_page_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = project_page_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return project_page_possibleConstructorReturn(this, result); }; }

function project_page_possibleConstructorReturn(self, call) { if (call && (project_page_typeof(call) === "object" || typeof call === "function")) { return call; } return project_page_assertThisInitialized(self); }

function project_page_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function project_page_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function project_page_getPrototypeOf(o) { project_page_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return project_page_getPrototypeOf(o); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






var project_page_formatDate = function formatDate(iso) {
  if (!iso) return '';
  var d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

var ALLOWED_COMMENT_LINK_HOSTS = ['dogoblock.vercel.app', 'dogoblock.com', 'dogoblock.dogomaker.com'];
var COMMENT_LINK_PATTERN = /(?:https?:\/\/)?[a-z0-9.-]+\.[a-z]{2,}(?:\/[^\s<>"']*)?/gi;

var splitTrailingPunctuation = function splitTrailingPunctuation(value) {
  var match = value.match(/^(.+?)([.,!?;:)]*)$/);
  return match ? [match[1], match[2]] : [value, ''];
};

var getAllowedCommentLink = function getAllowedCommentLink(value) {
  var _splitTrailingPunctua = splitTrailingPunctuation(value),
      _splitTrailingPunctua2 = _slicedToArray(_splitTrailingPunctua, 1),
      candidate = _splitTrailingPunctua2[0];

  var normalized = /^https?:\/\//i.test(candidate) ? candidate : "https://".concat(candidate);

  try {
    var url = new URL(normalized);
    if (url.protocol !== 'https:') return null;
    if (!ALLOWED_COMMENT_LINK_HOSTS.includes(url.hostname.toLowerCase())) return null;
    return url.href;
  } catch (e) {
    return null;
  }
};

var project_page_renderCommentContent = function renderCommentContent(content) {
  if (!content) return null;
  var parts = [];
  var lastIndex = 0;
  var match = COMMENT_LINK_PATTERN.exec(content);

  while (match) {
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index));
    }

    var rawLink = match[0];

    var _splitTrailingPunctua3 = splitTrailingPunctuation(rawLink),
        _splitTrailingPunctua4 = _slicedToArray(_splitTrailingPunctua3, 2),
        candidate = _splitTrailingPunctua4[0],
        punctuation = _splitTrailingPunctua4[1];

    var href = getAllowedCommentLink(rawLink);

    if (href) {
      parts.push( /*#__PURE__*/react_default.a.createElement("a", {
        key: "comment-link-".concat(match.index),
        className: project_page_default.a.commentLink,
        href: href,
        target: "_blank",
        rel: "noopener noreferrer"
      }, candidate));
      if (punctuation) parts.push(punctuation);
    } else {
      parts.push(rawLink);
    }

    lastIndex = match.index + rawLink.length;
    match = COMMENT_LINK_PATTERN.exec(content);
  }

  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }

  return parts;
};

var project_page_VisibilityBadge = function VisibilityBadge(_ref) {
  var visibility = _ref.visibility;
  var map = {
    PUBLIC: {
      label: 'Público',
      cls: project_page_default.a.badgePublic,
      IconComponent: lock_open["a" /* default */]
    },
    UNLISTED: {
      label: 'Não-listado',
      cls: project_page_default.a.badgeUnlisted,
      IconComponent: share_2["a" /* default */]
    },
    PRIVATE: {
      label: 'Privado',
      cls: project_page_default.a.badgePrivate,
      IconComponent: lock["a" /* default */]
    }
  };
  var v = map[visibility] || map.PRIVATE;
  var BadgeIcon = v.IconComponent;
  return /*#__PURE__*/react_default.a.createElement("span", {
    className: "".concat(project_page_default.a.visibilityBadge, " ").concat(v.cls)
  }, /*#__PURE__*/react_default.a.createElement(BadgeIcon, {
    "aria-hidden": "true",
    className: project_page_default.a.badgeIcon
  }), v.label);
};

project_page_VisibilityBadge.propTypes = {
  visibility: prop_types_default.a.string
};

var project_page_CommentItem = function CommentItem(_ref2) {
  var _comment$user, _comment$user2, _comment$user3, _comment$user4, _comment$user5;

  var comment = _ref2.comment,
      canDelete = _ref2.canDelete,
      onDelete = _ref2.onDelete,
      canReply = _ref2.canReply,
      isReply = _ref2.isReply,
      onReplyStart = _ref2.onReplyStart,
      onReplyCancel = _ref2.onReplyCancel,
      onReplySubmit = _ref2.onReplySubmit,
      onReplyTextChange = _ref2.onReplyTextChange,
      replyText = _ref2.replyText,
      replying = _ref2.replying,
      submittingReply = _ref2.submittingReply,
      currentUserId = _ref2.currentUserId,
      ownerId = _ref2.ownerId;
  var initials = (((_comment$user = comment.user) === null || _comment$user === void 0 ? void 0 : _comment$user.name) || ((_comment$user2 = comment.user) === null || _comment$user2 === void 0 ? void 0 : _comment$user2.username) || '?').split(' ').map(function (w) {
    return w[0];
  }).slice(0, 2).join('').toUpperCase();
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: isReply ? "".concat(project_page_default.a.comment, " ").concat(project_page_default.a.commentReply) : project_page_default.a.comment
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: project_page_default.a.commentAvatar
  }, (_comment$user3 = comment.user) !== null && _comment$user3 !== void 0 && _comment$user3.avatarUrl ? /*#__PURE__*/react_default.a.createElement("img", {
    src: comment.user.avatarUrl,
    alt: comment.user.username
  }) : initials), /*#__PURE__*/react_default.a.createElement("div", {
    className: project_page_default.a.commentBubble
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: project_page_default.a.commentHeader
  }, /*#__PURE__*/react_default.a.createElement("span", {
    className: project_page_default.a.commentAuthor
  }, ((_comment$user4 = comment.user) === null || _comment$user4 === void 0 ? void 0 : _comment$user4.name) || ((_comment$user5 = comment.user) === null || _comment$user5 === void 0 ? void 0 : _comment$user5.username)), /*#__PURE__*/react_default.a.createElement("span", {
    className: project_page_default.a.commentDate
  }, project_page_formatDate(comment.createdAt)), canDelete && /*#__PURE__*/react_default.a.createElement("button", {
    className: project_page_default.a.commentDeleteBtn,
    onClick: function onClick() {
      return onDelete(comment.id);
    },
    title: "Apagar coment\xE1rio",
    "aria-label": "Apagar coment\xE1rio"
  }, /*#__PURE__*/react_default.a.createElement(trash_2["a" /* default */], {
    "aria-hidden": "true",
    size: 14
  }))), /*#__PURE__*/react_default.a.createElement("div", {
    className: project_page_default.a.commentContent
  }, project_page_renderCommentContent(comment.content)), !isReply && /*#__PURE__*/react_default.a.createElement("div", {
    className: project_page_default.a.commentActions
  }, canReply && /*#__PURE__*/react_default.a.createElement("button", {
    className: project_page_default.a.commentReplyBtn,
    onClick: function onClick() {
      return onReplyStart(comment.id);
    },
    type: "button"
  }, /*#__PURE__*/react_default.a.createElement(icons_reply["a" /* default */], {
    "aria-hidden": "true",
    size: 14
  }), "Responder")), replying && /*#__PURE__*/react_default.a.createElement("div", {
    className: project_page_default.a.replyInput
  }, /*#__PURE__*/react_default.a.createElement("textarea", {
    className: project_page_default.a.replyInputField,
    placeholder: "Escreva uma resposta\u2026",
    value: replyText,
    rows: 2,
    maxLength: 500,
    onChange: function onChange(e) {
      return onReplyTextChange(e.target.value);
    },
    onKeyDown: function onKeyDown(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onReplySubmit(comment.id);
      }
    },
    autoFocus: true
  }), /*#__PURE__*/react_default.a.createElement("div", {
    className: project_page_default.a.replyActions
  }, /*#__PURE__*/react_default.a.createElement("button", {
    className: project_page_default.a.replyCancelBtn,
    onClick: onReplyCancel,
    type: "button"
  }, "Cancelar"), /*#__PURE__*/react_default.a.createElement("button", {
    className: project_page_default.a.replySubmitBtn,
    disabled: !replyText.trim() || submittingReply,
    onClick: function onClick() {
      return onReplySubmit(comment.id);
    },
    type: "button"
  }, submittingReply ? 'Enviando…' : 'Responder'))), !isReply && comment.replies && comment.replies.length > 0 && /*#__PURE__*/react_default.a.createElement("div", {
    className: project_page_default.a.replyList
  }, comment.replies.map(function (reply) {
    var _reply$user;

    return /*#__PURE__*/react_default.a.createElement(CommentItem, {
      key: reply.id,
      comment: reply,
      canDelete: !!currentUserId && (((_reply$user = reply.user) === null || _reply$user === void 0 ? void 0 : _reply$user.id) === currentUserId || ownerId === currentUserId),
      isReply: true,
      onDelete: onDelete
    });
  }))));
};

project_page_CommentItem.propTypes = {
  comment: prop_types_default.a.object.isRequired,
  canDelete: prop_types_default.a.bool,
  onDelete: prop_types_default.a.func,
  canReply: prop_types_default.a.bool,
  isReply: prop_types_default.a.bool,
  onReplyStart: prop_types_default.a.func,
  onReplyCancel: prop_types_default.a.func,
  onReplySubmit: prop_types_default.a.func,
  onReplyTextChange: prop_types_default.a.func,
  replyText: prop_types_default.a.string,
  replying: prop_types_default.a.bool,
  submittingReply: prop_types_default.a.bool,
  currentUserId: prop_types_default.a.string,
  ownerId: prop_types_default.a.string
};
project_page_CommentItem.defaultProps = {
  canDelete: false,
  canReply: false,
  isReply: false,
  onDelete: function onDelete() {},
  onReplyStart: function onReplyStart() {},
  onReplyCancel: function onReplyCancel() {},
  onReplySubmit: function onReplySubmit() {},
  onReplyTextChange: function onReplyTextChange() {},
  replyText: '',
  replying: false,
  submittingReply: false
};

var project_page_ProjectPage = /*#__PURE__*/function (_React$Component) {
  project_page_inherits(ProjectPage, _React$Component);

  var _super = project_page_createSuper(ProjectPage);

  function ProjectPage(props) {
    var _this;

    project_page_classCallCheck(this, ProjectPage);

    _this = _super.call(this, props);
    _this.state = {
      activeTab: 'about',
      editingSection: null,
      // 'description' | 'instructions' | 'credits'
      editValue: '',
      commentText: '',
      submittingComment: false,
      replyParentId: null,
      replyText: '',
      submittingReply: false,
      savingDetails: false,
      editingTitle: false,
      titleValue: props.title || '',
      coverPreview: null,
      uploadingCover: false
    };
    _this.coverInput = /*#__PURE__*/react_default.a.createRef();
    _this.handleTabChange = _this.handleTabChange.bind(project_page_assertThisInitialized(_this));
    _this.handleLike = _this.handleLike.bind(project_page_assertThisInitialized(_this));
    _this.handleFavorite = _this.handleFavorite.bind(project_page_assertThisInitialized(_this));
    _this.handleRemix = _this.handleRemix.bind(project_page_assertThisInitialized(_this));
    _this.handleCommentSubmit = _this.handleCommentSubmit.bind(project_page_assertThisInitialized(_this));
    _this.handleCommentDelete = _this.handleCommentDelete.bind(project_page_assertThisInitialized(_this));
    _this.handleReplyStart = _this.handleReplyStart.bind(project_page_assertThisInitialized(_this));
    _this.handleReplyCancel = _this.handleReplyCancel.bind(project_page_assertThisInitialized(_this));
    _this.handleReplySubmit = _this.handleReplySubmit.bind(project_page_assertThisInitialized(_this));
    _this.handleVisibilityChange = _this.handleVisibilityChange.bind(project_page_assertThisInitialized(_this));
    _this.handleEditStart = _this.handleEditStart.bind(project_page_assertThisInitialized(_this));
    _this.handleEditSave = _this.handleEditSave.bind(project_page_assertThisInitialized(_this));
    _this.handleTitleSave = _this.handleTitleSave.bind(project_page_assertThisInitialized(_this));
    _this.handleCoverClick = _this.handleCoverClick.bind(project_page_assertThisInitialized(_this));
    _this.handleCoverSelected = _this.handleCoverSelected.bind(project_page_assertThisInitialized(_this));
    _this.handleDeleteProject = _this.handleDeleteProject.bind(project_page_assertThisInitialized(_this));
    return _this;
  }

  project_page_createClass(ProjectPage, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.title !== this.props.title && !this.state.editingTitle) {
        this.setState({
          titleValue: this.props.title || ''
        });
      }

      if (prevProps.thumbnailUrl !== this.props.thumbnailUrl && this.state.coverPreview) {
        this.setState({
          coverPreview: null
        });
      }
    }
  }, {
    key: "handleTabChange",
    value: function handleTabChange(tab) {
      this.setState({
        activeTab: tab
      });

      if (tab === 'comments' && this.props.onLoadComments) {
        this.props.onLoadComments(1);
      }
    }
  }, {
    key: "handleLike",
    value: function handleLike() {
      if (!this.props.isLoggedIn) return;

      if (this.props.isLiked) {
        this.props.onUnlike();
      } else {
        this.props.onLike();
      }
    }
  }, {
    key: "handleFavorite",
    value: function handleFavorite() {
      if (!this.props.isLoggedIn) return;

      if (this.props.isFavorited) {
        this.props.onUnfavorite();
      } else {
        this.props.onFavorite();
      }
    }
  }, {
    key: "handleRemix",
    value: function handleRemix() {
      if (!this.props.isLoggedIn || !this.props.onRemix) return;
      this.props.onRemix();
    }
  }, {
    key: "handleCommentSubmit",
    value: function handleCommentSubmit() {
      var _this2 = this;

      var content = this.state.commentText.trim();
      if (!content || this.state.submittingComment) return;
      this.setState({
        submittingComment: true
      });
      this.props.onPostComment(content).then(function () {
        _this2.setState({
          commentText: ''
        });
      }).finally(function () {
        _this2.setState({
          submittingComment: false
        });
      });
    }
  }, {
    key: "handleCommentDelete",
    value: function handleCommentDelete(commentId) {
      if (!window.confirm('Apagar este comentário?')) return;
      this.props.onDeleteComment(commentId);
    }
  }, {
    key: "handleReplyStart",
    value: function handleReplyStart(commentId) {
      this.setState({
        replyParentId: commentId,
        replyText: ''
      });
    }
  }, {
    key: "handleReplyCancel",
    value: function handleReplyCancel() {
      this.setState({
        replyParentId: null,
        replyText: '',
        submittingReply: false
      });
    }
  }, {
    key: "handleReplySubmit",
    value: function handleReplySubmit(parentId) {
      var _this3 = this;

      var content = this.state.replyText.trim();
      if (!content || this.state.submittingReply) return;
      this.setState({
        submittingReply: true
      });
      this.props.onPostComment(content, parentId).then(function () {
        _this3.setState({
          replyParentId: null,
          replyText: ''
        });
      }).finally(function () {
        _this3.setState({
          submittingReply: false
        });
      });
    }
  }, {
    key: "handleVisibilityChange",
    value: function handleVisibilityChange(e) {
      this.props.onUpdateVisibility(e.target.value);
    }
  }, {
    key: "handleEditStart",
    value: function handleEditStart(section) {
      var value = this.props[section] || '';
      this.setState({
        editingSection: section,
        editValue: value
      });
    }
  }, {
    key: "handleEditSave",
    value: function handleEditSave() {
      var _this4 = this;

      var _this$state = this.state,
          editingSection = _this$state.editingSection,
          editValue = _this$state.editValue;
      this.setState({
        savingDetails: true
      });
      this.props.onUpdateDetails(_defineProperty({}, editingSection, editValue)).then(function () {
        _this4.setState({
          editingSection: null
        });
      }).finally(function () {
        _this4.setState({
          savingDetails: false
        });
      });
    }
  }, {
    key: "handleTitleSave",
    value: function handleTitleSave() {
      var _this5 = this;

      var title = this.state.titleValue.trim();
      if (!title || this.state.savingDetails) return;
      this.setState({
        savingDetails: true
      });
      this.props.onUpdateDetails({
        title: title
      }).then(function () {
        return _this5.setState({
          editingTitle: false
        });
      }).catch(function (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        window.alert('Não foi possível salvar o título. Tente novamente.');
      }).finally(function () {
        return _this5.setState({
          savingDetails: false
        });
      });
    }
  }, {
    key: "handleCoverClick",
    value: function handleCoverClick() {
      if (this.coverInput.current) {
        this.coverInput.current.click();
      }
    }
  }, {
    key: "handleCoverSelected",
    value: function handleCoverSelected(event) {
      var _this6 = this;

      var file = event.target.files && event.target.files[0];
      event.target.value = '';
      if (!file) return;

      if (!file.type || !/^image\/(png|jpe?g|webp|gif)$/.test(file.type)) {
        window.alert('Selecione uma imagem PNG, JPG, WEBP ou GIF para a capa.');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        window.alert('A capa deve ter no máximo 5MB.');
        return;
      }

      this.setState({
        coverPreview: URL.createObjectURL(file),
        uploadingCover: true
      });
      this.props.onUpdateCover(file).catch(function (err) {
        // Keep the preview visible so the user can retry without losing context.
        // eslint-disable-next-line no-console
        console.error(err);
        window.alert('Não foi possível enviar a capa. Tente novamente.');
      }).finally(function () {
        return _this6.setState({
          uploadingCover: false
        });
      });
    }
  }, {
    key: "handleDeleteProject",
    value: function handleDeleteProject() {
      if (this.props.onDeleteProject) {
        this.props.onDeleteProject();
      }
    }
  }, {
    key: "renderEditableSection",
    value: function renderEditableSection(section, label, placeholder) {
      var _this7 = this;

      var isEditing = this.state.editingSection === section;
      var value = this.props[section];
      var isOwner = this.props.isOwner;
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.section
      }, /*#__PURE__*/react_default.a.createElement("h3", {
        className: project_page_default.a.sectionTitle
      }, label), isEditing ? /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("textarea", {
        className: project_page_default.a.editArea,
        rows: 5,
        value: this.state.editValue,
        placeholder: placeholder,
        onChange: function onChange(e) {
          return _this7.setState({
            editValue: e.target.value
          });
        },
        autoFocus: true
      }), /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.saveRow
      }, /*#__PURE__*/react_default.a.createElement("button", {
        className: project_page_default.a.cancelBtn,
        onClick: function onClick() {
          return _this7.setState({
            editingSection: null
          });
        }
      }, "Cancelar"), /*#__PURE__*/react_default.a.createElement("button", {
        className: project_page_default.a.saveBtn,
        disabled: this.state.savingDetails,
        onClick: this.handleEditSave
      }, this.state.savingDetails ? 'Salvando…' : 'Salvar'))) : /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, value ? /*#__PURE__*/react_default.a.createElement("p", {
        className: project_page_default.a.sectionText
      }, value) : /*#__PURE__*/react_default.a.createElement("p", {
        className: project_page_default.a.emptyText
      }, placeholder), isOwner && /*#__PURE__*/react_default.a.createElement("button", {
        className: project_page_default.a.editBtn,
        onClick: function onClick() {
          return _this7.handleEditStart(section);
        }
      }, /*#__PURE__*/react_default.a.createElement(pen_line["a" /* default */], {
        "aria-hidden": "true",
        className: project_page_default.a.buttonIcon
      }), "Editar ", label.toLowerCase())));
    }
  }, {
    key: "renderAboutTab",
    value: function renderAboutTab() {
      var _this$props = this.props,
          remixedFromId = _this$props.remixedFromId,
          isOwner = _this$props.isOwner,
          visibility = _this$props.visibility,
          onUpdateVisibility = _this$props.onUpdateVisibility;
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, isOwner && /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.editBar
      }, /*#__PURE__*/react_default.a.createElement("span", {
        style: {
          color: '#6e6e8e',
          fontSize: '13px'
        }
      }, "Visibilidade:"), /*#__PURE__*/react_default.a.createElement("select", {
        className: project_page_default.a.visibilitySelect,
        value: visibility,
        onChange: this.handleVisibilityChange
      }, /*#__PURE__*/react_default.a.createElement("option", {
        value: "PRIVATE"
      }, "Privado"), /*#__PURE__*/react_default.a.createElement("option", {
        value: "UNLISTED"
      }, "N\xE3o-listado"), /*#__PURE__*/react_default.a.createElement("option", {
        value: "PUBLIC"
      }, "P\xFAblico"))), this.renderEditableSection('instructions', 'Instruções', 'Como usar este projeto…'), this.renderEditableSection('credits', 'Créditos', 'Créditos e agradecimentos…'), remixedFromId && /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.section
      }, /*#__PURE__*/react_default.a.createElement("h3", {
        className: project_page_default.a.sectionTitle
      }, "Remix"), /*#__PURE__*/react_default.a.createElement("a", {
        className: project_page_default.a.remixBadge,
        href: "#".concat(remixedFromId)
      }, /*#__PURE__*/react_default.a.createElement(share_2["a" /* default */], {
        "aria-hidden": "true",
        className: project_page_default.a.buttonIcon
      }), "Baseado no projeto ", remixedFromId)));
    }
  }, {
    key: "renderCommentsTab",
    value: function renderCommentsTab() {
      var _this8 = this;

      var _this$props2 = this.props,
          isLoggedIn = _this$props2.isLoggedIn,
          comments = _this$props2.comments,
          commentsTotal = _this$props2.commentsTotal,
          commentsPage = _this$props2.commentsPage,
          commentsLoading = _this$props2.commentsLoading,
          currentUserId = _this$props2.currentUserId,
          ownerId = _this$props2.ownerId;
      var _this$state2 = this.state,
          commentText = _this$state2.commentText,
          submittingComment = _this$state2.submittingComment,
          replyParentId = _this$state2.replyParentId,
          replyText = _this$state2.replyText,
          submittingReply = _this$state2.submittingReply;
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, isLoggedIn ? /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.commentInput
      }, /*#__PURE__*/react_default.a.createElement("textarea", {
        className: project_page_default.a.commentInputField,
        placeholder: "Escreva um coment\xE1rio\u2026",
        value: commentText,
        rows: 2,
        maxLength: 500,
        onChange: function onChange(e) {
          return _this8.setState({
            commentText: e.target.value
          });
        },
        onKeyDown: function onKeyDown(e) {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();

            _this8.handleCommentSubmit();
          }
        }
      }), /*#__PURE__*/react_default.a.createElement("button", {
        className: project_page_default.a.commentSubmitBtn,
        disabled: !commentText.trim() || submittingComment,
        onClick: this.handleCommentSubmit
      }, submittingComment ? /*#__PURE__*/react_default.a.createElement(ellipsis["a" /* default */], {
        "aria-hidden": "true",
        size: 16
      }) : /*#__PURE__*/react_default.a.createElement(send["a" /* default */], {
        "aria-hidden": "true",
        size: 16
      }))) : /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.loginPrompt
      }, "Fa\xE7a login para comentar."), commentsLoading ? /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.noComments
      }, "Carregando\u2026") : comments.length === 0 ? /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.noComments
      }, "Nenhum coment\xE1rio ainda. Seja o primeiro!") : /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.commentList
      }, comments.map(function (c) {
        var _c$user;

        return /*#__PURE__*/react_default.a.createElement(project_page_CommentItem, {
          key: c.id,
          comment: c,
          canDelete: isLoggedIn && (((_c$user = c.user) === null || _c$user === void 0 ? void 0 : _c$user.id) === currentUserId || ownerId === currentUserId),
          onDelete: _this8.handleCommentDelete,
          canReply: isLoggedIn,
          onReplyStart: _this8.handleReplyStart,
          onReplyCancel: _this8.handleReplyCancel,
          onReplySubmit: _this8.handleReplySubmit,
          onReplyTextChange: function onReplyTextChange(value) {
            return _this8.setState({
              replyText: value
            });
          },
          replyText: replyText,
          replying: replyParentId === c.id,
          submittingReply: submittingReply,
          currentUserId: currentUserId,
          ownerId: ownerId
        });
      })), commentsTotal > comments.length && /*#__PURE__*/react_default.a.createElement("button", {
        className: project_page_default.a.loadMoreBtn,
        onClick: function onClick() {
          return _this8.props.onLoadComments(commentsPage + 1);
        }
      }, "Carregar mais (", commentsTotal - comments.length, " restantes)"));
    }
  }, {
    key: "renderDetailsSections",
    value: function renderDetailsSections() {
      var _this$props3 = this.props,
          remixedFromId = _this$props3.remixedFromId,
          isOwner = _this$props3.isOwner,
          visibility = _this$props3.visibility;
      return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, isOwner && /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.editBar
      }, /*#__PURE__*/react_default.a.createElement("span", null, "Visibilidade:"), /*#__PURE__*/react_default.a.createElement("select", {
        className: project_page_default.a.visibilitySelect,
        value: visibility,
        onChange: this.handleVisibilityChange
      }, /*#__PURE__*/react_default.a.createElement("option", {
        value: "PRIVATE"
      }, "Privado"), /*#__PURE__*/react_default.a.createElement("option", {
        value: "UNLISTED"
      }, "N\xE3o-listado"), /*#__PURE__*/react_default.a.createElement("option", {
        value: "PUBLIC"
      }, "P\xFAblico"))), this.renderEditableSection('instructions', 'Instruções', 'Como usar este projeto…'), this.renderEditableSection('credits', 'Notas e Créditos', 'Créditos e agradecimentos…'), remixedFromId && /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.section
      }, /*#__PURE__*/react_default.a.createElement("h3", {
        className: project_page_default.a.sectionTitle
      }, "Remix"), /*#__PURE__*/react_default.a.createElement("a", {
        className: project_page_default.a.remixBadge,
        href: "#".concat(remixedFromId)
      }, "Baseado no projeto ", remixedFromId)));
    }
  }, {
    key: "render",
    value: function render() {
      var _this9 = this;

      var _this$props4 = this.props,
          loading = _this$props4.loading,
          title = _this$props4.title,
          owner = _this$props4.owner,
          thumbnailUrl = _this$props4.thumbnailUrl,
          visibility = _this$props4.visibility,
          likeCount = _this$props4.likeCount,
          favoriteCount = _this$props4.favoriteCount,
          viewCount = _this$props4.viewCount,
          commentCount = _this$props4.commentCount,
          isLiked = _this$props4.isLiked,
          isFavorited = _this$props4.isFavorited,
          isLoggedIn = _this$props4.isLoggedIn,
          isOwner = _this$props4.isOwner,
          createdAt = _this$props4.createdAt,
          projectId = _this$props4.projectId,
          renderPlayer = _this$props4.renderPlayer;
      var currentThumbnail = this.state.coverPreview || thumbnailUrl;
      if (!projectId) return null;
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.page
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.panel
      }, loading ? /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.loadingWrap
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.spinner
      }), /*#__PURE__*/react_default.a.createElement("span", null, "Carregando projeto\u2026")) : /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.header
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.thumbnailWrap
      }, currentThumbnail ? /*#__PURE__*/react_default.a.createElement("img", {
        className: project_page_default.a.thumbnail,
        src: currentThumbnail,
        alt: title
      }) : /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.thumbnailPlaceholder
      }, /*#__PURE__*/react_default.a.createElement(code_xml["a" /* default */], {
        "aria-hidden": "true",
        size: 28
      })), isOwner && /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("input", {
        ref: this.coverInput,
        accept: "image/png,image/jpeg,image/webp,image/gif",
        className: project_page_default.a.coverInput,
        type: "file",
        onChange: this.handleCoverSelected
      }), /*#__PURE__*/react_default.a.createElement("button", {
        className: project_page_default.a.coverButton,
        disabled: this.state.uploadingCover,
        onClick: this.handleCoverClick
      }, /*#__PURE__*/react_default.a.createElement(upload["a" /* default */], {
        "aria-hidden": "true",
        className: project_page_default.a.buttonIcon
      }), this.state.uploadingCover ? 'Enviando…' : 'Alterar capa'))), /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.meta
      }, this.state.editingTitle ? /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.titleEditRow
      }, /*#__PURE__*/react_default.a.createElement("input", {
        className: project_page_default.a.titleInput,
        value: this.state.titleValue,
        maxLength: 120,
        onChange: function onChange(e) {
          return _this9.setState({
            titleValue: e.target.value
          });
        },
        onKeyDown: function onKeyDown(e) {
          if (e.key === 'Enter') _this9.handleTitleSave();

          if (e.key === 'Escape') {
            _this9.setState({
              editingTitle: false,
              titleValue: title || ''
            });
          }
        },
        autoFocus: true
      }), /*#__PURE__*/react_default.a.createElement("button", {
        className: project_page_default.a.saveBtn,
        disabled: !this.state.titleValue.trim() || this.state.savingDetails,
        onClick: this.handleTitleSave
      }, "Salvar"), /*#__PURE__*/react_default.a.createElement("button", {
        className: project_page_default.a.cancelBtn,
        onClick: function onClick() {
          return _this9.setState({
            editingTitle: false,
            titleValue: title || ''
          });
        }
      }, "Cancelar")) : /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.titleRow
      }, /*#__PURE__*/react_default.a.createElement("h1", {
        className: project_page_default.a.title
      }, title || 'Sem título'), isOwner && /*#__PURE__*/react_default.a.createElement("button", {
        className: project_page_default.a.titleEditButton,
        onClick: function onClick() {
          return _this9.setState({
            editingTitle: true,
            titleValue: title || ''
          });
        }
      }, /*#__PURE__*/react_default.a.createElement(pen_line["a" /* default */], {
        "aria-hidden": "true",
        className: project_page_default.a.buttonIcon
      }), "Editar t\xEDtulo")), /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.authorRow
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.avatar
      }, owner !== null && owner !== void 0 && owner.avatarUrl ? /*#__PURE__*/react_default.a.createElement("img", {
        src: owner.avatarUrl,
        alt: owner.username,
        style: {
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          objectFit: 'cover'
        }
      }) : ((owner === null || owner === void 0 ? void 0 : owner.name) || '?')[0].toUpperCase()), /*#__PURE__*/react_default.a.createElement("span", {
        className: project_page_default.a.authorName
      }, "por ", /*#__PURE__*/react_default.a.createElement("strong", null, (owner === null || owner === void 0 ? void 0 : owner.name) || (owner === null || owner === void 0 ? void 0 : owner.username) || '…'))), /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.dateLine
      }, "Criado em ", project_page_formatDate(createdAt)), /*#__PURE__*/react_default.a.createElement(project_page_VisibilityBadge, {
        visibility: visibility
      }))), /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.actionBar
      }, /*#__PURE__*/react_default.a.createElement("a", {
        className: "".concat(project_page_default.a.statBtn, " ").concat(project_page_default.a.editorLink),
        href: "#/editor/".concat(projectId)
      }, /*#__PURE__*/react_default.a.createElement(code_xml["a" /* default */], {
        "aria-hidden": "true",
        className: project_page_default.a.buttonIcon
      }), "Ver por dentro"), /*#__PURE__*/react_default.a.createElement("button", {
        className: "".concat(project_page_default.a.statBtn, " ").concat(isLiked ? project_page_default.a.statBtnLiked : ''),
        onClick: this.handleLike,
        disabled: !isLoggedIn,
        title: isLoggedIn ? isLiked ? 'Descurtir' : 'Curtir' : 'Faça login para curtir'
      }, /*#__PURE__*/react_default.a.createElement(heart["a" /* default */], {
        "aria-hidden": "true",
        className: project_page_default.a.buttonIcon,
        fill: isLiked ? 'currentColor' : 'none'
      }), likeCount), /*#__PURE__*/react_default.a.createElement("button", {
        className: "".concat(project_page_default.a.statBtn, " ").concat(isFavorited ? project_page_default.a.statBtnFavorited : ''),
        onClick: this.handleFavorite,
        disabled: !isLoggedIn,
        title: isLoggedIn ? isFavorited ? 'Desfavoritar' : 'Favoritar' : 'Faça login para favoritar'
      }, /*#__PURE__*/react_default.a.createElement(star["a" /* default */], {
        "aria-hidden": "true",
        className: project_page_default.a.buttonIcon,
        fill: isFavorited ? 'currentColor' : 'none'
      }), favoriteCount), /*#__PURE__*/react_default.a.createElement("span", {
        className: project_page_default.a.viewStat
      }, /*#__PURE__*/react_default.a.createElement(eye["a" /* default */], {
        "aria-hidden": "true",
        className: project_page_default.a.metricIcon
      }), viewCount), /*#__PURE__*/react_default.a.createElement("span", {
        className: project_page_default.a.viewStat
      }, /*#__PURE__*/react_default.a.createElement(message_circle["a" /* default */], {
        "aria-hidden": "true",
        className: project_page_default.a.metricIcon
      }), commentCount), isLoggedIn && !isOwner && this.props.onRemix && /*#__PURE__*/react_default.a.createElement("button", {
        className: "".concat(project_page_default.a.statBtn, " ").concat(project_page_default.a.remixBtn),
        onClick: this.handleRemix
      }, /*#__PURE__*/react_default.a.createElement(share_2["a" /* default */], {
        "aria-hidden": "true",
        className: project_page_default.a.buttonIcon
      }), "Remixar"), isOwner && this.props.onDeleteProject && /*#__PURE__*/react_default.a.createElement("button", {
        className: "".concat(project_page_default.a.statBtn, " ").concat(project_page_default.a.deleteProjectBtn),
        onClick: this.handleDeleteProject
      }, /*#__PURE__*/react_default.a.createElement(trash_2["a" /* default */], {
        "aria-hidden": "true",
        className: project_page_default.a.buttonIcon
      }), "Excluir projeto")), /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.mainGrid
      }, /*#__PURE__*/react_default.a.createElement("section", {
        className: project_page_default.a.playerColumn
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.playerFrame
      }, renderPlayer ? renderPlayer() : thumbnailUrl ? /*#__PURE__*/react_default.a.createElement("img", {
        src: thumbnailUrl,
        alt: title
      }) : /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.playerFallback
      }, "DOGOBLOCK"))), /*#__PURE__*/react_default.a.createElement("aside", {
        className: project_page_default.a.infoColumn
      }, this.renderDetailsSections())), /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.lowerBand
      }, /*#__PURE__*/react_default.a.createElement("section", null, /*#__PURE__*/react_default.a.createElement("div", {
        className: project_page_default.a.lowerHeader
      }, /*#__PURE__*/react_default.a.createElement("h2", null, "Coment\xE1rios"), /*#__PURE__*/react_default.a.createElement("span", null, /*#__PURE__*/react_default.a.createElement(message_circle["a" /* default */], {
        "aria-hidden": "true",
        className: project_page_default.a.lowerHeaderIcon
      }), commentCount)), this.renderCommentsTab())))));
    }
  }]);

  return ProjectPage;
}(react_default.a.Component);

project_page_ProjectPage.propTypes = {
  projectId: prop_types_default.a.string,
  loading: prop_types_default.a.bool,
  title: prop_types_default.a.string,
  description: prop_types_default.a.string,
  instructions: prop_types_default.a.string,
  credits: prop_types_default.a.string,
  thumbnailUrl: prop_types_default.a.string,
  visibility: prop_types_default.a.string,
  owner: prop_types_default.a.object,
  ownerId: prop_types_default.a.string,
  remixedFromId: prop_types_default.a.string,
  likeCount: prop_types_default.a.number,
  favoriteCount: prop_types_default.a.number,
  viewCount: prop_types_default.a.number,
  commentCount: prop_types_default.a.number,
  isLiked: prop_types_default.a.bool,
  isFavorited: prop_types_default.a.bool,
  isLoggedIn: prop_types_default.a.bool,
  isOwner: prop_types_default.a.bool,
  currentUserId: prop_types_default.a.string,
  comments: prop_types_default.a.array,
  commentsTotal: prop_types_default.a.number,
  commentsPage: prop_types_default.a.number,
  commentsLoading: prop_types_default.a.bool,
  createdAt: prop_types_default.a.string,
  onClose: prop_types_default.a.func,
  onLike: prop_types_default.a.func,
  onUnlike: prop_types_default.a.func,
  onFavorite: prop_types_default.a.func,
  onUnfavorite: prop_types_default.a.func,
  onRemix: prop_types_default.a.func,
  onPostComment: prop_types_default.a.func,
  onDeleteComment: prop_types_default.a.func,
  onDeleteProject: prop_types_default.a.func,
  onLoadComments: prop_types_default.a.func,
  onUpdateVisibility: prop_types_default.a.func,
  onUpdateDetails: prop_types_default.a.func,
  onUpdateCover: prop_types_default.a.func,
  renderPlayer: prop_types_default.a.func
};
project_page_ProjectPage.defaultProps = {
  loading: false,
  likeCount: 0,
  favoriteCount: 0,
  viewCount: 0,
  commentCount: 0,
  isLiked: false,
  isFavorited: false,
  isLoggedIn: false,
  isOwner: false,
  comments: [],
  commentsTotal: 0,
  commentsPage: 1,
  commentsLoading: false,
  onLike: function onLike() {},
  onUnlike: function onUnlike() {},
  onFavorite: function onFavorite() {},
  onUnfavorite: function onUnfavorite() {},
  onRemix: null,
  onPostComment: function onPostComment() {
    return Promise.resolve();
  },
  onDeleteComment: function onDeleteComment() {},
  onDeleteProject: null,
  onLoadComments: function onLoadComments() {},
  onUpdateVisibility: function onUpdateVisibility() {},
  onUpdateDetails: function onUpdateDetails() {
    return Promise.resolve();
  },
  onUpdateCover: function onUpdateCover() {
    return Promise.resolve();
  }
};
/* harmony default export */ var project_page_project_page = (project_page_ProjectPage);
// CONCATENATED MODULE: ./src/containers/project-page.jsx
function containers_project_page_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { containers_project_page_typeof = function _typeof(obj) { return typeof obj; }; } else { containers_project_page_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return containers_project_page_typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function containers_project_page_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function containers_project_page_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function containers_project_page_createClass(Constructor, protoProps, staticProps) { if (protoProps) containers_project_page_defineProperties(Constructor.prototype, protoProps); if (staticProps) containers_project_page_defineProperties(Constructor, staticProps); return Constructor; }

function containers_project_page_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) containers_project_page_setPrototypeOf(subClass, superClass); }

function containers_project_page_setPrototypeOf(o, p) { containers_project_page_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return containers_project_page_setPrototypeOf(o, p); }

function containers_project_page_createSuper(Derived) { var hasNativeReflectConstruct = containers_project_page_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = containers_project_page_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = containers_project_page_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return containers_project_page_possibleConstructorReturn(this, result); }; }

function containers_project_page_possibleConstructorReturn(self, call) { if (call && (containers_project_page_typeof(call) === "object" || typeof call === "function")) { return call; } return containers_project_page_assertThisInitialized(self); }

function containers_project_page_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function containers_project_page_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function containers_project_page_getPrototypeOf(o) { containers_project_page_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return containers_project_page_getPrototypeOf(o); }









var project_page_ProjectPageContainer = /*#__PURE__*/function (_React$Component) {
  containers_project_page_inherits(ProjectPageContainer, _React$Component);

  var _super = containers_project_page_createSuper(ProjectPageContainer);

  function ProjectPageContainer(props) {
    var _this;

    containers_project_page_classCallCheck(this, ProjectPageContainer);

    _this = _super.call(this, props);
    _this.handleLike = _this.handleLike.bind(containers_project_page_assertThisInitialized(_this));
    _this.handleUnlike = _this.handleUnlike.bind(containers_project_page_assertThisInitialized(_this));
    _this.handleFavorite = _this.handleFavorite.bind(containers_project_page_assertThisInitialized(_this));
    _this.handleUnfavorite = _this.handleUnfavorite.bind(containers_project_page_assertThisInitialized(_this));
    _this.handleRemix = _this.handleRemix.bind(containers_project_page_assertThisInitialized(_this));
    _this.handlePostComment = _this.handlePostComment.bind(containers_project_page_assertThisInitialized(_this));
    _this.handleDeleteComment = _this.handleDeleteComment.bind(containers_project_page_assertThisInitialized(_this));
    _this.handleLoadComments = _this.handleLoadComments.bind(containers_project_page_assertThisInitialized(_this));
    _this.handleUpdateVisibility = _this.handleUpdateVisibility.bind(containers_project_page_assertThisInitialized(_this));
    _this.handleUpdateDetails = _this.handleUpdateDetails.bind(containers_project_page_assertThisInitialized(_this));
    _this.handleUpdateCover = _this.handleUpdateCover.bind(containers_project_page_assertThisInitialized(_this));
    return _this;
  }

  containers_project_page_createClass(ProjectPageContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var projectId = this.props.projectId;

      if (projectId) {
        this.loadDetails(projectId); // Record a view (fire and forget)

        Object(dogoblock_api["B" /* recordProjectView */])(projectId).catch(function () {});
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.projectId && this.props.projectId !== prevProps.projectId) {
        this.loadDetails(this.props.projectId);
      }
    }
  }, {
    key: "loadDetails",
    value: function loadDetails(projectId) {
      var _this2 = this;

      this.props.onSetLoading(true);
      this.props.onSetComments([], 0, 1);
      Object(dogoblock_api["o" /* getProjectDetails */])(projectId).then(function (details) {
        if (_this2.props.projectId !== projectId) return;

        _this2.props.onSetDetails(details);

        _this2.handleLoadComments(1);
      }).catch(function (err) {
        console.error('Failed to load project details', err);
      }).finally(function () {
        if (_this2.props.projectId === projectId) {
          _this2.props.onSetLoading(false);
        }
      });
    }
  }, {
    key: "handleLike",
    value: function handleLike() {
      var _this3 = this;

      Object(dogoblock_api["r" /* likeProject */])(this.props.projectId).then(function (res) {
        return _this3.props.onSetLike(res.isLiked, res.likeCount);
      }).catch(console.error);
    }
  }, {
    key: "handleUnlike",
    value: function handleUnlike() {
      var _this4 = this;

      Object(dogoblock_api["G" /* unlikeProject */])(this.props.projectId).then(function (res) {
        return _this4.props.onSetLike(res.isLiked, res.likeCount);
      }).catch(console.error);
    }
  }, {
    key: "handleFavorite",
    value: function handleFavorite() {
      var _this5 = this;

      Object(dogoblock_api["i" /* favoriteProject */])(this.props.projectId).then(function (res) {
        return _this5.props.onSetFavorite(res.isFavorited, res.favoriteCount);
      }).catch(console.error);
    }
  }, {
    key: "handleUnfavorite",
    value: function handleUnfavorite() {
      var _this6 = this;

      Object(dogoblock_api["F" /* unfavoriteProject */])(this.props.projectId).then(function (res) {
        return _this6.props.onSetFavorite(res.isFavorited, res.favoriteCount);
      }).catch(console.error);
    }
  }, {
    key: "handleRemix",
    value: function handleRemix() {
      if (this.props.onRemix) {
        this.props.onRemix(this.props.projectId);
      }
    }
  }, {
    key: "handlePostComment",
    value: function handlePostComment(content, parentId) {
      var _this7 = this;

      return Object(dogoblock_api["A" /* postComment */])(this.props.projectId, content, parentId).then(function (comment) {
        return _this7.props.onAddComment(comment);
      });
    }
  }, {
    key: "handleDeleteComment",
    value: function handleDeleteComment(commentId) {
      var _this8 = this;

      Object(dogoblock_api["c" /* deleteComment */])(this.props.projectId, commentId).then(function (res) {
        return _this8.props.onRemoveComment(commentId, res && res.deletedCount);
      }).catch(console.error);
    }
  }, {
    key: "handleLoadComments",
    value: function handleLoadComments(page) {
      var _this9 = this;

      var projectId = this.props.projectId;
      Object(dogoblock_api["l" /* getComments */])(projectId, page).then(function (res) {
        if (_this9.props.projectId !== projectId) return;

        _this9.props.onSetComments(res.comments, res.total, res.page);
      }).catch(console.error);
    }
  }, {
    key: "handleUpdateVisibility",
    value: function handleUpdateVisibility(visibility) {
      var _this10 = this;

      Object(dogoblock_api["J" /* updateProjectVisibility */])(this.props.projectId, visibility).then(function (res) {
        _this10.props.onSetDetails(Object.assign({}, _this10.props, {
          visibility: res.visibility
        }));
      }).catch(console.error);
    }
  }, {
    key: "handleUpdateDetails",
    value: function handleUpdateDetails(patch) {
      var _this11 = this;

      return Object(dogoblock_api["I" /* updateProjectDetails */])(this.props.projectId, patch).then(function (res) {
        _this11.props.onSetDetails(Object.assign({}, _this11.props, res));
      });
    }
  }, {
    key: "handleUpdateCover",
    value: function handleUpdateCover(coverFile) {
      var _this12 = this;

      return Object(dogoblock_api["K" /* uploadProjectCover */])(this.props.projectId, coverFile).then(function (res) {
        _this12.props.onSetDetails(Object.assign({}, _this12.props, res));

        return res;
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.props.projectId) return null;
      return /*#__PURE__*/react_default.a.createElement(project_page_project_page, _extends({}, this.props, {
        onLike: this.handleLike,
        onUnlike: this.handleUnlike,
        onFavorite: this.handleFavorite,
        onUnfavorite: this.handleUnfavorite,
        onRemix: this.handleRemix,
        onPostComment: this.handlePostComment,
        onDeleteComment: this.handleDeleteComment,
        onLoadComments: this.handleLoadComments,
        onUpdateVisibility: this.handleUpdateVisibility,
        onUpdateDetails: this.handleUpdateDetails,
        onUpdateCover: this.handleUpdateCover,
        onDeleteProject: this.props.onDeleteProject
      }));
    }
  }]);

  return ProjectPageContainer;
}(react_default.a.Component);

project_page_ProjectPageContainer.propTypes = {
  projectId: prop_types_default.a.string,
  isLoggedIn: prop_types_default.a.bool,
  isOwner: prop_types_default.a.bool,
  currentUserId: prop_types_default.a.string,
  ownerId: prop_types_default.a.string,
  loading: prop_types_default.a.bool,
  title: prop_types_default.a.string,
  description: prop_types_default.a.string,
  instructions: prop_types_default.a.string,
  credits: prop_types_default.a.string,
  thumbnailUrl: prop_types_default.a.string,
  visibility: prop_types_default.a.string,
  owner: prop_types_default.a.object,
  remixedFromId: prop_types_default.a.string,
  likeCount: prop_types_default.a.number,
  favoriteCount: prop_types_default.a.number,
  viewCount: prop_types_default.a.number,
  commentCount: prop_types_default.a.number,
  isLiked: prop_types_default.a.bool,
  isFavorited: prop_types_default.a.bool,
  comments: prop_types_default.a.array,
  commentsTotal: prop_types_default.a.number,
  commentsPage: prop_types_default.a.number,
  onClose: prop_types_default.a.func,
  onDeleteProject: prop_types_default.a.func,
  onRemix: prop_types_default.a.func,
  renderPlayer: prop_types_default.a.func,
  onSetLoading: prop_types_default.a.func,
  onSetDetails: prop_types_default.a.func,
  onSetLike: prop_types_default.a.func,
  onSetFavorite: prop_types_default.a.func,
  onSetComments: prop_types_default.a.func,
  onAddComment: prop_types_default.a.func,
  onRemoveComment: prop_types_default.a.func
};

var mapStateToProps = function mapStateToProps(state) {
  var ix = state.scratchGui.projectInteractions;
  var session = state.scratchGui.session || state.session || {};
  var user = session.session && session.session.user;
  var userId = user && user.id;
  var isLoggedIn = !!user;
  return {
    loading: ix.loading,
    title: ix.title,
    description: ix.description,
    instructions: ix.instructions,
    credits: ix.credits,
    thumbnailUrl: ix.thumbnailUrl,
    visibility: ix.visibility,
    owner: ix.owner,
    ownerId: ix.owner && ix.owner.id,
    remixedFromId: ix.remixedFromId,
    likeCount: ix.likeCount,
    favoriteCount: ix.favoriteCount,
    viewCount: ix.viewCount,
    commentCount: ix.commentCount,
    isLiked: ix.isLiked,
    isFavorited: ix.isFavorited,
    comments: ix.comments,
    commentsTotal: ix.commentsTotal,
    commentsPage: ix.commentsPage,
    commentsLoading: ix.commentsLoading,
    createdAt: ix.createdAt,
    isLoggedIn: isLoggedIn,
    currentUserId: userId,
    isOwner: isLoggedIn && ix.owner && ix.owner.id === userId
  };
};

var project_page_mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onSetLoading: function onSetLoading(loading) {
      return dispatch(Object(project_interactions["h" /* setLoading */])(loading));
    },
    onSetDetails: function onSetDetails(details) {
      return dispatch(Object(project_interactions["i" /* setProjectDetails */])(details));
    },
    onSetLike: function onSetLike(isLiked, likeCount) {
      return dispatch(Object(project_interactions["g" /* setLike */])(isLiked, likeCount));
    },
    onSetFavorite: function onSetFavorite(isFavorited, favoriteCount) {
      return dispatch(Object(project_interactions["f" /* setFavorite */])(isFavorited, favoriteCount));
    },
    onSetComments: function onSetComments(comments, total, page) {
      return dispatch(Object(project_interactions["e" /* setComments */])(comments, total, page));
    },
    onAddComment: function onAddComment(comment) {
      return dispatch(Object(project_interactions["a" /* addComment */])(comment));
    },
    onRemoveComment: function onRemoveComment(commentId, deletedCount) {
      return dispatch(Object(project_interactions["d" /* removeComment */])(commentId, deletedCount));
    }
  };
};

/* harmony default export */ var containers_project_page = (Object(react_redux_es["b" /* connect */])(mapStateToProps, project_page_mapDispatchToProps)(project_page_ProjectPageContainer));
// EXTERNAL MODULE: ./src/lib/message-box.js
var message_box = __webpack_require__(155);

// EXTERNAL MODULE: ./src/lib/analytics.js
var analytics = __webpack_require__(114);

// EXTERNAL MODULE: ./src/lib/dogoblock-api-config.js
var dogoblock_api_config = __webpack_require__(191);

// CONCATENATED MODULE: ./src/lib/notifications-manager.js
function notifications_manager_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function notifications_manager_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function notifications_manager_createClass(Constructor, protoProps, staticProps) { if (protoProps) notifications_manager_defineProperties(Constructor.prototype, protoProps); if (staticProps) notifications_manager_defineProperties(Constructor, staticProps); return Constructor; }


var MIN_RETRY_MS = 2000;
var MAX_RETRY_MS = 32000;
/**
 * Manages a Server-Sent Events connection for notifications.
 * Automatically reconnects with exponential backoff when the connection drops.
 */

var notifications_manager_NotificationsManager = /*#__PURE__*/function () {
  function NotificationsManager() {
    notifications_manager_classCallCheck(this, NotificationsManager);

    this._source = null;
    this._token = null;
    this._retryMs = MIN_RETRY_MS;
    this._retryTimer = null;
    this._destroyed = false;
    this.onNotification = null; // (notification) => void

    this.onUnreadCount = null; // (count) => void

    this.onReconnect = null; // () => void
  }

  notifications_manager_createClass(NotificationsManager, [{
    key: "connect",
    value: function connect(token) {
      if (!token || typeof window === 'undefined' || typeof EventSource === 'undefined') return;
      this._token = token;
      this._destroyed = false;
      this._retryMs = MIN_RETRY_MS;

      this._openStream();
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      this._destroyed = true;

      this._clearRetryTimer();

      this._closeSource();
    }
  }, {
    key: "_openStream",
    value: function _openStream() {
      var _this = this;

      this._closeSource();

      if (!this._token || this._destroyed) return;
      var url = "".concat(Object(dogoblock_api_config["a" /* getApiHost */])(), "/notifications/stream?token=").concat(encodeURIComponent(this._token));
      var source = new EventSource(url);
      this._source = source;
      source.addEventListener('notification', function (event) {
        try {
          var notification = JSON.parse(event.data);
          if (typeof _this.onNotification === 'function') _this.onNotification(notification);
          _this._retryMs = MIN_RETRY_MS; // Reset backoff on successful message
        } catch (_unused) {// Ignore malformed payloads
        }
      });
      source.addEventListener('unread-count', function (event) {
        try {
          var data = JSON.parse(event.data);

          if (typeof _this.onUnreadCount === 'function') {
            _this.onUnreadCount(data.unreadCount || 0);
          }

          _this._retryMs = MIN_RETRY_MS;
        } catch (_unused2) {// Ignore malformed payloads
        }
      });

      source.onerror = function () {
        _this._closeSource();

        if (!_this._destroyed) _this._scheduleRetry();
      };
    }
  }, {
    key: "_closeSource",
    value: function _closeSource() {
      if (this._source) {
        this._source.close();

        this._source = null;
      }
    }
  }, {
    key: "_scheduleRetry",
    value: function _scheduleRetry() {
      var _this2 = this;

      this._clearRetryTimer();

      if (this._destroyed) return;
      this._retryTimer = setTimeout(function () {
        if (!_this2._destroyed) {
          if (typeof _this2.onReconnect === 'function') _this2.onReconnect();

          _this2._openStream();
        }
      }, this._retryMs);
      this._retryMs = Math.min(this._retryMs * 2, MAX_RETRY_MS);
    }
  }, {
    key: "_clearRetryTimer",
    value: function _clearRetryTimer() {
      if (this._retryTimer) {
        clearTimeout(this._retryTimer);
        this._retryTimer = null;
      }
    }
  }]);

  return NotificationsManager;
}();

/* harmony default export */ var notifications_manager = (notifications_manager_NotificationsManager);
// EXTERNAL MODULE: ./src/lib/auth-session.js
var auth_session = __webpack_require__(143);

// EXTERNAL MODULE: ./src/reducers/session.js
var reducers_session = __webpack_require__(372);

// EXTERNAL MODULE: ./src/reducers/mode.js
var mode = __webpack_require__(178);

// EXTERNAL MODULE: ./static/dogoblock_logo_full.svg
var dogoblock_logo_full = __webpack_require__(324);
var dogoblock_logo_full_default = /*#__PURE__*/__webpack_require__.n(dogoblock_logo_full);

// EXTERNAL MODULE: ./static/hero-illustration.png
var hero_illustration = __webpack_require__(1222);
var hero_illustration_default = /*#__PURE__*/__webpack_require__.n(hero_illustration);

// EXTERNAL MODULE: ./src/playground/dogoblock-web-app.css
var dogoblock_web_app = __webpack_require__(14);
var dogoblock_web_app_default = /*#__PURE__*/__webpack_require__.n(dogoblock_web_app);

// CONCATENATED MODULE: ./src/playground/dogoblock-web-app.jsx
function dogoblock_web_app_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { dogoblock_web_app_typeof = function _typeof(obj) { return typeof obj; }; } else { dogoblock_web_app_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return dogoblock_web_app_typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { dogoblock_web_app_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function dogoblock_web_app_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || dogoblock_web_app_unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return dogoblock_web_app_arrayLikeToArray(arr); }

function dogoblock_web_app_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function dogoblock_web_app_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function dogoblock_web_app_createClass(Constructor, protoProps, staticProps) { if (protoProps) dogoblock_web_app_defineProperties(Constructor.prototype, protoProps); if (staticProps) dogoblock_web_app_defineProperties(Constructor, staticProps); return Constructor; }

function dogoblock_web_app_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) dogoblock_web_app_setPrototypeOf(subClass, superClass); }

function dogoblock_web_app_setPrototypeOf(o, p) { dogoblock_web_app_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return dogoblock_web_app_setPrototypeOf(o, p); }

function dogoblock_web_app_createSuper(Derived) { var hasNativeReflectConstruct = dogoblock_web_app_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = dogoblock_web_app_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = dogoblock_web_app_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return dogoblock_web_app_possibleConstructorReturn(this, result); }; }

function dogoblock_web_app_possibleConstructorReturn(self, call) { if (call && (dogoblock_web_app_typeof(call) === "object" || typeof call === "function")) { return call; } return dogoblock_web_app_assertThisInitialized(self); }

function dogoblock_web_app_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function dogoblock_web_app_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function dogoblock_web_app_getPrototypeOf(o) { dogoblock_web_app_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return dogoblock_web_app_getPrototypeOf(o); }

function dogoblock_web_app_slicedToArray(arr, i) { return dogoblock_web_app_arrayWithHoles(arr) || dogoblock_web_app_iterableToArrayLimit(arr, i) || dogoblock_web_app_unsupportedIterableToArray(arr, i) || dogoblock_web_app_nonIterableRest(); }

function dogoblock_web_app_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function dogoblock_web_app_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return dogoblock_web_app_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return dogoblock_web_app_arrayLikeToArray(o, minLen); }

function dogoblock_web_app_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function dogoblock_web_app_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function dogoblock_web_app_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





















var NOTIFICATIONS_PAGE_SIZE = 10;
var TOAST_DISMISS_MS = 5000;

var parseRoute = function parseRoute() {
  var rawHash = window.location.hash.replace(/^#/, '');
  var legacyMatch = rawHash.match(/^(\d+)$/);

  if (legacyMatch) {
    return {
      name: 'editor',
      projectId: legacyMatch[1]
    };
  }

  var _split = (rawHash || '/').split('?'),
      _split2 = dogoblock_web_app_slicedToArray(_split, 2),
      path = _split2[0],
      _split2$ = _split2[1],
      query = _split2$ === void 0 ? '' : _split2$;

  var parts = path.split('/').filter(Boolean);
  var queryParams = new URLSearchParams(query);
  if (!parts.length) return {
    name: 'home'
  };
  if (parts[0] === 'login') return {
    name: 'login',
    next: queryParams.get('next')
  };
  if (parts[0] === 'register') return {
    name: 'register',
    next: queryParams.get('next')
  };
  if (parts[0] === 'forgot-password') return {
    name: 'forgotPassword'
  };
  if (parts[0] === 'reset-password') return {
    name: 'resetPassword',
    token: queryParams.get('token')
  };
  if (parts[0] === 'profile') return {
    name: 'profile'
  };
  if (parts[0] === 'user' && parts[1]) return {
    name: 'publicProfile',
    username: parts[1]
  };
  if (parts[0] === 'explore') return {
    name: 'explore'
  };

  if (parts[0] === 'editor') {
    return {
      name: 'editor',
      projectId: parts[1],
      importProject: queryParams.has('import'),
      importKey: queryParams.get('import')
    };
  }

  if (parts[0] === 'projects' && parts[1]) return {
    name: 'projectDetails',
    projectId: parts[1]
  };
  return {
    name: 'projects'
  };
};

var dogoblock_web_app_navigate = function navigate(hash) {
  window.location.hash = hash;
};

var noop = function noop() {};

var dogoblock_web_app_trackEvent = function trackEvent(action, label) {
  analytics["a" /* default */].event({
    category: 'dogoblock-web',
    action: action,
    label: label
  });
};

var currentRouteHash = function currentRouteHash() {
  return window.location.hash.replace(/^#/, '') || '/';
};

var loginRouteFor = function loginRouteFor(route) {
  return "/login?next=".concat(encodeURIComponent(route || currentRouteHash()));
};

var dogoblock_web_app_formatDate = function formatDate(value) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('pt-BR');
};

var getVisibilityLabel = function getVisibilityLabel(visibility) {
  if (visibility === 'PUBLIC') return 'Publico';
  if (visibility === 'UNLISTED') return 'Nao listado';
  return 'Privado';
};

var getProjectThumbnail = function getProjectThumbnail(project) {
  return project.thumbnailUrl || project.thumbnail || project.image || project.thumb || null;
};

var getProjectAuthor = function getProjectAuthor(project) {
  return project.author || project.username || project.owner && (project.owner.username || project.owner.name) || project.ownerUsername || 'Dogoblocker';
};

var getProjectInstructions = function getProjectInstructions(project) {
  return project.instructions || project.description || 'O autor ainda nao adicionou instrucoes para este projeto.';
};

var getProjectCredits = function getProjectCredits(project) {
  return project.notesAndCredits || project.credits || project.notes || 'O autor ainda nao adicionou notas ou creditos.';
};

var getProjectMetric = function getProjectMetric(project, fields) {
  for (var i = 0; i < fields.length; i++) {
    var value = project[fields[i]];
    if (typeof value === 'number') return value;
  }

  return 0;
};

var getProjectPublicUrl = function getProjectPublicUrl(project) {
  var url = new URL(window.location.href);
  url.hash = "/projects/".concat(project.id);
  return url.toString();
};

var dogoblock_web_app_getInitials = function getInitials(user) {
  return (user && (user.name || user.username) || '?').split(' ').map(function (part) {
    return part[0];
  }).slice(0, 2).join('').toUpperCase();
};

var dogoblock_web_app_renderProjectThumbnail = function renderProjectThumbnail(project) {
  var thumbnail = getProjectThumbnail(project);

  if (thumbnail) {
    return /*#__PURE__*/react_default.a.createElement("img", {
      alt: "",
      className: dogoblock_web_app_default.a.projectThumbnailImage,
      src: thumbnail
    });
  }

  return /*#__PURE__*/react_default.a.createElement("div", {
    className: dogoblock_web_app_default.a.projectThumbnailFallback
  }, /*#__PURE__*/react_default.a.createElement("span", null, 'DOGOBLOCK'));
};

var dogoblock_web_app_Icon = function Icon(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/react_default.a.createElement("span", {
    "aria-hidden": "true",
    className: dogoblock_web_app_default.a.iconWrap
  }, children);
};

dogoblock_web_app_Icon.propTypes = {
  children: prop_types_default.a.node
};

var dogoblock_web_app_DogoblockWebApp = /*#__PURE__*/function (_React$Component) {
  dogoblock_web_app_inherits(DogoblockWebApp, _React$Component);

  var _super = dogoblock_web_app_createSuper(DogoblockWebApp);

  function DogoblockWebApp(props) {
    var _this;

    dogoblock_web_app_classCallCheck(this, DogoblockWebApp);

    _this = _super.call(this, props);
    _this.state = {
      route: parseRoute(),
      error: null,
      loading: false,
      copyLinkFeedback: false,
      projects: [],
      projectDetails: null,
      featuredProjectDetails: null,
      profile: null,
      favoriteProjects: [],
      profileTab: 'overview',
      searchQuery: '',
      notifications: [],
      notificationsLoading: false,
      notificationsLoadingMore: false,
      notificationsPage: 1,
      notificationsHasMore: false,
      unreadCount: 0,
      toastNotification: null,
      // project details page state
      pdComments: [],
      pdCommentsLoading: false,
      pdCommentText: '',
      pdReplyToId: null,
      pdReplyText: '',
      pdReplyLoading: false,
      pdInstructions: '',
      pdCredits: '',
      pdSavingDetails: false,
      pdSaveDetailsFeedback: false,
      pdUploadingCover: false,
      pdLiked: false,
      pdFavorited: false,
      pdLikeCount: 0,
      pdStarCount: 0,
      // forgot/reset password
      forgotPasswordSuccess: false,
      resetPasswordSuccess: false,
      // public profile
      publicProfile: null
    };
    _this.handleHashChange = _this.handleHashChange.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleLogin = _this.handleLogin.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleRegister = _this.handleRegister.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleLogout = _this.handleLogout.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleImportProject = _this.handleImportProject.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleDeleteProject = _this.handleDeleteProject.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleProjectCreated = _this.handleProjectCreated.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleNewProject = _this.handleNewProject.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleCopyProjectLink = _this.handleCopyProjectLink.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleOpenCurrentProject = _this.handleOpenCurrentProject.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleOpenProjectDetails = _this.handleOpenProjectDetails.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleDeleteProjectFromCard = _this.handleDeleteProjectFromCard.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleShowMessageBox = _this.handleShowMessageBox.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleToggleVisibility = _this.handleToggleVisibility.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleUpdateVisibility = _this.handleUpdateVisibility.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleNavigateEditor = _this.handleNavigateEditor.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleNavigateExplore = _this.handleNavigateExplore.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleNavigateHome = _this.handleNavigateHome.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleNavigateLogin = _this.handleNavigateLogin.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleNavigateProfile = _this.handleNavigateProfile.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleNavigateProjects = _this.handleNavigateProjects.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleNavigateRegister = _this.handleNavigateRegister.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleRequestLoginToSave = _this.handleRequestLoginToSave.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleLoadNotifications = _this.handleLoadNotifications.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleLoadMoreNotifications = _this.handleLoadMoreNotifications.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleMarkAllNotificationsRead = _this.handleMarkAllNotificationsRead.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleOpenNotification = _this.handleOpenNotification.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleDeleteNotification = _this.handleDeleteNotification.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleDismissToast = _this.handleDismissToast.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleProfileSubmit = _this.handleProfileSubmit.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleProfileTab = _this.handleProfileTab.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleSearchChange = _this.handleSearchChange.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handlePdLike = _this.handlePdLike.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handlePdFavorite = _this.handlePdFavorite.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handlePdRemix = _this.handlePdRemix.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handlePdSaveDetails = _this.handlePdSaveDetails.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handlePdInstructionsChange = _this.handlePdInstructionsChange.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handlePdCreditsChange = _this.handlePdCreditsChange.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handlePdCommentChange = _this.handlePdCommentChange.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handlePdCommentSubmit = _this.handlePdCommentSubmit.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handlePdCommentCancel = _this.handlePdCommentCancel.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handlePdDeleteComment = _this.handlePdDeleteComment.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handlePdReplyOpen = _this.handlePdReplyOpen.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handlePdReplyChange = _this.handlePdReplyChange.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handlePdReplySubmit = _this.handlePdReplySubmit.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handlePdReplyCancel = _this.handlePdReplyCancel.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handlePdDeleteReply = _this.handlePdDeleteReply.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handlePdCoverChange = _this.handlePdCoverChange.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.renderHome = _this.renderHome.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.renderLogin = _this.renderLogin.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.renderRegister = _this.renderRegister.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.renderForgotPassword = _this.renderForgotPassword.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.renderResetPassword = _this.renderResetPassword.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.renderProjects = _this.renderProjects.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.renderProfile = _this.renderProfile.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.renderPublicProfile = _this.renderPublicProfile.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.renderProjectDetails = _this.renderProjectDetails.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.renderEditor = _this.renderEditor.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleForgotPassword = _this.handleForgotPassword.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleResetPassword = _this.handleResetPassword.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleNavigateForgotPassword = _this.handleNavigateForgotPassword.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleNavigatePublicProfile = _this.handleNavigatePublicProfile.bind(dogoblock_web_app_assertThisInitialized(_this));
    return _this;
  }

  dogoblock_web_app_createClass(DogoblockWebApp, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      window.addEventListener('hashchange', this.handleHashChange);
      this.loadRouteData(this.state.route);
      this._notificationsManager = new notifications_manager();

      this._notificationsManager.onNotification = function (notification) {
        _this2.setState(function (prevState) {
          return {
            notifications: [notification].concat(_toConsumableArray(prevState.notifications.filter(function (item) {
              return item.id !== notification.id;
            }))).slice(0, NOTIFICATIONS_PAGE_SIZE)
          };
        }); // Only show toast on non-editor screens


        if (_this2.state.route.name !== 'editor') {
          _this2.showToast(notification);
        }
      };

      this._notificationsManager.onUnreadCount = function (count) {
        _this2.setState({
          unreadCount: count
        });
      };

      this.setupNotifications();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('hashchange', this.handleHashChange);
      if (this.copyLinkTimer) clearTimeout(this.copyLinkTimer);
      if (this._toastTimer) clearTimeout(this._toastTimer);
      if (this._notificationsManager) this._notificationsManager.disconnect();
      this.props.onSetPlayerOnly(false);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var previousUserId = prevProps.user && prevProps.user.id;
      var currentUserId = this.props.user && this.props.user.id;

      if (previousUserId !== currentUserId) {
        this.setupNotifications();
      }
    }
  }, {
    key: "handleHashChange",
    value: function handleHashChange() {
      var _this3 = this;

      var route = parseRoute();
      this.setState({
        route: route,
        error: null
      }, function () {
        return _this3.loadRouteData(route);
      });
    }
  }, {
    key: "loadRouteData",
    value: function loadRouteData(route) {
      var _this4 = this;

      this.props.onSetPlayerOnly(route.name === 'projectDetails');

      if (this.props.user && (route.name === 'login' || route.name === 'register')) {
        dogoblock_web_app_navigate(route.next || '/projects');
        return;
      }

      if (route.name === 'home') {
        this.setState({
          loading: true
        });
        Object(dogoblock_api["v" /* listPublicProjects */])().then(function (projects) {
          return _this4.setState({
            projects: projects,
            loading: false
          });
        }).catch(function () {
          return _this4.setState({
            loading: false
          });
        });
      }

      if (route.name === 'profile') {
        if (!this.props.user) {
          dogoblock_web_app_navigate(loginRouteFor('/profile'));
          return;
        }

        this.setState({
          loading: true,
          error: null,
          featuredProjectDetails: null
        });
        Promise.all([Object(dogoblock_api["n" /* getMyProfile */])(), Object(dogoblock_api["u" /* listProjects */])(), Object(dogoblock_api["s" /* listFavoriteProjects */])()]).then(function (_ref2) {
          var _ref3 = dogoblock_web_app_slicedToArray(_ref2, 3),
              profile = _ref3[0],
              projects = _ref3[1],
              favoriteProjects = _ref3[2];

          _this4.setState({
            profile: profile,
            projects: projects,
            favoriteProjects: favoriteProjects,
            loading: false,
            error: null
          }); // Fetch details for up to 10 projects to find the most-liked one


          var candidates = projects.slice(0, 10);

          if (candidates.length > 0) {
            Promise.all(candidates.map(function (p) {
              return Object(dogoblock_api["o" /* getProjectDetails */])(p.id).catch(function () {
                return null;
              });
            })).then(function (details) {
              var valid = details.filter(Boolean);
              if (!valid.length) return; // Sort by likeCount desc, then favoriteCount desc as tiebreaker

              valid.sort(function (a, b) {
                var likes = (b.likeCount || 0) - (a.likeCount || 0);
                if (likes !== 0) return likes;
                return (b.favoriteCount || 0) - (a.favoriteCount || 0);
              });

              _this4.setState({
                featuredProjectDetails: valid[0]
              });
            }).catch(function () {
              /* silently ignore */
            });
          }
        }).catch(function (error) {
          return _this4.setState({
            error: error.message,
            loading: false
          });
        });
      }

      if (route.name === 'projects' || route.name === 'explore') {
        this.setState({
          loading: true
        });
        var loader = this.props.user && route.name === 'projects' ? dogoblock_api["u" /* listProjects */] : dogoblock_api["v" /* listPublicProjects */];
        loader().then(function (projects) {
          return _this4.setState({
            projects: projects,
            loading: false
          });
        }).catch(function (error) {
          return _this4.setState({
            error: error.message,
            loading: false
          });
        });
      }

      if (route.name === 'publicProfile') {
        var username = route.username;
        this.setState({
          loading: true,
          error: null,
          publicProfile: null
        });
        Object(dogoblock_api["p" /* getPublicUserProfile */])(username).then(function (publicProfile) {
          return _this4.setState({
            publicProfile: publicProfile,
            loading: false,
            error: null
          });
        }).catch(function (error) {
          return _this4.setState({
            error: error.message,
            loading: false
          });
        });
      }

      if (route.name === 'projectDetails') {
        var requestedProjectId = route.projectId;
        this.setState({
          loading: true,
          projectDetails: null,
          pdComments: [],
          pdCommentText: '',
          pdLiked: false,
          pdFavorited: false,
          pdLikeCount: 0,
          pdStarCount: 0
        });
        Promise.all([Object(dogoblock_api["o" /* getProjectDetails */])(requestedProjectId), Object(dogoblock_api["l" /* getComments */])(requestedProjectId).catch(function () {
          return {
            comments: []
          };
        })]).then(function (_ref4) {
          var _ref5 = dogoblock_web_app_slicedToArray(_ref4, 2),
              projectDetails = _ref5[0],
              commentsResult = _ref5[1];

          if (_this4.state.route.name !== 'projectDetails' || _this4.state.route.projectId !== requestedProjectId) {
            return;
          }

          _this4.setState({
            projectDetails: projectDetails,
            loading: false,
            pdComments: commentsResult.comments || commentsResult || [],
            pdInstructions: projectDetails.instructions || '',
            pdCredits: projectDetails.notesAndCredits || projectDetails.credits || projectDetails.notes || '',
            pdLiked: Boolean(projectDetails.liked || projectDetails.isLiked),
            pdFavorited: Boolean(projectDetails.favorited || projectDetails.isFavorited),
            pdLikeCount: getProjectMetric(projectDetails, ['likeCount', 'likes', 'totalLikes']),
            pdStarCount: getProjectMetric(projectDetails, ['favoriteCount', 'favorites', 'starCount'])
          });
        }).catch(function (error) {
          if (_this4.state.route.name !== 'projectDetails' || _this4.state.route.projectId !== requestedProjectId) {
            return;
          }

          _this4.setState({
            error: error.message,
            loading: false
          });
        });
      }
    }
  }, {
    key: "handleLogin",
    value: function handleLogin(event) {
      var _this5 = this;

      event.preventDefault();
      var form = new FormData(event.currentTarget);
      this.setState({
        error: null,
        loading: true
      });
      Object(dogoblock_api["w" /* login */])({
        email: form.get('email'),
        password: form.get('password')
      }).then(function (session) {
        dogoblock_web_app_trackEvent('login success', 'email');

        _this5.props.onLoginSuccess(session);

        dogoblock_web_app_navigate(_this5.state.route.next || '/projects');
      }).catch(function (error) {
        dogoblock_web_app_trackEvent('login error', 'email');

        _this5.setState({
          error: error.message,
          loading: false
        });
      });
    }
  }, {
    key: "handleRegister",
    value: function handleRegister(event) {
      var _this6 = this;

      event.preventDefault();
      var form = new FormData(event.currentTarget);
      this.setState({
        error: null,
        loading: true
      });
      Object(dogoblock_api["C" /* register */])({
        name: form.get('name'),
        username: form.get('username'),
        email: form.get('email'),
        password: form.get('password')
      }).then(function (session) {
        dogoblock_web_app_trackEvent('register success', 'email');

        _this6.props.onLoginSuccess(session);

        dogoblock_web_app_navigate(_this6.state.route.next || '/projects');
      }).catch(function (error) {
        dogoblock_web_app_trackEvent('register error', 'email');

        _this6.setState({
          error: error.message,
          loading: false
        });
      });
    }
  }, {
    key: "handleLogout",
    value: function handleLogout() {
      dogoblock_web_app_trackEvent('logout', 'header');
      this.closeNotificationsStream();
      Object(dogoblock_api["x" /* logout */])();
      this.props.onLogout();
      this.setState({
        notifications: [],
        unreadCount: 0,
        notificationsLoading: false
      });
      dogoblock_web_app_navigate('/projects');
    }
  }, {
    key: "setupNotifications",
    value: function setupNotifications() {
      var _this7 = this;

      if (this._notificationsManager) this._notificationsManager.disconnect();

      if (!this.props.user) {
        this.setState({
          notifications: [],
          unreadCount: 0,
          notificationsLoading: false,
          notificationsPage: 1,
          notificationsHasMore: false
        });
        return;
      }

      Object(dogoblock_api["q" /* getUnreadCount */])().then(function (result) {
        return _this7.setState({
          unreadCount: result.unreadCount || 0
        });
      }).catch(function () {});
      var session = Object(auth_session["c" /* readAuthSession */])();

      if (this._notificationsManager && session && session.accessToken) {
        this._notificationsManager.connect(session.accessToken);
      }
    }
  }, {
    key: "showToast",
    value: function showToast(notification) {
      var _this8 = this;

      if (this._toastTimer) clearTimeout(this._toastTimer);
      this.setState({
        toastNotification: notification
      });
      this._toastTimer = setTimeout(function () {
        _this8.setState({
          toastNotification: null
        });
      }, TOAST_DISMISS_MS);
    }
  }, {
    key: "handleDismissToast",
    value: function handleDismissToast() {
      if (this._toastTimer) clearTimeout(this._toastTimer);
      this.setState({
        toastNotification: null
      });
    }
  }, {
    key: "handleLoadNotifications",
    value: function handleLoadNotifications() {
      var _this9 = this;

      if (!this.props.user) return;
      this.setState({
        notificationsLoading: true,
        notificationsPage: 1
      });
      Object(dogoblock_api["t" /* listNotifications */])(1, NOTIFICATIONS_PAGE_SIZE).then(function (result) {
        return _this9.setState({
          notifications: result.notifications || [],
          unreadCount: result.unreadCount || 0,
          notificationsPage: 1,
          notificationsHasMore: (result.notifications || []).length < (result.total || 0),
          notificationsLoading: false
        });
      }).catch(function (error) {
        return _this9.setState({
          error: error.message,
          notificationsLoading: false
        });
      });
    }
  }, {
    key: "handleLoadMoreNotifications",
    value: function handleLoadMoreNotifications() {
      var _this10 = this;

      if (!this.props.user || this.state.notificationsLoadingMore) return;
      var nextPage = this.state.notificationsPage + 1;
      this.setState({
        notificationsLoadingMore: true
      });
      Object(dogoblock_api["t" /* listNotifications */])(nextPage, NOTIFICATIONS_PAGE_SIZE).then(function (result) {
        var newItems = result.notifications || [];

        _this10.setState(function (prevState) {
          return {
            notifications: [].concat(_toConsumableArray(prevState.notifications), _toConsumableArray(newItems.filter(function (n) {
              return !prevState.notifications.find(function (e) {
                return e.id === n.id;
              });
            }))),
            notificationsPage: nextPage,
            notificationsHasMore: newItems.length === NOTIFICATIONS_PAGE_SIZE && prevState.notifications.length + newItems.length < (result.total || 0),
            notificationsLoadingMore: false
          };
        });
      }).catch(function (error) {
        return _this10.setState({
          error: error.message,
          notificationsLoadingMore: false
        });
      });
    }
  }, {
    key: "handleOpenNotification",
    value: function handleOpenNotification(notification) {
      var _this11 = this;

      var navigateToProject = function navigateToProject() {
        if (notification.projectId) {
          dogoblock_web_app_navigate("/projects/".concat(notification.projectId));
        }
      };

      if (!notification.readAt) {
        Object(dogoblock_api["z" /* markNotificationRead */])(notification.id).then(function (updated) {
          _this11.setState(function (prevState) {
            return {
              notifications: prevState.notifications.map(function (item) {
                return item.id === notification.id ? Object.assign({}, item, updated) : item;
              }),
              unreadCount: Math.max(0, prevState.unreadCount - 1)
            };
          });

          navigateToProject();
        }).catch(function () {
          return navigateToProject();
        });
        return;
      }

      navigateToProject();
    }
  }, {
    key: "handleDeleteNotification",
    value: function handleDeleteNotification(notification) {
      var _this12 = this;

      Object(dogoblock_api["d" /* deleteNotification */])(notification.id).then(function () {
        _this12.setState(function (prevState) {
          return {
            notifications: prevState.notifications.filter(function (item) {
              return item.id !== notification.id;
            }),
            unreadCount: !notification.readAt ? Math.max(0, prevState.unreadCount - 1) : prevState.unreadCount
          };
        });
      }).catch(function (error) {
        return _this12.setState({
          error: error.message
        });
      });
    }
  }, {
    key: "handleMarkAllNotificationsRead",
    value: function handleMarkAllNotificationsRead() {
      var _this13 = this;

      if (!this.props.user || this.state.unreadCount === 0) return;
      Object(dogoblock_api["y" /* markAllNotificationsRead */])().then(function (result) {
        return _this13.setState(function (prevState) {
          return {
            unreadCount: 0,
            notifications: prevState.notifications.map(function (item) {
              return Object.assign({}, item, {
                readAt: item.readAt || result.readAt || new Date().toISOString()
              });
            })
          };
        });
      }).catch(function (error) {
        return _this13.setState({
          error: error.message
        });
      });
    }
  }, {
    key: "handleImportProject",
    value: function handleImportProject() {
      var importRoute = "/editor?import=".concat(Date.now());

      if (!this.props.user) {
        dogoblock_web_app_trackEvent('import project requires login', 'anonymous');
        dogoblock_web_app_navigate(loginRouteFor(importRoute));
        return;
      }

      dogoblock_web_app_trackEvent('import project', 'authenticated');
      dogoblock_web_app_navigate(importRoute);
    }
  }, {
    key: "handleNewProject",
    value: function handleNewProject() {
      if (!this.props.user) {
        dogoblock_web_app_trackEvent('new project requires login', 'anonymous');
        dogoblock_web_app_navigate(loginRouteFor('/editor'));
        return;
      }

      dogoblock_web_app_trackEvent('new project', 'authenticated');
      dogoblock_web_app_navigate('/editor');
    }
  }, {
    key: "handleCopyProjectLink",
    value: function handleCopyProjectLink() {
      var _this14 = this;

      var project = this.state.projectDetails;
      if (!project) return;
      var link = getProjectPublicUrl(project);

      var onCopied = function onCopied() {
        if (_this14.copyLinkTimer) clearTimeout(_this14.copyLinkTimer);

        _this14.setState({
          copyLinkFeedback: true
        });

        _this14.copyLinkTimer = setTimeout(function () {
          return _this14.setState({
            copyLinkFeedback: false
          });
        }, 2200);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(link).then(onCopied).catch(function () {});
        return;
      }

      var textarea = document.createElement('textarea');
      textarea.value = link;
      textarea.setAttribute('readonly', 'readonly');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      onCopied();
    }
  }, {
    key: "handleDeleteProject",
    value: function handleDeleteProject() {
      var _this15 = this;

      if (!this.props.user) {
        dogoblock_web_app_navigate(loginRouteFor());
        return;
      }

      var id = this.state.route.projectId;
      if (!id) return;
      if (!window.confirm('Excluir este projeto? Esta acao nao pode ser desfeita.')) return; // eslint-disable-line no-alert

      this.setState({
        loading: true,
        error: null
      });
      Object(dogoblock_api["e" /* deleteProject */])(id).then(function () {
        dogoblock_web_app_trackEvent('delete project success', 'details');
        dogoblock_web_app_navigate('/projects');
      }).catch(function (error) {
        dogoblock_web_app_trackEvent('delete project error', 'details');

        _this15.setState({
          error: error.message,
          loading: false
        });
      });
    }
  }, {
    key: "handleDeleteProjectFromCard",
    value: function handleDeleteProjectFromCard(event) {
      var _this16 = this;

      event.preventDefault();
      event.stopPropagation();

      if (!this.props.user) {
        dogoblock_web_app_navigate(loginRouteFor());
        return;
      }

      var id = event.currentTarget.dataset.projectId;
      if (!id) return;
      if (!window.confirm('Excluir este projeto? Esta ação não pode ser desfeita.')) return; // eslint-disable-line no-alert

      this.setState({
        loading: true,
        error: null
      });
      Object(dogoblock_api["e" /* deleteProject */])(id).then(function () {
        return _this16.setState(function (prevState) {
          return {
            projects: prevState.projects.filter(function (project) {
              return project.id !== id;
            }),
            favoriteProjects: prevState.favoriteProjects.filter(function (project) {
              return project.id !== id;
            }),
            loading: false,
            error: null
          };
        }, function () {
          return dogoblock_web_app_trackEvent('delete project success', 'card');
        });
      }).catch(function (error) {
        dogoblock_web_app_trackEvent('delete project error', 'card');

        _this16.setState({
          error: error.message,
          loading: false
        });
      });
    }
  }, {
    key: "handleProjectCreated",
    value: function handleProjectCreated(projectId) {
      if (projectId && projectId !== project_state["f" /* defaultProjectId */]) {
        dogoblock_web_app_trackEvent('project created', 'editor');
        dogoblock_web_app_navigate("/editor/".concat(projectId));
      }
    }
  }, {
    key: "handleOpenCurrentProject",
    value: function handleOpenCurrentProject() {
      var project = this.state.projectDetails;
      this.props.onSetPlayerOnly(false);
      if (project) dogoblock_web_app_navigate("/editor/".concat(project.id));
    }
  }, {
    key: "handleOpenProjectDetails",
    value: function handleOpenProjectDetails(event) {
      var projectId = event.currentTarget.dataset.projectId;
      if (projectId) dogoblock_web_app_navigate("/projects/".concat(projectId));
    }
  }, {
    key: "handleShowMessageBox",
    value: function handleShowMessageBox(type, message) {
      if (type === message_box["a" /* default */].confirm) return confirm(message); // eslint-disable-line no-alert

      if (type === message_box["a" /* default */].alert) return alert(message); // eslint-disable-line no-alert
    }
  }, {
    key: "handleToggleVisibility",
    value: function handleToggleVisibility() {
      var project = this.state.projectDetails;
      if (!project) return;
      var nextVisibility = project.visibility === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC';
      this.handleUpdateVisibility(nextVisibility);
    }
  }, {
    key: "handleUpdateVisibility",
    value: function handleUpdateVisibility(visibility) {
      var _this17 = this;

      var project = this.state.projectDetails;

      if (!this.props.user || !project) {
        dogoblock_web_app_navigate(loginRouteFor());
        return;
      }

      this.setState({
        loading: true,
        error: null
      });
      Object(dogoblock_api["J" /* updateProjectVisibility */])(project.id, visibility).then(function () {
        return Object(dogoblock_api["o" /* getProjectDetails */])(project.id);
      }).then(function (projectDetails) {
        dogoblock_web_app_trackEvent('update project visibility success', visibility);

        _this17.setState({
          projectDetails: projectDetails,
          loading: false,
          error: null
        });
      }).catch(function (error) {
        dogoblock_web_app_trackEvent('update project visibility error', visibility);

        _this17.setState({
          error: error.message,
          loading: false
        });
      });
    }
  }, {
    key: "handleNavigateHome",
    value: function handleNavigateHome() {
      dogoblock_web_app_navigate('/');
    }
  }, {
    key: "handleNavigateProjects",
    value: function handleNavigateProjects() {
      dogoblock_web_app_navigate('/projects');
    }
  }, {
    key: "handleNavigateExplore",
    value: function handleNavigateExplore() {
      dogoblock_web_app_navigate('/explore');
    }
  }, {
    key: "handleNavigateEditor",
    value: function handleNavigateEditor() {
      dogoblock_web_app_navigate('/editor');
    }
  }, {
    key: "handleNavigateLogin",
    value: function handleNavigateLogin() {
      dogoblock_web_app_navigate('/login');
    }
  }, {
    key: "handleNavigateProfile",
    value: function handleNavigateProfile() {
      dogoblock_web_app_navigate('/profile');
    }
  }, {
    key: "handleNavigateRegister",
    value: function handleNavigateRegister() {
      dogoblock_web_app_navigate('/register');
    }
  }, {
    key: "handleRequestLoginToSave",
    value: function handleRequestLoginToSave() {
      dogoblock_web_app_trackEvent('save project requires login', 'anonymous');
      dogoblock_web_app_navigate(loginRouteFor(currentRouteHash()));
    }
  }, {
    key: "handleNavigateForgotPassword",
    value: function handleNavigateForgotPassword() {
      dogoblock_web_app_navigate('/forgot-password');
    }
  }, {
    key: "handleNavigatePublicProfile",
    value: function handleNavigatePublicProfile(usernameOrEvent) {
      var username = typeof usernameOrEvent === 'string' ? usernameOrEvent : usernameOrEvent.currentTarget.dataset.username;
      if (username) dogoblock_web_app_navigate("/user/".concat(username));
    }
  }, {
    key: "handleForgotPassword",
    value: function handleForgotPassword(event) {
      var _this18 = this;

      event.preventDefault();
      var form = new FormData(event.currentTarget);
      this.setState({
        error: null,
        loading: true,
        forgotPasswordSuccess: false
      });
      Object(dogoblock_api["j" /* forgotPassword */])(form.get('email')).then(function () {
        return _this18.setState({
          forgotPasswordSuccess: true,
          loading: false
        });
      }).catch(function (error) {
        return _this18.setState({
          error: error.message,
          loading: false
        });
      });
    }
  }, {
    key: "handleResetPassword",
    value: function handleResetPassword(event) {
      var _this19 = this;

      event.preventDefault();
      var form = new FormData(event.currentTarget);
      var password = form.get('password');
      var confirm = form.get('confirm');

      if (password !== confirm) {
        this.setState({
          error: 'As senhas não coincidem.'
        });
        return;
      }

      this.setState({
        error: null,
        loading: true,
        resetPasswordSuccess: false
      });
      Object(dogoblock_api["E" /* resetPassword */])(this.state.route.token, password).then(function () {
        return _this19.setState({
          resetPasswordSuccess: true,
          loading: false
        });
      }).catch(function (error) {
        return _this19.setState({
          error: error.message,
          loading: false
        });
      });
    }
  }, {
    key: "handleSearchChange",
    value: function handleSearchChange(event) {
      this.setState({
        searchQuery: event.target.value
      });
    }
  }, {
    key: "handleProfileTab",
    value: function handleProfileTab(event) {
      this.setState({
        profileTab: event.currentTarget.dataset.tab
      });
    } // ── Project Details handlers ─────────────────────────────────────────────

  }, {
    key: "handlePdLike",
    value: function handlePdLike() {
      var _this20 = this;

      var project = this.state.projectDetails;
      if (!project) return;

      if (!this.props.user) {
        dogoblock_web_app_navigate(loginRouteFor());
        return;
      }

      var wasLiked = this.state.pdLiked;
      this.setState(function (prevState) {
        return {
          pdLiked: !wasLiked,
          pdLikeCount: prevState.pdLikeCount + (wasLiked ? -1 : 1)
        };
      });
      var action = wasLiked ? dogoblock_api["G" /* unlikeProject */] : dogoblock_api["r" /* likeProject */];
      action(project.id).then(function () {
        dogoblock_web_app_trackEvent(wasLiked ? 'unlike project' : 'like project', 'project details');
      }).catch(function () {
        // rollback on error
        _this20.setState(function (prevState) {
          return {
            pdLiked: wasLiked,
            pdLikeCount: prevState.pdLikeCount + (wasLiked ? 1 : -1)
          };
        });
      });
    }
  }, {
    key: "handlePdFavorite",
    value: function handlePdFavorite() {
      var _this21 = this;

      var project = this.state.projectDetails;
      if (!project) return;

      if (!this.props.user) {
        dogoblock_web_app_navigate(loginRouteFor());
        return;
      }

      var wasFavorited = this.state.pdFavorited;
      this.setState(function (prevState) {
        return {
          pdFavorited: !wasFavorited,
          pdStarCount: prevState.pdStarCount + (wasFavorited ? -1 : 1)
        };
      });
      var action = wasFavorited ? dogoblock_api["F" /* unfavoriteProject */] : dogoblock_api["i" /* favoriteProject */];
      action(project.id).then(function () {
        dogoblock_web_app_trackEvent(wasFavorited ? 'unfavorite project' : 'favorite project', 'project details');
      }).catch(function () {
        _this21.setState(function (prevState) {
          return {
            pdFavorited: wasFavorited,
            pdStarCount: prevState.pdStarCount + (wasFavorited ? 1 : -1)
          };
        });
      });
    }
  }, {
    key: "handlePdRemix",
    value: function handlePdRemix() {
      var _this22 = this;

      var project = this.state.projectDetails;
      if (!project) return;

      if (!this.props.user) {
        dogoblock_web_app_navigate(loginRouteFor());
        return;
      }

      if (this.state.pdRemixing) return;
      this.setState({
        pdRemixing: true,
        error: null
      });
      Object(dogoblock_api["D" /* remixProject */])(project.id).then(function (result) {
        dogoblock_web_app_trackEvent('remix project success', 'project details');

        _this22.setState({
          pdRemixing: false
        });

        dogoblock_web_app_navigate("/editor/".concat(result.id));
      }).catch(function (err) {
        dogoblock_web_app_trackEvent('remix project error', 'project details');

        _this22.setState({
          pdRemixing: false,
          error: err.message || 'Erro ao replicar projeto'
        });
      });
    }
  }, {
    key: "handlePdSaveDetails",
    value: function handlePdSaveDetails() {
      var _this23 = this;

      var project = this.state.projectDetails;
      if (!project || !this.props.user) return;
      var _this$state = this.state,
          pdInstructions = _this$state.pdInstructions,
          pdCredits = _this$state.pdCredits;
      this.setState({
        pdSavingDetails: true,
        error: null
      });
      Object(dogoblock_api["I" /* updateProjectDetails */])(project.id, {
        instructions: pdInstructions,
        notesAndCredits: pdCredits
      }).then(function (updated) {
        _this23.setState(function (prevState) {
          return {
            pdSavingDetails: false,
            pdSaveDetailsFeedback: true,
            projectDetails: Object.assign({}, prevState.projectDetails, updated)
          };
        });

        if (_this23.pdSaveFeedbackTimer) clearTimeout(_this23.pdSaveFeedbackTimer);
        _this23.pdSaveFeedbackTimer = setTimeout(function () {
          return _this23.setState({
            pdSaveDetailsFeedback: false
          });
        }, 2500);
      }).catch(function (err) {
        return _this23.setState({
          pdSavingDetails: false,
          error: err.message
        });
      });
    }
  }, {
    key: "handlePdInstructionsChange",
    value: function handlePdInstructionsChange(event) {
      this.setState({
        pdInstructions: event.target.value
      });
    }
  }, {
    key: "handlePdCreditsChange",
    value: function handlePdCreditsChange(event) {
      this.setState({
        pdCredits: event.target.value
      });
    }
  }, {
    key: "handlePdCommentChange",
    value: function handlePdCommentChange(event) {
      this.setState({
        pdCommentText: event.target.value
      });
    }
  }, {
    key: "handlePdCommentSubmit",
    value: function handlePdCommentSubmit() {
      var _this24 = this;

      var project = this.state.projectDetails;

      if (!project || !this.props.user) {
        dogoblock_web_app_navigate(loginRouteFor());
        return;
      }

      var content = this.state.pdCommentText.trim();
      if (!content) return;
      this.setState({
        pdCommentsLoading: true
      });
      Object(dogoblock_api["A" /* postComment */])(project.id, content).then(function (comment) {
        dogoblock_web_app_trackEvent('comment project success', 'project details');

        _this24.setState(function (prevState) {
          return {
            pdComments: [comment].concat(_toConsumableArray(prevState.pdComments)),
            pdCommentText: '',
            pdCommentsLoading: false
          };
        });
      }).catch(function (err) {
        dogoblock_web_app_trackEvent('comment project error', 'project details');

        _this24.setState({
          pdCommentsLoading: false,
          error: err.message
        });
      });
    }
  }, {
    key: "handlePdCommentCancel",
    value: function handlePdCommentCancel() {
      this.setState({
        pdCommentText: ''
      });
    }
  }, {
    key: "handlePdDeleteComment",
    value: function handlePdDeleteComment(event) {
      var _this25 = this;

      var commentId = event.currentTarget.dataset.commentId;
      var project = this.state.projectDetails;
      if (!project || !commentId) return;
      Object(dogoblock_api["c" /* deleteComment */])(project.id, commentId).then(function () {
        _this25.setState(function (prevState) {
          return {
            pdComments: prevState.pdComments.filter(function (c) {
              return String(c.id) !== String(commentId);
            })
          };
        });
      }).catch(function (err) {
        return _this25.setState({
          error: err.message
        });
      });
    }
  }, {
    key: "handlePdReplyOpen",
    value: function handlePdReplyOpen(event) {
      var parentId = event.currentTarget.dataset.commentId;
      this.setState({
        pdReplyToId: parentId,
        pdReplyText: ''
      });
    }
  }, {
    key: "handlePdReplyChange",
    value: function handlePdReplyChange(event) {
      this.setState({
        pdReplyText: event.target.value
      });
    }
  }, {
    key: "handlePdReplyCancel",
    value: function handlePdReplyCancel() {
      this.setState({
        pdReplyToId: null,
        pdReplyText: ''
      });
    }
  }, {
    key: "handlePdReplySubmit",
    value: function handlePdReplySubmit() {
      var _this26 = this;

      var project = this.state.projectDetails;
      var _this$state2 = this.state,
          pdReplyToId = _this$state2.pdReplyToId,
          pdReplyText = _this$state2.pdReplyText;

      if (!project || !this.props.user) {
        dogoblock_web_app_navigate(loginRouteFor());
        return;
      }

      var content = pdReplyText.trim();
      if (!content || !pdReplyToId) return;
      this.setState({
        pdReplyLoading: true
      });
      Object(dogoblock_api["A" /* postComment */])(project.id, content, pdReplyToId).then(function (reply) {
        dogoblock_web_app_trackEvent('reply comment success', 'project details');

        _this26.setState(function (prevState) {
          return {
            pdComments: prevState.pdComments.map(function (c) {
              if (String(c.id) !== String(pdReplyToId)) return c;
              return _objectSpread(_objectSpread({}, c), {}, {
                replies: [].concat(_toConsumableArray(c.replies || []), [reply])
              });
            }),
            pdReplyToId: null,
            pdReplyText: '',
            pdReplyLoading: false
          };
        });
      }).catch(function (err) {
        dogoblock_web_app_trackEvent('reply comment error', 'project details');

        _this26.setState({
          pdReplyLoading: false,
          error: err.message
        });
      });
    }
  }, {
    key: "handlePdDeleteReply",
    value: function handlePdDeleteReply(event) {
      var _this27 = this;

      var replyId = event.currentTarget.dataset.replyId;
      var parentId = event.currentTarget.dataset.parentId;
      var project = this.state.projectDetails;
      if (!project || !replyId) return;
      Object(dogoblock_api["c" /* deleteComment */])(project.id, replyId).then(function () {
        _this27.setState(function (prevState) {
          return {
            pdComments: prevState.pdComments.map(function (c) {
              if (String(c.id) !== String(parentId)) return c;
              return _objectSpread(_objectSpread({}, c), {}, {
                replies: (c.replies || []).filter(function (r) {
                  return String(r.id) !== String(replyId);
                })
              });
            })
          };
        });
      }).catch(function (err) {
        return _this27.setState({
          error: err.message
        });
      });
    }
  }, {
    key: "handlePdCoverChange",
    value: function handlePdCoverChange(event) {
      var _this28 = this;

      var file = event.target.files && event.target.files[0];
      var project = this.state.projectDetails;
      if (!file || !project) return;
      this.setState({
        pdUploadingCover: true
      });
      Object(dogoblock_api["K" /* uploadProjectCover */])(project.id, file).then(function (updated) {
        _this28.setState(function (prevState) {
          return {
            pdUploadingCover: false,
            projectDetails: Object.assign({}, prevState.projectDetails, updated)
          };
        });
      }).catch(function (err) {
        return _this28.setState({
          pdUploadingCover: false,
          error: err.message
        });
      }); // reset input so same file can be selected again

      event.target.value = '';
    }
  }, {
    key: "handleProfileSubmit",
    value: function handleProfileSubmit(event) {
      var _this29 = this;

      event.preventDefault();
      var form = new FormData(event.currentTarget);
      this.setState({
        loading: true,
        error: null
      });
      Object(dogoblock_api["H" /* updateMyProfile */])({
        name: form.get('name'),
        username: form.get('username'),
        email: form.get('email'),
        bio: form.get('bio'),
        workingOn: form.get('workingOn')
      }).then(function (profile) {
        var session = Object(auth_session["c" /* readAuthSession */])();

        if (session && session.accessToken) {
          var nextSession = {
            accessToken: session.accessToken,
            user: Object.assign({}, session.user, profile)
          };
          Object(auth_session["d" /* writeAuthSession */])(nextSession);

          _this29.props.onLoginSuccess(nextSession);
        }

        _this29.setState({
          profile: profile,
          profileTab: 'overview',
          loading: false,
          error: null
        });
      }).catch(function (error) {
        return _this29.setState({
          error: error.message,
          loading: false
        });
      });
    }
  }, {
    key: "renderHeader",
    value: function renderHeader() {
      var user = this.props.user;
      return /*#__PURE__*/react_default.a.createElement("header", {
        className: dogoblock_web_app_default.a.topbar
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.topbarInner
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.brand,
        onClick: this.handleNavigateHome
      }, /*#__PURE__*/react_default.a.createElement("img", {
        alt: "Dogoblock",
        className: dogoblock_web_app_default.a.logo,
        src: dogoblock_logo_full_default.a
      })), /*#__PURE__*/react_default.a.createElement("nav", {
        className: dogoblock_web_app_default.a.navCenter
      }, /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.navLink,
        onClick: this.handleNavigateExplore
      }, 'Explorar'), /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.navLink,
        onClick: this.handleNavigateProjects
      }, 'Meus Projetos'), user ? /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.navLink,
        onClick: this.handleNavigateProfile
      }, 'Meu Perfil') : null, /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.navBtnEditor,
        onClick: this.handleNavigateEditor
      }, '</> Editor')), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.navRight
      }, user ? /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement(notifications_notifications_bell, {
        loading: this.state.notificationsLoading,
        loadingMore: this.state.notificationsLoadingMore,
        notifications: this.state.notifications,
        unreadCount: this.state.unreadCount,
        hasMore: this.state.notificationsHasMore,
        onMarkAllRead: this.handleMarkAllNotificationsRead,
        onOpen: this.handleLoadNotifications,
        onOpenNotification: this.handleOpenNotification,
        onDeleteNotification: this.handleDeleteNotification,
        onLoadMore: this.handleLoadMoreNotifications
      }), /*#__PURE__*/react_default.a.createElement("button", {
        "aria-label": "Meu Perfil",
        className: dogoblock_web_app_default.a.navUserIconBtn,
        title: "Meu Perfil",
        onClick: this.handleNavigateProfile
      }, /*#__PURE__*/react_default.a.createElement(circle_user["a" /* default */], {
        "aria-hidden": "true",
        size: 26
      })), /*#__PURE__*/react_default.a.createElement("button", {
        className: "".concat(dogoblock_web_app_default.a.navLink, " ").concat(dogoblock_web_app_default.a.navBtnSair),
        onClick: this.handleLogout
      }, /*#__PURE__*/react_default.a.createElement(log_out["a" /* default */], {
        "aria-hidden": "true",
        size: 13
      }), 'Sair da Conta')) : /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.navBtnCriarConta,
        onClick: this.handleNavigateRegister
      }, 'Criar Conta'))));
    }
  }, {
    key: "renderHome",
    value: function renderHome() {
      var _this30 = this;

      var featured = (this.state.projects || []).slice(0, 4);
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.homePage
      }, /*#__PURE__*/react_default.a.createElement("section", {
        className: dogoblock_web_app_default.a.heroSection
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.heroInner
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.heroCopyNew
      }, /*#__PURE__*/react_default.a.createElement("h1", {
        className: dogoblock_web_app_default.a.heroTitle
      }, 'CRIE HISTÓRIAS, ANIMAÇÕES', /*#__PURE__*/react_default.a.createElement("br", null), 'E JOGOS COM O ', /*#__PURE__*/react_default.a.createElement("span", {
        className: dogoblock_web_app_default.a.heroAccent
      }, 'DOGOBLOCK.')), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.heroActionsNew
      }, /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.heroBtnPrimary,
        onClick: this.handleNavigateExplore
      }, 'EXPLORAR PROJETOS'), /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.heroBtnOutline,
        onClick: this.handleNewProject
      }, 'COMEÇAR A CRIAR'))), /*#__PURE__*/react_default.a.createElement("div", {
        "aria-hidden": "true",
        className: dogoblock_web_app_default.a.heroIllustration
      }, /*#__PURE__*/react_default.a.createElement("img", {
        alt: "",
        src: hero_illustration_default.a
      })))), /*#__PURE__*/react_default.a.createElement("section", {
        className: dogoblock_web_app_default.a.featuredSection
      }, /*#__PURE__*/react_default.a.createElement("h2", {
        className: dogoblock_web_app_default.a.featuredTitle
      }, 'PROJETOS EM DESTAQUE'), featured.length === 0 ? /*#__PURE__*/react_default.a.createElement("p", {
        className: dogoblock_web_app_default.a.featuredEmpty
      }, this.state.loading ? 'Carregando projetos...' : 'Nenhum projeto em destaque ainda.') : /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.featuredGrid
      }, featured.map(function (project) {
        return /*#__PURE__*/react_default.a.createElement("button", {
          className: dogoblock_web_app_default.a.featuredCard,
          "data-project-id": project.id,
          key: project.id,
          onClick: _this30.handleOpenProjectDetails
        }, /*#__PURE__*/react_default.a.createElement("div", {
          className: dogoblock_web_app_default.a.featuredThumbnail
        }, dogoblock_web_app_renderProjectThumbnail(project)), /*#__PURE__*/react_default.a.createElement("div", {
          className: dogoblock_web_app_default.a.cardBody
        }, /*#__PURE__*/react_default.a.createElement("div", {
          className: dogoblock_web_app_default.a.cardAvatarCol
        }, /*#__PURE__*/react_default.a.createElement(icons_user["a" /* default */], {
          fill: "currentColor",
          className: dogoblock_web_app_default.a.cardAvatarIcon
        })), /*#__PURE__*/react_default.a.createElement("div", {
          className: dogoblock_web_app_default.a.cardInfoCol
        }, /*#__PURE__*/react_default.a.createElement("span", {
          className: dogoblock_web_app_default.a.cardTitle
        }, project.title || project.name || 'Projeto'), /*#__PURE__*/react_default.a.createElement("span", {
          className: dogoblock_web_app_default.a.cardAuthor
        }, getProjectAuthor(project)))));
      }))));
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      return /*#__PURE__*/react_default.a.createElement("footer", {
        className: dogoblock_web_app_default.a.siteFooter
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.footerInner
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.footerBrand
      }, /*#__PURE__*/react_default.a.createElement("img", {
        alt: "Editora DogoMaker",
        className: dogoblock_web_app_default.a.footerLogo,
        src: dogoblock_logo_full_default.a
      })), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.footerLinks
      }, /*#__PURE__*/react_default.a.createElement("strong", null, 'LINKS'), /*#__PURE__*/react_default.a.createElement("a", {
        href: "#",
        rel: "noopener noreferrer",
        target: "_blank"
      }, 'Home'), /*#__PURE__*/react_default.a.createElement("a", {
        href: "https://app.portaldogomaker.com.br",
        rel: "noopener noreferrer",
        target: "_blank"
      }, 'Portal do Professor'), /*#__PURE__*/react_default.a.createElement("a", {
        href: "https://www.editoradogomaker.com.br",
        rel: "noopener noreferrer",
        target: "_blank"
      }, 'Site da Editora')), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.footerLei
      }, /*#__PURE__*/react_default.a.createElement("strong", null, 'LEI'), /*#__PURE__*/react_default.a.createElement("a", {
        href: "#",
        rel: "noopener noreferrer",
        target: "_blank"
      }, 'Termos de Uso'), /*#__PURE__*/react_default.a.createElement("a", {
        href: "#",
        rel: "noopener noreferrer",
        target: "_blank"
      }, 'Política de Privacidade')), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.footerContact
      }, /*#__PURE__*/react_default.a.createElement("strong", null, 'CONTATO E ENDEREÇO'), /*#__PURE__*/react_default.a.createElement("span", null, 'contato@editoradogomaker.com'), /*#__PURE__*/react_default.a.createElement("span", null, '(31) 99259-9654'), /*#__PURE__*/react_default.a.createElement("span", null, 'BR-316, Km7, nº 186 – Qd. 201, Lt. 4776 (Loja)', /*#__PURE__*/react_default.a.createElement("br", null), 'Centro, Ananindeua – PA'))), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.footerBottom
      }, 'EDITORA DOGOMAKER - TODOS OS DIREITOS RESERVADOS'));
    }
  }, {
    key: "renderLogin",
    value: function renderLogin() {
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.authSection
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.authCardWrap
      }, /*#__PURE__*/react_default.a.createElement("form", {
        className: dogoblock_web_app_default.a.panel,
        onSubmit: this.handleLogin
      }, /*#__PURE__*/react_default.a.createElement("h1", null, 'Entrar'), this.state.error ? /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.error
      }, this.state.error) : null, /*#__PURE__*/react_default.a.createElement("label", {
        className: dogoblock_web_app_default.a.field
      }, 'Email', /*#__PURE__*/react_default.a.createElement("input", {
        required: true,
        name: "email",
        type: "email"
      })), /*#__PURE__*/react_default.a.createElement("label", {
        className: dogoblock_web_app_default.a.field
      }, 'Senha', /*#__PURE__*/react_default.a.createElement("input", {
        required: true,
        minLength: "8",
        name: "password",
        type: "password"
      })), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.forgotPasswordRow
      }, /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.inlineButton,
        type: "button",
        onClick: this.handleNavigateForgotPassword
      }, 'Esqueci minha senha')), /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.primaryButton
      }, /*#__PURE__*/react_default.a.createElement(dogoblock_web_app_Icon, null, /*#__PURE__*/react_default.a.createElement(log_in["a" /* default */], {
        size: 16
      })), this.state.loading ? 'Entrando...' : 'Entrar'), /*#__PURE__*/react_default.a.createElement("p", {
        className: dogoblock_web_app_default.a.formHint
      }, 'Ainda nao tem conta? ', /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.inlineButton,
        type: "button",
        onClick: this.handleNavigateRegister
      }, /*#__PURE__*/react_default.a.createElement(user_plus["a" /* default */], {
        "aria-hidden": "true",
        className: dogoblock_web_app_default.a.inlineIcon
      }), 'Cadastrar')))));
    }
  }, {
    key: "renderRegister",
    value: function renderRegister() {
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.authSection
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.authCardWrap
      }, /*#__PURE__*/react_default.a.createElement("form", {
        className: dogoblock_web_app_default.a.panel,
        onSubmit: this.handleRegister
      }, /*#__PURE__*/react_default.a.createElement("h1", null, 'Cadastrar'), this.state.error ? /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.error
      }, this.state.error) : null, /*#__PURE__*/react_default.a.createElement("label", {
        className: dogoblock_web_app_default.a.field
      }, 'Nome', /*#__PURE__*/react_default.a.createElement("input", {
        required: true,
        name: "name",
        type: "text"
      })), /*#__PURE__*/react_default.a.createElement("label", {
        className: dogoblock_web_app_default.a.field
      }, 'Usuario', /*#__PURE__*/react_default.a.createElement("input", {
        required: true,
        minLength: "3",
        name: "username",
        type: "text"
      })), /*#__PURE__*/react_default.a.createElement("label", {
        className: dogoblock_web_app_default.a.field
      }, 'Email', /*#__PURE__*/react_default.a.createElement("input", {
        required: true,
        name: "email",
        type: "email"
      })), /*#__PURE__*/react_default.a.createElement("label", {
        className: dogoblock_web_app_default.a.field
      }, 'Senha', /*#__PURE__*/react_default.a.createElement("input", {
        required: true,
        minLength: "8",
        name: "password",
        type: "password"
      })), /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.primaryButton
      }, /*#__PURE__*/react_default.a.createElement(dogoblock_web_app_Icon, null, /*#__PURE__*/react_default.a.createElement(user_plus["a" /* default */], {
        size: 16
      })), this.state.loading ? 'Cadastrando...' : 'Cadastrar'), /*#__PURE__*/react_default.a.createElement("p", {
        className: dogoblock_web_app_default.a.formHint
      }, 'Ja tem conta? ', /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.inlineButton,
        type: "button",
        onClick: this.handleNavigateLogin
      }, /*#__PURE__*/react_default.a.createElement(log_in["a" /* default */], {
        "aria-hidden": "true",
        className: dogoblock_web_app_default.a.inlineIcon
      }), 'Entrar')))));
    }
  }, {
    key: "renderProjects",
    value: function renderProjects() {
      var publicList = !this.props.user || this.state.route.name === 'explore';
      var _this$state3 = this.state,
          searchQuery = _this$state3.searchQuery,
          projects = _this$state3.projects;
      var filteredProjects = projects.filter(function (project) {
        if (!searchQuery.trim()) return true;
        var query = searchQuery.toLowerCase();
        var title = (project.title || project.name || '').toLowerCase();
        var author = getProjectAuthor(project).toLowerCase();
        return title.includes(query) || author.includes(query);
      });
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.page
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.pageHeader
      }, /*#__PURE__*/react_default.a.createElement("h1", null, publicList ? 'Projetos Públicos' : 'Meus Projetos'), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.searchBar
      }, /*#__PURE__*/react_default.a.createElement(search["a" /* default */], {
        className: dogoblock_web_app_default.a.searchIcon,
        size: 18
      }), /*#__PURE__*/react_default.a.createElement("input", {
        type: "text",
        placeholder: "Buscar projetos...",
        value: searchQuery,
        onChange: this.handleSearchChange,
        className: dogoblock_web_app_default.a.searchInput
      })), publicList ? null : /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.actions
      }, /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.secondaryButton,
        onClick: this.handleImportProject
      }, /*#__PURE__*/react_default.a.createElement(dogoblock_web_app_Icon, null, /*#__PURE__*/react_default.a.createElement(upload["a" /* default */], {
        size: 16
      })), 'Importar Projeto'), /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.dangerButton,
        onClick: this.handleNewProject
      }, /*#__PURE__*/react_default.a.createElement(dogoblock_web_app_Icon, null, /*#__PURE__*/react_default.a.createElement(plus["a" /* default */], {
        size: 16
      })), 'Criar Projeto'))), this.state.error ? /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.error
      }, this.state.error) : null, this.state.loading ? /*#__PURE__*/react_default.a.createElement("p", null, 'Carregando...') : null, this.renderProjectCards(filteredProjects, !publicList), !this.state.loading && !filteredProjects.length ? /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.emptyState
      }, publicList ? 'Nenhum projeto publico encontrado.' : 'Voce ainda nao criou projetos.') : null);
    }
  }, {
    key: "renderProjectCards",
    value: function renderProjectCards(projects, canDeleteProjects) {
      var _this31 = this;

      return /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.projectGrid
      }, projects.map(function (project) {
        return /*#__PURE__*/react_default.a.createElement("div", {
          className: dogoblock_web_app_default.a.projectCardWrap,
          key: project.id
        }, /*#__PURE__*/react_default.a.createElement("button", {
          className: dogoblock_web_app_default.a.projectCard,
          "data-project-id": project.id,
          onClick: _this31.handleOpenProjectDetails
        }, /*#__PURE__*/react_default.a.createElement("div", {
          className: dogoblock_web_app_default.a.projectThumbnail
        }, dogoblock_web_app_renderProjectThumbnail(project)), /*#__PURE__*/react_default.a.createElement("div", {
          className: dogoblock_web_app_default.a.cardBody
        }, /*#__PURE__*/react_default.a.createElement("div", {
          className: dogoblock_web_app_default.a.cardAvatarCol
        }, /*#__PURE__*/react_default.a.createElement(icons_user["a" /* default */], {
          fill: "currentColor",
          className: dogoblock_web_app_default.a.cardAvatarIcon
        })), /*#__PURE__*/react_default.a.createElement("div", {
          className: dogoblock_web_app_default.a.cardInfoCol
        }, /*#__PURE__*/react_default.a.createElement("span", {
          className: dogoblock_web_app_default.a.cardTitle
        }, project.title || project.name || 'Projeto'), /*#__PURE__*/react_default.a.createElement("span", {
          className: dogoblock_web_app_default.a.cardAuthor
        }, getProjectAuthor(project))))), canDeleteProjects ? /*#__PURE__*/react_default.a.createElement("button", {
          className: dogoblock_web_app_default.a.projectDeleteButton,
          "data-project-id": project.id,
          title: "Excluir projeto",
          "aria-label": "Excluir projeto ".concat(project.title),
          onClick: _this31.handleDeleteProjectFromCard
        }, /*#__PURE__*/react_default.a.createElement(trash_2["a" /* default */], {
          "aria-hidden": "true",
          size: 15
        })) : null);
      }));
    }
  }, {
    key: "renderProfile",
    value: function renderProfile() {
      var profile = this.state.profile || this.props.user || {};
      var projects = this.state.projects;
      var favorites = this.state.favoriteProjects; // Use the first project as the "featured" one;
      // prefer the fully-loaded details (with stats) if available

      var featuredProject = this.state.featuredProjectDetails || projects[0] || null;
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(dogoblock_web_app_default.a.page, " ").concat(dogoblock_web_app_default.a.profilePage)
      }, this.state.error ? /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.error
      }, this.state.error) : null, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.profileTopRow
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(dogoblock_web_app_default.a.profileInfoCard, " ").concat(dogoblock_web_app_default.a.panel)
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.profileInfoHeader
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.profileAvatar
      }, profile.avatarUrl ? /*#__PURE__*/react_default.a.createElement("img", {
        alt: profile.username,
        src: profile.avatarUrl
      }) : dogoblock_web_app_getInitials(profile)), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.profileNameStack
      }, /*#__PURE__*/react_default.a.createElement("h1", {
        className: dogoblock_web_app_default.a.profileName
      }, profile.name || profile.username || 'Meu Perfil'), /*#__PURE__*/react_default.a.createElement("span", {
        className: dogoblock_web_app_default.a.profileUsername
      }, "@".concat(profile.username || 'usuario')))), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.profileInfoBody
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.profileSection
      }, /*#__PURE__*/react_default.a.createElement("h2", {
        className: dogoblock_web_app_default.a.profileSectionTitle
      }, 'Sobre mim'), /*#__PURE__*/react_default.a.createElement("p", {
        className: dogoblock_web_app_default.a.profileSectionText
      }, profile.bio || 'Adicione uma descrição para contar um pouco sobre você.')), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.profileSection
      }, /*#__PURE__*/react_default.a.createElement("h2", {
        className: dogoblock_web_app_default.a.profileSectionTitle
      }, 'No que estou trabalhando'), /*#__PURE__*/react_default.a.createElement("p", {
        className: dogoblock_web_app_default.a.profileSectionText
      }, profile.workingOn || 'Nenhum foco atual informado.')), /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.profileEditButton,
        onClick: this.handleProfileTab,
        "data-tab": "edit"
      }, /*#__PURE__*/react_default.a.createElement(dogoblock_web_app_Icon, null, /*#__PURE__*/react_default.a.createElement(save["a" /* default */], {
        size: 15
      })), 'Editar perfil'))), /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(dogoblock_web_app_default.a.profileFeaturedCard, " ").concat(dogoblock_web_app_default.a.panel)
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.profileFeaturedHeader
      }, /*#__PURE__*/react_default.a.createElement("h2", {
        className: dogoblock_web_app_default.a.profileFeaturedTitle
      }, 'PROJETO\nDE DESTAQUE')), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.profileFeaturedBody
      }, featuredProject ? /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.profileFeaturedThumb,
        "data-project-id": featuredProject.id,
        onClick: this.handleOpenProjectDetails
      }, dogoblock_web_app_renderProjectThumbnail(featuredProject)) : /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.profileFeaturedEmpty
      }, 'Nenhum projeto ainda.'), featuredProject ? /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.profileFeaturedStats
      }, /*#__PURE__*/react_default.a.createElement("span", {
        className: dogoblock_web_app_default.a.profileFeaturedStat
      }, /*#__PURE__*/react_default.a.createElement(heart["a" /* default */], {
        "aria-hidden": "true",
        size: 16
      }), getProjectMetric(featuredProject, ['likeCount', 'likes', 'totalLikes']) || 0), /*#__PURE__*/react_default.a.createElement("span", {
        className: dogoblock_web_app_default.a.profileFeaturedStat
      }, /*#__PURE__*/react_default.a.createElement(star["a" /* default */], {
        "aria-hidden": "true",
        size: 16
      }), getProjectMetric(featuredProject, ['favoriteCount', 'favorites', 'starCount']) || 0), /*#__PURE__*/react_default.a.createElement("span", {
        className: dogoblock_web_app_default.a.profileFeaturedStat
      }, /*#__PURE__*/react_default.a.createElement(folder_open["a" /* default */], {
        "aria-hidden": "true",
        size: 16
      }), getProjectMetric(featuredProject, ['remixCount', 'remixes', 'forkCount']) || 0), /*#__PURE__*/react_default.a.createElement("span", {
        className: dogoblock_web_app_default.a.profileFeaturedStat
      }, /*#__PURE__*/react_default.a.createElement(message_circle["a" /* default */], {
        "aria-hidden": "true",
        size: 16
      }), getProjectMetric(featuredProject, ['commentCount', 'comments']) || 0)) : null))), this.state.profileTab === 'edit' ? /*#__PURE__*/react_default.a.createElement("form", {
        className: "".concat(dogoblock_web_app_default.a.panel, " ").concat(dogoblock_web_app_default.a.profileForm),
        onSubmit: this.handleProfileSubmit
      }, /*#__PURE__*/react_default.a.createElement("h2", {
        className: dogoblock_web_app_default.a.profileSectionTitle
      }, 'Editar Perfil'), /*#__PURE__*/react_default.a.createElement("label", {
        className: dogoblock_web_app_default.a.field
      }, 'Nome', /*#__PURE__*/react_default.a.createElement("input", {
        defaultValue: profile.name || '',
        maxLength: "80",
        name: "name",
        type: "text"
      })), /*#__PURE__*/react_default.a.createElement("label", {
        className: dogoblock_web_app_default.a.field
      }, 'Usuário', /*#__PURE__*/react_default.a.createElement("input", {
        defaultValue: profile.username || '',
        maxLength: "30",
        minLength: "3",
        name: "username",
        type: "text"
      })), /*#__PURE__*/react_default.a.createElement("label", {
        className: dogoblock_web_app_default.a.field
      }, 'Email', /*#__PURE__*/react_default.a.createElement("input", {
        defaultValue: profile.email || '',
        maxLength: "120",
        name: "email",
        type: "email"
      })), /*#__PURE__*/react_default.a.createElement("label", {
        className: dogoblock_web_app_default.a.field
      }, 'Sobre mim', /*#__PURE__*/react_default.a.createElement("textarea", {
        defaultValue: profile.bio || '',
        maxLength: "500",
        name: "bio",
        rows: "4"
      })), /*#__PURE__*/react_default.a.createElement("label", {
        className: dogoblock_web_app_default.a.field
      }, 'No que estou trabalhando', /*#__PURE__*/react_default.a.createElement("textarea", {
        defaultValue: profile.workingOn || '',
        maxLength: "280",
        name: "workingOn",
        rows: "3"
      })), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.profileFormActions
      }, /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.primaryButton
      }, /*#__PURE__*/react_default.a.createElement(dogoblock_web_app_Icon, null, /*#__PURE__*/react_default.a.createElement(save["a" /* default */], {
        size: 16
      })), this.state.loading ? 'Salvando...' : 'Salvar Perfil'), /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.secondaryButton,
        type: "button",
        onClick: this.handleProfileTab,
        "data-tab": "overview"
      }, 'Cancelar'))) : null, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.profileSection2
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.profileSectionHeader
      }, /*#__PURE__*/react_default.a.createElement("h2", {
        className: dogoblock_web_app_default.a.profileSectionHeading
      }, "PROJETOS (".concat(projects.length, ")"))), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.profileSectionBody
      }, projects.length ? this.renderProjectCards(projects, true) : /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.emptyState
      }, 'Você ainda não criou projetos.'))), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.profileSection2
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.profileSectionHeader
      }, /*#__PURE__*/react_default.a.createElement("h2", {
        className: dogoblock_web_app_default.a.profileSectionHeading
      }, "FAVORITOS (".concat(favorites.length, ")"))), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.profileSectionBody
      }, favorites.length ? this.renderProjectCards(favorites, false) : /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.emptyState
      }, 'Nenhum projeto favorito ainda.'))));
    }
  }, {
    key: "renderProjectDetails",
    value: function renderProjectDetails() {
      var _this32 = this;

      var _this$state4 = this.state,
          projectDetails = _this$state4.projectDetails,
          loading = _this$state4.loading,
          error = _this$state4.error,
          route = _this$state4.route,
          pdComments = _this$state4.pdComments,
          pdCommentsLoading = _this$state4.pdCommentsLoading,
          pdCommentText = _this$state4.pdCommentText,
          pdReplyToId = _this$state4.pdReplyToId,
          pdReplyText = _this$state4.pdReplyText,
          pdReplyLoading = _this$state4.pdReplyLoading,
          pdInstructions = _this$state4.pdInstructions,
          pdCredits = _this$state4.pdCredits,
          pdSavingDetails = _this$state4.pdSavingDetails,
          pdSaveDetailsFeedback = _this$state4.pdSaveDetailsFeedback,
          pdUploadingCover = _this$state4.pdUploadingCover,
          pdLiked = _this$state4.pdLiked,
          pdFavorited = _this$state4.pdFavorited,
          pdLikeCount = _this$state4.pdLikeCount,
          pdStarCount = _this$state4.pdStarCount;
      var projectId = route.projectId;
      var project = projectDetails || {};
      var user = this.props.user;
      var isOwner = user && project.ownerId && String(user.id) === String(project.ownerId);
      var remixCount = getProjectMetric(project, ['remixCount', 'remixes', 'forkCount']);
      var thumbnail = getProjectThumbnail(project);
      var author = getProjectAuthor(project);
      var title = project.title || project.name || 'Projeto';
      var createdAt = dogoblock_web_app_formatDate(project.createdAt || project.created_at);
      var isPublic = project.visibility === 'PUBLIC';
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.pdPage
      }, error ? /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.error
      }, error) : null, loading ? /*#__PURE__*/react_default.a.createElement("p", {
        className: dogoblock_web_app_default.a.pdLoading
      }, 'Carregando...') : null, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.pdHeader
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.pdHeaderLeft
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.pdThumbBox
      }, thumbnail ? /*#__PURE__*/react_default.a.createElement("img", {
        alt: "",
        className: dogoblock_web_app_default.a.pdThumbImg,
        src: thumbnail
      }) : /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.pdThumbFallback
      }, /*#__PURE__*/react_default.a.createElement("span", null, 'DB')), isOwner ? /*#__PURE__*/react_default.a.createElement("label", {
        className: dogoblock_web_app_default.a.pdThumbOverlay,
        htmlFor: "pd-cover-input",
        title: "Alterar capa"
      }, pdUploadingCover ? '...' : /*#__PURE__*/react_default.a.createElement(upload["a" /* default */], {
        "aria-hidden": "true",
        size: 18
      }), /*#__PURE__*/react_default.a.createElement("input", {
        accept: "image/*",
        className: dogoblock_web_app_default.a.hiddenInput,
        id: "pd-cover-input",
        type: "file",
        onChange: this.handlePdCoverChange
      })) : null), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.pdTitleGroup
      }, /*#__PURE__*/react_default.a.createElement("h1", {
        className: dogoblock_web_app_default.a.pdTitle
      }, title.toUpperCase()), /*#__PURE__*/react_default.a.createElement("p", {
        className: dogoblock_web_app_default.a.pdAuthor
      }, 'Por ', /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.authorLink,
        "data-username": project.owner && project.owner.username || author,
        onClick: this.handleNavigatePublicProfile
      }, "@".concat(author))), createdAt ? /*#__PURE__*/react_default.a.createElement("p", {
        className: dogoblock_web_app_default.a.pdDate
      }, "Criado em ".concat(createdAt)) : null)), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.pdHeaderActions
      }, isOwner ? /*#__PURE__*/react_default.a.createElement("button", {
        className: isPublic ? dogoblock_web_app_default.a.pdBtnVisibilityPublic : dogoblock_web_app_default.a.pdBtnVisibilityPrivate,
        onClick: this.handleToggleVisibility
      }, isPublic ? 'Público' : 'Privado') : /*#__PURE__*/react_default.a.createElement("span", {
        className: isPublic ? dogoblock_web_app_default.a.pdBtnVisibilityPublic : dogoblock_web_app_default.a.pdBtnVisibilityPrivate
      }, isPublic ? 'Público' : 'Privado'), isOwner ? /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.pdBtnDelete,
        onClick: this.handleDeleteProject
      }, 'Excluir Projeto') : null)), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.pdMainGrid
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.pdPlayerCol
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.pdStage
      }, projectId ? /*#__PURE__*/react_default.a.createElement(gui["a" /* default */], {
        key: "project-page-player-".concat(projectId),
        canCreateNew: false,
        canEditTitle: false,
        canSave: false,
        assetHost: Object(dogoblock_api_config["b" /* getAssetHost */])(),
        projectHost: Object(dogoblock_api_config["c" /* getProjectHost */])(),
        projectId: projectId,
        routeProjectId: projectId,
        onProjectLoaded: noop,
        onShowMessageBox: this.handleShowMessageBox
      }) : null), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.pdStatsRow
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.pdStats
      }, /*#__PURE__*/react_default.a.createElement("button", {
        className: pdLiked ? dogoblock_web_app_default.a.pdStatBtnActiveLike : dogoblock_web_app_default.a.pdStatBtn,
        title: pdLiked ? 'Descurtir' : 'Curtir',
        onClick: this.handlePdLike
      }, /*#__PURE__*/react_default.a.createElement(heart["a" /* default */], {
        "aria-hidden": "true",
        fill: pdLiked ? 'currentColor' : 'none',
        size: 16
      }), pdLikeCount), /*#__PURE__*/react_default.a.createElement("button", {
        className: pdFavorited ? dogoblock_web_app_default.a.pdStatBtnActiveFav : dogoblock_web_app_default.a.pdStatBtn,
        title: pdFavorited ? 'Remover dos favoritos' : 'Favoritar',
        onClick: this.handlePdFavorite
      }, /*#__PURE__*/react_default.a.createElement(star["a" /* default */], {
        "aria-hidden": "true",
        fill: pdFavorited ? 'currentColor' : 'none',
        size: 16
      }), pdStarCount), /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.pdStatBtn,
        disabled: this.state.pdRemixing,
        title: this.state.pdRemixing ? 'Replicando...' : 'Replicar projeto para a minha biblioteca',
        onClick: this.handlePdRemix
      }, /*#__PURE__*/react_default.a.createElement(copy["a" /* default */], {
        "aria-hidden": "true",
        size: 16
      }), this.state.pdRemixing ? '...' : remixCount)), /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.pdBtnSeeInside,
        onClick: function onClick() {
          return dogoblock_web_app_navigate("/editor/".concat(projectId));
        }
      }, /*#__PURE__*/react_default.a.createElement(code_xml["a" /* default */], {
        "aria-hidden": "true",
        size: 15
      }), 'Ver por dentro'))), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.pdInfoCol
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.pdInfoSection
      }, /*#__PURE__*/react_default.a.createElement("label", {
        className: dogoblock_web_app_default.a.pdInfoLabel,
        htmlFor: "pd-instructions"
      }, 'Instruções'), /*#__PURE__*/react_default.a.createElement("textarea", {
        className: dogoblock_web_app_default.a.pdInfoTextarea,
        id: "pd-instructions",
        readOnly: !isOwner,
        rows: 6,
        value: isOwner ? pdInstructions : project.instructions || '',
        onChange: isOwner ? this.handlePdInstructionsChange : undefined
      })), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.pdInfoSection
      }, /*#__PURE__*/react_default.a.createElement("label", {
        className: dogoblock_web_app_default.a.pdInfoLabel,
        htmlFor: "pd-credits"
      }, 'Notas e créditos'), /*#__PURE__*/react_default.a.createElement("textarea", {
        className: dogoblock_web_app_default.a.pdInfoTextarea,
        id: "pd-credits",
        readOnly: !isOwner,
        rows: 6,
        value: isOwner ? pdCredits : project.notesAndCredits || project.credits || project.notes || '',
        onChange: isOwner ? this.handlePdCreditsChange : undefined
      })), isOwner ? /*#__PURE__*/react_default.a.createElement("button", {
        className: pdSaveDetailsFeedback ? dogoblock_web_app_default.a.pdBtnSaveDetailsDone : dogoblock_web_app_default.a.pdBtnSaveDetails,
        disabled: pdSavingDetails,
        onClick: this.handlePdSaveDetails
      }, /*#__PURE__*/react_default.a.createElement(save["a" /* default */], {
        "aria-hidden": "true",
        size: 14
      }), pdSavingDetails ? 'Salvando...' : pdSaveDetailsFeedback ? 'Salvo! ✓' : 'Salvar alterações') : null)), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.pdComments
      }, /*#__PURE__*/react_default.a.createElement("h2", {
        className: dogoblock_web_app_default.a.pdCommentsTitle
      }, 'Comentários'), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.pdCommentComposer
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.pdCommentAvatar
      }, user ? /*#__PURE__*/react_default.a.createElement("span", {
        className: dogoblock_web_app_default.a.pdCommentAvatarInitials
      }, dogoblock_web_app_getInitials(user)) : /*#__PURE__*/react_default.a.createElement(circle_user["a" /* default */], {
        "aria-hidden": "true",
        size: 28
      })), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.pdCommentInputWrap
      }, /*#__PURE__*/react_default.a.createElement("textarea", {
        className: dogoblock_web_app_default.a.pdCommentInput,
        id: "pd-comment-input",
        placeholder: user ? 'Escreva um comentário...' : 'Faça login para comentar',
        rows: 3,
        value: pdCommentText,
        onChange: this.handlePdCommentChange
      }), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.pdCommentActions
      }, /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.pdBtnPublish,
        disabled: pdCommentsLoading || !pdCommentText.trim(),
        onClick: this.handlePdCommentSubmit
      }, pdCommentsLoading ? 'Publicando...' : 'Publicar'), /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.pdBtnCancel,
        onClick: this.handlePdCommentCancel
      }, 'Cancelar')))), pdComments.length > 0 ? /*#__PURE__*/react_default.a.createElement("ul", {
        className: dogoblock_web_app_default.a.pdCommentList
      }, pdComments.map(function (comment) {
        var commentAuthor = comment.username || comment.author || comment.user && (comment.user.username || comment.user.name) || 'Usuário';
        var commentUsername = comment.user && comment.user.username || comment.username || commentAuthor;
        var canDelete = user && (String(user.id) === String(comment.userId || comment.user && comment.user.id) || isOwner);
        var isReplying = pdReplyToId === String(comment.id);
        return /*#__PURE__*/react_default.a.createElement("li", {
          className: dogoblock_web_app_default.a.pdCommentItem,
          key: comment.id
        }, /*#__PURE__*/react_default.a.createElement("div", {
          className: dogoblock_web_app_default.a.pdCommentItemAvatar
        }, /*#__PURE__*/react_default.a.createElement(circle_user["a" /* default */], {
          "aria-hidden": "true",
          size: 32
        })), /*#__PURE__*/react_default.a.createElement("div", {
          className: dogoblock_web_app_default.a.pdCommentItemBody
        }, /*#__PURE__*/react_default.a.createElement("button", {
          className: dogoblock_web_app_default.a.pdCommentItemAuthorLink,
          "data-username": commentUsername,
          onClick: _this32.handleNavigatePublicProfile
        }, "@".concat(commentAuthor)), /*#__PURE__*/react_default.a.createElement("p", {
          className: dogoblock_web_app_default.a.pdCommentItemText
        }, comment.content), user ? /*#__PURE__*/react_default.a.createElement("button", {
          className: dogoblock_web_app_default.a.pdCommentReplyBtn,
          "data-comment-id": comment.id,
          onClick: isReplying ? _this32.handlePdReplyCancel : _this32.handlePdReplyOpen
        }, /*#__PURE__*/react_default.a.createElement(message_circle["a" /* default */], {
          "aria-hidden": "true",
          size: 12
        }), isReplying ? 'Cancelar' : 'Responder') : null, isReplying ? /*#__PURE__*/react_default.a.createElement("div", {
          className: dogoblock_web_app_default.a.pdReplyComposer
        }, /*#__PURE__*/react_default.a.createElement("div", {
          className: dogoblock_web_app_default.a.pdCommentAvatar,
          style: {
            width: '2rem',
            height: '2rem'
          }
        }, /*#__PURE__*/react_default.a.createElement("span", {
          className: dogoblock_web_app_default.a.pdCommentAvatarInitials,
          style: {
            fontSize: '0.7rem'
          }
        }, dogoblock_web_app_getInitials(user))), /*#__PURE__*/react_default.a.createElement("div", {
          className: dogoblock_web_app_default.a.pdCommentInputWrap
        }, /*#__PURE__*/react_default.a.createElement("textarea", {
          autoFocus: true,
          className: dogoblock_web_app_default.a.pdCommentInput,
          placeholder: "Respondendo a @".concat(commentAuthor, "..."),
          rows: 2,
          value: pdReplyText,
          onChange: _this32.handlePdReplyChange
        }), /*#__PURE__*/react_default.a.createElement("div", {
          className: dogoblock_web_app_default.a.pdCommentActions
        }, /*#__PURE__*/react_default.a.createElement("button", {
          className: dogoblock_web_app_default.a.pdBtnPublish,
          disabled: pdReplyLoading || !pdReplyText.trim(),
          onClick: _this32.handlePdReplySubmit
        }, pdReplyLoading ? 'Enviando...' : 'Responder'), /*#__PURE__*/react_default.a.createElement("button", {
          className: dogoblock_web_app_default.a.pdBtnCancel,
          onClick: _this32.handlePdReplyCancel
        }, 'Cancelar')))) : null, comment.replies && comment.replies.length > 0 ? /*#__PURE__*/react_default.a.createElement("ul", {
          className: dogoblock_web_app_default.a.pdReplyList
        }, comment.replies.map(function (reply) {
          var replyAuthor = reply.username || reply.author || reply.user && (reply.user.username || reply.user.name) || 'Usuário';
          var replyUsername = reply.user && reply.user.username || reply.username || replyAuthor;
          var canDeleteReply = user && (String(user.id) === String(reply.userId || reply.user && reply.user.id) || isOwner);
          return /*#__PURE__*/react_default.a.createElement("li", {
            className: dogoblock_web_app_default.a.pdReplyItem,
            key: reply.id
          }, /*#__PURE__*/react_default.a.createElement("div", {
            className: dogoblock_web_app_default.a.pdCommentItemAvatar
          }, /*#__PURE__*/react_default.a.createElement(circle_user["a" /* default */], {
            "aria-hidden": "true",
            size: 24
          })), /*#__PURE__*/react_default.a.createElement("div", {
            className: dogoblock_web_app_default.a.pdCommentItemBody
          }, /*#__PURE__*/react_default.a.createElement("button", {
            className: dogoblock_web_app_default.a.pdCommentItemAuthorLink,
            "data-username": replyUsername,
            onClick: _this32.handleNavigatePublicProfile
          }, "@".concat(replyAuthor)), /*#__PURE__*/react_default.a.createElement("p", {
            className: dogoblock_web_app_default.a.pdCommentItemText
          }, reply.content)), canDeleteReply ? /*#__PURE__*/react_default.a.createElement("button", {
            "aria-label": "Excluir resposta",
            className: dogoblock_web_app_default.a.pdCommentItemDelete,
            "data-reply-id": reply.id,
            "data-parent-id": comment.id,
            onClick: _this32.handlePdDeleteReply
          }, /*#__PURE__*/react_default.a.createElement(trash_2["a" /* default */], {
            "aria-hidden": "true",
            size: 14
          })) : null);
        })) : null), canDelete ? /*#__PURE__*/react_default.a.createElement("button", {
          "aria-label": "Excluir coment\xE1rio",
          className: dogoblock_web_app_default.a.pdCommentItemDelete,
          "data-comment-id": comment.id,
          onClick: _this32.handlePdDeleteComment
        }, /*#__PURE__*/react_default.a.createElement(trash_2["a" /* default */], {
          "aria-hidden": "true",
          size: 14
        })) : null);
      })) : /*#__PURE__*/react_default.a.createElement("p", {
        className: dogoblock_web_app_default.a.pdCommentEmpty
      }, 'Nenhum comentário ainda. Seja o primeiro!')));
    }
  }, {
    key: "renderForgotPassword",
    value: function renderForgotPassword() {
      var _this$state5 = this.state,
          forgotPasswordSuccess = _this$state5.forgotPasswordSuccess,
          loading = _this$state5.loading,
          error = _this$state5.error;
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.authSection
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.authCardWrap
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.panel
      }, /*#__PURE__*/react_default.a.createElement("h1", null, 'Recuperar Senha'), forgotPasswordSuccess ? /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.successBox
      }, /*#__PURE__*/react_default.a.createElement("p", null, '✓ E-mail enviado! Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.'), /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.primaryButton,
        style: {
          marginTop: '1rem',
          width: '100%'
        },
        onClick: this.handleNavigateLogin
      }, 'Voltar para o Login')) : /*#__PURE__*/react_default.a.createElement("form", {
        onSubmit: this.handleForgotPassword
      }, /*#__PURE__*/react_default.a.createElement("p", {
        className: dogoblock_web_app_default.a.formHint,
        style: {
          marginTop: 0,
          marginBottom: '1rem'
        }
      }, 'Digite seu e-mail cadastrado e enviaremos um link para redefinir sua senha.'), error ? /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.error
      }, error) : null, /*#__PURE__*/react_default.a.createElement("label", {
        className: dogoblock_web_app_default.a.field
      }, 'Email', /*#__PURE__*/react_default.a.createElement("input", {
        required: true,
        name: "email",
        type: "email"
      })), /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.primaryButton,
        style: {
          width: '100%'
        }
      }, loading ? 'Enviando...' : 'Enviar link de recuperação'), /*#__PURE__*/react_default.a.createElement("p", {
        className: dogoblock_web_app_default.a.formHint
      }, /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.inlineButton,
        type: "button",
        onClick: this.handleNavigateLogin
      }, '← Voltar para o login'))))));
    }
  }, {
    key: "renderResetPassword",
    value: function renderResetPassword() {
      var _this$state6 = this.state,
          resetPasswordSuccess = _this$state6.resetPasswordSuccess,
          loading = _this$state6.loading,
          error = _this$state6.error,
          route = _this$state6.route;
      var hasToken = Boolean(route.token);
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.authSection
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.authCardWrap
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.panel
      }, /*#__PURE__*/react_default.a.createElement("h1", null, 'Redefinir Senha'), !hasToken ? /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.error
      }, 'Link inválido ou expirado. Solicite um novo link de recuperação.') : resetPasswordSuccess ? /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.successBox
      }, /*#__PURE__*/react_default.a.createElement("p", null, '✓ Senha redefinida com sucesso!'), /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.primaryButton,
        style: {
          marginTop: '1rem',
          width: '100%'
        },
        onClick: this.handleNavigateLogin
      }, 'Entrar na conta')) : /*#__PURE__*/react_default.a.createElement("form", {
        onSubmit: this.handleResetPassword
      }, error ? /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.error
      }, error) : null, /*#__PURE__*/react_default.a.createElement("label", {
        className: dogoblock_web_app_default.a.field
      }, 'Nova Senha', /*#__PURE__*/react_default.a.createElement("input", {
        required: true,
        autoFocus: true,
        minLength: "8",
        name: "password",
        type: "password"
      })), /*#__PURE__*/react_default.a.createElement("label", {
        className: dogoblock_web_app_default.a.field
      }, 'Confirmar Nova Senha', /*#__PURE__*/react_default.a.createElement("input", {
        required: true,
        minLength: "8",
        name: "confirm",
        type: "password"
      })), /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.primaryButton,
        style: {
          width: '100%'
        }
      }, loading ? 'Salvando...' : 'Redefinir Senha')))));
    }
  }, {
    key: "renderPublicProfile",
    value: function renderPublicProfile() {
      var _this$state7 = this.state,
          publicProfile = _this$state7.publicProfile,
          loading = _this$state7.loading,
          error = _this$state7.error;

      if (loading && !publicProfile) {
        return /*#__PURE__*/react_default.a.createElement("div", {
          className: dogoblock_web_app_default.a.page
        }, /*#__PURE__*/react_default.a.createElement("p", null, 'Carregando perfil...'));
      }

      if (error && !publicProfile) {
        return /*#__PURE__*/react_default.a.createElement("div", {
          className: dogoblock_web_app_default.a.page
        }, /*#__PURE__*/react_default.a.createElement("div", {
          className: dogoblock_web_app_default.a.error
        }, error));
      }

      if (!publicProfile) return null;
      var projects = publicProfile.projects || [];
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(dogoblock_web_app_default.a.page, " ").concat(dogoblock_web_app_default.a.publicProfilePage)
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(dogoblock_web_app_default.a.publicProfileHeader, " ").concat(dogoblock_web_app_default.a.panel)
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.publicProfileAvatar
      }, publicProfile.avatarUrl ? /*#__PURE__*/react_default.a.createElement("img", {
        alt: publicProfile.username,
        src: publicProfile.avatarUrl
      }) : /*#__PURE__*/react_default.a.createElement("span", null, dogoblock_web_app_getInitials(publicProfile))), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.publicProfileInfo
      }, /*#__PURE__*/react_default.a.createElement("h1", {
        className: dogoblock_web_app_default.a.publicProfileName
      }, publicProfile.name || publicProfile.username), /*#__PURE__*/react_default.a.createElement("span", {
        className: dogoblock_web_app_default.a.publicProfileUsername
      }, "@".concat(publicProfile.username)), publicProfile.bio ? /*#__PURE__*/react_default.a.createElement("p", {
        className: dogoblock_web_app_default.a.publicProfileBio
      }, publicProfile.bio) : null, publicProfile.workingOn ? /*#__PURE__*/react_default.a.createElement("p", {
        className: dogoblock_web_app_default.a.publicProfileWorking
      }, /*#__PURE__*/react_default.a.createElement("strong", null, 'Trabalhando em: '), publicProfile.workingOn) : null, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.publicProfileStats
      }, /*#__PURE__*/react_default.a.createElement("span", {
        className: dogoblock_web_app_default.a.publicProfileStat
      }, /*#__PURE__*/react_default.a.createElement("strong", null, publicProfile.publicProjectCount || 0), ' Projetos')))), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.profileSection2
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.profileSectionHeader
      }, /*#__PURE__*/react_default.a.createElement("h2", {
        className: dogoblock_web_app_default.a.profileSectionHeading
      }, "PROJETOS (".concat(projects.length, ")"))), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.profileSectionBody
      }, projects.length ? this.renderProjectCards(projects, false) : /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.emptyState
      }, 'Este usuário ainda não publicou projetos.'))));
    }
  }, {
    key: "renderEditor",
    value: function renderEditor() {
      var route = this.state.route;
      var canPersist = Boolean(this.props.user);
      var projectId = route.projectId || project_state["f" /* defaultProjectId */];
      return /*#__PURE__*/react_default.a.createElement(gui["a" /* default */], {
        key: "project-editor-".concat(projectId),
        canCreateNew: canPersist,
        canEditTitle: true,
        canPromptLoginToSave: !canPersist,
        canSave: canPersist,
        saveUploadedProjectAsNew: true,
        assetHost: Object(dogoblock_api_config["b" /* getAssetHost */])(),
        autoStartFileUploadKey: route.importProject ? route.importKey : null,
        projectHost: Object(dogoblock_api_config["c" /* getProjectHost */])(),
        projectId: projectId,
        routeProjectId: projectId,
        onClickLogo: this.handleNavigateHome,
        onProjectLoaded: noop,
        onRequestLoginToSave: this.handleRequestLoginToSave,
        onShowMessageBox: this.handleShowMessageBox,
        onUpdateProjectId: this.handleProjectCreated
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this33 = this;

      var route = this.state.route;
      var editor = route.name === 'editor';
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: editor ? dogoblock_web_app_default.a.editorShell : dogoblock_web_app_default.a.appShell
      }, editor ? null : this.renderHeader(), route.name === 'home' ? this.renderHome() : null, route.name === 'login' ? this.renderLogin() : null, route.name === 'register' ? this.renderRegister() : null, route.name === 'forgotPassword' ? this.renderForgotPassword() : null, route.name === 'resetPassword' ? this.renderResetPassword() : null, route.name === 'projects' || route.name === 'explore' ? this.renderProjects() : null, route.name === 'profile' ? this.renderProfile() : null, route.name === 'publicProfile' ? this.renderPublicProfile() : null, route.name === 'projectDetails' ? this.renderProjectDetails() : null, editor ? this.renderEditor() : null, editor ? null : this.renderFooter(), !editor && this.state.toastNotification ? /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.toastContainer
      }, /*#__PURE__*/react_default.a.createElement(notifications_notification_toast, {
        notification: this.state.toastNotification,
        onClick: function onClick() {
          _this33.handleDismissToast();

          _this33.handleOpenNotification(_this33.state.toastNotification);
        },
        onDismiss: this.handleDismissToast
      })) : null);
    }
  }]);

  return DogoblockWebApp;
}(react_default.a.Component);

dogoblock_web_app_DogoblockWebApp.propTypes = {
  onLoginSuccess: prop_types_default.a.func.isRequired,
  onLogout: prop_types_default.a.func.isRequired,
  onSetPlayerOnly: prop_types_default.a.func.isRequired,
  user: prop_types_default.a.shape({
    id: prop_types_default.a.string,
    name: prop_types_default.a.string,
    email: prop_types_default.a.string,
    username: prop_types_default.a.string
  })
};

var dogoblock_web_app_mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.session && state.session.session ? state.session.session.user : null
  };
};

var dogoblock_web_app_mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onLoginSuccess: function onLoginSuccess(session) {
      return dispatch(Object(reducers_session["b" /* loginSuccess */])(session));
    },
    onLogout: function onLogout() {
      return dispatch(Object(reducers_session["c" /* logout */])());
    },
    onSetPlayerOnly: function onSetPlayerOnly(isPlayerOnly) {
      return dispatch(Object(mode["d" /* setPlayer */])(isPlayerOnly));
    }
  };
};

/* harmony default export */ var playground_dogoblock_web_app = (Object(react_redux_es["b" /* connect */])(dogoblock_web_app_mapStateToProps, dogoblock_web_app_mapDispatchToProps)(dogoblock_web_app_DogoblockWebApp));
// EXTERNAL MODULE: ./src/lib/hash-parser-hoc.jsx
var hash_parser_hoc = __webpack_require__(292);

// EXTERNAL MODULE: ./src/lib/log.js
var log = __webpack_require__(58);

// CONCATENATED MODULE: ./src/playground/render-gui.jsx
function render_gui_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { render_gui_typeof = function _typeof(obj) { return typeof obj; }; } else { render_gui_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return render_gui_typeof(obj); }













var render_gui_onClickCheckUpdate = function onClickCheckUpdate() {
  Object(log["a" /* default */])('User click check update');
};

var render_gui_onClickUpdate = function onClickUpdate() {
  Object(log["a" /* default */])('User click update');
};

var render_gui_onAbortUpdate = function onAbortUpdate() {
  Object(log["a" /* default */])('User click abort update');
};

var render_gui_onClickClearCache = function onClickClearCache() {
  Object(log["a" /* default */])('User click clear cahce');
};

var render_gui_onClickInstallDriver = function onClickInstallDriver() {
  Object(log["a" /* default */])('User click install driver');
};

var render_gui_handleTelemetryModalCancel = function handleTelemetryModalCancel() {
  Object(log["a" /* default */])('User canceled telemetry modal');
};

var render_gui_handleTelemetryModalOptIn = function handleTelemetryModalOptIn() {
  Object(log["a" /* default */])('User opted into telemetry');
};

var render_gui_handleTelemetryModalOptOut = function handleTelemetryModalOptOut() {
  Object(log["a" /* default */])('User opted out of telemetry');
};

var onClickAbout = [{
  title: /*#__PURE__*/react_default.a.createElement(index_es["a" /* FormattedMessage */], {
    defaultMessage: "About",
    id: "gui.desktopMenuBar.about"
  }),
  onClick: function onClick() {
    return Object(log["a" /* default */])('About');
  }
}, {
  title: /*#__PURE__*/react_default.a.createElement(index_es["a" /* FormattedMessage */], {
    defaultMessage: "License",
    id: "gui.desktopMenuBar.license"
  }),
  onClick: function onClick() {
    return Object(log["a" /* default */])('License');
  }
}, {
  title: /*#__PURE__*/react_default.a.createElement(index_es["a" /* FormattedMessage */], {
    defaultMessage: "Privacy policy",
    id: "gui.menuBar.privacyPolicy"
  }),
  onClick: function onClick() {
    return Object(log["a" /* default */])('Privacy Policy');
  }
}, {
  title: /*#__PURE__*/react_default.a.createElement(index_es["a" /* FormattedMessage */], {
    defaultMessage: "Data settings",
    id: "gui.menuBar.dataSettings"
  }),
  onClick: function onClick() {
    return Object(log["a" /* default */])('Data Settings');
  }
}];

var render_gui_handleShowMessageBox = function handleShowMessageBox(type, message) {
  if (type === message_box["a" /* default */].confirm) {
    return confirm(message); // eslint-disable-line no-alert
  } else if (type === message_box["a" /* default */].alert) {
    return alert(message); // eslint-disable-line no-alert
  }
};
/*
 * Render the GUI playground. This is a separate function because importing anything
 * that instantiates the VM causes unsupported browsers to crash
 * {object} appTarget - the DOM element to render to
 */


/* harmony default export */ var render_gui = __webpack_exports__["default"] = (function (appTarget) {
  gui["a" /* default */].setAppElement(appTarget); // note that redux's 'compose' function is just being used as a general utility to make
  // the hierarchy of HOC constructor calls clearer here; it has nothing to do with redux's
  // ability to compose reducers.

  var WrappedGui = Object(es["d" /* compose */])(app_state_hoc["a" /* default */], hash_parser_hoc["a" /* default */])(gui["a" /* default */]);
  var WrappedStandaloneGui = Object(app_state_hoc["a" /* default */])(gui["a" /* default */]);
  var WrappedDogoblockWebApp = Object(app_state_hoc["a" /* default */])(playground_dogoblock_web_app);
  var isTauriLight = "false" === 'true';
  var scratchDesktopMatches = window.location.href.match(/[?&]isScratchDesktop=([^&]+)/);
  var simulateScratchDesktop;

  if (scratchDesktopMatches) {
    try {
      // parse 'true' into `true`, 'false' into `false`, etc.
      simulateScratchDesktop = JSON.parse(scratchDesktopMatches[1]);
    } catch (_unused) {
      // it's not JSON so just use the string
      // note that a typo like "falsy" will be treated as true
      simulateScratchDesktop = scratchDesktopMatches[1];
    }
  }

  if ( true && (typeof window === "undefined" ? "undefined" : render_gui_typeof(window)) === 'object') {
    // Warn before navigating away
    window.onbeforeunload = function () {
      return true;
    };
  }

  var app;

  if (isTauriLight) {
    app = /*#__PURE__*/react_default.a.createElement(WrappedStandaloneGui, {
      canEditTitle: true,
      assetHost: Object(dogoblock_api_config["b" /* getAssetHost */])(),
      canSave: false,
      onShowMessageBox: render_gui_handleShowMessageBox
    });
  } else if (simulateScratchDesktop) {
    app = /*#__PURE__*/react_default.a.createElement(WrappedGui, {
      canEditTitle: true,
      isScratchDesktop: true,
      onClickAbout: onClickAbout,
      showTelemetryModal: true,
      canSave: false,
      onTelemetryModalCancel: render_gui_handleTelemetryModalCancel,
      onTelemetryModalOptIn: render_gui_handleTelemetryModalOptIn,
      onTelemetryModalOptOut: render_gui_handleTelemetryModalOptOut,
      onAbortUpdate: render_gui_onAbortUpdate,
      onClickCheckUpdate: render_gui_onClickCheckUpdate,
      onClickUpdate: render_gui_onClickUpdate,
      onClickClearCache: render_gui_onClickClearCache,
      onClickInstallDriver: render_gui_onClickInstallDriver,
      onShowMessageBox: render_gui_handleShowMessageBox
    });
  } else {
    app = /*#__PURE__*/react_default.a.createElement(WrappedDogoblockWebApp, null);
  }

  react_dom_default.a.render(app, appTarget);
});

/***/ }),

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(2059);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(23)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(2060);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(23)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 969:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(1670);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(23)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ })

},[[1228,0]]]);
//# sourceMappingURL=gui.js.map