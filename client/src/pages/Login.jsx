import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/repository/userRepo";
import { useDispatch } from "react-redux";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import Lottie from "lottie-react";
import loginAnimation from "../assets/loginMockup.json";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(login(email, password, navigate));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#EDF2F7]">
            {/* Back button - circular arrow */}
            <div className="absolute top-8 left-8">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center cursor-pointer justify-center gap-1 px-4 py-3 bg-[#3182ce] hover:bg-[#2B6CB0] rounded-full text-white shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Go back to home"
                >
                    <ArrowLeft className="w-5 h-5 text-white" />
                    <span className="text-sm font-medium">Back</span>
                </button>
            </div>

            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-[#EDF2F7] rounded-lg overflow-hidden">
                {/* Left Side - Lottie Animation */}
                <div className="hidden md:flex items-center justify-center p-8">
                    <Lottie animationData={loginAnimation} loop={false} className="w-full max-w-sm" />
                </div>

                {/* Right Side - Form */}
                <div className="p-8">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-600"
                                    >
                                        {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center text-sm text-gray-900">
                                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                                <span className="ml-2">Remember Me</span>
                            </label>
                            <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-[#3182ce] hover:bg-[#2B6CB0] text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        New on our platform? {" "}
                        <Link to="/register" className="text-blue-600 hover:underline">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;