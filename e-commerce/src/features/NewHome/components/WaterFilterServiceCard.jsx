import React from "react";

const WaterFilterServiceCard = ({ title, description, icon }) => {
  return (
    <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex justify-center items-center h-20 bg-blue-500">
        <svg
          className="w-8 h-8 text-white fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          {icon}
        </svg>
      </div>
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2">{title}</h2>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default WaterFilterServiceCard;
