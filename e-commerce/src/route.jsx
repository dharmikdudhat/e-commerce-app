/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { Route, Navigate } from "react-router-dom";
import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { SignInOne } from "./components/Login/login";
import { SignUpOne } from "./components/Registration/registration";
import Contact from "./components/ContactUs/Contact";
import { Home } from "./components/Home/Home";
import { AboutPageOne } from "./components/AboutUs/About";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import Terms from "./components/Terms/Terms";
import { Details } from "./components/DetailedProductCard/DetailedProductCard";
import { AdminDashboard } from "./components/AdminDashboard/AdminDashboard";
import AddProduct from "./components/AddProduct/AddProduct";
import ReturnPolicy from "./components/ReturnPolicy/ReturnPolicy";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import { ForgetPasswordMail } from "./components/ForgetPassword/ForgetPasswordMail";
import NoMatch from "./components/NoMatch/NoMatch";
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
      <Route path="*" element={<NoMatch />} />
    </Route>
  )
);

export default router;
