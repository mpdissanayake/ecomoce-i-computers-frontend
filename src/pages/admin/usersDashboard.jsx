// src/pages/admin/usersDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { FaUserLock, FaUserCheck, FaUserShield } from "react-icons/fa6";
import toast from "react-hot-toast";
import LoadingAnimation from "../../components/lodingAnimation";

export default function UsersDashboard() {
  const [users, setUsers] = useState([]);
  const [isUsersLoaded, setIsUsersLoaded] = useState(false);

  // Users ලබා ගැනීම
  useEffect(() => {
    if (!isUsersLoaded) {
      const token = localStorage.getItem("token");

      axios
        .get(import.meta.env.VITE_API_URL + "/users/all", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setUsers(response.data);
          setIsUsersLoaded(true);
        })
        .catch((error) => {
          console.error("Users load error:", error);
          toast.error(
            error?.response?.data?.message || "Users ලබා ගැනීමට නොහැකි විය."
          );
          setIsUsersLoaded(true);
        });
    }
  }, [isUsersLoaded]);

  // Block / Unblock කිරීම
  const handleToggleBlock = (email, currentStatus) => {
    const actionText = currentStatus ? "Unblock" : "Block";
    if (!window.confirm(`මෙම User (${email}) ${actionText} කිරීමට අවශ්‍යද?`)) {
      return;
    }

    const token = localStorage.getItem("token");

    axios
      .put(
        import.meta.env.VITE_API_URL + "/users/toggle-block/" + email,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message);
        setIsUsersLoaded(false); // Table එක Refresh කිරීම
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || "ක්‍රියාවලිය අසාර්ථක විය."
        );
      });
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-gray-100 p-8 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center bg-white rounded-2xl shadow-sm border border-gray-200 px-8 py-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Users Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage system users and access permissions.</p>
        </div>

        {isUsersLoaded && (
          <div className="bg-indigo-50 px-5 py-2 rounded-xl">
            <span className="font-semibold text-indigo-600">
              Total Users: {users.length}
            </span>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          {isUsersLoaded ? (
            <>
              {users.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-gray-500 text-lg">පරිශීලකයින් හමු නොවීය.</p>
                </div>
              ) : (
                <table className="min-w-full">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr className="text-gray-700">
                      <th className="px-6 py-4 text-sm font-semibold text-left">User</th>
                      <th className="px-6 py-4 text-sm font-semibold text-left">Email</th>
                      <th className="px-6 py-4 text-sm font-semibold text-center">Role</th>
                      <th className="px-6 py-4 text-sm font-semibold text-center">Email Verified</th>
                      <th className="px-6 py-4 text-sm font-semibold text-center">Status</th>
                      <th className="px-6 py-4 text-sm font-semibold text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {users.map((item) => (
                      <tr
                        key={item._id}
                        className="border-t hover:bg-indigo-50 transition duration-200"
                      >
                        {/* Avatar & Name */}
                        <td className="px-6 py-4 flex items-center gap-3">
                          <img
                            src={
                              item.image ||
                              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            }
                            alt={item.firstName}
                            className="w-10 h-10 rounded-full object-cover border"
                          />
                          <span className="font-semibold text-gray-800">
                            {item.firstName} {item.lastName}
                          </span>
                        </td>

                        {/* Email */}
                        <td className="px-6 py-4 text-gray-600 text-sm">
                          {item.email}
                        </td>

                        {/* Role */}
                        <td className="px-6 py-4 text-center">
                          {item.isAdmin ? (
                            <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                              <FaUserShield /> Admin
                            </span>
                          ) : (
                            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                              Customer
                            </span>
                          )}
                        </td>

                        {/* Email Verified */}
                        <td className="px-6 py-4 text-center">
                          {item.isEmailVerified ? (
                            <span className="text-green-600 font-semibold text-xs bg-green-50 px-2.5 py-1 rounded-full">
                              Verified
                            </span>
                          ) : (
                            <span className="text-yellow-600 font-semibold text-xs bg-yellow-50 px-2.5 py-1 rounded-full">
                              Pending
                            </span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 text-center">
                          {item.isBlocked ? (
                            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                              Blocked
                            </span>
                          ) : (
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                              Active
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-center">
                          {!item.isAdmin && (
                            <button
                              onClick={() => handleToggleBlock(item.email, item.isBlocked)}
                              className={`p-2 rounded-lg transition ${
                                item.isBlocked
                                  ? "bg-green-100 hover:bg-green-200 text-green-700"
                                  : "bg-red-100 hover:bg-red-200 text-red-600"
                              }`}
                              title={item.isBlocked ? "Unblock User" : "Block User"}
                            >
                              {item.isBlocked ? <FaUserCheck /> : <FaUserLock />}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          ) : (
            <div className="py-20 flex justify-center">
              <LoadingAnimation />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}