import { Route } from "react-router-dom";
import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { SignInOne } from "./components/Login/login";
import { SignUpOne } from "./components/Registration/registration";
import Contact from "./components/ContactUs/Contact";
import { Home } from "./components/Home/Home";
import NoMatch from "./components/NoMatch/NoMatch";
import { AboutPageOne } from "./components/AboutUs/About";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import Terms from "./components/Terms/Terms";
import { Details } from "./components/DetailedProductCard/DetailedProductCard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="aboutus" element={<AboutPageOne />} />
      <Route path="login" element={<SignInOne />} />
      <Route path="registration" element={<SignUpOne />} />
      <Route path="contact" element={<Contact />} />
      <Route path="privacypolicy" element={<PrivacyPolicy />} />
      <Route path="terms" element={<Terms />} />
      <Route path="details" element={<Details />} />
      <Route path="*" element={<NoMatch />} />
    </Route>
  )
);

export default router;
