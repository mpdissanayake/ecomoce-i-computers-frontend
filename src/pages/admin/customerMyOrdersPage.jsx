import { Link } from "react-router-dom";
import { FaEye, FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import ProductDeleteModal from "../../components/productDeleteModal";
import getFormattedPrice from "../utils/price-format";
import LoadingAnimation from "../../components/lodingAnimation";

import CustomerOrderDetailsModal from "../../components/customerOrderDetailsModal";

export default function CustomerOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalOrders, setTotalOrders] = useState(0);
    const [isOrdersAreloded, setIsOrdersAreLoaded] = useState(false);

    useEffect(() => {
        if (!isOrdersAreloded) {
            const token = localStorage.getItem("token");
            
            axios.get(import.meta.env.VITE_API_URL + "/orders/"+pageSize+"/"+currentPage, {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((response) => {
                setOrders(response.data.orders);
                setTotalPages(response.data.totalPages || 1);
                setTotalOrders(response.data.total || 0);
                setIsOrdersAreLoaded(true);

            }).catch((error) => {
                console.log(error);
                console.log("Error response:", error.response);
                setIsOrdersAreLoaded(true);
            });
        }
    }, [isOrdersAreloded]);

    return (
        <div className="w-full h-full overflow-y-auto bg-gray-100 p-8 rounded-lg">
            {/* Header */}
            <div className="flex justify-between items-center bg-white rounded-2xl shadow-sm border border-gray-200 px-8 py-6 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
                    <p className="text-gray-500 mt-1">Manage your Orders with easily.</p>

                </div>
                

                {isOrdersAreloded && (
                    <div className="bg-indigo-50 px-5 py-2 rounded-xl">
                        <span className="font-semibold text-indigo-600">
                         Total Orders {totalOrders} 
                        </span>
                    </div>
                )}
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    {isOrdersAreloded ? (
                        <>
                            {orders.length === 0 ? (
                                <div className="py-20 text-center">
                                    <p className="text-gray-500 text-lg">No orders found</p>
                                </div>
                            ) : (
                                <>
                                    <table className="min-w-full">
                                        <thead className="bg-gray-100 sticky top-0">
                                            <tr className="text-gray-700">
                                                <th className="px-6 py-4 text-sm font-semibold text-center">OrderID</th>
                                                <th className="px-6 py-4 text-sm font-semibold text-center">Email</th>
                                                <th className="px-6 py-4 text-sm font-semibold text-center">First Name</th>
                                                <th className="px-6 py-4 text-sm font-semibold text-center">Last Name</th>
                                                <th className="px-6 py-4 text-sm font-semibold text-center">Phone Number</th>
                                                <th className="px-6 py-4 text-sm font-semibold text-center">Date</th>
                                                <th className="px-6 py-4 text-sm font-semibold text-center">Total</th>
                                                <th className="px-6 py-4 text-sm font-semibold text-center">Status</th>
                                                <th className="px-6 py-4 text-sm font-semibold text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((item) => (
                                                <tr key={item.orderId} className="border-t hover:bg-indigo-50 transition duration-200">
                                                    <td className="px-6 py-4 text-center">
                                                        <span className="inline-block rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                                            {item.orderId}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <div className="font-semibold text-gray-800">{item.email}</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center text-gray-600">{item.firstName}</td>
                                                    <td className="px-6 py-4 text-center text-gray-600">{item.lastName}</td>
                                                    <td className="px-6 py-4 text-center text-gray-700">{item.phoneNumber}</td>
                                                    <td className="px-6 py-4 text-center text-gray-600">
                                                        {new Date(item.date).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 text-center text-gray-600">
                                                        <span className="font-semibold text-gray-800">
                                                            {getFormattedPrice(item.total)}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className="inline-block rounded-full bg-blue-50 text-blue-600 px-3 py-1 text-xs font-medium">
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <CustomerOrderDetailsModal order={item} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    
                                    {/* Pagination */}
                                    <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200">
                                        <div className="text-sm text-gray-600">
                                            Showing {orders.length} of {totalOrders} orders
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button 
                                                onClick={() => {
                                                    if (currentPage > 1) {
                                                        setCurrentPage(currentPage - 1);
                                                        setIsOrdersAreLoaded(false);
                                                    }
                                                }} 
                                                disabled={currentPage === 1}
                                                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                                                    currentPage === 1 
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                            >
                                                Previous
                                            </button>
                                            <span className="text-sm text-gray-600">
                                                Page {currentPage} of {totalPages}
                                            </span>
                                            <button 
                                                onClick={() => {
                                                    if (currentPage < totalPages) {
                                                        setCurrentPage(currentPage + 1);
                                                        setIsOrdersAreLoaded(false);
                                                    }
                                                }}
                                                disabled={currentPage === totalPages}
                                                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                                                    currentPage === totalPages 
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                            >
                                                Next
                                            </button>
                                        {/*page size*/}
                                            <select value={pageSize}
                                                onChange={(e)=>{
                                                    setPageSize(parseInt(e.target.value));
                                                    setIsOrdersAreLoaded(false)
                                                }}
                                                className="ml-4 px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
                                                ><option value={2}>2</option>
                                                 <option value={5}>5</option>
                                                <option value={10}>10</option>
                                                <option value={20}>20</option>
                                                <option value={50}>50</option>

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