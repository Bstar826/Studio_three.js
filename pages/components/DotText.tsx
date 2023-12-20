import React,{useRef, useEffect, useState} from 'react'
import { FaCircle } from "react-icons/fa"
import { motion } from "framer-motion";
import { gsap } from "gsap"
import {CustomEase} from "gsap/CustomEase"

gsap.registerPlugin(CustomEase)

const DotText = (props:any) => {

  // const [animation, setanimation] = useState(false)
  const dotTextref = useRef<HTMLHeadingElement>(null)
  let animation:boolean = false

  useEffect(() => {
    if (props.scrollAnimation){
      window.addEventListener("scroll", () => {
        if (!animation){
          const clientHeight = document.documentElement.clientHeight;
          
          if (dotTextref.current){
            const dotTextSectionY = dotTextref.current.getBoundingClientRect().y;
            const dotTextSectionheight = dotTextref.current.getBoundingClientRect().height;
            CustomEase.create("cubic-bezier", ".19,1,.22,1")
            if (clientHeight > dotTextSectionY + dotTextSectionheight + 100 ) {

              gsap.fromTo(dotTextref.current, 1, {y:200}, {opacity:1,y:0 , ease:'cubic-bezier'}) 

              animation = true
            }
          }
          
        }
        
      })
    }else{
      gsap.fromTo(dotTextref.current, 1, {y:200, opacity:0}, {opacity:1,y:0 , ease:'cubic-bezier',delay:3.2})           
    }
  },[]);

  // useEffect(()=>{

  // },[])
  
  return (
    <>
      <div className='overflow-hidden'>
        <motion.div exit={{
            y: 200,
            opacity: 1,
            transition: {
              duration: 0.5,
              ease: [.19,1,.22,1],
              delay:0.5
            }
          }}
          ref={dotTextref}
          className="px-2 w-full flex justify-start overflow-hidden opacity-0">
            <FaCircle className="mt-1.5 text-10"/>
            <div className="w-full ml-3 h-auto" style={{fontFamily:'SpaceMono'}}>{props.text}</div>
        </motion.div>
      </div>
    </>       
  )
}

export default DotText