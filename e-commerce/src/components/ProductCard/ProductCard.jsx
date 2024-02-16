import { CheckSquare } from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";

export function ProductCard() {
  return (
    <div className="w-full align-middle transition-transform transform hover:scale-105 max-w-80 min-w-52 rounded-md border hover:ease-in-out hover:shadow-sm hover:shadow-black">
      <img
        src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
        alt="Laptop"
        className="h-[200px] w-full rounded-md object-cover"
      />
      <div className="p-4">
        <h1 className="text-lg font-semibold">Filter Name</h1>
        <p className="mt-3 text-sm text-gray-600">
          {" "}
          Filter Small Detail Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Excepturi, debitis?
        </p>
        <div className="flex justify-start">
          <CheckSquare className="size-6 pt-1 pr-1 ml-0 text-green-500" />{" "}
          <label> InStock</label>
        </div>
        <button
          type="button"
          className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          <NavLink to="/details">Read</NavLink>
        </button>
      </div>
    </div>
  );
}
