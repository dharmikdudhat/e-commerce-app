/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { CheckSquare, MoreVertical } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export function AdminProductCard(props) {
  const [extended, setExtended] = useState(false);
  const [isOptionsVisible, setOptionsVisible] = React.useState(false);
  const navigate = useNavigate();

  const toggleOptions = () => {
    setOptionsVisible(!isOptionsVisible);
  };

  const handleUpdate = () => {
    console.log("The props in update", props);
    navigate("/edit");
  };

  const handleDelete = (id) => {
    console.log("ID in ", props.id);
    // eslint-disable-next-line react/prop-types
    props.onDelete(id);
  };

  const handleReadMore = () => {
    setExtended(!extended);
  };

  return (
    <div className="w-16 align-middle transition-transform transform hover:scale-105 max-w-80 min-w-52 rounded-md border hover:ease-in-out hover:shadow-sm hover:shadow-black bg-slate-200 m-2 p-5 relative">
      <img
        src={props.imagePath}
        alt="Filter"
        className="h-[220px] w-full rounded-md object-cover cursor-pointer"
        onClick={handleReadMore}
      />
      <div className="absolute top-0 right-0  rounded-full">
        <div className="">
          <MoreVertical
            onClick={toggleOptions}
            className="text-black h-6 w-6 cursor-pointer"
          />
        </div>
        {isOptionsVisible && (
          <div className="absolute flex flex-col  z-50 origin-top-left transform p-2 transition ">
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-50">
            <div className="px-5 pb-6 pt-5">
              <div className="grid grid-rows-3 gap-1">
                <button
                  type="button"
                  className=" text-[12px] font-semibold text-bleck shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  <NavLink to="/details">Read</NavLink>
                </button>
                <button
                  type="button"
                  className="  text-[12px] font-semibold text-black shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  onClick={() => handleUpdate(props.id)}
                >
                  Update
                </button>
                <button
                  type="button"
                  className=" text-[12px] font-semibold text-black shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  onClick={() => handleDelete(props.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        
        )}
      </div>
      <div className="">
        {extended && (
          <div>
            <h1 className="text-lg font-semibold ">{props.name}</h1>
            <p className="mt-3 text-sm text-gray-800"> {props.description}</p>
            <h2 className="text-lg font-semibold"> {props.price}</h2>
            <div className="flex justify-start">
              <CheckSquare className="size-6 pt-1 pr-1 ml-0 text-green-900" />{" "}
              <label> InStock {props.quantity}</label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
