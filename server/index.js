const http = require("http")
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 3001 })
const Game = require("./Game")

const RandomColor = require("./color/RandomColor");

// generate random id + color
const { height, width, timePerLife } = require("./config")

const stringify = object => JSON.stringify(object)

const game = new Game({ height, width });

wss.on("connection", (ws, req, client) => {
  // on connection, re-create the app state (i.e game state)

  ws.send(
    stringify({
      type: "connect",
      grid: game.currentState,
      activeColor: new RandomColor().toHex(), // set active color,
      ip: req.connection.remoteAddress,
      timestamp: new Date().getTime()
    })
  )

  ws.on("message", message => {
    const data = JSON.parse(message)

    ws.send(stringify(ws))

    switch (data.type) {
      case "update":
        game.updateBoard(data.grid)
        break;
      default:
        return
    }
  })
})

/**
 * automatically update based on interval
 */
setInterval(() => {
  game.nextLife()
  wss.clients.forEach(client => {
    client.send(
      stringify({
        type: "update",
        grid: game.currentState,
        timestamp: new Date().getTime()
      })
    )
  })
}, timePerLife)

const server = http.createServer()

server.listen(8080, () => {
  console.log("server listening on port 8080", new Date().getTime())
})