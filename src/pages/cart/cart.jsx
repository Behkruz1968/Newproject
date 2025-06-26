import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import notfound from "@/assets/data.png";
import Support from "./fut";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(stored);
  }, []);

  const updateQuantity = (id, qty) => {
    if (isNaN(qty) || qty < 1) return;
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: qty } : item
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const filtered = cartItems.filter((item) => item.id !== id);
    setCartItems(filtered);
    localStorage.setItem("cart", JSON.stringify(filtered));
    toast.error("Mahsulot o‘chirildi!");
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="px-4 lg:px-20 py-10 bg-[#fcfcfc] min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-1">Shopping Cart</h1>
      <p className="text-center text-sm text-gray-500 mb-8">Home / Cart</p>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <img src={notfound} alt="Empty Cart" className="w-60 h-auto -mb-4" />
          <p className="text-lg text-gray-600 mb-4">Savatcha bo‘sh</p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-[#B88E2F] hover:bg-[#a77a1a] text-white px-6 py-2 rounded shadow"
          >
            Harid qilish
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT TABLE */}
          <div className="w-full lg:flex-[2]">
            <div className="overflow-x-auto bg-white shadow-sm rounded-md">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-left">
                  <tr className="text-gray-600 uppercase text-xs">
                    <th className="px-5 py-3">Product</th>
                    <th className="px-5 py-3">Price</th>
                    <th className="px-5 py-3">Quantity</th>
                    <th className="px-5 py-3">Subtotal</th>
                    <th className="px-5 py-3">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="border-t border-gray-200">
                      <td className="px-5 py-4 flex items-center gap-4">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-16 h-16 rounded object-cover border"
                        />
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-xs text-gray-400">{item.desc}</p>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[#B88E2F] font-semibold">
                        {item.price.toLocaleString()} so'm
                      </td>
                      <td className="px-5 py-4">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.id,
                              Math.max(1, parseInt(e.target.value))
                            )
                          }
                          className="w-16 border text-center rounded-md px-2 py-1"
                        />
                      </td>
                      <td className="px-5 py-4 font-semibold">
                        {(item.price * item.quantity).toLocaleString()} so'm
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Remove item"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT - Total Info */}
          <div className="w-full lg:w-[350px] bg-white p-6 shadow rounded-md h-fit">
            <h2 className="text-xl font-bold mb-6">Cart Totals</h2>
            <div className="flex justify-between mb-2 text-sm text-gray-600">
              <span>Subtotal:</span>
              <span>{subtotal.toLocaleString()} so'm</span>
            </div>
            <div className="flex justify-between font-semibold text-[#B88E2F] text-lg mb-6">
              <span>Total:</span>
              <span>{subtotal.toLocaleString()} so'm</span>
            </div>
            <button
              onClick={() => {
                if (cartItems.length > 0) {
                  navigate("/checkout", { state: "allow" }); // ✅ faqat buttondan o‘tadi
                } else {
                  toast.error("Savatcha bo‘sh!");
                }
              }}
              className="w-full bg-[#B88E2F] hover:bg-[#a67c1a] text-white py-3 rounded text-sm font-medium transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {/* Support Footer */}
      <div className="mt-32">
        <Support />
      </div>
    </div>
  );
};

export default Cart;
