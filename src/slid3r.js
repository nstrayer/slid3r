const d3 = require("d3");
import selectAppend from "./selectAppend";
import findClosestTickColor from "./findClosestTickColor";

import {
  roundEndsStyle,
  trackStyle,
  trackInsetStyle,
  trackOverlayStyle,
  handleStyle
} from "./styles.js";

// Calculates the beta function between alpha and beta
/**
 * @return {object} - A slider object
 */
function slid3r() {
  // Defaults
  let sliderRange = [0, 10],
    sliderWidth = 250,
    onDone = x => console.log("done dragging", x),
    onDrag = x => null,
    label = "choose value",
    startPos = 0,
    xPos = 0.5,
    yPos = 0.5,
    intClamp = true, // clamp handle to nearest int?
    numTicks = 10,
    customTicks = null,
    font = "optima",
    handleColor = "white",
    vertical = false,
    transitionLength = 10;

  // Calculates the beta function between alpha and beta
  /**
     * @param {object} sel - A selection from d3
     * @return {object} - A slider
     */
  function drawSlider(sel) {
    const trans = d3.transition("sliderTrans").duration(transitionLength);

    const xScale = d3
      .scaleLinear()
      .domain(sliderRange)
      .range([0, sliderWidth])
      .clamp(true);

    const getValue = eventX => xScale.invert(eventX);

    // tick logic.
    const tickFormat = xScale.tickFormat(5, intClamp ? ",.0f" : "f");
    const tickPositions = xScale.ticks(numTicks).map(tickFormat);

    // use user custom ticks info if provided, otherwise generate with d3.
    // check if custom ticks are just an array or are the more complex object version
    const customTickSimple = customTicks && typeof customTicks[0] !== "object";
    const customColors = customTicks && customTicks[0].color;

    const tickData = !customTicks
      ? tickPositions.map(label => ({ label, pos: label, color: handleColor }))
      : customTickSimple
        ? customTicks.map(d => ({ label: d, pos: d, color: handleColor }))
        : customTicks.map(d => Object.assign({ color: handleColor }, d));

    const slider = sel.attr("transform", `translate(${xPos}, ${yPos})`);

    if (vertical) {
      slider.attr("transform", `rotate(90)`);
    }

    const track = selectAppend(slider, "line", ".track")
      .attr("x1", xScale.range()[0])
      .attr("x2", xScale.range()[1]);

    const trackInset = selectAppend(slider, "line", ".track-inset")
      .attr("x1", xScale.range()[0])
      .attr("x2", xScale.range()[1]);

    const trackOverlay = selectAppend(slider, "line", ".track-overlay")
      .attr("x1", xScale.range()[0])
      .attr("x2", xScale.range()[1]);

    trackOverlay.call(
      d3
        .drag()
        .on("start.interrupt", function() {
          slider.interrupt();
        })
        .on("start drag", dragBehavior)
        .on("end", finishBehavior)
    );

    const handle = selectAppend(slider, "circle", ".handle")
      .style("pointer-events", "none")
      .attr("class", "handle")
      .attr("r", 8)
      .attr(
        "fill",
        customColors ? findClosestTickColor(tickData, startPos) : handleColor
      )
      .attr("cx", xScale(startPos));

    selectAppend(slider, "g", ".ticks")
      .style("font", `10px ${font}`)
      .attr("transform", "translate(0," + 18 + ")")
      .selectAll("text")
      .data(tickData)
      .enter()
      .append("text")
      .attr("x", d => xScale(d.pos))
      .attr("text-anchor", "middle")
      .text(d => d.label);

    // write the label
    selectAppend(slider, "text", ".label")
      .attr("y", -14)
      .attr("font-family", font)
      .text(label);

    // apply styles to everything.
    roundEndsStyle(track);
    trackStyle(track);
    handleStyle(handle);
    roundEndsStyle(trackOverlay);
    trackOverlayStyle(trackOverlay);
    roundEndsStyle(trackInset);
    trackInsetStyle(trackInset);

    // setup callbacks
    // Calculates the beta function between alpha and beta
    /**
 * @return {object} - A slider
 */
    function dragBehavior() {
      const scaledPos = getValue(d3.event.x);
      // by inverting and reverting the position we assert bounds on the slider.
      handle.attr("cx", xScale(scaledPos));
      onDrag ? onDrag(scaledPos) : null;
    }

    // Calculates the beta function between alpha and beta
    /**
 * @return {object} - A slider
 */
    function finishBehavior() {
      const dragPos = getValue(d3.event.x);
      const finalPos = intClamp ? Math.round(dragPos) : dragPos;
      const closestTickColor = findClosestTickColor(tickData, finalPos);
      handle
        .transition(trans)
        .attr("cx", xScale(finalPos))
        .attr("fill", closestTickColor);
      onDone(finalPos);
    }
  } // end drawSlider()

  // Getter and setters for changing settings.

  drawSlider.range = function(range) {
    if (!arguments.length) return sliderRange;
    sliderRange = range;
    return drawSlider;
  };

  drawSlider.width = function(width) {
    if (!arguments.length) return sliderWidth;
    sliderWidth = width;
    return drawSlider;
  };

  drawSlider.onDone = function(doneFunc) {
    if (!arguments.length) return onDone;
    onDone = doneFunc;
    return drawSlider;
  };

  drawSlider.onDrag = function(dragFunc) {
    if (!arguments.length) return onDrag;
    onDrag = dragFunc;
    return drawSlider;
  };

  drawSlider.label = function(newLabel) {
    if (!arguments.length) return label;
    label = newLabel;
    return drawSlider;
  };

  drawSlider.startPos = function(newStartPos) {
    if (!arguments.length) return startPos;
    startPos = newStartPos;
    return drawSlider;
  };

  drawSlider.loc = function(loc) {
    if (!arguments.length) return [xPos, yPos];
    [xPos, yPos] = loc;
    return drawSlider;
  };

  drawSlider.clamp = function(decision) {
    if (!arguments.length) return intClamp;
    intClamp = decision;
    return drawSlider;
  };

  drawSlider.vertical = function(decision) {
    if (!arguments.length) return vertical;
    vertical = decision;
    return drawSlider;
  };

  drawSlider.numTicks = function(num) {
    if (!arguments.length) return numTicks;
    numTicks = num;
    return drawSlider;
  };

  drawSlider.customTicks = function(tickLabels) {
    if (!arguments.length) return customTicks;
    customTicks = tickLabels;
    return drawSlider;
  };
  
  drawSlider.handleColor = function(color) {
    if (!arguments.length) return handleColor;
    handleColor = color;
    return drawSlider;
  };

  drawSlider.font = function(newFont) {
    if (!arguments.length) return font;
    font = newFont;
    return drawSlider;
  };

  drawSlider.animation = function(speed) {
    if (!arguments.length) return transitionSpeed;
    transitionSpeed = speed ? speed : 0; // allow the user to have passed something like 'false' to this.
    return drawSlider;
  };

  return drawSlider;
}

module.exports = slid3r;
