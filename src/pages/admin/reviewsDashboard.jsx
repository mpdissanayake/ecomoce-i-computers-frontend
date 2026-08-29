// src/pages/admin/reviewsDashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaTrash } from "react-icons/fa6";
import toast from "react-hot-toast";
import LoadingAnimation from "../../components/lodingAnimation";

export default function ReviewsDashboard() {
  const [reviews, setReviews] = useState([]);
  const [isReviewsLoaded, setIsReviewsLoaded] = useState(false);

  useEffect(() => {
    if (!isReviewsLoaded) {
      const token = localStorage.getItem("token");

      axios
        .get(import.meta.env.VITE_API_URL + "/reviews", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setReviews(response.data);
          setIsReviewsLoaded(true);
        })
        .catch((error) => {
          console.log(error);
          toast.error(
            error?.response?.data?.message || "Reviews ලබා ගැනීමට නොහැකි විය."
          );
          setIsReviewsLoaded(true);
        });
    }
  }, [isReviewsLoaded]);

  // Review එකක් මකා දැමීම (Delete)
  const handleDeleteReview = (id) => {
    if (!window.confirm("මෙම Review එක මකා දැමීමට ඔබට සහතිකද?")) {
      return;
    }

    const token = localStorage.getItem("token");

    axios
      .delete(import.meta.env.VITE_API_URL + "/reviews/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        toast.success(response.data.message || "Review එක සාර්ථකව මකා දමන ලදී.");
        setIsReviewsLoaded(false); // List එක නැවත Refresh කිරීම
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || "Review මකා දැමීමට නොහැකි විය."
        );
      });
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-gray-100 p-8 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center bg-white rounded-2xl shadow-sm border border-gray-200 px-8 py-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Reviews Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Manage and moderate customer reviews easily.
          </p>
        </div>

        {isReviewsLoaded && (
          <div className="bg-indigo-50 px-5 py-2 rounded-xl">
            <span className="font-semibold text-indigo-600">
              Total Reviews: {reviews.length}
            </span>
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          {isReviewsLoaded ? (
            <>
              {reviews.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-gray-500 text-lg">තවමත් Reviews කිසිවක් ලැබී නොමැත.</p>
                </div>
              ) : (
                <table className="min-w-full">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr className="text-gray-700">
                      <th className="px-6 py-4 text-sm font-semibold text-center">
                        Product ID
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-left">
                        Customer Name
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-left">
                        Email
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-center">
                        Rating
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-left">
                        Comment
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-center">
                        Date
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {reviews.map((item) => (
                      <tr
                        key={item._id}
                        className="border-t hover:bg-indigo-50 transition duration-200"
                      >
                        <td className="px-6 py-4 text-center">
                          <span className="inline-block rounded-md bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                            {item.productID}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-800">
                            {item.userName || "Customer"}
                          </div>
                        </td>

                        <td className="px-6 py-4 text-gray-600 text-sm">
                          {item.userEmail}
                        </td>

                        <td className="px-6 py-4 text-center">
                          <div className="inline-flex items-center gap-1 bg-yellow-50 px-2.5 py-1 rounded-full text-yellow-600 font-semibold text-xs">
                            <span>{item.rating}</span>
                            <FaStar className="text-yellow-400 text-xs" />
                          </div>
                        </td>

                        <td
                          className="px-6 py-4 text-gray-600 text-sm max-w-xs truncate"
                          title={item.comment}
                        >
                          {item.comment}
                        </td>

                        <td className="px-6 py-4 text-center text-gray-500 text-xs">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>

                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleDeleteReview(item._id)}
                            className="w-9 h-9 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 inline-flex items-center justify-center transition cursor-pointer"
                            title="Delete Review"
                          >
                            <FaTrash className="text-sm" />
                          </button>
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