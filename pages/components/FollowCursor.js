import React, {useState, useEffect, useRef, forwardRef, useImperativeHandle} from 'react'
import {gsap} from 'gsap'

const Circle = forwardRef(({ size, delay }, ref) => {
  const el = useRef();
  useImperativeHandle(ref, () => {
    return {
      moveTo(x,  y) {
        gsap.to(el.current, { x, y, delay });
      } };
  }, [delay]);
  return React.createElement("div", { className: `circle ${size}`, ref: el });
});

Circle.displayName = 'MyCircle'

const FollowerCursor = () => {
  const circleRefs = useRef([]);
  // reset on re-renders
  circleRefs.current = [];
  useEffect(() => {
    circleRefs.current.forEach(ref => ref.moveTo(innerWidth / 2, innerHeight / 2));
    const onMove = ({ clientX, clientY }) => {
      circleRefs.current.forEach(ref => ref.moveTo(clientX, clientY));
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const addCircleRef = (ref) => {
    if (ref) {circleRefs.current.push(ref);}
  };

  return /*#__PURE__*/(
    React.createElement(
      "div", { className: "cursor" }, 
      React.createElement(Circle, { size: "sm", ref: addCircleRef, delay: 0 }), 
      React.createElement(Circle, { size: "md", ref: addCircleRef, delay: 0.05 }),
      React.createElement(Circle, { size: "lg", ref: addCircleRef, delay: 0.2 })
    )
  );
}

export default FollowerCursor