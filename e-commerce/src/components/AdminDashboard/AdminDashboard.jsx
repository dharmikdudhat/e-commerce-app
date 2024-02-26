// import React from "react";
import { NotebookPen, BookMinus, BookPlus, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { AdminProductCard } from "../AdminProductCard/AdminProductCard";

export function AdminDashboard() {
  const [products, setProducts] = useState([]);

  const hostName = window.location.hostname;

  useEffect(() => {
    // Fetch data from backend when component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${hostName}:3000/product/getAll`); // Assuming endpoint to fetch products
        const data = await response.json();
        data.map((item) => {
          const name = item.imagePath.split("\\")[1];
          item.imagePath = `http://${hostName}:3000/${name}`;
        });
        setProducts(data); // Set products state with fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [hostName]);

  const handleUpdate = (product) => {
    console.log("Update product:", product);
    // Implement update functionality
  };

  const handleDelete = (productName) => {
    console.log("Delete product:", productName);
    // Implement delete functionality
  };

  return (
    <div
      className=" bg-cover bg-no-repeat bg-fixed"
      style={{
        backgroundImage:
          "url('https://www.befunky.com/images/prismic/68363147-7351-4f58-a545-3e744a9413b0_hero-photo-to-cartoon-2.jpg?auto=avif,webp&format=jpg&width=896')",
      }}
    >
      <div className="flex">
        <aside className="flex h-screen w-64 flex-col overflow-y-auto border-r bg-white px-5 py-8 bg-fixed">
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
                  <span className="mx-2 text-sm font-medium">
                    Update Product
                  </span>
                </NavLink>
                <NavLink
                  className="flex transform items-center rounded-lg px-3 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-200 hover:text-gray-900"
                  to="/"
                >
                  <BookMinus className="h-5 w-5" aria-hidden="true" />
                  <span className="mx-2 text-sm font-medium">
                    Delete Product
                  </span>
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
        <div className="flex justify-evenly gap-3 px-3 py-3 flex-wrap grid-cols-5">
          {products.map((product, index) => (
            <AdminProductCard
              key={index}
              name={product.name}
              description={product.description}
              price={product.price}
              quantity={product.quantity}
              imagePath={product.imagePath}
              onUpdate={handleUpdate} // Pass the update function
              onDelete={handleDelete} // Pass the delete function
            />
          ))}
        </div>
      </div>
    </div>
  );
}
