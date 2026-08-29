import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import LoadingAnimation from "../../components/lodingAnimation";
import ImagesSlideShow from "../../components/imageSlideShow";
import getFormattedPrice from "../utils/price-format";
import { addToCart } from "../utils/cart";
import ProductReviews from "../../components/productReviews"; // ProductReviews component එක import කිරීම

export default function ProductOverviewPage() {
    const parameters = useParams();

    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        let isMounted = true;
        console.log("Fetching ,parameters.productID");

        api.get("/products/" + parameters.productID)
            .then((response) => {
                if (isMounted) {
                    console.log(response.data);
                    setProduct(response.data);
                    setStatus("success");
                }
            })
            .catch((error) => {
                if (isMounted) {
                    toast.error(
                        error?.response?.data?.message ||
                            "An error occurred while fetching product details."
                    );
                    setStatus("error");
                }
            });

        return () => {
            isMounted = false;
        };
    }, [parameters.productID]);

    return (
        <div className="w-full min-h-screen flex justify-center items-start p-4 md:p-8 bg-gray-50 overflow-y-auto">
            {status === "loading" && (
                <div className="w-full h-[60vh] flex justify-center items-center">
                    <LoadingAnimation />
                </div>
            )}

            {status === "error" && (
                <div className="w-full h-[300px] flex flex-col items-center justify-center gap-4">
                    <h1 className="text-2xl font-bold">Failed to Load product details....</h1>
                    <Link to="/products" className="px-4 py-2 bg-accent text-white rounded">
                        Back to Product
                    </Link>
                </div>
            )}

            {status === "success" && product && (
                <div className="w-full max-w-7xl flex flex-col gap-8 pb-10">
                    {/* Product Details Section */}
                    <div className="w-full flex lg:flex-row flex-col bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        {/* Image Slideshow */}
                        <div className="w-full lg:w-1/2 flex justify-center items-center">
                            <ImagesSlideShow images={product.images} />
                        </div>

                        {/* Product Information */}
                        <div className="w-full lg:w-1/2 flex flex-col p-[20px]">
                            <h1 className="text-3xl font-bold">
                                {product.name}
                                {product.allNames?.map((alternativeName, index) => {
                                    return (
                                        <span key={index} className="text-gray-500 font-normal ml-2">
                                            | {alternativeName}
                                        </span>
                                    );
                                })}
                            </h1>
                            <h2 className="text-sm text-gray-500 mt-1">{product.productID}</h2>

                            {/* Price */}
                            <div className="w-full mt-5 flex items-baseline">
                                <p className="text-accent font-semibold text-4xl">
                                    {getFormattedPrice(product.price, product.LabelPrice)}
                                </p>
                                {product.labelledPrice > product.price && (
                                    <span className="text-xl text-gray-500 line-through ml-4">
                                        {getFormattedPrice(product.labelledPrice)}
                                    </span>
                                )}
                            </div>

                            {/* Brand and Model */}
                            <div className="w-full mt-5 flex gap-10">
                                <span className="text-lg text-gray-500">
                                    Brand: <span className="text-black font-semibold">{product.brand}</span>
                                </span>
                                <span className="text-lg text-gray-500">
                                    Model: <span className="text-black font-semibold">{product.model}</span>
                                </span>
                            </div>

                            {/* Category */}
                            <div className="w-full mt-5 flex gap-10">
                                <span className="text-lg text-gray-500">
                                    Category: <span className="text-black font-semibold">{product.category}</span>
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-lg mt-5 mb-6 text-gray-700">
                                {product.description}
                            </p>

                            {/* Buttons */}
                            <div className="flex mt-auto gap-5">
                                <button
                                    className="w-62.5 h-17.5 bg-green-500 text-white text-xl font-semibold rounded-lg cursor-pointer hover:bg-green-700 transition-colors duration-300"
                                    onClick={() => {
                                        console.log("Add to cart clicked for:", product);
                                        addToCart(product, 1);
                                        toast.success(`${product.name} added to cart!`);
                                    }}
                                >
                                    Add To cart
                                </button>

                                <Link
                                    to="/checkout"
                                    state={[
                                        {
                                            product: {
                                                productID: product.productID,
                                                name: product.name,
                                                image: product.images?.[0],
                                                labelledPrice: product.labelledPrice,
                                                price: product.price,
                                            },
                                            quantity: 1,
                                        },
                                    ]}
                                    className="w-62.5 h-17.5 bg-blue-500 text-white text-xl font-semibold rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-300 flex justify-center items-center"
                                >
                                    BUY NOW
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Customer Reviews Section */}
                    <ProductReviews productID={product.productID} />
                </div>
            )}
        </div>
    );
}