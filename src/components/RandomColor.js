
// set active color
class RandomColor {
  constructor() {
    const red = this.random8Bit()
    const blue = this.random8Bit()
    const green = this.random8Bit()

    this.value = `rgb(${red}, ${green}, ${blue})`
    return this.value;
  }
  random8Bit() {
    return Math.floor(Math.random() * 255)
  }
}

export default RandomColor