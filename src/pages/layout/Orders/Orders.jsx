import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // localStorage'dan zakazlarni olish
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  // Zakazni o‘chirish funksiyasi
  const handleDelete = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">📦 Zakazlarim</h2>

        {orders.length === 0 ? (
          <p className="text-gray-600">Sizda hozircha zakaz mavjud emas.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li
                key={order.id}
                className="border rounded p-4 bg-white shadow-sm relative"
              >
                <p className="font-semibold">🆔 Zakaz ID: {order.id}</p>
                <p>📅 Sana: {order.date}</p>
                <p>💰 To‘lov turi: {order.paymentMethod}</p>
                <p>🚚 Yetkazish usuli: {order.deliveryMethod}</p>
                <p>📦 Mahsulotlar soni: {order.items?.length || 0}</p>

                <button
                  onClick={() => handleDelete(order.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600 transition"
                >
                  O‘chirish
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Orders;
