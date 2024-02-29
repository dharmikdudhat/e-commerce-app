/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  BookOpenText,
  CheckSquare,
  FilePenLine,
  IndianRupee,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import DeleteConfirmationModal from "../DeleteConfirm/DeleteConfirm";

export function AdminProductCard(props) {
  const [extended, setExtended] = useState(false);
  const [isOptionsVisible, setOptionsVisible] = React.useState(false);
  // const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleOptions = () => {
    setOptionsVisible(!isOptionsVisible);
  };

  const handleUpdate = () => {
    props.onUpdate();
  };

  const handleReadMore = () => {
    setExtended(!extended);
  };

  const handleCancel = () => {
    // Close the delete confirmation modal
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    // Call the delete function passed from the parent component
    props.onDelete();
    // Close the delete confirmation modal
    setIsModalOpen(false);
  };

  return (
    <div className="w-16 align-middle transition-transform transform hover:scale-105 max-w-80 min-w-52 rounded-md border hover:ease-in-out hover:shadow-sm hover:shadow-black bg-slate-200 m-2 p-5 border-s-amber-600 border-e-black shadow-md shadow-black relative">
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
          <div className="absolute flex flex-col right-0   z-50 origin-top-left transform pr-4 transition ">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black opacity-90 ">
              <div className="px-2 pb-2 pt-2">
                <div className="grid grid-rows-3 gap-1">
                  <NavLink to="/details">
                    <BookOpenText />
                  </NavLink>
                  <FilePenLine
                    onClick={() => handleUpdate(props)}
                    className=" text-green-600"
                  />
                  <Trash2
                    onClick={() => setIsModalOpen(true)}
                    className=" text-red-700"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="">
        {extended && (
          <div className="grid grid-rows-4">
            <h1 className="text-lg font-semibold ">{props.name}</h1>
            <p className="text-sm text-gray-800 overflow-hidden max-h-20">
              Description : {props.description}
            </p>
            <h2 className="text-lg font-semibold flex text-cover">
              {" "}
              Price : <IndianRupee className="w-4 pt-2" />
              {props.price}
            </h2>
            <div className="flex justify-start">
              <CheckSquare className="size-5 pt-1 pr-1 ml-0 text-green-900" />{" "}
              <label> InStock {props.quantity}</label>
            </div>
          </div>
        )}
      </div>
      {/* Delete confirmation modal */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
