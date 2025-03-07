import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import hero1 from "../assets/hero1.avif"
import hero2 from "../assets/hero2.avif"
import story1 from "../assets/story1.avif";
import story2 from "../assets/story2.avif";
import story3 from "../assets/story3.avif";

const Landing = () => {
    const [activeQuestion, setActiveQuestion] = useState(null);

    const [navbarHeight, setNavbarHeight] = useState(0);
    const navbarRef = useRef(null);

    // Effect to measure navbar height
    useEffect(() => {
        if (navbarRef.current) {
            setNavbarHeight(navbarRef.current.offsetHeight);
        }
    }, []);

    const faqQuestions = [
        {
            title: "How Do I Find Local Farmers Markets?",
            content: "Our app provides real-time location tracking and comprehensive listings of farmers markets in your area, making discovery easy and convenient."
        },
        {
            title: "What Information Can I Get About Markets?",
            content: "Access detailed vendor information, product availability, pricing, seasonal produce, and even get notifications about special market events."
        },
        {
            title: "How Does This Support Local Agriculture?",
            content: "By connecting consumers directly with local farmers, we help support small-scale agriculture, reduce food miles, and promote sustainable consumption."
        }
    ];

    return (
        <div className="bg-white">
            <div ref={navbarRef}>
                <Navbar />
            </div>
            {/* Hero Section */}
            <div className="flex gap-4 py-4 px-8 overflow-hidden"
                style={{
                    height: `calc(100vh - ${navbarHeight}px)`
                }}>
                <div className="bg-green-100 w-1/2 rounded-2xl flex flex-col justify-center p-8">
                    <h1 className="text-[4rem] w-[70%] leading-[4rem] font-bold text-gray-800 mb-6">
                        Welcome to Clean Energy Solutions
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Powering the Future, Sustainably
                    </p>
                    <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
                        Learn More
                    </button>
                </div>
                <div className="flex w-1/2 flex-col gap-4">
                    {/* First Row with Full Width Image */}
                    <div className='w-full h-1/2 bg-pink-100 relative'>
                        <img
                            src={hero1}  // Replace hero1 with your image source
                            alt="Wind Turbine"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>

                    {/* Second Row with Image and Paragraph Side by Side */}
                    <div className="flex gap-4 h-1/2 rounded-2xl">
                        {/* First Column with Image */}
                        <div className="w-1/2 h-full relative">
                            <img
                                src={hero2}
                                alt="Eco Energy"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>

                        {/* Second Column with Paragraph */}
                        <div className="w-1/2 flex items-center">
                            <p className="text-gray-600">
                                With a focus on innovation and eco-friendly practices, we strive to lead the way in the green energy industry.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Portfolio of Projects Section */}
            <div className="bg-white p-8 md:p-16">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Explore Our Portfolio of Successful Market Connections
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        {
                            image: "/api/placeholder/400/300?text=Solar+Panels",
                            title: "Market Discovery",
                            description: "Find nearby farmers markets with ease"
                        },
                        {
                            image: "/api/placeholder/400/300?text=Wind+Turbine",
                            title: "Product Insights",
                            description: "Explore fresh produce and vendor details"
                        },
                        {
                            image: "/api/placeholder/400/300?text=Green+Energy",
                            title: "Sustainable Choices",
                            description: "Support local agriculture"
                        }
                    ].map((item, index) => (
                        <div key={index} className="bg-gray-100 rounded-2xl overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        </div>
                    ))}
                    <div className="bg-purple-100 rounded-2xl p-6 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold mb-4">Over the Last Decade</h3>
                        <p className="text-4xl font-bold text-purple-700">50%</p>
                        <p className="text-gray-600">Increase in Local Market Connections</p>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white p-8 md:p-16">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Frequently Asked Questions
                </h2>
                <div className="max-w-4xl mx-auto">
                    {faqQuestions.map((faq, index) => (
                        <div key={index} className="border-b py-4">
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
                            >
                                <h3 className="text-xl font-semibold">{faq.title}</h3>
                                <span>{activeQuestion === index ? '−' : '+'}</span>
                            </div>
                            {activeQuestion === index && (
                                <p className="text-gray-600 mt-4">{faq.content}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Stories Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-16">
                {/* Left Side Text and Button */}
                <div className="flex flex-col justify-center">
                    <h2 className="text-4xl font-bold mb-6">
                        Our Stories Speak to the Effectiveness of Our Services.
                    </h2>
                    <button className="bg-green-200 text-black px-6 py-3 rounded-full w-fit hover:bg-green-300 transition">
                        Book a Free Consultation
                    </button>
                </div>

                {/* Right Side Images */}
                <div className="relative">
                    {/* Central Large Image with Play Button */}
                    {/* <div className="w-full mb-6">
                        <div className="relative">
                            <img
                                src="/api/placeholder/800/500?text=Solar+Panel+Installation"
                                alt="Solar Panel Installation"
                                className="w-full rounded-2xl object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="black" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* Small Circular Images */}
                    <div className="flex justify-between space-x-4">
                        {[
                            story1, story2, story3
                        ].map((src, index) => (
                            <div key={index} className="w-1/3">
                                <img
                                    src={src}
                                    alt={`Project ${index + 1}`}
                                    className="w-full h-32 object-cover rounded-2xl"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Knowledge Section */}
            <div className="bg-white p-8 md:p-16">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Knowledge is Power, Especially When It's About Local Food
                </h2>
                <div className="grid md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((_, index) => (
                        <div key={index} className="bg-gray-100 rounded-2xl overflow-hidden">
                            <img
                                src="/api/placeholder/300/300?text=Food+Knowledge"
                                alt={`Knowledge ${index + 1}`}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-bold">Local Food Insights</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="bg-green-100 p-8 grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-2xl font-bold mb-4">Stay Informed</h3>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-grow p-3 rounded-l-full border"
                        />
                        <button className="bg-green-600 text-white px-6 rounded-r-full">
                            Subscribe
                        </button>
                    </div>
                </div>
                <div className="flex justify-end items-center">
                    <div className="flex space-x-4">
                        {['Facebook', 'Twitter', 'Instagram'].map((social, index) => (
                            <a
                                key={index}
                                href="#"
                                className="text-green-700 hover:text-green-900"
                            >
                                {social}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;