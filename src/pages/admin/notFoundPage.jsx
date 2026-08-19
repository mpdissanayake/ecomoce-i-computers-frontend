import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="w-full h-screen bg-primary flex items-center justify-center px-6">

            <div className="text-center">

                {/* 404 */}
                <h1 className="text-[120px] md:text-[180px] font-extrabold text-accent leading-none">
                    404
                </h1>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-4">
                    Page Not Found
                </h2>

                {/* Description */}
                <p className="text-gray-500 text-lg mt-4 max-w-md mx-auto">
                    Sorry, the page you are looking for doesn't exist
                    or may have been moved.
                </p>

                {/* Back Home Button */}
                <Link
                    to="/"
                    className="inline-block mt-8 px-6 py-3 bg-accent text-white font-semibold rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
                >
                    Back to Home
                </Link>

            </div>

        </div>
    );
}