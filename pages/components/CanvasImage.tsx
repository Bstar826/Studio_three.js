import React, {useState, useEffect} from 'react'

const CanvasImage = (props:any) => {

  const canvasRef  = React.useRef(null)  
  let ctx:any = null;
 
  // initialize the canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvas:any = canvasRef.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
 
    // get context of the canvas
    ctx = canvas.getContext("2d");
  }, []);
  useEffect(() => {
    const r1Info = { x: 20, y: 30, w: 100, h: 50 };
    const r1Style = { borderColor: 'red', borderWidth: 10 };
    drawRect(r1Info, r1Style);
 
    const r2Info = { x: 100, y: 100, w: 80, h: 150 };
    drawRect(r2Info);
 
  }, []);
 
  // draw rectangle
  const drawRect = (info: { x: any; y: any; w: any; h: any; }, style = {}) => {
    const { x, y, w, h } = info;
    
 
    ctx.beginPath();
    ctx.strokeStyle = '#dddddd';
    ctx.lineWidth = '1px';
    ctx.rect(x, y, w, h);
    ctx.stroke();
  }
 
  return (
    <>
      <canvas ref={canvasRef} style={{width:'400px', height:'300px', border:'2px solid green', opacity:0}}></canvas>
    </>       
  )
}

export default CanvasImage