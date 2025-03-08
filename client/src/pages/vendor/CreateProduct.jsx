// import React, { useState, useRef, useEffect } from 'react';
// import { MapPin, Upload, X, ImageIcon, Loader2, Check, Info } from 'lucide-react';
// import { createProduct } from '../../services/repository/productRepo';

// const CreateProduct = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     category: '',
//     price: '',
//     quantity: '',
//     location: {
//       type: "Point",
//       coordinates: ['', ''] // [longitude, latitude]
//     },
//     approved: 0
//   });

//   const [images, setImages] = useState([]);
//   const [farmerImage, setFarmerImage] = useState(null);
//   const [previewImages, setPreviewImages] = useState([]);
//   const [previewFarmerImage, setPreviewFarmerImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
//   const [location, setLocation] = useState(null);
//   const [locationStatus, setLocationStatus] = useState('loading'); // 'loading', 'success', 'error'

//   const imagesRef = useRef(null);
//   const farmerImageRef = useRef(null);

//   const categories = [
//     'Vegetables', 'Fruits', 'Dairy', 'Meat', 'Bakery', 'Honey',
//     'Herbs', 'Flowers', 'Nuts', 'Preserves', 'Coffee', 'Other'
//   ];

//   useEffect(() => {
//     const getLocation = () => {
//       return new Promise((resolve) => {
//         setLocationStatus('loading');
//         if ("geolocation" in navigator) {
//           navigator.geolocation.getCurrentPosition(
//             (position) => {
//               resolve({
//                 latitude: position.coords.latitude,
//                 longitude: position.coords.longitude,
//               });
//               setLocationStatus('success');
//             },
//             (error) => {
//               resolve({ latitude: null, longitude: null, error: error.message });
//               setLocationStatus('error');
//             },
//             { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//           );
//         } else {
//           resolve({ latitude: null, longitude: null, error: "Geolocation not supported" });
//           setLocationStatus('error');
//         }
//       });
//     };

//     const fetchLocation = async () => {
//       const userLocation = await getLocation();
//       setLocation(userLocation);

//       if (userLocation.latitude && userLocation.longitude) {
//         // Update formData with the retrieved coordinates
//         setFormData(prevState => ({
//           ...prevState,
//           location: {
//             type: "Point",
//             coordinates: [userLocation.longitude, userLocation.latitude]
//           }
//         }));
//       }
//     };

//     fetchLocation();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name.includes('.')) {
//       const [parent, child] = name.split('.');
//       setFormData({
//         ...formData,
//         [parent]: {
//           ...formData[parent],
//           [child]: value
//         }
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value
//       });
//     }
//   };

//   const handleimagesChange = (e) => {
//     const files = Array.from(e.target.files);
//     setImages([...images, ...files]);

//     // Create preview URLs
//     const newPreviewUrls = files.map(file => URL.createObjectURL(file));
//     setPreviewImages([...previewImages, ...newPreviewUrls]);
//   };

//   const handleFarmerImageChange = (e) => {
//     const file = e.target.files[0];
//     console.log(file);
//     if (file) {
//       setFarmerImage(file);
//       setPreviewFarmerImage(URL.createObjectURL(file));
//     }
//   };

//   const removeimage = (index) => {
//     const newImages = [...images];
//     const newPreviews = [...previewImages];

//     // Revoke the object URL to avoid memory leaks
//     URL.revokeObjectURL(newPreviews[index]);

//     newImages.splice(index, 1);
//     newPreviews.splice(index, 1);

//     setImages(newImages);
//     setPreviewImages(newPreviews);
//   };

//   const removeFarmerImage = () => {
//     if (previewFarmerImage) {
//       URL.revokeObjectURL(previewFarmerImage);
//     }
//     setFarmerImage(null);
//     setPreviewFarmerImage(null);
//   };

//   const handleUpload = async () => {
//     if (images.length === 0 || !farmerImage) {
//       setError('Please upload product images and vendor photo before uploading');
//       return;
//     }

//     setUploading(true);
//     setError('');

//     try {
//       // Simulating image upload to a cloud service
//       await new Promise(resolve => setTimeout(resolve, 1500));

//       // Mock response with image URLs
//       const uploadedImageUrls = images.map((_, index) => `https://example.com/images/product-image-${index}.jpg`);
//       const uploadedFarmerImageUrl = 'https://example.com/images/farmer-image.jpg';

//       console.log('Uploaded images:', uploadedImageUrls);
//       console.log('Uploaded farmer image:', uploadedFarmerImageUrl);

//       // Here you could update the form with the uploaded image URLs if needed
//       setError('');

//       // Show success message temporarily
//       alert('Images uploaded successfully!');
//     } catch (error) {
//       setError('Failed to upload images. Please try again.');
//       console.error('Error uploading images:', error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate form
//     if (!formData.name || !formData.description || !formData.category ||
//       !formData.price || !formData.quantity || images.length === 0 ||
//       !farmerImage || !formData.location.coordinates[0] || !formData.location.coordinates[1]) {
//       setError('Please fill in all required fields and upload images');
//       return;
//     }

//     // Validate coordinates (they should already be numbers from the geolocation API)
//     const coordinates = formData.location.coordinates;
//     if (isNaN(coordinates[0]) || isNaN(coordinates[1])) {
//       setError('Location coordinates are invalid. Please allow location access and try again.');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const formData1 = new FormData();
//       formData1.append('name', formData.name);
//       formData1.append('description', formData.description);
//       formData1.append('category', formData.category);
//       formData1.append('price', formData.price);
//       formData1.append('quantity', formData.quantity);
//       formData1.append('location', JSON.stringify(formData.location));
//       formData1.append('approved', formData.approved);
//       formData1.append('farmerImage', farmerImage);

//       images.forEach((image, index) => {
//         formData1.append('images', image);  // Multiple Files
//       });

//       const res = await createProduct(formData1);

//       if (res.status === 201) {
//         setSuccess(true);
//         resetForm();
//       } else {
//         setError('Failed to submit the product. Please try again.');
//       }
//     } catch (error) {
//       setError('Failed to submit the product. Please try again.');
//       console.error('Error submitting product:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     // Clear form data
//     setFormData({
//       name: '',
//       description: '',
//       category: '',
//       price: '',
//       quantity: '',
//       location: {
//         type: "Point",
//         coordinates: location ? [location.longitude, location.latitude] : ['', '']
//       },
//       approved: 0
//     });

//     // Clear images
//     previewImages.forEach(url => URL.revokeObjectURL(url));
//     if (previewFarmerImage) URL.revokeObjectURL(previewFarmerImage);

//     setImages([]);
//     setFarmerImage(null);
//     setPreviewImages([]);
//     setPreviewFarmerImage(null);
//     setError('');
//   };

//   return (
//     <div className="h-screen scrollbar-hide overflow-auto">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-amber-600 to-orange-500 p-6 shadow-md">
//         <h1 className="text-3xl font-bold text-white">Add New Product</h1>
//         <p className="text-amber-100 mt-2">List your fresh farm products to the marketplace</p>
//       </div>

//       {/* Content */}
//       <div className="container mx-auto py-8 px-4">
//         <div className="p-6">
//           {success ? (
//             <div className="text-center py-12">
//               <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
//                 <Check className="w-8 h-8 text-green-600" />
//               </div>
//               <h2 className="text-2xl font-medium text-gray-800 mb-2">Product Submitted Successfully!</h2>
//               <p className="text-gray-600">Your product has been submitted for approval. You'll be notified once it's reviewed.</p>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit}>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {/* Left Column - Product Details */}
//                 <div>

//                   {/* Name */}
//                   <div className="mb-4">
//                     <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
//                       Product Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       id="name"
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
//                       placeholder="e.g., Organic Tomatoes"
//                       required
//                     />
//                   </div>

//                   {/* Category */}
//                   <div className="mb-4">
//                     <label className="block text-gray-700 font-medium mb-2" htmlFor="category">
//                       Category <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       id="category"
//                       name="category"
//                       value={formData.category}
//                       onChange={handleInputChange}
//                       className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
//                       required
//                     >
//                       <option value="">Select a category</option>
//                       {categories.map(category => (
//                         <option key={category} value={category}>{category}</option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* Price & Quantity */}
//                   <div className="grid grid-cols-2 gap-4 mb-4">
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2" htmlFor="price">
//                         Price ($) <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         id="price"
//                         type="number"
//                         name="price"
//                         value={formData.price}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
//                         placeholder="0.00"
//                         step="0.01"
//                         min="0"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-700 font-medium mb-2" htmlFor="quantity">
//                         Quantity <span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         id="quantity"
//                         type="number"
//                         name="quantity"
//                         value={formData.quantity}
//                         onChange={handleInputChange}
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
//                         placeholder="0"
//                         min="1"
//                         required
//                       />
//                     </div>
//                   </div>

//                   {/* Description */}
//                   <div className="mb-4">
//                     <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
//                       Description <span className="text-red-500">*</span>
//                     </label>
//                     <textarea
//                       id="description"
//                       name="description"
//                       value={formData.description}
//                       onChange={handleInputChange}
//                       className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
//                       rows="5"
//                       placeholder="Describe your product in detail. Include information about growing methods, freshness, taste, etc."
//                       required
//                     ></textarea>
//                   </div>

//                   {/* Location Status */}
//                   <div className="mb-4">
//                     <div className="flex items-center justify-between mb-2">
//                       <label className="block text-gray-700 font-medium flex items-center">
//                         <MapPin className="w-4 h-4 mr-1" />
//                         Location <span className="text-red-500">*</span>
//                       </label>
//                     </div>
//                     <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
//                       {locationStatus === 'loading' && (
//                         <div className="flex items-center justify-center py-2">
//                           <Loader2 className="animate-spin h-5 w-5 text-amber-500 mr-2" />
//                           <span className="text-amber-700">Detecting your location...</span>
//                         </div>
//                       )}

//                       {locationStatus === 'success' && (
//                         <div className="py-2">
//                           <div className="flex items-center justify-center">
//                             <Check className="h-5 w-5 text-green-500 mr-2" />
//                             <span className="text-green-700">Location detected successfully</span>
//                           </div>
//                           <div className="text-center text-sm text-amber-700 mt-1">
//                             Your product will be listed with your current location
//                           </div>
//                         </div>
//                       )}

//                       {locationStatus === 'error' && (
//                         <div className="py-2">
//                           <div className="flex items-center justify-center">
//                             <X className="h-5 w-5 text-red-500 mr-2" />
//                             <span className="text-red-700">Failed to detect location</span>
//                           </div>
//                           <div className="text-center text-sm text-amber-700 mt-1">
//                             Please enable location permissions in your browser and refresh the page
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Right Column - Images */}
//                 <div>
//                   <h2 className="text-xl font-semibold text-amber-800 mb-4 pb-2 border-b border-amber-200">Images</h2>

//                   {/* Product Images */}
//                   <div className="mb-6">
//                     <label className="block text-gray-700 font-medium mb-2">
//                       Product Images <span className="text-red-500">*</span>
//                     </label>
//                     <div className="border-2 border-dashed border-amber-300 rounded-lg p-4 text-center bg-amber-50">
//                       <input
//                         type="file"
//                         id="images"
//                         ref={imagesRef}
//                         onChange={handleimagesChange}
//                         className="hidden"
//                         accept="image/*"
//                         multiple
//                       />

//                       {previewImages.length > 0 ? (
//                         <div>
//                           <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
//                             {previewImages.map((preview, index) => (
//                               <div key={index} className="relative group">
//                                 <div className="h-32 rounded-md overflow-hidden border border-amber-200">
//                                   <img
//                                     src={preview}
//                                     alt={`Product preview ${index + 1}`}
//                                     className="w-full h-full object-cover"
//                                   />
//                                 </div>
//                                 <button
//                                   type="button"
//                                   onClick={() => removeimage(index)}
//                                   className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-sm"
//                                 >
//                                   <X className="w-4 h-4" />
//                                 </button>
//                               </div>
//                             ))}
//                           </div>
//                           <button
//                             type="button"
//                             onClick={() => imagesRef.current?.click()}
//                             className="inline-flex items-center px-4 py-2 border border-amber-500 text-amber-600 rounded-md hover:bg-amber-50"
//                           >
//                             <Upload className="w-4 h-4 mr-2" />
//                             Add More Images
//                           </button>
//                         </div>
//                       ) : (
//                         <div
//                           onClick={() => imagesRef.current?.click()}
//                           className="cursor-pointer py-8"
//                         >
//                           <ImageIcon className="mx-auto h-12 w-12 text-amber-400" />
//                           <p className="mt-2 text-sm text-amber-700">Click to upload product images</p>
//                           <p className="text-xs text-amber-600">PNG, JPG, GIF up to 10MB</p>
//                         </div>
//                       )}
//                     </div>
//                     <p className="text-xs text-amber-700 mt-1">Upload multiple images showing your product from different angles</p>
//                   </div>

//                   {/* Farmer/Vendor Image */}
//                   <div className="mb-6">
//                     <label className="block text-gray-700 font-medium mb-2">
//                       Vendor Photo <span className="text-red-500">*</span>
//                     </label>
//                     <div className="border-2 border-dashed border-amber-300 rounded-lg p-4 text-center bg-amber-50">
//                       <input
//                         type="file"
//                         id="farmerImage"
//                         ref={farmerImageRef}
//                         onChange={handleFarmerImageChange}
//                         className="hidden"
//                         accept="image/*"
//                       />

//                       {previewFarmerImage ? (
//                         <div className="relative inline-block">
//                           <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-2 border-amber-300">
//                             <img
//                               src={previewFarmerImage}
//                               alt="Vendor preview"
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                           <button
//                             type="button"
//                             onClick={removeFarmerImage}
//                             className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-sm"
//                           >
//                             <X className="w-4 h-4" />
//                           </button>
//                           <button
//                             type="button"
//                             onClick={() => farmerImageRef.current?.click()}
//                             className="mt-3 inline-flex items-center px-4 py-2 border border-amber-500 text-amber-600 rounded-md hover:bg-amber-50"
//                           >
//                             <Upload className="w-4 h-4 mr-2" />
//                             Change Photo
//                           </button>
//                         </div>
//                       ) : (
//                         <div
//                           onClick={() => farmerImageRef.current?.click()}
//                           className="cursor-pointer py-8"
//                         >
//                           <ImageIcon className="mx-auto h-12 w-12 text-amber-400" />
//                           <p className="mt-2 text-sm text-amber-700">Click to upload vendor photo</p>
//                           <p className="text-xs text-amber-600">This will be displayed with your product</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Upload Images Button */}
//                   <div className="mb-6">
//                     <button
//                       type="button"
//                       onClick={handleUpload}
//                       className="w-full bg-amber-500 text-white py-2 px-4 rounded-md font-medium hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
//                       disabled={uploading || images.length === 0 || !farmerImage}
//                     >
//                       {uploading ? (
//                         <span className="flex items-center justify-center">
//                           <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
//                           Uploading Images...
//                         </span>
//                       ) : (
//                         <span className="flex items-center justify-center">
//                           <Upload className="w-5 h-5 mr-2" />
//                           Upload Images
//                         </span>
//                       )}
//                     </button>
//                     <p className="text-center text-xs text-amber-700 mt-1">
//                       Upload your images before submitting the product
//                     </p>
//                   </div>

//                   {/* Error message */}
//                   {error && (
//                     <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
//                       <div className="flex">
//                         <div className="flex-shrink-0">
//                           <X className="h-5 w-5 text-red-500" />
//                         </div>
//                         <div className="ml-3">
//                           <p className="text-sm text-red-700">{error}</p>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {/* Action Buttons */}
//                   <div className="mt-6 grid grid-cols-2 gap-4">
//                     <button
//                       type="button"
//                       onClick={resetForm}
//                       className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-md font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//                     >
//                       Reset Form
//                     </button>

//                     <button
//                       type="submit"
//                       className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-6 rounded-md font-medium hover:from-amber-600 hover:to-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
//                       disabled={loading || locationStatus === 'loading' || locationStatus === 'error'}
//                     >
//                       {loading ? (
//                         <span className="flex items-center justify-center">
//                           <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
//                           Submitting...
//                         </span>
//                       ) : (
//                         'Submit Product for Approval'
//                       )}
//                     </button>
//                   </div>
//                   <p className="text-center text-xs text-amber-700 mt-2">
//                     Your product will be reviewed by marketplace administrators before being listed
//                   </p>
//                 </div>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateProduct;



import React, { useState, useRef, useEffect } from "react";
import { MapPin, Upload, X, ImageIcon, Loader2, Check } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectAccount } from "../../app/AuthSlice";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    location: {
      type: "Point",
      coordinates: ["", ""],
    },
  });

  const [images, setImages] = useState([]);
  const [farmerImage, setFarmerImage] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [previewFarmerImage, setPreviewFarmerImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [locationStatus, setLocationStatus] = useState("idle"); // 'idle', 'loading', 'success', 'error'

  const imagesRef = useRef(null);
  const farmerImageRef = useRef(null);
  const acc = useSelector(selectAccount);

  const categories = [
    "Vegetables",
    "Fruits",
    "Dairy",
    "Meat",
    "Bakery",
    "Honey",
    "Herbs",
    "Flowers",
    "Nuts",
    "Preserves",
    "Coffee",
    "Other",
  ];

  // Fetch user's current location
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        setLocationStatus("loading");
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { longitude, latitude } = position.coords;
            setFormData((prev) => ({
              ...prev,
              location: {
                type: "Point",
                coordinates: [longitude, latitude],
              },
            }));
            setLocationStatus("success");
          },
          (error) => {
            console.error("Error fetching location:", error);
            setLocationStatus("error");
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setLocationStatus("error");
      }
    };

    getLocation();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle product images upload
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);

    // Create preview URLs
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...newPreviewUrls]);
  };

  // Handle farmer image upload
  const handleFarmerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFarmerImage(file);
      setPreviewFarmerImage(URL.createObjectURL(file));
    }
  };

  // Remove product image
  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...previewImages];

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviews[index]);

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setImages(newImages);
    setPreviewImages(newPreviews);
  };

  // Remove farmer image
  const removeFarmerImage = () => {
    if (previewFarmerImage) {
      URL.revokeObjectURL(previewFarmerImage);
    }
    setFarmerImage(null);
    setPreviewFarmerImage(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.name ||
      !formData.description ||
      !formData.category ||
      !formData.price ||
      !formData.quantity ||
      images.length === 0 ||
      !farmerImage ||
      !formData.location.coordinates[0] ||
      !formData.location.coordinates[1]
    ) {
      setError("Please fill in all required fields and upload images");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("typeof formData:", typeof formData);

      const formData1 = new FormData();

      // Append text fields
      formData1.append("name", formData.name ?? "");
      formData1.append("description", formData.description ?? "");
      formData1.append("category", formData.category ?? "");
      formData1.append("price", formData.price ?? "");
      formData1.append("quantity", formData.quantity ?? "");

      // Append location as a JSON string
      const location = {
        type: "Point",
        coordinates: [
          parseFloat(formData.location.coordinates[0]),
          parseFloat(formData.location.coordinates[1]),
        ],
      };
      formData1.append("location", JSON.stringify(location));

      // Append farmer image
      if (farmerImage) {
        formData1.append("farmerImage", farmerImage);
      }

      images.forEach((file) => {
        formData1.append("images", file);
      });

      console.log("form dta1: ", formData1);

      // Log FormData for debugging
      for (let [key, value] of formData1.entries()) {
        console.log(key, value);
      }
      console.log("final form data", formData1.get("images"));

      // Send request to backend
      const response = await axios.post("http://localhost:5000/api/products/", formData1, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${acc.token}`,
        },
      });

      // Log the response
      console.log(response);

      // setSuccess(true);
      // console.log("Product created successfully:", responseData);
    } catch (error) {
      setError(error.message || "Failed to submit the product. Please try again.");
      console.error("Error submitting product:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h1>

        {success ? (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-medium text-gray-800 mb-2">
              Product Submitted Successfully!
            </h2>
            <p className="text-gray-600">
              Your product has been submitted for approval.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Product Details */}
              <div>
                {/* Name */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="e.g., Organic Tomatoes"
                    required
                  />
                </div>

                {/* Category */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price & Quantity */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Price ($) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="0"
                      min="1"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    rows="5"
                    placeholder="Describe your product in detail..."
                    required
                  ></textarea>
                </div>

                {/* Location */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    {locationStatus === "loading" && (
                      <div className="flex items-center justify-center">
                        <Loader2 className="animate-spin h-5 w-5 text-amber-500 mr-2" />
                        <span className="text-amber-700">
                          Detecting your location...
                        </span>
                      </div>
                    )}
                    {locationStatus === "success" && (
                      <div className="flex items-center justify-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-green-700">
                          Location detected successfully
                        </span>
                      </div>
                    )}
                    {locationStatus === "error" && (
                      <div className="flex items-center justify-center">
                        <X className="h-5 w-5 text-red-500 mr-2" />
                        <span className="text-red-700">
                          Failed to detect location
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Images */}
              <div>
                {/* Product Images */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Product Images <span className="text-red-500">*</span>
                  </label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-gray-50 cursor-pointer"
                    onClick={() => imagesRef.current.click()}
                  >
                    <input
                      type="file"
                      ref={imagesRef}
                      onChange={handleImagesChange}
                      className="hidden"
                      multiple
                    />
                    {previewImages.length > 0 ? (
                      <div className="grid grid-cols-2 gap-3">
                        {previewImages.map((preview, index) => (
                          <div key={index} className="relative">
                            <img
                              src={preview}
                              alt={`Product preview ${index + 1}`}
                              className="w-full h-32 object-cover rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div>
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                          Click to upload product images
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Farmer Image */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Vendor Photo <span className="text-red-500">*</span>
                  </label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-gray-50 cursor-pointer"
                    onClick={() => farmerImageRef.current.click()}
                  >
                    <input
                      type="file"
                      ref={farmerImageRef}
                      onChange={handleFarmerImageChange}
                      className="hidden"
                    />
                    {previewFarmerImage ? (
                      <div className="relative">
                        <img
                          src={previewFarmerImage}
                          alt="Vendor preview"
                          className="w-32 h-32 mx-auto rounded-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={removeFarmerImage}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                          Click to upload vendor photo
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-amber-500 text-white py-2 px-4 rounded-md font-medium hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || locationStatus === "loading"}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                    Submitting...
                  </span>
                ) : (
                  "Submit Product"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateProduct;