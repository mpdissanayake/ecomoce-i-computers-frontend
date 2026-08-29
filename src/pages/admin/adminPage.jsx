import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { 
  FaBagShopping, 
  FaBoxOpen, 
  FaUsers, 
  FaStar, 
  FaShieldHalved,
  FaArrowRightFromBracket,
  FaStore,
  FaEnvelope
} from "react-icons/fa6";
import toast from "react-hot-toast";

import AdminProductsPage from "./adminProductsPage";
import AdminAddProductPage from "./adminAddProduct";
import AdminEditProductPage from "./adminEditProductPage";
import OrdersDashboard from "./ordersDashboard";
import ReviewsDashboard from "./reviewsDashboard";
import UsersDashboard from "./usersDashboard";
import InquiriesDashboard from "./inquiriesDashboard";

export default function AdminPage() {
  const navigate = useNavigate();

  // Active වන Link එක හඳුනාගෙන Style ලබා දෙන Function එක
  const navLinkStyles = ({ isActive }) =>
    `flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
      isActive
        ? "bg-white text-indigo-700 shadow-md translate-x-1 font-semibold"
        : "text-white/80 hover:bg-white/10 hover:text-white"
    }`;

  // Logout Function එක
  const handleLogout = () => {
    if (window.confirm("ඔබට Admin Panel එකෙන් Logout වීමට අවශ්‍යද?")) {
      localStorage.removeItem("token"); // Token එක ඉවත් කිරීම
      toast.success("සාර්ථකව Logout විය.");
      navigate("/login"); // Login පිටුවට යොමු කිරීම
    }
  };

  return (
    <div className="w-full h-screen flex items-center bg-accent overflow-hidden font-sans">
      {/* Modern Sidebar */}
      <aside className="w-[280px] h-full flex flex-col justify-between p-6 text-white shrink-0">
        <div>
          {/* Brand Header */}
          <div className="flex items-center gap-3 px-2 py-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-inner">
              <FaShieldHalved className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white leading-tight">
                Admin Panel
              </h1>
              <span className="text-[11px] font-medium text-white/60 uppercase tracking-wider">
                Management Studio
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            <NavLink to="/admin/orders" className={navLinkStyles}>
              <FaBagShopping className="text-lg" />
              <span>Orders</span>
            </NavLink>

            <NavLink to="/admin/products" className={navLinkStyles}>
              <FaBoxOpen className="text-lg" />
              <span>Products</span>
            </NavLink>

            <NavLink to="/admin/users" className={navLinkStyles}>
              <FaUsers className="text-lg" />
              <span>Users</span>
            </NavLink>

            <NavLink to="/admin/reviews" className={navLinkStyles}>
              <FaStar className="text-lg" />
              <span>Reviews</span>
            </NavLink>

            <NavLink to="/admin/inquiries" className={navLinkStyles}>
            <FaEnvelope className="text-lg" />
            <span>Messages</span>
            </NavLink>

          </nav>
            


        </div>

        {/* Sidebar Footer Controls */}
        <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
          {/* Main Website එකට යාමට */}
          <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white transition"
          >
            <FaStore className="text-base" />
            <span>Go to Shop</span>
          </NavLink>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-200 hover:bg-red-500/20 hover:text-red-100 transition cursor-pointer w-full text-left"
          >
            <FaArrowRightFromBracket className="text-base" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="w-[calc(100%-280px)] h-[calc(100%-24px)] mr-3 bg-primary border-[6px] border-accent rounded-3xl shadow-2xl overflow-hidden">
        <Routes>
          <Route path="/" element={<OrdersDashboard />} />
          <Route path="/orders" element={<OrdersDashboard />} />
          <Route path="/products" element={<AdminProductsPage />} />
          <Route path="/add-product" element={<AdminAddProductPage />} />
          <Route path="/edit-product" element={<AdminEditProductPage />} />
          <Route path="/users" element={<UsersDashboard />} />
          <Route path="/reviews" element={<ReviewsDashboard />} />
          <Route path="/inquiries" element={<InquiriesDashboard />} />
        </Routes>
      </main>
    </div>
  );
}