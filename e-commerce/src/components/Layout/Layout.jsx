/* eslint-disable no-unused-vars */
import React from "react";
import { Navbar } from "../Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../Footer/Footer";

const Layout = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  return (
    <div className="relative">
      {!isAdminPage && <Navbar />}
      <Outlet />
      {!isAdminPage && <Footer />}
    </div>
  );
};

export default Layout;
