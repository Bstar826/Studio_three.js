import React, {useState, useEffect} from 'react'

const CursorFollower = () => {
  
  const CursorFollowerInnerStyle = {
    fill: "var(--cursor-fill)",
    stroke: "var(--cursor-stroke)",
    strokeWidth: "var(--cursor-stroke-width)"
  };

  return (
    <svg className="cursor pointer-events-none opacity-60" width="50" height="50" viewBox="0 0 50 50" style = {{position:'fixed',display:'block', top:0, left:0}}>
      <circle className="cursor__inner" cx="25" cy="25" r="10" style={CursorFollowerInnerStyle}></circle>
    </svg>
  )
}

export default CursorFollower