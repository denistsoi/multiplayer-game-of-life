const http = require("http")
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3001 })

class Game {
  constructor() {
    this.state = {}
  }

  get currentState() {
    return JSON.stringify(this.state)
  }

  updateState(data) {
    this.state = {
      ...this.state,
      ...JSON.parse(data)
    }
  }
}

const game = new Game();

wss.on("connection", (ws) => {
  // on connection, re-create the app state (i.e game state)
  ws.send(game.currentState)

  ws.on("message", data => {
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        // re-render game state
        game.updateState(data)
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