import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import unauthorizedAnimation from "../assets/unauthorized.json";

const Unauthorized = () => {
    const navigate = useNavigate();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: unauthorizedAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-4">
            {/* Left side - Animation */}
            <div className="w-full md:w-1/2 flex justify-end mb-8 md:mb-0">
                <div className="w-64 h-64 md:w-96 md:h-96">
                    <Lottie
                        animationData={unauthorizedAnimation}
                        options={defaultOptions}
                        isClickToPauseDisabled={true}
                    />
                </div>
            </div>

            {/* Right side - Text and Button */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized</h1>
                <p className="text-xl text-gray-700 mb-6 text-center md:text-left max-w-md">
                    Sorry, you don't have permission to access this page. Please check your credentials or contact your administrator.
                </p>
                <button
                    onClick={handleGoBack}
                    className="px-6 py-3 bg-[#3182ce] hover:bg-[#2B6CB0] text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 cursor-pointer"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default Unauthorized;