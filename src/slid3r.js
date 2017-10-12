const d3 = require('d3');

import {roundEndsStyle, trackStyle, trackInsetStyle, trackOverlayStyle, handleStyle} from './styles.js';

// The function onDrag gets constantly fed slider position
// onDone gets it only after the user has stopped sliding.
function slid3r() {
  
  // Defaults
  let sliderRange = [0,10],
      sliderWidth = 250,
      onDone = (x) => console.log('done dragging', x),
      onDrag = (x) => null,
      label = 'choose value',
      startPos = 0,
      xPos = 0.5,
      yPos = 0.5,
      intClamp = true, // clamp handle to nearest int?
      numTicks = 10,
      font = 'optima',
      vertical = false,
      transitionLength = 10;
 
  function drawSlider(sel) {
    // console.log('drawing slider')
    if(vertical) console.log('rotating the slider');

    // console.log(selection)
    const trans = d3.transition('sliderTrans').duration(transitionLength);
  
    const xScale = d3.scaleLinear()
      .domain(sliderRange)
      .range([0, sliderWidth])
      .clamp(true);
    
    const getValue = (eventX) => xScale.invert(eventX);
    
    const slider = sel
      .attr("class", "slider")
      .attr("transform", `translate(${xPos}, ${yPos})`);
    
    if(vertical){
      slider.attr("transform", `rotate(90)`);
    }
    
    const track = slider.selectAppend("line.track")
      .attr('x1',xScale.range()[0])
      .attr('x2', xScale.range()[1]);

    const trackInset = slider.selectAppend('line.track-inset')
      .attr('x1',xScale.range()[0])
      .attr('x2', xScale.range()[1]);

    const trackOverlay = slider.selectAppend('line.track-overlay')
      .attr('x1',xScale.range()[0])
      .attr('x2', xScale.range()[1]);
    
    trackOverlay
        .call(
          d3.drag()
            .on("start.interrupt", function() { slider.interrupt(); })
            .on("start drag", dragBehavior)
            .on("end", finishBehavior)
        )
    
    const tickFormat = xScale.tickFormat(5, intClamp ? ",.0f": 'f');

    slider.selectAppend("g.ticks")
        // .attr("class", "ticks")
        .style('font', `10px ${font}`)
        .attr("transform", "translate(0," + 18 + ")")
      .selectAll("text")
      .data(xScale.ticks(numTicks).map(tickFormat))
      .enter().append("text.scaleTicks")
        .attr("x", xScale)
        .attr("text-anchor", "middle")
        .text(d => d);
    
    const handle = slider.selectAppend("circle.handle")
        .attr("class", "handle")
        .attr("r", 9)
        .attr("cx", xScale(startPos));         

    // write the label
    slider.selectAppend('text.label')
      .attr('y', -14)
      .attr('font-family', font)
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
    function dragBehavior(){
      const scaledPos = getValue(d3.event.x);
      // by inverting and reverting the position we assert bounds on the slider.
      handle.attr("cx", xScale(scaledPos))
      onDrag? onDrag(scaledPos): null;
    }
    
    function finishBehavior(){
      const dragPos = getValue(d3.event.x);
      const finalPos = intClamp ? Math.round(dragPos): dragPos;
      handle
        .transition(trans)
        .attr("cx", xScale(finalPos))
      onDone(finalPos);
    }
  } // end drawSlider()
  
  // Getter and setters for changing settings.
  
  drawSlider.range = function(range){
    if(!arguments.length) return sliderRange;
    sliderRange = range;
    return drawSlider;
  }
  
  drawSlider.width = function(width){
    if(!arguments.length) return sliderWidth;
    sliderWidth = width;
    return drawSlider;
  }
  
  drawSlider.onDone = function(doneFunc){
    if(!arguments.length) return onDone;
    onDone = doneFunc;
    return drawSlider;
  }
  
  drawSlider.onDrag = function(dragFunc){
    if(!arguments.length) return onDrag;
    onDrag = dragFunc;
    return drawSlider;
  }
  
  drawSlider.label = function(newLabel){
    if(!arguments.length) return label;
    label = newLabel;
    return drawSlider;
  }
  
  drawSlider.startPos = function(newStartPos){
    if(!arguments.length) return startPos;
    startPos = newStartPos;
    return drawSlider
  }
  
  drawSlider.loc = function(loc){
    if(!arguments.length) return [xPos, yPos];
    [xPos, yPos] = loc;
    return drawSlider;
  }
  
  drawSlider.clamp = function(decision){
    if(!arguments.length) return intClamp;
    intClamp = decision;
    return drawSlider;
  }

  drawSlider.vertical = function(decision){
    if(!arguments.length) return vertical;
    vertical = decision;
    return drawSlider;
  }

  drawSlider.numTicks = function(num){
    if(!arguments.length) return numTicks;
    numTicks = num;
    return drawSlider;
  }
  
  drawSlider.font = function(newFont){
    if(!arguments.length) return font;
    font = newFont;
    return drawSlider;
  }
  
  drawSlider.animation = function(speed){
    if(!arguments.length) return transitionSpeed;
    transitionSpeed = speed ? speed: 0; // allow the user to have passed something like 'false' to this.
    return drawSlider;
  }
  
  return drawSlider;

}

module.exports = slid3r;