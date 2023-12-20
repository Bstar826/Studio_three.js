import React,{useState, useEffect, useRef} from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { FaCircle } from "react-icons/fa"

import FollowCursor from './components/FollowerCursor'
import Header from './components/Header'
import RisingAnimationText from './components/RisingAnimationText'
import SmoothScroll from './components/SmoothScroll'
import Landing from './components/Landing'
import SocialBar from './components/SocialBar'
import HoverEffectOnImage from './components/HoverEffectOnImage'
import RisingAnimationDiv from './components/RisingAnimationDiv'

import { motion } from "framer-motion";
import {CustomEase} from "gsap/CustomEase";
import {gsap} from 'gsap'
gsap.registerPlugin(CustomEase);
const color1 = '#000'
const color2 = '#e2e2e2'

const Home: NextPage = () => {  
  const [isDark, setDark] = useState(true)   
  const swiperImages = useRef<HTMLHeadingElement>(null);
  const textOne = useRef<HTMLHeadingElement>(null);
  const buttonOne = useRef<HTMLButtonElement>(null)
  const footer = useRef<HTMLHeadingElement>(null)
  const letswork = useRef<HTMLHeadingElement>(null)

  function AnimationText(){

    CustomEase.create("cubic-bezier", ".19,1,.22,1")
    gsap.to(swiperImages.current, 1, { y:0, opacity:1, ease: 'cubic-bezier', delay:3.1});
    
    let animations = document.getElementsByClassName('animation-text1')

    if (animations.length > 0) {
      for (let i = 0; i < animations.length; i++) {
        let animation = animations[i]
        gsap.to(animation, 1, { top: 0, ease: 'cubic-bezier', delay: (2.5 + (i / 4)) });
      }
    }
  }

  const changeDarkTheme = (value:boolean) => {
    localStorage.setItem('dark', value?'1':'0')
    setDark(value)
  }

  useEffect(() => {    
    if(typeof window !== "undefined"){      
      AnimationText();
    } 

    window.addEventListener("scroll" , () => {
      const clientHeight = document.documentElement.clientHeight;
      CustomEase.create("cubic-bezier", ".19,1,.22,1")
      if (buttonOne.current){
        const buttonOneSectionY = buttonOne.current.getBoundingClientRect().y;
        const buttonOneSectionheight = buttonOne.current.getBoundingClientRect().height;

        if (clientHeight > buttonOneSectionY + (buttonOneSectionheight * 2) / 3) {
          gsap.to(buttonOne.current, 1, { opacity: 1, y: 0, ease: 'cubic-bezier' })
        }
      }

      if (footer.current){
        const footerSectionY = footer.current.getBoundingClientRect().y;
        const footerSectionheight = footer.current.getBoundingClientRect().height;
        if (clientHeight > footerSectionY - (footerSectionheight* 2) / 3) {
          gsap.to(footer.current, 1, { y: 0, ease: 'cubic-bezier', delay:1 })
        }
      }

      if (letswork.current){
        const letsworkSectionY = letswork.current.getBoundingClientRect().y;
        const letsworkSectionheight = letswork.current.getBoundingClientRect().height;
        if (clientHeight > letsworkSectionY + (letsworkSectionheight* 2) / 3) {
          // gsap.to(letswork.current, 1, {opacity: 1, y: 0, ease: 'cubic-bezier', delay:0.5 })
          if (letswork.current.children.length > 0) {
            for (let i = 0; i < letswork.current.children.length; i++) {
              let animation = letswork.current.children[i]
              gsap.to(animation, 1, {opacity: 1, y: 0, ease: 'cubic-bezier', delay: (0.5 + (i / 4)) });
            }
          }
        }
      }
      
    });

    var studioDark = localStorage.getItem('dark')
    if(studioDark===null){
      localStorage.setItem('dark','1')
    }else{
      setDark(studioDark==='1')
    }
  }, []) 

  const buttonOverIn = () =>{
    let cursor = document.getElementById('cursor')
    gsap.to(cursor, { scale:3, opacity:0.3});
  }

  const buttonOverOut = () =>{    
    let cursor = document.getElementById('cursor')
    gsap.to(cursor, { scale:1, opacity:1});    
  }

  const allow =
    <svg width="30" height="15" viewBox="0 0 30 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="28" height="13" rx="6.5" fill={isDark?"#FF5C00":"#001AFF"} stroke={isDark?"#FF5C00":"#001AFF"} strokeWidth="2"/>
      <path className="arrow" fillRule="evenodd" clipRule="evenodd" d="M6.32812 7.96875V7.03125L23.2031 7.03125V7.96875L6.32812 7.96875Z" fill="white"/>
      <rect className="arrow" width="5.625" height="0.9375" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 20.1172 11.4844)" fill="white"/>
      <rect className="arrow" width="5.625" height="0.9375" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 24.0938 7.49316)" fill="white"/>
    </svg>

  const animation = {
    exit : {
      y: 300,
      transition: {
        duration: 1,
        ease: [.19,1,.22,1]
      }
    },
    exitTwo : {
      y: 300,
      opacity:1,
      transition: {
        duration: 1,
        ease: [.19,1,.22,1]
      }
    },
  }
  return (
    <>
      <Head>
        <title>Studio/Contact</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div style={{backgroundColor:isDark?color1:color2, color:isDark?color2:color1}}>
        <div className="main-wrapper w-full h-full overflow-hidden uppercase" 
        >
          <Header/>

          <motion.div exit='exit' className="content">
            
            <section className="title-text sm:mb-[0px] md:mb-[150px] lg:mb-[0px] sm:text-[53px] md:text-[62px] lg:text-[85px] xl:text-[97px] leading-[50px] md:leading-[100px] text-center w-[1100px] mx-auto">
              <motion.div exit='exitTwo' ref={textOne} className="title1 mt-32">
                <div className='relative overflow-hidden h-[100px]'>
                  <motion.p variants={animation} className="animation-text1" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Say hello to</motion.p>
                </div>
                <div className='relative overflow-hidden h-[100px]'>
                  <motion.p variants={animation}  className="animation-text1 flex" >
                    studio&copy;
                    <div className='w-[500px] ml-28 mt-[40px] text-[14px] flex items-start leading-[15px]'>
                      <FaCircle/>The pain itself is the love of the pain, the main ecological elite, but I give it as much time as possible to cut it down.
                    </div>
                  </motion.p>
                </div>
                <div className='relative overflow-hidden h-[100px]'>
                  <motion.p variants={animation}  className="animation-text1" >studio@studio.com</motion.p>
                </div>
              </motion.div>

              <div className="title1-mobile mt-10 text-left leading-[40px]">
                <div className='animation-mask -mb-6'><motion.p variants={animation} exit='exitTwo'  className="animation-text1 text-[30px] leading-8">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Say hello to</motion.p></div>
                <div className='animation-mask -mb-6'><motion.p variants={animation} exit='exitTwo'  className="animation-text1 text-[30px] leading-8">studio©</motion.p></div>
                <div className='animation-mask -mb-6'><motion.p variants={animation} exit='exitTwo'  className="animation-text1 text-[30px] leading-8">studio@studio.com </motion.p></div>
                
                <div className='animation-mask mt-8'>
                  <motion.div variants={animation} exit='exitTwo' className='animation-text1'>
                    <div className='text-[12px] flex items-start leading-[14px]'>
                      <FaCircle/> 
                      <div className='ml-2 w-[300px]'>The pain itself is the love of the pain, the main ecological elite, but I give it as much time as possible to cut it down.</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
            
            <section className="mt-16 sm:mt-24 mb-10 sm:mb-20 w-full">
              <SocialBar/>
            </section>
            
            <section className="mx-auto w-full md:w-[1300px] md:mx-auto h-[236px] sm:h-[588px]">
              <RisingAnimationDiv classes="w-full md:w-[1300px] md:mx-auto h-[236px] sm:h-[588px] mt-12 sm:mt-20 mb-15">
                <HoverEffectOnImage url="/img/contact/image.png" width='1300px' height='588px'/>
              </RisingAnimationDiv>              
            </section>
            
            <section className="mt-20 sm:mt-32 mb-20">
              <RisingAnimationText animateName="contact-text-animate1">
                <div className=' relative overflow-hidden h-[40px] sm:h-[90px]'>
                  <motion.p variants={animation} className="contact-text-animate1 absolute top-[100px] left-0 text-[35px] sm:text-[76px] font-normal" >Slide in our DMs</motion.p>
                </div>

                <div className='mt-16 sm:mt-36 sm:flex sm:pl-[40%] font-normal'>
                  <div className='w-[300px]'>
                    <div className=' relative overflow-hidden h-[20px]'>
                      <motion.p variants={animation}  className="contact-text-animate1 absolute top-[100px] text-[14px] left-0" >(888) 888-8888</motion.p>
                    </div>
                    <div className=' relative overflow-hidden h-[20px]'>
                      <motion.p variants={animation}  className="contact-text-animate1 absolute top-[100px] text-[14px] left-0" >studio@studio.com</motion.p>
                    </div>
                    <div className=' relative overflow-hidden h-[40px] mt-10'>
                      <motion.p variants={animation}  className="contact-text-animate1 absolute top-[100px] text-[30px] left-0" >GENERAL</motion.p>
                    </div>
                  </div>
                  
                  <div className='mt-16 sm:mt-0 w-[300px]'>
                    <div className=' relative overflow-hidden h-[20px]'>
                      <motion.p variants={animation}  className="contact-text-animate1 absolute top-[100px] text-[14px] left-0" >Art Director</motion.p>
                    </div>
                    <div className=' relative overflow-hidden h-[20px]'>
                      <motion.p variants={animation}  className="contact-text-animate1 absolute top-[100px] text-[14px] left-0" >Art@studio.coM</motion.p>
                    </div>
                    <div className=' relative overflow-hidden h-[40px] mt-10'>
                      <motion.p variants={animation}  className="contact-text-animate1 absolute top-[100px] text-[30px] left-0" >NEW BUSINESS</motion.p>
                    </div>
                  </div>
                </div>
              </RisingAnimationText>
            </section>

            <section id='footer'>
              <motion.section variants={animation} exit="exitTwo" ref={letswork} className="md:flex justify-between items-center">
                <div style={{opacity:0, transform:"translate(0,200px)"}} className="flex items-center justify-center md:justify-start">
                  <div className='text-white flex justify-center items-center relative mx-4 md:ml-16'>
                    <img src='img/maskLeft.png' style={{height:'100%', display:isDark?'block':'none'}} className="absolute top-0 left-[0px] z-10 pointer-events-none"/>
                    <img src='img/maskleftlight.png' style={{height:'100%', display:isDark?'none':'block'}} className="absolute top-0 left-[0px] z-10 pointer-events-none"/>
                    <button className={isDark?"animation-button mx-[1px]":"animation-button blue-button mx-[1px]"} onClick={() => changeDarkTheme(!isDark)}
                      style={{border:isDark?'solid 3px #FF5C00':'solid 3px #0019FF'}} onMouseMove={buttonOverIn} onMouseLeave={buttonOverOut}
                    >
                      <div className='btn-content' style={{height:'56px !important', color:isDark?'white':'black'}}>
                        <div className='btn-content-group mx-4 text-[32px]'>
                          Dark/Light
                        </div>
                      </div>            
                    </button>
                    <img src='img/maskRight.png' style={{height:'100%', display:isDark?'block':'none'}} className="absolute top-0 right-[0px] z-10 pointer-events-none"/>
                    <img src='img/maskrightlight.png' style={{height:'100%', display:isDark?'none':'block'}} className="absolute top-0 right-[0px] z-10 pointer-events-none"/>
                  </div>
                  <p className="text-14 ml-12 hidden md:block ">DESIGN STUDIO<br/>LOS ANGELES</p>  
                </div>
                <p style={{opacity:0, transform:"translate(0,200px)"}} className="text-14 text-center mt-4 md:hidden pr-16">DESIGN STUDIO<br/>LOS ANGELES&nbsp;&nbsp;&nbsp;</p>  
                <div className="h-[75px] md:hidden"/>
                <p style={{opacity:0, transform:"translate(0,200px)"}} className="text-14 md:ml-6 text-center md:text-left">2022© STUDIO LLC. All Rights Reserved.</p>  
              </motion.section>

              <motion.section  variants={animation} exit="exit" className="flex justify-center items-center mt-4 -mx-16 pt-[100px] h-[120px] md:h-[120px] overflow-hidden">
                <p ref={footer} style={{transform:"translate(0,200px)"}} className="text-[180px] md:text-[240px] font-bold text-center">STUDIO©</p>  
              </motion.section>
            </section>
            
          </motion.div>
        </div>
      </div>

      <div className="hidden md:block"><FollowCursor/></div>
      
    </>
  )
}
export default Home