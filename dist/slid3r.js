(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["slid3r"] = factory();
	else
		root["slid3r"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.slider = slider;

var _styles = __webpack_require__(1);

// The function onDrag gets constantly fed slider position
// onDone gets it only after the user has stopped sliding.
function slider() {

  // Defaults
  var sliderRange = [0, 10],
      sliderWidth = 250,
      onDone = function onDone(x) {
    return console.log('done dragging', x);
  },
      onDrag = function onDrag(x) {
    return null;
  },
      label = 'choose value',
      startPos = 0,
      xPos = 0.5,
      yPos = 0.5,
      intClamp = true,
      // clamp handle to nearest int?
  font = 'optima',
      transitionLength = 200;

  function drawSlider(selection) {

    var trans = d3.transition('sliderTrans').duration(transitionLength);

    selection.each(function (d, i) {
      var sel = d3.select(this);

      var xScale = d3.scaleLinear().domain(sliderRange).range([0, sliderWidth]).clamp(true);

      var getValue = function getValue(eventX) {
        return xScale.invert(eventX);
      };

      var slider = sel.attr("class", "slider").attr("transform", 'translate( ' + xPos + ', ' + yPos + ')');

      slider.append("line").attr("class", "track").st(Object.assign({}, _styles.roundEnds, _styles.track)).at({ x1: xScale.range()[0], x2: xScale.range()[1] }).select(function () {
        return this.parentNode.appendChild(this.cloneNode(true));
      }).attr("class", "track-inset").st(Object.assign({}, _styles.roundEnds, _styles.trackInset)).select(function () {
        return this.parentNode.appendChild(this.cloneNode(true));
      }).attr("class", "track-overlay").st(Object.assign({}, _styles.roundEnds, _styles.trackOverlay)).call(d3.drag().on("start.interrupt", function () {
        slider.interrupt();
      }).on("start drag", dragBehavior).on("end", finishBehavior));

      slider.insert("g", ".track-overlay").attr("class", "ticks").style('font', '10px ' + font).attr("transform", "translate(0," + 18 + ")").selectAll("text").data(xScale.ticks(10)).enter().append("text").attr("x", xScale).attr("text-anchor", "middle").text(function (d) {
        return d;
      });

      var handle = slider.insert("circle", ".track-overlay").attr("class", "handle").st(_styles.handleStyle).attr("r", 9).attr("cx", xScale(startPos));

      // write the label
      slider.append('text').at({
        y: -14,
        fontFamily: font
      }).text(label);

      function dragBehavior() {
        var scaledPos = getValue(d3.event.x);
        // by inverting and reverting the position we assert bounds on the slider.
        handle.attr("cx", xScale(scaledPos));
        onDrag ? onDrag(scaledPos) : null;
      }

      function finishBehavior() {
        var dragPos = getValue(d3.event.x);
        var finalPos = intClamp ? Math.round(dragPos) : dragPos;
        handle.transition(trans).attr("cx", xScale(finalPos));
        onDone(finalPos);
      }
    }); // end foreach loop
  } // end drawSlider()

  // Getter and setters for changing settings.

  drawSlider.range = function (range) {
    if (!arguments.length) return sliderRange;
    console.log('setting slider range to', range);
    sliderRange = range;
    return drawSlider;
  };

  drawSlider.width = function (width) {
    if (!arguments.length) return sliderWidth;
    sliderWidth = width;
    return drawSlider;
  };

  drawSlider.onDone = function (doneFunc) {
    if (!arguments.length) return onDone;
    onDone = doneFunc;
    return drawSlider;
  };

  drawSlider.onDrag = function (dragFunc) {
    if (!arguments.length) return onDrag;
    onDrag = dragFunc;
    return drawSlider;
  };

  drawSlider.label = function (newLabel) {
    if (!arguments.length) return label;
    label = newLabel;
    return drawSlider;
  };

  drawSlider.startPos = function (newStartPos) {
    if (!arguments.length) return startPos;
    startPos = newStartPos;
    return drawSlider;
  };

  drawSlider.loc = function (loc) {
    if (!arguments.length) return [xPos, yPos];

    var _loc = _slicedToArray(loc, 2);

    xPos = _loc[0];
    yPos = _loc[1];

    return drawSlider;
  };

  drawSlider.clamp = function (decision) {
    if (!arguments.length) return intClamp;
    intClamp = decision;
    return drawSlider;
  };

  drawSlider.font = function (newFont) {
    if (!arguments.length) return font;
    font = newFont;
    return drawSlider;
  };

  drawSlider.animation = function (speed) {
    if (!arguments.length) return transitionSpeed;
    transitionSpeed = speed ? speed : 0; // allow the user to have passed something like 'false' to this.
    return drawSlider;
  };

  return drawSlider;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// styles for the d3 slider

// styles
var roundEnds = exports.roundEnds = {
    strokeLinecap: 'round'
};

var track = exports.track = {
    stroke: '#000',
    strokeOpacity: 0.3,
    strokeWidth: '10px'
};

var trackInset = exports.trackInset = {
    stroke: '#ddd',
    strokeWidth: 8
};

var trackOverlay = exports.trackOverlay = {
    pointerEvents: 'stroke',
    strokeWidth: 50,
    stroke: 'transparent',
    cursor: 'crosshair'
};

var handleStyle = exports.handleStyle = {
    fill: '#fff',
    stroke: ' #000',
    strokeOpacity: 0.5,
    strokeWidth: '1.25px'
};

/***/ })
/******/ ]);
});