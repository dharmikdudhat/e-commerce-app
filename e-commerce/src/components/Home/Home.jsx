import { useEffect, useState } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // Fetch data from backend when component mounts
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/product/getAll"); // Assuming endpoint to fetch products
        const data = await response.json();
        data.map((item) => {
          const name = item.imagePath.split("\\")[1];
          item.imagePath = `http://localhost:3000/${name}`;
        });
        setProducts(data); // Set products state with fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const userData = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (userData) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [userData]);

  return (
    <div>
      {isLogin ? (
        <div className=" bg-green-700">
          <div>
            <div className="align-middle text-center text-3xl bg-black color font-normal text-slate-100 ">
              <h1 className="px-1 mx-2 my-3 py-2">Trending</h1>
            </div>
            <div className="flex justify-evenly gap-3 m-2 px-3 py-3 flex-wrap grid-cols-5">
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
          <div>
            <div className="align-middle text-center text-3xl bg-black color font-normal text-slate-100">
              <h1 className="px-1 mx-2 my-3 py-2">Products</h1>
            </div>
            <div className="flex justify-evenly gap-3 m-2 px-3 py-3 flex-wrap grid-cols-5 ">
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
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-green-800">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Welcome to the Filter Shop
          </h1>
          <p className="text-lg mb-8 text-center">
            Discover a wide range of high-quality filters for your needs!
          </p>
          <div className="max-w-md p-6 bg-green-400 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Why Choose Us?</h2>
            <ul className="list-disc pl-6">
              <li>
                Wide variety of filter types, including air filters, water
                filters, and more.
              </li>
              <li>High-quality materials for durability and efficiency.</li>
              <li>Easy installation and maintenance.</li>
              <li>Fast shipping and excellent customer service.</li>
            </ul>
          </div>
          <button className="mt-8 bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            <NavLink to="/login">Sign In to Explore</NavLink>
          </button>
        </div>
      )}
    </div>
  );
};
