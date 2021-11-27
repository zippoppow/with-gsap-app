import { useEffect, useRef, useState} from 'react';
import uuid from 'react-uuid';

import Draggable from 'react-draggable';


import { Notes } from './api/oldnotes';

const StickyNotes  = (props) => {
    // console.log("props: " + JSON.stringify(props));
    const [canvasData, setCanvaseData] = useState(Notes);
        //console.log("canvasData: " + JSON.stringify(canvasData));
    const [val, setVal] = useState("add text here");

    // const [ctx, setCtx] = useState(null);

    // const boxes = [
    //     { PosX: 200, PosY: 220, Width: 100, Height: 50 },
    //     { PosX: 100, PosY: 120, Width: 100, Height: 50 }
    //   ]

    const myCanvas = useRef();
    let ctx = null;
    let isDown = false;
    let dragTarget = null;
    let startX = null;
    let startY = null;

    useEffect(() => {
        const canvasEle = myCanvas.current;
        canvasEle.width = canvasEle.clientWidth;
        canvasEle.height = canvasEle.clientHeight;

        //initialize canvas context
        ctx = canvasEle.getContext("2d");

        

    }, []);

    useEffect(() => {
        draw();
      }, []);


    const addNote = () => {

        let newNote = {"Id": uuid().toString(),
        "Type": "text",
        "className": "aqua",
        "Top": 0,
        "Left": 0,
        "PosX": 100,
        "PosY": 100,
        "Width": 40,
        "Height": 60,
        "TextContent": val.toString()}

        let updatedData = [...canvasData, newNote];

        setCanvaseData(updatedData);
        console.log("updatedData: " + JSON.stringify(updatedData));

        //ALSO, in here add a new "Note" to the canvas?
        //see empty useEffect() below

    };

    const clearCanvas = () => {
        ctx.clearRect(0, 0, myCanvas.current.clientWidth, myCanvas.current.clientHeight);
    }

    // draw rectangle
    const draw = () => {
        
       ctx.clearRect(0, 0, myCanvas.current.clientWidth, myCanvas.current.clientHeight);
        canvasData.map ((note) => {
          //  console.log("canvasData.map, note: " + JSON.stringify(note));
            let currX = note.PosX;
            let currY = note.PosY;
            let currW = note.Width;
            let currH = note.Height;
            const thisInfo = { currX, currY, currW, currH };
            const thisStyle = { backgroundColor:'tomato' };
            // console.log("canvasData.map, thisInfo: " + JSON.stringify(thisInfo));
            // console.log("canvasData.map, thisStyle: " + JSON.stringify(thisStyle));
            drawRectangle(thisInfo, thisStyle);
        });
    }

    const drawRectangle = (info, style = {}) => {
        // console.log("drawRectangle, currX: " + JSON.stringify(info.currX));
        // console.log("drawRectangle, currY: " + JSON.stringify(info.currY));
        // console.log("drawRectangle, currW: " + JSON.stringify(info.currW));
        // console.log("drawRectangle, currH: " + JSON.stringify(info.currH));
        ctx.beginPath();
        ctx.fillStyle = style.backgroundColor;
        ctx.fillRect(info.currX,info.currY,info.currW,info.currH);
    };

    const touchNote = (x,y) => {
        console.log("touchNote, x: " + JSON.stringify(x));
        console.log("touchNote, y: " + JSON.stringify(y));
        let isTarget = null;
        for (let i = 0; i < canvasData.length; i++) {
            const note = canvasData[i];
            if (x >= note.PosX && x <= note.PosY + note.Width && y >= note.PosY && y <= note.PosY + note.Height) {
                console.log("touchNote, note.PosX: " + JSON.stringify(note.PosX));
                console.log("touchNote, note.PosY: " + JSON.stringify(note.PosY));
                console.log("touchNote, note.Width: " + JSON.stringify(note.Width));
                console.log("touchNote, note.Height: " + JSON.stringify(note.Height));
                dragTarget = note;
                isTarget = true;
                break;
            }
        }
        return isTarget;
    }

    const handleMouseDown = e => {
        startX = parseInt(e.nativeEvent.offsetX - myCanvas.current.clientLeft);
        startY = parseInt(e.nativeEvent.offsetY - myCanvas.current.clientTop);
        isDown = touchNote(startX, startY);

        console.log("isDown: " + isDown);
    }
    const handleMouseMove = e => {
        if (!isDown) return;

        const mouseX = parseInt(e.nativeEvent.offsetX - myCanvas.current.clientLeft);
        const mouseY = parseInt(e.nativeEvent.offsetY - myCanvas.current.clientTop);
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
        <>
            <div className="notes_panel">
                <textarea
                    onChange={(e) => setVal(e.target.value)}
                    value={val}
                />
                <button className='button' onClick={() => {addNote()}}>Add Note</button>
            </div>

            <canvas ref={myCanvas} className="notes_canvas" width="1200" height="800"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseOut={handleMouseOut}
            >
                Your browser does not support the HTML canvas tag.</canvas>
        </>
    )
}

export default StickyNotes;