import React from 'react';
import { useEffect, useRef, useState} from 'react';
import Canvas from '../components/Canvas';
import uuid from 'react-uuid';

import { Notes } from './api/oldnotes';

const StickyNotes = () => {

    const [canvasData, setCanvaseData] = useState(Notes);
    const [val, setVal] = useState("add text here");

    const addNote = () => {
        let newNote = {"Id": uuid().toString(),
        "Type": "text",
        "className": "aqua",
        "Top": 100,
        "Left": 100,
        "x": 100,
        "y": 100,
        "w": 160,
        "h": 160,
        "TextContent": val.toString()}

        let updatedData = [...canvasData, newNote];
        setCanvaseData(updatedData);
//        draw();
        console.log("updatedData: " + JSON.stringify(updatedData));
//I'm missing something here.... .the new button is not getting painted in the context



    };
  
    // draw rectangle
    const draw = (ctx) => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            canvasData.map ((info) => {
                const style = {backgroundColor: '#ffa500', border: '1px solid tomato'};
                drawFillRect(info, style, ctx);
            });
        }

    const drawFillRect = (info, style, ctx) => {
        const { x, y, w, h } = info;
        // const { backgroundColor = 'black' } = style;

        ctx.beginPath();
        ctx.fillStyle = style.backgroundColor;
        ctx.fillRect(x, y, w, h);
        ctx.font = '18px Times New Roman';
        ctx.strokeText(info.TextContent, x+10, y+20, w);

    }

    const clearCanvas = () =>{
        setCanvaseData([]);
    }
    
    return ( 
        <div className="App">
            <div className="notes_panel">
                <textarea
                    onChange={(e) => setVal(e.target.value)}
                    value={val}
                />
                <button className='button' onClick={() => {addNote()}}>Add Note</button>
                <button className='button' onClick={() => {clearCanvas()}}>Clear All Notes</button>
            </div>
                <Canvas draw={draw} canvasData={canvasData} className="notes_canvas" width="1200" height="800" />
          </div>
    
    )
}

export default StickyNotes;