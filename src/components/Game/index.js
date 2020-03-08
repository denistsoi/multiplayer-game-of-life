import React, { useState, useReducer } from "react"
import Grid from "../Grid"
import "./style.css"


import { gridReducer } from "./reducer"
import api from "../../api/apiHandler"


const Game = ({ connection }) => {
  // setup state
  const [state, dispatch] = useReducer(gridReducer, { height: 0, width: 0, grid: [] })

  // handle on message
  connection.onmessage = (event) => api.onMessageHandler(event, dispatch)

  const activeColor = "#f00"

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
        <div style={{
          textAlign: "center",
          display: "flex"
        }}>
          <div style={{
            backgroundColor: `${activeColor}`,
            height: 20,
            width: 20
          }}></div>

        </div>
      </div>

      <Grid
        handleSendMessage={handleSendMessage}
        state={state}
        activeColor={activeColor}
        numberOfCells={state.height}
        height={450}
        width={450}
      ></Grid>
    </>
  )
}

export default Game;