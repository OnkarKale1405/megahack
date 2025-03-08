import React from "react";
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-green-700 text-white mt-8">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="md:col-span-1">
                        <h3 className="font-bold text-lg mb-4">Farm Fresh</h3>
                        <p className="text-sm mb-4">
                            Connecting consumers with local farmers for fresh, affordable, and sustainable produce.
                        </p>
                        <p className="text-sm font-medium">Eat fresh, support local! 🌱</p>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-1">
                        <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/about" className="hover:text-green-200 transition duration-200">About Us</Link></li>
                            <li><Link to="/how-it-works" className="hover:text-green-200 transition duration-200">How It Works</Link></li>
                            <li><Link to="/farmers" className="hover:text-green-200 transition duration-200">Meet Our Farmers</Link></li>
                            <li><Link to="/products" className="hover:text-green-200 transition duration-200">Seasonal Products</Link></li>
                            <li><Link to="/blog" className="hover:text-green-200 transition duration-200">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="md:col-span-1">
                        <h3 className="font-bold text-lg mb-4">Contact Us</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                <span>123 Farm Lane, Harvest Valley</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="w-4 h-4 mr-2" />
                                <a href="mailto:info@farmfresh.com" className="hover:text-green-200 transition duration-200">info@farmfresh.com</a>
                            </li>
                            <li className="flex items-center">
                                <Phone className="w-4 h-4 mr-2" />
                                <a href="tel:+15551234567" className="hover:text-green-200 transition duration-200">(555) 123-4567</a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Signup */}
                    <div className="md:col-span-1">
                        <h3 className="font-bold text-lg mb-4">Stay Connected</h3>
                        <p className="text-sm mb-3">Get updates on new farmers and seasonal produce.</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="px-3 py-2 text-sm text-gray-800 rounded-l focus:outline-none w-full max-w-xs"
                            />
                            <button className="bg-green-800 hover:bg-green-900 px-3 py-2 rounded-r text-sm font-medium transition duration-200">
                                Subscribe
                            </button>
                        </div>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="hover:text-green-200 transition duration-200" aria-label="Facebook">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="hover:text-green-200 transition duration-200" aria-label="Twitter">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="hover:text-green-200 transition duration-200" aria-label="Instagram">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="border-t border-green-600 py-4 text-sm text-center">
                <p>© {new Date().getFullYear()} Farm Fresh. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;