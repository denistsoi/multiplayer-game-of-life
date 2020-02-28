const http = require("http")
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3001 })
const Game = require("./Game")

// generate random id + color
const game = new Game();

wss.on("connection", (ws) => {
  // on connection, re-create the app state (i.e game state)
  ws.send(game.currentState)

  ws.on("message", data => {
    wss.clients.forEach(client => {
      // if (client !== ws && client.readyState === WebSocket.OPEN) {
      if (client.readyState === WebSocket.OPEN) {
        // re-render game state
        game.updateBoard(data)

        setInterval(() => {
          game.nextLife()
          client.send(game.currentState)
        }, 1000)
      }
    })
  })
})

const server = http.createServer()

server.listen(8080, () => {
  console.log("server listening on port 8080", new Date().getTime())
})