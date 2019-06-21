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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("class DOMNodeCollection{\n  \n  constructor(elArray){\n    this.elArray = elArray;\n  }\n\n  html(string){\n    if (string===undefined){\n      return this.elArray[0].innerHTML;\n    } else {\n      this.elArray.forEach( (el) => {\n        el.innerHTML = string;\n      });\n    }\n  }\n\n  empty(){\n    this.html('');\n  }\n\n  append(arg){\n    if (arg instanceof DOMNodeCollection){\n        this.elArray.forEach((innerEl) => {\n          arg.elArray.forEach((outerEl) => {\n            innerEl.innerHTML += (' ' + outerEl.outerHTML);\n          });\n        });\n    }\n    \n    if (arg instanceof HTMLElement){\n      this.elArray.forEach((el) => {\n        el.innerHTML += ' ' + arg.outerHTML;\n      });\n    }\n    \n    if (typeof arg === 'string'){\n      this.elArray.forEach((el) => {\n        el.innerHTML += ' ' + arg;\n      });\n    }\n  }\n\n  attr(prop, value){\n    //setAttribute\n    //getAttribute\n\n    if (value === undefined){\n      return this.elArray[0].getAttribute(prop);\n    } else {\n      this.elArray.forEach( (el) => {\n        el.setAttribute(prop, value);\n      });\n    }\n\n  }\n\n  addClass(...classNames){\n    classNames.forEach((name) => {\n      this._addClass(name);\n    });\n  }\n  \n\n  _addClass(className){\n    this.elArray.forEach((el) => {\n      let currentClass = [el.className] || false;\n      currentClass.push(className);\n      el.className = currentClass.join(\" \");\n    });\n  }\n\n  removeClass(...classNames){\n    classNames.forEach( (name) => {\n      this._removeClass(name);\n    });\n  }\n\n  _removeClass(className){\n    this.elArray.forEach((el) => {\n      let resultArr = [];\n      let currentClass = el.className.split(\" \");\n      currentClass.forEach((name) => {\n        if (name !== className){\n          resultArr.push(name);\n        }\n      });\n      el.className = resultArr.join(\" \");\n    });\n  }\n\n  children(){\n    let result = [];\n    this.elArray.forEach((node) => {\n\n      let queue = [node];\n      while (queue.length > 0){\n        let parent = queue.shift();\n        result = result.concat(parent);\n        let childArr = Array.from(parent.children);\n        queue = queue.concat(childArr);\n      }\n    });\n    return new DOMNodeCollection(result.slice(1));\n  }\n\n}\n\nmodule.exports = DOMNodeCollection;\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection */ \"./src/dom_node_collection.js\");\n\nwindow.$l = function(arg){\n  let nodeList = [];\n  if (typeof arg === \"string\"){\n    const list = document.querySelectorAll(arg);\n    nodeList = Array.from(list);\n  } else if (arg instanceof HTMLElement){\n    nodeList = [arg];\n  } \n  // const collection = new DOMNodeCollection(nodeList);\n  console.log(nodeList);\n  return new DOMNodeCollection(nodeList);\n};\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });