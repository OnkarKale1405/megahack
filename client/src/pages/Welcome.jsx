import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAccount } from '../app/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/repository/userRepo';
import axios from 'axios';

const Welcome = () => {
    const account = useSelector(selectAccount);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);

    const handleLogout = () => {
        dispatch(logout(navigate));
        navigate('/login');
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        console.log("Selected file:", file);
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();

        formData.append("image", selectedFile);
        formData.append("username", account.username); 

        try {
            const response = await axios.post("http://localhost:5000/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("File uploaded successfully:", response.data);
            alert("File uploaded successfully!");
        } catch (error) {
            console.error("File upload failed:", error);
            alert("File upload failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden md:max-w-2xl">
                <div className="md:flex">
                    <div className="p-8 w-full">
                        <div className="flex justify-end items-center mb-6">
                            <button
                                onClick={handleLogout}
                                className="inline-flex cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
                            >
                                Logout
                            </button>
                        </div>

                        <div className="flex items-center mb-6">
                            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center text-white text-xl font-bold">
                                {account.username ? account.username.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div className="ml-4">
                                <h2 className="text-2xl font-bold text-gray-800">Welcome back!</h2>
                                <p className="text-gray-600">{account.username}</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                            <h3 className="text-lg font-medium text-gray-800 mb-2">Account Details</h3>
                            <div className="grid grid-cols-1 gap-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Username:</span>
                                    <span className="font-medium text-gray-800">{account.username}</span>
                                </div>
                                {account.email && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Email:</span>
                                        <span className="font-medium text-gray-800">{account.email}</span>
                                    </div>
                                )}
                                {account.role_id && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Role:</span>
                                        <span className="font-medium text-gray-800">
                                            {account.role_id === 1 ? "Admin" : account.role_id === 2 ? "User" : "Farmer"}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* File Upload Section */}
                        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                            <h3 className="text-lg font-medium text-gray-800 mb-2">Upload File</h3>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="mb-3 block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none"
                            />
                            <button
                                onClick={handleFileUpload}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
