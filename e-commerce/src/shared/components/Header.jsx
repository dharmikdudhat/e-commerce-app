"use client";

import React, { useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
// import { Button } from "react-bootstrap";

const menuItemsList = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "About",
    to: "/aboutus",
  },
  {
    name: "Contact Us",
    to: "/contact",
  },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLogin, setisLogin] = React.useState(false);
  const dropDownRef = React.useRef(null);

  const handleClickOutside = (e) => {
    if (
      dropDownRef.current &&
      !dropDownRef.current.contains(e.target) &&
      !e.target.classList.contains("toggle-options")
    ) {
      // console.log("CLicked Outside", e.target);
      // console.log(dropDownRef.current)
      // console.log(dropDownRef.current.contains(e.target))
      // console.log(e.target.classList.contains("toggle-options"))
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    // console.log("AdminProductCard rendered");
    document.addEventListener("click", handleClickOutside);

    return () => {
      // console.log("AdminProductCard unmounted");
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const userdata = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (userdata) {
      setisLogin(true);
      // setMenuItems(tempArray);
    } else {
      setisLogin(false);
    }
  }, [userdata]);

  const dispatch = useDispatch();

  return (
    <div className="fixed top-0 w-full   justify-between bg-black z-10">
      <div className="mx-auto relative  flex flex-wrap max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex  items-center space-x-2">
          <span>
            <svg
              width="30"
              height="30"
              viewBox="0 0 50 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                fill="black"
              />
            </svg>
          </span>
          <span className="font-bold text-slate-50">Our&apos;s Shop</span>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            {menuItemsList.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `text-sm font-semibold ${
                      isActive ? "text-orange-700" : "text-slate-50"
                    } text-gray-800 hover:bg-slate-50 lg:hover:bg-transparent lg:border-0 hover:text-gray-400 lg:p-0`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="hidden lg:block">
            {!isLogin ? (
              <div className="flex gap-6">
                <div>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `text-sm font-semibold ${
                        isActive ? "text-orange-700" : "text-slate-50"
                      } text-gray-800 hover:bg-slate-50 lg:hover:bg-transparent lg:border-0 hover:text-gray-400 lg:p-0`
                    }
                  >
                    Login
                  </NavLink>
                </div>
                <div>
                  <NavLink
                    to="/registration"
                    className={({ isActive }) =>
                      `text-sm font-semibold ${
                        isActive ? "text-orange-700" : "text-slate-50"
                      } text-gray-800 hover:bg-slate-50 lg:hover:bg-transparent lg:border-0 hover:text-gray-400 lg:p-0`
                    }
                  >
                    Registration
                  </NavLink>
                </div>
              </div>
            ) : (
              <div>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-sm font-semibold ${
                      isActive ? "text-orange-700" : "text-slate-50"
                    } text-gray-800 hover:bg-slate-50 lg:hover:bg-transparent lg:border-0 hover:text-gray-400 lg:p-0`
                  }
                  onClick={() => dispatch(logout())}
                >
                  Log Out
                </NavLink>
              </div>
            )}
          </div>
        </div>
        <div className="lg:hidden">
          <Menu
            onClick={toggleMenu}
            className="text-slate-50 h-6 w-6 cursor-pointer"
          />
        </div>
        {isMenuOpen && (
          <div
            className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden"
            ref={dropDownRef}
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-50">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span>
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 50 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                          fill="black"
                        />
                      </svg>
                    </span>
                    <span className="font-bold">Dad&apos;s</span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black "
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItemsList.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.to}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </NavLink>
                    ))}
                  </nav>
                </div>
                <div>
                  {!isLogin ? (
                    <div className=" m-2">
                      <div className="p-1">
                        <NavLink
                          to="/login"
                          className={({ isActive }) =>
                            `text-sm font-semibold ${
                              isActive ? "text-orange-700" : "text-gray-900"
                            } text-gray-800 hover:bg-slate-50 lg:hover:bg-transparent lg:border-0 hover:text-gray-400 lg:p-0`
                          }
                        >
                          Login
                        </NavLink>
                      </div>
                      <div className="p-1">
                        <NavLink
                          to="/registration"
                          className={({ isActive }) =>
                            `text-sm font-semibold ${
                              isActive ? "text-orange-700" : "text-gray-900"
                            } text-gray-800 hover:bg-slate-50 lg:hover:bg-transparent lg:border-0 hover:text-gray-400 lg:p-0`
                          }
                        >
                          Registration
                        </NavLink>
                      </div>
                    </div>
                  ) : (
                    <div className=" m-2 p-1">
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          `text-sm font-semibold ${
                            isActive ? "text-orange-700" : "text-gray-900"
                          } text-gray-800 hover:bg-slate-50 lg:hover:bg-transparent lg:border-0 hover:text-gray-400 lg:p-0`
                        }
                        onClick={() => dispatch(logout())}
                      >
                        Log Out
                      </NavLink>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
