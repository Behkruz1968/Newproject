import React from "react";
import { Link } from "react-router-dom";
import slider from "../Section3/slider.png"
export default function Section3() {
  return (
    <section className="py-16 bg-[#f4f4f4]">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Text Area */}
        <div className="flex-1 space-y-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
              50+ Beautiful rooms inspiration
            </h2>
            <p className="mt-2 text-gray-600 text-base md:text-lg">
              Our designer already made a lot of beautiful prototypes of rooms that inspire you
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-block border border-yellow-500 text-yellow-600 px-6 py-3 rounded font-semibold text-base hover:bg-yellow-500 hover:text-white transition"
          >
            Explore More
          </Link>
        </div>

        {/* Fake Slider Box */}
        <div className="flex-1 w-full">
          <div className="w-full h-[300px] bg-gray-300 rounded-lg flex items-center justify-center text-gray-600 text-xl">
          <img src={slider} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
