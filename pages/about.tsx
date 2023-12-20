import React,{useState, useEffect, useRef} from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import * as THREE from "three"

import FollowCursor from './components/FollowerCursor'
import Header from './components/Header'
import DotText from './components/DotText'
import HoverEffectOnImage from './components/HoverEffectOnImage'
import RisingAnimationText3 from './components/RisingAnimationText3'
import RisingAnimationText from './components/RisingAnimationText'
import SmoothScroll from './components/SmoothScroll'
import Landing from './components/Landing'
import { motion } from "framer-motion";
import TweenLite ,{gsap} from 'gsap'
import {CustomEase} from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);

const Home: NextPage = () => {  
  const [isDark, setDark] = useState(true)   
  const swiperImages = useRef<HTMLHeadingElement>(null);
  const textOne = useRef<HTMLHeadingElement>(null);
  const buttonOne = useRef<HTMLButtonElement>(null)
  const footer = useRef<HTMLHeadingElement>(null)
  const letswork = useRef<HTMLHeadingElement>(null)

  const color1 = '#000'
  const color2 = '#e2e2e2'

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

      
    
      let specialTextAnimations = document.getElementsByClassName('special-text-animation')

      if (specialTextAnimations.length > 0) {
        for (let i = 0; i < specialTextAnimations.length; i++) {
          let specialTextAnimation = specialTextAnimations[i]
          const letsworkSectionY = specialTextAnimation.getBoundingClientRect().y;
          const letsworkSectionheight = specialTextAnimation.getBoundingClientRect().height;
          if (clientHeight > letsworkSectionY + (letsworkSectionheight* 2) / 3) {
              gsap.to(specialTextAnimation, 1, {opacity: 1, x: 0, ease: 'cubic-bezier', delay: (1.5) });
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
        <title>Studio/About</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{backgroundColor:isDark?color1:color2, color:isDark?color2:color1}}>
        <div className="main-wrapper w-full h-full overflow-hidden uppercase" 
        >
          <Header/>
          <motion.div exit='exit' className="content">
            
            <section className="title-text fluid__item fluid__item--home fluid__item--current sm:mb-[0px] md:mb-[150px] lg:mb-[0px] sm:text-[53px] md:text-[62px] lg:text-[85px] xl:text-[97px] leading-[50px] md:leading-[100px]">
              <motion.div  ref={textOne} className="title1 mt-32">
                <div className='relative overflow-hidden h-[100px]'>
                  <motion.p variants={animation} className="animation-text1" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The pain itself is love,</motion.p>
                </div>
                <div className='relative overflow-hidden h-[100px]'>
                  <motion.p variants={animation}  className="animation-text1" >but the pain is the main</motion.p>
                </div>
                <div className='relative overflow-hidden h-[100px]'>
                  <motion.p variants={animation}  className="animation-text1" >reason to do so</motion.p>
                </div>
              </motion.div>

              <div className="title1-mobile mt-10 text-[40px] font-normal">
                <div className='animation-mask -mb-4 leading-12'><motion.p variants={animation}  className="animation-text1">&nbsp;&nbsp;&nbsp;&nbsp;Lorem ipsum</motion.p></div>
                <div className='animation-mask -mb-4 leading-12'><motion.p variants={animation}  className="animation-text1">dolor sit amet,</motion.p></div>
                <div className='animation-mask -mb-4 leading-12'><motion.p variants={animation}  className="animation-text1">consectetur</motion.p></div>
                <div className='animation-mask -mb-4 leading-12'><motion.p variants={animation}  className="animation-text1">adipiscing elit,</motion.p></div>
                <div className='animation-mask -mb-4 leading-12'><motion.p variants={animation}  className="animation-text1">sed do</motion.p></div>
                <div className='animation-mask -mb-4 leading-12'><motion.p variants={animation}  className="animation-text1">eiusmod</motion.p></div>
              </div>


              <div className="mt-8 sm:mt-0 text-14 leading-[16px] w-full flex justify-end">
                <div className='w-[460px]'>
                  <DotText scrollAnimation={false} leftalign={false} text="The pain itself is the love of the pain, the main ecological elite, but I give it as much time as possible to cut it down."/>
                </div>
              </div>
            </section>
            
            <section className="about-image mt-20 sm:mt-32 w-full md:w-[1440px] md:mx-auto h-[236px] sm:h-[858px]">
              <motion.section exit='exitTwo' variants={animation}  style={{opacity:0, transform:"translate(0,200px)"}} ref={swiperImages}
                className="about-image mt-20 mt-32 w-full md:w-[1440px] md:mx-auto h-[236px] sm:h-[858px]">                
                <HoverEffectOnImage url="/img/about/image.png" width='1440px' height='858px'/>
              </motion.section>
            </section>            
            
            <section className="sm:mb-[0px] md:mb-[150px] lg:mb-[0px] text-[35px] sm:text-[53px] md:text-[62px] lg:text-[85px] xl:text-[97px] leading-[50px] md:leading-[100px] mt-[100px] sm:mt-[200px]">
              <div className='hidden sm:block'>
                <RisingAnimationText animateName="about-text-animate1">
                  <div className='animate-mask relative overflow-hidden h-[100px]'>
                    <motion.p variants={animation} className="about-text-animate1 absolute top-[300px] left-0" >&nbsp;&nbsp;The pain itself is the love</motion.p>
                  </div>
                  <div className='animate-mask relative overflow-hidden h-[100px]'>
                    <motion.p variants={animation}  className="about-text-animate1 absolute top-[300px] left-0" >of the pain, the main</motion.p>
                  </div>
                  <div className='animate-mask relative overflow-hidden h-[100px]'>                    
                    <motion.p variants={animation}  className="about-text-animate1 absolute top-[300px] left-0">
                      <span className='relative'>
                        <span className='absolute z-0 special-text-animation transform -translate-x-[2000px]' 
                          style={{background:isDark?color2:color1, color:isDark?color2:color1}}
                        >ecological problems</span>
                        <span className='relative z-10' style={{color:isDark?color1:color2}}>ecological problems</span>
                      </span>, but
                    </motion.p>
                  </div>
                  <div className='animate-mask relative overflow-hidden h-[100px]'>
                    <motion.p variants={animation}  className="about-text-animate1 absolute top-[300px] left-0" >I give this kind of time to</motion.p>
                  </div>
                  <div className='animate-mask relative overflow-hidden h-[100px]'>
                    <motion.p variants={animation}  className="about-text-animate1 absolute top-[300px] left-0" > fall down, so that some</motion.p>
                  </div>
                  <div className='animate-mask relative overflow-hidden h-[100px]'>
                    <motion.p variants={animation}  className="about-text-animate1 absolute top-[300px] left-0" > great pain and pain. For</motion.p>
                  </div>
                  <div className='animate-mask relative overflow-hidden h-[100px]'>
                    <motion.p variants={animation}  className="about-text-animate1 absolute top-[300px] left-0" >the purpose of coming to</motion.p>
                  </div>
                  <div className='animate-mask relative overflow-hidden h-[100px]'>
                    <motion.p variants={animation}  className="about-text-animate1 absolute top-[300px] left-0" >a minimum, who of ours</motion.p>
                  </div>
                  <div className='animate-mask relative overflow-hidden h-[100px]'>
                    <motion.p variants={animation}  className="about-text-animate1 absolute top-[300px] left-0" >should exercise any</motion.p>
                  </div>
                  <div className='animate-mask relative overflow-hidden h-[100px]'>
                    <motion.p variants={animation}  className="about-text-animate1 absolute top-[300px] left-0" >employment except to</motion.p>
                  </div>
                  <div className='animate-mask relative overflow-hidden h-[100px]'>
                    <motion.p variants={animation}  className="about-text-animate1 absolute top-[300px] left-0" >take advantage of the</motion.p>
                  </div>
                  <div className='animate-mask relative overflow-hidden h-[100px]'>
                    <motion.p variants={animation}  className="about-text-animate1 absolute top-[300px] left-0" >consequences from it.</motion.p>
                  </div>
                </RisingAnimationText>
              </div>

              <div className='sm:hidden'>
                <RisingAnimationText animateName="about-text-mobile-animate1">
                  <div className='animate-mask relative overflow-hidden h-[40px]'>
                    <motion.p variants={animation} className="about-text-mobile-animate1 absolute top-[300px] left-0" >&nbsp;&nbsp;The pain itself is the love</motion.p>
                  </div>
                  <div className='animate-mask relative overflow-hidden h-[40px]'>
                    <motion.p variants={animation}  className="about-text-mobile-animate1 absolute top-[300px] left-0" >THE LOVE OF THE PAIN, THE MAIN</motion.p>
                  </div>
                  <div className='animate-mask relative overflow-hidden h-[40px]'>
                    <motion.p variants={animation}  className="about-text-mobile-animate1 absolute top-[300px] left-0">
                      <span style={{color:isDark?color1:color2, background:isDark?color2:color1}}>ecological </span>
                    </motion.p>
                  </div>
                  <div className='animate-mask relative overflow-hidden h-[40px]'>
                    <motion.p variants={animation}  className="about-text-mobile-animate1 absolute top-[300px] left-0">
                      <span style={{color:isDark?color1:color2, background:isDark?color2:color1}}>problems</span>, I GIVE
                    </motion.p>
                  </div>
                  <div className='animate-mask relative overflow-hidden h-[40px]'>
                    <motion.p variants={animation}  className="about-text-mobile-animate1 absolute top-[300px] left-0" >this kind of time to</motion.p>
                  </div>
                  <div className='animate-mask relative overflow-hidden h-[40px]'>
                    <motion.p variants={animation}  className="about-text-mobile-animate1 absolute top-[300px] left-0" >FALL DOWN, SO </motion.p>
                  </div>
                  <div className='animate-mask relative overflow-hidden h-[40px]'>
                    <motion.p variants={animation}  className="about-text-mobile-animate1 absolute top-[300px] left-0" >THAT SOME GREAT</motion.p>
                  </div>
                  <div className='animate-mask relative overflow-hidden h-[40px]'>
                    <motion.p variants={animation}  className="about-text-mobile-animate1 absolute top-[300px] left-0" >PAIN AND PAIN.</motion.p>
                  </div>
                </RisingAnimationText>
              </div>

              <div className="md:flex justify-between items-center mt-8 sm:mt-16">
                <div className='text-14 w-full sm:w-[500px]'>
                  <DotText scrollAnimation={true} leftalign={true} text="our mission is to assist passionate brands to compete at a high level through strategy-led design."/>
                </div>

                <div className="h-6 md:hidden"/>

                <motion.div exit='exitTwo' variants={animation} className="flex justify-center">
                  <div className='text-white flex justify-center items-center relative'>
                    <img src='img/maskLeft.png' style={{height:'100%', display:isDark?'block':'none'}} className="absolute top-0 left-[0px] z-10 pointer-events-none"/>
                    <img src='img/maskleftlight.png' style={{height:'100%', display:isDark?'none':'block'}} className="absolute top-0 left-[0px] z-10 pointer-events-none"/>
                    <Link scroll={false} href="/about">
                    <button ref={buttonOne} style={{opacity:0, transform:"translate(0,200px)"}}  className={isDark?"animation-button border-gray-700 mx-[1px]":"animation-button blue-button border-gray-700 mx-[1px]"}
                      onMouseMove={buttonOverIn} onMouseLeave={buttonOverOut}>
                      <div className='btn-content h-[70px]' style={{color:isDark?'white':'black'}}>
                        <div className='btn-content-group'>
                          <div className='mx-2 text-16'>OUR SERVICES</div><div className='mx-2'>{allow}</div>
                        </div>
                      </div>            
                    </button>
                    </Link>
                    
                    <img src='img/maskRight.png' style={{height:'100%', display:isDark?'block':'none'}} className="absolute top-0 right-[0px] z-10 pointer-events-none"/>
                    <img src='img/maskrightlight.png' style={{height:'100%', display:isDark?'none':'block'}} className="absolute top-0 right-[0px] z-10 pointer-events-none"/>
                  </div>
                </motion.div>
              </div>
            </section>

            <section id='footer'>
              <section className="mt-[110px] md:mt-[250px]  mb-[110px]">
                <RisingAnimationText3 isDark={isDark}/>
                <div className="h-10 md:hidden"/>
                <div className="w-full flex justify-end md:mt-4">
                  <div className="hidden md:block text-16 w-[400px] mr-[150px]">
                    <DotText scrollAnimation={true} leftalign={false} text="For new and established businesses alike, we specialize in building and managing your eCommerce store with confidence."/>
                  </div>
                  <div className="text-14 w-full px-8 md:hidden">
                    <DotText scrollAnimation={true} leftalign={false} text="For new and established businesses alike, we specialize in building and managing your eCommerce store with confidence."/>
                  </div>
                </div>
              </section>

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

              <motion.section  variants={animation} exit="exit" className="flex justify-center items-center -mx-16 pt-[100px] h-[120px] md:h-[120px] overflow-hidden">
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