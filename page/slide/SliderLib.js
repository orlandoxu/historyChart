class Slider {
  constructor(props) {
    this.start = props.start
    this.end = props.end
    this.posStart = props.posStart || props.start
    this.posEnd = props.posEnd || props.end
    const $slider = $('#slider')
    this.$left = $('#left')
    this.$right = $('#right')
    const {$left, $right} = this
    $left.css('cursor', 'ew-resize')
    $right.css('cursor', 'ew-resize')

    $slider.onmousedown((e) => {
      if (e.target === document.querySelector('#left')) {
        $slider.flag = 'left'
      } else if (e.target === document.querySelector('#right')) {
        $slider.flag = 'right'
      }
    })

    $slider.onmousemove((e) => {
      if ($slider.flag == 'left') {
        const posNext = $left.pos + e.movementX
        if (posNext >= 0 && posNext < (this.width - $right.pos)) {
          $left.pos = posNext
          this.redraw({left: $left.pos })
        }
      }

      if ($slider.flag == 'right') {
        const posNext = $right.pos - e.movementX
        if ((this.width - posNext) > $left.pos && (this.width - posNext) <= this.width) {
          $right.pos = posNext
          this.redraw({right: $right.pos })
        }
      }
    })

    const stop = () => {
      $slider.flag = false
    }

    $slider.onmouseup(stop)
    $slider.onmouseleave(stop)
  }

  reset() {
    this.width = document.querySelector('#slider').clientWidth
    const {$left, $right, start, end, posStart, posEnd} = this
    $left.pos = this.posStartLeft = (posStart - start) / (end - start) * this.width
    $right.pos = this.posEndRight = (end - posEnd) / (end - start) * this.width
    this.redraw({left: this.posStartLeft, right: this.posEndRight})
  }

  redraw({left, right}) {
    $('#left').css('left', left)
    $('#right').css('right', right)
    $('#progress').css('left', left + 4).css('right', right)
  }
}

function createSliderDom() {
  return <div id='slider' class='relative w-full h-8 bg-pink-200'>
    <div id='left' class='w-1 h-full bg-pink-500 absolute top-0 bottom-0'></div>
    <div id='progress' class='bg-pink-400 absolute top-0 bottom-0'></div>
    <div id='right' class='w-1 h-full bg-pink-500 absolute top-0 bottom-0'></div>
  </div>
}

export { Slider, createSliderDom }
