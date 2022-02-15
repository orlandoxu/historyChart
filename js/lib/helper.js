
function NodeList() {
  this.node = [...arguments].reduce((p, n) => {
    if (typeof n === 'string') return p

    if (n && n.isNodeList && n.isNodeList()) {
      p.push(...n.node)
    } else if (Array.isArray(n)) {
      p.push(...n)
    } else {
      p.push(n)
    }

    return p
  }, [])
}

NodeList.prototype.length = function() {
  return this.node.length
}

NodeList.prototype.remove = function() {
  this.node.forEach(d => {
    d.remove()
  })
}

NodeList.prototype.isNodeList = function () {
  return true
};

['mousedown', 'mouseup', 'mousemove', 'mouseleave'].forEach(d => {
  NodeList.prototype['on' + d] = function (func) {
    this.node.forEach(node1 => {
      node1['on' + d] = func
    })
  }
})


NodeList.prototype.css = function (prop, value) {
  this.node.forEach(d => {
    if (['left', 'right', 'bottom', 'top'].includes(prop) && typeof value === 'number') value = value + 'px'
    d.style[prop] = value
  })
  return this
}

NodeList.prototype.children = function () {
  return NodeList(this.node.reduce((p, n) => {
    [...arguments].forEach(d => {
      p.push(...n.querySelectorAll(d))
    })
    return p
  }, []))
}

window.$ = function () {
  // 将所有native的selector结果，包装成NodeList
  const params = [...arguments].reduce((p, n) => {
    if (typeof n === 'object') {
      n = new NodeList(n)
    }

    p.push(n)
    return p
  }, [])

  if (!params) {
    return
  }

  if (typeof params[0] === 'function') {
    window.onload = params[0]
    return
  }

  if (typeof params[0] === 'string') {
    return new NodeList(params.reduce((p, n) => {
      p.push(...document.querySelectorAll(n))
      return p
    }, []))
  }

  const {strFilter, nodeFilter} = params.reduce((p, n) => {
    if (typeof n === 'string') {
      p.strFilter.push(n)
    } else {
      p.nodeFilter.push(n)
    }

    return p
  }, {strFilter: [], nodeFilter: []})

  if (strFilter.length() > 0) {
    return new NodeList(nodeFilter).children(...strFilter)
  } else {
    return new NodeList(nodeFilter)
  }
}
