slid3r =
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


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _styles = __webpack_require__(1);

// The function onDrag gets constantly fed slider position
// onDone gets it only after the user has stopped sliding.
function slid3r() {

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

      var track = slider.append("line").attr("class", "track").attr('x1', xScale.range()[0]).attr('x2', xScale.range()[1]);

      var trackInset = track.select(function () {
        return this.parentNode.appendChild(this.cloneNode(true));
      }).attr("class", "track-inset");

      var trackOverlay = trackInset.select(function () {
        return this.parentNode.appendChild(this.cloneNode(true));
      }).attr("class", "track-overlay");

      trackOverlay.call(d3.drag().on("start.interrupt", function () {
        slider.interrupt();
      }).on("start drag", dragBehavior).on("end", finishBehavior));

      slider.insert("g", ".track-overlay").attr("class", "ticks").style('font', '10px ' + font).attr("transform", "translate(0," + 18 + ")").selectAll("text").data(xScale.ticks(10)).enter().append("text").attr("x", xScale).attr("text-anchor", "middle").text(function (d) {
        return d;
      });

      var handle = slider.insert("circle", ".track-overlay").attr("class", "handle").attr("r", 9).attr("cx", xScale(startPos));

      // write the label
      slider.append('text').attr('y', -14).attr('font-family', font).text(label);

      // apply styles to everything.
      (0, _styles.roundEndsStyle)(track);
      (0, _styles.trackStyle)(track);
      (0, _styles.handleStyle)(handle);
      (0, _styles.roundEndsStyle)(trackOverlay);
      (0, _styles.trackOverlayStyle)(trackOverlay);
      (0, _styles.roundEndsStyle)(trackInset);
      (0, _styles.trackInsetStyle)(trackInset);

      // setup callbacks
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

module.exports = slid3r;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// styles for the d3 slider

// styles
var roundEndsStyle = exports.roundEndsStyle = function roundEndsStyle(selection) {
  return selection.style('stroke-linecap', 'round');
};

var trackStyle = exports.trackStyle = function trackStyle(selection) {
  return selection.style('stroke', '#000').style('stroke-opacity', '0.3').style('strokeWidth', '10px');
};

var trackInsetStyle = exports.trackInsetStyle = function trackInsetStyle(selection) {
  return selection.style('stroke', '#ddd').style('stroke-width', 8);
};

var trackOverlayStyle = exports.trackOverlayStyle = function trackOverlayStyle(selection) {
  return selection.style('pointer-events', 'stroke').style('stroke-width', 50).style('stroke', 'transparent').style('cursor', 'crosshair');
};

var handleStyle = exports.handleStyle = function handleStyle(selection) {
  return selection.style('fill', '#fff').style('stroke', '#000').style('stroke-opacity', 0.5).style('strokeWidth', '1.25px');
};

/***/ })
/******/ ]);