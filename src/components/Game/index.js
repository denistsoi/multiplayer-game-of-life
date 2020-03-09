import React, { useReducer } from "react"
import Grid from "../Grid"
import "./style.css"

import { gridReducer } from "./reducer"
import api from "../../api/apiHandler"


const Game = ({ connection }) => {
  // setup state
  const initialState = { height: 0, width: 0, grid: [], activeColor: null }
  const [state, dispatch] = useReducer(gridReducer, initialState)

  // handle on message
  connection.onmessage = (event) => api.onMessageHandler(event, dispatch)

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
            backgroundColor: `${state.activeColor}`,
            height: 20,
            width: 20
          }}></div>
        </div>
      </div>

      <Grid
        handleSendMessage={handleSendMessage}
        state={state}
        activeColor={state.activeColor}
        numberOfCells={state.height}
        height={450}
        width={450}
      ></Grid>
    </>
  )
}

export default Game;