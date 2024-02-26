// import React from "react";
import { NotebookPen, BookMinus, BookPlus, User } from "lucide-react";
import {  useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function AdminDashboard() {


  const userData = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate("/");
    } 
  }, [navigate, userData]);

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
      <div></div>
    </div>
  );
}
