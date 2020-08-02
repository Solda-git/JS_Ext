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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/cart.js":
/*!****************************!*\
  !*** ./src/server/cart.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var logger = __webpack_require__(/*! ./logger */ \"./src/server/logger.js\");\n\nvar moment = __webpack_require__(/*! moment */ \"moment\");\n\nvar add = function add(cart, req) {\n  cart.contents.push(req.body);\n  cart.amount = req.body.price * req.body.quantity + cart.amount;\n  cart.countGoods += +req.body.quantity;\n  logger(moment().format(), req.body.id_product, 'add'); //////\n\n  return JSON.stringify(cart, null, 4);\n};\n\nvar change = function change(cart, req) {\n  var find = cart.contents.find(function (el) {\n    return el.id_product === +req.params.id;\n  });\n  find.quantity += req.body.quantity;\n  cart.amount = find.price * req.body.quantity + cart.amount;\n  cart.countGoods += req.body.quantity;\n  logger(moment().format(), req.body.id_product, 'change');\n  return JSON.stringify(cart, null, 4);\n};\n\nvar del = function del(cart, req) {\n  console.log(\"Looking for: \".concat(req.body.id_product, \"!\"));\n  var findIndex = cart.contents.findIndex(function (el, index) {\n    if (el.id_product === req.body.id_product) {\n      return el;\n    } else {\n      return false;\n    }\n  });\n  cart.contents.splice(findIndex, 1);\n  cart.amount = cart.amount - req.body.price * req.body.quantity;\n  cart.countGoods -= req.body.quantity;\n  logger(moment().format(), req.body.id_product, 'delete'); ////////\n\n  return JSON.stringify(cart, null, 4);\n};\n\nmodule.exports = {\n  add: add,\n  change: change,\n  del: del\n};\n\n//# sourceURL=webpack:///./src/server/cart.js?");

/***/ }),

/***/ "./src/server/cartRouter.js":
/*!**********************************!*\
  !*** ./src/server/cartRouter.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar handler = __webpack_require__(/*! ./handler */ \"./src/server/handler.js\");\n\nvar router = express.Router();\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar cartJSONPath = path.resolve(__dirname, 'db/userCart.json');\nrouter.get('/', function (req, res) {\n  console.log(\"Get. cartJSONPath:\".concat(cartJSONPath));\n  fs.readFile(cartJSONPath, 'utf-8', function (err, data) {\n    if (err) {\n      res.sendStatus(404, JSON.stringify({\n        result: 0,\n        text: err\n      }));\n    } else {\n      res.send(data);\n    }\n  });\n});\nrouter.post('/', function (req, res) {\n  handler(req, res, 'add', cartJSONPath);\n}); // localhost:5555/api/cart/123 // req.params.id\n// localhost:5555/api/cart/?var1='sfsf'&var2='ada' // req.query\n\nrouter.put('/:id', function (req, res) {\n  handler(req, res, 'change', cartJSONPath);\n});\nrouter[\"delete\"]('/', function (req, res) {\n  handler(req, res, 'del', cartJSONPath);\n});\nmodule.exports = router;\n\n//# sourceURL=webpack:///./src/server/cartRouter.js?");

/***/ }),

/***/ "./src/server/handler.js":
/*!*******************************!*\
  !*** ./src/server/handler.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar cart = __webpack_require__(/*! ./cart */ \"./src/server/cart.js\");\n\nvar actions = {\n  add: cart.add,\n  change: cart.change,\n  del: cart.del\n};\n\nvar handler = function handler(req, res, action, file) {\n  fs.readFile(file, 'utf-8', function (err, data) {\n    if (err) {\n      res.sendStatus(404, JSON.stringify({\n        result: 0,\n        text: err\n      }));\n    } else {\n      var newCart = actions[action](JSON.parse(data), req);\n      fs.writeFile(file, newCart, function (err) {\n        if (err) {\n          res.send('{\"result\": 0}');\n        } else {\n          res.send('{\"result\": 1}');\n        }\n      });\n    }\n  });\n};\n\nmodule.exports = handler;\n\n//# sourceURL=webpack:///./src/server/handler.js?");

/***/ }),

/***/ "./src/server/logger.js":
/*!******************************!*\
  !*** ./src/server/logger.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar logPath = path.resolve(__dirname, 'log/log.json');\n\nvar logger = function logger(timestamp, productId, action) {\n  console.log(\"logger works.\");\n  fs.readFile(logPath, 'utf-8', function (err, data) {\n    if (err) {\n      fs.writeFile(logPath, '[]', function (err) {\n        if (err) {\n          console.log(\"Error logging at: \".concat(timestamp, \".\"));\n        } else {\n          console.log('Log file created.');\n        }\n      });\n    } else {\n      console.log('no error');\n      var logJson = JSON.parse(data);\n      logJson.push({\n        \"timestamp\": timestamp,\n        \"productId\": productId,\n        \"action\": action\n      });\n      fs.writeFile(logPath, JSON.stringify(logJson, null, 4), function (err) {\n        if (err) {\n          console.log(\"Can't insert record in log file.\");\n          return 0;\n        } else {\n          console.log(\"Action logged successfully.\");\n          return 1;\n        }\n      });\n    }\n  });\n};\n\nmodule.exports = logger;\n\n//# sourceURL=webpack:///./src/server/logger.js?");

/***/ }),

/***/ "./src/server/server.js":
/*!******************************!*\
  !*** ./src/server/server.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar cartRouter = __webpack_require__(/*! ./cartRouter */ \"./src/server/cartRouter.js\");\n\nvar app = express();\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\napp.use(express.json());\napp.use('/', express[\"static\"](path.resolve(__dirname, '../public')));\napp.use('/api/cart', cartRouter); // /api/cart/../.../..\n\nvar catalogJSONPath = path.resolve(__dirname, 'db/products.JSON');\nconsole.log(__dirname);\nconsole.log(catalogJSONPath);\napp.get('/api/products', function (req, res) {\n  fs.readFile(catalogJSONPath, 'utf-8', function (err, data) {\n    if (err) {\n      res.send(JSON.stringify({\n        result: 0,\n        text: err\n      })); // res.sendStatus(404, JSON.stringify({result: 0, text: err}));\n    } else {\n      res.send(data);\n    }\n  });\n}); ///////страница продукта!////////\n\napp.get('/api/product/:id', function (req, res) {\n  fs.readFile(catalogJSONPath, 'utf-8', function (err, data) {\n    if (err) {\n      res.send(JSON.stringify({\n        result: 0,\n        text: err\n      })); // res.sendStatus(404, JSON.stringify({result: 0, text: err}));\n    } else {\n      console.log(\"id_product: \".concat(req.params.id));\n      console.log(\"typeof data: \".concat(_typeof(data)));\n      var cart = JSON.parse(data);\n      var find = cart.find(function (el) {\n        return el.id_product === +req.params.id;\n      });\n      res.send(JSON.stringify(find));\n    }\n  });\n}); /////////////////////////////////\n\nvar port = process.env.PORT || 5555;\napp.listen(port, function () {\n  console.log(\"Listening \".concat(port, \" port\"));\n}); // app.get(); // READ\n// app.post(); // CREATE\n// app.put(); // UPDATE\n// app.delete(); // DELETE\n\n//# sourceURL=webpack:///./src/server/server.js?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment\");\n\n//# sourceURL=webpack:///external_%22moment%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });