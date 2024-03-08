import React from "react";

const NumberCounter = ({ counter, index }) => {
  return (
    <div
      key={index}
      className="flex items-center justify-center bg-blue-300 rounded-full w-40 h-40 transform transition-transform hover:easy-in-out hover:scale-105 m-auto"
    >
      <div className="text-center">
        <span className="block font-bold">{counter.value}</span>
        <span className="block">{counter.label}</span>
      </div>
    </div>
  );
};

export default NumberCounter;
