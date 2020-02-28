const numberOfCells = 5

class Game {
  constructor(width = numberOfCells, height = numberOfCells) {
    this.height = height
    this.width = width

    this._board = this.setupBoard(width, height)
  }

  setupBoard(width, height) {
    let board = new Array(height).fill(0);
    for (let i = 0; i < board.length; i++) {
      board[i] = new Array(width).fill(0);
    }

    return board;
  }

  get currentState() {
    return JSON.stringify(this._board)
  }

  updateBoard(data) {
    this._board = JSON.parse(data)
  }

  nextLife() {
    let next = this.setupBoard(this.width, this.height)
    let life = [...this._board]

    // rows
    for (let i = 0; i < life.length; i++) {
      // columns
      for (let j = 0; j < life[i].length; j++) {
        let state = life[i][j];
        let neighbours = this.countNeighbours(life, i, j);

        if (state == 0 && neighbours == 3) {
          next[i][j] = 1;
        } else if (state == 1 && (neighbours < 2 || neighbours > 3)) {
          next[i][j] = 0;
        } else {
          next[i][j] = state;
        }
      }
    }

    this._board = [...next];
  }

  countNeighbours(board, x, y) {
    let counter = 0
    let cols = this.width
    let rows = this.height

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x + i + cols) % cols;
        let row = (y + j + rows) % rows;
        counter += board[col][row];
      }
    }

    counter -= board[x][y]
    return counter
  }
}

module.exports = Game