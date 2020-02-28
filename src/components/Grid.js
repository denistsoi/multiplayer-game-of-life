import React from "react"

const Grid = ({ state, numberOfCells, activeColor, handleSendMessage }) => {
  const { grid } = state
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${numberOfCells}, 20px)`
    }}>
      {
        grid.map((rows, x) =>
          rows.map((col, y) => (
            <div
              key={`${x}-${y}`}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[x][y] ? activeColor : "white",
                border: "solid 1px black"
              }}
              onClick={() => {
                const copy = [...grid]
                copy[x][y] = copy[x][y] ? 0 : 1
                handleSendMessage(copy)
              }}
            />
          ))
        )}
    </div>
  )
}
export default Grid;