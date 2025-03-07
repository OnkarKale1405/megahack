import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/repository/userRepo";
import { useDispatch } from "react-redux";
import { Eye, EyeOff, Upload, ArrowLeft } from "lucide-react";
import Lottie from "lottie-react";
import registerAnimation from "../assets/mockup.json";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [roleId, setRoleId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            console.log(file);
            setAvatarPreview(previewUrl);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        dispatch(register(name, email, roleId, password, navigate));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#EDF2F7]">

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

            <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-2 bg-[#EDF2F7] rounded-lg overflow-hidden">

                {/* Left Side - Lottie Animation */}
                <div className="hidden md:flex items-center justify-center p-8">
                    <Lottie animationData={registerAnimation} loop={false} className="w-full max-w-sm" />
                </div>

                {/* Right Side - Form */}
                <div className="p-8">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-800">Register</h2>
                    </div>

                    <div className="flex space-x-4">
                        <form onSubmit={handleRegister} className="space-y-4" encType="multipart/form-data">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="col-span-3 space-y-4">
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
                                        <label className="text-sm font-medium text-gray-700">Fullname</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Enter your name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Role</label>
                                        <select
                                            className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                            value={roleId}
                                            onChange={(e) => setRoleId(e.target.value)}
                                            required
                                        >
                                            <option value="" disabled>Select Role</option>
                                            <option value="user">User</option>
                                            <option value="vendor">vendor</option>
                                        </select>
                                    </div>

                                    {/* Password Field */}
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
                                </div>
                            </div>

                            {/* Register Button */}
                            <button
                                type="submit"
                                className="w-full py-2 px-4 bg-[#3182ce] hover:bg-[#2B6CB0] text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                Register
                            </button>
                            <p className="text-center text-sm text-gray-600 mt-4">
                                Already have an account?{" "}
                                <Link to="/login" className="text-blue-600 hover:underline">
                                    Login
                                </Link>
                            </p>
                        </form>

                        {/* Avatar Upload - Now beside the form */}
                        <div className="flex flex-col items-center justify-center pl-2">
                            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 mb-2">
                                {avatarPreview ? (
                                    <img
                                        src={avatarPreview}
                                        alt="Avatar Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <Upload className="text-gray-400 w-8 h-8" />
                                    </div>
                                )}
                            </div>
                            <label className="cursor-pointer">
                                <span className="text-sm font-medium text-blue-600 hover:text-blue-800">
                                    {avatarPreview ? "Change Avatar" : "Upload Avatar"}
                                </span>
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;