import React from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  
  // Function to check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <footer className="w-full flex flex-col gap-8 bg-white border-t border-gray-200 py-10 px-5">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto flex md:flex-row flex-col gap-10 w-full h-full items-start justify-between">
        {/* Brand Section */}
        <div className="md:w-[30%] w-full gap-3 flex flex-col">
          <p className="text-2xl font-medium text-gray-800">Baby Blue</p>
          <p className="text-md text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        
        {/* Contact Section */}
        <div className="md:w-[30%] w-full gap-3 flex flex-col">
          <p className="text-sm uppercase text-gray-500 font-medium tracking-wider">
            GET IN TOUCH
          </p>
          <a
            href="mailto:BlueBaby@gmail.com"
            className="text-xl md:text-2xl text-gray-800 hover:text-black transition-all duration-300"
          >
            BlueBaby@gmail.com
          </a>
        </div>
        
        {/* Navigation Section */}
        <div className="md:w-[30%] w-full flex">
          <div className="flex flex-col gap-3">
            <p className="text-sm uppercase text-gray-500 font-medium tracking-wider">
              PAGES
            </p>
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className={`${
                  isActive("/") ? "text-black" : "text-gray-700"
                } hover:text-black text-sm uppercase transition-all duration-300`}
              >
                HOME
              </Link>
              <Link
                to="/collections"
                className={`${
                  isActive("/collections") ? "text-black" : "text-gray-700"
                } hover:text-black text-sm uppercase transition-all duration-300`}
              >
                COLLECTIONS
              </Link>
              <Link
                to="/about"
                className={`${
                  isActive("/about") ? "text-black" : "text-gray-700"
                } hover:text-black text-sm uppercase transition-all duration-300`}
              >
                ABOUT
              </Link>
              <Link
                to="/login"
                className={`${
                  isActive("/login") ? "text-black" : "text-gray-700"
                } hover:text-black text-sm uppercase transition-all duration-300`}
              >
                LOGIN
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright & Legal */}
      <div className="max-w-7xl mx-auto border-t border-gray-200 pt-6 w-full flex flex-col md:flex-row gap-4 md:gap-0 text-sm text-gray-500">
        <div className="flex flex-col md:flex-row w-full items-center md:items-center md:justify-between">
          <p className="text-center md:text-left mb-4 md:mb-0">© 2025 BabyBlue.</p>
          <div className="flex items-center justify-center md:justify-end flex-wrap gap-4">
            <Link
              to="/privacy-policy"
              className={`${
                isActive("/privacy-policy") ? "text-black" : "text-gray-500"
              } hover:text-black transition-all duration-300`}
            >
              Privacy Policy
            </Link>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            
            <Link
              to="/delivery-returns"
              className={`${
                isActive("/delivery-returns") ? "text-black" : "text-gray-500"
              } hover:text-black transition-all duration-300`}
            >
              Delivery & Returns
            </Link>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            
            <Link
              to="/terms-conditions"
              className={`${
                isActive("/terms-conditions") ? "text-black" : "text-gray-500"
              } hover:text-black transition-all duration-300`}
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;