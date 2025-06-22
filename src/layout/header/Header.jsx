import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiUser, FiShoppingCart, FiSearch, FiHeart } from 'react-icons/fi';
import logo from '../../../public/vite.svg'; // logoni o'zingizga moslashtiring

const Header = () => {
  return (
    <header className="w-full px-4 md:px-8 py-4 flex justify-between items-center bg-white shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="w-8 h-8" />
        <span className="text-xl font-bold text-gray-800">Furniro</span>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'text-black font-semibold' : 'hover:text-black'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive ? 'text-black font-semibold' : 'hover:text-black'
          }
        >
          Shop
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? 'text-black font-semibold' : 'hover:text-black'
          }
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? 'text-black font-semibold' : 'hover:text-black'
          }
        >
          Contact
        </NavLink>
      </nav>

      {/* Icons */}
      <div className="flex items-center gap-4">
        <FiUser className="w-5 h-5 text-gray-700 cursor-pointer"/>
               <FiSearch className="w-5 h-5 text-gray-700 cursor-pointer" />
               <FiHeart className="w-5 h-5 text-gray-700 cursor-pointer"/>
        <FiShoppingCart className="w-5 h-5 text-gray-700 cursor-pointer" />

      </div>
    </header>
  );
};

export default React.memo(Header);
