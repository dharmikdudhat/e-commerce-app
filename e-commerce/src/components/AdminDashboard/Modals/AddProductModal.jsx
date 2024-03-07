/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
// import  { useEffect, useState } from "react";
// import { hostName } from "../../../ulits/GlobalHostName";
import React, { useState, useRef, useEffect } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import { hostName } from "../../../ulits/GlobalHostName";
import { useDispatch, useSelector } from "react-redux";
import { sendUpdateProps } from "../../../features/authSlice";

const AddProductModel = ({ showAddProduct, closeAddProduct }) => {
    if (!showAddProduct) return null;
    const userdatas = localStorage.getItem("user");
    // const userconverted = JSON.parse(userdatas);
    // const params = useLocation();
    // const isUpdate = params && params.pathname !== "/add";
    const navigate = useNavigate();
    const updateProductProps = useSelector((state) => state.auth.updateProps);
    const formRef = useRef();
    const [imageResult, setImageResult] = useState(null);
    const dispatch = useDispatch();
    const isUpdate  = false;
  
    
  
    const API_CONFIG = isUpdate
      ? {
          api: `http://${hostName}:3000/product/${updateProductProps.id}`,
          method: "PATCH",
        }
      : {
          api: `http://${hostName}:3000/product/upload`,
          method: "POST",
        };
  
    // Populate form fields with existing data if in update mode
    // useEffect(() => {
    //   if (isUpdate) {
    //     formRef.current.name.value = updateProductProps.name;
    //     formRef.current.description.value = updateProductProps.description;
    //     formRef.current.price.value = updateProductProps.price;
    //     formRef.current.quantity.value = updateProductProps.quantity;
    //     // Handle file input separately if necessary
    //   }
    // }, [isUpdate, updateProductProps]);

    // const handleInputChange = (e) => {
    //   const { name, value } = e.target;
    //   // Dispatch an action to update the product in the Redux store
    //   dispatch(sendUpdateProps({ ...updateProductProps, [name]: value }));
    // };
  
    const handleAddOrUpdate = () => {
      // Determine whether it's an update or add operation based on isUpdate
      const API_CONFIG = isUpdate
        ? {
            api: `http://${hostName}:3000/product/${updateProductProps.id}`,
            method: "PATCH",
          }
        : {
            api: `http://${hostName}:3000/product/upload`,
            method: "POST",
          };
  
      const formData = new FormData(formRef.current);
  
      fetch(API_CONFIG.api, {
        method: API_CONFIG.method,
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Product added/updated successfully:", data);
          // Optionally, you can update local state or Redux store with the new data
          // dispatch(sendUpdateProps({ ...updateProductProps, [name]: value }));
          // Close the modal or perform any other actions
          closeAddProduct();
        })
        .catch((err) => {
          console.error(err);
        });
    };
  
  
    const handlePreviewOnChange = (file) => {
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        setImageResult(e.target.result);
      });
      reader.readAsDataURL(file);
    };
  
    return (
      <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-75 flex items-center justify-center">
        <div className="bg-black p-8 mx-auto rounded-lg">
          <div className="flex justify-end text-3xl text-white">
            <button onClick={closeAddProduct}>&times;</button>
          </div>
          <div className=" bg-white p-10">
      <div className=" mx-auto max-w-3xl rounded-md w-full bg-gray-300">
        <form
          ref={formRef}
          // onSubmit={handleSubmit}
          className=" rounded-md shadow-md  px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-900 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Product Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Product Name"
              name="name"
              value={!isUpdate ? updateProductProps.name : ""}
              // onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-900 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Product Description"
              name="description"
              value={!isUpdate ? updateProductProps.description : ""}
              // onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-900 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="number"
              placeholder="Product Price"
              name="price"
              value={!isUpdate ? updateProductProps.price : ""}
              // onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-900 text-sm font-bold mb-2"
              htmlFor="quantity"
            >
              Quantity
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              id="quantity"
              type="number"
              placeholder="Product Quantity"
              name="quantity"
              value={!isUpdate ? updateProductProps.quantity : ""}
              // onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-semibold text-gray-900 "
              htmlFor="user_avatar"
            >
              Upload Photo
            </label>
            <input
              className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400 mb-3"
              aria-describedby="user_avatar_help"
              id="user_avatar"
              type="file"
              name="file"
              accept="image/*"
              onChange={(e) => handlePreviewOnChange(e.target.files[0])}
            />
          </div>
          <div>
            {imageResult && (
              <div>
                <h2>Preview:</h2>
                <img
                  src={imageResult}
                  className="w-full h-full p-2 m-2 rounded shadow-md"
                  alt="Preview"
                  style={{ maxWidth: "100%", maxHeight: "300px" }}
                />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleAddOrUpdate}
          >
            {isUpdate ? "Update Product" : "Add Product"}
          </button>
          </div>
        </form>
      </div>
    </div>
        </div>
      </div>
    );
  };
  
  export default AddProductModel;
  