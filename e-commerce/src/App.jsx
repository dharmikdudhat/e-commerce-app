/* eslint-disable no-unused-vars */
<<<<<<< Updated upstream
import React from "react";
import "./index.css";
import router from "./route";
import { RouterProvider } from "react-router-dom";
function App() {
  return (
    <RouterProvider router={router} />
=======
import ProductCard from "./components/ProductCard/ProductCard";
import { Navbar } from "./components/navbar";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./route";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <>
   <RouterProvider router={router} />     
    </>
>>>>>>> Stashed changes
  );
}

export default App;
