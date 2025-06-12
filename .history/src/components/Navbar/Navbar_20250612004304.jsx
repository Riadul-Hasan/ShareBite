import React, { use, useEffect, useState } from 'react';

import { Link, NavLink, useNavigate } from 'react-router';

import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';

const Navbar = () => {

    const { user, logOut } = use(AuthContext)
    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light")
    const navigate = useNavigate()
    // console.log(user)

    useEffect(() => {
        localStorage.setItem("theme", theme)
        const localTheme = localStorage.getItem("theme")
        document.querySelector("html").setAttribute("data-theme", localTheme)
    }, [theme])

    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme("dark")
        }
        else {
            setTheme("light")
        }
    }

    const handleLogout = () => [
        logOut()
            .then(() => {
                Swal.fire({
                    icon: "error",
                    title: "You are Logged Out",
                    text: "",

                });
                navigate("/login")
            })
            .catch(error => {
                console.log(error)
            })
    ]
    return (
        <div className="navbar bg-gradient-to-r bg-base-300  px-8 py-4 rounded-lg shadow-lg ">
            {/* Mobile menu button (unchanged functionality) */}
            <div className="navbar-start ">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white hover:bg-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-green-600 rounded-box z-10 mt-3 w-52 p-2 shadow">
                        <NavLink to="/" className={({ isActive }) =>
                            `px-4 py-2 rounded-lg font-medium transition-all ${isActive ? 'bg-white text-green-600' : 'hover:bg-green-600 hover:bg-opacity-30'}`}>
                            <li>Home</li>
                        </NavLink>
                        <NavLink to="/explore" className={({ isActive }) =>
                            `px-4 py-2 rounded-lg font-medium transition-all ${isActive ? 'bg-white text-green-600' : 'hover:bg-green-600 hover:bg-opacity-30'}`}>
                            <li>Explore Gardeners</li>
                        </NavLink>
                        <NavLink to="/browseTips" className={({ isActive }) =>
                            `px-4 py-2 rounded-lg font-medium transition-all ${isActive ? 'bg-white text-green-600' : 'hover:bg-green-600 hover:bg-opacity-30'}`}>
                            <li>Browse Tips</li>
                        </NavLink>
                        {
                            user && <NavLink to="/shareTips" className={({ isActive }) =>
                                `px-4 py-2 rounded-lg font-medium transition-all ${isActive ? 'bg-white text-green-600' : 'hover:bg-green-600 hover:bg-opacity-30'}`}>
                                <li>Share a Tip</li>
                            </NavLink>

                        }
                        {
                            user && <NavLink to="/myTips" className={({ isActive }) =>
                                `px-4 py-2 rounded-lg font-medium transition-all ${isActive ? 'bg-white text-green-600' : 'hover:bg-green-600 hover:bg-opacity-30'}`}>
                                <li>My Tips</li>
                            </NavLink>
                        }


                        {/* Auth buttons */}
                        <div className="flex items-center ml-2 gap-3">
                            {
                                user ? null : (
                                    <>
                                        <NavLink to="/login" className={({ isActive }) =>
                                            `px-4 py-2 rounded-lg font-medium transition-all ${isActive ? 'bg-white text-green-600' : 'hover:bg-green-600 hover:bg-opacity-30'}`}>
                                            <li>Login</li>
                                        </NavLink>
                                        <NavLink to="/register" className={({ isActive }) =>
                                            `px-4 py-2 rounded-lg font-medium transition-all ${isActive ? 'bg-white text-green-600' : 'hover:bg-green-600 hover:bg-opacity-30'}`}>
                                            <li>Register</li>
                                        </NavLink>
                                    </>
                                )
                            }
                        </div>

                        {/* User dropdown */}
                        {
                            user && (
                                <li className="ml-2 mt-4">
                                    <details className="dropdown dropdown-end">
                                        <summary className="cursor-pointer flex items-center p-0 hover:bg-transparent">
                                            {
                                                user && (

                                                    <div className="hover:tooltip tooltip-open hover:tooltip-right" data-tip={user?.displayName}>

                                                        <div className="flex items-center space-x-2">
                                                            <img
                                                                src={user?.photoURL}
                                                                referrerPolicy='no-referrer'
                                                                alt="User Profile"
                                                                className="w-10 h-10 rounded-full border-2 border-white"
                                                            />
                                                        </div>
                                                    </div>

                                                )
                                            }
                                        </summary>
                                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-red-400 text-white rounded-box w-52 mt-2">
                                            <li>
                                                <button
                                                    onClick={handleLogout}
                                                    className="text-left hover:bg-green-100 rounded-lg p-2 font-medium"
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                            )
                        }
                    </ul>
                </div>
                {/* Logo */}
                <NavLink to="/" className="flex items-center">
                    {/* <img className='w-16 h-16 object-contain' src={Logo} alt="logo" /> */}
                    <span className="ml-2 text-2xl font-bold  hidden sm:inline-block">Share BIte</span>
                </NavLink>
            </div>

            {/* Desktop menu */}
            <div className="navbar-center hidden  lg:flex items-center">
                <ul className="menu menu-horizontal px-1 space-x-2">

                    <NavLink to="/" className={({ isActive }) =>
                        `px-4 py-2 rounded-lg font-medium transition-all ${isActive ? 'bg-white text-green-600' : 'hover:bg-green-600 hover:bg-opacity-30'}`}>
                        <li>Home</li>
                    </NavLink>
                    <NavLink to="/explore" className={({ isActive }) =>
                        `px-4 py-2 rounded-lg font-medium transition-all ${isActive ? 'bg-white text-green-600' : 'hover:bg-green-600 hover:bg-opacity-30'}`}>
                        <li>Explore Gardeners</li>
                    </NavLink>
                    <NavLink to="/browseTips" className={({ isActive }) =>
                        `px-4 py-2 rounded-lg font-medium transition-all ${isActive ? 'bg-white text-green-600' : 'hover:bg-green-600 hover:bg-opacity-30'}`}>
                        <li>Browse Tips</li>
                    </NavLink>
                    {
                        user && <NavLink to="/shareTips" className={({ isActive }) =>
                            `px-4 py-2 rounded-lg font-medium transition-all ${isActive ? 'bg-white text-green-600' : 'hover:bg-green-600 hover:bg-opacity-30'}`}>
                            <li>Share a Tip</li>
                        </NavLink>

                    }
                    {
                        user && <NavLink to="/myTips" className={({ isActive }) =>
                            `px-4 py-2 rounded-lg font-medium transition-all ${isActive ? 'bg-white text-green-600' : 'hover:bg-green-600 hover:bg-opacity-30'}`}>
                            <li>My Tips</li>
                        </NavLink>
                    }


                    {/* Auth buttons */}
                    <div className="flex items-center ml-2 gap-3">
                        {
                            user ? null : (
                                <>
                                    <NavLink to="/login" className={({ isActive }) =>
                                        `px-4 py-2 rounded-lg font-medium transition-all ${isActive ? 'bg-white text-green-600' : 'hover:bg-green-600 hover:bg-opacity-30'}`}>
                                        <li>Login</li>
                                    </NavLink>
                                    <NavLink to="/register" className={({ isActive }) =>
                                        `px-4 py-2 rounded-lg font-medium transition-all ${isActive ? 'bg-white text-green-600' : 'hover:bg-green-600 hover:bg-opacity-30'}`}>
                                        <li>Register</li>
                                    </NavLink>
                                </>
                            )
                        }
                    </div>

                    {/* User dropdown */}
                    {
                        user && (
                            <li className="ml-2">
                                <details className="dropdown dropdown-end">
                                    <summary className="cursor-pointer flex items-center p-0 hover:bg-transparent">
                                        {
                                            user && (

                                                <div className="hover:tooltip tooltip-open hover:tooltip-right" data-tip={user?.displayName}>

                                                    <div className="flex items-center space-x-2">
                                                        <img
                                                            src={user?.photoURL}
                                                            referrerPolicy='no-referrer'
                                                            alt="User Profile"
                                                            className="w-10 h-10 rounded-full border-2 border-white"
                                                        />
                                                    </div>
                                                </div>

                                            )
                                        }
                                    </summary>
                                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-white rounded-box w-52 mt-2 text-green-700">
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="text-left hover:bg-green-100 rounded-lg p-2 font-medium"
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                        )
                    }
                </ul>
            </div>

            {/* CTA Button */}
            <div className="navbar-end">

                {/* Toggle dark light theme functionality */}
                <label className="swap swap-rotate">
                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox"
                        onChange={handleToggle}
                        checked={theme === "light" ? false : true}

                    />

                    {/* sun icon */}
                    <svg
                        className="swap-on h-10 w-10 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
                        <path
                            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>

                    {/* moon icon */}
                    <svg
                        className="swap-off h-10 w-10 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
                        <path
                            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                </label>
            </div>
        </div>
    );
};

export default Navbar;