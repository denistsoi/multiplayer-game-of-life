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

    switch (data.type) {
      case "connect":
        setWidth(data.grid[0].length)
        setHeight(data.grid.length)
        dispatch({ type: "update", payload: data.grid })
        break;
      case "update":
        dispatch({ type: "update", payload: data.grid })
        break;
      default:
    }
  };

  const randomColor = new RandomColor();
  const [activeColor, setActiveColor] = useState(randomColor.value)
  const [realTime, setRealTime] = useState(true)

  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  const handleSendMessage = updatedGrid => {
    dispatch({ type: "update", payload: updatedGrid })

    const stringify = object => JSON.stringify(object)
    connection.send(stringify({ type: "update", grid: updatedGrid }))
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
        numberOfCells={height}
        height={450}
        width={450}
      ></Grid>
    </>
  )
}

export default Game;