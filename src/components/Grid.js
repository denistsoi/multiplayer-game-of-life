import React, { useRef, useEffect } from "react"

const Grid = ({ height, width, numberOfCells, state, activeColor, onClick }) => {
  const canvasRef = useRef(null)

  const { grid } = state;

  const cellHeight = height / numberOfCells
  const cellWidth = width / numberOfCells

  // move this out
  const baseColor = `rgb(255, 255, 255)`

  useEffect(() => {
    const context = canvasRef.current.getContext("2d")

    context.beginPath()
    console.table(state.grid)

    for (let x = 0, xIndex = 0; xIndex < numberOfCells; x = x + cellWidth, xIndex++) {
      for (let y = 0, yIndex = 0; yIndex < numberOfCells; y = y + cellHeight, yIndex++) {
        context.rect(x, y, cellWidth, cellHeight)
        context.fillStyle = grid[xIndex][yIndex] === 0 ? `${baseColor}` : `${activeColor}`

        // debug
        console.log(xIndex, yIndex, grid[xIndex][yIndex])
      }
    }

    context.fill();
    context.stroke();

    context.closePath();
  })





  const handleClick = (event) => {
    // find the appropriate x,y coordinate
    const rect = canvasRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const getIndex = (type) => (coord) => {
      return Math.floor(
        (
          (coord * numberOfCells) /
          (type === "x" ? width : height)
        )
      )
    }
    let xIndex = getIndex("x")(x)
    let yIndex = getIndex("y")(y)

    let xCoord = xIndex * cellWidth
    let yCoord = yIndex * cellHeight

    // draw
    const context = canvasRef.current.getContext("2d")

    context.beginPath()

    // toggle color
    context.fillStyle = grid[xIndex][yIndex] === 0 ? `${activeColor}` : `${baseColor}`
    context.rect(xCoord, yCoord, cellHeight, cellHeight)

    context.fill();
    context.stroke();

    context.closePath();

    onClick({ xIndex, yIndex })
  }

  return (
    <div>
      <canvas
        style={{
          margin: 10
        }}
        ref={canvasRef}
        width={width}
        height={height}
        onClick={handleClick}
      ></canvas>
    </div>
  )
}

export default Grid