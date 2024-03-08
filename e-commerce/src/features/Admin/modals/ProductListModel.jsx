/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { hostName } from "../../../shared/constant/GlobalHostName";

const ProductListModal = ({ isOpen, onClose, children }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); // Number of products per page

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${hostName}/product/getAll`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                {currentProducts.map((product, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 text-gray-700 px-2 text-center border border-gray-500">
                      {(currentPage - 1) * productsPerPage + index + 1}
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
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map(
            (number) => (
              <button
                key={number}
                onClick={() => paginate(number + 1)}
                className={`mx-1 px-3 py-1 border border-gray-500 ${
                  currentPage === number + 1
                    ? "bg-gray-500 text-white"
                    : "text-gray-500"
                }`}
              >
                {number + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListModal;
