import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";

import HomePage from "./Pages/HomePage";
import Footer from "./Components/Footer";
import Collections from "./Pages/Collections";
// import ProductCard from "./Components/ProductCard";
import Products from "./Pages/Products";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import OrderConfirmation from "./Pages/OrderConfirmation";
import Orders from "./Pages/Orders";
// import BrowseCategory from "./Helper/BrowseCategory";

// ✅ Lazy load heavy components

const App = () => {
  return (
    <div className="px-4 sm:px-[6vw] md:px-[7vw] lg:px-[9vw] xl:px-[12vw] 2xl:px-[15vw] ">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/products/:cat" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/order-confirmation/:orderId"
          element={<OrderConfirmation />}
        />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
