import React,{useState, useEffect, useRef} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { motion } from "framer-motion";
import {gsap} from 'gsap'
import {CustomEase} from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);
const color1 = '#000'
const color2 = '#e2e2e2'

const MobileMenu = (props:any) => {

  const router = useRouter()

  const [isDark, setDark] = useState(true)
  const footer = useRef<HTMLHeadingElement>(null)
  const closebtn = useRef<HTMLHeadingElement>(null)
  const body = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if(props.state){
      AnimationText();
    }
  }, [props.state])

  function closeMenu(){
    exitAnimation()
    setTimeout(()=>{
      props.changeState(false)
    },2500)
  }

  const movePage = (value:string) =>{
    exitAnimation()
    setTimeout(()=>{
      props.changeState(false)
      router.push(value)
    },2500)
    setTimeout(()=>{
      router.push(value)
    },500)
  }

  const changeDarkTheme = (value:boolean) => {
    localStorage.setItem('dark', value?'1':'0')
    setDark(value)
  }
  
  function AnimationText(){
    if (body.current){      
      if (body.current) {
        gsap.fromTo(body.current, 0.5, {x:'800', }, {x: 0,  delay: 0 });
      }
    }

    let divisitonAnimations = document.getElementsByClassName('mobile-menu-division')
    if (divisitonAnimations.length > 0) {
      for (let i = 0; i < divisitonAnimations.length; i++) {
        let animation = divisitonAnimations[i]
        gsap.fromTo(animation, 0.5, {width:0}, { width: '100%', delay: 0.5 });
      }
    }
    
    let animations = document.getElementsByClassName('mobile-menu-text-animation')
    if (animations.length > 0) {
      for (let i = 0; i < animations.length; i++) {
        let animation = animations[i]
        gsap.to(animation, 0.2, { top: 0, delay: 1 + 0.2 * i });
      }
    }
    
    if (closebtn.current){      
      if (closebtn.current.children.length > 0) {
        for (let i = 0; i < closebtn.current.children.length; i++) {
          let animation = closebtn.current.children[i]
          gsap.fromTo(animation, 0.2, {y:100, }, {y: 0,  delay: 2 });
        }
      }
    }
    
    let contactanimations = document.getElementsByClassName('mobile-menu-contact-animation')
    if (contactanimations.length > 0) {
      for (let i = 0; i < contactanimations.length; i++) {
        let animation = contactanimations[i]
        gsap.to(animation, 0.2, { top: 0, delay: 2.2 });
      }
    }
    
    if (footer.current){      
      if (footer.current.children.length > 0) {
        for (let i = 0; i < footer.current.children.length; i++) {
          let animation = footer.current.children[i]
          gsap.to(animation, 0.2, {opacity: 1, y: 0,  delay: 2.8 + 0.2 * i });
        }
      }
    }
  }
  
  const exitAnimation = () => {
    
    if (body.current){      
      if (body.current) {
        gsap.fromTo(body.current, 0.5, {x:0, }, {x: 800,  delay: 1.8 });
      }
    }

    let divisitonAnimations = document.getElementsByClassName('mobile-menu-division')
    if (divisitonAnimations.length > 0) {
      for (let i = 0; i < divisitonAnimations.length; i++) {
        let animation = divisitonAnimations[i]
        gsap.fromTo(animation, 0.2, {width:'100%'}, { width: 0, delay: 1 + 0.2 });
      }
    }

    let animations = document.getElementsByClassName('mobile-menu-text-animation')
    if (animations.length > 0) {
      for (let i = 0; i < animations.length; i++) {
        let animation = animations[i]
        gsap.to(animation, 0.2, { top: 200, delay: 0.2 * i });
      }
    }
    
    if (closebtn.current){      
      if (closebtn.current.children.length > 0) {
        for (let i = 0; i < closebtn.current.children.length; i++) {
          let animation = closebtn.current.children[i]
          gsap.to(animation, 0.2, {opacity: 1, y: 200, delay: 1 });
        }
      }
    }
    
    let contactanimations = document.getElementsByClassName('mobile-menu-contact-animation')
    if (contactanimations.length > 0) {
      for (let i = 0; i < contactanimations.length; i++) {
        let animation = contactanimations[i]
        gsap.to(animation, 0.2, { top: 200, delay: 1.4 });
      }
    }
    
    if (footer.current){      
      if (footer.current.children.length > 0) {
        for (let i = 0; i < footer.current.children.length; i++) {
          let animation = footer.current.children[i]
          gsap.to(animation, 0.2, {opacity: 1, y: 200, delay: 1.6 + 0.2* i });
        }
      }
    }
  }

  useEffect(() => {
    var studioDark = localStorage.getItem('dark')
    if(studioDark===null){
      localStorage.setItem('dark','1')
    }else{
      setDark(studioDark==='1')
    }
  }, [])

  return (
    <>
        <div className='relative w-full pt-10 px-6 top-[0px] uppercase h-[100vh]  overflow-hidden flex justify-center'
          style={{ backgroundColor:isDark?color1:color2,  color:isDark?color2:color1, }}
          ref={body}
        >
          <motion.div exit='exit' className="content">
            
            <div className='relative w-full h-[22px] overflow-hidden'>
              <motion.div  className="mobile-menu-text-animation text-20 font-bold absolute top-[100px] left-0">
                <Link href={'/service'}><a>STUDIO©</a></Link>
              </motion.div>
            </div>
            
            <motion.div className='pt-[60px] text-[50px] leading-[50px]'>
              <div className='relative w-full py-[2%] overflow-hidden'>
                <motion.div  className="mobile-menu-text-animation font-normal relative top-[100px] left-0">
                  <div className='flex items-start' onClick={()=>movePage('/service')}>
                    <div className='text-[15px] mr-5 -mt-[3%]'>01</div>
                    Sevices
                  </div>
                </motion.div>
              </div>

              <div className='mobile-menu-division' style={{borderBottom:isDark?'1px solid #e2e2e2':'1px solid #000000'}}/>

              <div className='relative w-full py-[2%] overflow-hidden'>
                <motion.div  className="mobile-menu-text-animation font-normal relative top-[100px] left-0">
                  <div className='flex items-start' onClick={()=>movePage('/#')}>
                    <div className='text-[15px] mr-5 -mt-[3%]'>02</div>
                    work
                  </div>
                </motion.div>
              </div>

              <div className='mobile-menu-division' style={{borderBottom:isDark?'1px solid #e2e2e2':'1px solid #000000'}}/>

              <div className='relative w-full py-[2%] overflow-hidden'>
                <motion.div  className="mobile-menu-text-animation font-normal relative top-[100px] left-0">
                  <div className='flex items-start' onClick={()=>movePage('/about')}>
                    <div className='text-[15px] mr-5 -mt-[3%]'>03</div>
                    about
                  </div>
                </motion.div>
              </div>

              <div className='mobile-menu-division' style={{borderBottom:isDark?'1px solid #e2e2e2':'1px solid #000000'}}/>

              <div className='relative w-full py-[2%] overflow-hidden'>
                <motion.div  className="mobile-menu-text-animation font-normal relative top-[100px] left-0">
                  <div className='flex items-start' onClick={()=>movePage('/contact')}>
                    <div className='text-[15px] mr-5 -mt-[3%]'>04</div>
                    contact
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <div className='w-16 mx-auto ' style={{paddingTop:'calc( (100vh - 626px)/3)', paddingBottom:'calc( (100vh - 626px)/3)', }}>
              <div className='overflow-hidden' ref={closebtn} onClick={() => closeMenu()}>
                <svg width="64" height="66" viewBox="0 0 64 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="62.7071" y1="2.70711" x2="0.707106" y2="64.7071" stroke={isDark?'white':'black'} strokeWidth="2"/>
                  <line x1="0.707107" y1="1.29289" x2="62.7071" y2="63.2929" stroke={isDark?'white':'black'} strokeWidth="2"/>
                </svg>                 
              </div>
            </div>
            
            <motion.div>
              <div className='text-[16px] flex' style={{paddingBottom:'calc( (100vh - 626px)/6)', }}>
                <div className='w-[220px]'>
                  <div className='relative h-[20px] overflow-hidden'>
                    <motion.p  className="mobile-menu-contact-animation font-normal absolute top-[100px] left-0">
                      Behance
                    </motion.p>
                  </div>
                  <div className='relative h-[20px] overflow-hidden'>
                    <motion.p  className="mobile-menu-contact-animation font-normal absolute top-[100px] left-0">
                      Facebook
                    </motion.p>
                  </div>
                  <div className='relative h-[20px] overflow-hidden'>
                    <motion.p  className="mobile-menu-contact-animation font-normal absolute top-[100px] left-0">
                      Instagram
                    </motion.p>
                  </div>
                  <div className='relative h-[20px] overflow-hidden'>
                    <motion.p  className="mobile-menu-contact-animation font-normal absolute top-[100px] left-0">
                      Linkedin
                    </motion.p>
                  </div>
                </div>
                
                <div className='w-full'>
                  <div className='relative h-[20px] overflow-hidden'>
                    <motion.p  className="mobile-menu-contact-animation font-normal absolute top-[100px] left-0">
                      (213) 533-8208
                    </motion.p>
                  </div>
                  <div className='relative h-[20px] overflow-hidden'>
                    <motion.p  className="mobile-menu-contact-animation font-normal absolute top-[100px] left-0 underline">
                      studio@sTUDIO.co
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>

            <section id='footer'>
              <motion.section ref={footer}>
                <div style={{opacity:0, transform:"translate(0,200px)"}}>
                  <div className='text-white flex items-center relative mx-4 md:ml-16'>
                    <img src='img/maskLeft.png' style={{height:'100%', display:isDark?'block':'none'}} className="absolute top-0 left-[0px] z-10 pointer-events-none"/>
                    <img src='img/maskleftlight.png' style={{height:'100%', display:isDark?'none':'block'}} className="absolute top-0 left-[0px] z-10 pointer-events-none"/>
                    <button className={isDark?"animation-button mx-[1px]":"animation-button blue-button mx-[1px]"} onClick={() => changeDarkTheme(!isDark)}
                      style={{border:isDark?'solid 3px #FF5C00':'solid 3px #0019FF'}}
                    >
                      <div className='btn-content' style={{height:'56px !important', color:isDark?'white':'black'}}>
                        <div className='btn-content-group mx-4 text-[32px]'>
                          SDA / LA
                        </div>
                      </div>            
                    </button>
                    <img src='img/maskRight.png' style={{height:'100%', display:isDark?'block':'none'}} className="absolute top-0 right-[0px] z-10 pointer-events-none"/>
                    <img src='img/maskrightlight.png' style={{height:'100%', display:isDark?'none':'block'}} className="absolute top-0 right-[0px] z-10 pointer-events-none"/>
                  </div>                  
                </div>
                <p style={{opacity:0, transform:"translate(0,200px)"}} className="text-16 text-center mt-4">2022© STUDIO LLC. All Rights Reserved.</p>  
              </motion.section>
            </section>
            
          </motion.div>
        </div>
    </>
  )
}
export default MobileMenu