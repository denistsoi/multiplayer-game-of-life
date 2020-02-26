import React, { useRef, useEffect } from "react"

const Grid = (props) => {
  const canvasRef = useRef(null)

  const numberOfCells = 10
  // cell height
  const cellHeight = props.height / numberOfCells
  const cellWidth = props.width / numberOfCells

  const currentColor = `${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256}`

  useEffect(() => {
    const context = canvasRef.current.getContext("2d")

    context.beginPath()

    for (var x = 0, i = 0; i < numberOfCells; x = x + cellWidth, i++) {
      for (var y = 0, j = 0; j < numberOfCells; y = y + cellHeight, j++) {
        context.rect(x, y, cellWidth, cellHeight)
        context.fillStyle = `rgb(255, 255, 255)`
      }
    }

    context.fill();
    context.stroke();

    context.closePath();
  })

  const handleClick = (event) => {
    const context = canvasRef.current.getContext("2d")
    const rect = canvasRef.current.getBoundingClientRect()

    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const getIndex = (type) => (coord) => {
      return Math.floor(
        (
          (coord * numberOfCells) /
          (type === "x" ? props.width : props.height)
        )
      )
    }
    let xIndex = getIndex("x")(x)
    let yIndex = getIndex("y")(y)

    let xCoord = xIndex * cellWidth, yCoord = yIndex * cellHeight

    context.beginPath()

    context.fillStyle = `rgb(${currentColor})`
    context.rect(xCoord, yCoord, cellHeight, cellHeight)

    context.fill();
    context.stroke();

    context.closePath();

    console.log(context, xCoord, yCoord, currentColor, cellHeight)

    props.onClick({ xIndex, yIndex })
  }

  return (
    <div>
      <canvas
        style={{
          margin: 10
        }}
        ref={canvasRef}
        width={props.width}
        height={props.height}
        onClick={handleClick}
      ></canvas>
    </div>
  )
}

export default Grid