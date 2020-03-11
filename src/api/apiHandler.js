const onMessageHandler = (event, store, dispatch) => {
  // Receiving data from wss
  const data = JSON.parse(event.data);

  switch (data.type) {
    case "connect":
      // set dimentions
      dispatch({
        type: "setDimensions",
        payload: {
          height: data.grid.length,
          width: data.grid[0].length,
        }
      })

      // update state of grid
      dispatch({ type: "update", payload: data.grid })

      // setColor
      const saveColorToLocalStorage = (color) => {
        window.localStorage.setItem("activeColor", color)
        return color
      }

      const hasColorSaved = window.localStorage.getItem("activeColor") !== null ? true : false
      const previousColor = window.localStorage.getItem("activeColor")

      dispatch({
        type: "setColor",
        payload: {
          activeColor: hasColorSaved ? previousColor : saveColorToLocalStorage(data.activeColor)
        }
      })

      break;
    case "update":
      dispatch({ type: "update", payload: data.grid })
      break;
    default:
  }
}

export default {
  onMessageHandler
}