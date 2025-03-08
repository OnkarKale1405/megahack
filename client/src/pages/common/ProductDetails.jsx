import React, { useState } from 'react';
import VendorRow from '../../components/VendorRow';
import { useSelector } from 'react-redux';
import { getProductById } from '../../services/repository/productRepo';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { productId } = useParams();
    // const product = {
    //     id: 1,
    //     name: "Premium Apple",
    //     description: "Experience crystal-clear sound with our premium wireless headphones. Featuring noise cancellation technology, 30-hour battery life, and comfortable over-ear design.",
    //     price: 129.99,
    //     rating: 4.53,
    //     quantity: 25,
    //     marketplaces: ["Amazon", "Best Buy", "Official Store"],
    //     images: [
    //         "https://plus.unsplash.com/premium_photo-1661322640130-f6a1e2c36653?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXBwbGV8ZW58MHx8MHx8fDA%3D",
    //         "https://plus.unsplash.com/premium_photo-1726797776507-6b5cbee36007?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXBwbGUlMjBpbiUyMGluZGlhbiUyMG1hcmtldHxlbnwwfHwwfHx8MA%3D%3D",
    //         "https://images.unsplash.com/photo-1722670448143-13e318775f67?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBwbGUlMjBpbiUyMGluZGlhbiUyMG1hcmtldHxlbnwwfHwwfHx8MA%3D%3D",
    //         "https://images.unsplash.com/photo-1538725058330-43c1c165fa54?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGFwcGxlJTIwaW4lMjBpbmRpYW4lMjBtYXJrZXR8ZW58MHx8MHx8fDA%3D",
    //         "https://images.unsplash.com/photo-1663332129186-bf829f3a9b91?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGFwcGxlJTIwaW4lMjBpbmRpYW4lMjBtYXJrZXR8ZW58MHx8MHx8fDA%3D",
    //     ],
    //     details: [
    //         "Bluetooth 5.0 connectivity",
    //         "Active noise cancellation",
    //         "30-hour battery life",
    //         "Quick charge (10 min charge = 5 hours playback)",
    //         "Premium memory foam ear cushions",
    //     ],
    //     reviews: [
    //         { user: "John D.", rating: 5, comment: "Best headphones I've ever owned! The sound quality is amazing." },
    //         { user: "Sarah M.", rating: 4, comment: "Very comfortable for long listening sessions. Battery life is impressive." },
    //         { user: "Mike T.", rating: 5, comment: "The noise cancellation feature works better than expected." },
    //         { user: "Lisa R.", rating: 4, comment: "Great headphones overall, but I wish they came in more colors." },
    //     ],
    //     relatedProducts: [
    //         { id: 2, name: "Wireless Earbuds", price: 79.99, rating: 4.2, image: "/api/placeholder/200/200" },
    //         { id: 3, name: "Headphone Stand", price: 24.99, rating: 4.7, image: "/api/placeholder/200/200" },
    //         { id: 4, name: "Bluetooth Speaker", price: 89.99, rating: 4.4, image: "/api/placeholder/200/200" },
    //         { id: 5, name: "Wireless Earbuds", price: 79.99, rating: 4.2, image: "/api/placeholder/200/200" },
    //         { id: 6, name: "Headphone Stand", price: 24.99, rating: 4.7, image: "/api/placeholder/200/200" },
    //         { id: 7, name: "Bluetooth Speaker", price: 89.99, rating: 4.4, image: "/api/placeholder/200/200" },
    //     ]
    // };

    // State for selected image and quantity
    const fetchedProduct = useSelector(state => getProductById(state, productId));
    const [product, setProduct] = useState([]);
    const [mainImage, setMainImage] = useState(product.images[0]);
    const [quantity, setQuantity] = useState(1);

    // Function to render star ratings
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;
        const stars = [];

        // Full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }

        // Half star
        if (hasHalfStar) {
            stars.push(
                <svg key="half" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <defs>
                        <linearGradient id="halfGradient">
                            <stop offset="50%" stopColor="currentColor" />
                            <stop offset="50%" stopColor="#D1D5DB" />
                        </linearGradient>
                    </defs>
                    <path fill="url(#halfGradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }

        // Empty stars
        for (let i = 0; i < 5 - fullStars - (hasHalfStar ? 1 : 0); i++) {
            stars.push(
                <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }

        return stars;
    };

    const cauliflowerInfo = {
        alsoKnownAs: ["Phool gobhi", "Phulkobi", "Flower"],
        basicInfo: "Cauliflower is a popular vegetable that gets its name from the Latin words caulis, for cabbage, and floris, for flower. While it is a commonly used vegetable in Indian cuisine, an approximate of only 45% of the flower is actually eaten.",
        healthInfo: "Cauliflower promotes heart health and lowers cholesterol levels. It has high-quality proteins and is peculiar in the stability of vitamin C after cooking. Cauliflower is rich in minerals such as potassium, sodium, iron, phosphorus, calcium and magnesium and is a good source of antioxidants as well. Cauliflower also improves bone health, skin texture, and hair health.",
        bestUses: "Cauliflower heads can be roasted, grilled, boiled, fried, steamed, pickled, or even eaten raw. When cooking, the outer leaves, although edible, and the thick stalks are typically removed, leaving only the florets. Cauliflower is a low-calorie, gluten-free alternative to rice and flour and so it is used extensively in popular diets like Keto and Paleo.",
        seasonUpdate: "Cauliflower turns yellow due to direct sunlight, sometimes you may also find worms in it. Do not get tense, clean and boil it in salt water before cooking. Enjoy vitamin K and folate rich cauliflower meal."
    };

    const farmers = [
        { name: "Roshan Shinde", farms: "Vegetables", market: "Nashik", location: "Nashik" },
        { name: "Amit Patil", farms: "Fruits", market: "Pune", location: "Baramati" },
        { name: "Rahul More", farms: "Grains", market: "Mumbai", location: "Thane" },
        { name: "Vikas Pawar", farms: "Flowers", market: "Nagpur", location: "Wardha" },
        { name: "Anil Jadhav", farms: "Sugarcane", market: "Kolhapur", location: "Kolhapur" }
    ];



    return (
        <div className="container mx-auto px-4 py-12 scrollbar-hide">
            {/* Product Section */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* Product Images */}
                <div className="md:w-1/2 flex flex-col justify-center items-center">
                    {/* Main Image */}
                    <div className="mb-4 w-[80%] rounded-lg overflow-hidden aspect-[4/3]">
                        <img
                            src={mainImage}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Thumbnail Images */}
                    <div className="flex space-x-2">
                        {product.images.map((img, index) => (
                            <div
                                key={index}
                                className={`p-1 rounded cursor-pointer ${mainImage === img ? 'border-blue-500' : 'border-gray-200'}`}
                                onClick={() => setMainImage(img)}
                            >
                                <img
                                    src={img}
                                    alt={`Product thumbnail ${index + 1}`}
                                    className="w-20 h-20 object-cover rounded"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                        <div className="flex mr-2">
                            {renderStars(product.rating)}
                        </div>
                        <span className="text-gray-600">({product.rating})</span>
                    </div>

                    {/* Price */}
                    <p className="text-2xl font-bold text-gray-900 mb-4">${product.price.toFixed(2)}</p>

                    {/* Description */}
                    <p className="text-gray-600 mb-6">{product.description}</p>

                    {/* Available in marketplaces */}
                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Available in:</h3>
                        <div className="flex flex-wrap gap-2">
                            {product.marketplaces.map((market, index) => (
                                <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">{market}</span>
                            ))}
                        </div>
                    </div>

                    {/* Quantity */}
                    {/* <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity:</h3>
                        <div className="flex items-center">
                            <button
                                className="w-10 h-10 border border-gray-300 rounded-l flex items-center justify-center"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                -
                            </button>
                            <input
                                type="number"
                                min="1"
                                max={product.quantity}
                                value={quantity}
                                onChange={(e) => setQuantity(Math.min(product.quantity, Math.max(1, parseInt(e.target.value) || 1)))}
                                className="w-16 h-10 border-t border-b border-gray-300 text-center"
                            />
                            <button
                                className="w-10 h-10 border border-gray-300 rounded-r flex items-center justify-center"
                                onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                            >
                                +
                            </button>
                            <span className="ml-4 text-sm text-gray-500">{product.quantity} available</span>
                        </div>
                    </div> */}

                    {/* Add to Cart Button */}
                    {/* <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg mb-6 transition duration-200">
                        Add to Cart
                    </button> */}
                </div>
            </div>

            {/* Know More About Product Section */}
            <div className='px-16'>
                <div className="mt-12 bg-[#F8FFF4] p-6 rounded-lg shadow-sm">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cauliflower Information</h2>

                    <div className="mb-4">
                        <h3 className="font-bold text-gray-700">Also Known As:</h3>
                        <p className="text-gray-600">{cauliflowerInfo.alsoKnownAs.join(", ")}</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-bold text-gray-700">Basic Information:</h3>
                        <p className="text-gray-600">{cauliflowerInfo.basicInfo}</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-bold text-gray-700">Health & Nutritional Information:</h3>
                        <p className="text-gray-600">{cauliflowerInfo.healthInfo}</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-bold text-gray-700">Best Uses:</h3>
                        <p className="text-gray-600">{cauliflowerInfo.bestUses}</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-700">Season Update:</h3>
                        <p className="text-gray-600">{cauliflowerInfo.seasonUpdate}</p>
                    </div>
                </div>
            </div>

            <VendorRow farmers={farmers} />

            {/* You Might Also Like Section */}
            <div className='px-16'>
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">You Might Also Like</h2>
                    <div className="relative">
                        <div className="flex overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {product.relatedProducts.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex-shrink-0 w-64 mr-4 border rounded-lg overflow-hidden hover:shadow-lg transition duration-200 cursor-grab snap-start"
                                >
                                    <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                                    <div className="p-4">
                                        <h3 className="font-medium text-gray-800 mb-1">{item.name}</h3>
                                        <div className="flex items-center mb-2">
                                            <div className="flex">
                                                {renderStars(item.rating)}
                                            </div>
                                        </div>
                                        <p className="font-bold text-gray-900">${item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className='px-16'>
                <div className="mt-16 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>

                    <div className="space-y-6">
                        {product.reviews.map((review, index) => (
                            <div key={index} className="border-b pb-6 last:border-0">
                                <div className="flex items-center mb-2">
                                    <span className="font-medium text-gray-800 mr-3">{review.user}</span>
                                    <div className="flex">
                                        {renderStars(review.rating)}
                                    </div>
                                </div>
                                <p className="text-gray-600">{review.comment}</p>
                            </div>
                        ))}
                    </div>

                    <button className="mt-6 text-blue-600 hover:text-blue-800 font-medium">
                        Write a Review
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;