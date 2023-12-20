import TweenLite, {gsap} from 'gsap'
import React,{useState, useEffect} from 'react'

function Landing(props:any) {
  function AnimationText(){
    gsap.to(".landing-page-animation", 0.5, { 
      top: "-130vh",
      ease: "easeInOut",
      delay: 1.6
    });
  }

  useEffect(() => {
    if(typeof window !== "undefined"){
      AnimationText();
    }
  }, [])
  return (
    <div className="landing-page-animation">

    </div>
  )
}

export default Landing