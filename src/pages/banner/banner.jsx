import React from "react";
import bannerimage from "../banner/ban.png";

const Banner = () => {
  return (
    <section className="relative w-full h-[600px]">
      {/* Background Image */}
      <img
        src={bannerimage}
        alt="Banner"
        className="w-full h-full object-cover"
      />

      {/* Text block */}
      <div className="absolute top-1/2 right-8 md:right-24 transform -translate-y-1/2 bg-transparent p-6 md:p-10 max-w-xl text-left rounded-lg shadow-lg">
        <p className="text-sm tracking-widest text-gray-500 uppercase mb-2">
          New Arrival
        </p>
        <h1 className="text-3xl md:text-5xl font-bold text-[#B88E2F] leading-snug">
          Discover Our <br /> New Collection
        </h1>
        <p className="text-gray-600 mt-4 text-base md:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br />
          elit tellus, luctus nec ullamcorper mattis.
        </p>
        <a
          href="/shop"
          className="inline-block bg-[#B88E2F] hover:bg-[#a77c20] transition-colors text-white font-semibold py-3 px-10 text-base mt-8"
        >
          BUY NOW
        </a>
      </div>
    </section>
  );
};

export default Banner;
