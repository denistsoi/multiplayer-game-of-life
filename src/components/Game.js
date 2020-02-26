import React, { useState, useReducer } from "react"
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
  // const [grid, setGrid] = useState(baseState)

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "update":
        return {
          grid: action.payload
        }
    }
  }, { grid: baseState })

  connection.onmessage = (event) => {
    // Receiving data from wss
    const data = JSON.parse(event.data);

    if (event.data !== JSON.stringify(state.grid)) {
      console.log("recieve")
      console.table(data)
      dispatch({ type: "update", payload: data })
    }
  };




  // set active color
  // const randomColor = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`
  const randomColor = "rgb(255,0,0)"
  const [activeColor, setActiveColor] = useState(randomColor)

  // const [grid, setGrid] = useState(baseState)

  const handleSendMessage = data => {
    // const data = { state: parseInt(event.target.id) };
    // setActive(data)
    // connection.send(JSON.stringify(data))

    // update Grid
    const copy = [...state.grid];
    copy[data.xIndex][data.yIndex] = copy[data.xIndex][data.yIndex] === 0 ? 1 : 0;
    // setGrid(copy)
    dispatch({ type: "update", payload: copy })

    // send grid to api
    // console.log("state grid", JSON.stringify(grid))
    console.log("copy")
    console.table(copy)
    connection.send(JSON.stringify(copy))
  }



  return (
    <>
      <div>I am gameboard</div>
      <div style={{ backgroundColor: `${activeColor}`, height: 20, width: 20 }}></div>

      <Grid
        onClick={handleSendMessage}
        state={state}
        numberOfCells={numberOfCells}
        activeColor={activeColor}
        height={400}
        width={400}
      ></Grid>
    </>
  )
}

export default Game;