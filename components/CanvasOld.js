import { useEffect, useRef, useState} from 'react';


const Canvas = (props) => {
       // console.log("props: " + JSON.stringify(props));
    const [canvasData, setCanvaseData] = useState(props.canvasData);
        console.log("canvasData: " + JSON.stringify(canvasData));

    let myCanvas = useRef(null);
    useEffect(() => {
        //initialize canvas context
        let ctx = myCanvas.getContext("2d");
        
        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        // ctx.fillRect(30, 30, 50, 50);

        ctx.font = "30px Arial";
        ctx.fillText(canvasData.TextContent ,10,50);

    }, [myCanvas]);


    return (

        <>
            <canvas ref={(el) => (myCanvas = el)} className={props.className} >
                    Your browser does not support the HTML canvas tag.</canvas>
        </>
    )

}


export default Canvas;