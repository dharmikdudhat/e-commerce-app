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
        const response = await fetch(`${hostName}/product/getAll`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    })();
  }, []);

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-75 backdrop-filter backdrop-blur-lg flex items-center justify-center max-h-screen">
      <div className="bg-white bg-opacity-75 p-4 mx-auto rounded-lg backdrop-filter backdrop-blur-lg">
        <div className="flex justify-end text-2xl text-gray-900">
          <button onClick={onClose}>&times;</button>
        </div>
        {children}
        <div className="max-conte">
          <div className="text-center font-bold text-xl mb-2 text-red-500">
            <h1>Product Table</h1>
          </div>
          <div className="table-container overflow-x-auto">
            <table className="border border-gray-500 w-full">
              <thead className="border justify-between border-gray-500">
                <tr>
                  <th className="py-2 text-blue-500 px-4 border text-center border-gray-500">
                    SR. No
                  </th>
                  <th className="py-2 text-blue-500 px-4 border border-gray-500">
                    Product Id
                  </th>
                  <th className="py-2 text-blue-500 px-4 border border-gray-500">
                    Product Name
                  </th>
                  <th className="py-2 text-blue-500 px-4 border border-gray-500">
                    Description
                  </th>
                  <th className="py-2 text-blue-500 px-4 border border-gray-500">
                    Price
                  </th>
                  <th className="py-2 text-blue-500 px-4 border border-gray-500">
                    Quantity
                  </th>
                  <th className="py-2 text-blue-500 px-4 border border-gray-500">
                    Image Path
                  </th>
                </tr>
              </thead>
              <tbody className="border border-gray-500">
                {products.map((product, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 text-gray-700 px-2 text-center border border-gray-500">
                      {index + 1}
                    </td>
                    <td className="py-2 text-gray-700 px-2 text-center border border-gray-500">
                      {product.id}
                    </td>
                    <td className="py-2 text-gray-700 px-2 border border-gray-500">
                      {product.name}
                    </td>
                    <td className="py-2 text-gray-700 px-2 border border-gray-500">
                      {product.description}
                    </td>
                    <td className="py-2 text-gray-700 px-2 border border-gray-500">
                      {product.price}
                    </td>
                    <td className="py-2 text-gray-700 px-2 border border-gray-500">
                      {product.quantity}
                    </td>
                    <td className="py-2 text-gray-700 px-2 border border-gray-500">
                      {product.imagePath}
                    </td>
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
