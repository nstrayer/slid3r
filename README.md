# slid3r
A simple d3 slider that is meant to be placed inside your svg.

## What and Why
`slid3r` is a tiny library that uses d3 to make simple slider inputs. I constantly find myself wanting to implement sliders in
my projects but find that the default html ones are ugly, or if I use some of the better alternatives I have to load JQuery or something
else and bog-down my project. Other [d3-based slider](http://sujeetsr.github.io/d3.slider/) efforts require the slider to be contained in a div, which I find isn't always what I want/need.


A benefit of having the slider implemented straight in the svg is the ability to move it around the visualization programatically using `.attr('transform',...)`.
This is especially useful when you have more complex visualizations with dynamic interfaces.

## In action

[This bl.ock](https://bl.ocks.org/nstrayer/558a63263bd60b3a722c92a2fe338345) demonstrates the minimum viable product for using the library. In addition, [this blogpost](http://livefreeordichotomize.com/2017/08/14/the-exponential-power-series/) I wrote uses it in an intereactive.

## Getting it into your project
The library is bundled to be used in multiple ways. The easiest is just putting it in a script tag in your `html`. When doing this make sure you have d3 being imported somewhere above it. 
```
<script src="d3.v4.js"></script>
<script src="https://rawgit.com/nstrayer/slid3r/master/dist/slid3r.js"></script>
```

You can also grab it from 'npm' and use it in your favorite bundler such as webpack, browserify, or rollup. 

```bash
npm install --save slid3r
```

And then just import it like any other library. Note that it only exports a single function. 

```js
import slid3r from 'slid3r';
// or
const slid3r = require('slid3r');
```

Again, make sure you also have `d3` imported before importing `slid3r`. By requiring `d3` be in the user's namespace already it avoids you having to have an entire extra copy of `d3` imported just for some tiny sliders. 

## Example Use

Currently you get one single function. That function is `slider()`. Attached to this function are a few getter-setter functions as described in Mike Bostock's [Towards Reusable Charts](https://bost.ocks.org/mike/chart/)
article. An example use of the function is as follows:

```js
import slid3r from 'slid3r';

// .... code to setup an svg element on the page using d3....

svg.append('g').call(
      slid3r()
        .width(200)
        .range([0, 10])
        .startPos(3)
        .numTicks(10)
        .label('Super Cool Slider')
        .loc([50, 50])
        .handleColor("orange")
        .onDrag((pos) => d3.select('#sliderValue').text(pos))
        .onDone((pos) => d3.selectAll('#sliderValue,#sliderEndValue').text(pos))
    );

svg.append('g').call(
    slid3r()
    .width(30)
    .range([0, 1])
    .startPos(0)
    .customTicks([{pos: 0, label: 'off', color: 'blue'}, {pos: 1, label: 'on', color: 'red'}])
    .label('A switch')
    .loc([50, 150])
    .onDrag((pos) => d3.select('#sliderValue').text(pos))
    .onDone((pos) => d3.selectAll('#sliderValue,#sliderEndValue').text(pos))
);
```

__Result:__

![](https://photos-2.dropbox.com/t/2/AACb9lGUev7bpFb5AvAX-avlWl5ePBk5TDYoZjo9Q-4l9g/12/466452542/png/32x32/3/1509055200/0/2/Screenshot%202017-10-26%2012.02.27.png/ELaHk-MDGMaCEyAHKAc/m6vp6Mi8cMSKn6SO88JavJJw2WHrtEL4T10XvGimpjM?dl=0&size=1600x1200&size_mode=3)

---

## API

All current options are as follows:

| name      | purpose |     arguments | default |
| --------- | ------- | ------------- | --------|
| .label    | Text for above slider | _string_ | `'choose value'` |
| .range    | Slider's possible values  | _array_ (`[startVal, endVal]`)| `[0,10]` |
| .startPos | Value that the slider starts at | _number_ (in set range) | `0` |
| .numTicks | Number of ticks you desire (may not return exactly this number due to optimization algorithm) | _integer_  | `0` |
| .handleColor | Color of the handle for slider | _string_  | `'white'` |
| .customTicks | Either an array of numerical tick positions or an array of objects containing `pos`: `<pos of tick>`, `label`: `<label for tick>`, `color`: `<color of handle when this is closest tick>` (optional) | _array_  | `d3.scale.ticks(numTicks)` |
| .clamp    | Should slider report position rounded to nearest integer? | _boolean_ | `true` |
| .width    | Width of slider  | _number_ (represents pixels) | `250` |
| .loc      | Where the slider sits on the svg | _array_ (`[leftEdgeX, topEdgeY]`) | `[0,0]` |
| .onDone   | Callback for after slider is dragged | _function_ (takes position on the slider as first argument) | `(x) => console.log('done dragging', x)` |
| .onDrag   | Called continuously as slider is moving| _function_ (that takes position on the slider as first argument) | `(x) => null` |
| .font     | Font family of the number ticks and label | _string_ (valid css font-family) | `'optima'`
| .animation | Should slider animate the clamping to nearest integer? | _number_ (milliseconds for animation) or false (to disable) | `200` |
