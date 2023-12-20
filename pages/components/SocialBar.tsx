import React, {useState, useEffect, useRef} from 'react'
import { gsap } from "gsap"

import { motion } from "framer-motion";

import Link from 'next/link';


const SocialBar = (props:any) => {
  
  let boxRef = useRef<HTMLHeadingElement>(null)
      
  useEffect(() => {    
    gsap.to(boxRef.current, 1, { 
      y: 0,
      opacity:2,
      delay:3.5
    });

    window.addEventListener('scroll', () => {
      gsap.to(boxRef.current, 0.5, { 
        x:- window.scrollY,        
      });
    })
  },[]);

  const animation = {
    exit : {
      y: 100,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: [.19,1,.22,1]
      }
    },
  }

  return (
    <>
      {
        <div className='overflow-hidden'>
          <div className="h-[100px]">
            <div className='absolute left-0 w-full h-[100px] overflow-hidden'>
              <motion.div variants={animation} exit="exit">
                <div className="w-fit text-black font-normal text-[30px] md:text-[64px] leading-[35px] md:leading-[70px] marquee-effect 
                  h-[60px] sm:h-[100px] pt-3.5 bg-[#FF3D00]" ref={boxRef} style={{opacity:0, transform:"translate(0,200px)"}}>
                  <Link href={'#'}>
                    <a target={'_blank'}>
                      &nbsp;&nbsp;Facebook&nbsp;&nbsp;/
                    </a>
                  </Link>
                  <Link href={'#'}>
                    <a target={'_blank'}>
                      &nbsp;&nbsp;INSTAGRAM&nbsp;&nbsp;/
                    </a>
                  </Link>
                  <Link href={'#'}>
                    <a target={'_blank'}>
                      &nbsp;&nbsp;LINKEDIN&nbsp;&nbsp;/
                    </a>
                  </Link>
                  <Link href={'#'}>
                    <a target={'_blank'}>
                      &nbsp;&nbsp;Facebook&nbsp;&nbsp;/
                    </a>
                  </Link>
                  <Link href={'#'}>
                    <a target={'_blank'}>
                      &nbsp;&nbsp;INSTAGRAM&nbsp;&nbsp;/
                    </a>
                  </Link>
                  <Link href={'#'}>
                    <a target={'_blank'}>
                      &nbsp;&nbsp;LINKEDIN&nbsp;&nbsp;/
                    </a>
                  </Link>
                  <Link href={'#'}>
                    <a target={'_blank'}>
                      &nbsp;&nbsp;Facebook&nbsp;&nbsp;/
                    </a>
                  </Link>
                  <Link href={'#'}>
                    <a target={'_blank'}>
                      &nbsp;&nbsp;INSTAGRAM&nbsp;&nbsp;/
                    </a>
                  </Link>
                  <Link href={'#'}>
                    <a target={'_blank'}>
                      &nbsp;&nbsp;LINKEDIN&nbsp;&nbsp;/
                    </a>
                  </Link>
                </div>
              </motion.div>
              </div>
            </div>
        </div>
      }
    </>       
  )
}

export default SocialBar