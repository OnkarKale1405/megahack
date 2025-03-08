import React, { useState, useEffect } from 'react';
import ProfileMap from "../../components/ProfileMap.jsx"
import { selectAccount } from "../../app/AuthSlice.js"

import LeafletMap from '../../components/LeafletMap.jsx';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { selectMarketById } from '../../app/MarketSlice.js';
import { useNavigate, useParams } from 'react-router-dom';
import { getProducts } from '../../app/ProductsSlice.js';
import { getSpecificMarketProducts } from '../../services/repository/productRepo.js';

export default function Products() {
    // State for filters
    const { marketId } = useParams();
    const [allProducts, setAllProducts] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedFarms, setSelectedFarms] = useState([]);
    const [priceRange, setPriceRange] = useState(200);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState(allProducts);

    // Get unique categories and farms for filter options
    const categories = [...new Set(allProducts.map(product => product.category))];
    const vendors = [...new Set(allProducts.map(product => product.vendor?.fullName))];

    // Filter products based on selected filters
    useEffect(() => {
        let results = allProducts;

        // Filter by search term
        if (searchTerm) {
            results = results.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category
        if (selectedCategories.length > 0) {
            results = results.filter(product =>
                selectedCategories.includes(product.category)
            );
        }

        // Filter by farm/vendor
        if (selectedFarms.length > 0) {
            results = results.filter(product =>
                selectedFarms.includes(product.vendor?.fullName)
            );
        }

        // Filter by price
        results = results.filter(product =>
            parseFloat(product.price) <= priceRange
        );

        // Filter by stock
        if (inStockOnly) {
            results = results.filter(product => product.quantity > 0);
        }

        setFilteredProducts(results);
    }, [searchTerm, selectedCategories, selectedFarms, priceRange, inStockOnly, allProducts]);

    const acc = useSelector(selectAccount);
    const reversedCoordinates = [...acc.location.coordinates].reverse();
    const [mapCenter, setMapCenter] = useState(reversedCoordinates);
    const [routePath, setRoutePath] = useState(null);
    const [steps, setSteps] = useState([]);
    const [mode, setMode] = useState("drive");

    const dispatch = useDispatch();
    // console.log("id: ", marketId);
    const market = useSelector(state => selectMarketById(state, marketId));
    // console.log(market);
    const products = useSelector(getProducts);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            dispatch(getSpecificMarketProducts(marketId));

            setAllProducts(products);
        }
        fetchProducts();
    }, [])

    useEffect(() => {

        const fetchRoute = async () => {
            try {
                const routeResponse = await axios.get(
                    `https://api.geoapify.com/v1/routing?waypoints=${acc.location.coordinates[1]},${acc.location.coordinates[0]}|${market.location.coordinates[1]},${market.location.coordinates[0]}&mode=${mode}&apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`
                );

                if (routeResponse.data.features.length > 0) {
                    const coordinates = routeResponse.data.features[0].geometry.coordinates[0];
                    const convertedCoordinates = coordinates.map(coord => [coord[1], coord[0]]);
                    setRoutePath(convertedCoordinates);

                    // Extract step instructions
                    const steps = routeResponse.data.features[0].properties.legs[0].steps.map((step, index) => {
                        const fromIndex = step.from_index;
                        const coord = coordinates[fromIndex];
                        return {
                            position: [coord[1], coord[0]],
                            instruction: step.instruction.text,
                            stepNumber: index + 1
                        };
                    });
                    setSteps(steps);
                }
            } catch (error) {
                console.log("error: ", error);
            }
        };
        fetchRoute();
    }, [mode])

    useEffect(() => {
        setAllProducts(products);
    }, [products])

    // Handle category filter changes
    const handleCategoryChange = (category) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    // Handle farm filter changes
    const handleFarmChange = (farm) => {
        if (selectedFarms.includes(farm)) {
            setSelectedFarms(selectedFarms.filter(f => f !== farm));
        } else {
            setSelectedFarms([...selectedFarms, farm]);
        }
    };

    return (
        <div className="w-full h-screen p-4 overflow-hidden sm:px-6">

            {/* Main content with 60:40 split */}
            <div className="flex h-full flex-col lg:flex-row">
                {/* Left Section (60%) - Filters and Products */}
                <div className="lg:w-3/5 h-screen pr-0 lg:pr-8 flex flex-col">
                    <div className='flex-none'>
                        {/* Filters Row */}
                        <div className="bg-white rounded-xl p-6 mb-8 shadow-md border border-gray-200">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {/* Search Filter */}
                                <div>
                                    <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
                                    <input
                                        type="text"
                                        id="search"
                                        className="block w-full rounded-lg border border-gray-300 shadow-sm p-2 focus:border-green-600 focus:ring-green-600 text-sm"
                                        placeholder="Search products..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                {/* Category Dropdown */}
                                <div>
                                    <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                                    <select
                                        id="category"
                                        className="block w-full rounded-lg border border-gray-300 shadow-sm p-2 focus:border-green-600 focus:ring-green-600 text-sm"
                                        onChange={(e) => setSelectedCategories(e.target.value ? [e.target.value] : [])}
                                        value={selectedCategories.length === 1 ? selectedCategories[0] : ""}
                                    >
                                        <option value="">All Categories</option>
                                        {categories.map((category) => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Price Range */}
                                <div>
                                    <label htmlFor="price-range" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Max Price: ₹{priceRange}
                                    </label>
                                    <input
                                        type="range"
                                        id="price-range"
                                        min="1"
                                        max="200"
                                        step="5"
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(parseFloat(e.target.value))}
                                        className="w-full h-2 bg-green-100 rounded-lg appearance-none cursor-pointer focus:ring-green-600"
                                    />
                                </div>
                            </div>

                            {/* Additional Filters Row */}
                            <div className="mt-6 flex flex-wrap items-center gap-4">
                                <div className="flex items-center">
                                    <input
                                        id="in-stock"
                                        name="in-stock"
                                        type="checkbox"
                                        checked={inStockOnly}
                                        onChange={(e) => setInStockOnly(e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                                    />
                                    <label htmlFor="in-stock" className="ml-2 text-sm text-gray-700">In stock only</label>
                                </div>

                                <div className="flex items-center">
                                    <label htmlFor="farm-filter" className="text-sm font-semibold text-gray-700 mr-3">Vendor:</label>
                                    <select
                                        id="farm-filter"
                                        className="rounded-lg border border-gray-300 shadow-sm p-2 focus:border-green-600 focus:ring-green-600 text-sm"
                                        onChange={(e) => setSelectedFarms(e.target.value ? [e.target.value] : [])}
                                        value={selectedFarms.length === 1 ? selectedFarms[0] : ""}
                                    >
                                        <option value="">All Vendors</option>
                                        {vendors.map((vendor) => (
                                            <option key={vendor} value={vendor}>{vendor}</option>
                                        ))}
                                    </select>
                                </div>

                                {selectedCategories.length > 0 || selectedFarms.length > 0 || inStockOnly || searchTerm ? (
                                    <button
                                        onClick={() => {
                                            setSearchTerm('');
                                            setSelectedCategories([]);
                                            setSelectedFarms([]);
                                            setInStockOnly(false);
                                            setPriceRange(200);
                                        }}
                                        className="ml-auto text-sm text-green-600 hover:text-green-800 font-semibold"
                                    >
                                        Clear all filters
                                    </button>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    {/* Products Grid - Made scrollable */}
                    <div className="flex-grow overflow-y-auto scrollbar-hide bg-white rounded-lg">
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-lg">
                                <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                                <p className="mt-1 text-sm text-gray-500">Try adjusting your filters</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                                {filteredProducts.map((product) => (
                                    <div key={product._id} className="group relative bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200"
                                        onClick={() => navigate(`/product-details/${product._id}`)}>
                                        <div className="relative h-48">
                                            <img
                                                src={product.images && product.images.length > 0 ? product.images[0] : 'placeholder-image.jpg'}
                                                alt={product.name}
                                                className="h-full w-full object-cover object-center group-hover:opacity-75"
                                            />
                                            {product.quantity <= 0 && (
                                                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                                    Out of Stock
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-sm font-medium text-gray-900">
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {product.name}
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-500">{product.vendor?.fullName}</p>
                                                    <div className="mt-1 flex items-center">
                                                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                            {product.category}
                                                        </span>
                                                        <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                                            Qty: {product.quantity}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="text-sm font-medium text-gray-900">₹{product.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Section (40%) - Empty for Map */}
                <div className="lg:w-2/5 h-full flex flex-col items-center justify-center gap-4">
                    {/* Dropdown for Mode Selection */}
                    <div className="mb-2 w-full">
                        <label htmlFor="mode" className="block text-sm font-medium text-gray-700">
                            Select Mode:
                        </label>
                        <select
                            id="mode"
                            value={mode}
                            onChange={(e) => setMode(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        >
                            <option value="drive">Drive</option>
                            <option value="motorcycle">Motorcycle</option>
                            <option value="bus">Bus</option>
                        </select>
                    </div>

                    {/* Map Display */}
                    <div className="w-full h-full flex items-center justify-center">
                        <LeafletMap center={mapCenter} locations={[market]} routePath={routePath} steps={steps} />
                    </div>
                </div>

            </div>
        </div>
    );
}