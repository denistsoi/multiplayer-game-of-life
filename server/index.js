const http = require("http")
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3001 })

function setupBoard(width, height) {
  let board = new Array(height).fill(0);
  for (let i = 0; i < board.length; i++) {
    board[i] = new Array(width).fill(0);
  }

  return board;
}

class Game {
  constructor(width, height) {
    // this.state = {}
    this.height = height
    this.width = width

    this._board = setupBoard(width, height)
  }

  get currentState() {
    // console.log(this._board)
    return JSON.stringify(this._board)
    // return JSON.stringify(this.state)
  }

  updateBoard(data) {
    this._board = JSON.parse(data)
  }

  nextLife() {
    let next = setupBoard(this.width, this.height)
    let life = [...this._board]

    for (let i of life.length) {
      for (let j of life.length) {

        let state = life[i][j]
        let neighbours = this.countNeighbours(life, i, j)
        if (state == 0 && neighbours == 3) {
          next[i][j] = 1
        } else if (state == 1 && (neighbours < 2 || neighbours > 3)) {
          next[i][j] = 0
        } else {
          next[i][j] = state
        }
      }
    }
    this._board = [...next]
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

// todo:
// generate random id + color
const game = new Game(2, 2);

wss.on("connection", (ws) => {
  // on connection, re-create the app state (i.e game state)
  ws.send(game.currentState)

  ws.on("message", data => {
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        // re-render game state
        game.updateBoard(data)
        console.log(data, typeof data)
        setInterval(() => {
          client.send(game.currentState)
        }, 1000)
      }
    })
  })
})

const server = http.createServer()

server.listen(8080, () => {
  console.log("server listening on port 8080")
})