import React, {useState, useEffect, useRef} from 'react'
import { gsap } from "gsap"
import { motion } from "framer-motion";
const RisingAnimationText = (props:any) => {  
  const risingTextRef= useRef<HTMLHeadingElement>(null)
  const [animation, setanimation] = useState(false)

  useEffect(() => {
    if (props.autoAnimation){

      if(risingTextRef.current){
          let animations = document.getElementsByClassName(props.animateName)  
          if (animations.length > 0) {
            for (let i = 0; i < animations.length; i++) {
              let animation = animations[i]
              gsap.to(animation, 1.5, { top: 0, opacity:1, ease: 'expo', delay:3.2 + 0.5*i });  
            }
          }
      }
    }else{
      window.addEventListener("scroll", () => {
        if (!animation) {
          const clientHeight = document.documentElement.clientHeight;
          if(risingTextRef.current){
            const dotTextSectionY = risingTextRef.current.getBoundingClientRect().y;
            const dotTextSectionheight = risingTextRef.current.getBoundingClientRect().height;

            if (clientHeight > dotTextSectionY + (dotTextSectionheight * 2)/4) {
              let animations = document.getElementsByClassName(props.animateName)  
              if (animations.length > 0) {
                for (let i = 0; i < animations.length; i++) {
                  let animation = animations[i]
                  gsap.to(animation, 1.5, { top: 0, opacity:1, ease: 'expo' });  
                }
                setanimation(true)  
              }
            }
          }          
        }
      })
    }

  }, []);

  const FadeOutAnimation = {
    exit : {
      y: 100,
      opacity: 1,
      transition: {
        duration: 1.0,
        ease: [.19,1,.22,1]
      }
    },
  }

  return (
    <div className='overflow-hidden'>
      <motion.div exit="exit" ref={risingTextRef}>
        {props.children}
      </motion.div>  
    </div>
  )
}

export default RisingAnimationText