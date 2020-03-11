
// set active color
class RandomColor {
  constructor() {
    const random8BitDecimal = () => parseInt(Math.floor(Math.random() * 255))

    this.values = [
      random8BitDecimal(),
      random8BitDecimal(),
      random8BitDecimal()
    ]
  }

  toHex() {
    return this.values.reduce((string, value) => {
      let str = value.toString(16);
      if ((str.length % 2) > 0) {
        str = "0" + str;
      }
      return string + str;
    }, "#")
  }
}

module.exports = RandomColor