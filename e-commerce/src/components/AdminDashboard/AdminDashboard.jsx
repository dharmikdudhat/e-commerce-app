// import React from "react";
import { NotebookPen, BookMinus, BookPlus, User } from "lucide-react";
import { NavLink } from "react-router-dom";

export function AdminDashboard() {
  return (
    <aside className="flex h-screen w-64 flex-col overflow-y-auto border-r bg-white px-5 py-8">
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3 ">
            <label className="px-3 text-sm font-semibold uppercase text-gray-900">
              Admin Functions :
            </label>
            <NavLink
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              to="/add"
            >
              <BookPlus className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Add Product</span>
            </NavLink>
            <NavLink
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              to="/"
            >
              <NotebookPen className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Update Product</span>
            </NavLink>
            <NavLink
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              to="/"
            >
              <BookMinus className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Delete Product</span>
            </NavLink>
            <NavLink
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              to="/"
            >
              <User className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-sm font-medium">Profile</span>
            </NavLink>
          </div>
        </nav>
      </div>
    </aside>
  );
}
