import React, { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../Components/Title";
import { AllContext } from "../Context/AllContext";
import { AnimatePresence, motion } from "framer-motion";

const Cart = () => {
  const { cartItems, updateCartItemQuantity, removeFromCart, clearCart } = useContext(AllContext);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const navigate = useNavigate();

  // Calculate cart totals whenever cart changes
  useEffect(() => {
    // Calculate subtotal (using original prices)
    const calculatedSubtotal = cartItems.reduce(
      (acc, item) => acc + parseFloat(item.originalPrice) * item.quantity,
      0
    );
    setSubtotal(calculatedSubtotal);

    // Calculate discount (difference between original price and discount price)
    const calculatedDiscount = cartItems.reduce(
      (acc, item) =>
        acc +
        (parseFloat(item.originalPrice) - parseFloat(item.price)) *
          item.quantity,
      0
    );
    
    // Apply additional promo discount if applicable
    const totalDiscount = promoApplied ? calculatedDiscount + (calculatedSubtotal * 0.1) : calculatedDiscount;
    setDiscount(totalDiscount);

    // Calculate actual cart value (using discount prices)
    const cartValue = calculatedSubtotal - totalDiscount;

    // Set shipping based on cart value threshold
    const shippingFee = cartValue < 1000 ? 60 : 0;
    setShipping(shippingFee);

    // Calculate final total
    setTotal(cartValue + shippingFee);
  }, [cartItems, promoApplied]);

  // Handle quantity change
  const handleQuantityChange = useCallback((id, size, newQuantity) => {
    if (newQuantity > 0) {
      updateCartItemQuantity(id, size, newQuantity);
    }
  }, [updateCartItemQuantity]);

  // Confirm delete modal
  const confirmDelete = (id, size) => {
    setItemToDelete({ id, size });
    setShowConfirmDelete(true);
  };

  // Execute delete after confirmation
  const executeDelete = () => {
    if (itemToDelete) {
      removeFromCart(itemToDelete.id, itemToDelete.size);
      setShowConfirmDelete(false);
      setItemToDelete(null);
    }
  };

  // Cancel delete operation
  const cancelDelete = () => {
    setShowConfirmDelete(false);
    setItemToDelete(null);
  };

  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
    }
  };

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-16 px-4">
        <Title text1="Your" text2="Shopping Cart" />
        <div className="py-16 text-center max-w-md mx-auto">
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
          </div>
          <button
            onClick={() => navigate("/products/all")}
            className="bg-black text-white py-3 px-8 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center mx-auto gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Title text1="Your" text2="Shopping Cart" />
        
        {/* Cart summary section */}
        <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-medium">Your Cart ({cartItems.length} {cartItems.length === 1 ? "Item" : "Items"})</h2>
              <p className="text-gray-500 text-sm">
                Review your items before checkout
              </p>
            </div>
            <button 
              onClick={() => clearCart()}
              className="text-red-500 flex items-center gap-1 text-sm hover:text-red-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
              Clear Cart
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="lg:w-2/3">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={`${item.id}-${item.size}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-sm p-4 mb-4"
                >
                  <div className="flex flex-col sm:flex-row items-center">
                    {/* Product image */}
                    <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product details */}
                    <div className="flex-grow px-4 py-2 sm:py-0 text-center sm:text-left">
                      <h3 className="font-medium text-lg">{item.title}</h3>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-1 mt-1">
                        <p className="text-gray-500 text-sm">Size: {item.size}</p>
                        <div className="text-gray-700 flex items-center gap-2">
                          <span className="font-medium">${item.price}</span>
                          <span className="line-through text-gray-400 text-sm">
                            ${item.originalPrice}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity and Actions */}
                    <div className="flex flex-row items-center justify-between gap-4 mt-4 sm:mt-0 w-full sm:w-auto">
                      {/* Quantity selector */}
                      <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (!isNaN(value) && value > 0) {
                              handleQuantityChange(item.id, item.size, value);
                            }
                          }}
                          className="w-10 text-center border-x border-gray-200 py-1 focus:outline-none"
                          min="1"
                        />
                        <button
                          onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="font-medium w-24 text-center">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() => confirmDelete(item.id, item.size)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2"
                        aria-label="Remove item"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Continue Shopping Button */}
            <div className="mt-6">
              <button
                onClick={() => navigate("/shop")}
                className="flex items-center text-gray-600 hover:text-black transition-colors bg-white rounded-full px-6 py-2 shadow-sm"
              >
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
                  className="mr-2"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Continue Shopping
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3 mt-6 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-medium mb-6 pb-4 border-b">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-right">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-600 text-right">-${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-right">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="border-t pt-4 flex justify-between items-center font-medium">
                  <span>Total</span>
                  <span className="text-xl text-right">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo code section */}
              <div className="mb-6">
                <div className="flex">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    disabled={promoApplied}
                  />
                  <button
                    onClick={applyPromoCode}
                    disabled={promoApplied}
                    className={`px-4 py-2 ${
                      promoApplied
                        ? "bg-green-500 text-white cursor-not-allowed"
                        : "bg-black text-white hover:bg-gray-800"
                    } rounded-r-md transition-colors`}
                  >
                    {promoApplied ? "Applied" : "Apply"}
                  </button>
                </div>
                {promoError && <p className="text-red-500 text-sm mt-2">{promoError}</p>}
                {promoApplied && (
                  <p className="text-green-600 text-sm mt-2">
                    "SAVE10" applied! You saved 10% on your order.
                  </p>
                )}
              </div>

              {/* Free shipping notice */}
              {subtotal - discount < 1000 && (
                <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p>
                      Add ${(1000 - (subtotal - discount)).toFixed(2)} more to get
                      FREE shipping
                    </p>
                  </div>
                </div>
              )}

              {/* Place Order Button */}
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-full transition-colors flex items-center justify-center gap-2"
              >
                Proceed to Checkout
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
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>

              {/* Secure checkout notice */}
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <p>Secure checkout</p>
                </div>
              </div>

              {/* Shipping policies */}
              <div className="mt-6 text-sm text-gray-500 space-y-2">
                <div className="flex items-center gap-2">
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
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                  <p>Free shipping on orders over $1000</p>
                </div>
                <div className="flex items-center gap-2">
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
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <p>International shipping available</p>
                </div>
                <div className="flex items-center gap-2">
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
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <p>Delivery within 3-7 working days</p>
                </div>
                <div className="flex items-center gap-2">
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
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <p>30-day returns policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium mb-4">Remove Item</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove this item from your cart?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;