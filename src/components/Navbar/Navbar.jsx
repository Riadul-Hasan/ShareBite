import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
    return (
        <div className="navbar bg-gradient-to-r bg-base-300 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><a>Item 1</a></li>
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="navbar-center hidden lg:flex ">
    <ul className="menu menu-horizontal px-1 flex gap-4 items-center">
         <NavLink to="/" className={({ isActive }) =>
                        `px-4 py-2 rounded-lg font-medium transition-all ${isActive ? 'bg-white text-green-600' : 'hover:bg-green-600 hover:bg-opacity-30'}`}>
                        <li>Home</li>
                    </NavLink>
                    <NavLink to="/explore" className={({ isActive }) =>
                        `px-4 py-2 rounded-lg font-medium transition-all ${isActive ? 'bg-white text-green-600' : 'hover:bg-green-600 hover:bg-opacity-30'}`}>
                        <li>Available Foods</li>
                    </NavLink>
                    <NavLink to="/browseTips" className={({ isActive }) =>
                        `px-4 py-2 rounded-lg font-medium transition-all ${isActive ? 'bg-white text-green-600' : 'hover:bg-green-600 hover:bg-opacity-30'}`}>
                        <li>Add Food</li>
                    </NavLink>
                    <NavLink to="/browseTips" className={({ isActive }) =>
                        `px-4 py-2 rounded-lg font-medium transition-all ${isActive ? 'bg-white text-green-600' : 'hover:bg-green-600 hover:bg-opacity-30'}`}>
                        <li>Manage My Foods</li>
                    </NavLink>
                    <NavLink to="/browseTips" className={({ isActive }) =>
                        `px-4 py-2 rounded-lg font-medium transition-all ${isActive ? 'bg-white text-amber-600' : 'hover:bg-orange-600 hover:bg-opacity-30 hover:text-white'}`}>
                        <li>My Food Request</li>
                    </NavLink>

      

    </ul>
  </div>
  <div className="navbar-end space-x-4">
    <button className='btn btn-primary'>Login</button>
    <button className='btn btn-secondary'>SignUp</button>
  </div>
</div>
    );
};

export default Navbar;