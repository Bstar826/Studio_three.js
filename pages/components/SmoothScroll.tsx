import React, { useEffect, useRef } from "react";

// import useWindowSize from "../hook/useWindowSize";

const SmoothScroll = (props:any) => {
  // 1.
  let windowSize = {width:0, height:0};

  //2.
  let scrollingContainerRef = useRef<HTMLHeadingElement>(null)

  // 3.
  const data = { ease: 0.1, current: 0, previous: 0, rounded: 0, };

  // 4.
  useEffect(() => {
    setBodyHeight();
  }, [windowSize.height]);

  const setBodyHeight = () => {
    if(scrollingContainerRef.current){
      document.body.style.height = `${
        scrollingContainerRef.current.getBoundingClientRect().height
      }px`;
    }
  };

  // 5.
  useEffect(() => {
    requestAnimationFrame(() => smoothScrollingHandler());
  }, []);

  // 5.
  useEffect(() => {
    if(window)
      windowSize={width:window.innerWidth, height:window.innerHeight}
      window.addEventListener("resize", () => {
        windowSize={width:window.innerWidth, height:window.innerHeight}
      });
  }, []);

  const smoothScrollingHandler = () => {
    if(scrollingContainerRef.current){
      data.current = window.scrollY;
      data.previous += (data.current - data.previous) * data.ease;
      data.rounded = Math.round(data.previous * 100) / 100;
      scrollingContainerRef.current.style.transform = `translateY(-${data.previous}px)`;
      // Recursive call
      requestAnimationFrame(() => smoothScrollingHandler());
    }
  };

  return (
    <div className="smooth-scroll-parent fixed top-0 left-0 w-full h-full overflow-hidden uppercase" 
      style={{backgroundColor:props.bkgroundColor, color:props.foreColor}}
    >
      <div ref={scrollingContainerRef} className="-mb-[120px]">{props.children}</div>
    </div>
  );
};

export default SmoothScroll;
