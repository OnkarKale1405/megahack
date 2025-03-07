import React from 'react';

const Navbar = () => {
    const navItems = [
        { label: 'Home', href: '#' },
        { label: 'About', href: '#' },
        { label: 'Features', href: '#' },
        { label: 'Contact', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Product', href: '#' }
    ];

    return (
        <nav className="flex justify-between items-center py-6 px-8 bg-white">
            <div className="flex items-center">
                <div className="text-2xl font-bold flex items-center">
                    <span className="mr-2">🌿</span>
                    {/* Lamaspace */}
                </div>
            </div>
            <div className="flex items-center space-x-6">
                {navItems.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        className="text-gray-700 hover:text-green-600 transition-colors"
                    >
                        {item.label}
                    </a>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;