import React from 'react'
import {isMobile} from 'react-device-detect'

const ParallaxItem = (props:any) => {
  let left:number = 10;
  if(typeof window!=='undefined')
    left = isMobile?10:150;  

  return (

    <div className="content__item relative w-auto mt-20">
      <span className="hidden md:block content__item-number absolute text-[200px] top-28 right-20 opacity-30">
        {props.no}
      </span>
      
      <div className="relative overflow-hidden w-full h-[250px] md:h-[550px]" >
        <div className="content__item-img absolute w-full bg-cover bg-center opacity-80 h-[250px] md:h-[550px]"
          style={{backgroundImage: props.imgURL}}
        />
      </div>

      <div className="absolute"></div>

      <p className="relative text-right text-14 font-normal md:pl-[200px] md:pr-8 mt-4">{props.description}</p>

      <h2 className="content__item-title relative text-[80px] md:text-[150px] -mt-10" style={{paddingLeft:left}}>{props.title}</h2>
      
    </div>    
  )
}

export default ParallaxItem