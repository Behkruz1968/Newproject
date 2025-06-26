import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getOldPrice = (price, skidka) => {
  if (!skidka || !skidka.includes("%")) return null;
  const percent = parseInt(skidka.replace("%", ""));
  return Math.round(price / (1 - percent / 100));
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    // Mahsulot ma'lumotlarini olish
    fetch(`https://6855aaa11789e182b37bfdae.mockapi.io/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));

    // Related (8 ta)
    fetch("https://6855aaa11789e182b37bfdae.mockapi.io/products?page=1&limit=5")
      .then((res) => res.json())
      .then((data) =>
        setRelated(data.filter((item) => item.id !== id))
      );
  }, [id]);

  const handleAddToCart = () => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = stored.find((item) => item.id === product.id);
    let updatedCart;

    if (existing) {
      updatedCart = stored.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...stored, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Mahsulot savatchaga qo‘shildi!");
  };

  if (!product) return <p className="text-center py-20">⏳ Yuklanmoqda...</p>;

  const oldPrice = getOldPrice(product.price, product.skidka);

  return (
    <div className="px-4 lg:px-20 py-10 bg-[#fdfdfd]">
      {/* Product Info */}
      <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
        <img
          src={product.img}
          alt={product.title}
          className="w-full h-[400px] object-cover rounded-lg shadow"
        />

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.desc}</p>
          <div className="text-xl font-bold text-[#B88E2F] mb-4">
            So'm {Number(product.price).toLocaleString()}
            {oldPrice && (
              <span className="ml-3 text-gray-400 line-through text-base">
              So'm {oldPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-[#B88E2F] hover:bg-[#a77c20] text-white py-2 px-6 rounded transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {related.map((item) => {
            const old = getOldPrice(item.price, item.skidka);
            return (
              <div
                key={item.id}
                className="bg-white p-4 shadow rounded hover:shadow-lg transition"
              >
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h3 className="mt-2 font-semibold">{item.title}</h3>
                  <div className="text-sm text-gray-500">{item.desc}</div>
                  <div className="mt-1 text-[#B88E2F] font-bold">
                    So'm {item.price.toLocaleString()}
                    {old && (
                      <span className="ml-2 text-xs text-gray-400 line-through">
                       So'm  {old.toLocaleString()}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
