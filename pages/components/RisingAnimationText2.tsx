import React, {useState, useEffect, useRef} from 'react'
import { gsap } from "gsap"
import { motion } from "framer-motion";
const RisingAnimationText2 = () => {
  const classesName1 = "text-justify opacity-0"
  const classesName2 = "text-justify animation-text2 opacity-0"
  const risingRef1= useRef<HTMLHeadingElement>(null)
  const [animation, setanimation] = useState(false)


  useEffect(() => {

    window.addEventListener("scroll", () => {
      if (!animation) {
        const clientHeight = document.documentElement.clientHeight;
        if(risingRef1.current){
          const dotTextSectionY = risingRef1.current.getBoundingClientRect().y;
          const dotTextSectionheight = risingRef1.current.getBoundingClientRect().height;
  
          if (clientHeight > dotTextSectionY + (dotTextSectionheight * 2) / 3) {
            let animations = document.getElementsByClassName('animation-text2')
  
            if (animations.length > 0) {
              for (let i = 0; i < animations.length; i++) {
                let animation = animations[i]
                gsap.to(animation, 1.5, { top: 0, ease: 'expo' });
  
              }
              setanimation(true)
  
            }
          }
        }
        
      }
    })

  }, [animation]);

  const FadeOutAnimation = {
    exit : {
      y: 100,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [.19,1,.22,1]
      }
    },
  }

  return (
    <motion.div exit="exit" ref={risingRef1}>      
      <div className='hidden md:block xl:text-[76px] lg:text-[60px] md:text-[44px] leading-[86px]'>
        <div className='animation-mask2'>
          <motion.div variants={FadeOutAnimation} className='animation-text2 strechText'>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div>we&nbsp;</div>
            <div>are&nbsp;</div>
            <div>a&nbsp;</div>
            <div>digital&nbsp;</div> 
            <div>design&nbsp;</div> 
            <div>and</div> 
          </motion.div>
        </div>
        <div className='animation-mask2'>
          <motion.div variants={FadeOutAnimation} className='animation-text2 strechText'>     
            <div>branding&nbsp;</div>
            <div>agency&nbsp;</div>
            <div>focused&nbsp;</div>
            <div>on</div> 
          </motion.div>
        </div>
        <div className='animation-mask2'>
          <motion.div variants={FadeOutAnimation} className='animation-text2 strechText'>
            <div>ecommerce&nbsp;</div>
            <div>development&nbsp;</div>
            <div>for</div>
          </motion.div>
        </div>
        <div className='animation-mask2'>
          <motion.div variants={FadeOutAnimation} className='animation-text2 strechText justify-start'>
            <div>shopify</div>
            <div>&nbsp;&nbsp;merchants</div>
          </motion.div>
        </div>
      </div>
      <div className='md:hidden text-[9vw] leading-[10vw]'>
        <div className='animation-mask2'>
          <motion.div variants={FadeOutAnimation} className='animation-text2 strechText'>
            <div>we</div>
            <div>are</div>
            <div>a</div>
            <div>digital</div> 
          </motion.div>
        </div>
        <div className='animation-mask2'>
          <motion.div variants={FadeOutAnimation} className='animation-text2 strechText'>
            <div>design</div>
            <div>and</div>
          </motion.div>
        </div>
        <div className='animation-mask2'>
          <motion.div variants={FadeOutAnimation} className='animation-text2 strechText'>
            <div>branding</div>
            <div>agency</div>
          </motion.div>
        </div>
        <div className='animation-mask2'>
          <motion.div variants={FadeOutAnimation} className='animation-text2 strechText'>
            <div>focused</div>
            <div>on</div>
          </motion.div>
        </div>
        <div className='animation-mask2'>
          <motion.div variants={FadeOutAnimation} className='animation-text2'>
          eCommerce
          </motion.div>
        </div>
        <div className='animation-mask2'>
          <motion.div variants={FadeOutAnimation} className='animation-text2 strechText'>
            <div>development</div>
            <div>for</div>
          </motion.div>
        </div>
        <div className='animation-mask2'>
          <motion.div variants={FadeOutAnimation} className='animation-text2'>
          Shopify
          </motion.div>
        </div>
        <div className='animation-mask2'>
          <motion.div variants={FadeOutAnimation} className='animation-text2'>
          merchants
          </motion.div>
        </div>
      </div>
    </motion.div>  
  )
}

export default RisingAnimationText2