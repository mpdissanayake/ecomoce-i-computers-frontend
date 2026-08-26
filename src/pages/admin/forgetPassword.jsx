import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function ForgetPassword() {
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    function sendEmail() {
        api.post("/users/send-otp", {
            email: email
        }).then((response) => {
            setIsEmailSent(true);
            toast.success("OTP sent to your Email");
        }).catch((error) => {
            toast.error(error.response?.data?.message || "Failed to send OTP");
        });
    }

    async function resetPassword() {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await api.post("/users/verify-otp", {
                email: email,
                otp: otp,
                newPassword: newPassword
            });
            toast.success("Password reset successfully");
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to reset password");
        }
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-100">
            {!isEmailSent ? (
                <div className="w-[500px] bg-white shadow-lg rounded-xl p-8 flex flex-col justify-center items-center">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Forget Password</h2>
                    <p className="text-lg mb-6 text-gray-600">Enter your email to reset your password</p>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        onClick={sendEmail}
                        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Send Reset Link
                    </button>
                </div>
            ) : (
                <div className="w-[500px] bg-white shadow-lg rounded-xl p-8 flex flex-col justify-center items-center">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Reset Password</h2>
                    <p className="text-lg mb-6 text-gray-600">Enter the OTP sent to your email and set a new password</p>

                    <input
                        type="text"
                        placeholder="OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />

                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />

                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />

                    <button
                        onClick={resetPassword}
                        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Reset Password
                    </button>
                </div>
            )}
        </div>
    );
}