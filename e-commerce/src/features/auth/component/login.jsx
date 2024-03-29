/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/authSlice";
import { AlertBanner } from "../../../shared/components/AlertBanner";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import { hostName } from "../../../shared/constant/GlobalHostName";

export const SignInOne = () => {
  //State to handle form data
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  //State to handle error data
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  //for navigation
  const navigation = useNavigate();

  // const userData = useSelector((state) => state.auth.user);

  //Used to handle input changes at every input area in the form
  const handleInputChange = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  // Redirect to home page or admin page based on user role
  //  useEffect(() => {
  //   if (token) {
  //     const userRole = response.user.role; // Assuming the role is available in the response
  //     if (userRole === "Admin") {
  //       navigation("/admin");
  //     } else {
  //       navigation("/");
  //     }
  //   }
  // }, [navigation]);

  //Function to check user credentials and log them in
  //  const hostName = window.location.hostname;

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const loginData = await fetch(`${hostName}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormData),
      });

      const response = await loginData.json();
      // console.log(response);
      if (!response.isError) {
        dispatch(login(response.data));
        setLoading(false);

        if (response.data.user.role == "Admin") {
          console.log(response.data.user.role);
          navigation("/admin");
        } else {
          navigation("/");
        }
      } else {
        setIsError(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      //alert("Error ", error);
      setLoading(false);
    }
  };

  return (
    <section className="bg-cover bg-center min-h-screen">
      <div className="min-h-screen w-full flex flex-col justify-center items-center">
        <div className=" container max-w-md mx-auto p-8  bg-slate-200 rounded-3xl shadow-lg mt-8">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            {isError && <AlertBanner text={"Invalid Credentials"} />}
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Sign in
            </h2>
            <p className="mt-2 text-sm text-gray-800">
              Don&apos;t have an account?{" "}
              <Link
                to="/registration"
                title=""
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Create a free account
              </Link>
            </p>
            <form onSubmit={loginUser} method="POST" className="mt-8">
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
                      value={loginFormData.email}
                      required
                      onChange={handleInputChange}
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Password{" "}
                    </label>
                    <Link
                      href="#"
                      title=""
                      className="text-sm font-semibold text-black hover:underline"
                      to="/forgetpassword"
                    >
                      {" "}
                      Forgot password?{" "}
                    </Link>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-950 bg-transparent px-3 py-2 text-sm placeholder:text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={loginFormData.password}
                      required
                      onChange={handleInputChange}
                    ></input>
                  </div>
                </div>
                {/* <div className="flex items-center me-4">
                  <input
                    id="admin"
                    type="checkbox"
                    onChange={updateRole}
                    value="admin"
                    name="inline-radio-group"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  ></input>
                  <label className="ms-2 text-sm font-medium text-gray-900">
                    I Am Admin
                  </label>
                </div> */}
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Get started <ArrowRight className="ml-2" size={16} />
                    <div className=" text-slate-950">
                      {loading && <LoadingSpinner />}
                    </div>
                  </button>
                </div>
              </div>
            </form>
            {/* <div className="mt-3 space-y-3">
              <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <svg
                    className="h-6 w-6 text-rose-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                  </svg>
                </span>
                Sign in with Google
              </button>
              <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              >
                <span className="mr-2 inline-block">
                  <svg
                    className="h-6 w-6 text-[#2563EB]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                  </svg>
                </span>
                Sign in with Facebook
              </button>
            </div> */}
          </div>
        </div>

        {/* <div className="h-full w-full">
          <img
            className="mx-auto h-full w-full rounded-md object-cover"
            src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt=""
          />
        </div> */}
      </div>
    </section>
  );
};
