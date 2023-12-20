import React, {useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

const FollowerCursor = () => {
  
  useEffect(() => {
    window.addEventListener("pointermove", (event: { clientX: number; clientY: number }) => {
      let cursor = document.getElementById('cursor')
      if(cursor){
        let px=event.clientX-10;
        let py=event.clientY-10;
        gsap.to(cursor, 0.10, { y:py, x:px});      
      }
    });
  }, []);

  return (
    <>
      <div id='cursor' className='fixed top-0 left-0 w-[20px] h-[20px] rounded-full pointer-events-none'
        style={{background:'#ff5C00', zIndex:100}}
      />
    </>
  );
}

export default FollowerCursor