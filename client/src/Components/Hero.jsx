import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import hero from "../assets/hero.png";

const Hero = () => {
  // Arrow SVG for the button
  const arrowSVG = (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg>
  );

  return (
    <div className="w-full  flex flex-col relative">
      {/* New Arrival Banner with center to complete left animation */}
      <div className="w-full bg-black text-white md:py-3 py-1 relative overflow-hidden">
        <motion.div
          className="albert-sans text-lg md:text-xl z-10 text-center w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            className="inline-block prata-regular "
            initial={{ x: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            NEW ARRIVAL
          </motion.span>
        </motion.div>
      </div>

      {/* Spacer between banner and image */}
      <div className="h-4"></div>

      {/* Image section */}
      <motion.div
        className="w-full relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="w-full">
          <motion.img
            src={hero}
             loading="lazy"
            className="w-full h-full object-cover md:object-contain lg:object-cover object-center"
            alt="BabyBlue collection showcase"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
        </div>

        {/* Responsive Tags on the image */}
        <motion.div
          className="absolute top-4 sm:top-1/6 md:top-1/4 left-2 sm:left-4 md:left-8 bg-white px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-md shadow-md text-xs sm:text-sm md:text-base"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <span className="font-medium">-30%</span>
        </motion.div>

        <motion.div
          className="absolute bottom-16 sm:bottom-1/4 md:bottom-1/3 right-2 sm:right-4 md:right-8 bg-black text-white px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-md shadow-md text-xs sm:text-sm md:text-base"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <span className="font-medium">Limited Edition</span>
        </motion.div>

        {/* Customer Testimonial Tag - hidden on small screens, horizontal layout on larger screens */}
        <motion.div
          className="absolute bottom-4 md:bottom-8 left-2 md:left-8 bg-white rounded-md shadow-md hidden md:block"
          style={{ maxWidth: "350px" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="p-3 flex flex-col w-56 items-start">
            <div className="flex gap-1.5">
              <div className="flex -space-x-2 ">
                <img
                  src={hero}
                   loading="lazy"
                  alt="Customer 1"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
                <img
                  src={hero}
                   loading="lazy"
                  alt="Customer 2"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
                <img
                  src={hero}
                   loading="lazy"
                  alt="Customer 3"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              </div>

              <div className="flex items-center">
                <span className="font-medium text-xl mr-2">50+</span>
              </div>
            </div>
            <p className="text-sm text-wrap text-gray-700">
              Join our growing community of satisfied customers.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Text content section with tagline */}
      <motion.div
        className="w-full flex flex-col justify-center p-4 sm:p-8 md:p-12 lg:p-16 relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <div className="w-full flex flex-col items-center text-center py-4 sm:py-8 md:py-12">
          {/* Decorative number - now visible on all screens */}
          <motion.div
            className="absolute -top-4 -right-4 text-6xl sm:text-7xl md:text-9xl font-bold text-black/5 select-none"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            2025
          </motion.div>

          {/* Tagline */}
          <motion.div
            className="w-full text-center mb-4 sm:mb-6 md:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-medium italic">
              Elevate Your Style With Luxurious Comfort
            </h2>
          </motion.div>

          <motion.p
            className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Discover the latest trends with BabyBlue. Explore our new collection
            of stylish and modern apparel.
          </motion.p>

          {/* Shop Now button with updated hover animation */}
          <motion.button
            className="group bg-white hover:bg-black hover:text-white transition-all duration-300 px-4 sm:px-5 py-2 sm:py-3 flex items-center gap-2 sm:gap-3 rounded-full text-xs sm:text-sm shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Shop Now</span>
            <span className="w-5 h-5 sm:w-6 sm:h-6 relative flex items-center justify-center overflow-hidden rounded-full bg-black text-white group-hover:bg-white group-hover:text-black">
              {/* Arrow 1 - visible initially, slides out on hover */}
              <div className="absolute transition-transform duration-300 ease-in-out group-hover:-translate-x-full text-white group-hover:text-black">
                {arrowSVG}
              </div>

              {/* Arrow 2 - initially off-screen, slides in on hover */}
              <div className="absolute transition-transform duration-300 ease-in-out translate-x-full group-hover:translate-x-0 text-white group-hover:text-black">
                {arrowSVG}
              </div>
            </span>
          </motion.button>
        </div>
      </motion.div>

      {/* Corner decorative elements */}
      <motion.div
        className="absolute top-8 left-8 w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 border-t border-l border-black opacity-20 hidden md:block"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      ></motion.div>
      <motion.div
        className="absolute bottom-8 right-8 w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 border-b border-r border-black opacity-20 hidden md:block"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      ></motion.div>
    </div>
  );
};

export default Hero;
