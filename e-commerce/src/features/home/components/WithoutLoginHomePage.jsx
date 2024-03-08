"use client";

import React, { useEffect, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Contact from "./Contact";
import { Link as ScrollLink } from "react-scroll";
import { animated, useSpring } from "react-spring";

export default function WithoutLoginHomePage() {
  const [scrollY, setScrollY] = React.useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const contactUsRef = useRef(null);

  // Hero Section Animation
  // const fadeInHero = useSpring({
  //   opacity: scrollY > 0 ? 1 : 0,
  //   transform: scrollY > 0 ? "translateY(0)" : "translateY(50px)",
  // });

  // Features Section Animation
  const fadeInFeatures = useSpring({
    opacity: scrollY > 250 ? 1 : 0,
    transform: scrollY > 250 ? "translateY(0)" : "translateY(50px)",
  });
  const fadeIndata = useSpring({
    opacity: scrollY > 500 ? 1 : 0,
    transform: scrollY > 500 ? "translateY(0)" : "translateY(50px)",
  });

  // FAQs Section Animation
  const fadeInFAQs = useSpring({
    opacity: scrollY > 750 ? 1 : 0,
    transform: scrollY > 750 ? "translateY(0)" : "translateY(50px)",
  });

  // Pricing Section Animation
  const fadeInPricing = useSpring({
    opacity: scrollY > 1500 ? 1 : 0,
    transform: scrollY > 1500 ? "translateY(0)" : "translateY(50px)",
  });

  const scrollToContactUs = () => {
    contactUsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full">
      {/* <div className=" content-center text-center justify-center">
        <div className=" bg-teal-400 p-2 mt-2 mb-2 text-center font-bold text-xl">
          <h1>Welcome to our Filter Shop Website!</h1>
          <p>Here you can find the best filters for your everyday water needs.</p>
        </div>
      </div> */}
      {/* Hero Section */}
      <div className="relative w-full bg-sky-200 ">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
            <div className="mt-8 flex max-w-max items-center space-x-2 rounded-full bg-gray-100 p-1">
              <div className="rounded-full bg-white p-1 px-2">
                <p className="text-sm font-medium">
                  {" "}
                  Safe Water is Most Important
                </p>
              </div>
              <p className="text-sm font-medium">
                Purchase Water Filter &rarr;
              </p>
            </div>
            <h1 className="mt-8 text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
              People who care about your health
            </h1>
            <p className="mt-8 text-lg text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur modi blanditiis dolores quasi eaque explicabo!
            </p>

            <ScrollLink to="contact" smooth={true} duration={500}>
              <button
                className="text-white bg-black px-3 py-1 rounded mt-4"
                onClick={scrollToContactUs}
              >
                Contact Us
              </button>
            </ScrollLink>
          </div>
          <div className="relative lg:col-span-5 lg:-mr-8 xl:col-span-6">
            <img
              className="aspect-[3/2] bg-gray-50 object-cover lg:aspect-[4/3] lg:h-[700px] xl:aspect-[16/9]"
              src="https://img.freepik.com/free-photo/happy-woman-drinking-water_144627-28745.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      {/* Features Section */}
      <animated.div
        style={fadeInFeatures}
        className="mx-auto my-16 max-w-7xl p-2 lg:px-8 bg-sky-100 rounded-md "
      >
        <div className="grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4 ">
          <div className="">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
              <svg
                className="h-9 w-9 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                />
              </svg>
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">
              Secured Payments
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </p>
          </div>
          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
              <svg
                className="h-9 w-9 text-orange-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">
              Fast & Easy to Load
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </p>
          </div>
          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-9 w-9 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">
              Light & Dark Version
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </p>
          </div>
          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-9 w-9 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </div>
            <h3 className="mt-8 text-lg font-semibold text-black">
              Filter Blocks
            </h3>
            <p className="mt-4 text-sm text-gray-600">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </p>
          </div>
        </div>
      </animated.div>
      {/*total sale and data*/}
      <animated.div
        className="flex bg-cyan-100 justify-center  rounded-md text-center m-6 font-bold text-2xl p-4 content-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4"
        style={fadeIndata}
      >
        <div className="flex items-center justify-center bg-blue-300 rounded-full w-40 h-40 transform transition-transform hover:easy-in-out hover:scale-105 m-auto">
          <div className="text-center">
            <span className="block font-bold">200+</span>
            <span className="block">Happy Customers</span>
          </div>
        </div>
        <div className="flex items-center justify-center bg-blue-300 rounded-full w-40 h-40 transform transition-transform hover:easy-in-out hover:scale-105 m-auto">
          <div className="text-center">
            <span className="block font-bold">20+</span>
            <span className="block">Varieties of Filters</span>
          </div>
        </div>

        <div className="flex items-center justify-center bg-blue-300 rounded-full w-40 h-40 transform transition-transform hover:easy-in-out hover:scale-105 m-auto">
          <div className="text-center">
            <span className="block font-bold">150+</span>
            <span className="block">Sales</span>
          </div>
        </div>
        <div className="flex items-center justify-center bg-blue-300 rounded-full w-40 h-40 transform transition-transform hover:easy-in-out hover:scale-105 m-auto">
          <div className="text-center">
            <span className="block font-bold">300+</span>
            <span className="block">Pending Orders</span>
          </div>
        </div>
      </animated.div>

      {/* FAQs */}
      <section className="mx-16 max-w-7xl bg-gray-50 px-2 py-10 md:px-0">
        <animated.div style={fadeInFAQs}>
          <div className="mx-16 max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 lg:mx-auto">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere,
              assumenda
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-3xl space-y-4 md:mt-16">
            <div className="cursor-pointer rounded-md border border-gray-400 shadow-lg transition-all duration-200">
              <button
                type="button"
                className="flex w-full items-center justify-between px-4 py-5 sm:p-6"
              >
                <span className="flex text-lg font-semibold text-black">
                  How do I get started?
                </span>

                <ChevronUp className="h-5 w-5 text-gray-500" />
              </button>
              <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                <p className="text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat aliquam adipisci iusto aperiam? Sint asperiores sequi
                  nobis inventore ratione deleniti?
                </p>
              </div>
            </div>
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="cursor-pointer rounded-md border border-gray-400 transition-all duration-200"
              >
                <button
                  type="button"
                  className="flex w-full items-start justify-between px-4 py-5 sm:p-6 md:items-center"
                >
                  <span className="flex text-start text-lg font-semibold text-black">
                    What is the difference between a free and paid account?
                  </span>
                  <ChevronDown className="hidden h-5 w-5 text-gray-500 md:block" />
                </button>
              </div>
            ))}
          </div>
          <p className="textbase mt-6 text-center text-gray-600">
            Can&apos;t find what you&apos;re looking for?{" "}
            <a
              href="#"
              title=""
              className="font-semibold text-black hover:underline"
            >
              Contact our support
            </a>
          </p>
        </animated.div>
      </section>
      {/* Pricing Section */}
      <animated.div
        style={fadeInPricing}
        className="mx-auto my-12 max-w-7xl md:my-24 lg:my-32 "
        id="contact"
      >
        <Contact />
      </animated.div>
    </div>
  );
}
