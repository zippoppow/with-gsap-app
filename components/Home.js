import React from 'react';
import { useEffect, useRef, useState} from 'react';
import Canvas from './Canvas2';
import uuid from 'react-uuid';

import { Notes } from '../pages/api/oldnotes';

const Home = () => {

    const [canvasData, setCanvaseData] = useState(Notes);
    const [val, setVal] = useState("add text here");
    const [colorChoice, setColorChoice] = useState("#ffdc00"); //orange
    const [toolType, setToolType] = useState("drawing");

    const addNote = () => {
        let newNote = {"Id": uuid().toString(),
        "Type": "text",
        "backgroundColor": colorChoice,
        "Top": 100,
        "Left": 100,
        "x": 100,
        "y": 100,
        "w": 160,
        "h": 160,
        "TextContent": val.toString()}

        let updatedData = [...canvasData, newNote];
        setCanvaseData(updatedData);
          console.log("updatedData: " + JSON.stringify(updatedData));

    };
  
    // draw rectangle
    const draw = (ctx) => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            canvasData.map ((info) => {
                const style = {backgroundColor: info.backgroundColor, border: '1px solid tomato'};
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
            <div className="notes_section_title">
                <h1>Sticky Notes</h1>
                <ul>
                    <li>Add some text</li>
                    <li>Choose a color</li>
                    <li>Double-click a note to delete it</li>
                </ul>
            </div>
            <div className="notes_panel">
                <div>
                    <textarea
                        onChange={(e) => setVal(e.target.value)}
                        value={val}
                    />
                </div>
                <div>
                    <select
                        onChange={(e) => {setColorChoice(e.target.value)}}
                    >
                            <option value='#0084ff'>blue</option>
                            <option value='#ffdc66' selected>orange</option>
                            <option value='#ffff66'>yellow</option>
                    </select>
                </div>
                <div>
                    <button className='button' onClick={() => {addNote()}}>Add Note</button>
                </div>
                <div className='notes_panel_clear_container'><button className='button notes_panel_clear_btn' onClick={() => {clearCanvas()}}>Clear All Notes</button></div>
            </div>
            <Canvas draw={draw} canvasdata={canvasData} className="notes_canvas" width="1200" height="800" />
          </div>
    
    )
}

export default Home;