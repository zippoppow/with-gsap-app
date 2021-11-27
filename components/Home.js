import { useEffect, useState} from 'react'
import Title from './Title';
import Content from './Content';
import StickyNote from './StickyNote';
import uuid from 'react-uuid';

import Draggable from 'react-draggable';


import { Notes } from '../pages/api/oldnotes';

const Home = () => {

  //initialize "data" with Notes data
  const [data, setData] = useState(Notes);
  const [val, setVal] = useState("add text here");

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

    console.log("updatedData: " + JSON.stringify(updatedData));
 
  };

  const removeNote = (id) => {

    setData(data.filter((i)=>(i.Id !== id)))
  }


  return (
    <div className="inner">
      <Title lineContent="With-GSAP" lineContent2="Using NEXT" />
      <div>
        <div className="other">
           <Content />
           <div>
              <textarea
                onChange={(e) => setVal(e.target.value)}
                value={val}
              />
              <button className='button' onClick={() => {addNote()}}>Add Note</button>
           </div>
            { data.map (function(note) {
              return (
                <Draggable>
                  <div className="drag-wrapper note" id={note.Id} key={note.Id} >
                    <div className="stickyNote_container" draggable="true" key={note.Id} >
                      <button className='button' onClick={() => {removeNote(note.Id)}}>X</button>
                      <StickyNote key={note.Id} noteData={note} />
                    </div>
                  </div>
                </Draggable>
              )
            })}
           
        </div>
      </div>
    </div>
  )
}

export default Home;


