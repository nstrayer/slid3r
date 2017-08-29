# slid3r
A simple d3 slider that is meant to be placed inside your svg.

## What and Why
`slid3r` is a tiny little library that uses d3 to make easy to user sliders. I constantly find myself wanting to implement sliders in
my projects but find that the default html ones are ugly, or if I use some of the better alternatives I have to load JQuery or something
else and bog-down my project. Other [d3-based slider](http://sujeetsr.github.io/d3.slider/) efforts require the slider to be contained in a div, which I find isn't always what I want/need.
A benefit of having the controls straight in the svg is the ability to move the slider around the vis programatically using `.attr('transform',...)`.
This is especially useful when you have more complex visualizations with dynamic interfaces.

## API

Currently you get one single function. That function is `slider()`. Attached to this function is a few getter-setter functions as described in Mike Bostock's [Towards Reusable Charts](https://bost.ocks.org/mike/chart/)
article. An example use of the function is as follows:

```js
const mySlider = slider()
    .width(200)
    .range([0,10])
    .startPos(3)
    .label('Super Cool Slider')
    .loc([50, 50])
    .onDone(pos => console.log('slider set to', pos));
  
 svg.append('g').call(mySlider);
```

All current options are as follows:

| name      | purpose |     arguments | default |
| --------- | ------- | ------------- | --------|
| .label    | Text for above slider | _string_ | `'choose value'` |
| .range    | Slider's possible values  | _array_ (`[startVal, endVal]`)| `[0,10]` |
| .startPos | Value that the slider starts at | _number_ (in set range) | `0` |
| .clamp    | Should slider report position rounded to nearest integer? | _boolean_ | `true` |
| .width    | Width of slider  | _number_ (represents pixels) | `250` |
| .loc      | Where the slider sits on the svg | _array_ (`[leftEdgeX, topEdgeY]`) | `[0,0]` |
| .onDone   | Callback for after slider is dragged | _function_ (takes position on the slider as first argument) | `(x) => console.log('done dragging', x)` |
| .onDrag   | Called continuously as slider is moving| _function_ (that takes position on the slider as first argument) | `(x) => null` |
| .font     | Font family of the number ticks and label | _string_ (valid css font-family) | `'optima'`
| .animation | Should slider animate the clamping to nearest integer? | _number_ (milliseconds for animation) or false (to disable) | `200` |
