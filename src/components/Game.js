import React, { useState } from "react"
import "./Game.css"

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
    const data = { state: parseInt(event.target.id) };
    setActive(data)
    connection.send(JSON.stringify(data))
  }

  const [isActive, setActive] = useState(null)

  return (
    <div>
      <span>I am a gameboard</span>

      <button id={1} className={isActive?.state === 1 ? "active" : ""} onClick={handleSendMessage}>1</button>
      <button id={2} className={isActive?.state === 2 ? "active" : ""} onClick={handleSendMessage}>2</button>
      <button id={3} className={isActive?.state === 3 ? "active" : ""} onClick={handleSendMessage}>3</button>
    </div>
  )
}

export default Game;