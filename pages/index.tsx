import React,{useState, useEffect, useRef} from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import * as THREE from "three"

import FollowerCursor from './components/FollowerCursor'
import Header from './components/Header'
import DotText from './components/DotText'
import HorizontalText from './components/HorizontalText'
import RisingAnimationText2 from './components/RisingAnimationText2'
import RisingAnimationText3 from './components/RisingAnimationText3'
import ParallaxEffect from './components/ParallaxEffectThree'
import SmoothScroll from './components/SmoothScroll'
import Landing from './components/Landing'
import { motion } from "framer-motion";
import TweenLite ,{gsap} from 'gsap'
import {CustomEase} from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);
const color1 = '#000'
const color2 = '#e2e2e2'

const Home: NextPage = () => {  
  const [isDark, setDark] = useState(true)
  const [showCanvasImage, setShowCanvasImage] = useState(false)
  const [canvasPlane, setCanvasPlane] = useState(new THREE.Mesh( new THREE.PlaneBufferGeometry(1, 1, 32, 32), new THREE.ShaderMaterial({ uniforms: { time: { value: 1.0 }, resolution: {value: new THREE.Vector2()}}})))
  const [scene, setScene] = useState(new THREE.Scene())
  const [indexTexture, setIndexTexture] = useState(0)
  const [viewport, setViewPort] = useState({width:0, height:0, aspectRatio:1})
  const [viewSize, setViewSize] = useState({distance:3, vFov:0, height:1, width:1})
  const [cursorPos, setPosition] = useState({x:0, y:0})
  const [uniforms, setUniforms] = useState({uTexture: {value: new THREE.Texture},uOffset: {value: new THREE.Vector2(0.0, 0.0)},uAlpha: {value: 1.0}})
  const swiperImages = useRef<HTMLHeadingElement>(null);
  const textOne = useRef<HTMLHeadingElement>(null);
  const buttonOne = useRef<HTMLButtonElement>(null)
  const footer = useRef<HTMLHeadingElement>(null)
  const letswork = useRef<HTMLHeadingElement>(null)
  let mouse = new THREE.Vector2()
  let camera: any
  let container: any

  const changeCanvasImageState = (value:number) =>{    
    if(value===-1)
    {
      setShowCanvasImage(false)      
    }
    else{
      setIndexTexture(value)
      let _uniforms = uniforms
      const loader = new THREE.TextureLoader();
      loader.load(
        `img/img0${value}.jpg`,
        function ( _texture ) {
          _uniforms.uTexture.value = _texture
          setUniforms(_uniforms)
        },
        undefined,
        function ( err ) {
          console.error( 'error in texture loading');
        }
      )      
      setShowCanvasImage(true) 
    }
  }

  function threerender(){
    container = document.getElementById('hover-image-canvas')
    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true });
    container.appendChild( renderer.domElement )

    const viewport = {
      width : container.clientWidth,
      height : container.clientHeight,
      aspectRatio : container.clientWidth / container.clientHeight
    }
    
    camera = new THREE.PerspectiveCamera( 40, viewport.aspectRatio, 0.1, 100 )
    camera.position.set(0, 0, 3)
    
    const viewSize = {
      distance : camera.position.z,
      vFov : (camera.fov * Math.PI) / 180,
      height : 2 * Math.tan((camera.fov * Math.PI) / 180 / 2) * camera.position.z,
      width : 2 * Math.tan((camera.fov * Math.PI) / 180 / 2) * camera.position.z * viewport.aspectRatio,
    }

    setViewPort(viewport)
    setViewSize(viewSize)
    renderer.setClearColor('#000000', 0)
    renderer.setSize(viewport.width, viewport.height)
    renderer.setPixelRatio(window.devicePixelRatio)
    
    const loader = new THREE.TextureLoader();
    loader.load(
      `img/img0${indexTexture}.jpg`,
      function ( _texture ) {
        uniforms.uTexture.value = _texture
        const material1 = new THREE.ShaderMaterial({
          uniforms: uniforms,
          vertexShader: `
            uniform vec2 uOffset;
            varying vec2 vUv;    
            vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
              float M_PI = 3.1415926535897932384626433832795;
              position.x = position.x + (sin(uv.y * M_PI) * offset.x);
              position.y = position.y + (sin(uv.x * M_PI) * offset.y);
              return position;
            }
    
            void main() {
              vUv = uv;
              vec3 newPosition = position;
              newPosition = deformationCurve(position,uv,uOffset);
              gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
            }`,
          fragmentShader: `
            uniform sampler2D uTexture;
            uniform float uAlpha;
            uniform vec2 uOffset;    
            varying vec2 vUv;
    
            vec3 rgbShift(sampler2D rgbTexture, vec2 uv, vec2 offset) {
              float r = texture2D(rgbTexture,vUv + uOffset).r;
              vec2 gb = texture2D(rgbTexture,vUv).gb;
              // float g= texture2D(rgbTexture,vUv).y;
              // float b= texture2D(rgbTexture,vUv).z;
              return vec3(r, gb);
            }
    
            void main() {
              vec3 color = rgbShift(uTexture,vUv,uOffset);
              gl_FragColor = vec4(color,uAlpha);
            }`,
          transparent: false
        })
        const geometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32)
        const Plane = new THREE.Mesh(geometry, material1)
        let imageRatio = _texture.image.naturalWidth/_texture.image.naturalHeight
        const scale = new THREE.Vector3(imageRatio, 1, 1)          
        Plane.scale.copy(scale)
        
        mouse.x = (cursorPos.x / viewport.width) * 2 - 1
        mouse.y = -(cursorPos.y / viewport.height) * 2 + 1
        
        let x = mouse.x * viewSize.width/2;
        let y = mouse.y * viewSize.height/2;

        Plane.position.set(x,y,0)
        setCanvasPlane(Plane)
        scene.add(Plane)
      },
      undefined,
      function ( err ) {
        console.error( 'error in texture loading');
      }
    ); 

    window.addEventListener( 'resize', onWindowResize );
    function onWindowResize() {
      container = document.getElementById('hover-image-canvas')
      
      const viewport = {
        width : container.clientWidth,
        height : container.clientHeight,
        aspectRatio : container.clientWidth / container.clientHeight
      }
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      
      const viewSize = {
        distance : camera.position.z,
        vFov : (camera.fov * Math.PI) / 180,
        height : 2 * Math.tan((camera.fov * Math.PI) / 180 / 2) * camera.position.z,
        width : 2 * Math.tan((camera.fov * Math.PI) / 180 / 2) * camera.position.z * viewport.aspectRatio,
      }
      
      setViewPort(viewport)
      setViewSize(viewSize)
      renderer.setSize( window.innerWidth, window.innerHeight );
    }

    animate();
    function animate() {
      requestAnimationFrame( animate );
      renderer.render( scene, camera );
    }
  }

  const changeDarkTheme = (value:boolean) => {
    localStorage.setItem('dark', value?'1':'0')
    setDark(value)
  }
  
  useEffect(() => {
    // get normalized mouse position on viewport
    mouse.x = (cursorPos.x / viewport.width) * 2 - 1
    mouse.y = -(cursorPos.y / viewport.height) * 2 + 1
    
    let x = mouse.x * viewSize.width/2;
    let y = mouse.y * viewSize.height/2;
    const newPos = new THREE.Vector3(x, y,0)

    TweenLite.to(canvasPlane.position, 2, {
      x: x,
      y: y,
      ease: "Power4.easeOut",
      onUpdate: ()=> onPositionUpdate(newPos)
    })
  })

  const onPositionUpdate = (pos:any) => {
    // compute offset
    let offset = canvasPlane.position.clone().sub(pos).multiplyScalar(-0.2)
    uniforms.uOffset.value.x = offset.x
    uniforms.uOffset.value.y = offset.y
  }

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

  useEffect(() => {    
    if(typeof window !== "undefined"){
      threerender()
      AnimationText();
    }

    window.addEventListener("mousemove", (event: { clientX: number; clientY: number }) => {
      setPosition({x:event.clientX, y:event.clientY})      
    });  
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
        duration: 1.5,
        ease: [.19,1,.22,1],
        delay:1
      }
    },
    exitTwo : {
      y: 300,
      opacity:1,
      transition: {
        duration: 1.5,
        ease: [.19,1,.22,1],
        delay:0.5
      }
    },
    exit3 : {
      y: 300,
      opacity:1,
      transition: {
        duration: 1.5,
        ease: [.19,1,.22,1]
      }
    },
  }

  return (
    <>
      <Head>
        <title>Studio</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Landing/>
      <div style={{backgroundColor:isDark?color1:color2, color:isDark?color2:color1}}>
        <div className="main-wrapper w-full h-full overflow-hidden uppercase" 
        >
          <Header/>
          <motion.div exit='exit' className="content">
            
            <section className="title-text fluid__item fluid__item--home fluid__item--current sm:mb-[0px] md:mb-[150px] lg:mb-[0px] sm:text-[53px] md:text-[62px] lg:text-[85px] xl:text-[97px] leading-[50px] md:leading-[100px]">
              <motion.div ref={textOne} exit='exitTwo' className="title1 mt-32">
                <div className='animation-mask'>
                  <motion.p variants={animation} className="animation-text1" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Independent</motion.p>
                </div>
                <div className='animation-mask '>
                  <motion.p variants={animation}  className="animation-text1" >DEVELOPMENT&nbsp;studio</motion.p>
                </div>
                <div className='animation-mask sm:w-4/5 xl:w-full h-[200px]'>
                  <motion.div variants={animation} className='animation-text1 '>
                    <div className="flex flex-wrap justify-between items-center">
                      <p className=" text-justify">based&nbsp;</p>
                      <p className=" text-justify">in</p>
                      <div className='text-white flex justify-center items-center relative mx-5' >
                        <img src='img/maskLeft.png' style={{ height: '100%', display: isDark ? 'block' : 'none' }} className="absolute top-0 left-[0px] z-10 pointer-events-none" />
                        <img src='img/maskleftlight.png' style={{ height: '100%', display: isDark ? 'none' : 'block' }} className="absolute top-0 left-[0px] z-10 pointer-events-none" />
                        <button className={isDark ? "animation-button  border-gray-700 mx-[1px]" : "animation-button blue-button  border-gray-700 mx-[1px]"}
                          onMouseEnter={buttonOverIn} onMouseLeave={buttonOverOut}>
                          <div className='btn-content h-[70px]' style={{ color: isDark ? 'white' : 'black' }}>
                            <div className='btn-content-group'>
                              <div className='mx-2 text-16'>LET’S TALK</div><div className='mx-2'>{allow}</div>
                            </div>
                          </div>
                        </button>
                        <img src='img/maskRight.png' style={{ height: '100%', display: isDark ? 'block' : 'none' }} className="absolute top-0 right-[0px] z-10 pointer-events-none" />
                        <img src='img/maskrightlight.png' style={{ height: '100%', display: isDark ? 'none' : 'block' }} className="absolute top-0 right-[0px] z-10 pointer-events-none" />
                      </div>
                      <div className='flex sm:justify-between sm:w-4/5 xl:w-fit '>
                        <p className="text-justify mr-8">los </p>
                        <p className="text-justify">angeles</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
              <div className="title1-mobile mt-10">
                <div className='animation-mask'><motion.p variants={animation}  className="animation-text1">Independent</motion.p></div>
                <div className='animation-mask'><motion.p variants={animation}  className="animation-text1">DEVELOPMENT</motion.p></div>
                <div className='animation-mask'><motion.p variants={animation}  className="animation-text1">studio based</motion.p></div>
                
                <div className='animation-mask'>
                  <motion.div variants={animation} className='animation-text1 w-full'>
                    <div className='flex justify-between items-center'>
                      <p className=" text-justify  flex items-center">in</p>
                        <Link href="/about" >
                          <button className=" border-gray-800 mr-8 h-[50px] flex items-center rounded-full">
                            <span className="text-[16px]">LET’S TALK&nbsp;&nbsp;</span>
                            <svg width="30" height="15" viewBox="0 0 30 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="1" y="1" width="28" height="13" rx="6.5" fill={isDark ? "#FF5C00" : "#001AFF" } stroke={isDark ? "#FF5C00" : "#001AFF"} strokeWidth="2"/>
                              <path fillRule="evenodd" clipRule="evenodd" d="M6.32812 7.96875V7.03125L23.2031 7.03125V7.96875L6.32812 7.96875Z" fill={isDark ? "black" : "white"}/>
                              <rect width="5.625" height="0.9375" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 20.1172 11.4844)" fill={isDark ? "black" : "white"}/>
                              <rect width="5.625" height="0.9375" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 24.0938 7.49329)" fill={isDark ? "black" : "white"}/>
                            </svg>
                          </button>
                        </Link>
                    </div>
                  </motion.div>
                </div>                
                <div className='animation-mask'>
                  <motion.div variants={animation}  className="animation-text1 flex justify-between items-center w-full ">
                    <p className=" text-justify  flex items-center">los</p>
                    <p className=" text-justify  flex items-center mr-8">angeles</p>
                  </motion.div>
                </div>
              </div>
              <div className="text-14 font-normal w-full md:w-[500px]">                
                <DotText scrollAnimation={false} leftalign={true} text="For new and established businesses alike, we specialize in building and managing your eCommerce store with confidence."/>
              </div>
            </section>

            <motion.section exit='exit3' variants={animation}  style={{opacity:0, transform:"translate(0,200px)"}} ref={swiperImages}>
              <div className='md:hidden h-[100px]'/>
              <ParallaxEffect/>
            </motion.section>

            <section className="mt-[50px] mb-[110px] md:mb-[250px]">
              <div className="h-[50px] hidden md:block"></div>
              
              <div className='flex justify-end'>                
                <DotText scrollAnimation={true} text="about" />
              </div>

              <div className="h-[30px]"></div>

              <RisingAnimationText2/>
              
              <div className="md:flex justify-between items-center mt-4">

                <div className='w-full md:w-[500px] flex justify-end'>
                  <DotText scrollAnimation={true}  text="our mission is to assist passionate brands to compete at a high level through strategy-led design."/>
                </div>

                <div className="h-6 md:hidden"/>

                <div className='overflow-hidden'>
                  <motion.div exit='exitTwo' variants={animation} className="flex justify-center ">
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
              </div>
            </section>

            <div className='w-full max-w-[1440px] mx-auto text-14 flex justify-end'>
              <DotText scrollAnimation={true} leftalign={false} text="SELECT PROJECTS" />
              <div className="h-[80px] md:h-[30px]"></div>
            </div>
            <motion.section animate={{transition:{staggerChildren: 0.5}}} className="horizontal-section" >
              <div className='overflow-hidden'>
                <motion.div exit={{y: 800, opacity: 1, transition: { duration: 1, ease: [.19,1,.22,1] } }}>
                  <HorizontalText step={-1.0} text="VICIS PRO /" url={'img/img00.jpg'} index={0} changeCanvasImageState={changeCanvasImageState}/>
                  <HorizontalText step={ 1.0} text="OPEN FORMAT /" url={'img/img01.jpg'} index={1} changeCanvasImageState={changeCanvasImageState}/>
                  <HorizontalText step={-0.6} text="BLUEPRINT PHOENIX /" url={'img/img02.jpg'} index={2} changeCanvasImageState={changeCanvasImageState}/>
                  <HorizontalText step={ 0.6} text="TWELVES /" url={'img/img03.jpg'} index={3} changeCanvasImageState={changeCanvasImageState}/>
                  <HorizontalText step={-1.5} text="CROOKS&CASTLES /" url={'img/img04.jpg'} index={4} changeCanvasImageState={changeCanvasImageState}/>
                  <HorizontalText step={ 1.5} text="JASON MARKK /" url={'img/img05.jpg'} index={5} changeCanvasImageState={changeCanvasImageState}/>
                </motion.div>
              </div>
            </motion.section>
            
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
                <p ref={footer} style={{transform:"translate(0,200px)"}} className="text-[180px] md:text-[240px] font-bold text-center mt-4">STUDIO©</p>  
              </motion.section>
            </section>
            
          </motion.div>
        </div>
        <div id='hover-image-canvas' className="pointer-events-none" 
          style={{width:'100%', height:'100%', position:'fixed', left:0, top:0, zIndex:1, 
          opacity:showCanvasImage?1:0.0, transition:'opacity 0.3s ease-out' }}/>

        <div className="hidden md:block"><FollowerCursor/></div>
      </div>
    </>
  )
}
export default Home