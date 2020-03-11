import React from "react"

/**
 * @param {*} props 
 *  @param {State} state
 *  @param {Number} numberOfCells
 *  @param {String} activeColor
 *  @param {Function} handleSendMessage
 * 
 * @returns {Component} Grid 
 */
const Grid = ({ state, height, width, numberOfCells, activeColor, handleSendMessage }) => {
  const { grid } = state
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${numberOfCells}, ${Math.round(width / numberOfCells)}px)`,
      gridTemplateRows: `repeat(${numberOfCells}, ${Math.round(height / numberOfCells)}px)`
    }}>
      {
        grid.map((rows, x) =>
          rows.map((colorValue, y) => (
            <div
              key={`${x}-${y}`}
              style={{
                width: Math.floor(width / numberOfCells) - 2,
                height: Math.floor(height / numberOfCells) - 2,
                backgroundColor: grid[x][y] ? colorValue : "white",
                border: "solid 1px black"
              }}
              onClick={() => {
                if (activeColor !== [...grid][x][y] && [...grid][x][y] !== 0) return
                const copy = [...grid]
                copy[x][y] = copy[x][y] ? 0 : activeColor
                handleSendMessage(copy)
              }}
            />
          ))
        )}
    </div>
  )
}
export default Grid;