import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { Spring } from "react-spring/renderprops";

const Toggle = () => {
  const [isToggled, setToggled] = useState(false);

  const fade = useSpring({
    // opacity: isToggled ? 1 : 0,
    color: isToggled ? "red" : "yellow",
    // fontSize: isToggled ? "2rem" : "20em",
    transform: isToggled ? "translate3d(0,0,0)" : "translate3d(0,-50px,0)"
  });

  return (
    <div>
      <animated.h1 style={fade}>Hello</animated.h1>
      <button onClick={() => setToggled(!isToggled)}>Toggle</button>
      <Spring from={{ color: "green" }} to={{ color: "red" }}>
        {props => <div style={props}>hello</div>}
      </Spring>
    </div>
  );
};

export default Toggle;
