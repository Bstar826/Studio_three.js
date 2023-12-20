import React from 'react'

const HoverImageEffect = (props:any) => {

  const onclicked = () => {
    props.openDetails({
      title:props.text, 
      details:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ", 
      url:props.imageRef.src
    })
  }
  
  return (
    <>
      <div className="hidden md:block mx-8"
        onClick={onclicked}
      >
        {props.text}&nbsp;&nbsp;&nbsp;{props.text}&nbsp;&nbsp;&nbsp;{props.text}&nbsp;&nbsp;&nbsp;{props.text}&nbsp;&nbsp;&nbsp;{props.text}&nbsp;&nbsp;&nbsp;{props.text}&nbsp;&nbsp;&nbsp;{props.text}&nbsp;&nbsp;&nbsp;{props.text}&nbsp;&nbsp;&nbsp;{props.text}&nbsp;&nbsp;&nbsp;
      </div>
      <div className="md:hidden mx-4" onClick={onclicked} >
        {props.text}&nbsp;&nbsp;&nbsp;{props.text}&nbsp;&nbsp;&nbsp;{props.text}&nbsp;&nbsp;&nbsp;{props.text}&nbsp;&nbsp;&nbsp;{props.text}&nbsp;&nbsp;&nbsp;{props.text}&nbsp;&nbsp;&nbsp;{props.text}&nbsp;&nbsp;&nbsp;{props.text}&nbsp;&nbsp;&nbsp;{props.text}&nbsp;&nbsp;&nbsp;
      </div>
    </>       
  )
}

export default HoverImageEffect