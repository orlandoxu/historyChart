require('../../js/lib/jsx')
require('../../js/lib/helper')

import { Slider, createSliderDom } from './SliderLib'

$(() => {
  document.getElementById('sliderDom').appendChild(createSliderDom())

  const slider = new Slider({start: 2000, end: 2020, posStart: 2003, posEnd: 2017})
  slider.reset()

})


// const s = new slider({start: 2000, end: 2020, posStart: 2003, posEnd: 2017})
// s.reset()
