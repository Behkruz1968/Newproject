import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";

// 💥 Narxdan skidka chiqarish funksiyasi
export const getOldPrice = (price, skidka) => {
  if (!skidka?.includes("%")) return null;
  const percent = parseInt(skidka.replace("%", ""));
  return Math.round(price / (1 - percent / 100));
};

const ProductList = ({ products = [], onAddToCart }) => {
  const [likedItems, setLikedItems] = useState(() => {
    return JSON.parse(localStorage.getItem("liked") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("liked", JSON.stringify(likedItems));
    window.dispatchEvent(new Event("storage")); // Header like count uchun
  }, [likedItems]);

  const toggleLike = (id) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleShare = (id) => {
    const url = `${window.location.origin}/product/${id}`;
    navigator.clipboard.writeText(url)
      .then(() => alert("🔗 Link copied!"))
      .catch(() => alert("❌ Failed to copy!"));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((item) => {
        const oldPrice = getOldPrice(item.price, item.skidka);
        const isLiked = likedItems.includes(item.id);

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
              <span className="absolute top-4 right-4 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
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
              <button
                onClick={() => onAddToCart(item)}
                className="bg-white text-black px-5 py-2 font-semibold rounded hover:bg-gray-200 transition"
              >
                Add to Cart
              </button>
              <div className="flex gap-4 text-sm items-center">
                <span
                  onClick={() => handleShare(item.id)}
                  className="cursor-pointer hover:underline"
                >
                  Share
                </span>
                <Link
                  to={`/product/${item.id}`}
                  className="cursor-pointer hover:underline"
                >
                  View
                </Link>
                <span
                  onClick={() => toggleLike(item.id)}
                  className="cursor-pointer"
                >
                  {isLiked ? (
                    <AiFillHeart className="text-red-500 w-5 h-5" />
                  ) : (
                    <FiHeart className="text-white w-5 h-5" />
                  )}
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
              <div className="mt-2 flex items-center gap-2">
                <p className="text-[#000000] font-bold">
                  So'm {Number(item.price).toLocaleString()}
                </p>
                {oldPrice && (
                  <span className="text-sm line-through text-gray-400">
                    So'm {Number(oldPrice).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
