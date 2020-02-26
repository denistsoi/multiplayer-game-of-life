const http = require("http")
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3001 })

wss.on("connection", (ws) => {
  ws.on("message", data => {
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        console.log(data)
        client.send(data)
      }
    })
  })
})

const server = http.createServer()

server.listen(8080, () => {
  console.log("server listening on port 8080")
})