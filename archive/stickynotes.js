import { useEffect, useRef, useState} from 'react';
import uuid from 'react-uuid';

import Draggable from 'react-draggable';

import { fabric } from 'fabric';


import { Notes } from '../pages/api/oldnotes';

const StickyNotes  = (props) => {
    // console.log("props: " + JSON.stringify(props));
 const [canvasData, setCanvaseData] = useState(Notes);
     console.log("canvasData: " + JSON.stringify(canvasData));


 //initialize "data" with Notes data
 const [data, setData] = useState(Notes);
 const [val, setVal] = useState("add text here");
//  const [canvasCtx, setCanvasCtx] = useState(null);  //don't think this is correct..... what is the scope of refs?

 const addNote = () => {

   let newNote = {"Id": uuid().toString(),
   "Type": "text",
   "className": "aqua",
   "Top": 0,
   "Left": 0,
   "PosX": 0,
   "PosY": 0,
   "TextContent": val.toString()}

   let updatedData = [...data, newNote];

   setData(updatedData);
//   console.log("updatedData: " + JSON.stringify(updatedData));

    //ALSO, in here add a new "Note" to the canvas

 };

 const clearCanvas = () => {
    canvasCtx.clearRect(0,0,)
 }

 const testRectangle = new fabric.Rect({
    left: 100,
    top: 100,
    fill: 'red',
    width: 20,
    height: 20
  });

 let myCanvas = useRef(null);
 useEffect(() => {
     //initialize canvas context
     let fCanvas = new fabric.Canvas(myCanvas);
     let ctx = fCanvas.getContext("2d");
     
     ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
     // ctx.fillRect(30, 30, 50, 50);

     ctx.font = "30px Arial";
     ctx.fillText(canvasData.TextContent ,10,50);

     fCanvas.add(testRectangle);

 }, [myCanvas]);


 return (

     <>
         <div className="notes_panel">
              <textarea
                onChange={(e) => setVal(e.target.value)}
                value={val}
              />
              <button className='button' onClick={() => {addNote()}}>Add Note</button>
         </div>
         
         <canvas ref={(el) => (myCanvas = el)} className="notes">
            Your browser does not support the HTML canvas tag.</canvas>
     </>
 )
}

export default StickyNotes;