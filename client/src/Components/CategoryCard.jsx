import React from "react";

const CategoryCard = ({ image, title }) => {
  return (
    <div className="w-full mb-3">
      <div className="relative overflow-hidden rounded-sm aspect-[5/4]">
        <img
          src={image}
          alt={title}
          className="object-cover hover:scale-110 ease-in-out transition-all duration-700 w-full h-full
"
        />
        <p className="absolute md:block hidden bottom-4 left-4 bg-white text-black px-3 py-1 text-sm font-medium shadow-md">
          {title}
        </p>
      </div>
      <p className="mt-1 ml-2 text-xl md:hidden">{title}</p>
    </div>
  );
};

export default CategoryCard;
