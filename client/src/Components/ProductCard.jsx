import React from "react";

const ProductCard = ({ image, title, originalPrice, discountPrice }) => {
  return (
    <div className="w-full flex-col mb-3">
      <div className="relative overflow-hidden rounded-sm aspect-[3/4] md:aspect-[4/5]">
        <img
         loading="lazy"
          src={image}
          alt={title}
          className="object-cover hover:scale-110 ease-in-out transition-all duration-700 w-full h-full
"
        />
      </div>
      <div className="flex font-[350] flex-col ">
        <p className="mt-1 text-xl md:text-xl">{title}</p>
        <p className="flex font-[300] text-gray-700 items-start text-base mt-1  gap-2">
          ${discountPrice} <span className="line-through">{originalPrice}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
