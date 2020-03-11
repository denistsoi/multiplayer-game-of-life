export const gridReducer = (state = {}, action = {}) => {

  switch (action.type) {
    case "update":
      return {
        ...state,
        grid: action.payload
      }

    case "setDimensions":
      const { height, width } = action.payload
      return {
        ...state,
        height,
        width
      }

    case "setColor":
      console.log("here", action.payload)
      return {
        ...state,
        activeColor: action.payload.activeColor
      }

    case "setClientId":
      return {
        ...state,
        clientId: action.payload.clientId
      }
    default:
      return state
  }
}