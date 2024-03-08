/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { Route, Navigate } from "react-router-dom";
import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./features/home/layout/Layout";
import { SignInOne } from "./features/auth/component/login";
import { SignUpOne } from "./features/auth/component/registration";
import Contact from "./features/home/components/Contact";
import { Home } from "./features/home/components/Home";
import { AboutPageOne } from "./features/home/components/About";
import PrivacyPolicy from "./features/home/components/PrivacyPolicy";
import Terms from "./features/home/components/Terms";
import { Details } from "./features/product/components/DetailedProductCard";
import { AdminDashboard } from "./features/Admin/components/AdminDashboard";
import AddProduct from "./features/product/components/AddProduct";
import ReturnPolicy from "./features/home/components/ReturnPolicy";
import ResetPassword from "./features/auth/component/ResetPassword";
import { ForgetPasswordMail } from "./features/auth/component/ForgetPasswordMail";
import { Landing } from "./features/NewHome/container/Landing";
// import { ProductCard } from "./components/ProductCard/ProductCard";

const isAuthenticated = () => {
  const userData = localStorage.getItem("user");
  return userData;
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/*Normal Routes Without Authentication*/}
      <Route path="" element={<Home />} />
      <Route path="contact" element={<Contact />} />
      <Route path="aboutus" element={<AboutPageOne />} />
      <Route path="privacypolicy" element={<PrivacyPolicy />} />
      <Route path="terms" element={<Terms />} />
      <Route path="resetpassword/:token" element={<ResetPassword />} />
      <Route path="forgetpassword" element={<ForgetPasswordMail />} />
      <Route path="returnpolicy" element={<ReturnPolicy />} />

      {/*Protectetd Routes*/}
      <Route
        path="details"
        element={<ProtectedRoute element={<Details />} />}
      />
      <Route
        path="admin"
        element={<ProtectedRoute element={<AdminDashboard />} />}
      />
      <Route path="add" element={<ProtectedRoute element={<AddProduct />} />} />
      <Route
        path="edit/:id"
        element={<ProtectedRoute element={<AddProduct />} />}
      />

      {/*Auth Routes*/}
      <Route
        path="login"
        element={isAuthenticated() ? <Navigate to="/" /> : <SignInOne />}
      />
      <Route
        path="registration"
        element={isAuthenticated() ? <Navigate to="/" /> : <SignUpOne />}
      />
      <Route path="hello" element={<Landing />} />
    </Route>
  )
);

export default router;
