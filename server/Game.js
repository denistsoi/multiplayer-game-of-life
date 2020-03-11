const averageColor = require("./color/averageColor")

class Game {
  constructor({ width, height }) {
    this.height = height
    this.width = width

    this._board = this.setupBoard({ width, height })
  }

  setupBoard({ width, height }) {
    let board = new Array(height).fill(0);
    for (let i = 0; i < board.length; i++) {
      board[i] = new Array(width).fill(0);
    }

    return board;
  }

  clearBoard() {
    this._board = this.setupBoard({ width: this.width, height: this.height })
  }

  get currentState() {
    return this._board
  }

  updateBoard(data) {
    this._board = data
  }

  nextLife() {
    let next = this.setupBoard({ width: this.width, height: this.height })
    let life = [...this._board]

    // rows
    for (let i = 0; i < life.length; i++) {
      // columns
      for (let j = 0; j < life[i].length; j++) {
        let state = life[i][j];
        let [neighbours, values] = this.countNeighbours(life, i, j);

        if (!this._hasValue(state) && neighbours == 3) {
          // move this to setColor
          next[i][j] = this.setColor(values);
        } else if (this._hasValue(state) && (neighbours < 2 || neighbours > 3)) {
          next[i][j] = 0;
        } else {
          next[i][j] = state;
        }
      }
    }

    this._board = [...next];
  }

  // gets an average color of the neighbours
  setColor(values) {
    return averageColor(values)
  }

  // checks if the value is 0 or a color
  _hasValue(value) {
    return value !== 0 ? 1 : 0;
  }

  countNeighbours(board, x, y) {
    let counter = 0
    let cols = this.width
    let rows = this.height

    const values = []

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x + i + cols) % cols;
        let row = (y + j + rows) % rows;

        if (this._hasValue(board[col][row])) {
          values.push(board[col][row])
        }
        counter = counter + (this._hasValue(board[col][row]));
      }
    }

    counter = counter - (this._hasValue(board[x][y]))
    return [counter, values]
  }
}

module.exports = Game