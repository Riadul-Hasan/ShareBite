import React, { use } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import ThemeToggle from "../themeToggle/ThemeToggle";



const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => [
    logOut()
      .then(() => {
        Swal.fire({
          icon: "error",
          title: "You are Logged Out",
          text: "",
        });
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      }),
  ];

  return (
    <div className="navbar bg-[#FFF9F0] px-8 py-4 rounded-lg sticky top-0 z-50 shadow-md dark:bg-stone-800 dark:shadow-stone-900">
      {/* Mobile menu button */}
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden text-white hover:bg-green-600 dark:hover:bg-amber-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-800 dark:text-amber-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow dark:bg-stone-700 dark:shadow-stone-900"
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all ${isActive
                  ? "bg-white text-amber-500 dark:bg-stone-600 dark:text-amber-400"
                  : "hover:bg-amber-200 hover:bg-opacity-30 dark:hover:bg-amber-900 dark:hover:bg-opacity-30"
                }`
              }
            >
              <li className="dark:text-amber-100">Home</li>
            </NavLink>
            <NavLink
              to="/availableFoods"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all ${isActive
                  ? "bg-white text-amber-500 dark:bg-stone-600 dark:text-amber-400"
                  : "hover:bg-amber-200 hover:bg-opacity-30 dark:hover:bg-amber-900 dark:hover:bg-opacity-30"
                }`
              }
            >
              <li className="dark:text-amber-100">Available Foods</li>
            </NavLink>

            {/* Added About Us for mobile */}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all ${isActive
                  ? "bg-white text-amber-500 dark:bg-stone-600 dark:text-amber-400"
                  : "hover:bg-amber-200 hover:bg-opacity-30 dark:hover:bg-amber-900 dark:hover:bg-opacity-30"
                }`
              }
            >
              <li className="dark:text-amber-100">About Us</li>
            </NavLink>

            {user && (
              <NavLink
                to="/addFoods"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium transition-all ${isActive
                    ? "bg-white text-amber-500 dark:bg-stone-600 dark:text-amber-400"
                    : "hover:bg-amber-200 hover:bg-opacity-30 dark:hover:bg-amber-900 dark:hover:bg-opacity-30"
                  }`
                }
              >
                <li className="dark:text-amber-100">Add Food</li>
              </NavLink>
            )}
            {user && (
              <NavLink
                to="/manageFoods"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium transition-all ${isActive
                    ? "bg-white text-amber-500 dark:bg-stone-600 dark:text-amber-400"
                    : "hover:bg-amber-200 hover:bg-opacity-30 dark:hover:bg-amber-900 dark:hover:bg-opacity-30"
                  }`
                }
              >
                <li className="dark:text-amber-100">Manage My Foods</li>
              </NavLink>
            )}
            {user && (
              <NavLink
                to="/myFoodRequest"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium transition-all ${isActive
                    ? "bg-white text-amber-500 dark:bg-stone-600 dark:text-amber-400"
                    : "hover:bg-amber-200 hover:bg-opacity-30 dark:hover:bg-amber-900 dark:hover:bg-opacity-30"
                  }`
                }
              >
                <li className="dark:text-amber-100">My Food Request</li>
              </NavLink>
            )}

            {/* Auth buttons */}
            <div className="flex items-center ml-2 gap-3">
              {user ? null : (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg font-medium transition-all ${isActive
                        ? "bg-white text-amber-500 dark:bg-stone-600 dark:text-amber-400"
                        : "hover:bg-amber-200 hover:bg-opacity-30 dark:hover:bg-amber-900 dark:hover:bg-opacity-30"
                      }`
                    }
                  >
                    <li className="dark:text-amber-100">Login</li>
                  </NavLink>
                  <NavLink
                    to="/signUp"
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg font-medium transition-all ${isActive
                        ? "bg-white text-amber-500 dark:bg-stone-600 dark:text-amber-400"
                        : "hover:bg-amber-200 hover:bg-opacity-30 dark:hover:bg-amber-900 dark:hover:bg-opacity-30"
                      }`
                    }
                  >
                    <li className="dark:text-amber-100">SignUp</li>
                  </NavLink>
                </>
              )}
            </div>

            {/* User dropdown */}
            {user && (
              <li className="ml-2 mt-4">
                <details className="dropdown dropdown-end">
                  <summary className="cursor-pointer flex items-center p-0 hover:bg-transparent">
                    {user && (
                      <div
                        className="hover:tooltip tooltip-open hover:tooltip-right"
                        data-tip={user?.displayName}
                      >
                        <div className="flex items-center space-x-2">
                          <img
                            src={user?.photoURL}
                            referrerPolicy="no-referrer"
                            alt="User Profile"
                            className="w-10 h-10 rounded-full border-2 border-white dark:border-stone-600"
                          />
                        </div>
                      </div>
                    )}
                  </summary>
                  <ul className="p-2 shadow menu dropdown-content z-[1] bg-red-400 text-white rounded-box w-52 mt-2 dark:bg-stone-700 dark:text-amber-100">
                    <li>
                      <button
                        onClick={handleLogout}
                        className="text-left hover:bg-green-100 rounded-lg p-2 font-medium dark:hover:bg-stone-600"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </details>
              </li>
            )}
          </ul>
        </div>
        <NavLink to="/" className="flex items-center group">
          <span className="ml-2 text-2xl font-bold hidden sm:inline-block dark:text-amber-100">
            <span className="">Share</span>
            <span className="text-orange-500 group-hover:text-orange-600 dark:text-amber-400 dark:group-hover:text-amber-300">
              Bite
            </span>
          </span>
        </NavLink>
      </div>

      {/* Desktop menu */}
      <div className="navbar-center hidden lg:flex items-center">
        <ul className="menu menu-horizontal px-1 space-x-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg font-medium transition-all ${isActive
                ? "bg-white text-amber-500 dark:bg-stone-600 dark:text-amber-400"
                : "hover:bg-amber-200 hover:bg-opacity-30 dark:hover:bg-amber-900 dark:hover:bg-opacity-30"
              }`
            }
          >
            <li className="dark:text-amber-100">Home</li>
          </NavLink>
          <NavLink
            to="/availableFoods"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg font-medium transition-all ${isActive
                ? "bg-white text-amber-500 dark:bg-stone-600 dark:text-amber-400"
                : "hover:bg-amber-200 hover:bg-opacity-30 dark:hover:bg-amber-900 dark:hover:bg-opacity-30"
              }`
            }
          >
            <li className="dark:text-amber-100">Available Foods</li>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg font-medium transition-all ${isActive
                ? "bg-white text-amber-500 dark:bg-stone-600 dark:text-amber-400"
                : "hover:bg-amber-200 hover:bg-opacity-30 dark:hover:bg-amber-900 dark:hover:bg-opacity-30"
              }`
            }
          >
            <li className="dark:text-amber-100">About Us</li>
          </NavLink>

          {user && (
            <NavLink
              to="/addFoods"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all ${isActive
                  ? "bg-white text-amber-500 dark:bg-stone-600 dark:text-amber-400"
                  : "hover:bg-amber-200 hover:bg-opacity-30 dark:hover:bg-amber-900 dark:hover:bg-opacity-30"
                }`
              }
            >
              <li className="dark:text-amber-100">Add Food</li>
            </NavLink>
          )}

          {user && (
            <NavLink
              to="/manageFoods"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all ${isActive
                  ? "bg-white text-amber-500 dark:bg-stone-600 dark:text-amber-400"
                  : "hover:bg-amber-200 hover:bg-opacity-30 dark:hover:bg-amber-900 dark:hover:bg-opacity-30"
                }`
              }
            >
              <li className="dark:text-amber-100">Manage My Foods</li>
            </NavLink>
          )}
          {user && (
            <NavLink
              to="/myFoodRequest"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all ${isActive
                  ? "bg-white text-amber-500 dark:bg-stone-600 dark:text-amber-400"
                  : "hover:bg-amber-200 hover:bg-opacity-30 dark:hover:bg-amber-900 dark:hover:bg-opacity-30"
                }`
              }
            >
              <li className="dark:text-amber-100">My Food Request</li>
            </NavLink>
          )}

          {/* Auth buttons */}
          <div className="flex items-center ml-2 gap-3">
            {user ? null : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg font-medium transition-all ${isActive
                      ? "bg-white text-amber-500 dark:bg-stone-600 dark:text-amber-400"
                      : "hover:bg-amber-200 hover:bg-opacity-30 dark:hover:bg-amber-900 dark:hover:bg-opacity-30"
                    }`
                  }
                >
                  <li className="dark:text-amber-100">Login</li>
                </NavLink>
                <NavLink
                  to="/signUp"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg font-medium transition-all ${isActive
                      ? "bg-white text-amber-500 dark:bg-stone-600 dark:text-amber-400"
                      : "hover:bg-amber-200 hover:bg-opacity-30 dark:hover:bg-amber-900 dark:hover:bg-opacity-30"
                    }`
                  }
                >
                  <li className="dark:text-amber-100">Register</li>
                </NavLink>
              </>
            )}
          </div>

          {/* User dropdown */}
          {user && (
            <li className="ml-2">
              <details className="dropdown dropdown-end">
                <summary className="cursor-pointer flex items-center p-0 hover:bg-transparent">
                  {user && (
                    <div
                      className="hover:tooltip tooltip-open hover:tooltip-right"
                      data-tip={user?.displayName}
                    >
                      <div className="flex items-center space-x-2">
                        <img
                          src={user?.photoURL}
                          referrerPolicy="no-referrer"
                          alt="User Profile"
                          className="w-10 h-10 rounded-full border-2 border-white dark:border-stone-600"
                        />
                      </div>
                    </div>
                  )}
                </summary>
                <ul className="p-2 shadow menu dropdown-content z-[1] bg-white rounded-box w-52 mt-2 text-green-700 dark:bg-stone-700 dark:text-amber-100">
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-left hover:bg-green-100 rounded-lg p-2 font-medium dark:hover:bg-stone-600"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </details>
            </li>
          )}
        </ul>
      </div>

      {/* CTA Button */}
      <div className="navbar-end">
        <ThemeToggle></ThemeToggle>
      </div>
    </div>
  );
};

export default Navbar;