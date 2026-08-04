import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import LoadingAnimation from "../../components/lodingAnimation";
import ProductDeleteModal from "../../components/productDeleteModal";

export default function AdminProductsPage() {

    const [products, setProducts] = useState([]);
    const [isProductsAreloded, setIsProductsAreLoaded] = useState(false);

    useEffect(() => {

        if (!isProductsAreloded) {

            const token = localStorage.getItem("token");

            axios.get(import.meta.env.VITE_API_URL + "/products", {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then((response) => {

                setProducts(response.data);
                setIsProductsAreLoaded(true);

            }).catch((error) => {
                console.log(error);
            });

        }

    }, [isProductsAreloded]);



    return (

        <div className="w-full h-full overflow-y-auto bg-gray-100 p-8 rounded-lg">

            {/* Header */}

            <div className="flex justify-between items-center bg-white rounded-2xl shadow-sm border border-gray-200 px-8 py-6 mb-8">

                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Products
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage your products easily.
                    </p>
                </div>

                <div className="bg-indigo-50 px-5 py-2 rounded-xl">
                    <span className="font-semibold text-indigo-600">
                        {products.length} Products
                    </span>
                </div>

            </div>



            {/* Table */}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

                <div className="overflow-x-auto">

                    {
                        isProductsAreloded ?

                            <table className="min-w-full">

                                <thead className="bg-gray-100 sticky top-0">

                                    <tr className="text-gray-700">

                                        <th className="px-6 py-4 text-sm font-semibold text-left">
                                            Image
                                        </th>

                                        <th className="px-6 py-4 text-sm font-semibold">
                                            Product ID
                                        </th>

                                        <th className="px-6 py-4 text-sm font-semibold text-left">
                                            Name
                                        </th>

                                        <th className="px-6 py-4 text-sm font-semibold">
                                            Price
                                        </th>

                                        <th className="px-6 py-4 text-sm font-semibold">
                                            Label Price
                                        </th>

                                        <th className="px-6 py-4 text-sm font-semibold">
                                            Brand
                                        </th>

                                        <th className="px-6 py-4 text-sm font-semibold">
                                            Model
                                        </th>

                                        <th className="px-6 py-4 text-sm font-semibold">
                                            Category
                                        </th>

                                        <th className="px-6 py-4 text-sm font-semibold">
                                            Availability
                                        </th>

                                        <th className="px-6 py-4 text-sm font-semibold">
                                            Stock
                                        </th>

                                        <th className="px-6 py-4 text-sm font-semibold">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        products.map((item) => {

                                            return (

                                                <tr
                                                    key={item.productID}
                                                    className="border-t hover:bg-indigo-50 transition duration-200"
                                                >

                                                    <td className="px-6 py-4">

                                                        <img
                                                            src={item.images?.[0]}
                                                            alt={item.name}
                                                            className="w-16 h-16 rounded-xl object-cover border"
                                                        />

                                                    </td>

                                                    <td className="text-center font-medium text-gray-700">
                                                        {item.productID}
                                                    </td>

                                                    <td className="px-6 py-4">

                                                        <div className="font-semibold text-gray-800">
                                                            {item.name}
                                                        </div>

                                                    </td>

                                                    <td className="text-center font-semibold text-green-600">
                                                        Rs. {item.price}
                                                    </td>

                                                    <td className="text-center text-gray-600">
                                                        Rs. {item.labelledPrice}
                                                    </td>

                                                    <td className="text-center">
                                                        {item.brand}
                                                    </td>

                                                    <td className="text-center">
                                                        {item.model}
                                                    </td>

                                                    <td className="text-center">

                                                        <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">

                                                            {item.category}

                                                        </span>

                                                    </td>

                                                    <td className="text-center">

                                                        {
                                                            item.isAvallable ?

                                                                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">

                                                                    Available

                                                                </span>

                                                                :

                                                                <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">

                                                                    Out of Stock

                                                                </span>
                                                        }

                                                    </td>

                                                    <td className="text-center font-semibold">

                                                        {item.stock}

                                                    </td>

                                                    <td>

                                                        <div className="flex items-center justify-center gap-3">

                                                            <ProductDeleteModal
                                                                product={item}
                                                                refresh={() => {
                                                                    setIsProductsAreLoaded(false);
                                                                }}
                                                            />

                                                            <Link
                                                                to="/admin/edit-product"
                                                                state={item}
                                                                className="w-10 h-10 rounded-lg bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition"
                                                            >

                                                                <BiEdit className="text-blue-600 text-xl" />

                                                            </Link>

                                                        </div>

                                                    </td>

                                                </tr>

                                            )

                                        })
                                    }

                                </tbody>

                            </table>

                            :

                            <div className="py-20 flex justify-center">

                                <LoadingAnimation />

                            </div>

                    }

                </div>

            </div>



            {/* Floating Button */}

            <Link

                to="/admin/add-product"

                className="fixed bottom-8 right-8 w-16 h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-700 shadow-xl flex justify-center items-center text-white text-2xl transition-all duration-300 hover:scale-110"

            >

                <FaPlus />

            </Link>

        </div>

    );

}