import React, { useState, useEffect } from "react"
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


  const numberOfCells = 2
  const baseState = new Array(numberOfCells).fill(0).map(column => [...new Array(numberOfCells).fill(0)])
  const [grid, setGrid] = useState(baseState)

  connection.onmessage = (event) => {
    // Receiving data from wss
    const data = JSON.parse(event.data);
    // setActive(data)
  };




  // set active color
  const [activeColor, setActiveColor] = useState(`rgba(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`)

  // const [grid, setGrid] = useState(baseState)

  const handleSendMessage = data => {
    // const data = { state: parseInt(event.target.id) };
    // setActive(data)
    // connection.send(JSON.stringify(data))

    // i need a grid (2d array of current state),
    // such that, when clicking on cell, I need the x, y coordinates

    // const copy = [...grid];
    // copy[data.xIndex][data.yIndex] = 1;
    // setGrid(copy)

    console.log("state grid", JSON.stringify(grid))
  }



  return (
    <>
      <div>I am gameboard</div>
      <div style={{ backgroundColor: activeColor, height: 20, width: 20 }}></div>

      <Grid
        onClick={handleSendMessage}
        grid={grid}
        setGrid={setGrid}
        numberOfCells={numberOfCells}
        activeColor={activeColor}
        height={400}
        width={400}
      ></Grid>
    </>
  )
}

export default Game;