const onMessageHandler = (event, dispatch) => {
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