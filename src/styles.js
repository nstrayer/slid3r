// styles for the d3 slider

// styles
export const roundEndsStyle = (selection) => selection.style('stroke-linecap', 'round');
  
export const trackStyle = (selection) => selection
  .style('stroke', '#000')
  .style('stroke-opacity', '0.3')
  .style('strokeWidth', '10px');

export const trackInsetStyle = (selection) => selection
  .style('stroke', '#ddd')
  .style('stroke-width', 8);

export const trackOverlayStyle = (selection) => selection
  .style('pointer-events', 'stroke')
  .style('stroke-width', 50)
  .style('stroke', 'transparent')
  .style('cursor', 'crosshair');
  
export const handleStyle = (selection) => selection
  .style('fill', '#fff')
  .style('stroke', '#000')
  .style('stroke-opacity', 0.5)
  .style('strokeWidth', '1.25px');
