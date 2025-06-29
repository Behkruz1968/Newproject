import React, { useEffect, useState } from "react";
import { Pagination, Select, Checkbox } from "antd";
import { useSearchParams } from "react-router-dom";
import Section2 from "../layout/Section2/Section2";

const Shop = () => {
  const [params, setParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);
  const [sortType, setSortType] = useState("default");

  const page = parseInt(params.get("page")) || 1;
  const pageSize = parseInt(params.get("pageSize")) || 8;

  useEffect(() => {
    fetch("https://6855aaa11789e182b37bfdae.mockapi.io/products")
      .then(res => res.json())
      .then(json => {
        setData(json);
        setCategories([...new Set(json.map(p => p.desc))]);
      });
  }, []);

  useEffect(() => {
    let sorted = [...data];
    if (selectedCats.length) sorted = sorted.filter(p => selectedCats.includes(p.desc));
    if (sortType === "az") sorted.sort((a, b) => a.title.localeCompare(b.title));
    else if (sortType === "za") sorted.sort((a, b) => b.title.localeCompare(a.title));
    else if (sortType === "priceLow") sorted.sort((a, b) => a.price - b.price);
    else if (sortType === "priceHigh") sorted.sort((a, b) => b.price - a.price);
    setFilteredData(sorted);
  }, [data, selectedCats, sortType]);

  const handleChangePage = (page, pageSize) => {
    params.set("page", page);
    params.set("pageSize", pageSize);
    setParams(params);
  };

  return (
    <div className="p-4 lg:px-20">
      <h1 className="text-center text-3xl font-bold mb-1">Shop</h1>
      <div className="text-center text-sm text-gray-500 mb-6">Home / Shop</div>

      <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-6">
        <Checkbox.Group options={categories} value={selectedCats} onChange={setSelectedCats} />
        <Select
          defaultValue="default"
          style={{ width: 200 }}
          onChange={setSortType}
          options={[
            { value: "default", label: "Default" },
            { value: "az", label: "A-Z" },
            { value: "za", label: "Z-A" },
            { value: "priceLow", label: "Narx: Pastdan" },
            { value: "priceHigh", label: "Narx: Yuqoridan" },
          ]}
        />
      </div>

      <Section2 products={filteredData.slice((page - 1) * pageSize, page * pageSize)} />

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
