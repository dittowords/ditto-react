/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 297:
/***/ ((module) => {

module.exports = require("react");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Ditto = exports.DittoContext = undefined;

var _react = __webpack_require__(297);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DittoContext = exports.DittoContext = (0, _react.createContext)({});

var useDittoSingleText = function useDittoSingleText(textId) {
  var copy = (0, _react.useContext)(DittoContext);

  for (var frameId in copy.frames) {
    // Look in Blocks
    for (var blockId in copy.frames[frameId].blocks) {
      if (textId in copy.frames[frameId].blocks[blockId]) {
        return copy.frames[frameId].blocks[blockId][textId].text;
      }
    }
    // Look in otherText
    if (copy.frames[frameId].otherText && textId in copy.frames[frameId].otherText) {
      return copy.frames[frameId].otherText[textId].text;
    }
  }
  return "[Text not found in this Ditto project for the provided ID]";
};

var useDitto = function useDitto(frameId, blockId, textId, filters) {
  var copy = (0, _react.useContext)(DittoContext);

  // textId only
  if (textId) {
    return useDittoSingleText(textId);
  }

  // frameId only
  if (frameId && !blockId) {
    var frame = copy.frames[frameId];
    return frame;
  }
  if (frameId && blockId) {
    var raw_block = copy.frames[frameId].blocks[blockId];
    var block = Object.keys(raw_block).filter(function (textId) {
      if (!filters) return true;
      //filter so only text items that have all of the tags in filters
      return filters.tags.every(function (tag) {
        return raw_block[textId].tags && raw_block[textId].tags.includes(tag);
      });
    }).reduce(function (obj, id) {
      obj[id] = raw_block[id].text;
      return obj;
    }, {});

    return block;
  }

  return {};
};

var Ditto = exports.Ditto = function Ditto(_ref) {
  var _ref$children = _ref.children,
      children = _ref$children === undefined ? null : _ref$children,
      _ref$frameId = _ref.frameId,
      frameId = _ref$frameId === undefined ? null : _ref$frameId,
      _ref$blockId = _ref.blockId,
      blockId = _ref$blockId === undefined ? null : _ref$blockId,
      _ref$textId = _ref.textId,
      textId = _ref$textId === undefined ? null : _ref$textId,
      _ref$filters = _ref.filters,
      filters = _ref$filters === undefined ? null : _ref$filters;

  if (!children && textId) return useDitto(frameId, blockId, textId, filters);
  return children(useDitto(frameId, blockId, textId, filters));
};

var DittoProvider = function DittoProvider(_ref2) {
  var children = _ref2.children,
      source = _ref2.source;

  return _react2.default.createElement(
    DittoContext.Provider,
    { value: source },
    children
  );
};

exports.default = DittoProvider;
})();

module.exports = __webpack_exports__;
/******/ })()
;