import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LogOut as logout, selectAccount } from '../app/AuthSlice';
import { Globe, Library, UserRoundPlus, UserPen, LogOut } from 'lucide-react';

const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const acc = useSelector(selectAccount);
    const location = useLocation();

    const routes = [
        {
            name: "Profile",
            path: "/admin/welcome",
            allowedFor: ["admin"],
            icon: UserPen
        },
        {
            name: "Approvals",
            path: "/admin/Approvals",
            allowedFor: ["admin"],
            icon: Library
        },
        {
            name: "add",
            path: "/vendor/add",
            allowedFor: ["vendor"],
            icon: Library
        }
    ];

    const filteredRoutes = routes.filter(route => route.allowedFor.includes(acc.role));

    return (
        <div className="h-screen w-60 bg-gray-900 flex flex-col items-start p-4 shadow-md fixed left-0 top-0">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8 w-full">
                <Globe className="w-8 h-8 text-white" />
                <span className="text-white text-lg font-semibold">Dashboard</span>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2 w-full flex-grow">
                {filteredRoutes.map((route, index) => {
                    const isActive = location.pathname === route.path;
                    return (
                        <button
                            key={index}
                            onClick={() => navigate(route.path)}
                            className={`flex items-center gap-3 p-3 rounded-lg w-full transition-colors ${isActive ? "bg-indigo-500 text-white" : "text-gray-400 hover:bg-gray-700"
                                }`}
                        >
                            <route.icon className="w-5 h-5 min-w-5" />
                            <span className="text-sm">{route.name}</span>
                        </button>
                    );
                })}
            </nav>

            {/* Logout Button */}
            <button
                onClick={() => dispatch(logout())}
                className="flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:bg-red-600 hover:text-white transition-colors w-full mt-4"
            >
                <LogOut className="w-5 h-5 min-w-5" />
                <span className="text-sm">Logout</span>
            </button>
        </div>
    );
};

export default Sidebar;