import React from "react";
import useParallax from "../hooks/useParallax";
import bg1 from "../assets/bg1.jpg";
console.log("Imported bg1:", bg1);

const Banner = () => {
  const scrollY = useParallax();

  return (
    <section className="relative h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bg1})`,
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      {/* <div className="absolute inset-0 bg-black bg-opacity-50" /> */}
      <div
        className="relative z-10 flex items-center justify-center h-full"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-6xl font-semibold">Ideas</h1>
          <p className="text-xl md:text-2xl">
            Where all our great things begin
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-auto">
          <path d="M0,120 L1200,120 L1200,0 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
};

export default Banner;
