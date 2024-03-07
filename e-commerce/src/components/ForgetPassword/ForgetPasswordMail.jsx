/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/authSlice";
import { AlertBanner } from "../Banners/AlertBanner";
import LoadingSpinner from "../../assets/LoadingSpinner";
import { hostName } from "../../ulits/GlobalHostName";
import { SuccessBanner } from "../Banners/SuccessBanner";

export const ForgetPasswordMail = () => {
  //State to handle form data
  const [forgetPasswordFormData, setForgetPasswordFormData] = useState({
    email: "",
  });

  //State to handle error data
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const dispatch = useDispatch();

  //for navigation
  const navigation = useNavigate();

  //Used to handle input changes at every input area in the form
  const handleInputChange = (e) => {
    setForgetPasswordFormData({
      ...forgetPasswordFormData,
      [e.target.name]: e.target.value,
    });
  };
  const ForgetPassword = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const loginData = await fetch(
        `http://${hostName}:3000/user/forget-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(forgetPasswordFormData),
        }
      );

      const response = await loginData.json();
      // console.log(response);
      if (!response.isError) {
        setSuccessMessage(true);
        setLoading(false);
        // navigation("/");
      } else {
        setIsError(true);
        setErrorMessage(response.message)
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      //alert("Error ", error);
      setLoading(false);
    }
  };

  return (
    <section
      className="bg-cover bg-center min-h-screen"
      style={{
        backgroundImage:
          "url('https://www.befunky.com/images/prismic/68363147-7351-4f58-a545-3e744a9413b0_hero-photo-to-cartoon-2.jpg?auto=avif,webp&format=jpg&width=896')",
      }}
    >
      <div className="min-h-screen w-full flex flex-col justify-center items-center">
        <div className=" container max-w-md mx-auto p-8  bg-slate-200 rounded-3xl shadow-lg mt-8">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            {isError && <AlertBanner text={errorMessage} />}
            {successMessage && <SuccessBanner text={"Please check your mail account"} />}

            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Forget Password ??
            </h2>
            <form onSubmit={ForgetPassword} method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Email address{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-950 bg-transparent px-3 py-2 text-sm placeholder:text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={forgetPasswordFormData.email}
                      required
                      onChange={handleInputChange}
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Send Mail <ArrowRight className="ml-2" size={16} />
                    <div className=" text-slate-950">
                      {loading && <LoadingSpinner />}
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
