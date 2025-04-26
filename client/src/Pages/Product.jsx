import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { AllContext } from "../Context/AllContext";
import ProductComments from "../Components/ProductComments";
import Title from "../Components/Title";
import ProductCard from "../Components/ProductCard";
import ItemsDiv from "../Components/ItemsDiv";

const Product = () => {
  const { id } = useParams();
  const location = useLocation();
  const { products, addToCart } = useContext(AllContext);
  const [product, setProduct] = useState({});
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [productComments, setProductComments] = useState([]);
  const [error, setError] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  
  // Use a ref to store the timer ID
  const successTimeoutRef = useRef(null);

  // Available sizes
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  // Scroll to top whenever the ID param changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id, location.pathname]);

  useEffect(() => {
    const selectedProduct = products.find((item) => item.id === id);
    if (selectedProduct) {
      setProduct(selectedProduct);
      setThumbnailImage(selectedProduct.image);
      // Reset state when product changes
      setQuantity(1);
      setSelectedSize("");
      setError("");
      setAddedToCart(false);

      // Clear any existing timeout
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
        successTimeoutRef.current = null;
      }
    }
    setProductComments([]);
  }, [id, products]);

  // Clean up timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  const handleImageClick = (image) => {
    setThumbnailImage(image);
  };

  // Function to reset thumbnail to main product image
  const resetThumbnail = () => {
    setThumbnailImage(product.image);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
      if (error) setError("");
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    if (error) setError("");
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddToCart = () => {
    // First clear any existing timeout
    if (successTimeoutRef.current) {
      clearTimeout(successTimeoutRef.current);
      successTimeoutRef.current = null;
    }
    
    // Clear any previous success state immediately
    setAddedToCart(false);
    
    // Validate selection
    if (!selectedSize) {
      setError("Please select a size");
      return;
    }
    
    if (quantity <= 0) {
      setError("Please select a valid quantity");
      return;
    }
    
    // Clear any existing errors
    setError("");
    
    // Create cart item with both price data
    const cartItem = {
      id: product.id,
      title: product.title,
      originalPrice: product.originalPrice,
      price: product.discountPrice,
      image: product.image,
      quantity: quantity,
      size: selectedSize
    };
    
    // Add to cart using context function
    addToCart(cartItem);
    
    // Delay slightly to ensure state updates before showing message
    // This helps ensure the UI can properly process the state change
    setTimeout(() => {
      // Show success message
      setAddedToCart(true);
      
      // Set timeout to hide message after 5 seconds
      successTimeoutRef.current = setTimeout(() => {
        setAddedToCart(false);
        successTimeoutRef.current = null;
      }, 5000);
    }, 10);
  };

  if (!product.title) {
    return (
      <div className="container mx-auto px-4 py-8">Loading product...</div>
    );
  }

  const handleAddComment = (newComment) => {
    setProductComments([...productComments, newComment]);
    // Here you would typically make an API call to save the comment
  };

  return (
    <>
      <div className="container mx-auto py-6 px-4 w-full">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Images Section */}
          <div className="md:w-1/2">
            <div className="relative bg-gray-50 rounded-lg overflow-hidden mb-4">
              <img
                src={thumbnailImage || product.image}
                alt={product.title}
                className="w-full h-auto object-cover"
              />
              <button
                onClick={toggleModal}
                className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
              </button>
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {/* Main product image thumbnail */}
                <div
                  onClick={resetThumbnail}
                  className={`w-20 h-20 md:w-24 md:h-24 flex-shrink-0 cursor-pointer border ${
                    thumbnailImage === product.image
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={`${product.title} main view`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Additional image thumbnails */}
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => handleImageClick(image)}
                    className={`w-20 h-20 md:w-24 md:h-24 flex-shrink-0 cursor-pointer border ${
                      thumbnailImage === image
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-[350] mb-2">{product.title}</h1>
            <p className="text-2xl mb-6">$ {product.discountPrice} USD</p>

            <div className="border-t text-[#333333] border-gray-200 pt-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
                <p className="text-lg">
                  Enjoy free shipping on all orders—no minimum!
                </p>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <p className="text-lg">
                  Get your order delivered in 3-7 working days
                </p>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`h-10 w-14 border ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-gray-400"
                    } rounded-md transition-colors`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {error && error.includes("size") && (
                <p className="text-red-500 mt-2">{error}</p>
              )}
            </div>

            {/* Success message positioned BEFORE the add to cart button */}
            {addedToCart && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded shadow-md">
                <div className="flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 mr-2 text-green-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                  <p className="font-medium">Item added to your cart successfully!</p>
                </div>
              </div>
            )}

            {/* Error message for non-size/quantity specific errors */}
            {error && !error.includes("size") && !error.includes("quantity") && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded shadow-md">
                <p>{error}</p>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <div className="w-24">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-center"
                  aria-label="Quantity"
                />
                {error && error.includes("quantity") && (
                  <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
              </div>
              <button 
                onClick={handleAddToCart}
                className="w-full sm:w-auto bg-white border hover:bg-black hover:text-white transition-all duration-300 border-gray-300 rounded-full text-black py-2 px-6 flex items-center justify-center gap-2"
              >
                Add to Cart
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
              </button>
            </div>

            <div className="border-t flex flex-col gap-4 border-gray-200 py-4 mb-4">
              <div className="flex items-start">
                <span className="font-medium w-24 flex-shrink-0">Description:</span>
                <p className="text-[#333333]">
                  {product.shortDescription}
                </p>
              </div>
              <div className="flex items-start">
                <span className="font-medium w-24 flex-shrink-0">SKU:</span>
                <p className="text-[#333333]">{product.id}</p>
              </div>
              <div className="flex items-start">
                <span className="font-medium w-24 flex-shrink-0">Category:</span>
                <p className="text-[#333333]">{product.category}</p>
              </div>
              <div className="flex items-start">
                <span className="font-medium w-24 flex-shrink-0">Sub Category:</span>
                <p className="text-[#333333]">{product.subcategory}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-3xl font-[350] mb-4">Description</h2>
          <p className="text-lg mb-4">{product.longDescription}</p>

          {/* Dynamic product features from product data */}
          {product.features && product.features.length > 0 && (
            <>
              <h3 className="text-2xl font-[350] mb-2">Features</h3>
              <ul className="list-disc pl-5 space-y-2 text-lg">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Image Modal */}
        {showModal && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={toggleModal}
          >
            <div
              className="p-2 max-w-4xl max-h-screen overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={thumbnailImage || product.image}
                  alt={product.title}
                  className="max-w-full h-auto"
                />
                <button
                  onClick={toggleModal}
                  className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* Modal Thumbnails */}
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {/* Main product image thumbnail in modal */}
                <div
                  onClick={resetThumbnail}
                  className={`w-20 h-20 flex-shrink-0 cursor-pointer border ${
                    thumbnailImage === product.image
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={`${product.title} main view`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Additional thumbnails in modal */}
                {product.images &&
                  product.images.length > 0 &&
                  product.images.map((image, index) => (
                    <div
                      key={index}
                      onClick={() => handleImageClick(image)}
                      className={`w-20 h-20 flex-shrink-0 cursor-pointer border ${
                        thumbnailImage === image
                          ? "border-blue-500"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        <ProductComments
          productId={id}
          comments={[...productComments]}
          onAddComment={handleAddComment}
          currentUser={{
            id: "current-user",
            name: "You",
            avatar: "https://via.placeholder.com/40"
          }}
        />
      </div>

      <div className="px-4 py-12">
        <h2 className="text-3xl font-[350] mb-6">Related Products</h2>
        <ItemsDiv
          CardComponents={ProductCard}
          items={products
            .filter((p) => p.category === product.category && p.id !== product.id)
            .slice(0, 6)}
        />
      </div>
    </>
  );
};

export default Product;