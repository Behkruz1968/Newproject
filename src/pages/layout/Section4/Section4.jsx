import React from "react";
import furniroImage from "../Section4/furniro.png"; // Rasmga nisbiy yo'l

export default function Section4() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-16 bg-white">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <p className="text-lg text-gray-500">Share your setup with</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">#FuniroFurniture</h2>
      </div>

      <div
        className="w-full h-[500px] rounded-xl overflow-hidden shadow-xl bg-cover bg-center"
        style={{ backgroundImage: `url(${furniroImage})` }}
      >
      
      </div>
    </section>
  );
}
