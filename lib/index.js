/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 853:
/***/ ((module) => {



//Utility functions for ditto-react (Ditto and DittoProvider)

//returns block filtered by parameters provided in filters
var filterBlock = function filterBlock(blockObj, filters) {
  var block = Object.keys(blockObj).filter(function (textId) {
    if (!filters || !filters.tags) return true;
    return filters.tags.every(function (tag) {
      return blockObj[textId].tags && blockObj[textId].tags.includes(tag);
    });
  }).reduce(function (obj, id) {
    obj[id] = blockObj[id].text;
    return obj;
  }, {});
  return block;
};

var filterFrame = function filterFrame(frameObj, filters) {
  if (frameObj.blocks) {
    for (var blockId in frameObj.blocks) {
      frameObj.blocks[blockId] = filterBlock(frameObj.blocks[blockId], filters);
    }
  }
  frameObj.otherText = filterBlock(frameObj.otherText, filters);
  return frameObj;
};

module.exports = {
  filterBlock: filterBlock,
  filterFrame: filterFrame
};

/***/ }),

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

var _require = __webpack_require__(853),
    filterBlock = _require.filterBlock,
    filterFrame = _require.filterFrame;

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

  console.error('[Text not found in Ditto project with ID: [' + textId + ']]');
  return '[Text not found in Ditto project with ID: [' + textId + ']]';
};

var useDitto = function useDitto(frameId, blockId, textId, filters) {
  var copy = (0, _react.useContext)(DittoContext);

  if (!textId && !blockId && !frameId) {
    console.error("No ID(s) provided.");
    return {};
  }
  if (!copy.frames) {
    console.error("Source JSON for DittoProvider does not have frames.");
    return {};
  }

  // textId only
  if (textId) {
    return useDittoSingleText(textId);
  }

  if (blockId && !frameId) {
    console.error("Block ID provided without frame ID.");
    return {};
  }
  // Error: frameId not found in project
  if (!(frameId in copy.frames)) {
    console.error('Frame of ID [' + frameId + '] not found in this Ditto project.');
    return {};
  }

  // frameId only
  if (frameId && !blockId) {
    var frame = copy.frames[frameId];
    return filterFrame(frame, filters);
  }

  //frameId and blockId
  if (frameId && blockId) {
    if (!(blockId in copy.frames[frameId].blocks)) {
      console.error('Block of ID [' + blockId + '] not found in frame of ID [' + frameId + '] in this Ditto project.');
      return {};
    }
    var block = copy.frames[frameId].blocks[blockId];
    return filterBlock(block, filters);
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

  if (!children) {
    if (textId) return useDittoSingleText(textId);
    console.error('Please provide either a textId or children to Ditto component.');
  }
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