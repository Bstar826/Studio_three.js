import React, {useState, useEffect, useRef} from 'react'
import { gsap } from "gsap"
import Link from 'next/link'
import { motion } from "framer-motion";

const RisingAnimationText3 = (props:any) => {
  const [showText, setShowText]= useState(false)
  const risingRef3= useRef<HTMLHeadingElement>(null)

  
  function AnimationText(){
    let animations = document.getElementsByClassName('animation-text3')    
    if (animations.length>0){
      for(let i=0;i<animations.length;i++){
        let animation=animations[i]
        gsap.to(animation, 1, {top:0, ease: 'expo'});        
      }      
    }
  }

  useEffect(() => {
    window.document.addEventListener('scroll', getPageYScroll);
  },[]);
    
  useEffect(() => {
    if(showText){
      AnimationText();
    }
  },[showText]);
  
  const getPageYScroll = () => {
    if(risingRef3.current){
      if((window.pageYOffset+window.innerHeight*0.8-risingRef3.current.clientHeight)>risingRef3.current.offsetTop){        
        setShowText(true)        
      }
    }
  }

  const buttonOverIn = () =>{
    let cursor = document.getElementById('cursor')
    if(cursor){
      gsap.to(cursor, { scale:4, opacity:0.3});
    }
  }

  const buttonOverOut = () =>{    
    let cursor = document.getElementById('cursor')
    if(cursor){
      gsap.to(cursor, { scale:1, opacity:1});
    }
  }
  const animation = {
    exit : {
      top: 350,
      transition: {
        duration: 1,
        ease: [.19,1,.22,1]
      }
    },
    exitTwo : {
      y: 350,
      opacity: 0,
      transition: {
        duration: 1,
        ease: [.19,1,.22,1]
      }
    },
  }

  return (
    <motion.div exit="exit" ref={risingRef3} className="text-[100px] md:text-[170px] leading-[100px] md:leading-[170px] font-normal">
        <div className='hidden xl:block w-full'>
          <div className='animation-mask3 w-full'>
            <motion.div variants={animation} className='animation-text3 w-full'>
              <div className='flex justify-center items-center w-full'>
                <div className='flex justify-center items-center'>
                  <div>Let’s</div>
                  <div className="flex justify-center ">
                    <div className='text-white flex justify-center items-center relative mx-4'>
                      <img src='img/maskLeft.png' style={{height:'100%', display:props.isDark?'block':'none'}} className="absolute top-0 left-[0px] z-10 pointer-events-none"/>
                      <img src='img/maskleftlight.png' style={{height:'100%', display:props.isDark?'none':'block'}} className="absolute top-0 left-[0px] z-10 pointer-events-none"/>
                      <Link href="/about" scroll={false}>
                        <button className={props.isDark?"animation-button mx-[1px]":"animation-button blue-button mx-[1px]"}
                          style={{border:props.isDark?'solid 3px #fff':'solid 3px #000'}} onMouseMove={buttonOverIn} onMouseLeave={buttonOverOut}
                        >
                          <div className='btn-content h-[84px]'>
                            <div className='btn-content-group mx-6'>
                              <svg width="112" height="46" viewBox="0 0 112 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.65625 25.6875L0.65625 20.3125L106.406 20.3125V25.6875L0.65625 25.6875Z" fill={props.isDark?"#FF3D00":"#0019FF"}/>
                                <rect width="33.7833" height="5.63055" transform="matrix(0.737805 -0.675013 -0.737805 -0.675013 87.0625 45.8438)" fill={props.isDark?"#FF3D00":"#0019FF"}/>
                                <rect width="33.7835" height="5.63058" transform="matrix(-0.737843 -0.674972 -0.737843 0.674972 111.988 22.9611)" fill={props.isDark?"#FF3D00":"#0019FF"}/>
                              </svg>
                            </div>
                          </div>
                        </button>
                      </Link>
                      <img src='img/maskRight.png' style={{height:'100%', display:props.isDark?'block':'none'}} className="absolute top-0 right-[0px] z-10 pointer-events-none"/>
                      <img src='img/maskrightlight.png' style={{height:'100%', display:props.isDark?'none':'block'}} className="absolute top-0 right-[0px] z-10 pointer-events-none"/>
                    </div>            
                  </div>        
                  <div >work</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className='xl:hidden w-full max-w-[540px] md:max-w-[900px] m-auto'>
          <div className='animation-mask3 w-full'>
            <motion.div variants={animation} exit="exit" className='animation-text3 w-full text-left'>Let’s</motion.div>
          </div>
          <div className='animation-mask3 w-full'>
            <motion.div variants={animation} exit="exit" className='animation-text3 w-full text-right'>work</motion.div>
          </div>
          <motion.div variants={animation} exit="exitTwo" className="flex justify-center mt-4">
            <div className='text-white flex justify-center items-center relative mx-4'>
              <Link href="/about" scroll={false}>
                <button className={props.isDark?"animation-button mx-[1px]":"animation-button blue-button mx-[1px]"}
                  style={{border:props.isDark?'solid 3px #fff':'solid 3px #000'}}
                >
                  <div className='btn-content h-[84px]'>
                    <div className='btn-content-group mx-6'>
                      <svg width="112" height="46" viewBox="0 0 112 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0.65625 25.6875L0.65625 20.3125L106.406 20.3125V25.6875L0.65625 25.6875Z" fill={props.isDark?"#FF3D00":"#0019FF"}/>
                        <rect width="33.7833" height="5.63055" transform="matrix(0.737805 -0.675013 -0.737805 -0.675013 87.0625 45.8438)" fill={props.isDark?"#FF3D00":"#0019FF"}/>
                        <rect width="33.7835" height="5.63058" transform="matrix(-0.737843 -0.674972 -0.737843 0.674972 111.988 22.9611)" fill={props.isDark?"#FF3D00":"#0019FF"}/>
                      </svg>
                    </div>
                  </div>            
                </button>
              </Link>
            </div>            
          </motion.div>
        </div>
    </motion.div>  
  )
}

export default RisingAnimationText3