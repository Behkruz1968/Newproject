// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiShoppingCart,
  FiSearch,
  FiHeart,
  FiMenu,
  FiX,
} from "react-icons/fi";
import logo from "../../../public/vite.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateCounts = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const liked = JSON.parse(localStorage.getItem("liked")) || [];
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
      setLikeCount(liked.length);
    };

    updateCounts();

    window.addEventListener("storage", updateCounts);
    window.addEventListener("liked-changed", updateCounts);
    window.addEventListener("cart-changed", updateCounts);

    return () => {
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener("liked-changed", updateCounts);
      window.removeEventListener("cart-changed", updateCounts);
    };
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinkClass = ({ isActive }) =>
    isActive ? "text-black font-bold" : "hover:text-black";

  return (
    <header className="w-full px-4 md:px-8 py-4 flex justify-between items-center bg-white shadow-sm">
      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="Logo" className="w-8 h-8" />
        <span className="text-xl font-bold text-gray-800">Furniro</span>
      </div>

      {/* Burger icon */}
      <div className="md:hidden text-2xl" onClick={toggleMenu}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </div>

      {/* Nav Links */}
      <nav
        className={`${
          menuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent z-50 md:gap-6 gap-4 p-6 md:p-0 shadow md:shadow-none`}
      >
        <NavLink to="/" className={navLinkClass} onClick={() => setMenuOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/shop" className={navLinkClass} onClick={() => setMenuOpen(false)}>
          Shop
        </NavLink>
        <NavLink to="/blog" className={navLinkClass} onClick={() => setMenuOpen(false)}>
          Blog
        </NavLink>
        <NavLink to="/contact" className={navLinkClass} onClick={() => setMenuOpen(false)}>
          Contact
        </NavLink>
        <NavLink to="/my-orders" className={navLinkClass} onClick={() => setMenuOpen(false)}>
          Orders
        </NavLink>
      </nav>

      {/* Icons */}
      <div className="hidden md:flex items-center gap-4 relative">
        <FiUser onClick={() => navigate("/my-orders")} className="w-5 h-5 cursor-pointer" />
        <FiSearch className="w-5 h-5 cursor-pointer" />

        <div className="relative cursor-pointer" onClick={() => navigate("/liked")}>
          <FiHeart className="w-5 h-5" />
          {likeCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {likeCount}
            </span>
          )}
        </div>

        <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
          <FiShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
