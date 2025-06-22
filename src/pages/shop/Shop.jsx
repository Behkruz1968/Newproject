import React, { useEffect, useState } from "react";
import { Pagination, Select, Checkbox } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";

const getOldPrice = (price, skidka) => {
  if (!skidka) return null;
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

    // Unique categories for filter
    const uniqueCats = [...new Set(json.map((p) => p.desc))];
    setCategories(uniqueCats);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let result = [...data];

    // Filtering by category
    if (selectedCats.length > 0) {
      result = result.filter((item) => selectedCats.includes(item.desc));
    }

    // Sorting
    switch (sortType) {
      case "az":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "za":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "priceLow":
        result.sort((a, b) => a.price - b.price);
        break;
      case "priceHigh":
        result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredData(result);
  }, [data, selectedCats, sortType]);

  const handleChangePage = (page, pageSize) => {
    params.set("page", page);
    params.set("pageSize", pageSize);
    setParams(params);
  };

  const addToCart = (item) => {
    const prev = JSON.parse(localStorage.getItem("cart")) || [];
    const updated = [...prev, item];
    localStorage.setItem("cart", JSON.stringify(updated));
    alert("🛒 Cartga qo‘shildi!");
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
            <p className="text-sm text-gray-600 mb-2">Kategoriya</p>
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
          <button
            className="border px-4 py-2 rounded text-sm"
            onClick={() => setShowFilter(true)}
          >
            Filter
          </button>
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

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: pageSize }).map((_, i) => (
              <div key={i} className="animate-pulse h-60 bg-gray-200 rounded" />
            ))
          : paginatedData.map((product) => {
              const oldPrice = getOldPrice(product.price, product.skidka);
              return (
                <div
                  key={product.id}
                  className="group relative shadow border rounded overflow-hidden bg-white"
                >
                  <div className="relative">
                    <img
                      onClick={() => navigate(`/products/${product.id}`)}
                      src={product.img}
                      alt={product.title}
                      className="w-full h-52 object-cover cursor-pointer"
                    />
                    {product.skidka && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        -{product.skidka}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-white">
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-yellow-400 text-black px-4 py-1 rounded mb-2"
                      >
                        Add to cart
                      </button>
                      <div className="flex gap-3 text-xs underline">
                        <span>Share</span>
                        <span>Compare</span>
                        <span>Like</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-gray-800">{product.title}</h3>
                    <p className="text-xs text-gray-500">{product.desc}</p>
                    <div className="flex gap-2 items-center mt-1">
                      <span className="text-sm font-bold text-black">Rp {product.price.toLocaleString()}</span>
                      {oldPrice && (
                        <span className="text-sm line-through text-gray-400">Rp {oldPrice.toLocaleString()}</span>
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
