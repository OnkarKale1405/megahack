import React, { useState, useEffect } from 'react';
import { MapPin, ChevronDown, ChevronUp, Check, X, ExternalLink, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { approveProduct, getPendingProducts, rejectProduct } from '../../services/repository/productRepo';

const Approvals = () => {
    const [products, setProducts] = useState([]);
    const [expandedProducts, setExpandedProducts] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        // Mock data for demonstration
        const mockProducts = [
            {
                _id: '1',
                name: 'Organic Tomatoes',
                description: 'Fresh organic tomatoes grown without pesticides. Perfect for salads and cooking.',
                category: 'Vegetables',
                price: 3.99,
                quantity: 50,
                images: [
                    'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=1000',
                    'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&q=80&w=1000'
                ],
                farmerImage: 'https://images.unsplash.com/photo-1520052203542-d3095f1b6cf0?auto=format&fit=crop&q=80&w=1000',
                location: {
                    coordinates: [37.7749, -122.4194]
                },
                vendor: {
                    _id: '101',
                    name: 'John Smith',
                    email: 'john@farmfresh.com',
                    phone: '555-123-4567'
                },
                createdAt: new Date('2025-03-05').toISOString()
            },
            {
                _id: '2',
                name: 'Fresh Strawberries',
                description: 'Sweet and juicy strawberries picked at peak ripeness. Great for desserts or snacking.',
                category: 'Fruits',
                price: 4.99,
                quantity: 30,
                images: [
                    'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=1000',
                    'https://images.unsplash.com/photo-1543158181-e6f9f6712055?auto=format&fit=crop&q=80&w=1000'
                ],
                farmerImage: 'https://images.unsplash.com/photo-1553787762-b5f5721f3b8c?auto=format&fit=crop&q=80&w=1000',
                location: {
                    coordinates: [34.0522, -118.2437]
                },
                vendor: {
                    _id: '102',
                    name: 'Maria Garcia',
                    email: 'maria@berryfields.com',
                    phone: '555-987-6543'
                },
                createdAt: new Date('2025-03-06').toISOString()
            },
            {
                _id: '3',
                name: 'Artisan Bread',
                description: 'Hand-crafted sourdough bread made with organic flour and traditional methods.',
                category: 'Bakery',
                price: 6.50,
                quantity: 15,
                images: [
                    'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=1000',
                    'https://images.unsplash.com/photo-1586444248879-bc604bc77724?auto=format&fit=crop&q=80&w=1000'
                ],
                farmerImage: 'https://images.unsplash.com/photo-1559628129-67cf63b72248?auto=format&fit=crop&q=80&w=1000',
                location: {
                    coordinates: [40.7128, -74.0060]
                },
                vendor: {
                    _id: '103',
                    name: 'Pierre Dubois',
                    email: 'pierre@artisanbakery.com',
                    phone: '555-456-7890'
                },
                createdAt: new Date('2025-03-07').toISOString()
            }
        ];
        const fetchPendingProducts = async () => {
            const res = await getPendingProducts();
            setProducts(res);
        }
        fetchPendingProducts();
        setLoading(false);
    }, []);

    const toggleExpand = (productId) => {
        setExpandedProducts(prev => ({
            ...prev,
            [productId]: !prev[productId]
        }));
    };

    const handleApprove = async (productId) => {
        const res = await approveProduct(productId);
        if(res){
            setProducts(products.filter(p => p._id !== productId));
        }

    };

    const handleReject = async (productId) => {
        const res = await rejectProduct(productId);
        if(res){
            setProducts(products.filter(p => p._id !== productId));
        }
    };

    const openImagePreview = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const openInNewTab = (imageUrl) => {
        window.open(imageUrl, '_blank');
    };

    return (
        <div className="h-screen overflow-scroll scrollbar-hide">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-600 to-orange-500 p-6 shadow-md">
                <h1 className="text-3xl font-bold text-white">Product Approval Dashboard</h1>
                <p className="text-amber-100 mt-2">Review and approve new product listings for your marketplace</p>
            </div>

            {/* Content */}
            <div className="container py-6 px-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Dashboard header */}
                    <div className="flex justify-between items-center p-6 border-b border-amber-200">
                        <h2 className="text-2xl font-semibold text-amber-800 invisible">Pending Approvals</h2>
                        <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {products.length} pending
                        </span>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                                <Check className="w-8 h-8 text-amber-600" />
                            </div>
                            <p className="text-xl font-medium text-amber-800">All caught up!</p>
                            <p className="mt-2">No products are waiting for approval.</p>
                        </div>
                    ) : (
                        <div>
                            {products.map(product => (
                                <div
                                    key={product._id}
                                    className="border-b border-amber-200 last:border-b-0"
                                >
                                    {/* Product header - always visible */}
                                    <div
                                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-amber-50 transition-colors"
                                        onClick={() => toggleExpand(product._id)}
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                                                <img
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-amber-900 text-lg">{product.name}</h3>
                                                <div className="flex items-center text-sm text-amber-700 mt-1">
                                                    <span className="font-medium">${product.price.toFixed(2)}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>{product.category}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>{product.quantity} units</span>
                                                </div>
                                                <div className="flex items-center text-xs text-amber-600 mt-1">
                                                    <MapPin className="w-3 h-3 mr-1" />
                                                    <span>Vendor: {product.vendor.fullName}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            {/* <div className="flex mr-4">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleReject(product._id);
                                                    }}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-full mr-1"
                                                    title="Reject product"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleApprove(product._id);
                                                    }}
                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                                                    title="Approve product"
                                                >
                                                    <Check className="w-5 h-5" />
                                                </button>
                                            </div> */}
                                            <div className="flex flex-col items-end">
                                                <span className="text-sm text-amber-700">
                                                    {new Date(product.createdAt).toLocaleDateString()}
                                                </span>
                                                <div className="mt-1">
                                                    {expandedProducts[product._id] ?
                                                        <ChevronUp className="w-5 h-5 text-amber-600" /> :
                                                        <ChevronDown className="w-5 h-5 text-amber-600" />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expanded content */}
                                    {expandedProducts[product._id] && (
                                        <div className="p-6 bg-amber-50 border-t border-amber-200">
                                            {/* Two column layout: Products on left, Vendor on right */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                {/* Left column - Product information and images (2/3 width) */}
                                                <div className="md:col-span-2">
                                                    {/* Product images gallery at the top */}
                                                    <div className="mb-6">
                                                        <h4 className="font-medium text-amber-800 mb-3 pb-2 border-b border-amber-200">Product Images</h4>
                                                        <div className="flex space-x-4 overflow-x-auto pb-2">
                                                            {product.images.map((image, index) => (
                                                                <div key={index} className="relative group">
                                                                    <div className="w-40 h-40 rounded-md overflow-hidden border border-amber-200">
                                                                        <img
                                                                            src={image}
                                                                            alt={`${product.name} ${index + 1}`}
                                                                            className="w-full h-full object-cover"
                                                                        />
                                                                    </div>
                                                                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                openImagePreview(image);
                                                                            }}
                                                                            className="bg-amber-600 text-white p-1 rounded-l"
                                                                            title="Preview image"
                                                                        >
                                                                            <ImageIcon className="w-4 h-4" />
                                                                        </button>
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                openInNewTab(image);
                                                                            }}
                                                                            className="bg-amber-800 text-white p-1 rounded-r"
                                                                            title="Open in new tab"
                                                                        >
                                                                            <ExternalLink className="w-4 h-4" />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <div>
                                                                <div className="mb-4">
                                                                    <h5 className="text-amber-700 font-medium mt-2">
                                                                        Name: <span className="text-gray-700">{product.name}</span> </h5>
                                                                </div>
                                                                <div className="mb-4">
                                                                    <h5 className="text-amber-700 font-medium mb-1">Description:</h5>
                                                                    <p className="text-gray-700">{product.description}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Product details */}
                                                    <div className="bg-white rounded-lg p-4 shadow-sm">

                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <h5 className="text-amber-700  font-medium mb-2">Specifications</h5>
                                                                <table className="w-full border border-[#FEF3C6] ">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="py-1 px-2 text-gray-600 font-bold">Category</td>
                                                                            <td className="py-1 px-2 border border-[#FEF3C6] font-medium text-gray-800">{product.category}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="py-1 px-2 border border-[#FEF3C6] text-gray-600">Price</td>
                                                                            <td className="py-1 px-2 border border-[#FEF3C6] font-medium text-gray-800">${product.price.toFixed(2)}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="py-1 px-2 border border-[#FEF3C6] text-gray-600">Quantity</td>
                                                                            <td className="py-1 px-2 border border-[#FEF3C6] font-medium text-gray-800">{product.quantity} units</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="py-1 px-2 border border-[#FEF3C6] text-gray-600">Added on</td>
                                                                            <td className="py-1 px-2 border border-[#FEF3C6] font-medium text-gray-800">
                                                                                {new Date(product.createdAt).toLocaleDateString()}
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="py-1 px-2 border border-[#FEF3C6] text-gray-600">Product ID</td>
                                                                            <td className="py-1 px-2 border border-[#FEF3C6] font-medium text-gray-800">
                                                                                {product._id}
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>

                                                            <div>
                                                                <h5 className="text-amber-700 font-medium mb-2">Location</h5>
                                                                <div className="bg-amber-100 p-2 rounded-md">
                                                                    <div className="text-sm text-amber-800 mb-1">
                                                                        Coordinates:
                                                                    </div>
                                                                    <div className="font-mono text-xs">
                                                                        Lat: {product.location.coordinates[0].toFixed(4)}<br />
                                                                        Lng: {product.location.coordinates[1].toFixed(4)}
                                                                    </div>
                                                                    <div className="mt-2 text-xs text-amber-600">
                                                                        <MapPin className="w-3 h-3 inline mr-1" />
                                                                        <span>View on map (coming soon)</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right column - Vendor information (1/3 width) */}
                                                <div className='flex flex-col justify-between'>
                                                    {/* Vendor information */}
                                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                                        <h4 className="font-medium text-amber-800 mb-3 text-lg">Vendor Information</h4>

                                                        <div className="flex items-center mb-4">
                                                            <div className="h-16 w-16 rounded-full overflow-hidden border border-amber-200 mr-3">
                                                                <img
                                                                    src={product.farmerImage}
                                                                    alt={product.vendor.name}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <h5 className="font-medium text-amber-900">{product.vendor.name}</h5>
                                                                <p className="text-sm text-amber-700">Vendor ID: {product.vendor._id}</p>
                                                            </div>
                                                        </div>

                                                        <table className="w-full">
                                                            <tbody>
                                                                <tr>
                                                                    <td className="py-1 text-gray-600">Email:</td>
                                                                    <td className="py-1 font-medium text-gray-800">{product.vendor.email}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="py-1 text-gray-600">Phone:</td>
                                                                    <td className="py-1 font-medium text-gray-800">{product.vendor.phone}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        {/* <div className="mt-4">
                                                            <button
                                                                className="text-sm text-amber-600 hover:text-amber-800 flex items-center"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    openImagePreview(product.farmerImage);
                                                                }}
                                                            >
                                                                <ImageIcon className="w-4 h-4 mr-1" />
                                                                View vendor photo
                                                            </button>
                                                        </div> */}
                                                    </div>

                                                    {/* Admin decision section */}
                                                    <div className="p-4 mt-4">

                                                        <div className="flex space-x-3">
                                                            <button
                                                                onClick={() => handleReject(product._id)}
                                                                className="flex-1 px-4 py-2 bg-white border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors flex items-center justify-center"
                                                            >
                                                                <X className="w-4 h-4 mr-2" />
                                                                Reject
                                                            </button>
                                                            <button
                                                                onClick={() => handleApprove(product._id)}
                                                                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
                                                            >
                                                                <Check className="w-4 h-4 mr-2" />
                                                                Approve
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Image preview modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="max-w-4xl max-h-screen p-4">
                        <div className="relative">
                            <img
                                src={selectedImage}
                                alt="Preview"
                                className="max-w-full max-h-[80vh] object-contain"
                            />
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    openInNewTab(selectedImage);
                                }}
                                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
                            >
                                <ExternalLink className="w-5 h-5 text-gray-800" />
                            </button>
                        </div>
                        <button
                            className="mt-4 bg-white text-gray-800 px-4 py-2 rounded-md mx-auto block"
                            onClick={() => setSelectedImage(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Approvals;