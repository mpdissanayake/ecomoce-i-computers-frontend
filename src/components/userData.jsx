import { useEffect, useState } from "react";
import api from "../pages/utils/api";
import { Link, useNavigate } from "react-router-dom";

export default function UserData() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api
        .get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("User fetch error:", error);
        });
    }
  }, []);

  return (
    <>
      {user ? (
        <div className="flex items-center gap-2">
          {/* Profile Image - Fixed Size & Rounded */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/40 shrink-0 bg-white/10 flex items-center justify-center">
            <img
              src={
                user.image ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt={user.firstName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Select Menu */}
          <select
            className="bg-transparent text-white font-medium text-sm focus:outline-none cursor-pointer pr-1"
            onChange={(e) => {
              if (e.target.value === "settings") {
                navigate("/settings");
              } else if (e.target.value === "orders") {
                navigate("/my-orders");
              } else if (e.target.value === "admin") {
                navigate("/admin");
              } else if (e.target.value === "logout") {
                localStorage.removeItem("token");
                setUser(null);
                navigate("/login");
              }
              e.target.value = "default";
            }}
            defaultValue="default"
          >
            <option value="default" className="bg-gray-800 text-white" disabled>
              {user.firstName}
            </option>

            {user.isAdmin && (
              <option value="admin" className="bg-gray-800 text-white">
                Admin Panel
              </option>
            )}

            <option value="orders" className="bg-gray-800 text-white">
              My Orders
            </option>
            <option value="settings" className="bg-gray-800 text-white">
              Settings
            </option>
            <option value="logout" className="bg-gray-800 text-red-400 font-semibold">
              Logout
            </option>
          </select>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold transition border border-white/20"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="hidden lg:block text-white/80 hover:text-white text-sm font-semibold transition"
          >
            Register
          </Link>
        </div>
      )}
    </>
  );
}