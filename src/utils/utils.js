// eslint-disable-next-line no-extend-native
String.prototype.colorRGBToHex = function () {
  let color = this
  let item = String(color).split(',')
  let hexItem = item.map(item => {
    return Number(item).toString(16).padEnd(2, 0)
  })
  return `#${hexItem.join('')}`
}

// eslint-disable-next-line no-extend-native
String.prototype.colorHexToRGB = function () {
  let sColor = this.toLowerCase()
  // 十六进制颜色值的正则表达式
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 如果是16进制颜色
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    // 处理六位的颜色值
    let sColorChange = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
    }
    return sColorChange.join(',')
  }
  return sColor
}
