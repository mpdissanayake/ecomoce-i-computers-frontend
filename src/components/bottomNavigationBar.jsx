// src/components/bottomNavigationBar.jsx
import { NavLink } from "react-router-dom";
import { GoHome, GoHomeFill } from "react-icons/go";
import { IoSearchOutline, IoSearch } from "react-icons/io5";
import { BiCart, BiSolidCart } from "react-icons/bi";
import UserData from "./userData";

export default function BottomNavigationBar() {
  const bottomLinkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center flex-1 py-1 transition-all duration-200 ${
      isActive
        ? "text-accent font-semibold scale-105"
        : "text-gray-400 hover:text-gray-600"
    }`;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-3 pt-1 pointer-events-none">
      <nav className="pointer-events-auto w-full max-w-md mx-auto h-[64px] bg-white/90 backdrop-blur-xl border border-gray-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-2xl flex items-center justify-around px-2">
        {/* Home */}
        <NavLink to="/" className={bottomLinkClass}>
          {({ isActive }) => (
            <>
              {isActive ? <GoHomeFill className="text-2xl" /> : <GoHome className="text-2xl" />}
              <span className="text-[10px] mt-0.5">Home</span>
            </>
          )}
        </NavLink>

        {/* Products Search */}
        <NavLink to="/products" className={bottomLinkClass}>
          {({ isActive }) => (
            <>
              {isActive ? <IoSearch className="text-2xl" /> : <IoSearchOutline className="text-2xl" />}
              <span className="text-[10px] mt-0.5">Shop</span>
            </>
          )}
        </NavLink>

        {/* Cart */}
        <NavLink to="/cart" className={bottomLinkClass}>
          {({ isActive }) => (
            <>
              {isActive ? <BiSolidCart className="text-2xl" /> : <BiCart className="text-2xl" />}
              <span className="text-[10px] mt-0.5">Cart</span>
            </>
          )}
        </NavLink>

        {/* User Account */}
        <div className="flex flex-col items-center justify-center flex-1 py-1">
          <UserData />
        </div>
      </nav>
    </div>
  );
}