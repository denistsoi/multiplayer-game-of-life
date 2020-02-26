import React from "react"



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
    console.log(event.data)
  };

  function handleSendMessage(ev) {
    connection.send("Hello")
  }

  return (
    <div>
      <span>I am a gameboard</span>
      <button onClick={handleSendMessage}>button</button>
    </div>
  )
}

export default Game;