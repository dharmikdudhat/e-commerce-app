/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
// import  { useEffect, useState } from "react";
// import { hostName } from "../../../ulits/GlobalHostName";

const ProfileModal = ({ showProfile, closeProfile }) => {
  if (!showProfile) return null;
  const userdatas = localStorage.getItem("user");
  const userconverted = JSON.parse(userdatas);

  return (
    <div className="fixed inset-0 z-50 overflow-auto backdrop-filter backdrop-blur-lg flex items-center justify-center">
      <div className="bg-white bg-opacity-100 p-8 mx-auto rounded-lg">
        <div className="flex justify-end text-3xl text-gray-800">
          <button onClick={closeProfile}>&times;</button>
        </div>
        <div className="text-gray-800">
          <h1 className="text-center font-bold text-3xl text-orange-500">
            Hello, {userconverted ? userconverted.user.username : ""}
          </h1>
          <form className="mt-8">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ID:
                </label>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {userconverted ? userconverted.user.id : ""}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email:
                </label>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {userconverted ? userconverted.user.email : ""}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role:
                </label>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {userconverted ? userconverted.user.role : ""}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Age:
                </label>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {userconverted ? userconverted.user.age : ""} years
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Favorite Color:
                </label>
                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {userconverted ? userconverted.user.personalAnswer : ""}
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
