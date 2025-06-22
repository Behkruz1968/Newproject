import React from "react";
import logo from "../../../public/logo.png";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 border-b border-gray-300 pb-8">
        <div className="max-w-xs">
          <img src={logo} alt="Logo" className="w-32 mb-4" />
          <p className="text-sm leading-6">
            400 University Drive Suite 200 <br />
            Coral Gables, <br />
            FL 33134
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-black">Home</a></li>
            <li><a href="/shop" className="hover:text-black">Shop</a></li>
            <li><a href="/about-us" className="hover:text-black">About</a></li>
            <li><a href="/contact" className="hover:text-black">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-3">Help</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/payment" className="hover:text-black">Payment Options</a></li>
            <li><a href="/returns" className="hover:text-black">Returns</a></li>
            <li><a href="/privacy" className="hover:text-black">Privacy Policies</a></li>
          </ul>
        </div>

        <div className="w-full max-w-sm">
          <h4 className="text-lg font-semibold mb-3">Newsletter</h4>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button className="px-5 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-all duration-200">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-sm text-gray-500 pb-4">
        © 2025 Furniro. All rights reserved.
      </div>
    </footer>
  );
}
