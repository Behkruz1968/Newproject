// Shop.jsx
import React, { useEffect, useState } from "react";
import { Pagination, Select, Checkbox } from "antd";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

const getOldPrice = (price, skidka) => {
  if (!skidka || !skidka.includes("%")) return null;
  const percent = parseInt(skidka.replace("%", ""));
  return Math.round(price / (1 - percent / 100));
};

const Shop = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);
  const [sortType, setSortType] = useState("default");

  const page = parseInt(params.get("page")) || 1;
  const pageSize = parseInt(params.get("pageSize")) || 16;

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("https://6855aaa11789e182b37bfdae.mockapi.io/products");
    const json = await res.json();
    setData(json);
    setLoading(false);
    setCategories([...new Set(json.map((p) => p.desc))]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let result = [...data];
    if (selectedCats.length > 0) result = result.filter((item) => selectedCats.includes(item.desc));

    switch (sortType) {
      case "az": result.sort((a, b) => a.title.localeCompare(b.title)); break;
      case "za": result.sort((a, b) => b.title.localeCompare(a.title)); break;
      case "priceLow": result.sort((a, b) => a.price - b.price); break;
      case "priceHigh": result.sort((a, b) => b.price - a.price); break;
    }

    setFilteredData(result);
  }, [data, selectedCats, sortType]);

  const handleChangePage = (page, pageSize) => {
    params.set("page", page);
    params.set("pageSize", pageSize);
    setParams(params);
  };

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
    window.dispatchEvent(new Event("storage")); // Header ni trigger qilish
  };

  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="p-4 lg:px-20">
      <div className="text-center text-3xl font-bold mb-1">Shop</div>
      <div className="text-center text-sm text-gray-500 mb-8">Home / Shop</div>

      {/* FILTER MODAL */}
      {showFilter && (
        <div className="fixed inset-0 bg-black/60 flex justify-end z-50">
          <div className="bg-white w-[300px] p-4 overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Filter</h3>
            <Checkbox.Group
              className="flex flex-col gap-2"
              options={categories}
              value={selectedCats}
              onChange={setSelectedCats}
            />
            <button
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded w-full"
              onClick={() => setShowFilter(false)}
            >
              Yopish
            </button>
          </div>
        </div>
      )}

      {/* TOP FILTER BAR */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex gap-3 items-center">
          <button className="border px-4 py-2 rounded text-sm" onClick={() => setShowFilter(true)}>Filter</button>
          <p className="text-sm text-gray-500">
            Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filteredData.length)} of {filteredData.length} results
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span>Show</span>
          <Select
            defaultValue={pageSize}
            style={{ width: 80 }}
            onChange={(value) => handleChangePage(1, value)}
            options={[{ value: 8, label: "8" }, { value: 16, label: "16" }]}
          />
          <span>Sort by</span>
          <Select
            defaultValue="default"
            style={{ width: 160 }}
            onChange={(value) => setSortType(value)}
            options={[
              { value: "default", label: "Default" },
              { value: "az", label: "A - Z" },
              { value: "za", label: "Z - A" },
              { value: "priceLow", label: "Price low to high" },
              { value: "priceHigh", label: "Price high to low" },
            ]}
          />
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {paginatedData.map((item) => {
          const oldPrice = getOldPrice(item.price, item.skidka);

          return (
            <div key={item.id} className="relative group bg-white rounded shadow hover:shadow-xl transition">
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
                <img src={item.img} alt={item.title} className="w-full h-[240px] object-cover group-hover:opacity-70 transition" />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center text-white gap-4">
                <button onClick={() => handleAddToCart(item)} className="bg-white text-black px-6 py-2 font-semibold rounded hover:bg-gray-100">
                  Add to cart
                </button>
                <div className="flex gap-4 text-sm">
                  <span className="cursor-pointer hover:underline">Share</span>
                  <Link to={`/product/${item.id}`} className="cursor-pointer hover:underline text-sm">View</Link>
                  <span className="cursor-pointer hover:underline">Like</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
                <div className="mt-2 flex items-center gap-2">
                  <p className="text-[#000000] font-bold">So'm {Number(item.price).toLocaleString()}</p>
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

      {/* PAGINATION */}
      <div className="flex justify-center mt-10">
        <Pagination
          current={page}
          total={filteredData.length}
          pageSize={pageSize}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
};

export default Shop;
