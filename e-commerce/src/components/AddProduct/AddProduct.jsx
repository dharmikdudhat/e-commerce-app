/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

function AddProduct() {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    image: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted Product Data:", productData);
  };

  const [imageSrc, setImageSrc] = useState(null);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        setProductData({ ...productData, image:imageSrc });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className=" bg-slate-600 p-10">
      <div className=" mx-auto max-w-3xl  rounded-md w-full bg-white">
        <form
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
              value={productData.name}
              onChange={handleChange}
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
              value={productData.description}
              onChange={handleChange}
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
              value={productData.price}
              onChange={handleChange}
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
              value={productData.quantity}
              onChange={handleChange}
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
              class="block w-full text-sm  border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none  dark:border-gray-600 dark:placeholder-gray-400 mb-3"
              aria-describedby="user_avatar_help"
              id="user_avatar"
              type="file"
              onChange={handleImgChange}
              accept="image/*"
            ></input>
          </div>
          <div>
            {imageSrc && (
              <div>
                <h2>Preview:</h2>
                <img
                  src={imageSrc}
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
