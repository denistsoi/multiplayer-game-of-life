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

    default:
      return state
  }
}