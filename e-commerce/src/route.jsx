import { Route } from "react-router-dom";
import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { SignInOne } from "./components/Login/login";
import { SignUpOne } from "./components/Registration/registration";
import Contact from "./components/ContactUs/Contact";
// import { Home } from "./components/Home/Home";
import ProductCard from "./components/ProductCard/ProductCard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<ProductCard />} />
      <Route path="login" element={<SignInOne />} />
      <Route path="registration" element={<SignUpOne />} />
      <Route path="contact" element={<Contact />} />
    </Route>
  )
);

export default router;
