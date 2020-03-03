import React, { useState, useReducer } from "react"
import "./Game.css"
import Grid from "./Grid"
import RandomColor from "./RandomColor"

const Game = ({ connection }) => {
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
  }, { grid: [] })

  connection.onmessage = (event) => {
    // Receiving data from wss
    const data = JSON.parse(event.data);

    if (!width) setWidth(data[0].length)
    if (!height) setHeight(data.length)

    console.log("recieve")
    console.table(data)

    if (event.data !== JSON.stringify(state.grid)) {
      if (realTime) {
        dispatch({ type: "update", payload: data })
      }
    }
  };

  const randomColor = new RandomColor();
  const [activeColor, setActiveColor] = useState(randomColor.value)
  const [realTime, setRealTime] = useState(true)

  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  const handleSendMessage = updatedGrid => {
    dispatch({ type: "update", payload: updatedGrid })
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
            setRealTime(!realTime)
          }}>{realTime ? "Real time" : "Paused"}</button>
          <div style={{ backgroundColor: `${activeColor}`, height: 20, width: 20 }}></div>
          <button>Clear Board</button>
        </div>
      </div>

      <Grid
        handleSendMessage={handleSendMessage}
        state={state}
        activeColor={activeColor}
        height={height}
        width={width}
      ></Grid>
    </>
  )
}

export default Game;