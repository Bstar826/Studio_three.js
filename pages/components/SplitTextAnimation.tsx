import React from 'react';
import {isMobile} from 'react-device-detect'

const SplitTextAnimation = (props:any) => {  
  
  return (
    <>  
        <p className="text-justify"
          style={{fontSize:props.fontSize, lineHeight:`${props.fontSize}px`}}>
          {props.text}
        </p>
  
    </>       
  )
}

export default SplitTextAnimation