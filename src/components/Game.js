import React, { useState } from "react"

const Game = ({ connection }) => {
  connection.onopen = (event) => {
    console.log("WebSocket is open now.");
  };

  connection.onclose = (event) => {
    console.log("WebSocket is closed now.");
  };

  connection.onerror = (event) => {
    console.error("WebSocket error observed:", event);
  };

  connection.onmessage = (event) => {
    // Receiving data from wss
    const data = JSON.parse(event.data);
    setActive(data)
  };


  const handleSendMessage = event => {
    const data = { state: event.target.id };
    setActive(data)
    connection.send(JSON.stringify(data))
  }

  const [isActive, setActive] = useState(null)

  return (
    <div>
      <span>I am a gameboard</span>

      <button id={1} className={isActive} onClick={handleSendMessage}>1</button>
      <button id={2} onClick={handleSendMessage}>2</button>
      <button id={3} onClick={handleSendMessage}>3</button>
    </div>
  )
}

export default Game;