/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
import { CheckSquare } from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";

export function AdminProductCard(props, { onUpdate, onDelete }) {
  const handleUpdate = () => {
    // Call the onUpdate function with the product details
    onUpdate(props);
  };

  const handleDelete = () => {
    // Call the onDelete function with the product name or ID
    onDelete(props.id); // Assuming name is unique for each product
  };

  return (
    <div className=" w-16 align-middle transition-transform transform hover:scale-x-105 max-w-80 min-w-52 rounded-md border hover:ease-in-out hover:shadow-sm hover:shadow-black bg-white">
      <img
        src={props.imagePath}
        alt="Laptop"
        className="h-[220px] w-full rounded-md object-cover"
      />
      <div className="p-4">
        <h1 className="text-lg font-semibold">{props.name}</h1>
        <p className="mt-3 text-sm text-gray-800"> {props.description}</p>
        <h2 className="text-lg font-semibold"> {props.price}</h2>
        <div className="flex justify-start">
          <CheckSquare className="size-6 pt-1 pr-1 ml-0 text-green-900" />{" "}
          <label> InStock {props.quantity}</label>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <NavLink to="/details">Read</NavLink>
          </button>
          <button
            type="button"
            className="mt-4 rounded-sm bg-green-500 px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={handleUpdate}
          >
            {/* <NavLink to="/details">Update</NavLink> */}
            Update
          </button>
          <button
            type="button"
            className="mt-4 rounded-sm bg-red-500 px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={handleDelete}
          >
            {/* <NavLink to="/details">Delete</NavLink> */}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
