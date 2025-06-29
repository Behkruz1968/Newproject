import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { FiTrash2, FiFileText } from "react-icons/fi";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const handleDelete = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">📦 Mening Zakazlarim</h2>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center text-gray-600">
            <img
              src="https://assets-v2.lottiefiles.com/a/0953d504-117d-11ee-aa49-1f149204cb5f/9uZcoEJaoF.gif"
              alt="No orders"
              className="w-64 mb-6"
            />
            <p>Siz hali hech qanday zakaz qilmagansiz.</p>
          </div>
        ) : (
          <ul className="space-y-6">
            {orders.map((order) => (
              <li
                key={order.id}
                className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition relative"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <p className="font-semibold text-lg">
                      🆔 Zakaz ID: <span className="text-blue-600">{order.id}</span>
                    </p>
                    <p>📅 Sana: {format(new Date(order.date), "yyyy-MM-dd HH:mm")}</p>
                    <p>💳 To‘lov turi: {order.paymentMethod}</p>
                    <p>🚚 Yetkazish usuli: {order.deliveryMethod}</p>
                    <p>🛒 Mahsulotlar soni: {order.items?.length || 0} ta</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                      <FiTrash2 /> O‘chirish
                    </button>

                    <button
                      onClick={() => alert("🚧 Hozircha PDF funksiyasi yoq")}
                      className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                      <FiFileText /> PDF ko‘rish
                    </button>
                  </div>
                </div>

                {/* Mahsulotlar ro‘yxati */}
                {order.items?.length > 0 && (
                  <div className="mt-4 border-t pt-4">
                    <h4 className="font-semibold mb-2">🧾 Mahsulotlar:</h4>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.title} - {item.quantity} dona - {Number(item.price).toLocaleString()} so‘m
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Orders;
