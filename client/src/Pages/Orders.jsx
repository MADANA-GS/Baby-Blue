import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AllContext } from "../Context/AllContext";
import Title from "../Components/Title";

const Orders = () => {
  const { orders } = useContext(AllContext);

  return (
    <div className="container mx-auto py-8  bg-gray-50">
      <div className="mx-auto">
        <Title text1="Your" text2="Orders" />

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
                className="text-gray-400"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </div>
            <h2 className="text-xl font-medium mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't placed any orders yet. Start shopping and place your first order.
            </p>
            <Link
              to="/"
              className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors inline-flex items-center justify-center"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              // Format date
              const orderDate = new Date(order.date).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              );

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow-sm p-6"
                >
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center mb-4 pb-4 border-b">
                    <div className="mb-4 lg:mb-0">
                      <h3 className="font-medium mb-1">Order #{order.id}</h3>
                      <p className="text-sm text-gray-500">{orderDate}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium text-center ${
                          order.status === "Processing"
                            ? "bg-blue-100 text-blue-600"
                            : order.status === "Shipped"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {order.status}
                      </span>
                      <Link
                        to={`/order-confirmation/${order.id}`}
                        className="bg-black text-white text-center px-4 py-1 rounded-full hover:bg-gray-800 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          Items ({order.items.length})
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {order.items.map((item, index) => (
                            <div
                              key={`${item.id}-${item.size}-${index}`}
                              className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden"
                            >
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">
                          Delivery Address
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {order.deliveryAddress.name},{" "}
                          {order.deliveryAddress.street},{" "}
                          {order.deliveryAddress.city},{" "}
                          {order.deliveryAddress.state}{" "}
                          {order.deliveryAddress.zipCode}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center mt-4 pt-4 border-t">
                    <div className="mb-3 sm:mb-0">
                      <p className="text-sm text-gray-500">Order Total</p>
                      <p className="font-medium text-lg">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-sm flex flex-col sm:flex-row gap-2 sm:items-center">
                      <p className="text-gray-500">Payment Method:</p>
                      <p className="font-medium capitalize">
                        {order.paymentMethod === "cod"
                          ? "Cash on Delivery"
                          : order.paymentMethod}
                      </p>
                      <span className="hidden sm:inline">•</span>
                      <p className="flex items-center">
                        <span className="mr-1">Payment Status:</span>
                        <span
                          className={`font-medium ${
                            order.paymentStatus === "Paid"
                              ? "text-green-600"
                              : "text-orange-600"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;