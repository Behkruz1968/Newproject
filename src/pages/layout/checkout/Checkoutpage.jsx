import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import dayjs from "dayjs";
import "react-toastify/dist/ReactToastify.css";

const TOKEN = "7536721006:AAFnJVR3nE61uxnF49IVDewB9TLsrzg3CQo";
const CHAT_ID = "5504133901";

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "Naqd",
    delivery: "Kuryer",
  });
  const [orderId, setOrderId] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const printRef = useRef();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
    setOrderId(uuidv4().slice(0, 8).toUpperCase());
    setDeliveryDate(dayjs().add(2, "day").format("YYYY-MM-DD"));
  }, []);

  const getTotal = () =>
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const generatePDF = async () => {
    const canvas = await html2canvas(printRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    return pdf;
  };

  const downloadPDF = async () => {
    const pdf = await generatePDF();
    pdf.save(`Order_${orderId}.pdf`);
  };

  const handleOrder = async () => {
    if (!form.name || !form.phone || !form.address) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    const newOrder = {
      orderId,
      cart,
      form,
      total: getTotal(),
      date: new Date().toISOString(),
    };

    // Zakazni localStorage ga saqlash
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Telegramga yuborish
    const msg = `
🛒 Yangi Buyurtma!
👤 Ism: ${form.name}
📞 Tel: ${form.phone}
🏠 Manzil: ${form.address}
💳 To'lov: ${form.payment}
🚚 Yetkazish: ${form.delivery}
📦 Mahsulotlar:
${cart.map((item) => `- ${item.title} (${item.quantity} x ${item.price.toLocaleString()} so'm)`).join("\n")}
💰 Jami: ${getTotal().toLocaleString()} so'm
🆔 Buyurtma ID: ${orderId}
📅 Yetkazish: ${deliveryDate}
    `.trim();

    try {
      await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: msg }),
      });

      toast.success("✅ Buyurtma yuborildi!");
      localStorage.removeItem("cart");
      setCart([]);
    } catch (err) {
      toast.error("❌ Telegramga yuborib bo‘lmadi");
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf9] p-6 lg:p-12">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

      <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Form */}
        <div className="space-y-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Ismingiz" className="w-full p-3 border rounded" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Telefon raqam" className="w-full p-3 border rounded" />
          <input name="address" value={form.address} onChange={handleChange} placeholder="Manzilingiz" className="w-full p-3 border rounded" />

          <div className="space-y-2">
            <p>💳 To‘lov turi:</p>
            {["Naqd", "Click", "Payme"].map((p) => (
              <label key={p} className="inline-flex items-center mr-4">
                <input type="radio" name="payment" value={p} checked={form.payment === p} onChange={handleChange} className="mr-1" />
                {p}
              </label>
            ))}
          </div>

          <div className="space-y-2">
            <p>🚚 Yetkazish:</p>
            {["Kuryer", "Olib ketish"].map((d) => (
              <label key={d} className="inline-flex items-center mr-4">
                <input type="radio" name="delivery" value={d} checked={form.delivery === d} onChange={handleChange} className="mr-1" />
                {d}
              </label>
            ))}
          </div>
        </div>

        {/* PDF Preview */}
        <div ref={printRef} className="bg-white shadow rounded p-6 space-y-4">
          <h2 className="text-lg font-semibold">📦 Buyurtma tafsilotlari</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 items-center border-b pb-2">
              <img src={item.img} className="w-16 h-16 rounded object-cover" alt={item.title} />
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-600">{item.quantity} x {item.price.toLocaleString()} so‘m</p>
              </div>
            </div>
          ))}
          <p><b>Buyurtma ID:</b> {orderId}</p>
          <p><b>Yetkazish sanasi:</b> {deliveryDate}</p>
          <p><b>Jami:</b> {getTotal().toLocaleString()} so‘m</p>
          <p><b>To‘lov:</b> {form.payment}</p>
          <p><b>Yetkazish:</b> {form.delivery}</p>
        </div>
      </div>

      {/* Tugmalar */}
      <div className="flex flex-wrap gap-4 mt-6 justify-center">
        <button onClick={downloadPDF} className="bg-yellow-600 text-white px-6 py-2 rounded">🧾 PDF Yuklab olish</button>
        <button onClick={handleOrder} className="bg-green-600 text-white px-6 py-2 rounded">✅ Buyurtma berish</button>
      </div>
    </div>
  );
};

export default CheckoutPage;
