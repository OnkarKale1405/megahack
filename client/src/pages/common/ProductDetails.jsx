import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getProductById } from '../../services/repository/productRepo';
import { useParams } from 'react-router-dom';
import { selectProductById } from '../../app/ProductsSlice';
import { getProductInfo } from '../../constants';
import useFlashAPI from '../../hooks/useFlashAPI';
import { apiConnector } from '../../services/Connector';
import { BaseURL } from '../../services/Api';

const ProductDetails = () => {
    const { productId } = useParams();

    const fetchedProduct = useSelector(state => {
        return selectProductById(state, productId)
    });
    const [product, setProduct] = useState(fetchedProduct[0]);
    const [mainImage, setMainImage] = useState(product.images && product.images.length > 0 ? product.images[0] : "/api/placeholder/400/300");
    // Add state for review popup
    const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [reviewData, setReviewData] = useState({
        rating: 5,
        comment: '',
    });

    useEffect(() => {
        const fetchReviews = async () => {
            const res = await apiConnector("GET", BaseURL + `reviews/${product._id}`);
            console.log(res.data.reviews);
            if (res) {
                setReviews(res.data.reviews)
            }
        }
        fetchReviews();
    }, [])

    // Function to handle opening/closing the review popup
    const toggleReviewPopup = () => {
        setIsReviewPopupOpen(!isReviewPopupOpen);
    };

    // Function to handle review submission
    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        console.log("Review submitted:", reviewData);
        const res = await apiConnector("POST", BaseURL + `reviews/${product._id}`,
            reviewData
        );

        if (res) {
            toggleReviewPopup();
            setReviewData({
                rating: 5,
                comment: '',
            });
        }
    };

    // Function to handle review data changes
    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setReviewData(prev => ({
            ...prev,
            [name]: name === 'rating' ? parseInt(value) : value
        }));
    };

    let { data, error } = useFlashAPI(product.name.trim());

    // Function to render star ratings
    const renderStars = (rating) => {
        if (rating === undefined || rating === null) {
            rating = 0;
        }

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

    // Function to render the interactive rating selector
    const renderRatingSelector = () => {
        return (
            <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setReviewData(prev => ({ ...prev, rating: star }))}
                        className="focus:outline-none"
                    >
                        <svg
                            className={`w-8 h-8 ${star <= reviewData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </button>
                ))}
            </div>
        );
    };

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
                            alt={product.name || "Product Image"}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Thumbnail Images */}
                    {product.images && product.images.length > 0 && (
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
                    )}
                </div>

                {/* Product Details */}
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name || "Product Name"}</h1>

                    {/* Rating */}


                    {/* Price */}
                    <p className="text-2xl font-bold text-gray-900 mb-4">₹{(product.price || 0).toFixed(2)}/kg</p>

                    {/* Description */}
                    {product.description && (
                        <p className="text-gray-600 mb-6">{product.description}</p>
                    )}

                    {/* Available in marketplaces */}
                    {/* {product.marketplaces && product.marketplaces.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Available in:</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.marketplaces.map((market, index) => (
                                    <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">{market}</span>
                                ))}
                            </div>
                        </div>
                    )} */}

                    {/* Quantity */}
                    {product.quantity && (
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Available Stock:</h3>
                            <span className="text-gray-600">{product.quantity} kg available</span>
                        </div>
                    )}

                    {/* Add to Cart Button */}
                </div>
            </div>

            {/* Know More About Product Section */}
            {data && (
                <div className='px-4 md:px-16'>
                    <div className="mt-12 bg-[#F8FFF4] p-6 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {`${product.name} Information`}
                        </h2>

                        {data?.alsoKnownAs?.length > 0 && (
                            <div className="mb-4">
                                <h3 className="font-bold text-gray-700">Also Known As:</h3>
                                <p className="text-gray-600">{data.alsoKnownAs.join(", ")}</p>
                            </div>
                        )}

                        {data?.basicInfo && (
                            <div className="mb-4">
                                <h3 className="font-bold text-gray-700">Basic Information:</h3>
                                <p className="text-gray-600">{data.basicInfo}</p>
                            </div>
                        )}

                        {data?.healthInfo && (
                            <div className="mb-4">
                                <h3 className="font-bold text-gray-700">Health & Nutritional Information:</h3>
                                <p className="text-gray-600">{data.healthInfo}</p>
                            </div>
                        )}

                        {data?.bestUses && (
                            <div className="mb-4">
                                <h3 className="font-bold text-gray-700">Best Uses:</h3>
                                <p className="text-gray-600">{data.bestUses}</p>
                            </div>
                        )}

                        {data?.seasonUpdate && (
                            <div>
                                <h3 className="font-bold text-gray-700">Season Update:</h3>
                                <p className="text-gray-600">{data.seasonUpdate}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}


            {/* Farmer Details Section (replaces VendorRow) */}
            {product.vendor && (
                <div className="px-4 md:px-16 mt-12 flex flex-col justify-start space-y-6">
                    <div className="text-2xl font-bold text-gray-800">Know the Farmer</div>
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        <div className="h-64 w-64 rounded-full overflow-hidden shadow-md">
                            <img
                                src={product.farmerImage || "/api/placeholder/400/400"}
                                alt={product.vendor.fullName || "Farmer"}
                                className="w-full h-full object-cover object-center"
                            />
                        </div>

                        <div className="max-w-2xl space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800">
                                {product.vendor.fullName || "Sarah Johnson"}
                            </h3>

                            <div className="flex items-center text-gray-600">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <span>{product.vendor.location || "Greenfield Farm, Sonoma County, CA"}</span>
                            </div>

                            <div className="text-gray-700">
                                <span className="font-medium">Experience:</span> {product.vendor.experience || "15+ years of sustainable farming"}
                            </div>

                            <div>
                                <h4 className="font-medium text-gray-800 mb-1">About:</h4>
                                <p className="text-gray-600">
                                    {product.vendor.about || "I'm a passionate farmer dedicated to growing nutritious, organic produce while preserving the health of our soil and ecosystem. My family has been farming for three generations, and we take pride in bringing the freshest seasonal harvests directly to your table."}
                                </p>
                            </div>

                            <div>
                                <h4 className="font-medium text-gray-800 mb-1">Farming Practices:</h4>
                                <p className="text-gray-600">
                                    {product.vendor.farming_practices || "Our farm follows organic and regenerative agriculture principles. We use natural pest management, crop rotation, and composting to maintain soil fertility. All our produce is non-GMO, and we prioritize water conservation through efficient irrigation systems."}
                                </p>
                            </div>

                            <button className="mt-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition duration-200">
                                Contact Farmer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reviews Section */}
            {reviews && reviews.length > 0 && (
                <div className='px-4 md:px-16'>
                    <div className="mt-16 mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>

                        <div className="space-y-6">
                            {reviews.map((review, index) => (
                                <div key={index} className="border-b pb-6 last:border-0">
                                    <div className="flex items-center mb-2">
                                        <span className="font-medium text-gray-800 mr-3">{review.user.fullName || "Anonymous"}</span>
                                        <div className="flex">
                                            {renderStars(review.rating)}
                                        </div>
                                    </div>
                                    <p className="text-gray-600">{review.comment || "No comment provided."}</p>
                                </div>
                            ))}
                        </div>

                        <button
                            className="mt-6 text-blue-600 hover:text-blue-800 font-medium"
                            onClick={toggleReviewPopup}
                        >
                            Write a Review
                        </button>
                    </div>
                </div>
            )}

            {/* Show an empty state if no reviews */}
            {(!reviews || reviews.length === 0) && (
                <div className='px-4 md:px-16'>
                    <div className="mt-16 mb-8 text-center py-8 bg-gray-50 rounded-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
                        <p className="text-gray-600 mb-6">No reviews yet. Be the first to review this product!</p>
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition duration-200"
                            onClick={toggleReviewPopup}
                        >
                            Write a Review
                        </button>
                    </div>
                </div>
            )}

            {/* Review Popup */}
            {isReviewPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 w-full max-w-md mx-4">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Write a Review</h3>

                        <form onSubmit={handleReviewSubmit}>


                            {/* Rating Selection */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Your Rating
                                </label>
                                {renderRatingSelector()}
                            </div>

                            {/* Review Comment */}
                            <div className="mb-6">
                                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                                    Your Review
                                </label>
                                <textarea
                                    id="comment"
                                    name="comment"
                                    value={reviewData.comment}
                                    onChange={handleReviewChange}
                                    rows="4"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                ></textarea>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={toggleReviewPopup}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded transition duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded transition duration-200"
                                >
                                    Submit Review
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;