import React from "react";
import { motion } from "framer-motion";
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
const SaleCard = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row items-center  md:gap-10 gap-5   mx-auto">
      <div className="lg:w-1/2 w-full bg-[#EEE8E6] h-full py-5 px-2 flex md:flex-row flex-col-reverse  gap-3 md:gap-1 ">
        <div className="flex flex-col px-4 items-start justify-center gap-4">
          <h2 className="font-[350] text-3xl">
            Exclusive winter sale save more!
          </h2>
          <p className="text-base font-[300] text-gray-700">
            Shop today and enjoy up to 40% off all outerwear and accessories!
          </p>
          <motion.button
            className="group bg-transparent hover:bg-black hover:text-white transition-all duration-300 px-4 sm:px-5 py-2 sm:py-3 flex items-center gap-2 sm:gap-3 rounded-full text-xs sm:text-sm shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Explore Fashion</span>
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
        <div className="lg:max-w-[40%] md:max-w-[35%] p-2 w-full aspect-[3/4] md:aspect-[4/5]">
          <img
            src="https://cdn.prod.website-files.com/678ca1173be404b47f58be4e/67b03fa3ac26ee049c25c795_sale-image.jpg"
            className="w-full h-full"
            alt=""
          />
        </div>
      </div>
      {/*  */}
      <div className="lg:w-1/2 w-full bg-[#E9EFF5] h-full  py-5 px-2 flex md:flex-row flex-col-reverse   gap-1 ">
        <div className="flex flex-col px-4 items-start justify-center gap-4">
          <h2 className="font-[350] text-3xl">
            Exclusive winter sale save more!
          </h2>
          <p className="text-base font-[300] text-gray-700">
            Shop today and enjoy up to 40% off all outerwear and accessories!
          </p>
          <motion.button
            className="group bg-transparent hover:bg-black hover:text-white transition-all duration-300 px-4 sm:px-5 py-2 sm:py-3 flex items-center gap-2 sm:gap-3 rounded-full text-xs sm:text-sm shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Shop Comfort</span>
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
        <div className="lg:max-w-[40%] md:max-w-[35%] p-2 w-full aspect-[3/4] md:aspect-[4/5]">
          <img
            src="https://cdn.prod.website-files.com/678ca1173be404b47f58be4e/67b03fa3ac26ee049c25c795_sale-image.jpg"
            className="w-full h-full"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default SaleCard;
