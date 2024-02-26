// import React from "react";
import { NotebookPen, BookMinus, BookPlus, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ProductCard } from "../ProductCard/ProductCard";
import { useEffect, useState } from "react";

export function AdminDashboard() {
  const [products, setProducts] = useState([]);

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

  return (
    <div
      className=" bg-cover bg-no-repeat bg-fixed"
      style={{
        backgroundImage:
          "url('https://www.befunky.com/images/prismic/68363147-7351-4f58-a545-3e744a9413b0_hero-photo-to-cartoon-2.jpg?auto=avif,webp&format=jpg&width=896')",
      }}
    >
      <div>
        <aside className="flex h-screen w-64 flex-col overflow-y-auto border-r bg-amber-500 px-5 py-8">
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
      </div>
      <div className="flex justify-evenly gap-3 px-3 py-3 flex-wrap grid-cols-5">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            name={product.name}
            description={product.description}
            price={product.price}
            quantity={product.quantity}
            imagePath={product.imagePath} // Assuming the image path is provided in the product data
          />
        ))}
      </div>
    </div>
  );
}
