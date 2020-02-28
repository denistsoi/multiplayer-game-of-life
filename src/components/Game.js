import React, { useState, useReducer } from "react"
import "./Game.css"

import Grid from "./Grid"
import RandomColor from "./RandomColor"

const Game = ({ connection }) => {
  const numberOfCells = 5;
  const baseState = (numberOfCells) => {
    return new Array(numberOfCells)
      .fill(0).map(_ =>
        [...new Array(numberOfCells).fill(0)]
      )
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
      if (realTime) {
        dispatch({ type: "update", payload: data })
      }
    }
  };

  const randomColor = new RandomColor();
  const [activeColor, setActiveColor] = useState(randomColor.value)

  const [realTime, setRealTime] = useState(false)

  const handleSendMessage = updatedGrid => {
    dispatch({ type: "update", payload: updatedGrid })

    console.log(realTime, updatedGrid)
    if (realTime) {
      connection.send(JSON.stringify(updatedGrid))
    }
  }

  return (
    <>
      <div style={{
        paddingBottom: "1em",
      }}>

        <div>I am gameboard</div>

        <div style={{
          textAlign: "center",
          display: "flex"
        }}>
          <button onClick={() => {

            // setRealTime()
            // console.log(realTime)
            setRealTime(!realTime)
            handleSendMessage(state.grid)
            // console.log(realTime)
            // console.table(state.grid)
          }}>{realTime ? "Real time" : "Paused"}</button>
          <div style={{ backgroundColor: `${activeColor}`, height: 20, width: 20 }}></div>
          <button>Clear Board</button>
        </div>

        {/* <div>
          <span>Patterns</span>
          <select></select>
        </div> */}



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