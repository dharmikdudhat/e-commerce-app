/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
// import  { useEffect, useState } from "react";
// import { hostName } from "../../../ulits/GlobalHostName";

const ProfileModal = ({ showProfile, closeProfile }) => {
  if (!showProfile) return null;
  const userdatas = localStorage.getItem("user");
  const userconverted = JSON.parse(userdatas);

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-black p-8 mx-auto rounded-lg">
        <div className="flex justify-end text-3xl text-white">
          <button onClick={closeProfile}>&times;</button>
        </div>
        <div className="text-white">
          <h1 className=" text-center font-bold text-3xl text-orange-300"> Hiiii Mr.{userconverted ? userconverted.user.username : ""}</h1>
          <p>Id : {userconverted ? userconverted.user.id : ""}</p>
          <p>Email : {userconverted ? userconverted.user.email : ""}</p>
          <p>Role : {userconverted ? userconverted.user.role : ""}</p>
          <p>Age : {userconverted ? userconverted.user.age : ""} years</p> 
          <p>Your Favorite color : {userconverted ? userconverted.user.personalAnswer : ""}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
