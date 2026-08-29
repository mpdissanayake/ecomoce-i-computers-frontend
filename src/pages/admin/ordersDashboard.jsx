// src/pages/admin/ordersDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingAnimation from "../../components/lodingAnimation";
import getFormattedPrice from "../utils/price-format";
import OrderDitailsModal from "../../components/orderDetailsModal";

export default function OrdersDashboard() {
  const [orders, setOrders] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [isOrdersLoaded, setIsOrdersLoaded] = useState(false);

  useEffect(() => {
    if (!isOrdersLoaded) {
      const token = localStorage.getItem("token");

      axios
        .get(
          import.meta.env.VITE_API_URL +
            "/orders/" +
            pageSize +
            "/" +
            currentPage,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((response) => {
          setOrders(response.data.orders || []);
          setTotalPages(response.data.totalPages || 1);
          setTotalOrders(response.data.total || 0);
          setIsOrdersLoaded(true);
        })
        .catch((error) => {
          console.error("Orders Load Error:", error);
          setIsOrdersLoaded(true);
        });
    }
  }, [isOrdersLoaded, pageSize, currentPage]);

  // Order Status වලට අදාළ Badge styles
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
      case "completed":
        return "bg-green-100 text-green-700";
      case "processing":
        return "bg-blue-100 text-blue-700";
      case "shipped":
        return "bg-purple-100 text-purple-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "paused":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-gray-100 p-8 rounded-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-white rounded-2xl shadow-sm border border-gray-200 px-8 py-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Orders Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Manage and track all customer orders with ease.
          </p>
        </div>

        {isOrdersLoaded && (
          <div className="bg-indigo-50 px-5 py-2 rounded-xl">
            <span className="font-semibold text-indigo-600">
              Total Orders: {totalOrders}
            </span>
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          {isOrdersLoaded ? (
            <>
              {orders.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-gray-500 text-lg">ඇණවුම් කිසිවක් හමු නොවීය.</p>
                </div>
              ) : (
                <>
                  <table className="min-w-full">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr className="text-gray-700">
                        <th className="px-6 py-4 text-sm font-semibold text-center">
                          Order ID
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold text-left">
                          Customer
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold text-left">
                          Email
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold text-center">
                          Phone
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold text-center">
                          Date
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold text-center">
                          Total
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold text-center">
                          Status
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold text-center">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                      {orders.map((item) => (
                        <tr
                          key={item.orderId || item._id}
                          className="border-t hover:bg-indigo-50 transition duration-200"
                        >
                          <td className="px-6 py-4 text-center">
                            <span className="inline-block rounded-md bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                              {item.orderId}
                            </span>
                          </td>

                          <td className="px-6 py-4 font-semibold text-gray-800">
                            {item.firstName} {item.lastName}
                          </td>

                          <td className="px-6 py-4 text-gray-600 text-sm">
                            {item.email}
                          </td>

                          <td className="px-6 py-4 text-center text-gray-700 text-sm">
                            {item.phoneNumber}
                          </td>

                          <td className="px-6 py-4 text-center text-gray-500 text-xs">
                            {new Date(item.date).toLocaleDateString()}
                          </td>

                          <td className="px-6 py-4 text-center font-semibold text-green-600">
                            {getFormattedPrice(item.total)}
                          </td>

                          <td className="px-6 py-4 text-center">
                            <span
                              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(
                                item.status
                              )}`}
                            >
                              {item.status || "Pending"}
                            </span>
                          </td>

                          <td className="px-6 py-4 text-center">
                            <OrderDitailsModal
                              order={item}
                              refresh={() => setIsOrdersLoaded(false)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Pagination Section */}
                  <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <div className="text-sm text-gray-600 font-medium">
                      Showing {orders.length} of {totalOrders} orders
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          if (currentPage > 1) {
                            setCurrentPage(currentPage - 1);
                            setIsOrdersLoaded(false);
                          }
                        }}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                          currentPage === 1
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 shadow-sm cursor-pointer"
                        }`}
                      >
                        Previous
                      </button>

                      <span className="text-sm font-semibold text-gray-700">
                        Page {currentPage} of {totalPages}
                      </span>

                      <button
                        onClick={() => {
                          if (currentPage < totalPages) {
                            setCurrentPage(currentPage + 1);
                            setIsOrdersLoaded(false);
                          }
                        }}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                          currentPage === totalPages
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 shadow-sm cursor-pointer"
                        }`}
                      >
                        Next
                      </button>

                      <select
                        value={pageSize}
                        onChange={(e) => {
                          setPageSize(parseInt(e.target.value));
                          setCurrentPage(1);
                          setIsOrdersLoaded(false);
                        }}
                        className="ml-4 px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value={5}>5 per page</option>
                        <option value={10}>10 per page</option>
                        <option value={20}>20 per page</option>
                        <option value={50}>50 per page</option>
                      </select>
                    </div>
                  </div>
                </>
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