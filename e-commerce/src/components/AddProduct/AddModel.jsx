/* eslint-disable react/prop-types */
// import React from "react";

const AddModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 max-w-md mx-auto rounded-lg">
        <div className="flex justify-end">
          <button onClick={onClose}>&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AddModal;
