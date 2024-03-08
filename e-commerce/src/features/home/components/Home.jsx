import { useEffect, useState } from "react";
import { animated } from "react-spring";
import { ProductCard } from "../../product/components/ProductCard";
import { useSelector } from "react-redux";
import LoadingPulse from "../../../shared/components/LoadingPulse";
import { hostName } from "../../../shared/constant/GlobalHostName";
import WithoutLoginHomePage from "./WithoutLoginHomePage";
import AnimatedEmoji from "../../../shared/components/emogi";
import AnimatedEmoji2 from "../../../shared/components/emogi2";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastIndex, setLastIndex] = useState(5);
  const [selectedCard, setSelectedCard] = useState(null);
  

  const handleCardClick = (index) => {
    setSelectedCard(index);
  };

  const userData = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (userData) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [userData]);

  useEffect(() => {
    // Fetch data from backend when component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(`${hostName}/product/getAll`);

        const data = await response.json();
        data.map((item) => {
          const name = item.imagePath.split("\\")[1];
          item.imagePath = `${hostName}/${name}`;
        });

        setProducts(data); // Set products state with fetched data
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const showMoreCards = () => {
    setLastIndex((prevIndex) => prevIndex + 6);
  };

  return (
    <div className="flex flex-col">
      {isLogin ? (
        <div className=" ">
          <div className=" justify-center ">
            <div className="text-center justify-center text-4xl font-bold flex text-violet-200 bg-purple-700 mt-14 p-2">
              <AnimatedEmoji2 />
              Welcome !!!! May your visit be fruitful for you.<AnimatedEmoji />
            </div>
            <div className="align-middle text-center text-3xl bg-teal-600 color font-normal text-slate-100 ">
              <h1 className="px-1 mx-2 my-3 py-2">Trending</h1>
            </div>
            <div className="flex justify-evenly gap-3 px-3 py-3 flex-wrap grid-cols-5">
              {isLoading ? (
                <LoadingPulse />
              ) : (
                products.slice(-6).map((product, index) => (
                  <animated.div
                    key={index}
                    className={`fade-in ${
                      selectedCard === index ? "selected-card" : ""
                    } card-container`}
                    onClick={() => handleCardClick(index)}
                  >
                    <ProductCard
                      key={index}
                      name={product.name}
                      description={product.description}
                      price={product.price}
                      quantity={product.quantity}
                      imagePath={product.imagePath}
                    />
                  </animated.div>
                ))
              )}
            </div>
          </div>
          <div className=" justify-center">
            <div className="align-middle text-center text-3xl bg-teal-600 color font-normal text-slate-100 ">
              <h1 className="px-1 mx-2 my-3 py-2">Products</h1>
            </div>
            <div className="flex justify-evenly gap-3 m-2 px-3 py-3 flex-wrap grid-cols-5 mb-4">
              {isLoading ? (
                <LoadingPulse />
              ) : (
                products.slice(0, lastIndex + 1).map((product, index) => (
                  <animated.div
                    key={index}
                    className={`fade-in ${
                      selectedCard === index ? "selected-card" : ""
                    } card-container`}
                    onClick={() => handleCardClick(index)}
                  >
                    <ProductCard
                      key={index}
                      name={product.name}
                      description={product.description}
                      price={product.price}
                      quantity={product.quantity}
                      imagePath={product.imagePath}
                    />
                  </animated.div>
                ))
              )}
            </div>
            <div className=" text-center p-4">
              {lastIndex < products.length && (
                <button
                  className="text-white bg-black px-3 py-1 mb-10 rounded mt-1"
                  onClick={showMoreCards}
                >
                  Show More
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <WithoutLoginHomePage />
      )}
    </div>
  );
};
