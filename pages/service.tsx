import React,{useState, useEffect, useRef} from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { FaCircle } from "react-icons/fa"

import FollowCursor from './components/FollowerCursor'
import Header from './components/Header'
import RisingAnimationText from './components/RisingAnimationText'
import DotText from './components/DotText'
import RisingAnimationText3 from './components/RisingAnimationText3'
import HoverEffectOnImage from './components/HoverEffectOnImage'
import RisingAnimationDiv from './components/RisingAnimationDiv'
import DivisionLine from './components/DivisionLine'

import { motion } from "framer-motion";
import {CustomEase} from "gsap/CustomEase";
import {gsap} from 'gsap'
gsap.registerPlugin(CustomEase);
const color1 = '#000000'
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
        ease: [.19,1,.22,1],
        delay:0.5
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
        <title>Studio/Services</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div style={{backgroundColor:isDark?color1:color2, color:isDark?color2:color1}}>
        <div className="main-wrapper w-full h-full overflow-hidden uppercase" 
        >
          <Header/>

          <motion.div exit='exit' className="content">
            
            <section className="title-text sm:mb-[0px] md:mb-[150px] lg:mb-[0px] sm:text-[53px] md:text-[62px] lg:text-[85px] xl:text-[97px] leading-[50px] md:leading-[100px] text-center">
              <motion.div  ref={textOne} className="title1 mt-32">
                <div className='relative overflow-hidden h-[100px]'>
                  <motion.p variants={animation} className="animation-text1" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lorem ipsum dolor</motion.p>
                </div>
                <div className='relative overflow-hidden h-[100px]'>
                  <motion.p variants={animation}  className="animation-text1" >sit amet, consectetur</motion.p>
                </div>
                <div className='relative overflow-hidden h-[100px]'>
                  <motion.p variants={animation}  className="animation-text1 flex items-center" >
                    adipiscin.                      
                    
                    <div className='text-white flex justify-center items-center relative ml-8'>
                      <img src='img/maskLeft.png' style={{height:'100%', display:isDark?'block':'none'}} className="absolute top-0 left-[0px] z-10 pointer-events-none"/>
                      <img src='img/maskleftlight.png' style={{height:'100%', display:isDark?'none':'block'}} className="absolute top-0 left-[0px] z-10 pointer-events-none"/>
                      <Link scroll={false} href="/about">
                        <a className={isDark?"animation-button border-gray-700 mx-[1px]":"animation-button blue-button border-gray-700 mx-[1px]"}
                          onMouseMove={buttonOverIn} onMouseLeave={buttonOverOut}>
                          <div className='btn-content h-[70px]' style={{color:isDark?'white':'black'}}>
                            <div className='btn-content-group'>
                              <div className='mx-2 text-16'>OUR SERVICES</div><div className='mx-2'>{allow}</div>
                            </div>
                          </div>            
                        </a>
                      </Link>                      
                      <img src='img/maskRight.png' style={{height:'100%', display:isDark?'block':'none'}} className="absolute top-0 right-[0px] z-10 pointer-events-none"/>
                      <img src='img/maskrightlight.png' style={{height:'100%', display:isDark?'none':'block'}} className="absolute top-0 right-[0px] z-10 pointer-events-none"/>
                    </div>
                    
                  </motion.p>
                </div>
              </motion.div>

              <div className="title1-mobile mt-10 text-left leading-[55px]">
                <div className='animation-mask'><motion.p variants={animation}  className="animation-text1">Lorem ipsum </motion.p></div>
                <div className='animation-mask'><motion.p variants={animation}  className="animation-text1">dolor sit amet,</motion.p></div>
                <div className='animation-mask'><motion.p variants={animation}  className="animation-text1">consectetur </motion.p></div>
                <div className='animation-mask'><motion.p variants={animation}  className="animation-text1">adipiscin.</motion.p></div>
                
                <div className='animation-mask'>
                  <motion.div variants={animation} className='animation-text1 w-full'>
                    <Link href="/about" >
                          <button className=" border-gray-800 mr-8 h-[50px] flex items-center rounded-full">
                            <span className="text-[16px]">SEE OUR WORK&nbsp;&nbsp;</span>
                            <svg width="30" height="15" viewBox="0 0 30 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="1" y="1" width="28" height="13" rx="6.5" fill={isDark ? "#FF5C00" : "#001AFF" } stroke={isDark ? "#FF5C00" : "#001AFF"} strokeWidth="2"/>
                              <path fillRule="evenodd" clipRule="evenodd" d="M6.32812 7.96875V7.03125L23.2031 7.03125V7.96875L6.32812 7.96875Z" fill={isDark ? "black" : "white"}/>
                              <rect width="5.625" height="0.9375" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 20.1172 11.4844)" fill={isDark ? "black" : "white"}/>
                              <rect width="5.625" height="0.9375" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 24.0938 7.49329)" fill={isDark ? "black" : "white"}/>
                            </svg>
                          </button>
                    </Link>
                  </motion.div>
                </div>
              </div>

              <div className='w-full sm:flex justify-end'>
                <div className='sm:w-[500px] w-full text-14 leading-[16px] mt-8 text-left'>
                  <DotText scrollAnimation={false} text="The pain itself is the love of the pain, the main ecological elite, but I give it as much time as possible to cut it down."/>
                </div>
              </div>
            </section>
            
            <section className="mt-28 mb-20 text-[50px] text-justify">
              <div className='w-full hidden sm:block'>
                <RisingAnimationText autoAnimation={true} animateName="services-text-animate1">
                  <div className=' relative overflow-hidden h-[60px]'>
                    <motion.p exit='exitTwo' variants={animation} className="services-text-animate1 absolute top-[100px] left-0 font-normal">Lorem ipsum dolor sit amet, consectetur</motion.p>
                  </div>
                  <div className=' relative overflow-hidden h-[60px]'>
                    <motion.p exit='exitTwo' variants={animation} className="services-text-animate1 absolute top-[100px] left-0 font-normal">adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</motion.p>
                  </div>
                  <div className=' relative overflow-hidden h-[60px]'>
                    <motion.p exit='exitTwo' variants={animation} className="services-text-animate1 absolute top-[100px] left-0 font-normal">ut labore et dolore magna aliqua.</motion.p>
                  </div>
                </RisingAnimationText>
              </div>

              <div className='w-full sm:hidden text-[40px] leading-[45px]'>
                <RisingAnimationText animateName="services-text-mobile-animate1">
                  <div className=' relative overflow-hidden h-[45px]'>
                    <motion.p variants={animation} className="services-text-mobile-animate1 absolute top-[100px] left-0 font-normal">Lorem ipsum</motion.p>
                  </div>
                  <div className=' relative overflow-hidden h-[45px]'>
                    <motion.p variants={animation} className="services-text-mobile-animate1 absolute top-[100px] left-0 font-normal">dolor sit amet, consectetur</motion.p>
                  </div>
                  <div className=' relative overflow-hidden h-[45px]'>
                    <motion.p variants={animation} className="services-text-mobile-animate1 absolute top-[100px] left-0 font-normal">consectetur</motion.p>
                  </div>
                  <div className=' relative overflow-hidden h-[45px]'>
                    <motion.p variants={animation} className="services-text-mobile-animate1 absolute top-[100px] left-0 font-normal">adipiscing elit,</motion.p>
                  </div>
                  <div className=' relative overflow-hidden h-[45px]'>
                    <motion.p variants={animation} className="services-text-mobile-animate1 absolute top-[100px] left-0 font-normal">sed do eiusmod </motion.p>
                  </div>
                  <div className=' relative overflow-hidden h-[45px]'>
                    <motion.p variants={animation} className="services-text-mobile-animate1 absolute top-[100px] left-0 font-normal">tempor incididunt ut labore et dolore</motion.p>
                  </div>
                  <div className=' relative overflow-hidden h-[45px]'>
                    <motion.p variants={animation} className="services-text-mobile-animate1 absolute top-[100px] left-0 font-normal">incididunt ut labore et dolore</motion.p>
                  </div>
                  <div className=' relative overflow-hidden h-[45px]'>
                    <motion.p variants={animation} className="services-text-mobile-animate1 absolute top-[100px] left-0 font-normal">ut labore et </motion.p>
                  </div>
                  <div className=' relative overflow-hidden h-[45px]'>
                    <motion.p variants={animation} className="services-text-mobile-animate1 absolute top-[100px] left-0 font-normal">dolore magna aliqua.</motion.p>
                  </div>
                  <div className=' relative overflow-hidden h-[45px]'>
                    <motion.p variants={animation} className="services-text-mobile-animate1 absolute top-[100px] left-0 font-normal">aliqua.</motion.p>
                  </div>
                </RisingAnimationText>
              </div>
            </section>

            <section className="mx-auto w-full md:w-[1440px] md:mx-auto h-[236px] sm:h-[709px] mt-[96px]">
              <RisingAnimationDiv classes="w-full md:w-[1440px] md:mx-auto h-[236px] sm:h-[709px] mt-12 sm:mt-20 mb-15">
                <HoverEffectOnImage url="/img/services/image.png" width='1440px' height='709px'/>
              </RisingAnimationDiv>              
            </section>
            
            <section className="mt-48 mb-20">
              <div className='w-full text-14 leading-[16px] mb-20 text-left flex justify-end'>                
                <DotText scrollAnimation={true} text="What we do"/>                
              </div>

              <RisingAnimationText animateName="sevices-design-text-animation">
                <DivisionLine isDark={isDark}/>
                <div className='py-12 grid grid-cols-2 sm:grid-cols-4'>
                  <div className='col-span-2 text-[30px] mb-8 sm:mb-0'>
                    <div className='relative overflow-hidden h-[35px]'>
                      <motion.p variants={animation} className="sevices-design-text-animation absolute top-[100px] left-0" >design</motion.p>
                    </div>                    
                  </div>
                  
                  <div className='text-[20px]'>
                    <div className='relative overflow-hidden h-[24px]'>
                      <motion.p variants={animation} className="sevices-design-text-animation absolute top-[100px] left-0" >Service1</motion.p>
                    </div>
                    <div className='relative overflow-hidden h-[24px]'>
                      <motion.p variants={animation} className="sevices-design-text-animation absolute top-[100px] left-0" >Service2</motion.p>
                    </div>
                    <div className='relative overflow-hidden h-[24px]'>
                      <motion.p variants={animation} className="sevices-design-text-animation absolute top-[100px] left-0" >Service3</motion.p>
                    </div>
                    <div className='relative overflow-hidden h-[24px]'>
                      <motion.p variants={animation} className="sevices-design-text-animation absolute top-[100px] left-0" >Service4</motion.p>
                    </div>
                    <div className='relative overflow-hidden h-[24px]'>
                      <motion.p variants={animation} className="sevices-design-text-animation absolute top-[100px] left-0" >Service5</motion.p>
                    </div>
                  </div>
                  
                  <div className=''>
                    <div className='relative overflow-hidden h-[60px]'>
                      <motion.div variants={animation} className="sevices-design-text-animation absolute top-[100px] left-0" >
                        <Image src={'/img/services/shopify.png'} width='117' height='59' alt='design'/>
                      </motion.div>
                    </div>                    
                  </div>

                </div>
              </RisingAnimationText>

              <RisingAnimationText animateName="sevices-content-text-animation">                
                <DivisionLine isDark={isDark}/>
                <div className={`py-12 grid grid-cols-2 sm:grid-cols-4`}>
                  <div className='col-span-2 text-[30px] mb-8 sm:mb-0'>
                    <div className='relative overflow-hidden h-[35px]'>
                      <motion.p variants={animation} className="sevices-content-text-animation absolute top-[100px] left-0" >content</motion.p>
                    </div>                    
                  </div>
                  
                  <div className=''>
                    <div className='relative overflow-hidden h-[60px]'>
                      <motion.div variants={animation} className="sevices-content-text-animation absolute top-[100px] left-0" >
                        <Image src={'/img/services/shopify.png'} width='117' height='59' alt='design'/>
                      </motion.div>
                    </div>                    
                  </div>
                  
                  <div className='text-[20px]'>
                    <div className='relative overflow-hidden h-[24px]'>
                      <motion.p variants={animation} className="sevices-content-text-animation absolute top-[100px] left-0" >Service1</motion.p>
                    </div>
                    <div className='relative overflow-hidden h-[24px]'>
                      <motion.p variants={animation} className="sevices-content-text-animation absolute top-[100px] left-0" >Service2</motion.p>
                    </div>
                    <div className='relative overflow-hidden h-[24px]'>
                      <motion.p variants={animation} className="sevices-content-text-animation absolute top-[100px] left-0" >Service3</motion.p>
                    </div>
                    <div className='relative overflow-hidden h-[24px]'>
                      <motion.p variants={animation} className="sevices-content-text-animation absolute top-[100px] left-0" >Service4</motion.p>
                    </div>
                  </div>

                </div>
              </RisingAnimationText>

              <RisingAnimationText animateName="sevices-strategy-text-animation">
                <DivisionLine isDark={isDark}/>
                <div className=' py-12 grid grid-cols-2 sm:grid-cols-4'>
                  <div className='col-span-2 text-[30px] mb-8 sm:mb-0'>
                    <div className='relative overflow-hidden h-[35px]'>
                      <motion.p variants={animation} className="sevices-strategy-text-animation absolute top-[100px] left-0" >strategy</motion.p>
                    </div>                    
                  </div>
                  
                  <div className='text-[20px]'>
                    <div className='relative overflow-hidden h-[24px]'>
                      <motion.p variants={animation} className="sevices-strategy-text-animation absolute top-[100px] left-0" >Service1</motion.p>
                    </div>
                    <div className='relative overflow-hidden h-[24px]'>
                      <motion.p variants={animation} className="sevices-strategy-text-animation absolute top-[100px] left-0" >Service2</motion.p>
                    </div>
                    <div className='relative overflow-hidden h-[24px]'>
                      <motion.p variants={animation} className="sevices-strategy-text-animation absolute top-[100px] left-0" >Service3</motion.p>
                    </div>
                  </div>
                  
                  <div className=''>
                    <div className='relative overflow-hidden h-[60px]'>
                      <motion.div variants={animation} className="sevices-strategy-text-animation absolute top-[100px] left-0" >
                        <Image src={'/img/services/shopify.png'} width='117' height='59' alt='design'/>
                      </motion.div>
                    </div>                    
                  </div>

                </div>
              </RisingAnimationText>

              <RisingAnimationText animateName="sevices-support-text-animation">
                <DivisionLine isDark={isDark}/>
                <div className='py-12 grid grid-cols-2 sm:grid-cols-4'>
                  <div className='col-span-2 text-[30px] mb-8 sm:mb-0'>
                    <div className='relative overflow-hidden h-[35px]'>
                      <motion.p variants={animation} className="sevices-support-text-animation absolute top-[100px] left-0" >support</motion.p>
                    </div>                    
                  </div>
                  
                  <div className=''>
                    <div className='relative overflow-hidden h-[60px]'>
                      <motion.div variants={animation} className="sevices-support-text-animation absolute top-[100px] left-0" >
                        <Image src={'/img/services/shopify.png'} width='117' height='59' alt='design'/>
                      </motion.div>
                    </div>                    
                  </div>
                  
                  <div className='text-[20px]'>
                    <div className='relative overflow-hidden h-[24px]'>
                      <motion.p variants={animation} className="sevices-support-text-animation absolute top-[100px] left-0" >Service1</motion.p>
                    </div>
                    <div className='relative overflow-hidden h-[24px]'>
                      <motion.p variants={animation} className="sevices-support-text-animation absolute top-[100px] left-0" >Service2</motion.p>
                    </div>
                    <div className='relative overflow-hidden h-[24px]'>
                      <motion.p variants={animation} className="sevices-support-text-animation absolute top-[100px] left-0" >Service3</motion.p>
                    </div>
                    <div className='relative overflow-hidden h-[24px]'>
                      <motion.p variants={animation} className="sevices-support-text-animation absolute top-[100px] left-0" >Service4</motion.p>
                    </div>
                  </div>

                </div>
                <DivisionLine isDark={isDark}/>
              </RisingAnimationText>
            </section>

            <section id='footer'>
              <section className="mt-[110px] md:mt-[250px]  mb-[110px]">
                <RisingAnimationText3 isDark={isDark}/>
                <div className="h-10 md:hidden"/>
                <div className="w-full flex justify-end md:mt-4">
                  <div className="hidden md:block text-16 w-[400px] mr-[150px]">
                    <DotText scrollAnimation={true} text="For new and established businesses alike, we specialize in building and managing your eCommerce store with confidence."/>
                  </div>
                  <div className="text-14 w-full px-8 md:hidden">
                    <DotText scrollAnimation={true} text="For new and established businesses alike, we specialize in building and managing your eCommerce store with confidence."/>
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