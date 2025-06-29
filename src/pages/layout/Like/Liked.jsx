import React, { useEffect, useState } from "react";
import ProductList from "../../home/components/Productlist"; // alias ishlatyapsan deb olaman
import { Link } from "react-router-dom";

const LikedPage = () => {
  const [products, setProducts] = useState([]);
  const [likedIds, setLikedIds] = useState([]);

  useEffect(() => {
    const liked = JSON.parse(localStorage.getItem("liked") || "[]");
    setLikedIds(liked);

    fetch("https://6855aaa11789e182b37bfdae.mockapi.io/products")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((item) => liked.includes(item.id));
        setProducts(filtered);
      });
  }, []);

  const handleAddToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exist = cart.find((i) => i.id === item.id);
    if (exist) {
      const updated = cart.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      localStorage.setItem("cart", JSON.stringify(updated));
    } else {
      cart.push({ ...item, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    alert("🛒 Cartga qo‘shildi!");
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-2">
          💖 Saqlangan Mahsulotlar
        </h1>
        <p className="text-center text-gray-500 mb-10">
          Siz yoqtirgan mahsulotlar ro‘yxati
        </p>

        {products.length === 0 ? (
          <div className="text-center mt-12">
            <img
              src="https://assets-v2.lottiefiles.com/a/0953d504-117d-11ee-aa49-1f149204cb5f/9uZcoEJaoF.gif"
              alt="Empty liked list"
              className="mx-auto w-64 h-64"
            />
            <p className="text-gray-600 mt-4">
              Hozircha siz hech qanday mahsulotni yoqtirmagansiz.
            </p>
            <Link to="/shop">
              <button className="mt-6 border border-yellow-500 text-yellow-600 px-6 py-2 rounded hover:bg-yellow-500 hover:text-white transition">
                🛍 Shopga qaytish
              </button>
            </Link>
          </div>
        ) : (
          <ProductList products={products} onAddToCart={handleAddToCart} />
        )}
      </div>
    </div>
  );
};

export default LikedPage;
