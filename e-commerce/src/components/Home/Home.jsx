import { useEffect, useState } from "react";
import { ProductCard } from "../ProductCard/ProductCard";

export const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from backend when component mounts
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/product/getAll"); // Assuming endpoint to fetch products
        const data = await response.json();
        setProducts(data); // Set products state with fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
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
              imagepath={product.imagepath} // Assuming the image path is provided in the product data
            />
          ))}
        </div>
      </div>
    </div>
  );
};
