/* eslint-disable no-unused-vars */
import React from "react";
import { Navbar } from "../../../shared/components/Header";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../../../shared/components/Footer";

const Layout = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  return (
    <div className="flex flex-col h-screen">
      {!isAdminPage && <Navbar />}
      <Outlet />
      {!isAdminPage && <Footer />}
    </div>
  );
};

export default Layout;
