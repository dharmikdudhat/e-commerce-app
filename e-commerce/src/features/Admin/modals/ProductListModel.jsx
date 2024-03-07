/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { hostName } from "../../../shared/constant/GlobalHostName";

const ProductListModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://${hostName}:3000/product/getAll`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    })();
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-75 flex items-center justify-center">
      <div className="bg-black p-8 mx-auto rounded-lg">
        <div className="flex justify-end text-3xl text-white">
          <button onClick={onClose}>&times;</button>
        </div>
        {children}
        <div className="max-conte">
          <div className="text-center font-bold text-3xl mb-4 text-red-300">
            <h1>Product Table</h1>
          </div>
          <div className="table-container">
            <table className="border border-white w-full">
              <thead className="border justify-between border-white">
                <tr>
                  <th className="py-2 text-blue-200 px-4 border text-center border-gray-300">Product Id</th>
                  <th className="py-2 text-blue-200 px-4 border border-gray-300">Product Name</th>
                  <th className="py-2 text-blue-200 px-4 border border-gray-300">Product Description</th>
                  <th className="py-2 text-blue-200 px-4 border border-gray-300">Price</th>
                  <th className="py-2 text-blue-200 px-4 border border-gray-300">Quantity</th>
                  <th className="py-2 text-blue-200 px-4 border border-gray-300">Image Path</th>
                </tr>
              </thead>
              <tbody className="border border-white">
                {products.map((product, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 text-lime-300 px-1 text-center border border-gray-300 hover:text-green-500">{product.id}</td>
                    <td className="py-2 text-lime-300 hover:text-green-500 px-1 text-center border border-gray-300">{product.name}</td>
                    <td className="py-2 text-lime-300 hover:text-green-500 px-1 text-center border border-gray-300">{product.description}</td>
                    <td className="py-2 text-lime-300 hover:text-green-500 px-1 text-center border border-gray-300">{product.price}</td>
                    <td className="py-2 text-lime-300 hover:text-green-500 px-1 text-center border border-gray-300">{product.quantity}</td>
                    <td className="py-2 text-lime-300 hover:text-green-500 px-1 text-center border border-gray-300">{product.imagePath}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListModal;
