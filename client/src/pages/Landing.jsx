import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Chatbot from '../components/Chatbot';
import Navbar from '../components/Navbar';
import hero1 from "../assets/hero1.avif"
import hero2 from "../assets/hero2.avif"
import story1 from "../assets/story1.avif";
import Footer from '../components/Footer';
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
            <div className="fixed bottom-4 z-50 right-4">
                <Chatbot />
            </div>
            {/* Hero Section */}
            <div className="flex gap-4 py-4 px-8 overflow-hidden"
                style={{
                    height: `calc(100vh - ${navbarHeight}px)`
                }}>
                <div className="bg-green-100 w-1/2 rounded-2xl flex flex-col justify-center p-8">
                    <h1 className="text-[3.5rem] w-[70%] leading-[3.5rem] font-bold text-gray-800 mb-6">
                        Discover Local Markets – Fresh, Nearby, and Convenient!
                    </h1>
                    <button className="bg-black w-[40%] text-white px-6 py-3 mt-8 rounded-full hover:bg-gray-800 transition">
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
                                src={'https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWdyaWN1bHR1cmV8ZW58MHx8MHx8fDA%3D'}
                                alt="Eco Energy"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>

                        {/* Second Column with Paragraph */}
                        <div className="w-1/2 h-full relative">
                            <img
                                src={`https://images.unsplash.com/photo-1492496913980-501348b61469?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWdyaWN1bHR1cmV8ZW58MHx8MHx8fDA%3D`}
                                alt="Eco Energy"
                                className="w-full h-full object-cover rounded-2xl"
                            />
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
                            image: "https://images.unsplash.com/photo-1681817009639-9103dc524813?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fG1hcmtldCUyMGRpc2NvdmVyeSUyMGluZGlhfGVufDB8fDB8fHww",
                            title: "Market Discovery",
                            description: "Find nearby farmers markets with ease"
                        },
                        {
                            image: "https://images.unsplash.com/photo-1659352154702-07b2ca056f56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdCUyMGluc2lnaHRzJTIwZm9vZCUyMGluZGlhfGVufDB8fDB8fHww",
                            title: "Product Insights",
                            description: "Explore fresh produce and vendor details"
                        },
                        {
                            image: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YWdyaWN1bHR1cmV8ZW58MHx8MHx8fDA%3D",
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
                            <div key={index} className="w-1/2 flex items-center">
                                <img
                                    src={src}
                                    alt={`Project ${index + 1}`}
                                    className={`w-full ${index === 1 ? "h-64" : "h-44"} object-cover rounded-2xl`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Knowledge Section */}
            {/* <div className="bg-white p-8 md:p-16">
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
            </div> */}

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Landing;