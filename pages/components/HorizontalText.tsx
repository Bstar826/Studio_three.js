import React, {useState, useEffect, useRef} from 'react'
import { gsap } from "gsap"
import { isMobile } from 'react-device-detect'
import Horizontal from './Horizontal'
import { motion } from "framer-motion";


const HorizontalText = (props:any) => {

  const [originScrollY, setOriginScrollY] = useState(0)  
  const [offsetLeft, setOffsetLeft] = useState(-1000)
  const [imageLeft, setImageLeft] = useState(0  )

  let boxRef = useRef<HTMLHeadingElement>(null)
  let imgRef = useRef<HTMLHeadingElement>(null)
  
  useEffect(() => {
    window.addEventListener('scroll', () => {
      let delta = window.scrollY-originScrollY
      let newoffset = offsetLeft + delta * props.step * 0.2
      if (newoffset < -1500)
        newoffset = 0
      if (newoffset>=0)
        newoffset = -1500
      if(imgRef){
        const _delta = (window.scrollY * props.step * 0.1) % 350
        let offsetX = (props.step < 0) ? 350 + _delta : _delta
        gsap.to(imgRef.current, 0.1, { 
          x: offsetX 
        });
      }
      setOffsetLeft(newoffset)
      setOriginScrollY(window.scrollY)
    })
  }, [])
      
  useEffect(() => {
    gsap.to(boxRef.current, 0.1, { 
      x: offsetLeft
    });
  },[offsetLeft]);
      
  // useEffect(() => {    
  //   gsap.to(imgRef.current, 0.1, { 
  //     x: imageLeft
  //   });
  // },[imageLeft]);

  
  const changeShowState = (value:boolean) => {
    
    if (isMobile) 
      return
    if(value){
      // setAutoPlay(props.index)
      props.changeCanvasImageState(props.index)
      return
    }
    else{
      // setAutoPlay(-1)
      props.changeCanvasImageState(-1)
      return
    }
  }

  return (
    <>
      <div className="text-[50px] md:text-[88px] leading-[55px] md:leading-[70px] md:my-4 relative opacity-0">
        A
      </div>

      <div className="w-full absolute left-0 overflow-hidden -mt-24">
        <div>
          <div ref={boxRef} className="text-[50px] md:text-[88px] leading-[55px] md:leading-[70px] md:my-4 marquee-effect"
            onMouseEnter={() => changeShowState(true)}
            onMouseLeave={() => changeShowState(false)} 
          >
            <Horizontal text={props.text}/>
          </div>
        </div>
        <div className='absolute top-0.5 sm:hidden' ref={imgRef} style={{left:imageLeft}} >
          <img src={props.url} className="w-[100px] h-[52px]" alt='project'/>
        </div>
      </div>
    </>       
  )
}

export default HorizontalText