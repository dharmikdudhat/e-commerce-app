/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
import { CheckSquare, IndianRupee } from "lucide-react";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export function ProductCard(props) {
  const [extended, setExtended] = useState(false);

  const handleReadMore = () => {
    // Toggle the extended state to show/hide additional details
    setExtended(!extended);
  };

  return (
    <div className=" w-16 align-middle transition-transform transform hover:scale-x-105 max-w-80 min-w-52 rounded-md border hover:ease-in-out hover:shadow-sm hover:shadow-black border-s-amber-600 border-e-black shadow-md shadow-black p-3 bg-slate-200 max-h-[400px]">
      <img
        src={props.imagePath}
        alt="Laptop"
        className="h-[220px] w-full rounded-md object-cover"
        onClick={handleReadMore}
      />
      <div className=" ">
        {extended && (
           <div className="grid grid-rows-4">
           <h1 className="text-lg font-semibold ">{props.name}</h1>
           <p className="text-sm text-gray-800 overflow-hidden max-h-20">Description : {props.description}</p>
           <h2 className="text-lg font-semibold flex text-cover"> Price : <IndianRupee className="w-4 pt-2" />{props.price}</h2>
           <div className="flex justify-start">
             <CheckSquare className="size-5 pt-1 pr-1 ml-0 text-green-900" />{" "}
             <label> InStock {props.quantity}</label>
           </div>
            <button
              type="button"
              className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <NavLink to="/details">Read</NavLink>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
