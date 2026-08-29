// src/components/productReviews.jsx
import { useEffect, useState } from "react";
import api from "../pages/utils/api";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa6";

export default function ProductReviews({ productID }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(0);

  // Reviews Fetch කිරීම
  const fetchReviews = () => {
    if (!productID) return;

    api
      .get("/reviews/" + productID)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Reviews load error:", error);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, [productID]);

  // Review Submit කිරීම
  const handleSubmitReview = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Review එකක් ලබා දීමට කරුණාකර පළමුව Log in වන්න.");
      return;
    }

    setLoading(true);

    api
      .post(
        "/reviews",
        {
          productID: productID,
          rating: Number(rating),
          comment: comment,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message || "Review එක සාර්ථකව එකතු විය!");
        setComment("");
        setRating(5);
        fetchReviews(); // ලැයිස්තුව Refresh කිරීම
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || "Review එක ඇතුළත් කිරීමට නොහැකි විය."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Customer Reviews & Ratings ({reviews.length})
      </h2>

      {/* Form Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          ඔබේ අදහස සහ Rating ලබා දෙන්න
        </h3>

        <form onSubmit={handleSubmitReview} className="space-y-4">
          {/* Star Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Rating එක තෝරන්න:
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className="text-2xl focus:outline-none transition-colors"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  <FaStar
                    className={
                      (hover || rating) >= star
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                </button>
              ))}
              <span className="ml-2 text-sm font-semibold text-gray-600">
                ({rating}/5)
              </span>
            </div>
          </div>

          {/* Comment Area */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Comment:
            </label>
            <textarea
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="භාණ්ඩය පිළිබඳ ඔබේ අදහස මෙහි ලියන්න..."
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Submit වෙමින් පවතී..." : "Submit Review"}
          </button>
        </form>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            මෙම භාණ්ඩය සඳහා තවමත් Reviews ලැබී නොමැත. පළමු Review එක ඔබ ලබා දෙන්න!
          </div>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev._id}
              className="p-4 border border-gray-100 rounded-xl bg-gray-50 hover:bg-white hover:shadow-sm transition"
            >
              <div className="flex justify-between items-center mb-2">
                {/* User ගේ නම නිවැරදිව පෙන්වීම */}
                <span className="font-semibold text-gray-800">
                  {rev.userName || rev.userEmail || "Customer"}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(rev.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex gap-1 text-yellow-400 text-sm mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < rev.rating ? "text-yellow-400" : "text-gray-200"
                    }
                  />
                ))}
              </div>

              <p className="text-gray-600 text-sm">{rev.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}