// ContactPage.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, email, message } = form;
    if (!name || !phone || !email || !message) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    const token = "8149202049:AAH04HhRyxbl4bMMHBvLXmio1MrrvTTpOYE";
    const chatId = "5504133901";
    const text = `
⭐️ Yangi so‘rovnoma (5-yulduz) ⭐️
👤 Ism: ${name}
📞 Telefon: ${phone}
📧 Email: ${email}
💬 Xabar: ${message}
    `;

    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Telegram error");
      toast.success("So‘rovnoma yuborildi! Tez orada bog‘lanamiz.");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch (err) {
      toast.error("Xatolik: So‘rovnoma yuborilmadi!");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center py-12 px-4">
      <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center">Biz bilan bog‘laning</h1>
        <p className="text-center text-gray-600">
          5-yulduzli mehmonxonamiz haqidagi savollaringiz yoki so‘rovlaringiz bo‘lsa – biz tegishli bo‘lamiz.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ismingiz"
            className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Telefon raqamingiz"
            className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email manzilingiz"
            className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Xabar yuboring..."
            rows={4}
            className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            type="submit"
            className="w-full bg-[#B88E2F] hover:bg-[#a77a1a] text-white py-3 rounded font-semibold transition"
          >
            Yuborish
          </button>
        </form>

        <div className="pt-6 border-t text-center text-gray-500 text-sm">
          <p>📍 Manzil: Toshkent shahri, XYZ ko‘chasi, 123</p>
          <p>📞 Telefon: +998 XX XXX XXXX</p>
          <p>✉️ Email: info@mehmonxona.uz</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
