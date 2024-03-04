/* eslint-disable no-constant-condition */
// import React from "react";
import { useSpring, animated } from "react-spring";

const AnimatedEmoji = () => {
  const { x } = useSpring({
    from: { x: 0 },
    to: async (next) => {
      while (true) {
        await next({ x: 50 });
        await next({ x: 0 });
      }
    },
  });

  return (
    <animated.div
      style={{
        transform: x.to((val) => `translateX(${val}px)`),
        fontSize: "2rem",
      }}
    >
      💨
    </animated.div>
  );
};

export default AnimatedEmoji;