import React, {useEffect, useRef, useState} from 'react'
import { gsap } from "gsap"
import * as THREE from "three"

const ParallaxEffect = (props:any) => {
  const [imageUrl, setImageUrl]= useState("img/product01.jpg")
  let parallaxRef = useRef<HTMLHeadingElement>(null)
  let titleRef = useRef<HTMLHeadingElement>(null)
  let imageRef = useRef<HTMLHeadingElement>(null)
  const getPageYScroll = (props:any) => {
    if(parallaxRef.current){
      var offsetY = window.innerHeight * 0.5 + window.pageYOffset - parallaxRef.current.offsetTop
      offsetY = offsetY<-200?-200:offsetY
      offsetY = offsetY>window.innerHeight?window.innerHeight:offsetY
      gsap.to(titleRef.current, { y:-offsetY});
      var scale:number
      scale=1+ (window.pageYOffset + window.innerHeight - parallaxRef.current.offsetTop)*0.0005
      gsap.to(imageRef.current, { scale:scale});
    }
  }
  
  useEffect(() => {
    window.addEventListener('scroll', getPageYScroll);
  },[]);
  return (

    <div ref={parallaxRef} id="parallax" className="relative w-auto mt-20 bg-gray-600">
      <div className='absolute right-0 -top-[90px]'>
        <div className='flex justify-end'>
          <button className='px-2' onClick={()=>{setImageUrl('img/product01.jpg')}}>
            <img src='img/product01.jpg' style={{height:70}}/>
          </button>
          <button className='px-2' onClick={()=>{setImageUrl('img/product02.jpg')}}>
            <img src='img/product02.jpg' style={{height:70}}/>            
          </button>
        </div>
      </div>
      
      <div className="relative overflow-hidden w-full h-[250px] md:h-[550px]" >
        <div ref={imageRef} className="content__item-img absolute w-full bg-cover bg-center opacity-80 h-[250px] md:h-[550px]">
          <img src={imageUrl} style={{width:'100%', height:550}}></img>
        </div>
      </div>

      <h2 ref={titleRef} className="absolute text-[80px] md:text-[150px] -mt-10" style={{paddingLeft:'30px'}}>Title</h2>
      
    </div>    
  )
}

export default ParallaxEffect