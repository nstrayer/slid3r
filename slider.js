import {roundEnds, track, trackInset, trackOverlay, handleStyle} from './styles.js';

// The function onDrag gets constantly fed slider position
// onDone gets it only after the user has stopped sliding.
export function slider() {
  
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
      font = 'optima',
      transitionLength = 200;
 
  
  function drawSlider(selection) {
    
    const trans = d3.transition('sliderTrans').duration(transitionLength);

    selection.each(function(d, i) {
      const sel = d3.select(this);
      
       const xScale = d3.scaleLinear()
        .domain(sliderRange)
        .range([0, sliderWidth])
        .clamp(true);
      
      const getValue = (eventX) => xScale.invert(eventX);
      
      const slider = sel
        .attr("class", "slider")
        .attr("transform", `translate( ${xPos}, ${yPos})`);
      
      slider.append("line")
          .attr("class", "track")
          .st(Object.assign({}, roundEnds, track))
          .at({ x1: xScale.range()[0], x2: xScale.range()[1] })
        .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
          .attr("class", "track-inset")
          .st(Object.assign({},roundEnds, trackInset))
        .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
          .attr("class", "track-overlay")
          .st(Object.assign({}, roundEnds, trackOverlay))
          .call(
            d3.drag()
              .on("start.interrupt", function() { slider.interrupt(); })
              .on("start drag", dragBehavior)
              .on("end", finishBehavior)
          )
          
      slider.insert("g", ".track-overlay")
          .attr("class", "ticks")
          .style('font', `10px ${font}`)
          .attr("transform", "translate(0," + 18 + ")")
        .selectAll("text")
        .data(xScale.ticks(10))
        .enter().append("text")
          .attr("x", xScale)
          .attr("text-anchor", "middle")
          .text(d => d);
      
      const handle = slider.insert("circle", ".track-overlay")
          .attr("class", "handle")
          .st(handleStyle)
          .attr("r", 9)
          .attr("cx", xScale(startPos));
      
      
      // write the label
      slider.append('text')
        .at({
          y: -14,
          fontFamily: font,
        })
        .text(label)
          
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
    }); // end foreach loop
  } // end drawSlider()
  
  // Getter and setters for changing settings.
  
  drawSlider.range = function(range){
    if(!arguments.length) return sliderRange;
    console.log('setting slider range to', range)
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
