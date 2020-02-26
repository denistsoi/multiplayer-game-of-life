import React, { useState } from "react"
import "./Game.css"

import Grid from "./Grid"

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
    // setActive(data)
  };


  const handleSendMessage = data => {


    // const data = { state: parseInt(event.target.id) };
    // setActive(data)
    // connection.send(JSON.stringify(data))

    // i need a grid (2d array of current state),
    // such that, when clicking on cell, I need the x, y coordinates
    console.log(data);

  }

  const [state, setState] = useState({})

  return (
    <>
      <div>I am gameboard</div>

      <Grid
        onClick={handleSendMessage}
        state={state}
        height={400}
        width={400}
      ></Grid>
    </>
  )
}

export default Game;