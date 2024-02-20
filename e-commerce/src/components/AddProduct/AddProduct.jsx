/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";

function AddProduct() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    try {
      const response = await fetch("http://localhost:3000/product/upload", {
        method: "POST",
        body: formData,
      });
      console.log("Product added successfully:", response.data);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  const formRef = useRef();

  const [imageResult, setImageResult] = useState(null);

  const handlePreviewOnChange = (path) => {
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      setImageResult(e.target.result);
    });
    reader.readAsDataURL(path);
  };

  return (
    <div className=" bg-slate-600 p-10">
      <div className=" mx-auto max-w-3xl  rounded-md w-full bg-white">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className=" rounded-md shadow-md  px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Product Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Product Name"
              name="name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Product Description"
              name="description"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="number"
              placeholder="Product Price"
              name="price"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="quantity"
            >
              Quantity
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="quantity"
              type="number"
              placeholder="Product Quantity"
              name="quantity"
              required
            />
          </div>
          <div>
            <label
              class="block mb-2 text-sm font-semibold text-gray-700 "
              for="user_avatar"
            >
              Upload Photo
            </label>
            <input
              name="file"
              class="block w-full text-sm  border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none  dark:border-gray-600 dark:placeholder-gray-400 mb-3"
              aria-describedby="user_avatar_help"
              id="user_avatar"
              type="file"
              accept="image/*"
              onChange={(e) => handlePreviewOnChange(e.target.files[0])}
            ></input>
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
              type="submit"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
