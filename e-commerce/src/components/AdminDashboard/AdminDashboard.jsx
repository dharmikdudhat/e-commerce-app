// import React from "react";
import { NotebookPen, BookMinus, BookPlus, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { AdminProductCard } from "../AdminProductCard/AdminProductCard";

export function AdminDashboard() {
  const [products, setProducts] = useState([]);

  // const hostName = window.location.hostname;
  const hostName = "192.168.0.105";

  useEffect(() => {
    // Fetch data from backend when component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${hostName}:3000/product/getAll`);
        const data = await response.json();
        data.map((item) => {
          const name = item.imagePath.split("\\")[1];
          item.imagePath = `http://${hostName}:3000/${name}`;
        });
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [hostName]);

  // Implement update functionality
  const handleUpdate = (product) => {
    console.log("Update product:", product);
  };

  // Implement delete funcrtionality
  const handleDelete = async (id) => {
    console.log("Delete product:", id);
    try {
      const response = await fetch(`http://${hostName}:3000/product/${id}`, {
        method: "DELETE",
      });
      // Assuming endpoint to fetch products
      setProducts(products.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64 h-full overflow-y-auto border-r bg-slate-200 px-5 py-8 mr-3">
        <div className="mt-6 flex flex-1 flex-col justify-between">
          <nav className="-mx-3 space-y-6 ">
            <div className="space-y-3 ">
              <label className="px-3 text-sm font-semibold uppercase text-gray-950">
                Admin Functions :
              </label>
              <NavLink
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-200 hover:text-gray-900"
                to="/add"
              >
                <BookPlus className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Add Product</span>
              </NavLink>
              <NavLink
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-200 hover:text-gray-900"
                to="/"
              >
                <NotebookPen className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Update Product</span>
              </NavLink>
              <NavLink
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-200 hover:text-gray-900"
                to="/"
              >
                <BookMinus className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Delete Product</span>
              </NavLink>
              <NavLink
                className="flex transform items-center rounded-lg px-3 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-200 hover:text-gray-900"
                to="/"
              >
                <User className="h-5 w-5" aria-hidden="true" />
                <span className="mx-2 text-sm font-medium">Profile</span>
              </NavLink>
            </div>
          </nav>
        </div>
      </aside>
      <div className=" flex-1 overflow-auto ">
        <div className="  text-center align-middle bg-black text-white mt-4 mb-4 ">
          <h1>Product Cards</h1>
        </div>
        <div className="flex overflow-x-auto p-4 ">
          {products.map((product) => (
            <AdminProductCard
              key={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              quantity={product.quantity}
              imagePath={product.imagePath}
              onUpdate={() => handleUpdate(product)} // Pass the update function
              onDelete={() => handleDelete(product.id)} // Pass the delete function
            />
          ))}
        </div>
      </div>
    </div>
  );
}
