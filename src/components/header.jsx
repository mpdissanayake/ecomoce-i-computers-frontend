// src/components/header.jsx
import { BiCart } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import UserData from "./userData";

export default function Header() {
  const navItemClass = ({ isActive }) =>
    `relative py-1 text-sm font-semibold tracking-wide transition-colors duration-200 ${
      isActive
        ? "text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-white after:rounded-full"
        : "text-white/80 hover:text-white"
    }`;

  return (
    <header className="w-full h-[88px] bg-accent/95 backdrop-blur-md shadow-md sticky top-0 z-50 flex items-center justify-between px-6 lg:px-12 flex-shrink-0 transition-all">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-3 group">
        <img
          src="/logo.png"
          alt="iComputers Logo"
          className="h-[52px] object-contain transition-transform group-hover:scale-105"
        />
      </Link>

      {/* Desktop Main Navigation Links */}
      <nav className="hidden lg:flex items-center gap-10">
        <NavLink to="/" className={navItemClass}>
          HOME
        </NavLink>
        <NavLink to="/products" className={navItemClass}>
          PRODUCTS
        </NavLink>
        <NavLink to="/contact-us" className={navItemClass}>
          CONTACT US
        </NavLink>
      </nav>

      {/* Desktop Action Icons */}
      <div className="hidden lg:flex items-center gap-5">
        {/* User Profile / Status */}
        <div className="flex items-center">
          <UserData />
        </div>

        {/* Divider */}
        <div className="w-[1px] h-6 bg-white/20" />

        {/* Shopping Cart Button */}
        <Link
          to="/cart"
          className="relative p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:scale-105 backdrop-blur-sm"
          title="View Cart"
        >
          <BiCart className="text-2xl" />
        </Link>
      </div>
    </header>
  );
}