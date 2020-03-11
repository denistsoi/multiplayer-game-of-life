// returns an average color
const averageColor = (colors) => {

  const hexValues = colors.map(color => color.replace("#", ""))

  const rgbMap = { r: [], g: [], b: [] }

  hexValues.map(value => {
    const [r, g, b] = value.match(/.{2}/g);

    rgbMap.r.push(r)
    rgbMap.g.push(g)
    rgbMap.b.push(b)
  })

  const hex = Object.values(rgbMap).reduce((hexString, values) => {
    const num = values.reduce((sum, value) => sum += parseInt(value, 16), 0)
    const dec = Math.floor(num / values.length)

    let str = dec.toString(16);
    if ((str.length % 2) > 0) {
      str = "0" + str;
    }
    return hexString + str;
  }, "#")

  return hex;
}

module.exports = averageColor;