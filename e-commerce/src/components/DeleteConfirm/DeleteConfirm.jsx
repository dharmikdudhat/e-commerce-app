import React from "react";

function DeleteConfirmationModal({ isOpen, onCancel, onConfirm }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div
            className="absolute inset-0 bg-gray-900 opacity-75"
            onClick={onCancel}
          ></div>
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-auto z-20">
            <h2 className="text-lg font-semibold mb-4">Delete Confirmation</h2>
            <p className="text-sm mb-6">Are you sure you want to delete?</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg mr-4"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
                onClick={onConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteConfirmationModal;
