import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Section2() {
  const [products, setProducts] = useState([]);

  // oldPrice hisoblovchi funksiya
  const getOldPrice = (price, skidka) => {
    if (!skidka?.includes("%")) return null;
    const percent = parseInt(skidka.replace("%", ""));
    return Math.round(price / (1 - percent / 100));
  };

  useEffect(() => {
    fetch("https://6855aaa11789e182b37bfdae.mockapi.io/products?page=1&limit=8")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-16 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-10">Our Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((item) => {
            const oldPrice = getOldPrice(item.price, item.skidka);

            return (
              <div
                key={item.id}
                className="relative group bg-white rounded shadow hover:shadow-xl transition"
              >
                {/* Badge */}
                {item.skidka?.includes("%") ? (
                  <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
                    {item.skidka}
                  </span>
                ) : item.skidka?.toLowerCase() === "new" ? (
                  <span className="absolute top-4 right-4 bg-teal-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
                    New
                  </span>
                ) : null}

                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-[240px] object-cover group-hover:opacity-70 transition"
                  />
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center text-white gap-4">
                  <button className="bg-white text-black px-6 py-2 font-semibold rounded hover:bg-gray-100">
                    Add to cart
                  </button>
                  <div className="flex gap-4 text-sm">
                    <span className="cursor-pointer hover:underline">Share</span>
                    <span className="cursor-pointer hover:underline">Compare</span>
                    <span className="cursor-pointer hover:underline">Like</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <p className="text-[#000000] font-bold">
                      Rp {Number(item.price).toLocaleString()}
                    </p>
                    {oldPrice && (
                      <span className="text-sm line-through text-gray-400">
                        Rp {Number(oldPrice).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show More Button */}
        <div className="flex justify-center mt-10">
          <Link to="/shop">
            <button className="border border-yellow-500 text-yellow-600 px-6 py-2 rounded hover:bg-yellow-500 hover:text-white transition">
              Show More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
