/* eslint-disable no-unused-vars */
import React from "react";
import { ProductCard } from "../ProductCard/ProductCard";

export const Home = () => {
  let array = [];
  for (let index = 0; index < 4; index++) {
    array.push(<ProductCard />);
  }
  return (
    <div>
      <div>
        <div className="align-middle text-center text-3xl bg-black color font-normal text-slate-100">
          <h1 className="px-1 mx-2 my-3 py-2">Trending</h1>
        </div>
        <div className="flex justify-evenly gap-3 m-2 px-3 py-3 flex-wrap grid-cols-5">
          {array}
        </div>
      </div>
      <div>
        <div className="align-middle text-center text-3xl bg-black color font-normal text-slate-100">
          <h1 className="px-1 mx-2 my-3 py-2">Products</h1>
        </div>
        <div className="flex justify-evenly gap-3 m-2 px-3 py-3 flex-wrap grid-cols-5 ">
          {array}
        </div>
      </div>
    </div>
  );
};
