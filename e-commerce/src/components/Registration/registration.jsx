/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../assets/LoadingSpinner";
import { hostName } from "../../ulits/GlobalHostName";

export const SignUpOne = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    age: 0,
    password: "",
    personalAnswer: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Handle form data changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is Mandatory";
      valid = false;
    }

    if (!formData.username) {
      newErrors.username = "User name is Mandatory";
      valid = false;
    }

    if (!formData.age) {
      newErrors.age = "Age is Mandatory";
      valid = false;
    }

    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }

    if (!formData.personalAnswer || formData.personalAnswer) {
      newErrors.personalAnswer = "Answer is Mandatory";
      valid = false;
    }
    personalAnswer;

    setErrors(newErrors);
    return valid;
  };
  // const hostName = window.location.hostname;

  const createUser = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const user = await fetch(`http://${hostName}:3000/user/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (user.ok) {
        // alert("User Created Succesfully !!!");
        navigate("/login");
        setLoading(false);
      } else {
        alert("Not Able to Craete User", user.statusText);
        setLoading(false);
      }
    } catch (error) {
      alert("Error Creating Item : ", error);
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
        <div className=" container max-w-md mx-auto p-8 bg-slate-200 rounded-3xl shadow-lg mt-2">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Sign up
            </h2>
            <p className="mt-2 text-base text-gray-800">
              Already have an account?{" "}
              <Link
                to="/login"
                title="Sign"
                className="font-medium text-black transition-all duration-200 hover:underline"
              >
                Sign In
              </Link>
            </p>
            <form onSubmit={createUser} method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    User Name{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className={`flex h-10 w-full rounded-md border ${
                        errors.username ? "border-red-500" : "border-gray-950"
                      } border-gray-950 bg-transparent px-3 py-2 text-sm placeholder:text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                      type="text"
                      placeholder="Full Name"
                      id="name"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                    ></input>
                    {errors.username && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.username}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="age"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Age{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className={`flex h-10 w-full rounded-md border ${
                        errors.age ? "border-red-500" : "border-gray-950"
                      } border-gray-950 bg-transparent px-3 py-2 text-sm placeholder:text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                      type="number"
                      placeholder="Age"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                    ></input>
                    {errors.age && (
                      <p className="text-red-500 text-sm mt-1">{errors.age}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Email{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className={`flex h-10 w-full rounded-md border ${
                        errors.email ? "border-red-500" : "border-gray-950"
                      } border-gray-950 bg-transparent px-3 py-2 text-sm placeholder:text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                      type="email"
                      placeholder="Email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    ></input>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Password{" "}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className={`flex h-10 w-full rounded-md border ${
                        errors.password ? "border-red-500" : "border-gray-950"
                      } border-gray-950 bg-transparent px-3 py-2 text-sm placeholder:text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                      type="password"
                      placeholder="Password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    ></input>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>
                {
                  {
                    /* Question */
                  }
                }
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      What is your favourite colour ?{" "}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className={`flex h-10 w-full rounded-md border ${
                        errors.password ? "border-red-500" : "border-gray-950"
                      } border-gray-950 bg-transparent px-3 py-2 text-sm placeholder:text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
                      type="text"
                      placeholder="Enter Favourite Colour"
                      id="personalAnswer"
                      name="personalAnswer"
                      value={formData.personalAnswer}
                      onChange={handleInputChange}
                    ></input>
                    {errors.personalAnswer && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.personalAnswer}
                      </p>
                    )}
                  </div>
                </div>
                {
                  {
                    /* hello */
                  }
                }
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    {" "}
                    {!loading ? (
                      <>
                        Create Account <ArrowRight className="ml-2" size={16} />
                      </>
                    ) : (
                      <LoadingSpinner />
                    )}
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
                Sign up with Google
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
                Sign up with Facebook
              </button>
            </div> */}
          </div>
        </div>
        {/* <div className="h-full w-full">
          <img
            className="mx-auto h-full w-full rounded-md object-cover"
            src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
            alt=""
          />
        </div> */}
      </div>
    </section>
  );
};
