import React, { useRef, useState } from 'react'

type Props = {
  isDark?: boolean  
  changeSetDark: (value:boolean) => void
}

const MagneticButton: React.FC<Props> = ({  isDark,  changeSetDark,  ...otherProps}) => {  

  return (
    <>    
        <button className="button  left-4 bottom-4 cursor-pointer"
          onClick={ () => changeSetDark(!isDark) }
        >
					<div className="button__filler"></div>
					<span className="button__text">
						<span className="button__text-inner" >Dark/Light</span>
					</span>
				</button>
    </>
  )
}

export default MagneticButton
