import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../Components/Title";
import { AllContext } from "../Context/AllContext";
import { motion } from "framer-motion";

const Checkout = () => {
  const {
    cartItems,
    savedAddresses,
    setSavedAddresses,
    addAddress,
    setDefaultAddress,
    createOrder,
  } = useContext(AllContext);
  const navigate = useNavigate();

  useEffect(() => {
    setSavedAddresses([
      {
        id: "addr1",
        name: "John Doe",
        phone: "9876543210",
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States",
        isDefault: true,
      },
      {
        id: "addr2",
        name: "John Doe",
        phone: "9876543210",
        street: "456 Park Avenue",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90001",
        country: "United States",
        isDefault: false,
      },
    ]);
  }, []);

  // State for order summary
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);

  // State for form
  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [showAddForm, setShowAddForm] = useState(false);
  const [processingOrder, setProcessingOrder] = useState(false);

  // New address form state
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    isDefault: false,
  });

  // Error states
  const [addressError, setAddressError] = useState("");
  const [paymentError, setPaymentError] = useState("");

  // Calculate cart totals when cart changes
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/orders");
      return;
    }

    // Calculate subtotal (using original prices)
    const calculatedSubtotal = cartItems.reduce(
      (acc, item) => acc + parseFloat(item.originalPrice) * item.quantity,
      0
    );
    setSubtotal(calculatedSubtotal);

    // Calculate discount
    const calculatedDiscount = cartItems.reduce(
      (acc, item) =>
        acc +
        (parseFloat(item.originalPrice) - parseFloat(item.price)) *
          item.quantity,
      0
    );
    setDiscount(calculatedDiscount);

    // Calculate actual cart value
    const cartValue = calculatedSubtotal - calculatedDiscount;

    // Set shipping based on cart value
    const shippingFee = cartValue < 1000 ? 60 : 0;
    setShipping(shippingFee);

    // Calculate final total
    setTotal(cartValue + shippingFee);

    // Set default address if available
    const defaultAddr = savedAddresses.find((addr) => addr.isDefault);
    if (defaultAddr) {
      setSelectedAddress(defaultAddr.id);
    }
  }, [cartItems, navigate, savedAddresses]);

  // Handle address form input changes
  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress({
      ...newAddress,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle new address form submission
  const handleAddressSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !newAddress.name ||
      !newAddress.phone ||
      !newAddress.street ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.zipCode
    ) {
      setAddressError("Please fill all required fields");
      return;
    }

    // Add new address
    const address = addAddress(newAddress);

    // Set as selected
    setSelectedAddress(address.id);

    // If set as default
    if (newAddress.isDefault) {
      setDefaultAddress(address.id);
    }

    // Reset form and close it
    setNewAddress({
      name: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      isDefault: false,
    });
    setShowAddForm(false);
    setAddressError("");
  };

  // Handle order placement
  const placeOrder = () => {
    // Validation
    if (!selectedAddress) {
      setAddressError("Please select a delivery address");
      return;
    }

    if (!paymentMethod) {
      setPaymentError("Please select a payment method");
      return;
    }

    setProcessingOrder(true);

    // Get selected address details
    const deliveryAddress = savedAddresses.find(
      (addr) => addr.id === selectedAddress
    );

    // Create order object
    const orderData = {
      items: cartItems,
      deliveryAddress,
      paymentMethod,
      subtotal,
      discount,
      shipping,
      total,
      paymentStatus: paymentMethod === "cod" ? "Pending" : "Paid",
    };

    // Simulate API call delay
    setTimeout(() => {
      // Create order in context
      const newOrder = createOrder(orderData);

      // Navigate to confirmation page
      navigate(`/order-confirmation/${newOrder.id}`);
    }, 1500);
  };

  // If no items in cart, redirect to cart page
  if (cartItems.length === 0) {
    return null; // useEffect will handle redirect
  }

  return (
    <div className="container mx-auto py-8 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <Title text1="Secure" text2="Checkout" />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section - Address & Payment */}
          <div className="lg:w-2/3">
            {/* Delivery Address Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-medium mb-4 pb-2 border-b flex items-center">
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
                  className="mr-2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Delivery Address
              </h2>

              {addressError && (
                <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
                  {addressError}
                </div>
              )}

              {/* Saved Addresses */}
              {savedAddresses.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {savedAddresses.map((address) => (
                    <div
                      key={address.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedAddress === address.id
                          ? "border-2 border-black bg-gray-50"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                      onClick={() => {
                        setSelectedAddress(address.id);
                        setAddressError("");
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="deliveryAddress"
                            checked={selectedAddress === address.id}
                            onChange={() => setSelectedAddress(address.id)}
                            className="mr-2"
                          />
                          <span className="font-medium">{address.name}</span>
                        </div>
                        {address.isDefault && (
                          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="text-gray-600 text-sm ml-5">
                        <p>{address.phone}</p>
                        <p>{address.street}</p>
                        <p>
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                        <p>{address.country}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add new address button or form */}
              {!showAddForm ? (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center text-black border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 transition-colors"
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
                    className="mr-2"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Add New Address
                </button>
              ) : (
                <form
                  onSubmit={handleAddressSubmit}
                  className="border border-gray-200 rounded-lg p-4 mt-4"
                >
                  <h3 className="font-medium mb-4">Add New Address</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name*
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={newAddress.name}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number*
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={newAddress.phone}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address*
                      </label>
                      <input
                        type="text"
                        name="street"
                        value={newAddress.street}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City*
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={newAddress.city}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State/Province*
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={newAddress.state}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP/Postal Code*
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={newAddress.zipCode}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country*
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={newAddress.country}
                        onChange={handleAddressChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="isDefault"
                          checked={newAddress.isDefault}
                          onChange={handleAddressChange}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">
                          Set as default address
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setAddressError("");
                      }}
                      className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Payment Methods Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-medium mb-4 pb-2 border-b flex items-center">
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
                  className="mr-2"
                >
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
                Payment Method
              </h2>

              {paymentError && (
                <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
                  {paymentError}
                </div>
              )}

              <div className="space-y-3">
                {/* Cash on Delivery */}
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-2 border-black bg-gray-50"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  onClick={() => {
                    setPaymentMethod("cod");
                    setPaymentError("");
                  }}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-3 text-gray-700"
                      >
                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                        <path d="M12 12h.01"></path>
                        <path d="M17 12h.01"></path>
                        <path d="M7 12h.01"></path>
                      </svg>
                      <span className="font-medium">Cash on Delivery</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 ml-8 mt-1">
                    Pay when your order is delivered
                  </p>
                </div>

                {/* Stripe */}
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    paymentMethod === "stripe"
                      ? "border-2 border-black bg-gray-50"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  onClick={() => {
                    setPaymentMethod("stripe");
                    setPaymentError("");
                  }}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "stripe"}
                      onChange={() => setPaymentMethod("stripe")}
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#6772E5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-3"
                      >
                        <path d="M2 10V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5"></path>
                        <path d="M2 14v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5"></path>
                        <path d="M6 10h12"></path>
                        <path d="M6 14h12"></path>
                      </svg>
                      <span className="font-medium">Pay with Card</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 ml-8 mt-1">
                    Secure payment via Stripe
                  </p>
                </div>

                {/* Razorpay */}
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    paymentMethod === "razorpay"
                      ? "border-2 border-black bg-gray-50"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  onClick={() => {
                    setPaymentMethod("razorpay");
                    setPaymentError("");
                  }}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === "razorpay"}
                      onChange={() => setPaymentMethod("razorpay")}
                      className="mr-3"
                    />
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#528FF0"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-3"
                      >
                        <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                        <line x1="2" y1="10" x2="22" y2="10"></line>
                      </svg>
                      <span className="font-medium">Razorpay</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 ml-8 mt-1">
                    Pay securely with Razorpay
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-medium mb-6 pb-4 border-b">
                Order Summary
              </h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-medium line-clamp-1">
                        {item.title}
                      </h4>
                      <div className="text-xs text-gray-500">
                        <span>Size: {item.size}</span>
                        <span className="mx-2">|</span>
                        <span>Qty: {item.quantity}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <span className="font-medium text-sm">
                          ${item.price}
                        </span>
                        <span className="line-through text-gray-400 text-xs ml-2">
                          ${item.originalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-right">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-600 text-right">
                    -${discount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-right">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="border-t pt-3 mt-3 flex justify-between items-center font-medium">
                  <span>Total</span>
                  <span className="text-xl text-right">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={placeOrder}
                disabled={processingOrder}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-full 
                  ${
                    processingOrder
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-black hover:bg-gray-800"
                  } 
                  text-white transition-colors`}
              >
                {processingOrder ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Place Order
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
                  </>
                )}
              </button>

              {/* Secure checkout notice */}
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <p>Secure checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
