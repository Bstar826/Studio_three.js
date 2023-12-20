import React,{useState, useEffect} from 'react'
import Link from 'next/link'
import { motion } from "framer-motion";
import {gsap} from 'gsap'
import {CustomEase} from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);

const Horizontal = (props:any) => {
  
  const animation = {
    exit : {
      y: 200,
      opacity: 1,
      transition: {
        duration: 1.0,
        ease: [.19,1,.22,1]
      }
    },
  }
  return (
    <>
        {       
          <div className="marquee_effect-left">
            <div className='opacity-0'>{props.text}</div>
            <div className="marquee ">
              <div className="marquee__inner">
                <motion.div exit='exit' className='marquee-item relative'>
                  <Link scroll={true} href="/project">
                    <motion.a variants={animation}>
                      &nbsp;{props.text}
                      &nbsp;{props.text}
                      &nbsp;{props.text}
                      &nbsp;{props.text}
                      &nbsp;{props.text}
                      &nbsp;{props.text}
                      &nbsp;{props.text}
                      &nbsp;{props.text}
                      &nbsp;{props.text}
                      &nbsp;{props.text}
                      &nbsp;{props.text}
                      &nbsp;{props.text}
                      &nbsp;{props.text}
                      &nbsp;{props.text}
                      &nbsp;{props.text}
                      &nbsp;{props.text}
                      &nbsp;{props.text}
                      &nbsp;{props.text}
                      &nbsp;{props.text}
                      &nbsp;{props.text}
                      &nbsp;{props.text}
                      &nbsp;{props.text}
                    </motion.a>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        }
    </>       
  )
}

export default Horizontal