import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AllContext } from "../Context/AllContext";
import Title from "../Components/Title";

const OrderConfirmation = () => {
  const { orders } = useContext(AllContext);
  const { orderId } = useParams();
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    // Find the current order from the orders array
    if (orderId && orders.length > 0) {
      const order = orders.find((order) => order.id === orderId);
      setCurrentOrder(order);
    }
  }, [orderId, orders]);

  if (!currentOrder) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-medium mb-4">Order not found</h2>
          <p className="mb-6">We couldn't find the order you're looking for.</p>
          <Link
            to="/"
            className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Format date
  const orderDate = new Date(currentOrder.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto py-8 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <Title text1="Order" text2="Confirmation" />

        {/* Order Success Message */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
              className="text-green-600"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h2 className="text-2xl font-medium mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your order has been placed successfully.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
            <Link
              to="/orders"
              className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors inline-flex items-center justify-center"
            >
              View All Orders
            </Link>
            <Link
              to="/"
              className="border border-black px-6 py-3 rounded-full hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4 pb-4 border-b">
            <h3 className="text-lg font-medium">Order Details</h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                currentOrder.status === "Processing"
                  ? "bg-blue-100 text-blue-600"
                  : currentOrder.status === "Shipped"
                  ? "bg-orange-100 text-orange-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {currentOrder.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Order ID</p>
              <p className="font-medium">{currentOrder.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Order Date</p>
              <p className="font-medium">{orderDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Payment Method</p>
              <p className="font-medium capitalize">
                {currentOrder.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : currentOrder.paymentMethod}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Payment Status</p>
              <p
                className={`font-medium ${
                  currentOrder.paymentStatus === "Paid"
                    ? "text-green-600"
                    : "text-orange-600"
                }`}
              >
                {currentOrder.paymentStatus}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3">Items in your order</h4>
            <div className="space-y-4">
              {currentOrder.items.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex items-center gap-4"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium line-clamp-1">{item.title}</h5>
                    <div className="text-sm text-gray-500 flex gap-2">
                      <span>Size: {item.size}</span>
                      <span>|</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-3">Order Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal</span>
                <span>${currentOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Discount</span>
                <span className="text-green-600">
                  -${currentOrder.discount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Shipping</span>
                <span>
                  {currentOrder.shipping === 0
                    ? "Free"
                    : `$${currentOrder.shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between items-center font-medium text-lg pt-2 border-t mt-2">
                <span>Total</span>
                <span>${currentOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-4 pb-4 border-b">
            Delivery Information
          </h3>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1">Delivery Address</p>
            <div className="font-medium">
              <p>{currentOrder.deliveryAddress.name}</p>
              <p>{currentOrder.deliveryAddress.phone}</p>
              <p>{currentOrder.deliveryAddress.street}</p>
              <p>
                {currentOrder.deliveryAddress.city},{" "}
                {currentOrder.deliveryAddress.state}{" "}
                {currentOrder.deliveryAddress.zipCode}
              </p>
              <p>{currentOrder.deliveryAddress.country}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Expected Delivery</p>
            <p className="font-medium">
              {new Date(
                new Date(currentOrder.date).getTime() + 5 * 24 * 60 * 60 * 1000
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
