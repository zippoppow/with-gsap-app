import { useEffect, useRef, useState} from 'react'
import { gsap } from 'gsap';


import Canvas from './CanvasOld';

const StickyNote = (props) => {

  const [noteData, setNoteData] = useState(props.noteData);

  return (
    <>
      <Canvas canvasData={noteData} className={"note_canvas " + noteData.className} />
    </>

  )
}

export default StickyNote;