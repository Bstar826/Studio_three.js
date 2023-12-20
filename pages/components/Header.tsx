import React,{useState, useEffect} from 'react'
import Link from 'next/link'
import MobileMenu from './MobileMenu'
import { FaBars } from "react-icons/fa"
import { motion } from "framer-motion"
import {gsap} from 'gsap'
import {CustomEase} from "gsap/CustomEase"

gsap.registerPlugin(CustomEase);

const Header = () => {

  const [mobileMenu, SetMobileMenu] = useState(false)

  const changeMenuState = (value:boolean) => {
    SetMobileMenu(value)
  }

  function AnimationText(){

    let animations = document.getElementsByTagName('a')
    
    CustomEase.create("cubic-bezier", ".19,1,.22,1")
    if (animations.length > 0) {
      for (let i = 0; i < animations.length; i++) {
        let animation = animations[i]
        gsap.fromTo(animation, 1, {y:200, opacity:1}, { opacity:1, y:0, ease: 'cubic-bezier' ,delay: (2 + (i / 6)) });

      }
    }

  }
    
  useEffect(() => {
    window.onload = () => {
      AnimationText()
    };   
  });
  
  const animation = {
    exit : {
      y: 200,
      opacity: 1,
      transition: {
        duration: 1.0,
        ease: [.19,1,.22,1],
        delay:0.5, 
      }
    },
  }
  
  return (
    <>

      <motion.div exit='exit' className="md:hidden">
        <div className='overflow-hidden'>
          <motion.div id="header" className="w-full flex justify-between items-center uppercase top-0 left-0 py-11">
            
            <motion.a href="/" variants={animation} className="text-24 font-bold">
              Studio&copy;
            </motion.a>
            
            <motion.a href="#" variants={animation} className="text-14 font-normal" onClick={()=>alert('Design Studio')}>
              Design Studio
            </motion.a>
            
            <motion.a href="#" variants={animation} className="text-14 font-normal" onClick={()=>changeMenuState(true)}>
              <FaBars />              
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      <div id="header" className="hidden md:block overflow-hidden relative">
        <motion.div exit='exit' className="w-full flex justify-between uppercase top-0 left-0 py-11">
          <Link href="/">
            <motion.a variants={animation} className="text-24 cursor-pointer font-bold">Studio&copy;</motion.a>
          </Link>
          
          <Link href="#">
            <motion.a variants={animation} className="text-14 cursor-pointer font-normal leading-[14px]" onClick={()=>alert('Design Studio')}>
              Design Studio<br/>
              <b className="underline font-normal">studio&#64;studio.com</b>
            </motion.a>
          </Link>
          
          <Link href="/service">
            <motion.a variants={animation} className="text-14 cursor-pointer font-normal">
              SERVICES  /  Work            
            </motion.a>
          </Link>
          
          <div className='w-8'></div>
          <Link href="/about">
              <motion.a variants={animation} className="text-14 cursor-pointer font-normal absolute right-20">
                About&nbsp;&nbsp;/
              </motion.a>
            </Link>

            <Link href="/contact">
              <motion.a variants={animation} className="text-14 cursor-pointer font-normal absolute right-2">
                &nbsp;&nbsp;CONTACT
              </motion.a>
            </Link>
        </motion.div>
      </div>

      <div className="mobile-menu w-full z-50 fixed top-0 left-0" >
        <div className='relative w-full h-auto max-w-[390px] mx-auto '
          style={{
            display:mobileMenu?'block':'none',
          }}
        >
          <MobileMenu state = {mobileMenu} changeState = {changeMenuState}/>
        </div>
      </div>
    </>
  )

}
export default Header