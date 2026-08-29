// src/pages/home/landingPage.jsx
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

export default function LandingPage() {
  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover scale-105 filter brightness-[0.85]"
      >
        <source src="/1080p.mp4" type="video/mp4" />
      </video>

      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 backdrop-blur-[1px] flex flex-col justify-center items-center text-center px-6">
        <div className="max-w-3xl flex flex-col items-center">
          {/* Subtle Tag */}
          <span className="px-4 py-1.5 rounded-full bg-white/15 text-white text-xs font-semibold tracking-wider uppercase backdrop-blur-md border border-white/20 mb-6 shadow-sm">
            Premium Tech Experience
          </span>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-4 drop-shadow-md">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">iComputers</span> Store!
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-2xl text-gray-200/90 font-light max-w-2xl mb-8 leading-relaxed drop-shadow">
            Your one-stop shop for high-performance computing, accessories, and expert solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/products"
              className="group flex items-center gap-3 px-8 py-3.5 bg-accent text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>Shop Now</span>
              <FaArrowRightLong className="transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/contact-us"
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl backdrop-blur-md border border-white/20 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}