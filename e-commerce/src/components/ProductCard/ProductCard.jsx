/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
import { CheckSquare } from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";

export function ProductCard(props) {
  return (
    <div className=" w-16 align-middle transition-transform transform hover:scale-x-105 max-w-80 min-w-52 rounded-md border hover:ease-in-out hover:shadow-sm hover:shadow-black bg-slate-200">
      <img
        src={props.imagePath}
        alt="Laptop"
        className="h-[220px] w-full rounded-md object-cover"
      />
      <div className="p-4">
        <h1 className="text-lg font-semibold">{props.name}</h1>
        <p className="mt-3 text-sm text-gray-800">
          {" "}
          {props.description}
        </p>
        <h2 className="text-lg font-semibold"> {props.price}</h2>
        <div className="flex justify-start">
          <CheckSquare className="size-6 pt-1 pr-1 ml-0 text-green-900" />{" "}
          <label> InStock {props.quantity}</label>
        </div>
        <button
          type="button"
          className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          <NavLink to="/details">Read</NavLink>
        </button>
      </div>
    </div>
  );
}
