import React, { Fragment, useState, useRef } from 'react';
import './Button.css'


const Button = (props) => {
  let [active, setActive ] = useState(false)
  let [distX, setDistX] = useState(0)
  let [distY, setDistY] = useState(0)
  const buttonEL = useRef(null)

  let handleOnClick = (e)=>{
    setActive(active = true)
    let mouseX = e.clientX
    let mouseY = e.clientY
    let {left, top} = buttonEL.current.getBoundingClientRect()
    setDistX(distX = mouseX - left - 5)
    setDistY(distY = mouseY - top - 5)
  }

  let handleOnAnimationEnd = () => {
    setActive( active = false)
  }

  return ( 
    <Fragment>
      <button 
        className="button1" 
        onClick={handleOnClick}
        ref={buttonEL}
      >
        <span className="text">
          {props.children}
        </span>
        <span 
          onAnimationEnd={handleOnAnimationEnd}
          className={active ? 'cri active': 'cri'}
          style={{
            left: distX + 'px',
            top: distY + 'px'
          }}
          ></span>
      </button>
    </Fragment>
   );
}
 
export default Button;