import React from "react";
import im from "../banner/im.png"
import im1 from "../banner/im1.png"
import im2 from "../banner/im2.png"


export default function Section1() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title & Description */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#333]">
            Browse The Range
          </h1>
          <p className="text-gray-500 text-base md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Dining */}
          <a
            href="/shop?search=dining&&sort_by=RELEVANCE&&page=1"
            className="group"
          >
            <div className="overflow-hidden rounded-lg shadow hover:shadow-lg transition duration-300">
              <img
                src={im}
                alt="Dining"
                className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h4 className="mt-4 text-center text-lg font-semibold text-[#333]">
              Dining
            </h4>
          </a>

          {/* Living */}
          <a
            href="/shop?search=living&&sort_by=RELEVANCE&&page=1"
            className="group"
          >
            <div className="overflow-hidden rounded-lg shadow hover:shadow-lg transition duration-300">
              <img
                src={im1}
                alt="Living"
                className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h4 className="mt-4 text-center text-lg font-semibold text-[#333]">
              Living
            </h4>
          </a>

          {/* Bedroom */}
          <a
            href="/shop?search=bedroom&&sort_by=RELEVANCE&&page=1"
            className="group"
          >
            <div className="overflow-hidden rounded-lg shadow hover:shadow-lg transition duration-300">
              <img
                src={im2}
                alt="Bedroom"
                className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h4 className="mt-4 text-center text-lg font-semibold text-[#333]">
              Bedroom
            </h4>
          </a>
        </div>
      </div>
    </section>
  );
}
