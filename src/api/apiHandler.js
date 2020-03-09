const onMessageHandler = (event, dispatch) => {
  // Receiving data from wss
  const data = JSON.parse(event.data);

  console.log(data)

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

      // todo: check localstorage
      dispatch({
        type: "setColor",
        payload: { activeColor: data.activeColor }
      })
      dispatch({ type: "update", payload: data.grid })
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