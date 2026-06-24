var GUI =
(window["webpackJsonpGUI"] = window["webpackJsonpGUI"] || []).push([[7],{

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(2058);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(22)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 1227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var es6_object_assign_auto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1228);
/* harmony import */ var es6_object_assign_auto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(es6_object_assign_auto__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_fn_array_includes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1230);
/* harmony import */ var core_js_fn_array_includes__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_fn_array_includes__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_fn_promise_finally__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1242);
/* harmony import */ var core_js_fn_promise_finally__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_fn_promise_finally__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var intl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1259);
/* harmony import */ var intl__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(intl__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(119);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lib_analytics__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(121);
/* harmony import */ var _lib_app_state_hoc_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(230);
/* harmony import */ var _components_browser_modal_browser_modal_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(410);
/* harmony import */ var _lib_supported_browser__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(411);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(969);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_10__);
// Polyfills



 // For Safari 9








Object(_lib_analytics__WEBPACK_IMPORTED_MODULE_6__[/* initialAnalytics */ "b"])(); // Register "base" page view

_lib_analytics__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"].send({
  hitType: 'pageview',
  page: '/community/web'
});
var appTarget = document.createElement('div');
appTarget.className = _index_css__WEBPACK_IMPORTED_MODULE_10___default.a.app;
document.body.appendChild(appTarget);

if (Object(_lib_supported_browser__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"])()) {
  // require needed here to avoid importing unsupported browser-crashing code
  // at the top level
  __webpack_require__(2074).default(appTarget);
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

/***/ 1261:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1669:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(21)(false);
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

exports = module.exports = __webpack_require__(21)(false);
// imports


// module
exports.push([module.i, ".notifications-bell_wrap_2Gb76 {\n    position: relative;\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n\n.notifications-bell_bell-button_3oITE {\n    position: relative;\n    min-width: 2.2rem;\n    min-height: 2.2rem;\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    border: 0;\n    border-radius: 999px;\n    color: #ffffff;\n    background: rgba(255, 255, 255, 0.12);\n    cursor: pointer;\n}\n\n.notifications-bell_bell-button_3oITE:hover,\n.notifications-bell_bell-button_3oITE:focus {\n    background: rgba(255, 255, 255, 0.2);\n    outline: none;\n}\n\n.notifications-bell_bell-icon_3P5Oj {\n    width: 1.05rem;\n    height: 1.05rem;\n    stroke-width: 2.6;\n}\n\n.notifications-bell_badge_1o5qe {\n    position: absolute;\n    top: -0.25rem;\n    right: -0.2rem;\n    min-width: 1rem;\n    height: 1rem;\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    border: 0.12rem solid #243f8f;\n    border-radius: 999px;\n    padding: 0 0.18rem;\n    color: #ffffff;\n    background: #ff2b2b;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 0.52rem;\n    line-height: 1;\n}\n\n.notifications-bell_dropdown_2ae_J {\n    position: absolute;\n    top: calc(100% + 0.65rem);\n    right: 0;\n    z-index: 1000;\n    width: min(22rem, calc(100vw - 1rem));\n    overflow: hidden;\n    border: 0.18rem solid #182b63;\n    border-radius: 0.85rem;\n    color: #182b63;\n    background: #ffffff;\n    -webkit-box-shadow: 0.4rem 0.45rem 0 rgba(24, 43, 99, 0.18);\n            box-shadow: 0.4rem 0.45rem 0 rgba(24, 43, 99, 0.18);\n}\n\n.notifications-bell_dropdown-header_1YQG6 {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    gap: 0.75rem;\n    padding: 0.8rem;\n    background: #eaf2ff;\n}\n\n.notifications-bell_dropdown-title_24Sfo {\n    margin: 0;\n    color: #243f8f;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 0.78rem;\n    font-weight: 400;\n}\n\n.notifications-bell_read-all-button_2Twre {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.28rem;\n    border: 0;\n    border-radius: 0.4rem;\n    padding: 0.42rem 0.55rem;\n    color: #243f8f;\n    background: #ffffff;\n    -webkit-box-shadow: inset 0 0 0 0.1rem #c6d6ff;\n            box-shadow: inset 0 0 0 0.1rem #c6d6ff;\n    font-family: \"Montserrat\", sans-serif;\n    font-size: 0.72rem;\n    font-weight: 800;\n    cursor: pointer;\n}\n\n.notifications-bell_read-all-button_2Twre:disabled {\n    cursor: default;\n    opacity: 0.55;\n}\n\n.notifications-bell_read-all-icon_2ThKc,\n.notifications-bell_item-icon_3BmDd {\n    width: 0.85rem;\n    height: 0.85rem;\n    stroke-width: 2.6;\n}\n\n.notifications-bell_list_kcgAh {\n    max-height: 25rem;\n    overflow-y: auto;\n}\n\n.notifications-bell_item_IWcJ6 {\n    width: 100%;\n    display: grid;\n    grid-template-columns: auto minmax(0, 1fr) auto;\n    gap: 0.65rem;\n    border: 0;\n    border-top: 0.08rem solid #d7e0f5;\n    padding: 0.75rem 0.8rem;\n    color: inherit;\n    background: #ffffff;\n    text-align: left;\n    cursor: pointer;\n}\n\n.notifications-bell_item_IWcJ6:hover,\n.notifications-bell_item_IWcJ6:focus {\n    background: #f6f9ff;\n    outline: none;\n}\n\n.notifications-bell_item-unread_Ph7eH {\n    background: #fff8e7;\n}\n\n.notifications-bell_avatar_2SaaP {\n    width: 2.15rem;\n    height: 2.15rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    overflow: hidden;\n    border-radius: 0.55rem;\n    color: #ffffff;\n    background: #7e55d8;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 0.72rem;\n}\n\n.notifications-bell_avatar_2SaaP img {\n    width: 100%;\n    height: 100%;\n    -o-object-fit: cover;\n       object-fit: cover;\n}\n\n.notifications-bell_item-body_2lOVb {\n    min-width: 0;\n}\n\n.notifications-bell_message_2YmvN {\n    margin: 0;\n    color: #344473;\n    font-size: 0.82rem;\n    font-weight: 700;\n    line-height: 1.35;\n}\n\n.notifications-bell_actor_iFRfs {\n    color: #243f8f;\n    font-weight: 900;\n}\n\n.notifications-bell_project_1u-DJ {\n    margin: 0.25rem 0 0;\n    overflow: hidden;\n    color: #56648e;\n    font-size: 0.72rem;\n    font-weight: 700;\n    -o-text-overflow: ellipsis;\n       text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n.notifications-bell_date_3WZ9n {\n    margin: 0.28rem 0 0;\n    color: #7280a8;\n    font-size: 0.68rem;\n    font-weight: 700;\n}\n\n.notifications-bell_unread-dot_Kc_ji {\n    width: 0.58rem;\n    height: 0.58rem;\n    -webkit-align-self: start;\n        -ms-flex-item-align: start;\n            align-self: start;\n    border-radius: 999px;\n    background: #ff2b2b;\n}\n\n.notifications-bell_empty_1HBoX,\n.notifications-bell_loading_Zw28E {\n    padding: 1.25rem;\n    color: #56648e;\n    font-size: 0.86rem;\n    font-weight: 800;\n    text-align: center;\n}\n\n.notifications-bell_footer_2pZPQ {\n    border-top: 0.08rem solid #d7e0f5;\n    padding: 0.65rem 0.8rem;\n    color: #7280a8;\n    background: #f6f9ff;\n    font-size: 0.72rem;\n    font-weight: 700;\n    text-align: center;\n}\n\n@media (max-width: 48rem) {\n    .notifications-bell_dropdown_2ae_J {\n        right: -4rem;\n    }\n}\n", ""]);

// exports
exports.locals = {
	"wrap": "notifications-bell_wrap_2Gb76",
	"bell-button": "notifications-bell_bell-button_3oITE",
	"bellButton": "notifications-bell_bell-button_3oITE",
	"bell-icon": "notifications-bell_bell-icon_3P5Oj",
	"bellIcon": "notifications-bell_bell-icon_3P5Oj",
	"badge": "notifications-bell_badge_1o5qe",
	"dropdown": "notifications-bell_dropdown_2ae_J",
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
	"list": "notifications-bell_list_kcgAh",
	"item": "notifications-bell_item_IWcJ6",
	"item-unread": "notifications-bell_item-unread_Ph7eH",
	"itemUnread": "notifications-bell_item-unread_Ph7eH",
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
	"footer": "notifications-bell_footer_2pZPQ"
};

/***/ }),

/***/ 2059:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(21)(false);
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

/***/ 2060:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(21)(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css2?family=Bungee&family=Montserrat:wght@400;600;700;800&display=swap);", ""]);

// module
exports.push([module.i, ".dogoblock-web-app_app-shell_2PA39 {\n    min-height: 100vh;\n    background: #ffffff;\n    color: #182b63;\n    font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n}\n\n.dogoblock-web-app_topbar_3aLHW {\n    min-height: 4.25rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    gap: 1.25rem;\n    padding: 0.35rem 5.8rem;\n    background: #243f8f;\n    color: #ffffff;\n    -webkit-box-shadow: 0 0.18rem 0 rgba(24, 43, 99, 0.25);\n            box-shadow: 0 0.18rem 0 rgba(24, 43, 99, 0.25);\n}\n\n.dogoblock-web-app_brand_25VAQ {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    min-width: 8.5rem;\n    cursor: pointer;\n}\n\n.dogoblock-web-app_logo_2DRMj {\n    display: block;\n    width: 7.75rem;\n    height: auto;\n}\n\n.dogoblock-web-app_nav_5Hvdh {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: end;\n    -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n    gap: 1.35rem;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n    font-size: 0.78rem;\n    font-weight: 700;\n}\n\n.dogoblock-web-app_nav-button_1dItK,\n.dogoblock-web-app_inline-button_wEmD4 {\n    border: 0;\n    padding: 0;\n    background: transparent;\n    color: inherit;\n    font: inherit;\n    cursor: pointer;\n}\n\n.dogoblock-web-app_nav-button_1dItK {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.32rem;\n    color: #ffffff;\n    line-height: 1.2;\n}\n\n.dogoblock-web-app_nav-icon_27ZE8 {\n    width: 0.9rem;\n    height: 0.9rem;\n    stroke-width: 2.4;\n}\n\n.dogoblock-web-app_icon-wrap_sITAL,\n.dogoblock-web-app_inline-icon_3pGo_ {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n}\n\n.dogoblock-web-app_icon-wrap_sITAL {\n    width: 1rem;\n    height: 1rem;\n    margin-right: 0.35rem;\n}\n\n.dogoblock-web-app_icon-wrap_sITAL svg,\n.dogoblock-web-app_inline-icon_3pGo_ {\n    width: 1rem;\n    height: 1rem;\n    stroke-width: 2.6;\n}\n\n.dogoblock-web-app_inline-icon_3pGo_ {\n    margin-right: 0.32rem;\n    vertical-align: -0.18rem;\n}\n\n.dogoblock-web-app_nav-button_1dItK:hover,\n.dogoblock-web-app_inline-button_wEmD4:hover {\n    text-decoration: underline;\n}\n\n.dogoblock-web-app_user-badge_38q0T {\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.35rem;\n    color: #ffffff;\n    font-weight: 800;\n}\n\n.dogoblock-web-app_user-badge_38q0T::before {\n    content: \"\";\n    width: 0.75rem;\n    height: 0.75rem;\n    border-radius: 999px;\n    background: #ffffff;\n    -webkit-box-shadow: inset 0 -0.22rem 0 #c6d6ff;\n            box-shadow: inset 0 -0.22rem 0 #c6d6ff;\n}\n\n.dogoblock-web-app_page_z_onn {\n    width: min(100% - 2rem, 74rem);\n    margin: 0 auto;\n    padding: 2.3rem 0 3rem;\n}\n\n.dogoblock-web-app_home-page_4fkF1 {\n    padding-top: 3.25rem;\n}\n\n.dogoblock-web-app_hero_1xxqp {\n    min-height: 29rem;\n    display: grid;\n    grid-template-columns: minmax(0, 1.1fr) minmax(16rem, 0.9fr);\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 2.5rem;\n}\n\n.dogoblock-web-app_hero-copy_156mN {\n    max-width: 44rem;\n}\n\n.dogoblock-web-app_kicker_1y7vH {\n    margin: 0 0 0.65rem;\n    color: #ff2b2b;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 0.9rem;\n}\n\n.dogoblock-web-app_hero_1xxqp h1,\n.dogoblock-web-app_page-header_2q-ME h1,\n.dogoblock-web-app_panel_Q0s02 h1 {\n    margin: 0;\n    color: #243f8f;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-weight: 400;\n    letter-spacing: 0;\n    line-height: 1.05;\n}\n\n.dogoblock-web-app_hero_1xxqp h1 {\n    max-width: 40rem;\n    font-size: clamp(2.2rem, 5vw, 4.8rem);\n}\n\n.dogoblock-web-app_hero-text_2OLVS {\n    max-width: 35rem;\n    margin: 1.2rem 0 0;\n    color: #344473;\n    font-size: 1.05rem;\n    font-weight: 600;\n    line-height: 1.55;\n}\n\n.dogoblock-web-app_hero-actions_2Mbfc,\n.dogoblock-web-app_actions_XinWC {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n    gap: 0.65rem;\n}\n\n.dogoblock-web-app_hero-actions_2Mbfc {\n    margin-top: 1.5rem;\n}\n\n.dogoblock-web-app_hero-preview_SVneW {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: end;\n    -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n}\n\n.dogoblock-web-app_preview-card_vDMIu {\n    width: min(100%, 23rem);\n    padding: 0.75rem;\n    border: 0.42rem solid #182b63;\n    border-radius: 1.25rem;\n    background: #0739a5;\n    color: #ffffff;\n    -webkit-box-shadow: 0.6rem 0.7rem 0 #d8e4ff;\n            box-shadow: 0.6rem 0.7rem 0 #d8e4ff;\n}\n\n.dogoblock-web-app_preview-window_3Grs6 {\n    height: 14rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    margin-bottom: 0.75rem;\n    border-radius: 0.65rem;\n    background:\n        -o-radial-gradient(76% 18%, circle, #ff8a1d 0 10%, transparent 11%),\n        -o-linear-gradient(315deg, #b4c4df 0 42%, #7f8ea8 43% 100%);\n    background:\n        radial-gradient(circle at 76% 18%, #ff8a1d 0 10%, transparent 11%),\n        linear-gradient(135deg, #b4c4df 0 42%, #7f8ea8 43% 100%);\n    overflow: hidden;\n}\n\n.dogoblock-web-app_preview-window_3Grs6 span {\n    color: #d800ff;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 2.1rem;\n    text-shadow: 0.12rem 0.12rem 0 #182b63;\n}\n\n.dogoblock-web-app_preview-card_vDMIu strong,\n.dogoblock-web-app_preview-card_vDMIu small {\n    display: block;\n    padding: 0 0.2rem;\n}\n\n.dogoblock-web-app_preview-card_vDMIu strong {\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 1rem;\n    font-weight: 400;\n}\n\n.dogoblock-web-app_preview-card_vDMIu small {\n    margin-top: 0.15rem;\n    font-size: 0.72rem;\n    font-weight: 800;\n}\n\n.dogoblock-web-app_narrow-page_186pT {\n    width: min(100% - 2rem, 28rem);\n    padding-top: 3.5rem;\n}\n\n.dogoblock-web-app_panel_Q0s02 {\n    background: #ffffff;\n    border: 0.18rem solid #243f8f;\n    border-radius: 0.85rem;\n    padding: 1.4rem;\n    -webkit-box-shadow: 0.35rem 0.45rem 0 #d8e4ff;\n            box-shadow: 0.35rem 0.45rem 0 #d8e4ff;\n}\n\n.dogoblock-web-app_panel_Q0s02 h1 {\n    margin-bottom: 1rem;\n    font-size: 1.75rem;\n}\n\n.dogoblock-web-app_page-header_2q-ME {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    gap: 1rem;\n    margin-bottom: 1.25rem;\n}\n\n.dogoblock-web-app_page-header_2q-ME h1 {\n    font-size: 1.9rem;\n    text-transform: uppercase;\n}\n\n.dogoblock-web-app_primary-button_J8O77,\n.dogoblock-web-app_secondary-button_1TFxG,\n.dogoblock-web-app_danger-button_1pdOP,\n.dogoblock-web-app_light-button_KaXx_ {\n    min-height: 2.15rem;\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    border: 0;\n    border-radius: 0.45rem;\n    padding: 0 0.85rem;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 0.62rem;\n    font-weight: 400;\n    letter-spacing: 0;\n    line-height: 1;\n    text-transform: uppercase;\n    cursor: pointer;\n    -webkit-transition: -webkit-transform 120ms ease, -webkit-box-shadow 120ms ease;\n    transition: -webkit-transform 120ms ease, -webkit-box-shadow 120ms ease;\n    -o-transition: transform 120ms ease, box-shadow 120ms ease;\n    transition: transform 120ms ease, box-shadow 120ms ease;\n    transition: transform 120ms ease, box-shadow 120ms ease, -webkit-transform 120ms ease, -webkit-box-shadow 120ms ease;\n}\n\n.dogoblock-web-app_primary-button_J8O77 {\n    color: #ffffff;\n    background: #243f8f;\n    -webkit-box-shadow: 0 0.2rem 0 #182b63;\n            box-shadow: 0 0.2rem 0 #182b63;\n}\n\n.dogoblock-web-app_secondary-button_1TFxG {\n    color: #243f8f;\n    background: #ffffff;\n    -webkit-box-shadow: inset 0 0 0 0.12rem #d7e0f5, 0 0.2rem 0 #c6d6ff;\n            box-shadow: inset 0 0 0 0.12rem #d7e0f5, 0 0.2rem 0 #c6d6ff;\n}\n\n.dogoblock-web-app_danger-button_1pdOP {\n    color: #ffffff;\n    background: #ff2b2b;\n    -webkit-box-shadow: 0 0.2rem 0 #b51616;\n            box-shadow: 0 0.2rem 0 #b51616;\n}\n\n.dogoblock-web-app_light-button_KaXx_ {\n    color: #243f8f;\n    background: #e7efff;\n    -webkit-box-shadow: 0 0.2rem 0 #c6d6ff;\n            box-shadow: 0 0.2rem 0 #c6d6ff;\n}\n\n.dogoblock-web-app_primary-button_J8O77:hover,\n.dogoblock-web-app_secondary-button_1TFxG:hover,\n.dogoblock-web-app_danger-button_1pdOP:hover,\n.dogoblock-web-app_light-button_KaXx_:hover,\n.dogoblock-web-app_project-card_2NByI:hover {\n    -webkit-transform: translateY(-0.08rem);\n        -ms-transform: translateY(-0.08rem);\n            transform: translateY(-0.08rem);\n}\n\n.dogoblock-web-app_primary-button_J8O77:active,\n.dogoblock-web-app_secondary-button_1TFxG:active,\n.dogoblock-web-app_danger-button_1pdOP:active,\n.dogoblock-web-app_light-button_KaXx_:active,\n.dogoblock-web-app_project-card_2NByI:active {\n    -webkit-transform: translateY(0.05rem);\n        -ms-transform: translateY(0.05rem);\n            transform: translateY(0.05rem);\n}\n\n.dogoblock-web-app_field_VXAJd {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    gap: 0.4rem;\n    margin-bottom: 0.85rem;\n    color: #243f8f;\n    font-size: 0.78rem;\n    font-weight: 800;\n}\n\n.dogoblock-web-app_field_VXAJd input,\n.dogoblock-web-app_field_VXAJd textarea {\n    min-height: 2.65rem;\n    border: 0.14rem solid #c6d6ff;\n    border-radius: 0.55rem;\n    padding: 0 0.75rem;\n    color: #182b63;\n    font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 0.95rem;\n    font-weight: 700;\n    outline: none;\n}\n\n.dogoblock-web-app_field_VXAJd textarea {\n    min-height: 5.5rem;\n    padding-top: 0.7rem;\n    padding-bottom: 0.7rem;\n    line-height: 1.4;\n    resize: vertical;\n}\n\n.dogoblock-web-app_field_VXAJd input:focus,\n.dogoblock-web-app_field_VXAJd textarea:focus {\n    border-color: #243f8f;\n    -webkit-box-shadow: 0 0 0 0.16rem rgba(36, 63, 143, 0.12);\n            box-shadow: 0 0 0 0.16rem rgba(36, 63, 143, 0.12);\n}\n\n.dogoblock-web-app_form-hint_1ve3y {\n    margin: 1rem 0 0;\n    color: #344473;\n    font-size: 0.82rem;\n    font-weight: 700;\n}\n\n.dogoblock-web-app_inline-button_wEmD4 {\n    color: #243f8f;\n    font-weight: 800;\n}\n\n.dogoblock-web-app_error_3uIrk {\n    margin-bottom: 0.9rem;\n    border-radius: 0.45rem;\n    padding: 0.7rem 0.8rem;\n    color: #8d1111;\n    background: #ffe7e7;\n    font-weight: 800;\n}\n\n.dogoblock-web-app_project-grid_W2vKL {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(13.9rem, 13.9rem));\n    gap: 1rem;\n}\n\n.dogoblock-web-app_project-card-wrap_3i3y1 {\n    position: relative;\n    width: 13.9rem;\n}\n\n.dogoblock-web-app_project-card_2NByI {\n    width: 13.9rem;\n    min-height: 11rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-align: stretch;\n    -webkit-align-items: stretch;\n        -ms-flex-align: stretch;\n            align-items: stretch;\n    gap: 0.35rem;\n    border: 0.35rem solid #182b63;\n    border-radius: 0.85rem;\n    padding: 0.45rem 0.45rem 0.55rem;\n    background: #0739a5;\n    color: #ffffff;\n    text-align: left;\n    -webkit-box-shadow: 0 0.18rem 0 rgba(24, 43, 99, 0.35);\n            box-shadow: 0 0.18rem 0 rgba(24, 43, 99, 0.35);\n    cursor: pointer;\n}\n\n.dogoblock-web-app_project-delete-button_1ypDz {\n    position: absolute;\n    top: 0.62rem;\n    right: 0.62rem;\n    width: 2rem;\n    height: 2rem;\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    border: 0.12rem solid #ffffff;\n    border-radius: 0.55rem;\n    color: #ffffff;\n    background: #ff2b2b;\n    -webkit-box-shadow: 0 0.15rem 0 #b51616;\n            box-shadow: 0 0.15rem 0 #b51616;\n    cursor: pointer;\n}\n\n.dogoblock-web-app_project-delete-button_1ypDz:hover {\n    -webkit-transform: translateY(-0.06rem);\n        -ms-transform: translateY(-0.06rem);\n            transform: translateY(-0.06rem);\n}\n\n.dogoblock-web-app_project-thumbnail_26w0a {\n    height: 6.45rem;\n    display: block;\n    overflow: hidden;\n    border-radius: 0.48rem;\n    background: #d8e4ff;\n}\n\n.dogoblock-web-app_project-thumbnail-image_2HJxW {\n    width: 100%;\n    height: 100%;\n    display: block;\n    -o-object-fit: cover;\n       object-fit: cover;\n}\n\n.dogoblock-web-app_project-thumbnail-fallback_18iRF {\n    height: 100%;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    background:\n        -o-radial-gradient(82% 12%, circle, #ff8a1d 0 12%, transparent 13%),\n        -o-linear-gradient(315deg, #bcc8dd 0 45%, #7e8da8 46% 100%);\n    background:\n        radial-gradient(circle at 82% 12%, #ff8a1d 0 12%, transparent 13%),\n        linear-gradient(135deg, #bcc8dd 0 45%, #7e8da8 46% 100%);\n}\n\n.dogoblock-web-app_project-thumbnail-fallback_18iRF span {\n    color: #d800ff;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 1.05rem;\n    text-shadow: 0.08rem 0.08rem 0 #182b63;\n}\n\n.dogoblock-web-app_project-title_1UyeV {\n    display: block;\n    min-height: 1rem;\n    margin-top: 0.15rem;\n    overflow: hidden;\n    color: #ffffff;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 0.74rem;\n    font-weight: 400;\n    line-height: 1.05;\n    -o-text-overflow: ellipsis;\n       text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n.dogoblock-web-app_project-meta_p_s94 {\n    display: block;\n    position: relative;\n    padding-left: 0.55rem;\n    color: #ffffff;\n    font-size: 0.58rem;\n    font-weight: 800;\n    line-height: 1.05;\n}\n\n.dogoblock-web-app_project-meta_p_s94::before {\n    content: \"\";\n    position: absolute;\n    left: 0.05rem;\n    top: 0.22rem;\n    width: 0.24rem;\n    height: 0.24rem;\n    border-radius: 999px;\n    background: #ffffff;\n}\n\n.dogoblock-web-app_empty-state_oJImC {\n    width: min(100%, 28rem);\n    margin-top: 1rem;\n    border: 0.18rem dashed #c6d6ff;\n    border-radius: 0.75rem;\n    padding: 1.4rem;\n    color: #344473;\n    font-weight: 800;\n    text-align: center;\n}\n\n.dogoblock-web-app_project-details-page_HYCVs {\n    width: min(100% - 2rem, 79rem);\n}\n\n.dogoblock-web-app_details-header_3-XXe {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: start;\n    -webkit-align-items: flex-start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    gap: 1.5rem;\n    margin-bottom: 1.45rem;\n}\n\n.dogoblock-web-app_details-title-area_2N4tl {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    min-width: 0;\n    gap: 1rem;\n}\n\n.dogoblock-web-app_details-title-area_2N4tl h1 {\n    margin: 0;\n    overflow: hidden;\n    color: #243f8f;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: clamp(1.8rem, 3vw, 3rem);\n    font-weight: 400;\n    line-height: 1.05;\n    -o-text-overflow: ellipsis;\n       text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n.dogoblock-web-app_details-title-area_2N4tl p {\n    margin: 0.2rem 0 0;\n    color: #56648e;\n    font-size: 0.95rem;\n    font-weight: 700;\n}\n\n.dogoblock-web-app_details-title-area_2N4tl strong {\n    color: #7e55d8;\n}\n\n.dogoblock-web-app_details-avatar_eht0D {\n    width: 4.6rem;\n    height: 4.6rem;\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    overflow: hidden;\n    border: 0.18rem solid #182b63;\n    border-radius: 0.7rem;\n    background: #d8e4ff;\n}\n\n.dogoblock-web-app_details-main-grid_3v5Ue {\n    display: grid;\n    grid-template-columns: minmax(22rem, 38rem) minmax(20rem, 1fr);\n    gap: 1.35rem;\n    -webkit-box-align: start;\n    -webkit-align-items: start;\n        -ms-flex-align: start;\n            align-items: start;\n}\n\n.dogoblock-web-app_details-player-column_boimX {\n    min-width: 0;\n}\n\n.dogoblock-web-app_detail-stage-player_1iQg7 {\n    width: 100%;\n    max-width: 100%;\n    min-height: 30.2rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    overflow: auto;\n    border: 0.18rem solid #182b63;\n    border-radius: 0.8rem;\n    background: #ffffff;\n}\n\n.dogoblock-web-app_detail-stage-player_1iQg7 [class*=\"stage-wrapper_stage-wrapper\"] {\n    margin: 0 auto;\n}\n\n.dogoblock-web-app_detail-stats_favx8 {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n    gap: 1.4rem;\n    margin-top: 1rem;\n    color: #56648e;\n    font-size: 1.08rem;\n    font-weight: 800;\n}\n\n.dogoblock-web-app_details-info-column_JMmlU {\n    min-width: 0;\n}\n\n.dogoblock-web-app_detail-text-section_2cGjb {\n    margin-bottom: 1rem;\n}\n\n.dogoblock-web-app_detail-text-section_2cGjb h2,\n.dogoblock-web-app_comments-section_3ZgUT h2,\n.dogoblock-web-app_remix-section_1yYhw h2 {\n    margin: 0 0 0.6rem;\n    color: #243f8f;\n    font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-size: 1.18rem;\n    font-weight: 800;\n}\n\n.dogoblock-web-app_detail-text-box_2PJp4 {\n    min-height: 9.8rem;\n    border: 0.12rem solid #d7e0f5;\n    border-radius: 0.75rem;\n    padding: 1rem;\n    color: #344473;\n    background: #eaf2ff;\n    font-size: 1.05rem;\n    font-weight: 600;\n    line-height: 1.45;\n    white-space: pre-wrap;\n}\n\n.dogoblock-web-app_detail-meta-bar_Wnt9Z {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: end;\n    -webkit-justify-content: flex-end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n    gap: 1rem;\n    margin-top: 0.55rem;\n    color: #56648e;\n    font-weight: 700;\n}\n\n.dogoblock-web-app_details-lower-band_1Y7DY {\n    display: grid;\n    grid-template-columns: minmax(0, 1fr) minmax(16rem, 22rem);\n    gap: 2.5rem;\n    margin: 2rem calc((100vw - min(100vw, 79rem)) / -2) -3rem;\n    padding: 2.2rem max(1rem, calc((100vw - 79rem) / 2)) 3rem;\n    background: #eaf2ff;\n}\n\n.dogoblock-web-app_comment-composer_1fFS2 {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    gap: 0.65rem;\n    margin-top: 2rem;\n}\n\n.dogoblock-web-app_comment-avatar_AxAjx {\n    width: 2.5rem;\n    height: 2.5rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    border-radius: 0.65rem;\n    color: #ffffff;\n    background: #7e55d8;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 1rem;\n}\n\n.dogoblock-web-app_comment-composer_1fFS2 input {\n    width: min(100%, 28rem);\n    min-height: 2.55rem;\n    border: 0.12rem solid #d7e0f5;\n    border-radius: 0.55rem;\n    padding: 0 0.85rem;\n    color: #56648e;\n    background: #ffffff;\n    font-family: \"Montserrat\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    font-weight: 800;\n}\n\n.dogoblock-web-app_empty-comment_1h0gb {\n    margin-top: 1rem;\n    color: #56648e;\n    font-weight: 700;\n}\n\n.dogoblock-web-app_section-title-row_2aVtI {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: justify;\n    -webkit-justify-content: space-between;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n    gap: 0.75rem;\n}\n\n.dogoblock-web-app_section-title-row_2aVtI span {\n    color: #7e55d8;\n    font-weight: 800;\n}\n\n.dogoblock-web-app_remix-placeholder_1jarv {\n    height: 9.4rem;\n    overflow: hidden;\n    border: 0.18rem solid #c6d6ff;\n    border-radius: 0.65rem;\n    background: #d8e4ff;\n}\n\n.dogoblock-web-app_remix-placeholder_1jarv .dogoblock-web-app_project-thumbnail-image_2HJxW,\n.dogoblock-web-app_remix-placeholder_1jarv .dogoblock-web-app_project-thumbnail-fallback_18iRF {\n    width: 100%;\n    height: 100%;\n}\n\n.dogoblock-web-app_muted_1seQ1 {\n    color: #56648e;\n    font-size: 0.85rem;\n}\n\n.dogoblock-web-app_editor-shell_3Zz5e {\n    height: 100vh;\n}\n\n.dogoblock-web-app_hidden-input_2pI22 {\n    display: none;\n}\n\n.dogoblock-web-app_user-badge-button_2xFBg {\n    font-weight: 800;\n}\n\n.dogoblock-web-app_profile-page_2dR7P {\n    width: min(100% - 2rem, 78rem);\n}\n\n.dogoblock-web-app_profile-hero_3T3MG {\n    display: grid;\n    grid-template-columns: auto minmax(0, 1fr) auto;\n    gap: 1.25rem;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    margin-bottom: 1.2rem;\n    border: 0.18rem solid #243f8f;\n    border-radius: 0.95rem;\n    padding: 1.2rem;\n    background: #ffffff;\n    -webkit-box-shadow: 0.35rem 0.45rem 0 #d8e4ff;\n            box-shadow: 0.35rem 0.45rem 0 #d8e4ff;\n}\n\n.dogoblock-web-app_profile-avatar_r_K2L {\n    width: 6.4rem;\n    height: 6.4rem;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    overflow: hidden;\n    border: 0.22rem solid #182b63;\n    border-radius: 1rem;\n    color: #ffffff;\n    background: #7e55d8;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 2rem;\n}\n\n.dogoblock-web-app_profile-avatar_r_K2L img {\n    width: 100%;\n    height: 100%;\n    display: block;\n    -o-object-fit: cover;\n       object-fit: cover;\n}\n\n.dogoblock-web-app_profile-summary_16WTy {\n    min-width: 0;\n}\n\n.dogoblock-web-app_profile-summary_16WTy h1 {\n    margin: 0;\n    overflow: hidden;\n    color: #243f8f;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: clamp(1.8rem, 4vw, 3.2rem);\n    font-weight: 400;\n    line-height: 1.05;\n    -o-text-overflow: ellipsis;\n       text-overflow: ellipsis;\n    white-space: nowrap;\n}\n\n.dogoblock-web-app_profile-summary_16WTy p {\n    margin: 0.25rem 0 0;\n    color: #56648e;\n    font-weight: 800;\n}\n\n.dogoblock-web-app_profile-bio_1wlvt {\n    max-width: 42rem;\n    line-height: 1.45;\n}\n\n.dogoblock-web-app_profile-stats_2Y3vS {\n    min-width: 8rem;\n    display: grid;\n    grid-template-columns: auto 1fr;\n    gap: 0.25rem 0.55rem;\n    -webkit-box-align: baseline;\n    -webkit-align-items: baseline;\n        -ms-flex-align: baseline;\n            align-items: baseline;\n    color: #56648e;\n    font-size: 0.8rem;\n    font-weight: 800;\n}\n\n.dogoblock-web-app_profile-stats_2Y3vS strong {\n    color: #ff2b2b;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 1.25rem;\n    font-weight: 400;\n}\n\n.dogoblock-web-app_profile-tabs_2hl_k {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n    gap: 0.55rem;\n    margin: 1rem 0 1.35rem;\n}\n\n.dogoblock-web-app_profile-tab_G5MbT {\n    min-height: 2.15rem;\n    display: -webkit-inline-box;\n    display: -webkit-inline-flex;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    gap: 0.35rem;\n    border: 0;\n    border-radius: 0.45rem;\n    padding: 0 0.8rem;\n    color: #243f8f;\n    background: #ffffff;\n    -webkit-box-shadow: inset 0 0 0 0.12rem #d7e0f5, 0 0.2rem 0 #c6d6ff;\n            box-shadow: inset 0 0 0 0.12rem #d7e0f5, 0 0.2rem 0 #c6d6ff;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 0.58rem;\n    line-height: 1;\n    text-transform: uppercase;\n    cursor: pointer;\n}\n\n.dogoblock-web-app_profile-tab-active_fjXNE {\n    color: #ffffff;\n    background: #243f8f;\n    -webkit-box-shadow: 0 0.2rem 0 #182b63;\n            box-shadow: 0 0.2rem 0 #182b63;\n}\n\n.dogoblock-web-app_profile-grid_3XVac {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));\n    gap: 1rem;\n}\n\n.dogoblock-web-app_profile-panel_1O9VV {\n    border: 0.16rem solid #d7e0f5;\n    border-radius: 0.8rem;\n    padding: 1rem;\n    background: #eaf2ff;\n}\n\n.dogoblock-web-app_profile-panel_1O9VV h2 {\n    margin: 0 0 0.55rem;\n    color: #243f8f;\n    font-family: \"Bungee\", \"Montserrat\", sans-serif;\n    font-size: 1rem;\n    font-weight: 400;\n}\n\n.dogoblock-web-app_profile-panel_1O9VV p {\n    margin: 0;\n    color: #344473;\n    font-weight: 700;\n    line-height: 1.5;\n}\n\n.dogoblock-web-app_profile-actions_1Jgif {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-flex-wrap: wrap;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n    gap: 0.65rem;\n}\n\n.dogoblock-web-app_profile-form_3eCSN {\n    width: min(100%, 42rem);\n}\n\n@media (max-width: 900px) {\n    .dogoblock-web-app_topbar_3aLHW {\n        padding: 0.45rem 1rem;\n    }\n\n    .dogoblock-web-app_nav_5Hvdh {\n        gap: 0.75rem;\n        font-size: 0.72rem;\n    }\n\n    .dogoblock-web-app_hero_1xxqp {\n        grid-template-columns: 1fr;\n        gap: 1.5rem;\n    }\n\n    .dogoblock-web-app_hero-preview_SVneW {\n        -webkit-box-pack: start;\n        -webkit-justify-content: flex-start;\n            -ms-flex-pack: start;\n                justify-content: flex-start;\n    }\n\n    .dogoblock-web-app_details-header_3-XXe,\n    .dogoblock-web-app_details-main-grid_3v5Ue,\n    .dogoblock-web-app_details-lower-band_1Y7DY {\n        grid-template-columns: 1fr;\n    }\n\n    .dogoblock-web-app_details-header_3-XXe {\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n        -webkit-flex-direction: column;\n            -ms-flex-direction: column;\n                flex-direction: column;\n    }\n\n    .dogoblock-web-app_details-lower-band_1Y7DY {\n        margin-right: -1rem;\n        margin-left: -1rem;\n        padding-right: 1rem;\n        padding-left: 1rem;\n    }\n\n    .dogoblock-web-app_profile-hero_3T3MG {\n        grid-template-columns: auto minmax(0, 1fr);\n    }\n\n    .dogoblock-web-app_profile-stats_2Y3vS {\n        grid-column: 1 / -1;\n    }\n}\n\n@media (max-width: 640px) {\n    .dogoblock-web-app_topbar_3aLHW {\n        -webkit-box-align: start;\n        -webkit-align-items: flex-start;\n            -ms-flex-align: start;\n                align-items: flex-start;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n        -webkit-flex-direction: column;\n            -ms-flex-direction: column;\n                flex-direction: column;\n        min-height: auto;\n        padding: 0.75rem 1rem;\n    }\n\n    .dogoblock-web-app_nav_5Hvdh {\n        -webkit-box-pack: start;\n        -webkit-justify-content: flex-start;\n            -ms-flex-pack: start;\n                justify-content: flex-start;\n    }\n\n    .dogoblock-web-app_page_z_onn {\n        width: min(100% - 1.25rem, 74rem);\n        padding-top: 1.5rem;\n    }\n\n    .dogoblock-web-app_page-header_2q-ME {\n        -webkit-box-align: start;\n        -webkit-align-items: flex-start;\n            -ms-flex-align: start;\n                align-items: flex-start;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n        -webkit-flex-direction: column;\n            -ms-flex-direction: column;\n                flex-direction: column;\n    }\n\n    .dogoblock-web-app_project-grid_W2vKL {\n        grid-template-columns: repeat(auto-fill, minmax(12.5rem, 1fr));\n    }\n\n    .dogoblock-web-app_project-card_2NByI,\n    .dogoblock-web-app_project-card-wrap_3i3y1 {\n        width: 100%;\n    }\n\n    .dogoblock-web-app_details-title-area_2N4tl {\n        -webkit-box-align: start;\n        -webkit-align-items: flex-start;\n            -ms-flex-align: start;\n                align-items: flex-start;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n        -webkit-flex-direction: column;\n            -ms-flex-direction: column;\n                flex-direction: column;\n    }\n\n    .dogoblock-web-app_details-title-area_2N4tl h1 {\n        white-space: normal;\n    }\n\n    .dogoblock-web-app_detail-meta-bar_Wnt9Z {\n        -webkit-box-align: start;\n        -webkit-align-items: flex-start;\n            -ms-flex-align: start;\n                align-items: flex-start;\n        -webkit-box-orient: vertical;\n        -webkit-box-direction: normal;\n        -webkit-flex-direction: column;\n            -ms-flex-direction: column;\n                flex-direction: column;\n    }\n\n    .dogoblock-web-app_profile-hero_3T3MG {\n        grid-template-columns: 1fr;\n    }\n\n    .dogoblock-web-app_profile-summary_16WTy h1 {\n        white-space: normal;\n    }\n\n    .dogoblock-web-app_profile-avatar_r_K2L {\n        width: 5.4rem;\n        height: 5.4rem;\n    }\n}\n", ""]);

// exports
exports.locals = {
	"app-shell": "dogoblock-web-app_app-shell_2PA39",
	"appShell": "dogoblock-web-app_app-shell_2PA39",
	"topbar": "dogoblock-web-app_topbar_3aLHW",
	"brand": "dogoblock-web-app_brand_25VAQ",
	"logo": "dogoblock-web-app_logo_2DRMj",
	"nav": "dogoblock-web-app_nav_5Hvdh",
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
	"profile-hero": "dogoblock-web-app_profile-hero_3T3MG",
	"profileHero": "dogoblock-web-app_profile-hero_3T3MG",
	"profile-avatar": "dogoblock-web-app_profile-avatar_r_K2L",
	"profileAvatar": "dogoblock-web-app_profile-avatar_r_K2L",
	"profile-summary": "dogoblock-web-app_profile-summary_16WTy",
	"profileSummary": "dogoblock-web-app_profile-summary_16WTy",
	"profile-bio": "dogoblock-web-app_profile-bio_1wlvt",
	"profileBio": "dogoblock-web-app_profile-bio_1wlvt",
	"profile-stats": "dogoblock-web-app_profile-stats_2Y3vS",
	"profileStats": "dogoblock-web-app_profile-stats_2Y3vS",
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
	"profile-form": "dogoblock-web-app_profile-form_3eCSN",
	"profileForm": "dogoblock-web-app_profile-form_3eCSN"
};

/***/ }),

/***/ 2074:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(1);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(119);
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: ./node_modules/redux/es/index.js + 6 modules
var es = __webpack_require__(82);

// EXTERNAL MODULE: ./node_modules/react-intl/lib/index.es.js + 1 modules
var index_es = __webpack_require__(4);

// EXTERNAL MODULE: ./src/lib/app-state-hoc.jsx + 1 modules
var app_state_hoc = __webpack_require__(230);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(0);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./node_modules/react-redux/es/index.js + 14 modules
var react_redux_es = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/folder-open.js
var folder_open = __webpack_require__(2107);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/code-xml.js
var code_xml = __webpack_require__(2104);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/compass.js
var compass = __webpack_require__(2108);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/circle-user.js
var circle_user = __webpack_require__(2109);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/log-out.js
var log_out = __webpack_require__(2110);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/log-in.js
var log_in = __webpack_require__(2111);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/plus.js
var plus = __webpack_require__(2112);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/user-plus.js
var user_plus = __webpack_require__(2113);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/upload.js
var upload = __webpack_require__(2105);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/trash-2.js
var trash_2 = __webpack_require__(2100);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/save.js
var save = __webpack_require__(2114);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/star.js
var star = __webpack_require__(2093);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/settings.js
var settings = __webpack_require__(2115);

// EXTERNAL MODULE: ./src/containers/gui.jsx + 300 modules
var gui = __webpack_require__(212);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/message-circle.js
var message_circle = __webpack_require__(2090);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/reply.js
var icons_reply = __webpack_require__(2091);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/heart.js
var heart = __webpack_require__(2092);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/repeat-2.js
var repeat_2 = __webpack_require__(2094);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/bell.js
var bell = __webpack_require__(2095);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/check-check.js
var check_check = __webpack_require__(2096);

// EXTERNAL MODULE: ./src/components/notifications/notifications-bell.css
var notifications_bell = __webpack_require__(118);
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
      onOpen = _ref2.onOpen;
  var NotificationIcon = typeIcon[notification.type] || bell["a" /* default */];
  var actorName = notification.actor && (notification.actor.name || notification.actor.username);
  var unread = !notification.readAt;
  return /*#__PURE__*/react_default.a.createElement("button", {
    className: unread ? "".concat(notifications_bell_default.a.item, " ").concat(notifications_bell_default.a.itemUnread) : notifications_bell_default.a.item,
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
  }, actorName || 'Alguem'), ' ', notification.message), notification.project ? /*#__PURE__*/react_default.a.createElement("p", {
    className: notifications_bell_default.a.project
  }, notification.project.title) : null, /*#__PURE__*/react_default.a.createElement("p", {
    className: notifications_bell_default.a.date
  }, formatDate(notification.createdAt))), unread ? /*#__PURE__*/react_default.a.createElement("span", {
    "aria-label": "Nao lida",
    className: notifications_bell_default.a.unreadDot
  }) : /*#__PURE__*/react_default.a.createElement(NotificationIcon, {
    "aria-hidden": "true",
    className: notifications_bell_default.a.itemIcon
  }));
};

notifications_bell_NotificationItem.propTypes = {
  notification: prop_types_default.a.object.isRequired,
  onOpen: prop_types_default.a.func.isRequired
};

var notifications_bell_NotificationsDropdown = function NotificationsDropdown(_ref3) {
  var loading = _ref3.loading,
      notifications = _ref3.notifications,
      unreadCount = _ref3.unreadCount,
      onMarkAllRead = _ref3.onMarkAllRead,
      onOpenNotification = _ref3.onOpenNotification;
  return /*#__PURE__*/react_default.a.createElement("div", {
    className: notifications_bell_default.a.dropdown
  }, /*#__PURE__*/react_default.a.createElement("div", {
    className: notifications_bell_default.a.dropdownHeader
  }, /*#__PURE__*/react_default.a.createElement("h2", {
    className: notifications_bell_default.a.dropdownTitle
  }, "Notificacoes"), /*#__PURE__*/react_default.a.createElement("button", {
    className: notifications_bell_default.a.readAllButton,
    disabled: unreadCount === 0,
    onClick: onMarkAllRead
  }, /*#__PURE__*/react_default.a.createElement(check_check["a" /* default */], {
    "aria-hidden": "true",
    className: notifications_bell_default.a.readAllIcon
  }), "Marcar lidas")), loading ? /*#__PURE__*/react_default.a.createElement("div", {
    className: notifications_bell_default.a.loading
  }, "Carregando...") : notifications.length === 0 ? /*#__PURE__*/react_default.a.createElement("div", {
    className: notifications_bell_default.a.empty
  }, "Nenhuma notificacao.") : /*#__PURE__*/react_default.a.createElement("div", {
    className: notifications_bell_default.a.list
  }, notifications.map(function (notification) {
    return /*#__PURE__*/react_default.a.createElement(notifications_bell_NotificationItem, {
      key: notification.id,
      notification: notification,
      onOpen: onOpenNotification
    });
  })), /*#__PURE__*/react_default.a.createElement("div", {
    className: notifications_bell_default.a.footer
  }, unreadCount > 0 ? "".concat(unreadCount, " nao lida(s)") : 'Tudo em dia'));
};

notifications_bell_NotificationsDropdown.propTypes = {
  loading: prop_types_default.a.bool,
  notifications: prop_types_default.a.array,
  unreadCount: prop_types_default.a.number,
  onMarkAllRead: prop_types_default.a.func.isRequired,
  onOpenNotification: prop_types_default.a.func.isRequired
};
notifications_bell_NotificationsDropdown.defaultProps = {
  loading: false,
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
      open: false
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
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleDocumentClick);
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
      var _this2 = this;

      this.setState(function (prevState) {
        var open = !prevState.open;
        if (open) _this2.props.onOpen();
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
          notifications = _this$props.notifications,
          unreadCount = _this$props.unreadCount,
          onMarkAllRead = _this$props.onMarkAllRead;
      var badgeText = unreadCount > 99 ? '99+' : unreadCount;
      return /*#__PURE__*/react_default.a.createElement("span", {
        className: notifications_bell_default.a.wrap,
        ref: this.setWrapRef
      }, /*#__PURE__*/react_default.a.createElement("button", {
        className: notifications_bell_default.a.bellButton,
        title: "Notificacoes",
        "aria-label": "Abrir notificacoes",
        onClick: this.handleToggle
      }, /*#__PURE__*/react_default.a.createElement(bell["a" /* default */], {
        "aria-hidden": "true",
        className: notifications_bell_default.a.bellIcon
      }), unreadCount > 0 ? /*#__PURE__*/react_default.a.createElement("span", {
        className: notifications_bell_default.a.badge
      }, badgeText) : null), this.state.open ? /*#__PURE__*/react_default.a.createElement(notifications_bell_NotificationsDropdown, {
        loading: loading,
        notifications: notifications,
        unreadCount: unreadCount,
        onMarkAllRead: onMarkAllRead,
        onOpenNotification: this.handleOpenNotification
      }) : null);
    }
  }]);

  return NotificationsBell;
}(react_default.a.Component);

notifications_bell_NotificationsBell.propTypes = {
  loading: prop_types_default.a.bool,
  notifications: prop_types_default.a.array,
  unreadCount: prop_types_default.a.number,
  onMarkAllRead: prop_types_default.a.func.isRequired,
  onOpen: prop_types_default.a.func.isRequired,
  onOpenNotification: prop_types_default.a.func.isRequired
};
notifications_bell_NotificationsBell.defaultProps = {
  loading: false,
  notifications: [],
  unreadCount: 0
};
/* harmony default export */ var notifications_notifications_bell = (notifications_bell_NotificationsBell);
// EXTERNAL MODULE: ./src/reducers/project-state.js
var project_state = __webpack_require__(38);

// EXTERNAL MODULE: ./src/reducers/project-interactions.js
var project_interactions = __webpack_require__(235);

// EXTERNAL MODULE: ./src/lib/dogoblock-api.js
var dogoblock_api = __webpack_require__(74);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/lock-open.js
var lock_open = __webpack_require__(2097);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/share-2.js
var share_2 = __webpack_require__(2098);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/lock.js
var lock = __webpack_require__(2099);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/pen-line.js
var pen_line = __webpack_require__(2101);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/ellipsis.js
var ellipsis = __webpack_require__(2102);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/send.js
var send = __webpack_require__(2103);

// EXTERNAL MODULE: ./node_modules/lucide-react/dist/esm/icons/eye.js
var eye = __webpack_require__(2106);

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

        Object(dogoblock_api["w" /* recordProjectView */])(projectId).catch(function () {});
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
      Object(dogoblock_api["k" /* getProjectDetails */])(projectId).then(function (details) {
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

      Object(dogoblock_api["m" /* likeProject */])(this.props.projectId).then(function (res) {
        return _this3.props.onSetLike(res.isLiked, res.likeCount);
      }).catch(console.error);
    }
  }, {
    key: "handleUnlike",
    value: function handleUnlike() {
      var _this4 = this;

      Object(dogoblock_api["z" /* unlikeProject */])(this.props.projectId).then(function (res) {
        return _this4.props.onSetLike(res.isLiked, res.likeCount);
      }).catch(console.error);
    }
  }, {
    key: "handleFavorite",
    value: function handleFavorite() {
      var _this5 = this;

      Object(dogoblock_api["g" /* favoriteProject */])(this.props.projectId).then(function (res) {
        return _this5.props.onSetFavorite(res.isFavorited, res.favoriteCount);
      }).catch(console.error);
    }
  }, {
    key: "handleUnfavorite",
    value: function handleUnfavorite() {
      var _this6 = this;

      Object(dogoblock_api["y" /* unfavoriteProject */])(this.props.projectId).then(function (res) {
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

      return Object(dogoblock_api["v" /* postComment */])(this.props.projectId, content, parentId).then(function (comment) {
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
      Object(dogoblock_api["i" /* getComments */])(projectId, page).then(function (res) {
        if (_this9.props.projectId !== projectId) return;

        _this9.props.onSetComments(res.comments, res.total, res.page);
      }).catch(console.error);
    }
  }, {
    key: "handleUpdateVisibility",
    value: function handleUpdateVisibility(visibility) {
      var _this10 = this;

      Object(dogoblock_api["C" /* updateProjectVisibility */])(this.props.projectId, visibility).then(function (res) {
        _this10.props.onSetDetails(Object.assign({}, _this10.props, {
          visibility: res.visibility
        }));
      }).catch(console.error);
    }
  }, {
    key: "handleUpdateDetails",
    value: function handleUpdateDetails(patch) {
      var _this11 = this;

      return Object(dogoblock_api["B" /* updateProjectDetails */])(this.props.projectId, patch).then(function (res) {
        _this11.props.onSetDetails(Object.assign({}, _this11.props, res));
      });
    }
  }, {
    key: "handleUpdateCover",
    value: function handleUpdateCover(coverFile) {
      var _this12 = this;

      return Object(dogoblock_api["D" /* uploadProjectCover */])(this.props.projectId, coverFile).then(function (res) {
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
var message_box = __webpack_require__(154);

// EXTERNAL MODULE: ./src/lib/dogoblock-api-config.js
var dogoblock_api_config = __webpack_require__(249);

// EXTERNAL MODULE: ./src/lib/auth-session.js
var auth_session = __webpack_require__(143);

// EXTERNAL MODULE: ./src/reducers/session.js
var reducers_session = __webpack_require__(371);

// EXTERNAL MODULE: ./src/reducers/mode.js
var mode = __webpack_require__(178);

// EXTERNAL MODULE: ./static/dogoblock_logo_full.svg
var dogoblock_logo_full = __webpack_require__(357);
var dogoblock_logo_full_default = /*#__PURE__*/__webpack_require__.n(dogoblock_logo_full);

// EXTERNAL MODULE: ./src/playground/dogoblock-web-app.css
var dogoblock_web_app = __webpack_require__(32);
var dogoblock_web_app_default = /*#__PURE__*/__webpack_require__.n(dogoblock_web_app);

// CONCATENATED MODULE: ./src/playground/dogoblock-web-app.jsx
function dogoblock_web_app_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { dogoblock_web_app_typeof = function _typeof(obj) { return typeof obj; }; } else { dogoblock_web_app_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return dogoblock_web_app_typeof(obj); }

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
  if (parts[0] === 'profile') return {
    name: 'profile'
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
      profile: null,
      favoriteProjects: [],
      profileTab: 'overview',
      notifications: [],
      notificationsLoading: false,
      unreadCount: 0
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
    _this.handleMarkAllNotificationsRead = _this.handleMarkAllNotificationsRead.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleOpenNotification = _this.handleOpenNotification.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleProfileSubmit = _this.handleProfileSubmit.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.handleProfileTab = _this.handleProfileTab.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.renderHome = _this.renderHome.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.renderLogin = _this.renderLogin.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.renderRegister = _this.renderRegister.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.renderProjects = _this.renderProjects.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.renderProfile = _this.renderProfile.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.renderProjectDetails = _this.renderProjectDetails.bind(dogoblock_web_app_assertThisInitialized(_this));
    _this.renderEditor = _this.renderEditor.bind(dogoblock_web_app_assertThisInitialized(_this));
    return _this;
  }

  dogoblock_web_app_createClass(DogoblockWebApp, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('hashchange', this.handleHashChange);
      this.loadRouteData(this.state.route);
      this.setupNotifications();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('hashchange', this.handleHashChange);
      if (this.copyLinkTimer) clearTimeout(this.copyLinkTimer);
      this.closeNotificationsStream();
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
      var _this2 = this;

      var route = parseRoute();
      this.setState({
        route: route,
        error: null
      }, function () {
        return _this2.loadRouteData(route);
      });
    }
  }, {
    key: "loadRouteData",
    value: function loadRouteData(route) {
      var _this3 = this;

      this.props.onSetPlayerOnly(route.name === 'projectDetails');

      if (this.props.user && (route.name === 'login' || route.name === 'register')) {
        dogoblock_web_app_navigate(route.next || '/projects');
        return;
      }

      if (route.name === 'profile') {
        if (!this.props.user) {
          dogoblock_web_app_navigate(loginRouteFor('/profile'));
          return;
        }

        this.setState({
          loading: true,
          error: null
        });
        Promise.all([Object(dogoblock_api["j" /* getMyProfile */])(), Object(dogoblock_api["p" /* listProjects */])(), Object(dogoblock_api["n" /* listFavoriteProjects */])()]).then(function (_ref2) {
          var _ref3 = dogoblock_web_app_slicedToArray(_ref2, 3),
              profile = _ref3[0],
              projects = _ref3[1],
              favoriteProjects = _ref3[2];

          _this3.setState({
            profile: profile,
            projects: projects,
            favoriteProjects: favoriteProjects,
            loading: false,
            error: null
          });
        }).catch(function (error) {
          return _this3.setState({
            error: error.message,
            loading: false
          });
        });
      }

      if (route.name === 'projects' || route.name === 'explore') {
        this.setState({
          loading: true
        });
        var loader = this.props.user && route.name === 'projects' ? dogoblock_api["p" /* listProjects */] : dogoblock_api["q" /* listPublicProjects */];
        loader().then(function (projects) {
          return _this3.setState({
            projects: projects,
            loading: false
          });
        }).catch(function (error) {
          return _this3.setState({
            error: error.message,
            loading: false
          });
        });
      }

      if (route.name === 'projectDetails') {
        var requestedProjectId = route.projectId;
        this.setState({
          loading: true,
          projectDetails: null
        });
        Object(dogoblock_api["k" /* getProjectDetails */])(requestedProjectId).then(function (projectDetails) {
          if (_this3.state.route.name !== 'projectDetails' || _this3.state.route.projectId !== requestedProjectId) {
            return;
          }

          _this3.setState({
            projectDetails: projectDetails,
            loading: false
          });
        }).catch(function (error) {
          if (_this3.state.route.name !== 'projectDetails' || _this3.state.route.projectId !== requestedProjectId) {
            return;
          }

          _this3.setState({
            error: error.message,
            loading: false
          });
        });
      }
    }
  }, {
    key: "handleLogin",
    value: function handleLogin(event) {
      var _this4 = this;

      event.preventDefault();
      var form = new FormData(event.currentTarget);
      this.setState({
        error: null,
        loading: true
      });
      Object(dogoblock_api["r" /* login */])({
        email: form.get('email'),
        password: form.get('password')
      }).then(function (session) {
        _this4.props.onLoginSuccess(session);

        dogoblock_web_app_navigate(_this4.state.route.next || '/projects');
      }).catch(function (error) {
        return _this4.setState({
          error: error.message,
          loading: false
        });
      });
    }
  }, {
    key: "handleRegister",
    value: function handleRegister(event) {
      var _this5 = this;

      event.preventDefault();
      var form = new FormData(event.currentTarget);
      this.setState({
        error: null,
        loading: true
      });
      Object(dogoblock_api["x" /* register */])({
        name: form.get('name'),
        username: form.get('username'),
        email: form.get('email'),
        password: form.get('password')
      }).then(function (session) {
        _this5.props.onLoginSuccess(session);

        dogoblock_web_app_navigate(_this5.state.route.next || '/projects');
      }).catch(function (error) {
        return _this5.setState({
          error: error.message,
          loading: false
        });
      });
    }
  }, {
    key: "handleLogout",
    value: function handleLogout() {
      this.closeNotificationsStream();
      Object(dogoblock_api["s" /* logout */])();
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
      var _this6 = this;

      this.closeNotificationsStream();

      if (!this.props.user) {
        this.setState({
          notifications: [],
          unreadCount: 0,
          notificationsLoading: false
        });
        return;
      }

      Object(dogoblock_api["l" /* getUnreadCount */])().then(function (result) {
        return _this6.setState({
          unreadCount: result.unreadCount || 0
        });
      }).catch(function () {});
      var session = Object(auth_session["c" /* readAuthSession */])();
      var stream = Object(dogoblock_api["b" /* createNotificationsStream */])(session && session.accessToken);
      if (!stream) return;
      stream.addEventListener('notification', function (event) {
        try {
          var notification = JSON.parse(event.data);

          _this6.setState(function (prevState) {
            return {
              notifications: [notification].concat(_toConsumableArray(prevState.notifications.filter(function (item) {
                return item.id !== notification.id;
              }))).slice(0, 10)
            };
          });
        } catch (_unused) {// Ignore malformed stream payloads.
        }
      });
      stream.addEventListener('unread-count', function (event) {
        try {
          var data = JSON.parse(event.data);

          _this6.setState({
            unreadCount: data.unreadCount || 0
          });
        } catch (_unused2) {// Ignore malformed stream payloads.
        }
      });

      stream.onerror = function () {};

      this.notificationsStream = stream;
    }
  }, {
    key: "closeNotificationsStream",
    value: function closeNotificationsStream() {
      if (!this.notificationsStream) return;
      this.notificationsStream.close();
      this.notificationsStream = null;
    }
  }, {
    key: "handleLoadNotifications",
    value: function handleLoadNotifications() {
      var _this7 = this;

      if (!this.props.user) return;
      this.setState({
        notificationsLoading: true
      });
      Object(dogoblock_api["o" /* listNotifications */])(1, 10).then(function (result) {
        return _this7.setState({
          notifications: result.notifications || [],
          unreadCount: result.unreadCount || 0,
          notificationsLoading: false
        });
      }).catch(function (error) {
        return _this7.setState({
          error: error.message,
          notificationsLoading: false
        });
      });
    }
  }, {
    key: "handleOpenNotification",
    value: function handleOpenNotification(notification) {
      var _this8 = this;

      var navigateToProject = function navigateToProject() {
        if (notification.projectId) {
          dogoblock_web_app_navigate("/projects/".concat(notification.projectId));
        }
      };

      if (!notification.readAt) {
        Object(dogoblock_api["u" /* markNotificationRead */])(notification.id).then(function (updated) {
          _this8.setState(function (prevState) {
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
    key: "handleMarkAllNotificationsRead",
    value: function handleMarkAllNotificationsRead() {
      var _this9 = this;

      if (!this.props.user || this.state.unreadCount === 0) return;
      Object(dogoblock_api["t" /* markAllNotificationsRead */])().then(function (result) {
        return _this9.setState(function (prevState) {
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
        return _this9.setState({
          error: error.message
        });
      });
    }
  }, {
    key: "handleImportProject",
    value: function handleImportProject() {
      var importRoute = "/editor?import=".concat(Date.now());

      if (!this.props.user) {
        dogoblock_web_app_navigate(loginRouteFor(importRoute));
        return;
      }

      dogoblock_web_app_navigate(importRoute);
    }
  }, {
    key: "handleNewProject",
    value: function handleNewProject() {
      if (!this.props.user) {
        dogoblock_web_app_navigate(loginRouteFor('/editor'));
        return;
      }

      dogoblock_web_app_navigate('/editor');
    }
  }, {
    key: "handleCopyProjectLink",
    value: function handleCopyProjectLink() {
      var _this10 = this;

      var project = this.state.projectDetails;
      if (!project) return;
      var link = getProjectPublicUrl(project);

      var onCopied = function onCopied() {
        if (_this10.copyLinkTimer) clearTimeout(_this10.copyLinkTimer);

        _this10.setState({
          copyLinkFeedback: true
        });

        _this10.copyLinkTimer = setTimeout(function () {
          return _this10.setState({
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
      var _this11 = this;

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
      Object(dogoblock_api["d" /* deleteProject */])(id).then(function () {
        return dogoblock_web_app_navigate('/projects');
      }).catch(function (error) {
        return _this11.setState({
          error: error.message,
          loading: false
        });
      });
    }
  }, {
    key: "handleDeleteProjectFromCard",
    value: function handleDeleteProjectFromCard(event) {
      var _this12 = this;

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
      Object(dogoblock_api["d" /* deleteProject */])(id).then(function () {
        return _this12.setState(function (prevState) {
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
        });
      }).catch(function (error) {
        return _this12.setState({
          error: error.message,
          loading: false
        });
      });
    }
  }, {
    key: "handleProjectCreated",
    value: function handleProjectCreated(projectId) {
      if (projectId && projectId !== project_state["f" /* defaultProjectId */]) dogoblock_web_app_navigate("/editor/".concat(projectId));
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
      var _this13 = this;

      var project = this.state.projectDetails;

      if (!this.props.user || !project) {
        dogoblock_web_app_navigate(loginRouteFor());
        return;
      }

      this.setState({
        loading: true,
        error: null
      });
      Object(dogoblock_api["C" /* updateProjectVisibility */])(project.id, visibility).then(function () {
        return Object(dogoblock_api["k" /* getProjectDetails */])(project.id);
      }).then(function (projectDetails) {
        return _this13.setState({
          projectDetails: projectDetails,
          loading: false,
          error: null
        });
      }).catch(function (error) {
        return _this13.setState({
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
      dogoblock_web_app_navigate(loginRouteFor(currentRouteHash()));
    }
  }, {
    key: "handleProfileTab",
    value: function handleProfileTab(event) {
      this.setState({
        profileTab: event.currentTarget.dataset.tab
      });
    }
  }, {
    key: "handleProfileSubmit",
    value: function handleProfileSubmit(event) {
      var _this14 = this;

      event.preventDefault();
      var form = new FormData(event.currentTarget);
      this.setState({
        loading: true,
        error: null
      });
      Object(dogoblock_api["A" /* updateMyProfile */])({
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

          _this14.props.onLoginSuccess(nextSession);
        }

        _this14.setState({
          profile: profile,
          loading: false,
          error: null
        });
      }).catch(function (error) {
        return _this14.setState({
          error: error.message,
          loading: false
        });
      });
    }
  }, {
    key: "renderHeader",
    value: function renderHeader() {
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.topbar
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.brand,
        onClick: this.handleNavigateHome
      }, /*#__PURE__*/react_default.a.createElement("img", {
        alt: "Dogoblock",
        className: dogoblock_web_app_default.a.logo,
        src: dogoblock_logo_full_default.a
      })), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.nav
      }, this.props.user ? /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.navButton,
        onClick: this.handleNavigateProjects
      }, /*#__PURE__*/react_default.a.createElement(folder_open["a" /* default */], {
        "aria-hidden": "true",
        className: dogoblock_web_app_default.a.navIcon
      }), 'Meus Projetos'), /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.navButton,
        onClick: this.handleNavigateEditor
      }, /*#__PURE__*/react_default.a.createElement(code_xml["a" /* default */], {
        "aria-hidden": "true",
        className: dogoblock_web_app_default.a.navIcon
      }), 'Editor'), /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.navButton,
        onClick: this.handleNavigateExplore
      }, /*#__PURE__*/react_default.a.createElement(compass["a" /* default */], {
        "aria-hidden": "true",
        className: dogoblock_web_app_default.a.navIcon
      }), 'Explorar Projetos'), /*#__PURE__*/react_default.a.createElement(notifications_notifications_bell, {
        loading: this.state.notificationsLoading,
        notifications: this.state.notifications,
        unreadCount: this.state.unreadCount,
        onMarkAllRead: this.handleMarkAllNotificationsRead,
        onOpen: this.handleLoadNotifications,
        onOpenNotification: this.handleOpenNotification
      }), /*#__PURE__*/react_default.a.createElement("button", {
        className: "".concat(dogoblock_web_app_default.a.navButton, " ").concat(dogoblock_web_app_default.a.userBadgeButton),
        onClick: this.handleNavigateProfile
      }, /*#__PURE__*/react_default.a.createElement(circle_user["a" /* default */], {
        "aria-hidden": "true",
        className: dogoblock_web_app_default.a.navIcon
      }), this.props.user.username), /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.navButton,
        onClick: this.handleLogout
      }, /*#__PURE__*/react_default.a.createElement(log_out["a" /* default */], {
        "aria-hidden": "true",
        className: dogoblock_web_app_default.a.navIcon
      }), 'Sair')) : /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.navButton,
        onClick: this.handleNavigateProjects
      }, /*#__PURE__*/react_default.a.createElement(folder_open["a" /* default */], {
        "aria-hidden": "true",
        className: dogoblock_web_app_default.a.navIcon
      }), 'Meus Projetos'), /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.navButton,
        onClick: this.handleNavigateEditor
      }, /*#__PURE__*/react_default.a.createElement(code_xml["a" /* default */], {
        "aria-hidden": "true",
        className: dogoblock_web_app_default.a.navIcon
      }), 'Editor'), /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.navButton,
        onClick: this.handleNavigateExplore
      }, /*#__PURE__*/react_default.a.createElement(compass["a" /* default */], {
        "aria-hidden": "true",
        className: dogoblock_web_app_default.a.navIcon
      }), 'Explorar Projetos'), /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.navButton,
        onClick: this.handleNavigateLogin
      }, /*#__PURE__*/react_default.a.createElement(log_in["a" /* default */], {
        "aria-hidden": "true",
        className: dogoblock_web_app_default.a.navIcon
      }), 'Entrar/Cadastrar'))));
    }
  }, {
    key: "renderHome",
    value: function renderHome() {
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(dogoblock_web_app_default.a.page, " ").concat(dogoblock_web_app_default.a.homePage)
      }, /*#__PURE__*/react_default.a.createElement("section", {
        className: dogoblock_web_app_default.a.hero
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.heroCopy
      }, /*#__PURE__*/react_default.a.createElement("p", {
        className: dogoblock_web_app_default.a.kicker
      }, 'DOGOBLOCK'), /*#__PURE__*/react_default.a.createElement("h1", null, 'Crie, programe e compartilhe seus projetos'), /*#__PURE__*/react_default.a.createElement("p", {
        className: dogoblock_web_app_default.a.heroText
      }, 'Monte jogos, animações e experiências com blocos, Arduino e micro:bit em um ambiente ', 'simples para aprender fazendo.'), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.heroActions
      }, /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.primaryButton,
        onClick: this.handleNewProject
      }, /*#__PURE__*/react_default.a.createElement(dogoblock_web_app_Icon, null, /*#__PURE__*/react_default.a.createElement(plus["a" /* default */], {
        size: 16
      })), 'Criar Projeto'), /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.secondaryButton,
        onClick: this.handleNavigateExplore
      }, /*#__PURE__*/react_default.a.createElement(dogoblock_web_app_Icon, null, /*#__PURE__*/react_default.a.createElement(compass["a" /* default */], {
        size: 16
      })), 'Explorar Projetos'), this.props.user ? null : /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.lightButton,
        onClick: this.handleNavigateLogin
      }, /*#__PURE__*/react_default.a.createElement(dogoblock_web_app_Icon, null, /*#__PURE__*/react_default.a.createElement(log_in["a" /* default */], {
        size: 16
      })), 'Entrar/Cadastrar'))), /*#__PURE__*/react_default.a.createElement("div", {
        "aria-hidden": "true",
        className: dogoblock_web_app_default.a.heroPreview
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.previewCard
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.previewWindow
      }, /*#__PURE__*/react_default.a.createElement("span", null, 'MOON')), /*#__PURE__*/react_default.a.createElement("strong", null, 'Moon Game'), /*#__PURE__*/react_default.a.createElement("small", null, 'Projeto em blocos')))));
    }
  }, {
    key: "renderLogin",
    value: function renderLogin() {
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(dogoblock_web_app_default.a.page, " ").concat(dogoblock_web_app_default.a.narrowPage)
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
      })), /*#__PURE__*/react_default.a.createElement("button", {
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
      }), 'Cadastrar'))));
    }
  }, {
    key: "renderRegister",
    value: function renderRegister() {
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(dogoblock_web_app_default.a.page, " ").concat(dogoblock_web_app_default.a.narrowPage)
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
      }), 'Entrar'))));
    }
  }, {
    key: "renderProjects",
    value: function renderProjects() {
      var publicList = !this.props.user || this.state.route.name === 'explore';
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.page
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.pageHeader
      }, /*#__PURE__*/react_default.a.createElement("h1", null, publicList ? 'Projetos Públicos' : 'Meus Projetos'), publicList ? null : /*#__PURE__*/react_default.a.createElement("div", {
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
      }, this.state.error) : null, this.state.loading ? /*#__PURE__*/react_default.a.createElement("p", null, 'Carregando...') : null, this.renderProjectCards(this.state.projects, !publicList), !this.state.loading && !this.state.projects.length ? /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.emptyState
      }, publicList ? 'Nenhum projeto publico encontrado.' : 'Voce ainda nao criou projetos.') : null);
    }
  }, {
    key: "renderProjectCards",
    value: function renderProjectCards(projects, canDeleteProjects) {
      var _this15 = this;

      return /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.projectGrid
      }, projects.map(function (project) {
        return /*#__PURE__*/react_default.a.createElement("div", {
          className: dogoblock_web_app_default.a.projectCardWrap,
          key: project.id
        }, /*#__PURE__*/react_default.a.createElement("button", {
          className: dogoblock_web_app_default.a.projectCard,
          "data-project-id": project.id,
          onClick: _this15.handleOpenProjectDetails
        }, /*#__PURE__*/react_default.a.createElement("span", {
          className: dogoblock_web_app_default.a.projectThumbnail
        }, dogoblock_web_app_renderProjectThumbnail(project)), /*#__PURE__*/react_default.a.createElement("span", {
          className: dogoblock_web_app_default.a.projectTitle
        }, project.title), /*#__PURE__*/react_default.a.createElement("span", {
          className: dogoblock_web_app_default.a.projectMeta
        }, getVisibilityLabel(project.visibility)), /*#__PURE__*/react_default.a.createElement("span", {
          className: dogoblock_web_app_default.a.projectMeta
        }, dogoblock_web_app_formatDate(project.updatedAt))), canDeleteProjects ? /*#__PURE__*/react_default.a.createElement("button", {
          className: dogoblock_web_app_default.a.projectDeleteButton,
          "data-project-id": project.id,
          title: "Excluir projeto",
          "aria-label": "Excluir projeto ".concat(project.title),
          onClick: _this15.handleDeleteProjectFromCard
        }, /*#__PURE__*/react_default.a.createElement(trash_2["a" /* default */], {
          "aria-hidden": "true",
          size: 15
        })) : null);
      }));
    }
  }, {
    key: "renderProfile",
    value: function renderProfile() {
      var _this16 = this;

      var profile = this.state.profile || this.props.user || {};
      var tab = this.state.profileTab;

      var tabButton = function tabButton(id, label, IconComponent) {
        return /*#__PURE__*/react_default.a.createElement("button", {
          className: "".concat(dogoblock_web_app_default.a.profileTab, " ").concat(tab === id ? dogoblock_web_app_default.a.profileTabActive : ''),
          "data-tab": id,
          onClick: _this16.handleProfileTab
        }, /*#__PURE__*/react_default.a.createElement(IconComponent, {
          "aria-hidden": "true",
          className: dogoblock_web_app_default.a.navIcon
        }), label);
      };

      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(dogoblock_web_app_default.a.page, " ").concat(dogoblock_web_app_default.a.profilePage)
      }, this.state.error ? /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.error
      }, this.state.error) : null, /*#__PURE__*/react_default.a.createElement("section", {
        className: dogoblock_web_app_default.a.profileHero
      }, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.profileAvatar
      }, profile.avatarUrl ? /*#__PURE__*/react_default.a.createElement("img", {
        alt: profile.username,
        src: profile.avatarUrl
      }) : dogoblock_web_app_getInitials(profile)), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.profileSummary
      }, /*#__PURE__*/react_default.a.createElement("p", {
        className: dogoblock_web_app_default.a.kicker
      }, 'PERFIL'), /*#__PURE__*/react_default.a.createElement("h1", null, profile.name || profile.username || 'Meu perfil'), /*#__PURE__*/react_default.a.createElement("p", null, "@".concat(profile.username || 'usuario')), /*#__PURE__*/react_default.a.createElement("p", {
        className: dogoblock_web_app_default.a.profileBio
      }, profile.bio || 'Adicione uma descrição para contar um pouco sobre você.')), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.profileStats
      }, /*#__PURE__*/react_default.a.createElement("strong", null, profile.projectCount || this.state.projects.length || 0), /*#__PURE__*/react_default.a.createElement("span", null, 'Projetos'), /*#__PURE__*/react_default.a.createElement("strong", null, profile.favoriteCount || this.state.favoriteProjects.length || 0), /*#__PURE__*/react_default.a.createElement("span", null, 'Favoritos'))), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.profileTabs
      }, tabButton('overview', 'Visão Geral', circle_user["a" /* default */]), tabButton('edit', 'Dados', save["a" /* default */]), tabButton('projects', 'Projetos', folder_open["a" /* default */]), tabButton('favorites', 'Favoritos', star["a" /* default */]), tabButton('settings', 'Configurações', settings["a" /* default */])), this.state.loading ? /*#__PURE__*/react_default.a.createElement("p", null, 'Carregando...') : null, tab === 'overview' ? /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.profileGrid
      }, /*#__PURE__*/react_default.a.createElement("section", {
        className: dogoblock_web_app_default.a.profilePanel
      }, /*#__PURE__*/react_default.a.createElement("h2", null, 'Descrição'), /*#__PURE__*/react_default.a.createElement("p", null, profile.bio || 'Nenhuma descrição adicionada.')), /*#__PURE__*/react_default.a.createElement("section", {
        className: dogoblock_web_app_default.a.profilePanel
      }, /*#__PURE__*/react_default.a.createElement("h2", null, 'Em que estou trabalhando'), /*#__PURE__*/react_default.a.createElement("p", null, profile.workingOn || 'Nenhum foco atual informado.')), /*#__PURE__*/react_default.a.createElement("section", {
        className: dogoblock_web_app_default.a.profilePanel
      }, /*#__PURE__*/react_default.a.createElement("h2", null, 'Atalhos'), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.profileActions
      }, /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.primaryButton,
        onClick: this.handleNewProject
      }, /*#__PURE__*/react_default.a.createElement(dogoblock_web_app_Icon, null, /*#__PURE__*/react_default.a.createElement(plus["a" /* default */], {
        size: 16
      })), 'Criar Projeto'), /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.secondaryButton,
        onClick: this.handleNavigateExplore
      }, /*#__PURE__*/react_default.a.createElement(dogoblock_web_app_Icon, null, /*#__PURE__*/react_default.a.createElement(compass["a" /* default */], {
        size: 16
      })), 'Explorar')))) : null, tab === 'edit' ? /*#__PURE__*/react_default.a.createElement("form", {
        className: "".concat(dogoblock_web_app_default.a.panel, " ").concat(dogoblock_web_app_default.a.profileForm),
        onSubmit: this.handleProfileSubmit
      }, /*#__PURE__*/react_default.a.createElement("h1", null, 'Editar Perfil'), /*#__PURE__*/react_default.a.createElement("label", {
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
      }, 'Descrição', /*#__PURE__*/react_default.a.createElement("textarea", {
        defaultValue: profile.bio || '',
        maxLength: "500",
        name: "bio",
        rows: "4"
      })), /*#__PURE__*/react_default.a.createElement("label", {
        className: dogoblock_web_app_default.a.field
      }, 'Em que está trabalhando', /*#__PURE__*/react_default.a.createElement("textarea", {
        defaultValue: profile.workingOn || '',
        maxLength: "280",
        name: "workingOn",
        rows: "3"
      })), /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.primaryButton
      }, /*#__PURE__*/react_default.a.createElement(dogoblock_web_app_Icon, null, /*#__PURE__*/react_default.a.createElement(save["a" /* default */], {
        size: 16
      })), this.state.loading ? 'Salvando...' : 'Salvar Perfil')) : null, tab === 'projects' ? /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.pageHeader
      }, /*#__PURE__*/react_default.a.createElement("h1", null, 'Meus Projetos'), /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.actions
      }, /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.dangerButton,
        onClick: this.handleNewProject
      }, /*#__PURE__*/react_default.a.createElement(dogoblock_web_app_Icon, null, /*#__PURE__*/react_default.a.createElement(plus["a" /* default */], {
        size: 16
      })), 'Criar Projeto'))), this.renderProjectCards(this.state.projects, true), !this.state.projects.length ? /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.emptyState
      }, 'Você ainda não criou projetos.') : null) : null, tab === 'favorites' ? /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.pageHeader
      }, /*#__PURE__*/react_default.a.createElement("h1", null, 'Favoritos')), this.renderProjectCards(this.state.favoriteProjects, false), !this.state.favoriteProjects.length ? /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.emptyState
      }, 'Nenhum projeto favorito ainda.') : null) : null, tab === 'settings' ? /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.profileGrid
      }, /*#__PURE__*/react_default.a.createElement("section", {
        className: dogoblock_web_app_default.a.profilePanel
      }, /*#__PURE__*/react_default.a.createElement("h2", null, 'Configurações da conta'), /*#__PURE__*/react_default.a.createElement("p", null, 'Mais opções de segurança, senha e notificações serão adicionadas aqui.')), /*#__PURE__*/react_default.a.createElement("section", {
        className: dogoblock_web_app_default.a.profilePanel
      }, /*#__PURE__*/react_default.a.createElement("h2", null, 'Sessão'), /*#__PURE__*/react_default.a.createElement("button", {
        className: dogoblock_web_app_default.a.dangerButton,
        onClick: this.handleLogout
      }, /*#__PURE__*/react_default.a.createElement(dogoblock_web_app_Icon, null, /*#__PURE__*/react_default.a.createElement(log_out["a" /* default */], {
        size: 16
      })), 'Sair da conta'))) : null);
    }
  }, {
    key: "renderProjectDetails",
    value: function renderProjectDetails() {
      var _this17 = this;

      var projectId = this.state.route.projectId;
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: "".concat(dogoblock_web_app_default.a.page, " ").concat(dogoblock_web_app_default.a.projectDetailsPage)
      }, this.state.error ? /*#__PURE__*/react_default.a.createElement("div", {
        className: dogoblock_web_app_default.a.error
      }, this.state.error) : null, this.state.loading ? /*#__PURE__*/react_default.a.createElement("p", null, 'Carregando...') : null, projectId ? /*#__PURE__*/react_default.a.createElement(containers_project_page, {
        projectId: projectId,
        onDeleteProject: this.handleDeleteProject,
        onClose: this.handleNavigateProjects,
        renderPlayer: function renderPlayer() {
          return /*#__PURE__*/react_default.a.createElement(gui["a" /* default */], {
            key: "project-page-player-".concat(projectId),
            canCreateNew: false,
            canEditTitle: false,
            canSave: false,
            assetHost: Object(dogoblock_api_config["b" /* getAssetHost */])(),
            projectHost: Object(dogoblock_api_config["c" /* getProjectHost */])(),
            projectId: projectId,
            routeProjectId: projectId,
            onProjectLoaded: noop,
            onShowMessageBox: _this17.handleShowMessageBox
          });
        }
      }) : null);
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
      var route = this.state.route;
      var editor = route.name === 'editor';
      return /*#__PURE__*/react_default.a.createElement("div", {
        className: editor ? dogoblock_web_app_default.a.editorShell : dogoblock_web_app_default.a.appShell
      }, editor ? null : this.renderHeader(), route.name === 'home' ? this.renderHome() : null, route.name === 'login' ? this.renderLogin() : null, route.name === 'register' ? this.renderRegister() : null, route.name === 'projects' || route.name === 'explore' ? this.renderProjects() : null, route.name === 'profile' ? this.renderProfile() : null, route.name === 'projectDetails' ? this.renderProjectDetails() : null, editor ? this.renderEditor() : null);
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
var hash_parser_hoc = __webpack_require__(291);

// EXTERNAL MODULE: ./src/lib/log.js
var log = __webpack_require__(57);

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
  var WrappedDogoblockWebApp = Object(app_state_hoc["a" /* default */])(playground_dogoblock_web_app);
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

  react_dom_default.a.render( // important: this is checking whether `simulateScratchDesktop` is truthy, not just defined!
  simulateScratchDesktop ? /*#__PURE__*/react_default.a.createElement(WrappedGui, {
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
  }) : /*#__PURE__*/react_default.a.createElement(WrappedDogoblockWebApp, null), appTarget);
});

/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(2060);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(22)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(2059);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(22)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 969:
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(1669);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(22)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ })

},[[1227,0]]]);
//# sourceMappingURL=gui.js.map