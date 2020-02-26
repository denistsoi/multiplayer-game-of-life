import React, { useRef, useEffect } from "react"

const Grid = (props) => {
  const canvasRef = useRef(null)

  const numberOfCells = 20
  // cell height
  const cellHeight = props.height / (numberOfCells * 2)


  useEffect(() => {
    const context = canvasRef.current.getContext("2d")

    const pixelRatio = window.devicePixelRatio
    context.save()
    context.scale(pixelRatio, pixelRatio)

    context.beginPath()

    for (var x = 0, i = 0; i < numberOfCells; x = x + cellHeight, i++) {
      for (var y = 0, j = 0; j < numberOfCells; y = y + cellHeight, j++) {
        context.rect(x, y, cellHeight, cellHeight)
        context.fillStyle = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`
      }
    }

    context.fill();
    context.stroke();
    context.closePath();
  })

  const handleClick = (event) => {
    const rect = canvasRef.current.getBoundingClientRect()

    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const getIndex = (coord) => Math.floor((coord / props.height) * (numberOfCells))
    let xIndex = getIndex(x)
    let yIndex = getIndex(y)

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