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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "/QC5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export subscribers */
/* unused harmony export getCurrentUrl */
/* unused harmony export route */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Router; });
/* unused harmony export Route */
/* unused harmony export Link */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);


var EMPTY$1 = {};

function assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	if (opts === void 0) opts = EMPTY$1;

	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1 = 0; i$1 < max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0) === ':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) {
		return false;
	}
	return matches;
}

function pathRankSort(a, b) {
	var aAttr = a.attributes || EMPTY$1,
	    bAttr = b.attributes || EMPTY$1;
	if (aAttr.default) {
		return 1;
	}
	if (bAttr.default) {
		return -1;
	}
	var diff = rank(aAttr.path) - rank(bAttr.path);
	return diff || aAttr.path.length - bAttr.path.length;
}

function segmentize(url) {
	return strip(url).split('/');
}

function rank(url) {
	return (strip(url).match(/\/+/g) || '').length;
}

function strip(url) {
	return url.replace(/(^\/+|\/+$)/g, '');
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
}

function setUrl(url, type) {
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) {
			return true;
		}
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (var i$1 = subscribers.length; i$1--;) {
		subscribers[i$1](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) {
		return;
	}

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
		return;
	}

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button == 0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) {
				return;
			}
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				return routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var Router = function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if (Component$$1) Router.__proto__ = Component$$1;
	Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) {
			return true;
		}
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) {
			return this.canRoute(url);
		}

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') {
			this.unlisten();
		}
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.slice().sort(pathRankSort).map(function (vnode) {
			var attrs = vnode.attributes || {},
			    path = attrs.path,
			    matches = exec(url, path, attrs);
			if (matches) {
				if (invoke !== false) {
					var newProps = { url: url, matches: matches };
					assign(newProps, matches);
					return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["cloneElement"])(vnode, newProps);
				}
				return vnode;
			}
			return false;
		}).filter(Boolean);
	};

	Router.prototype.render = function render(ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);

var Link = function Link(props) {
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('a', assign({ onClick: handleLinkClick }, props));
};

var Route = function Route(props) {
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(props.component, props);
};

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

/* unused harmony default export */ var _unused_webpack_default_export = (Router);
//# sourceMappingURL=preact-router.es.js.map

/***/ }),

/***/ "/Umn":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"header":"header__3IhT1","active":"active__2kmrA"};

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("JkW7");


/***/ }),

/***/ "7/cg":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Button; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MaterialComponent__ = __webpack_require__("lhA9");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};




/**
 *  @prop dense = false
 *  @prop raised = false
 *  @prop compact = false
 *  @prop primary = false
 *  @prop accent = false
 *  @prop disabled = false
 */

var Button = function (_MaterialComponent) {
  _inherits(Button, _MaterialComponent);

  function Button() {
    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, _MaterialComponent.call(this));

    _this.componentName = "button";
    _this._mdcProps = ["dense", "raised", "compact", "primary", "accent"];
    return _this;
  }

  Button.prototype.componentDidMount = function componentDidMount() {
    _MaterialComponent.prototype.attachRipple.call(this);
  };

  Button.prototype.materialDom = function materialDom(props) {
    var _this2 = this;

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])("button", _extends({
      ref: function ref(control) {
        _this2.control = control;
      }
    }, props), this.props.children);
  };

  return Button;
}(__WEBPACK_IMPORTED_MODULE_1__MaterialComponent__["a" /* default */]);



/***/ }),

/***/ "E1C8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Home; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_basket_item__ = __webpack_require__("nAGt");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_section__ = __webpack_require__("rWv4");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_scss__ = __webpack_require__("Lglr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__style_scss__);


function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






// import cartData from '../../data';

var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
	'div',
	{ 'class': 'center p2' },
	'Upload designs above'
);

var Home = function (_Component) {
	_inherits(Home, _Component);

	function Home(props) {
		_classCallCheck(this, Home);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.onSectionToggle = function () {
			_this.setState({
				sectionOpen: !_this.state.sectionOpen
			});
		};

		_this.onUpload = function (event) {
			var files = event.target.files;
			var uploads = [];

			for (var i = 0; i < files.length; i++) {
				uploads.push({
					name: files[i].name,
					quantity: 1,
					dimensions: {
						h: 0,
						w: 0,
						l: 0
					}
				});
			}

			_this.setState({
				sectionOpen: true,
				designs: uploads.concat(_this.state.designs)
			});
		};

		_this.removeItem = function (basketKey) {
			var designs = _this.state.designs;

			designs.splice(basketKey, 1);
			_this.setState({
				designs: designs
			});
		};

		_this.updateQuantity = function (basketKey, newQuantity) {
			if (newQuantity < 1) {
				return;
			}

			var designs = _this.state.designs;

			designs[basketKey].quantity = newQuantity;
			_this.setState({
				designs: designs
			});
		};

		_this.state = {
			designs: [],
			sectionOpen: false
		};
		return _this;
	}

	Home.prototype.renderEmpty = function renderEmpty() {
		return _ref;
	};

	Home.prototype.renderItems = function renderItems() {
		var _this2 = this;

		return this.state.designs.map(function (item, index) {
			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_1__components_basket_item__["a" /* default */], {
				removeItem: _this2.removeItem,
				basketKey: index,
				updateQuantity: _this2.updateQuantity,
				quantity: item.quantity,
				name: item.name,
				dimensions: item.dimensions
			});
		});
	};

	Home.prototype.renderUploadZone = function renderUploadZone() {
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
			'form',
			{ 'class': 'mb2 flex items-center ' + __WEBPACK_IMPORTED_MODULE_3__style_scss___default.a.upload },
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('input', {
				id: 'files',
				multiple: 'multiple',
				type: 'file',
				name: 'upload',
				'class': __WEBPACK_IMPORTED_MODULE_3__style_scss___default.a.hide,
				onChange: this.onUpload
			}),
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				'label',
				{ 'class': __WEBPACK_IMPORTED_MODULE_3__style_scss___default.a.uploadLabel, 'for': 'files' },
				'Select a file to upload'
			)
		);
	};

	Home.prototype.render = function render(_ref2, _ref3) {
		var sectionOpen = _ref3.sectionOpen,
		    removingItem = _ref3.removingItem,
		    designs = _ref3.designs;

		_objectDestructuringEmpty(_ref2);

		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
			'div',
			{ 'class': __WEBPACK_IMPORTED_MODULE_3__style_scss___default.a.home },
			this.renderUploadZone(),
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				__WEBPACK_IMPORTED_MODULE_2__components_section__["a" /* default */],
				{ open: sectionOpen, onToggle: this.onSectionToggle, title: 'Designs' },
				designs.length > 0 ? this.renderItems() : this.renderEmpty()
			)
		);
	};

	return Home;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "EQDb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MDCComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__foundation__ = __webpack_require__("uJAj");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



/**
 * @template F
 */

var MDCComponent = function () {
  /**
   * @param {!Element} root
   * @return {!MDCComponent}
   */
  MDCComponent.attachTo = function attachTo(root) {
    // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
    // returns an instantiated component with its root set to that element. Also note that in the cases of
    // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
    // from getDefaultFoundation().
    return new MDCComponent(root, new __WEBPACK_IMPORTED_MODULE_0__foundation__["a" /* default */]());
  };

  /**
   * @param {!Element} root
   * @param {F=} foundation
   * @param {...?} args
   */


  function MDCComponent(root) {
    var foundation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    _classCallCheck(this, MDCComponent);

    /** @protected {!Element} */
    this.root_ = root;

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    this.initialize.apply(this, args);
    // Note that we initialize foundation here and not within the constructor's default param so that
    // this.root_ is defined and can be used within the foundation class.
    /** @protected {!F} */
    this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
    this.foundation_.init();
    this.initialSyncWithDOM();
  }

  MDCComponent.prototype.initialize = function initialize() /* ...args */{}
  // Subclasses can override this to do any additional setup work that would be considered part of a
  // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
  // initialized. Any additional arguments besides root and foundation will be passed in here.


  /**
   * @return {!F} foundation
   */
  ;

  MDCComponent.prototype.getDefaultFoundation = function getDefaultFoundation() {
    // Subclasses must override this method to return a properly configured foundation class for the
    // component.
    throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
  };

  MDCComponent.prototype.initialSyncWithDOM = function initialSyncWithDOM() {
    // Subclasses should override this method if they need to perform work to synchronize with a host DOM
    // object. An example of this would be a form control wrapper that needs to synchronize its internal state
    // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
    // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
  };

  MDCComponent.prototype.destroy = function destroy() {
    // Subclasses may implement this method to release any resources / deregister any listeners they have
    // attached. An example of this might be deregistering a resize event from the window object.
    this.foundation_.destroy();
  };

  /**
   * Wrapper method to add an event listener to the component's root element. This is most useful when
   * listening for custom events.
   * @param {string} evtType
   * @param {!Function} handler
   */


  MDCComponent.prototype.listen = function listen(evtType, handler) {
    this.root_.addEventListener(evtType, handler);
  };

  /**
   * Wrapper method to remove an event listener to the component's root element. This is most useful when
   * unlistening for custom events.
   * @param {string} evtType
   * @param {!Function} handler
   */


  MDCComponent.prototype.unlisten = function unlisten(evtType, handler) {
    this.root_.removeEventListener(evtType, handler);
  };

  /**
   * Fires a cross-browser-compatible custom event from the component root of the given type,
   * with the given data.
   * @param {string} evtType
   * @param {!Object} evtData
   * @param {boolean=} shouldBubble
   */


  MDCComponent.prototype.emit = function emit(evtType, evtData) {
    var shouldBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var evt = void 0;
    if (typeof CustomEvent === 'function') {
      evt = new CustomEvent(evtType, {
        detail: evtData,
        bubbles: shouldBubble
      });
    } else {
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(evtType, shouldBubble, false, evtData);
    }

    this.root_.dispatchEvent(evt);
  };

  return MDCComponent;
}();



/***/ }),

/***/ "FHEU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Ripple. Provides an interface for managing
 * - classes
 * - dom
 * - CSS variables
 * - position
 * - dimensions
 * - scroll position
 * - event handlers
 * - unbounded, active and disabled states
 *
 * Additionally, provides type information for the adapter to the Closure
 * compiler.
 *
 * Implement this adapter for your framework of choice to delegate updates to
 * the component in your framework of choice. See architecture documentation
 * for more details.
 * https://github.com/material-components/material-components-web/blob/master/docs/architecture.md
 *
 * @record
 */
var MDCRippleAdapter = function () {
  function MDCRippleAdapter() {
    _classCallCheck(this, MDCRippleAdapter);
  }

  /** @return {boolean} */
  MDCRippleAdapter.prototype.browserSupportsCssVars = function browserSupportsCssVars() {};

  /** @return {boolean} */


  MDCRippleAdapter.prototype.isUnbounded = function isUnbounded() {};

  /** @return {boolean} */


  MDCRippleAdapter.prototype.isSurfaceActive = function isSurfaceActive() {};

  /** @return {boolean} */


  MDCRippleAdapter.prototype.isSurfaceDisabled = function isSurfaceDisabled() {};

  /** @param {string} className */


  MDCRippleAdapter.prototype.addClass = function addClass(className) {};

  /** @param {string} className */


  MDCRippleAdapter.prototype.removeClass = function removeClass(className) {};

  /**
   * @param {string} evtType
   * @param {!Function} handler
   */


  MDCRippleAdapter.prototype.registerInteractionHandler = function registerInteractionHandler(evtType, handler) {};

  /**
   * @param {string} evtType
   * @param {!Function} handler
   */


  MDCRippleAdapter.prototype.deregisterInteractionHandler = function deregisterInteractionHandler(evtType, handler) {};

  /**
   * @param {!Function} handler
   */


  MDCRippleAdapter.prototype.registerResizeHandler = function registerResizeHandler(handler) {};

  /**
   * @param {!Function} handler
   */


  MDCRippleAdapter.prototype.deregisterResizeHandler = function deregisterResizeHandler(handler) {};

  /**
   * @param {string} varName
   * @param {?number|string} value
   */


  MDCRippleAdapter.prototype.updateCssVariable = function updateCssVariable(varName, value) {};

  /** @return {!ClientRect} */


  MDCRippleAdapter.prototype.computeBoundingRect = function computeBoundingRect() {};

  /** @return {{x: number, y: number}} */


  MDCRippleAdapter.prototype.getWindowPageOffset = function getWindowPageOffset() {};

  return MDCRippleAdapter;
}();



/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_index_scss__ = __webpack_require__("yY49");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_index_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_index_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_app__ = __webpack_require__("qLaj");



/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_1__components_app__["a" /* default */]);

/***/ }),

/***/ "KM04":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e() {}function t(t, n) {
    var o,
        r,
        i,
        l,
        a = E;for (l = arguments.length; l-- > 2;) {
      W.push(arguments[l]);
    }n && null != n.children && (W.length || W.push(n.children), delete n.children);while (W.length) {
      if ((r = W.pop()) && void 0 !== r.pop) for (l = r.length; l--;) {
        W.push(r[l]);
      } else "boolean" == typeof r && (r = null), (i = "function" != typeof t) && (null == r ? r = "" : "number" == typeof r ? r += "" : "string" != typeof r && (i = !1)), i && o ? a[a.length - 1] += r : a === E ? a = [r] : a.push(r), o = i;
    }var u = new e();return u.nodeName = t, u.children = a, u.attributes = null == n ? void 0 : n, u.key = null == n ? void 0 : n.key, void 0 !== S.vnode && S.vnode(u), u;
  }function n(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function o(e, o) {
    return t(e.nodeName, n(n({}, e.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : e.children);
  }function r(e) {
    !e.__d && (e.__d = !0) && 1 == A.push(e) && (S.debounceRendering || P)(i);
  }function i() {
    var e,
        t = A;A = [];while (e = t.pop()) {
      e.__d && k(e);
    }
  }function l(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && a(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function a(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function u(e) {
    var t = n({}, e.attributes);t.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === t[r] && (t[r] = o[r]);
    }return t;
  }function _(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function p(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function c(e, t, n, o, r) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n && n(null), o && o(e);else if ("class" !== t || r) {
      if ("style" === t) {
        if (o && "string" != typeof o && "string" != typeof n || (e.style.cssText = o || ""), o && "object" == typeof o) {
          if ("string" != typeof n) for (var i in n) {
            i in o || (e.style[i] = "");
          }for (var i in o) {
            e.style[i] = "number" == typeof o[i] && !1 === V.test(i) ? o[i] + "px" : o[i];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) o && (e.innerHTML = o.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var l = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), o ? n || e.addEventListener(t, f, l) : e.removeEventListener(t, f, l), (e.__l || (e.__l = {}))[t] = o;
      } else if ("list" !== t && "type" !== t && !r && t in e) s(e, t, null == o ? "" : o), null != o && !1 !== o || e.removeAttribute(t);else {
        var a = r && t !== (t = t.replace(/^xlink\:?/, ""));null == o || !1 === o ? a ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof o && (a ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), o) : e.setAttribute(t, o));
      }
    } else e.className = o || "";
  }function s(e, t, n) {
    try {
      e[t] = n;
    } catch (e) {}
  }function f(e) {
    return this.__l[e.type](S.event && S.event(e) || e);
  }function d() {
    var e;while (e = D.pop()) {
      S.afterMount && S.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function h(e, t, n, o, r, i) {
    H++ || (R = null != r && void 0 !== r.ownerSVGElement, j = null != e && !("__preactattr_" in e));var l = m(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --H || (j = !1, i || d()), l;
  }function m(e, t, n, o, r) {
    var i = e,
        l = R;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0))), i.__preactattr_ = !0, i;var u = t.nodeName;if ("function" == typeof u) return U(e, t, n, o);if (R = "svg" === u || "foreignObject" !== u && R, u += "", (!e || !a(e, u)) && (i = _(u, R), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0);
    }var p = i.firstChild,
        c = i.__preactattr_,
        s = t.children;if (null == c) {
      c = i.__preactattr_ = {};for (var f = i.attributes, d = f.length; d--;) {
        c[f[d].name] = f[d].value;
      }
    }return !j && s && 1 === s.length && "string" == typeof s[0] && null != p && void 0 !== p.splitText && null == p.nextSibling ? p.nodeValue != s[0] && (p.nodeValue = s[0]) : (s && s.length || null != p) && v(i, s, n, o, j || null != c.dangerouslySetInnerHTML), g(i, t.attributes, c), R = l, i;
  }function v(e, t, n, o, r) {
    var i,
        a,
        u,
        _,
        c,
        s = e.childNodes,
        f = [],
        d = {},
        h = 0,
        v = 0,
        y = s.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = s[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (h++, d[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (f[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      _ = t[C], c = null;var k = _.key;if (null != k) h && void 0 !== d[k] && (c = d[k], d[k] = void 0, h--);else if (!c && v < g) for (i = v; i < g; i++) {
        if (void 0 !== f[i] && l(a = f[i], _, r)) {
          c = a, f[i] = void 0, i === g - 1 && g--, i === v && v++;break;
        }
      }c = m(c, _, n, o), u = s[C], c && c !== e && c !== u && (null == u ? e.appendChild(c) : c === u.nextSibling ? p(u) : e.insertBefore(c, u));
    }if (h) for (var C in d) {
      void 0 !== d[C] && b(d[C], !1);
    }while (v <= g) {
      void 0 !== (c = f[g--]) && b(c, !1);
    }
  }function b(e, t) {
    var n = e._component;n ? L(n) : (null != e.__preactattr_ && e.__preactattr_.ref && e.__preactattr_.ref(null), !1 !== t && null != e.__preactattr_ || p(e), y(e));
  }function y(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;b(e, !0), e = t;
    }
  }function g(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || c(e, o, n[o], n[o] = void 0, R);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || c(e, o, n[o], n[o] = t[o], R);
    }
  }function w(e) {
    var t = e.constructor.name;(I[t] || (I[t] = [])).push(e);
  }function C(e, t, n) {
    var o,
        r = I[e.name];if (e.prototype && e.prototype.render ? (o = new e(t, n), T.call(o, t, n)) : (o = new T(t, n), o.constructor = e, o.render = x), r) for (var i = r.length; i--;) {
      if (r[i].constructor === e) {
        o.__b = r[i].__b, r.splice(i, 1);break;
      }
    }return o;
  }function x(e, t, n) {
    return this.constructor(e, n);
  }function N(e, t, n, o, i) {
    e.__x || (e.__x = !0, (e.__r = t.ref) && delete t.ref, (e.__k = t.key) && delete t.key, !e.base || i ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, o), o && o !== e.context && (e.__c || (e.__c = e.context), e.context = o), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== n && (1 !== n && !1 === S.syncComponentUpdates && e.base ? r(e) : k(e, 1, i)), e.__r && e.__r(e));
  }function k(e, t, o, r) {
    if (!e.__x) {
      var i,
          l,
          a,
          _ = e.props,
          p = e.state,
          c = e.context,
          s = e.__p || _,
          f = e.__s || p,
          m = e.__c || c,
          v = e.base,
          y = e.__b,
          g = v || y,
          w = e._component,
          x = !1;if (v && (e.props = s, e.state = f, e.context = m, 2 !== t && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(_, p, c) ? x = !0 : e.componentWillUpdate && e.componentWillUpdate(_, p, c), e.props = _, e.state = p, e.context = c), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !x) {
        i = e.render(_, p, c), e.getChildContext && (c = n(n({}, c), e.getChildContext()));var U,
            T,
            M = i && i.nodeName;if ("function" == typeof M) {
          var W = u(i);l = w, l && l.constructor === M && W.key == l.__k ? N(l, W, 1, c, !1) : (U = l, e._component = l = C(M, W, c), l.__b = l.__b || y, l.__u = e, N(l, W, 0, c, !1), k(l, 1, o, !0)), T = l.base;
        } else a = g, U = w, U && (a = e._component = null), (g || 1 === t) && (a && (a._component = null), T = h(a, i, c, o || !v, g && g.parentNode, !0));if (g && T !== g && l !== w) {
          var E = g.parentNode;E && T !== E && (E.replaceChild(T, g), U || (g._component = null, b(g, !1)));
        }if (U && L(U), e.base = T, T && !r) {
          var P = e,
              V = e;while (V = V.__u) {
            (P = V).base = T;
          }T._component = P, T._componentConstructor = P.constructor;
        }
      }if (!v || o ? D.unshift(e) : x || (e.componentDidUpdate && e.componentDidUpdate(s, f, m), S.afterUpdate && S.afterUpdate(e)), null != e.__h) while (e.__h.length) {
        e.__h.pop().call(e);
      }H || r || d();
    }
  }function U(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        a = r && e._componentConstructor === t.nodeName,
        _ = a,
        p = u(t);while (r && !_ && (r = r.__u)) {
      _ = r.constructor === t.nodeName;
    }return r && _ && (!o || r._component) ? (N(r, p, 3, n, o), e = r.base) : (i && !a && (L(i), e = l = null), r = C(t.nodeName, p, n), e && !r.__b && (r.__b = e, l = null), N(r, p, 1, n, o), e = r.base, l && e !== l && (l._component = null, b(l, !1))), e;
  }function L(e) {
    S.beforeUnmount && S.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var n = e._component;n ? L(n) : t && (t.__preactattr_ && t.__preactattr_.ref && t.__preactattr_.ref(null), e.__b = t, p(t), w(e), y(t)), e.__r && e.__r(null);
  }function T(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {};
  }function M(e, t, n) {
    return h(n, e, {}, !1, t, !1);
  }var S = {},
      W = [],
      E = [],
      P = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      V = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      A = [],
      D = [],
      H = 0,
      R = !1,
      j = !1,
      I = {};n(T.prototype, { setState: function setState(e, t) {
      var o = this.state;this.__s || (this.__s = n({}, o)), n(o, "function" == typeof e ? e(o, this.props) : e), t && (this.__h = this.__h || []).push(t), r(this);
    }, forceUpdate: function forceUpdate(e) {
      e && (this.__h = this.__h || []).push(e), k(this, 2);
    }, render: function render() {} });var $ = { h: t, createElement: t, cloneElement: o, Component: T, render: M, rerender: i, options: S }; true ? module.exports = $ : self.preact = $;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "Lglr":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__1CGvB","upload":"upload__8dbAs","hide":"hide__346nI","uploadLabel":"uploadLabel__2U8UB","remove":"remove__xEVDA"};

/***/ }),

/***/ "MeGi":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Icon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MaterialComponent__ = __webpack_require__("lhA9");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};




/**
 * @prop disabled = false
 */

var Icon = function (_MaterialComponent) {
  _inherits(Icon, _MaterialComponent);

  function Icon() {
    _classCallCheck(this, Icon);

    var _this = _possibleConstructorReturn(this, _MaterialComponent.call(this));

    _this.componentName = "icon";
    return _this;
  }

  Icon.prototype.materialDom = function materialDom(props) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])("i", _extends({}, props, { className: "material-icons" }), props.children);
  };

  return Icon;
}(__WEBPACK_IMPORTED_MODULE_1__MaterialComponent__["a" /* default */]);



/***/ }),

/***/ "Mzq7":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"quantity":"quantity__7P0iJ","quantityChange":"quantityChange__1Ltch","image":"image__9n303","remove":"remove__1qh9l","portal":"portal__2It5h","modal":"modal__1yZUW","modalBody":"modalBody__21EqH"};

/***/ }),

/***/ "NQRl":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cssClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return strings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return numbers; });
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var cssClasses = {
  // Ripple is a special case where the "root" component is really a "mixin" of sorts,
  // given that it's an 'upgrade' to an existing component. That being said it is the root
  // CSS class that all other CSS classes derive from.
  ROOT: 'mdc-ripple-upgraded',
  UNBOUNDED: 'mdc-ripple-upgraded--unbounded',
  BG_FOCUSED: 'mdc-ripple-upgraded--background-focused',
  BG_ACTIVE_FILL: 'mdc-ripple-upgraded--background-active-fill',
  FG_ACTIVATION: 'mdc-ripple-upgraded--foreground-activation',
  FG_DEACTIVATION: 'mdc-ripple-upgraded--foreground-deactivation'
};

var strings = {
  VAR_SURFACE_WIDTH: '--mdc-ripple-surface-width',
  VAR_SURFACE_HEIGHT: '--mdc-ripple-surface-height',
  VAR_FG_SIZE: '--mdc-ripple-fg-size',
  VAR_LEFT: '--mdc-ripple-left',
  VAR_TOP: '--mdc-ripple-top',
  VAR_FG_SCALE: '--mdc-ripple-fg-scale',
  VAR_FG_TRANSLATE_START: '--mdc-ripple-fg-translate-start',
  VAR_FG_TRANSLATE_END: '--mdc-ripple-fg-translate-end'
};

var numbers = {
  PADDING: 10,
  INITIAL_ORIGIN_SCALE: 0.6,
  DEACTIVATION_TIMEOUT_MS: 300,
  FG_DEACTIVATION_MS: 83
};

/***/ }),

/***/ "QDyu":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"title":"title__1Z8_K","section":"section__3zrAI","body":"body__1y91F","open":"open__28-y8"};

/***/ }),

/***/ "SIOS":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MDCRippleFoundation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__material_base_foundation__ = __webpack_require__("uJAj");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__adapter__ = __webpack_require__("FHEU");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__("NQRl");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__("joOv");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






/**
 * @typedef {!{
 *   isActivated: (boolean|undefined),
 *   hasDeactivationUXRun: (boolean|undefined),
 *   wasActivatedByPointer: (boolean|undefined),
 *   wasElementMadeActive: (boolean|undefined),
 *   activationStartTime: (number|undefined),
 *   activationEvent: Event,
 *   isProgrammatic: (boolean|undefined)
 * }}
 */
var ActivationStateType = void 0;

/**
 * @typedef {!{
 *   activate: (string|undefined),
 *   deactivate: (string|undefined),
 *   focus: (string|undefined),
 *   blur: (string|undefined)
 * }}
 */
var ListenerInfoType = void 0;

/**
 * @typedef {!{
 *   activate: function(!Event),
 *   deactivate: function(!Event),
 *   focus: function(),
 *   blur: function()
 * }}
 */
var ListenersType = void 0;

/**
 * @typedef {!{
 *   x: number,
 *   y: number
 * }}
 */
var PointType = void 0;

/**
 * @enum {string}
 */
var DEACTIVATION_ACTIVATION_PAIRS = {
  mouseup: 'mousedown',
  pointerup: 'pointerdown',
  touchend: 'touchstart',
  keyup: 'keydown',
  blur: 'focus'
};

/**
 * @extends {MDCFoundation<!MDCRippleAdapter>}
 */

var MDCRippleFoundation = function (_MDCFoundation) {
  _inherits(MDCRippleFoundation, _MDCFoundation);

  _createClass(MDCRippleFoundation, [{
    key: 'isSupported_',


    /**
     * We compute this property so that we are not querying information about the client
     * until the point in time where the foundation requests it. This prevents scenarios where
     * client-side feature-detection may happen too early, such as when components are rendered on the server
     * and then initialized at mount time on the client.
     * @return {boolean}
     */
    get: function get() {
      return this.adapter_.browserSupportsCssVars();
    }
  }], [{
    key: 'cssClasses',
    get: function get() {
      return __WEBPACK_IMPORTED_MODULE_2__constants__["a" /* cssClasses */];
    }
  }, {
    key: 'strings',
    get: function get() {
      return __WEBPACK_IMPORTED_MODULE_2__constants__["b" /* strings */];
    }
  }, {
    key: 'numbers',
    get: function get() {
      return __WEBPACK_IMPORTED_MODULE_2__constants__["c" /* numbers */];
    }
  }, {
    key: 'defaultAdapter',
    get: function get() {
      return {
        browserSupportsCssVars: function browserSupportsCssVars() /* boolean - cached */{},
        isUnbounded: function isUnbounded() /* boolean */{},
        isSurfaceActive: function isSurfaceActive() /* boolean */{},
        isSurfaceDisabled: function isSurfaceDisabled() /* boolean */{},
        addClass: function addClass() /* className: string */{},
        removeClass: function removeClass() /* className: string */{},
        registerInteractionHandler: function registerInteractionHandler() /* evtType: string, handler: EventListener */{},
        deregisterInteractionHandler: function deregisterInteractionHandler() /* evtType: string, handler: EventListener */{},
        registerResizeHandler: function registerResizeHandler() /* handler: EventListener */{},
        deregisterResizeHandler: function deregisterResizeHandler() /* handler: EventListener */{},
        updateCssVariable: function updateCssVariable() /* varName: string, value: string */{},
        computeBoundingRect: function computeBoundingRect() /* ClientRect */{},
        getWindowPageOffset: function getWindowPageOffset() /* {x: number, y: number} */{}
      };
    }
  }]);

  function MDCRippleFoundation(adapter) {
    _classCallCheck(this, MDCRippleFoundation);

    /** @private {number} */
    var _this = _possibleConstructorReturn(this, _MDCFoundation.call(this, _extends(MDCRippleFoundation.defaultAdapter, adapter)));

    _this.layoutFrame_ = 0;

    /** @private {!ClientRect} */
    _this.frame_ = /** @type {!ClientRect} */{ width: 0, height: 0 };

    /** @private {!ActivationStateType} */
    _this.activationState_ = _this.defaultActivationState_();

    /** @private {number} */
    _this.xfDuration_ = 0;

    /** @private {number} */
    _this.initialSize_ = 0;

    /** @private {number} */
    _this.maxRadius_ = 0;

    /** @private {!Array<{ListenerInfoType}>} */
    _this.listenerInfos_ = [{ activate: 'touchstart', deactivate: 'touchend' }, { activate: 'pointerdown', deactivate: 'pointerup' }, { activate: 'mousedown', deactivate: 'mouseup' }, { activate: 'keydown', deactivate: 'keyup' }, { focus: 'focus', blur: 'blur' }];

    /** @private {!ListenersType} */
    _this.listeners_ = {
      activate: function activate(e) {
        return _this.activate_(e);
      },
      deactivate: function deactivate(e) {
        return _this.deactivate_(e);
      },
      focus: function focus() {
        return requestAnimationFrame(function () {
          return _this.adapter_.addClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
        });
      },
      blur: function blur() {
        return requestAnimationFrame(function () {
          return _this.adapter_.removeClass(MDCRippleFoundation.cssClasses.BG_FOCUSED);
        });
      }
    };

    /** @private {!Function} */
    _this.resizeHandler_ = function () {
      return _this.layout();
    };

    /** @private {!{left: number, top:number}} */
    _this.unboundedCoords_ = {
      left: 0,
      top: 0
    };

    /** @private {number} */
    _this.fgScale_ = 0;

    /** @private {number} */
    _this.activationTimer_ = 0;

    /** @private {number} */
    _this.fgDeactivationRemovalTimer_ = 0;

    /** @private {boolean} */
    _this.activationAnimationHasEnded_ = false;

    /** @private {!Function} */
    _this.activationTimerCallback_ = function () {
      _this.activationAnimationHasEnded_ = true;
      _this.runDeactivationUXLogicIfReady_();
    };
    return _this;
  }

  /**
   * @return {!ActivationStateType}
   */


  MDCRippleFoundation.prototype.defaultActivationState_ = function defaultActivationState_() {
    return {
      isActivated: false,
      hasDeactivationUXRun: false,
      wasActivatedByPointer: false,
      wasElementMadeActive: false,
      activationStartTime: 0,
      activationEvent: null,
      isProgrammatic: false
    };
  };

  MDCRippleFoundation.prototype.init = function init() {
    var _this2 = this;

    if (!this.isSupported_) {
      return;
    }
    this.addEventListeners_();

    var _MDCRippleFoundation$ = MDCRippleFoundation.cssClasses,
        ROOT = _MDCRippleFoundation$.ROOT,
        UNBOUNDED = _MDCRippleFoundation$.UNBOUNDED;

    requestAnimationFrame(function () {
      _this2.adapter_.addClass(ROOT);
      if (_this2.adapter_.isUnbounded()) {
        _this2.adapter_.addClass(UNBOUNDED);
      }
      _this2.layoutInternal_();
    });
  };

  /** @private */


  MDCRippleFoundation.prototype.addEventListeners_ = function addEventListeners_() {
    var _this3 = this;

    this.listenerInfos_.forEach(function (info) {
      Object.keys(info).forEach(function (k) {
        _this3.adapter_.registerInteractionHandler(info[k], _this3.listeners_[k]);
      });
    });
    this.adapter_.registerResizeHandler(this.resizeHandler_);
  };

  /**
   * @param {Event} e
   * @private
   */


  MDCRippleFoundation.prototype.activate_ = function activate_(e) {
    var _this4 = this;

    if (this.adapter_.isSurfaceDisabled()) {
      return;
    }

    var activationState = this.activationState_;

    if (activationState.isActivated) {
      return;
    }

    activationState.isActivated = true;
    activationState.isProgrammatic = e === null;
    activationState.activationEvent = e;
    activationState.wasActivatedByPointer = activationState.isProgrammatic ? false : e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'pointerdown';
    activationState.activationStartTime = Date.now();

    requestAnimationFrame(function () {
      // This needs to be wrapped in an rAF call b/c web browsers
      // report active states inconsistently when they're called within
      // event handling code:
      // - https://bugs.chromium.org/p/chromium/issues/detail?id=635971
      // - https://bugzilla.mozilla.org/show_bug.cgi?id=1293741
      activationState.wasElementMadeActive = e && e.type === 'keydown' ? _this4.adapter_.isSurfaceActive() : true;
      if (activationState.wasElementMadeActive) {
        _this4.animateActivation_();
      } else {
        // Reset activation state immediately if element was not made active.
        _this4.activationState_ = _this4.defaultActivationState_();
      }
    });
  };

  MDCRippleFoundation.prototype.activate = function activate() {
    this.activate_(null);
  };

  /** @private */


  MDCRippleFoundation.prototype.animateActivation_ = function animateActivation_() {
    var _this5 = this;

    var _MDCRippleFoundation$2 = MDCRippleFoundation.strings,
        VAR_FG_TRANSLATE_START = _MDCRippleFoundation$2.VAR_FG_TRANSLATE_START,
        VAR_FG_TRANSLATE_END = _MDCRippleFoundation$2.VAR_FG_TRANSLATE_END;
    var _MDCRippleFoundation$3 = MDCRippleFoundation.cssClasses,
        BG_ACTIVE_FILL = _MDCRippleFoundation$3.BG_ACTIVE_FILL,
        FG_DEACTIVATION = _MDCRippleFoundation$3.FG_DEACTIVATION,
        FG_ACTIVATION = _MDCRippleFoundation$3.FG_ACTIVATION;
    var DEACTIVATION_TIMEOUT_MS = MDCRippleFoundation.numbers.DEACTIVATION_TIMEOUT_MS;


    var translateStart = '';
    var translateEnd = '';

    if (!this.adapter_.isUnbounded()) {
      var _getFgTranslationCoor = this.getFgTranslationCoordinates_(),
          startPoint = _getFgTranslationCoor.startPoint,
          endPoint = _getFgTranslationCoor.endPoint;

      translateStart = startPoint.x + 'px, ' + startPoint.y + 'px';
      translateEnd = endPoint.x + 'px, ' + endPoint.y + 'px';
    }

    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_START, translateStart);
    this.adapter_.updateCssVariable(VAR_FG_TRANSLATE_END, translateEnd);
    // Cancel any ongoing activation/deactivation animations
    clearTimeout(this.activationTimer_);
    clearTimeout(this.fgDeactivationRemovalTimer_);
    this.rmBoundedActivationClasses_();
    this.adapter_.removeClass(FG_DEACTIVATION);

    // Force layout in order to re-trigger the animation.
    this.adapter_.computeBoundingRect();
    this.adapter_.addClass(BG_ACTIVE_FILL);
    this.adapter_.addClass(FG_ACTIVATION);
    this.activationTimer_ = setTimeout(function () {
      return _this5.activationTimerCallback_();
    }, DEACTIVATION_TIMEOUT_MS);
  };

  /**
   * @private
   * @return {{startPoint: PointType, endPoint: PointType}}
   */


  MDCRippleFoundation.prototype.getFgTranslationCoordinates_ = function getFgTranslationCoordinates_() {
    var activationState = this.activationState_;
    var activationEvent = activationState.activationEvent,
        wasActivatedByPointer = activationState.wasActivatedByPointer;


    var startPoint = void 0;
    if (wasActivatedByPointer) {
      startPoint = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__["d" /* getNormalizedEventCoords */])(
      /** @type {!Event} */activationEvent, this.adapter_.getWindowPageOffset(), this.adapter_.computeBoundingRect());
    } else {
      startPoint = {
        x: this.frame_.width / 2,
        y: this.frame_.height / 2
      };
    }
    // Center the element around the start point.
    startPoint = {
      x: startPoint.x - this.initialSize_ / 2,
      y: startPoint.y - this.initialSize_ / 2
    };

    var endPoint = {
      x: this.frame_.width / 2 - this.initialSize_ / 2,
      y: this.frame_.height / 2 - this.initialSize_ / 2
    };

    return { startPoint: startPoint, endPoint: endPoint };
  };

  /** @private */


  MDCRippleFoundation.prototype.runDeactivationUXLogicIfReady_ = function runDeactivationUXLogicIfReady_() {
    var _this6 = this;

    var FG_DEACTIVATION = MDCRippleFoundation.cssClasses.FG_DEACTIVATION;
    var _activationState_ = this.activationState_,
        hasDeactivationUXRun = _activationState_.hasDeactivationUXRun,
        isActivated = _activationState_.isActivated;

    var activationHasEnded = hasDeactivationUXRun || !isActivated;
    if (activationHasEnded && this.activationAnimationHasEnded_) {
      this.rmBoundedActivationClasses_();
      this.adapter_.addClass(FG_DEACTIVATION);
      this.fgDeactivationRemovalTimer_ = setTimeout(function () {
        _this6.adapter_.removeClass(FG_DEACTIVATION);
      }, __WEBPACK_IMPORTED_MODULE_2__constants__["c" /* numbers */].FG_DEACTIVATION_MS);
    }
  };

  /** @private */


  MDCRippleFoundation.prototype.rmBoundedActivationClasses_ = function rmBoundedActivationClasses_() {
    var _MDCRippleFoundation$4 = MDCRippleFoundation.cssClasses,
        BG_ACTIVE_FILL = _MDCRippleFoundation$4.BG_ACTIVE_FILL,
        FG_ACTIVATION = _MDCRippleFoundation$4.FG_ACTIVATION;

    this.adapter_.removeClass(BG_ACTIVE_FILL);
    this.adapter_.removeClass(FG_ACTIVATION);
    this.activationAnimationHasEnded_ = false;
    this.adapter_.computeBoundingRect();
  };

  /**
   * @param {Event} e
   * @private
   */


  MDCRippleFoundation.prototype.deactivate_ = function deactivate_(e) {
    var _this7 = this;

    var activationState = this.activationState_;
    // This can happen in scenarios such as when you have a keyup event that blurs the element.

    if (!activationState.isActivated) {
      return;
    }
    // Programmatic deactivation.
    if (activationState.isProgrammatic) {
      var evtObject = null;
      var _state = /** @type {!ActivationStateType} */_extends({}, activationState);
      requestAnimationFrame(function () {
        return _this7.animateDeactivation_(evtObject, _state);
      });
      this.activationState_ = this.defaultActivationState_();
      return;
    }

    var actualActivationType = DEACTIVATION_ACTIVATION_PAIRS[e.type];
    var expectedActivationType = activationState.activationEvent.type;
    // NOTE: Pointer events are tricky - https://patrickhlauke.github.io/touch/tests/results/
    // Essentially, what we need to do here is decouple the deactivation UX from the actual
    // deactivation state itself. This way, touch/pointer events in sequence do not trample one
    // another.
    var needsDeactivationUX = actualActivationType === expectedActivationType;
    var needsActualDeactivation = needsDeactivationUX;
    if (activationState.wasActivatedByPointer) {
      needsActualDeactivation = e.type === 'mouseup';
    }

    var state = /** @type {!ActivationStateType} */_extends({}, activationState);
    requestAnimationFrame(function () {
      if (needsDeactivationUX) {
        _this7.activationState_.hasDeactivationUXRun = true;
        _this7.animateDeactivation_(e, state);
      }

      if (needsActualDeactivation) {
        _this7.activationState_ = _this7.defaultActivationState_();
      }
    });
  };

  MDCRippleFoundation.prototype.deactivate = function deactivate() {
    this.deactivate_(null);
  };

  /**
   * @param {Event} e
   * @param {!ActivationStateType} options
   * @private
   */


  MDCRippleFoundation.prototype.animateDeactivation_ = function animateDeactivation_(e, _ref) {
    var wasActivatedByPointer = _ref.wasActivatedByPointer,
        wasElementMadeActive = _ref.wasElementMadeActive;
    var BG_FOCUSED = MDCRippleFoundation.cssClasses.BG_FOCUSED;

    if (wasActivatedByPointer || wasElementMadeActive) {
      // Remove class left over by element being focused
      this.adapter_.removeClass(BG_FOCUSED);
      this.runDeactivationUXLogicIfReady_();
    }
  };

  MDCRippleFoundation.prototype.destroy = function destroy() {
    var _this8 = this;

    if (!this.isSupported_) {
      return;
    }
    this.removeEventListeners_();

    var _MDCRippleFoundation$5 = MDCRippleFoundation.cssClasses,
        ROOT = _MDCRippleFoundation$5.ROOT,
        UNBOUNDED = _MDCRippleFoundation$5.UNBOUNDED;

    requestAnimationFrame(function () {
      _this8.adapter_.removeClass(ROOT);
      _this8.adapter_.removeClass(UNBOUNDED);
      _this8.removeCssVars_();
    });
  };

  /** @private */


  MDCRippleFoundation.prototype.removeEventListeners_ = function removeEventListeners_() {
    var _this9 = this;

    this.listenerInfos_.forEach(function (info) {
      Object.keys(info).forEach(function (k) {
        _this9.adapter_.deregisterInteractionHandler(info[k], _this9.listeners_[k]);
      });
    });
    this.adapter_.deregisterResizeHandler(this.resizeHandler_);
  };

  /** @private */


  MDCRippleFoundation.prototype.removeCssVars_ = function removeCssVars_() {
    var _this10 = this;

    var strings = MDCRippleFoundation.strings;

    Object.keys(strings).forEach(function (k) {
      if (k.indexOf('VAR_') === 0) {
        _this10.adapter_.updateCssVariable(strings[k], null);
      }
    });
  };

  MDCRippleFoundation.prototype.layout = function layout() {
    var _this11 = this;

    if (this.layoutFrame_) {
      cancelAnimationFrame(this.layoutFrame_);
    }
    this.layoutFrame_ = requestAnimationFrame(function () {
      _this11.layoutInternal_();
      _this11.layoutFrame_ = 0;
    });
  };

  /** @private */


  MDCRippleFoundation.prototype.layoutInternal_ = function layoutInternal_() {
    this.frame_ = this.adapter_.computeBoundingRect();

    var maxDim = Math.max(this.frame_.height, this.frame_.width);
    var surfaceDiameter = Math.sqrt(Math.pow(this.frame_.width, 2) + Math.pow(this.frame_.height, 2));

    // 60% of the largest dimension of the surface
    this.initialSize_ = maxDim * MDCRippleFoundation.numbers.INITIAL_ORIGIN_SCALE;

    // Diameter of the surface + 10px
    this.maxRadius_ = surfaceDiameter + MDCRippleFoundation.numbers.PADDING;
    this.fgScale_ = this.maxRadius_ / this.initialSize_;
    this.xfDuration_ = 1000 * Math.sqrt(this.maxRadius_ / 1024);
    this.updateLayoutCssVars_();
  };

  /** @private */


  MDCRippleFoundation.prototype.updateLayoutCssVars_ = function updateLayoutCssVars_() {
    var _MDCRippleFoundation$6 = MDCRippleFoundation.strings,
        VAR_SURFACE_WIDTH = _MDCRippleFoundation$6.VAR_SURFACE_WIDTH,
        VAR_SURFACE_HEIGHT = _MDCRippleFoundation$6.VAR_SURFACE_HEIGHT,
        VAR_FG_SIZE = _MDCRippleFoundation$6.VAR_FG_SIZE,
        VAR_LEFT = _MDCRippleFoundation$6.VAR_LEFT,
        VAR_TOP = _MDCRippleFoundation$6.VAR_TOP,
        VAR_FG_SCALE = _MDCRippleFoundation$6.VAR_FG_SCALE;


    this.adapter_.updateCssVariable(VAR_SURFACE_WIDTH, this.frame_.width + 'px');
    this.adapter_.updateCssVariable(VAR_SURFACE_HEIGHT, this.frame_.height + 'px');
    this.adapter_.updateCssVariable(VAR_FG_SIZE, this.initialSize_ + 'px');
    this.adapter_.updateCssVariable(VAR_FG_SCALE, this.fgScale_);

    if (this.adapter_.isUnbounded()) {
      this.unboundedCoords_ = {
        left: Math.round(this.frame_.width / 2 - this.initialSize_ / 2),
        top: Math.round(this.frame_.height / 2 - this.initialSize_ / 2)
      };

      this.adapter_.updateCssVariable(VAR_LEFT, this.unboundedCoords_.left + 'px');
      this.adapter_.updateCssVariable(VAR_TOP, this.unboundedCoords_.top + 'px');
    }
  };

  return MDCRippleFoundation;
}(__WEBPACK_IMPORTED_MODULE_0__material_base_foundation__["a" /* default */]);



/***/ }),

/***/ "aqQ4":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "joOv":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = supportsCssVariables;
/* harmony export (immutable) */ __webpack_exports__["c"] = applyPassive;
/* harmony export (immutable) */ __webpack_exports__["a"] = getMatchesProperty;
/* harmony export (immutable) */ __webpack_exports__["d"] = getNormalizedEventCoords;
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @private {boolean|undefined} */
var supportsPassive_ = void 0;

/**
 * @param {!Window} windowObj
 * @return {boolean|undefined}
 */
function supportsCssVariables(windowObj) {
  var supportsFunctionPresent = windowObj.CSS && typeof windowObj.CSS.supports === 'function';
  if (!supportsFunctionPresent) {
    return;
  }

  var explicitlySupportsCssVars = windowObj.CSS.supports('--css-vars', 'yes');
  // See: https://bugs.webkit.org/show_bug.cgi?id=154669
  // See: README section on Safari
  var weAreFeatureDetectingSafari10plus = windowObj.CSS.supports('(--css-vars: yes)') && windowObj.CSS.supports('color', '#00000000');
  return explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus;
}

//
/**
 * Determine whether the current browser supports passive event listeners, and if so, use them.
 * @param {!Window=} globalObj
 * @param {boolean=} forceRefresh
 * @return {boolean|{passive: boolean}}
 */
function applyPassive() {
  var globalObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  var forceRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (supportsPassive_ === undefined || forceRefresh) {
    var isSupported = false;
    try {
      globalObj.document.addEventListener('test', null, { get passive() {
          isSupported = true;
        } });
    } catch (e) {}

    supportsPassive_ = isSupported;
  }

  return supportsPassive_ ? { passive: true } : false;
}

/**
 * @param {!Object} HTMLElementPrototype
 * @return {!Array<string>}
 */
function getMatchesProperty(HTMLElementPrototype) {
  return ['webkitMatchesSelector', 'msMatchesSelector', 'matches'].filter(function (p) {
    return p in HTMLElementPrototype;
  }).pop();
}

/**
 * @param {!Event} ev
 * @param {!{x: number, y: number}} pageOffset
 * @param {!ClientRect} clientRect
 * @return {!{x: number, y: number}}
 */
function getNormalizedEventCoords(ev, pageOffset, clientRect) {
  var x = pageOffset.x,
      y = pageOffset.y;

  var documentX = x + clientRect.left;
  var documentY = y + clientRect.top;

  var normalizedX = void 0;
  var normalizedY = void 0;
  // Determine touch point relative to the ripple container.
  if (ev.type === 'touchstart') {
    normalizedX = ev.changedTouches[0].pageX - documentX;
    normalizedY = ev.changedTouches[0].pageY - documentY;
  } else {
    normalizedX = ev.pageX - documentX;
    normalizedY = ev.pageY - documentY;
  }

  return { x: normalizedX, y: normalizedY };
}

/***/ }),

/***/ "lhA9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaterialComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_ripple__ = __webpack_require__("vkNc");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




/**
 * Base class for every Material component in this package
 * NOTE: every component should add a ref by the name of `control` to its root dom for autoInit Properties
 *
 * @export
 * @class MaterialComponent
 * @extends {Component}
 */

var MaterialComponent = function (_Component) {
  _inherits(MaterialComponent, _Component);

  function MaterialComponent() {
    _classCallCheck(this, MaterialComponent);

    // Attributes inside this array will be check for boolean value true
    // and will be converted to mdc classes
    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this._mdcProps = [];
    // This will again be used to add apt classname to the component
    _this.componentName = "";
    // The final class name given to the dom
    _this.classText = "";
    return _this;
  }

  MaterialComponent.prototype.attachRipple = function attachRipple() {
    if (this.props.ripple && this.control) {
      __WEBPACK_IMPORTED_MODULE_1__material_ripple__["a" /* MDCRipple */].attachTo(this.control);
    }
  };
  // Build the className


  MaterialComponent.prototype.buildClassName = function buildClassName(props) {
    this.classText = "mdc-" + this.componentName;
    for (var propKey in this.props) {
      if (this.props.hasOwnProperty(propKey)) {
        var prop = this.props[propKey];
        if (typeof prop === "boolean" && prop) {
          if (this._mdcProps.indexOf(propKey) !== -1) {
            this.classText += " mdc-" + this.componentName + "--" + propKey;
          }
        }
      }
    }
  };

  MaterialComponent.prototype.getClassName = function getClassName(element) {
    if (!element) {
      return "";
    }
    element.attributes = element.attributes || {};
    if (element.attributes.className) {
      return this.classText + " " + element.attributes.className;
    }
    return this.classText;
  };

  MaterialComponent.prototype.getAutoInitNames = function getAutoInitNames() {
    return this.autoInitText;
  };
  // Components must implement this method for their specific DOM structure


  MaterialComponent.prototype.materialDom = function materialDom(props) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])("div", _extends({}, props), props.children);
  };

  MaterialComponent.prototype.render = function render() {
    this.buildClassName();
    // Fetch a VNode
    var element = this.materialDom(this.props);
    element.attributes = element.attributes || {};
    var autoInits = this.getAutoInitNames();
    // Fix for className
    element.attributes.class = this.getClassName(element);
    // Clean this shit of proxy attributes
    this._mdcProps.forEach(function (prop) {
      delete element.attributes[prop];
    });
    return element;
  };

  return MaterialComponent;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "nAGt":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BasketItem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact_portal__ = __webpack_require__("q6qL");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact_portal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_preact_portal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_preact_material_components_Button__ = __webpack_require__("7/cg");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_preact_material_components_Button_style_css__ = __webpack_require__("aqQ4");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_preact_material_components_Button_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_preact_material_components_Button_style_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style_scss__ = __webpack_require__("Mzq7");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__style_scss__);


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var _ref3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
	'h4',
	null,
	'Are you sure you want to remove this item?'
);

var BasketItem = function (_Component) {
	_inherits(BasketItem, _Component);

	function BasketItem(props) {
		_classCallCheck(this, BasketItem);

		var _this = _possibleConstructorReturn(this, _Component.call(this, props));

		_this.onRemove = function () {
			_this.props.removeItem(_this.props.basketKey);
		};

		_this.toggleRemove = function () {
			_this.setState({
				removingItem: !_this.state.removingItem
			});
		};

		_this.confirmRemove = function () {
			_this.setState({
				removingItem: false
			});
			_this.props.removeItem(_this.props.basketKey);
		};

		_this.state = {
			removingItem: false
		};
		return _this;
	}

	BasketItem.prototype.render = function render(_ref, _ref2) {
		var name = _ref.name,
		    dimensions = _ref.dimensions,
		    quantity = _ref.quantity,
		    updateQuantity = _ref.updateQuantity,
		    basketKey = _ref.basketKey,
		    removeItem = _ref.removeItem;
		var removingItem = _ref2.removingItem;

		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
			'div',
			{ 'class': 'mx1 clearfix p2 border-top flex flex-wrap items-center relative' },
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				'div',
				null,
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('img', { 'class': __WEBPACK_IMPORTED_MODULE_4__style_scss___default.a.image, src: '../../../assets/placeholder.png' })
			),
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				'div',
				{ 'class': 'mx1 flex-auto' },
				name,
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
					'div',
					null,
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
						'span',
						null,
						dimensions.h,
						' X ',
						dimensions.w,
						' X ',
						dimensions.l
					)
				)
			),
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				'div',
				{ 'class': 'mx1 ' + __WEBPACK_IMPORTED_MODULE_4__style_scss___default.a.quantity },
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('input', {
					type: 'button',
					value: '-',
					onClick: function onClick() {
						return updateQuantity(basketKey, --quantity);
					},
					'class': 'border ' + __WEBPACK_IMPORTED_MODULE_4__style_scss___default.a.quantityChange
				}),
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('input', {
					'class': 'mx1',
					type: 'number',
					onClick: function onClick(event) {
						return updateQuantity(basketKey, event.currentTarget.value);
					},
					value: quantity
				}),
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('input', {
					type: 'button',
					value: '+',
					onClick: function onClick() {
						return updateQuantity(basketKey, ++quantity);
					},
					'class': 'ml1 border ' + __WEBPACK_IMPORTED_MODULE_4__style_scss___default.a.quantityChange
				})
			),
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				'div',
				null,
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
					'i',
					{
						'class': __WEBPACK_IMPORTED_MODULE_4__style_scss___default.a.remove,
						onClick: this.toggleRemove
					},
					'X'
				)
			),
			removingItem && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				__WEBPACK_IMPORTED_MODULE_1_preact_portal___default.a,
				{ into: 'body' },
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
					'div',
					{ 'class': __WEBPACK_IMPORTED_MODULE_4__style_scss___default.a.portal, onClick: this.close },
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
						'div',
						{ 'class': __WEBPACK_IMPORTED_MODULE_4__style_scss___default.a.modal },
						__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
							'div',
							{ 'class': 'p2 ' + __WEBPACK_IMPORTED_MODULE_4__style_scss___default.a.modalBody },
							_ref3,
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
								'div',
								{ 'class': 'right-align' },
								__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
									__WEBPACK_IMPORTED_MODULE_2_preact_material_components_Button__["a" /* default */],
									{
										onClick: this.toggleRemove,
										raised: true
									},
									'Cancel'
								),
								__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
									__WEBPACK_IMPORTED_MODULE_2_preact_material_components_Button__["a" /* default */],
									{
										onClick: this.confirmRemove,
										className: 'ml1',
										raised: true,
										primary: true
									},
									'Confirm'
								)
							)
						)
					)
				)
			)
		);
	};

	return BasketItem;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "q6qL":
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? module.exports = factory(__webpack_require__("KM04")) : typeof define === 'function' && define.amd ? define(['preact'], factory) : global.preactPortal = factory(global.preact);
})(this, function (preact) {
	'use strict';

	var classCallCheck = function classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	};

	var inherits = function inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};

	var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	};

	var Portal = function (_Component) {
		inherits(Portal, _Component);

		function Portal() {
			classCallCheck(this, Portal);
			return possibleConstructorReturn(this, _Component.apply(this, arguments));
		}

		Portal.prototype.componentDidUpdate = function componentDidUpdate(props) {
			for (var i in props) {
				if (props[i] !== this.props[i]) {
					return this.renderLayer();
				}
			}
		};

		Portal.prototype.componentDidMount = function componentDidMount() {
			this.renderLayer();
		};

		Portal.prototype.componentWillUnmount = function componentWillUnmount() {
			this.renderLayer(false);
			if (this.remote) this.remote.parentNode.removeChild(this.remote);
		};

		Portal.prototype.findNode = function findNode(node) {
			return typeof node === 'string' ? document.querySelector(node) : node;
		};

		Portal.prototype.renderLayer = function renderLayer() {
			var show = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

			if (this.props.into !== this.intoPointer) {
				this.intoPointer = this.props.into;
				if (this.into && this.remote) {
					this.remote = preact.render(preact.h(PortalProxy, null), this.into, this.remote);
				}
				this.into = this.findNode(this.props.into);
			}

			this.remote = preact.render(preact.h(PortalProxy, { context: this.context }, show && this.props.children || null), this.into, this.remote);
		};

		Portal.prototype.render = function render() {
			return null;
		};

		return Portal;
	}(preact.Component);

	var PortalProxy = function (_Component2) {
		inherits(PortalProxy, _Component2);

		function PortalProxy() {
			classCallCheck(this, PortalProxy);
			return possibleConstructorReturn(this, _Component2.apply(this, arguments));
		}

		PortalProxy.prototype.getChildContext = function getChildContext() {
			return this.props.context;
		};

		PortalProxy.prototype.render = function render(_ref) {
			var children = _ref.children;

			return children && children[0] || null;
		};

		return PortalProxy;
	}(preact.Component);

	return Portal;
});
//# sourceMappingURL=preact-portal.js.map

/***/ }),

/***/ "qLaj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return App; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact_router__ = __webpack_require__("/QC5");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__header__ = __webpack_require__("sIAo");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__routes_home__ = __webpack_require__("E1C8");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






// import Home from 'async!./home';
// import Profile from 'async!./profile';

var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_2__header__["a" /* default */], null);

var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_3__routes_home__["a" /* default */], { path: '/' });

var App = function (_Component) {
	_inherits(App, _Component);

	function App() {
		var _temp, _this, _ret;

		_classCallCheck(this, App);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleRoute = function (e) {
			_this.currentUrl = e.url;
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}
	/** Gets fired when the route changes.
  *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
  *	@param {string} event.url	The newly routed URL
  */


	App.prototype.render = function render() {
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
			'div',
			{ id: 'app' },
			_ref,
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				__WEBPACK_IMPORTED_MODULE_1_preact_router__["a" /* Router */],
				{ onChange: this.handleRoute },
				_ref2
			)
		);
	};

	return App;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "rWv4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Section; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact_material_components_Icon__ = __webpack_require__("MeGi");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_scss__ = __webpack_require__("QDyu");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__style_scss__);


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var Section = function (_Component) {
	_inherits(Section, _Component);

	function Section() {
		_classCallCheck(this, Section);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Section.prototype.render = function render(_ref) {
		var name = _ref.name,
		    dimensions = _ref.dimensions,
		    children = _ref.children,
		    title = _ref.title,
		    onToggle = _ref.onToggle,
		    open = _ref.open;

		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
			'section',
			{
				'class': 'overflow-hidden rounded border ' + __WEBPACK_IMPORTED_MODULE_2__style_scss___default.a.section
			},
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				'div',
				{
					onClick: onToggle,
					'class': 'p2 bold ' + __WEBPACK_IMPORTED_MODULE_2__style_scss___default.a.title
				},
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
					__WEBPACK_IMPORTED_MODULE_1_preact_material_components_Icon__["a" /* default */],
					null,
					open ? 'keyboard_arrow_down' : 'keyboard_arrow_right'
				),
				title
			),
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				'div',
				{ 'class': __WEBPACK_IMPORTED_MODULE_2__style_scss___default.a.body + ' ' + (open ? __WEBPACK_IMPORTED_MODULE_2__style_scss___default.a.open : '') },
				children
			)
		);
	};

	return Section;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "sIAo":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Header; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_scss__ = __webpack_require__("/Umn");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style_scss__);


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
	'h1',
	null,
	'Checkitout'
);

var Header = function (_Component) {
	_inherits(Header, _Component);

	function Header() {
		_classCallCheck(this, Header);

		return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	}

	Header.prototype.render = function render() {
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
			'header',
			{ 'class': __WEBPACK_IMPORTED_MODULE_1__style_scss___default.a.header },
			_ref
		);
	};

	return Header;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "uJAj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MDCFoundation; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @template A
 */
var MDCFoundation = function () {
  _createClass(MDCFoundation, null, [{
    key: "cssClasses",

    /** @return enum{cssClasses} */
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports every
      // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
      return {};
    }

    /** @return enum{strings} */

  }, {
    key: "strings",
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
      return {};
    }

    /** @return enum{numbers} */

  }, {
    key: "numbers",
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
      return {};
    }

    /** @return {!Object} */

  }, {
    key: "defaultAdapter",
    get: function get() {
      // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
      // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
      // validation.
      return {};
    }

    /**
     * @param {A=} adapter
     */

  }]);

  function MDCFoundation() {
    var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MDCFoundation);

    /** @protected {!A} */
    this.adapter_ = adapter;
  }

  MDCFoundation.prototype.init = function init() {
    // Subclasses should override this method to perform initialization routines (registering events, etc.)
  };

  MDCFoundation.prototype.destroy = function destroy() {
    // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
  };

  return MDCFoundation;
}();



/***/ }),

/***/ "vkNc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MDCRipple; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__material_base_component__ = __webpack_require__("EQDb");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__adapter__ = __webpack_require__("FHEU");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation__ = __webpack_require__("SIOS");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__("joOv");
/* unused harmony reexport MDCRippleFoundation */
/* unused harmony reexport util */
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */









/**
 * @extends MDCComponent<!MDCRippleFoundation>
 */
var MDCRipple = function (_MDCComponent) {
  _inherits(MDCRipple, _MDCComponent);

  /** @param {...?} args */
  function MDCRipple() {
    _classCallCheck(this, MDCRipple);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /** @type {boolean} */
    var _this = _possibleConstructorReturn(this, _MDCComponent.call.apply(_MDCComponent, [this].concat(args)));

    _this.disabled = false;

    /** @private {boolean} */
    _this.unbounded_;
    return _this;
  }

  /**
   * @param {!Element} root
   * @param {{isUnbounded: (boolean|undefined)}=} options
   * @return {!MDCRipple}
   */


  MDCRipple.attachTo = function attachTo(root) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$isUnbounded = _ref.isUnbounded,
        isUnbounded = _ref$isUnbounded === undefined ? undefined : _ref$isUnbounded;

    var ripple = new MDCRipple(root);
    // Only override unbounded behavior if option is explicitly specified
    if (isUnbounded !== undefined) {
      ripple.unbounded = /** @type {boolean} */isUnbounded;
    }
    return ripple;
  };

  /**
   * @param {!RippleCapableSurface} instance
   * @return {!MDCRippleAdapter}
   */


  MDCRipple.createAdapter = function createAdapter(instance) {
    var MATCHES = __WEBPACK_IMPORTED_MODULE_3__util__["a" /* getMatchesProperty */](HTMLElement.prototype);

    return {
      browserSupportsCssVars: function browserSupportsCssVars() {
        return __WEBPACK_IMPORTED_MODULE_3__util__["b" /* supportsCssVariables */](window);
      },
      isUnbounded: function isUnbounded() {
        return instance.unbounded;
      },
      isSurfaceActive: function isSurfaceActive() {
        return instance.root_[MATCHES](':active');
      },
      isSurfaceDisabled: function isSurfaceDisabled() {
        return instance.disabled;
      },
      addClass: function addClass(className) {
        return instance.root_.classList.add(className);
      },
      removeClass: function removeClass(className) {
        return instance.root_.classList.remove(className);
      },
      registerInteractionHandler: function registerInteractionHandler(evtType, handler) {
        return instance.root_.addEventListener(evtType, handler, __WEBPACK_IMPORTED_MODULE_3__util__["c" /* applyPassive */]());
      },
      deregisterInteractionHandler: function deregisterInteractionHandler(evtType, handler) {
        return instance.root_.removeEventListener(evtType, handler, __WEBPACK_IMPORTED_MODULE_3__util__["c" /* applyPassive */]());
      },
      registerResizeHandler: function registerResizeHandler(handler) {
        return window.addEventListener('resize', handler);
      },
      deregisterResizeHandler: function deregisterResizeHandler(handler) {
        return window.removeEventListener('resize', handler);
      },
      updateCssVariable: function updateCssVariable(varName, value) {
        return instance.root_.style.setProperty(varName, value);
      },
      computeBoundingRect: function computeBoundingRect() {
        return instance.root_.getBoundingClientRect();
      },
      getWindowPageOffset: function getWindowPageOffset() {
        return { x: window.pageXOffset, y: window.pageYOffset };
      }
    };
  };

  /** @return {boolean} */


  MDCRipple.prototype.activate = function activate() {
    this.foundation_.activate();
  };

  MDCRipple.prototype.deactivate = function deactivate() {
    this.foundation_.deactivate();
  };

  MDCRipple.prototype.layout = function layout() {
    this.foundation_.layout();
  };

  /** @return {!MDCRippleFoundation} */


  MDCRipple.prototype.getDefaultFoundation = function getDefaultFoundation() {
    return new __WEBPACK_IMPORTED_MODULE_2__foundation__["a" /* default */](MDCRipple.createAdapter(this));
  };

  MDCRipple.prototype.initialSyncWithDOM = function initialSyncWithDOM() {
    this.unbounded = 'mdcRippleIsUnbounded' in this.root_.dataset;
  };

  _createClass(MDCRipple, [{
    key: 'unbounded',
    get: function get() {
      return this.unbounded_;
    }

    /** @param {boolean} unbounded */
    ,
    set: function set(unbounded) {
      var UNBOUNDED = __WEBPACK_IMPORTED_MODULE_2__foundation__["a" /* default */].cssClasses.UNBOUNDED;

      this.unbounded_ = Boolean(unbounded);
      if (this.unbounded_) {
        this.root_.classList.add(UNBOUNDED);
      } else {
        this.root_.classList.remove(UNBOUNDED);
      }
    }
  }]);

  return MDCRipple;
}(__WEBPACK_IMPORTED_MODULE_0__material_base_component__["a" /* default */]);

/**
 * See Material Design spec for more details on when to use ripples.
 * https://material.io/guidelines/motion/choreography.html#choreography-creation
 * @record
 */

var RippleCapableSurface = function RippleCapableSurface() {
  _classCallCheck(this, RippleCapableSurface);
};

/** @protected {!Element} */


RippleCapableSurface.prototype.root_;

/**
 * Whether or not the ripple bleeds out of the bounds of the element.
 * @type {boolean|undefined}
 */
RippleCapableSurface.prototype.unbounded;

/**
 * Whether or not the ripple is attached to a disabled component.
 * @type {boolean|undefined}
 */
RippleCapableSurface.prototype.disabled;

/***/ }),

/***/ "yY49":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map