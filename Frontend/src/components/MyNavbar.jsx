import { Link, Links, useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "../data/menuItems";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const MyNavbar = () => {
    const location = useLocation(); // Get current path
    const navigate = useNavigate()
    const [isMobileView, setMobileView] = useState(false);
    const handleLogin = () => {
        // alert('Login button clicked')
        navigate('/login')
    }

    return (
        <nav className="fixed top-0 left-0 right-0 bg-slate-100-100/90 backdrop-blur-sm z-50 border-b border-gray-100  shadow-md">
            <div className="container w-full mx-auto flex py-0 items-center justify-between p-2 sm:px-4 md:px-6 lg:px-8 h-12 lg:h-16">
                {/* Logo */}
                <Link to="/" className="hidden md:block text-2xl font-bold text-red-700 cursor-pointer">
                    <span className="text-3xl pr-2 font-extrabold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 
                      bg-clip-text text-transparent animate-pulse">IDEAL</span><span className="text-3xl font-medium  text-blue-600">FAKE STORE</span>
                </Link>
                <Link to={'/'} className="text-red-600 text-2xl px-3 font-bold md:hidden"><span className=" text-blue-600">I</span><span>F</span>S</Link>

                {/* menu for mobile devices */}

                <button onClick={() => setMobileView(!isMobileView)} className="md:hidden p-2 ml-auto">
                    {isMobileView ? <HiX /> : <HiMenu />}
                </button>



                {/* Navbar Menu  for desktop devices*/}

                <div className="flex gap-10">
                    {menuItems.map((item) => (
                        // <Link to={item.link} key={item.id} className={`px-4 py-2 rounded-md transition-colors ${location.pathname === item.link ? "bg-yellow-400" : "hover:bg-red-400"}`}>
                        //     {item.title}
                        // </Link>
                        <Link to={item.link} key={item.id} className={`hidden md:block text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 hover:after:w-full   after:transition-all ${location.pathname === item.link ? "text-blue-700 after:w-full shadow-md" : ""}`}>
                            {item.title}
                        </Link>
                    ))}
                </div>

                <button onClick={handleLogin} className="hidden md:block px-4 py-1.5 bg-blue-300 rounded-md font-medium text-sm hover:bg-blue-800 hover:text-white hover:shadow-blue-200 hover:drop-shadow-md">Login</button>

            </div>

            {/* mobile menu items */}
            {isMobileView && (
                <div className="md:hidden bg-white border-gray-100 py-4">
                    <div className="container space-y-3 mx-auto">
                        {menuItems.map((item) => (
                            <Link to={item.link} key={item.id} className={`block text-sm font-medium py-2 pl-2 ${location.pathname === item.link ? "text-blue-600" : "text-gray-600"} hover:text-gray-900 hover:bg-slate-50`} >{item.title}</Link>
                        ))}
                        <button onClick={handleLogin} className="w-full px-4 py-1.5 bg-blue-300 rounded-md font-medium text-sm hover:bg-blue-800 hover:text-white hover:shadow-blue-200 hover:drop-shadow-md">Login</button>
                    </div>

                </div>
            )}

        </nav>
    );
};

export default MyNavbar;
