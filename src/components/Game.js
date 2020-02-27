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

  const numberOfCells = 10;
  const baseState = (numberOfCells) => {
    return new Array(numberOfCells).fill(0).map(_ => [...new Array(numberOfCells).fill(0)])
  }

  const [state, dispatch] = useReducer((state = {}, action = {}) => {
    switch (action.type) {
      case "update":
        return {
          ...state,
          grid: action.payload
        }
      default:
        return state
    }
  }, { grid: baseState(numberOfCells) })

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
  const randomColor = "rgb(255,0,0)"
  const [activeColor, setActiveColor] = useState(randomColor)

  const handleSendMessage = data => {
    console.log(data)
    dispatch({ type: "update", payload: data })
    connection.send(JSON.stringify(data))
  }


  return (
    <>
      <div style={{
        paddingBottom: "1em",
        textAlign: "center",
        display: "flex"
      }}>

        <div>I am gameboard</div>
        <div style={{ backgroundColor: `${activeColor}`, height: 20, width: 20 }}></div>
      </div>

      <Grid
        handleSendMessage={handleSendMessage}
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