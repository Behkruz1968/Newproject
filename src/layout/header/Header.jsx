import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiUser, FiShoppingCart, FiSearch, FiHeart } from 'react-icons/fi';
import logo from '../../../public/vite.svg'; // logoni moslashtir

const Header = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalCount);

    const storageListener = () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCount = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(updatedCount);
    };

    window.addEventListener("storage", storageListener);
    return () => window.removeEventListener("storage", storageListener);
  }, []);

  return (
    <header className="w-full px-4 md:px-8 py-4 flex justify-between items-center bg-white shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" className="w-8 h-8" />
        <span className="text-xl font-bold text-gray-800">Furniro</span>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
        <NavLink to="/" className={({ isActive }) => isActive ? 'text-black font-semibold' : 'hover:text-black'}>
          Home
        </NavLink>
        <NavLink to="/shop" className={({ isActive }) => isActive ? 'text-black font-semibold' : 'hover:text-black'}>
          Shop
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'text-black font-semibold' : 'hover:text-black'}>
          About
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-black font-semibold' : 'hover:text-black'}>
          Contact
        </NavLink>
      </nav>

     {/* Icons */}
<div className="flex items-center gap-4 relative">
  <FiUser
    className="w-5 h-5 text-gray-700 cursor-pointer"
    onClick={() => navigate("/my-orders")}
    title="Zakazlarim"
  />
  <FiSearch className="w-5 h-5 text-gray-700 cursor-pointer" />
  <FiHeart className="w-5 h-5 text-gray-700 cursor-pointer" />
  <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
    <FiShoppingCart className="w-5 h-5 text-gray-700" />
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

export default React.memo(Header);
