import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsAccountDropdownOpen(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) &&
                event.target.id !== 'mobile-menu-button') {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Close mobile menu on window resize (if screen becomes larger)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) { // md breakpoint
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const navItems = [
        { label: 'Markets Nearby', href: '/markets' },
        { label: 'Products', href: '/products' },
        { label: 'Farmers', href: '/farmers' },
        { label: 'Community', href: '/community' },
    ];

    return (
        <nav className="sticky top-0 z-50 flex justify-between items-center py-4 px-6 md:px-8 bg-white shadow-sm">
            {/* Logo */}
            <Link to="/" className="flex items-center">
                <div className="text-2xl font-bold flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-green-600 mr-2">
                        <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-700 font-bold">FarmFresh</span>
                </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
                {navItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.href}
                        className="text-gray-700 hover:text-green-600 transition-colors font-medium"
                    >
                        {item.label}
                    </Link>
                ))}
            </div>

            {/* Right Side - Cart and Account */}
            <div className="flex items-center space-x-4">


                {/* Account Icon with Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                        className="p-2 text-gray-700 hover:text-green-600 transition-colors rounded-full hover:bg-gray-100"
                        aria-expanded={isAccountDropdownOpen}
                        aria-label="Account menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </button>

                    {/* Account Dropdown */}
                    <AnimatePresence>
                        {isAccountDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                            >
                                <div className="px-4 py-2 border-b border-gray-100">
                                    <p className="text-sm font-medium text-gray-900">Account</p>
                                </div>

                                <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    User/ Vendor Login
                                </Link>
                                <Link to="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    User/ Vendor Sign Up
                                </Link>

                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Mobile Menu Button - Only visible on mobile */}
                <button
                    id="mobile-menu-button"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 text-gray-700 hover:text-green-600 transition-colors"
                    aria-expanded={isMobileMenuOpen}
                    aria-label="Toggle mobile menu"
                >
                    {isMobileMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu - Only visible when toggled */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        ref={mobileMenuRef}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-full left-0 right-0 bg-white shadow-lg z-40 border-t border-gray-100 md:hidden"
                    >
                        <div className="flex flex-col py-2">
                            {navItems.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.href}
                                    className="px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-green-600 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <div className="border-t border-gray-100 my-2"></div>
                            <div className="px-6 py-2">
                                <p className="font-medium text-gray-900">Account</p>
                                <div className="ml-4 mt-2 flex flex-col space-y-2">
                                    <Link to="/login" className="text-gray-700 hover:text-green-600" onClick={() => setIsMobileMenuOpen(false)}>
                                        User/Vendor Login
                                    </Link>
                                    <Link to="/register" className="text-gray-700 hover:text-green-600" onClick={() => setIsMobileMenuOpen(false)}>
                                        User/Vendor Sign Up
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;