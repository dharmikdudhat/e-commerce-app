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
      <Route path="" element={<Home />} />
      <Route path="aboutus" element={<AboutPageOne />} />
      <Route
        path="login"
        element={isAuthenticated() ? <Navigate to="/" /> : <SignInOne />}
      />
      <Route
        path="registration"
        element={isAuthenticated() ? <Navigate to="/" /> : <SignUpOne />}
      />
      <Route
        path="contact"
        element={<ProtectedRoute element={<Contact />} />}
      />
      <Route
        path="privacypolicy"
        element={<ProtectedRoute element={<PrivacyPolicy />} />}
      />
      <Route path="terms" element={<ProtectedRoute element={<Terms />} />} />
      <Route path="details" element={<Details />} />
      <Route path="resetpassword/:token" element={<ResetPassword />} />
      <Route path="forgetpassword" element={<ForgetPasswordMail />} />
      <Route
        path="admin"
        element={<ProtectedRoute element={<AdminDashboard />} />}
      />
      <Route path="add" element={<ProtectedRoute element={<AddProduct />} />} />
      <Route
        path="edit/:id"
        element={<ProtectedRoute element={<AddProduct />} />}
      />
      <Route
        path="returnpolicy"
        element={<ProtectedRoute element={<ReturnPolicy />} />}
      />
    </Route>
  )
);

export default router;
