import { useEffect, useRef, useState} from 'react';
import uuid from 'react-uuid';


import { Notes } from './api/oldnotes';

function Tester() {  
    const [canvasData, setCanvaseData] = useState(Notes);
    //console.log("canvasData: " + JSON.stringify(canvasData));
    const [val, setVal] = useState("add text here");

    const canvas = useRef();
    let ctx = null;
    const boxes = [
      { x: 200, y: 220, w: 100, h: 50 },
      { x: 100, y: 120, w: 100, h: 50 }
    ]
    let isDown = false;
    let dragTarget = null;
    let startX = null;
    let startY = null;
  
    // initialize the canvas context
    useEffect(() => {
      // dynamically assign the width and height to canvas
      const canvasEle = canvas.current;
      canvasEle.width = canvasEle.clientWidth;
      canvasEle.height = canvasEle.clientHeight;
  
      // get context of the canvas
      ctx = canvasEle.getContext("2d");
      draw();
    }, []);
  
    // useEffect(() => {
    //   draw();
    // }, []);
  

    const addNote = () => {
        let newNote = {"Id": uuid().toString(),
        "Type": "text",
        "className": "aqua",
        "Top": 0,
        "Left": 0,
        "x": 100,
        "y": 100,
        "w": 160,
        "h": 160,
        "TextContent": val.toString()}

        let updatedData = [...canvasData, newNote];

        setCanvaseData(updatedData);
        draw();
        console.log("updatedData: " + JSON.stringify(updatedData));

    };

    // draw rectangle
    const draw = () => {
        ctx.clearRect(0, 0, canvas.current.clientWidth, canvas.current.clientHeight);
        canvasData.map ((info) => {
            const style = {backgroundColor: '#ffa500', border: '1px solid tomato'};
            drawFillRect(info, style)
        
        });
    }
  
    const drawFillRect = (info, style) => {
      const { x, y, w, h } = info;
     // const { backgroundColor = 'black' } = style;
  
      ctx.beginPath();
      ctx.fillStyle = style.backgroundColor;
      ctx.fillRect(x, y, w, h);
      ctx.font = '18px Times New Roman';
      ctx.strokeText(info.TextContent, x+10, y+20, w);
      
    }
  
    // identify the click event in the rectangle
    const hitBox = (x, y) => {
      let isTarget = null;
      for (let i = 0; i < canvasData.length; i++) {
        const box = canvasData[i];
        if (x >= box.x && x <= box.x + box.w && y >= box.y && y <= box.y + box.h) {
          dragTarget = box;
          isTarget = true;
          break;
        }
      }
      return isTarget;
    }
  
    const handleMouseDown = e => {
      startX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
      startY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
      isDown = hitBox(startX, startY);
    }
    const handleMouseMove = e => {
      if (!isDown) return;
  
      const mouseX = parseInt(e.nativeEvent.offsetX - canvas.current.clientLeft);
      const mouseY = parseInt(e.nativeEvent.offsetY - canvas.current.clientTop);
      const dx = mouseX - startX;
      const dy = mouseY - startY;
      startX = mouseX;
      startY = mouseY;
      dragTarget.x += dx;
      dragTarget.y += dy;
      draw();
    }
    const handleMouseUp = e => {
      dragTarget = null;
      isDown = false;
    }
    const handleMouseOut = e => {
      handleMouseUp(e);
    }
  
    return (
      <div className="App">
        <div className="notes_panel">
            <textarea
                onChange={(e) => setVal(e.target.value)}
                value={val}
            />
            <button className='button' onClick={() => {addNote()}}>Add Note</button>
        </div>
        <canvas  className="notes_canvas" width="1200" height="800"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseOut={handleMouseOut}
          ref={canvas}></canvas>
      </div>
    );
  }

  export default Tester;