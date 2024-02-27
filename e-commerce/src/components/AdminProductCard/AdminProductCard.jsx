/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { CheckSquare } from "lucide-react";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export function AdminProductCard(props) {
  const [extended, setExtended] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = () => {
    // Call the onUpdate function with the product details
    console.log("The props in update", props);
    navigate("/edit");
  };

  const handleDelete = (id) => {
    console.log("ID in ", props.id);
    props.onDelete(id);
  };

  const handleReadMore = () => {
    // Toggle the extended state to show/hide additional details
    setExtended(!extended);
  };

  return (
    <div className="w-16 align-middle transition-transform transform hover:scale-x-105 max-w-80 min-w-52 rounded-md border hover:ease-in-out hover:shadow-sm hover:shadow-black bg-slate-200 m-2">
      <img
        src={props.imagePath}
        alt="Laptop"
        className="h-[220px] w-full rounded-md object-cover cursor-pointer"
        onClick={handleReadMore}
      />
      <div className="p-4">
        <h1 className="text-lg font-semibold">{props.name}</h1>
        <p className="mt-3 text-sm text-gray-800"> {props.description}</p>
        <h2 className="text-lg font-semibold"> {props.price}</h2>
        <div className="flex justify-start">
          <CheckSquare className="size-6 pt-1 pr-1 ml-0 text-green-900" />{" "}
          <label> InStock {props.quantity}</label>
        </div>
        {extended && (
          <div>
            {/* Additional details to be shown when extended is true */}
            <p>Additional details here...</p>
          </div>
        )}
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
            onClick={() => handleUpdate(props.id)}
          >
            Update
          </button>
          <button
            type="button"
            className="mt-4 rounded-sm bg-red-500 px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={() => handleDelete(props.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
