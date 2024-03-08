/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
  BookOpenText,
  CheckSquare,
  FilePenLine,
  IndianRupee,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import DeleteConfirmationModal from "../../../shared/components/DeleteConfirm";

export function AdminProductCard(props) {
  const [isOptionsVisible, setOptionsVisible] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropDownRef = React.useRef(null);

  const handleClickOutside = (e) => {
    if (
      dropDownRef.current &&
      !dropDownRef.current.contains(e.target) &&
      !e.target.classList.contains("toggle-options")
    ) {
      setOptionsVisible(false);
    } else {
      setOptionsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleOptions = (e) => {
    e.stopPropagation();
    setOptionsVisible(!isOptionsVisible);
  };

  const handleUpdate = () => {
    props.onUpdate();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    props.onDelete();
    setIsModalOpen(false);
  };

  return (
    <div className="w-80 max-w-[280px] min-w-[200px] transition-transform transform hover:scale-105 rounded-md border hover:ease-in-out hover:shadow-sm hover:shadow-black bg-slate-200 m-2 p-5 border-s-amber-600 border-e-black shadow-md shadow-black relative overflow-hidden">
      <img
        src={props.imagePath}
        alt="Filter"
        className="h-44 w-full rounded-md object-cover cursor-pointer"
      />
      <div className="absolute top-0 right-0 rounded-full">
        <div className="toggle-options" onClick={toggleOptions}>
          <MoreVertical className="text-black h-6 w-6 cursor-pointer" />
        </div>
        {isOptionsVisible && (
          <div
            className="absolute flex flex-col right-0 z-50 origin-top-left transform pr-4 transition"
            ref={dropDownRef}
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black opacity-90">
              <div className="px-2 pb-2 pt-2">
                <div className="grid grid-rows-3 gap-1">
                  <NavLink to="/details">
                    <BookOpenText className="cursor-pointer" />
                  </NavLink>
                  <FilePenLine
                    onClick={() => handleUpdate(props)}
                    className="text-green-600 cursor-pointer"
                  />
                  <Trash2
                    onClick={() => setIsModalOpen(true)}
                    className="text-red-700 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
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
