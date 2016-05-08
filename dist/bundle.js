/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _element = __webpack_require__(2);

	var _element2 = _interopRequireDefault(_element);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _element2.default; /* eslint-env browser */

	document.registerElement("h-embed", {
		prototype: _element2.default.prototype,
		extends: "a"
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/* eslint-env browser */

	var HEmbed = function (_HTMLAnchorElement) {
		_inherits(HEmbed, _HTMLAnchorElement);

		function HEmbed() {
			_classCallCheck(this, HEmbed);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(HEmbed).apply(this, arguments));
		}

		_createClass(HEmbed, [{
			key: "attachedCallback",
			value: function attachedCallback() {
				this.transclude();
			}
		}, {
			key: "detachedCallback",
			value: function detachedCallback() {
				var wrapper = this.wrapper;
				if (wrapper) {
					wrapper.parentNode.removeChild(wrapper);
					delete this.wrapper;
				}
			}
		}, {
			key: "transclude",
			value: function transclude(html) {
				var _this2 = this;

				if (!this.href) {
					return;
				}

				this.retrieve().then(function (html) {
					_this2.generateWrapper();
					_this2.wrapper.innerHTML = sanitize(html);
				}).catch(function (err) {
					console.error(err); // eslint-disable-line no-console
				});
			}
		}, {
			key: "retrieve",
			value: function retrieve() {
				var cors = this.getAttribute("cors") === "true";
				var credentials = cors ? "include" : "same-origin";
				return fetch(this.href, { credentials: credentials }).then(function (res) {
					var status = res.status;
					if (status < 200 || status > 299) {
						// XXX: bad heuristic?
						throw new Error("failed to retrieve transclusion resource");
					}
					// TODO: check MIME type?
					return res.text(); // TODO: discard script tags
				});
			}
		}, {
			key: "generateWrapper",
			value: function generateWrapper() {
				if (this.wrapper) {
					return;
				}

				var tag = this.getAttribute("container") || "div";
				var wrapper = this.wrapper = document.createElement(tag);
				wrapper.className = "h-embed";

				this.style.display = "none";

				// insert as sibling
				this.parentNode.insertBefore(wrapper, this.nextSibling);
			}
		}]);

		return HEmbed;
	}(HTMLAnchorElement);

	exports.default = HEmbed;


	function sanitize(html) {
		var doc = document.implementation.createHTMLDocument();
		doc.documentElement.innerHTML = html;

		// strip scripts -- XXX: unnecessary, as `innerHTML` does not execute scripts!?
		var scripts = doc.querySelectorAll("script");
		[].forEach.call(scripts, function (node) {
			return node.parentNode.removeChild(node);
		});

		// TODO: also strip `onload` and similar attributes?

		return doc.body.innerHTML;
	}

/***/ }
/******/ ]);