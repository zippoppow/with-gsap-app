import React from 'react'
import useCanvas from './useCanvas'

const Canvas = props => {  
  
  const { draw, ...rest } = props;
  const canvasRef = useCanvas(draw);

  let isDown = false;
  let dragTarget = null;
  let startX = null;
  let startY = null;


  // identify the click event in the rectangle
  const hitBox = (x, y) => {
    let isTarget = null;
    for (let i = 0; i < props.canvasData.length; i++) {
      const box = props.canvasData[i];
      if (x >= box.x && x <= box.x + box.w && y >= box.y && y <= box.y + box.h) {
        dragTarget = box;
        isTarget = true;
        break;
      }
    }
    return isTarget;
  }

  const handleMouseDown = e => {
    startX = parseInt(e.nativeEvent.offsetX - canvasRef.current.clientLeft);
    startY = parseInt(e.nativeEvent.offsetY - canvasRef.current.clientTop);
    isDown = hitBox(startX, startY);
  }
  const handleMouseMove = e => {
    if (!isDown) return;

    const mouseX = parseInt(e.nativeEvent.offsetX - canvasRef.current.clientLeft);
    const mouseY = parseInt(e.nativeEvent.offsetY - canvasRef.current.clientTop);
    const dx = mouseX - startX;
    const dy = mouseY - startY;
    startX = mouseX;
    startY = mouseY;
    dragTarget.x += dx;
    dragTarget.y += dy;
    //get the current context (there's probably a better way to do this)
    const context = canvasRef.current.getContext('2d');
    draw(context);
  }
  const handleMouseUp = e => {
    dragTarget = null;
    isDown = false;
  }
  const handleMouseOut = e => {
    handleMouseUp(e);
  }

  
  return ( <canvas ref={canvasRef} {...rest}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseOut}
  />)
}

export default Canvas;