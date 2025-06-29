import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Section2() {
  const [products, setProducts] = useState([]);
  const [liked, setLiked] = useState(() => JSON.parse(localStorage.getItem("liked")) || []);

  useEffect(() => {
    fetch("https://6855aaa11789e182b37bfdae.mockapi.io/products?page=1&limit=8")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(console.error);
  }, []);

  const toggleLike = (id) => {
    const updated = liked.includes(id)
      ? liked.filter((i) => i !== id)
      : [...liked, id];
    setLiked(updated);
    localStorage.setItem("liked", JSON.stringify(updated));
  };

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exist = cart.find((i) => i.id === item.id);
    const newCart = exist
      ? cart.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
      : [...cart, { ...item, quantity: 1 }];
    localStorage.setItem("cart", JSON.stringify(newCart));
    toast.success("🛒 Savatchaga qo‘shildi!");
    window.dispatchEvent(new Event("storage"));
  };

  const handleShare = (id) => {
    const link = `${window.location.origin}/product/${id}`;
    navigator.clipboard.writeText(link).then(() => {
      toast.success("🔗 Link copy qilindi!");
    });
  };

  return (
    <section className="py-16 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-10">Our Products</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((item) => {
            const oldPrice = item.skidka?.includes("%")
              ? Math.round(item.price / (1 - parseInt(item.skidka) / 100))
              : null;

            return (
              <div key={item.id} className="relative group bg-white rounded shadow hover:shadow-xl transition">
                {item.skidka?.includes("%") && (
                  <span className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
                    {item.skidka}
                  </span>
                )}

                <img src={item.img} alt={item.title} className="w-full h-[240px] object-cover" />

                <div className="p-4">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <p className="text-[#000] font-bold">So'm {item.price.toLocaleString()}</p>
                    {oldPrice && (
                      <span className="text-sm line-through text-gray-400">
                        So'm {oldPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center text-white gap-3">
                  <button onClick={() => addToCart(item)} className="bg-white text-black px-6 py-2 rounded">
                    Add to Cart
                  </button>
                  <div className="flex gap-4 text-sm">
                    <Link to={`/product/${item.id}`} className="hover:underline">View</Link>
                    <span onClick={() => toggleLike(item.id)} className="cursor-pointer hover:underline">
                      {liked.includes(item.id) ? "💖 Liked" : "🤍 Like"}
                    </span>
                    <span onClick={() => handleShare(item.id)} className="cursor-pointer hover:underline">Share</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mt-10">
          <Link to="/shop">
            <button className="border border-yellow-500 text-yellow-600 px-6 py-2 rounded hover:bg-yellow-500 hover:text-white transition">
              Show More
            </button>
          </Link>
        </div>
        <ToastContainer />
      </div>
    </section>
  );
}
