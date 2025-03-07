import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAccount } from '../app/AuthSlice';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/repository/userRepo';

const Welcome = () => {
    const account = useSelector(selectAccount);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout(navigate));
        navigate('/login');
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
                                        <span className="font-medium text-gray-800">{account.role_id === 1 ? "Admin" : account.role_id === 2 ? "User": "Farmer"}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
                            <h3 className="text-indigo-800 font-medium mb-2">Quick Actions</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <button className="bg-white p-3 rounded-md text-sm text-gray-700 hover:bg-indigo-100 transition-colors duration-150 border border-gray-200">
                                    Edit Profile
                                </button>
                                <button className="bg-white p-3 rounded-md text-sm text-gray-700 hover:bg-indigo-100 transition-colors duration-150 border border-gray-200">
                                    Settings
                                </button>
                                <button className="bg-white p-3 rounded-md text-sm text-gray-700 hover:bg-indigo-100 transition-colors duration-150 border border-gray-200">
                                    My Activity
                                </button>
                                <button className="bg-white p-3 rounded-md text-sm text-gray-700 hover:bg-indigo-100 transition-colors duration-150 border border-gray-200">
                                    Help Center
                                </button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;