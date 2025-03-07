import { Outlet } from "react-router-dom"
import Sidebar from '../components/Sidebar';

const SidebarLayout = () => {
    return (
        <div className='flex'>
            <Sidebar />
            <div className="ml-60 flex-1 h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
                <Outlet />
            </div>
        </div>
    )
}

export default SidebarLayout