

import { toast } from 'react-hot-toast';
import { apiConnector } from '../Connector';
import { setAccount, setAccountAfterRegister, LogOut } from '../../app/AuthSlice';
import { authEndpoints } from "../Api"
const { LOGIN_API, REGISTER, LOGOUT } = authEndpoints;

export function login(email, password, navigate) {
    return async (dispatch) => {
        const loadingToast = toast.loading("Letting you in...");

        try {

            const getLocation = () => {
                return new Promise((resolve) => {
                    if ("geolocation" in navigator) {
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                resolve({
                                    latitude: position.coords.latitude,
                                    longitude: position.coords.longitude,
                                });
                            },
                            (error) => {
                                resolve({ latitude: null, longitude: null, error: error.message });
                            }
                        );
                    } else {
                        resolve({ latitude: null, longitude: null, error: "Geolocation not supported" });
                    }
                });
            };

            const location = await getLocation();

            const finalLocation = {
                type: "Point",
                coordinates: [location.longitude, location.latitude],
            }

            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
                location: finalLocation
            });

            if (response.status === 200) {
                toast.success(response.message || "Logged in...");
                const temp = {
                    "_id": response.data.user._id,
                    "username": response.data.user.fullName,
                    "email": response.data.user.email,
                    "token": response.data.user.token,
                    "role": response.data.user.role,
                    "location": response.data.user.location,
                };
                await dispatch(setAccount(temp));
                if (temp.role === "user") {
                    navigate("/markets");
                } else if (temp.role === "admin") {
                    navigate("/admin/welcome");
                } else {
                    navigate("/vendor/add");
                }

            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            toast.error("Login failed. Please try again.");
        }

        toast.dismiss(loadingToast);
    };
}

export function register(fullName, email, role, password, navigate) {
    return async (dispatch) => {
        const loadingToast = toast.loading("Registering you...");
        try {
            const formData = {
                fullName,
                email,
                role,
                password,
            };

            const response = await apiConnector("POST", REGISTER, formData);

            if (response.data) {
                toast.success("Registration Successful..");
                const temp = {
                    "_id": response.data.user._id,
                    "username": response.data.user.fullName,
                    "email": response.data.user.email,
                    "role": response.data.user.role,
                }
                dispatch(setAccountAfterRegister(temp))
                navigate("/login");
            } else {
                throw new Error(response.data.message);
            }
        }
        catch (error) {
            console.log("Register API Error....", error);
            toast.error(error.response?.data?.message);
        }
        toast.dismiss(loadingToast);
    }
}

export function logout(navigate) {
    return async (dispatch) => {
        const loadingToast = toast.loading("Logging you out...");
        try {
            const response = await apiConnector("POST", LOGOUT, {});

            if (response.status === 200) {
                toast.success("Logout Successful..");
                dispatch(LogOut());
                navigate("/");
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            toast.error("Logout failed. Please try again.");
        }

        toast.dismiss(loadingToast);
    };
}
