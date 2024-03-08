/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
import { CheckSquare, IndianRupee } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

export function ProductCard(props) {
  return (
    <div className="w-80 max-w-[280px] min-w-[200px] transition-transform transform hover:scale-105 rounded-md border hover:ease-in-out hover:shadow-sm hover:shadow-black border-s-amber-600 border-e-black shadow-md shadow-black p-3 my-2 bg-slate-200 max-h-[400px] overflow-hidden">
      <img
        src={props.imagePath}
        alt="Laptop"
        className="h-44 w-full rounded-md object-cover"
      />
      <div className="mt-2">
        <h1 className="text-lg font-semibold line-clamp-1">{props.name}</h1>
        <p className="text-sm text-gray-800 overflow-hidden line-clamp-3">
          Description: {props.description}
        </p>
        <h2 className="text-lg font-semibold flex text-cover mt-1">
          {" "}
          Price: <IndianRupee className="w-4 pt-1" />
          {props.price}
        </h2>
        <div className="flex items-center mt-1">
          <CheckSquare className="size-5 pr-1 text-green-900" />
          <label>InStock {props.quantity}</label>
        </div>
        <button
          type="button"
          className="mt-3 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          <NavLink to="/details">Read</NavLink>
        </button>
      </div>
    </div>
  );
}
