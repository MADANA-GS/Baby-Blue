import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ image, title }) => {
  return (
    <Link to={`/products/${title}`} className="w-full">
      <div className="relative overflow-hidden rounded-sm aspect-[3/2] md:aspect-[6/5]">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="object-cover hover:scale-110 ease-in-out transition-all duration-700 w-full h-full"
        />
        <p className="absolute md:block hidden bottom-4 left-4 bg-white text-black px-3 py-1 text-sm font-medium shadow-md">
          {title}
        </p>
      </div>
      <p className="mt-1 ml-1.5 text-lg md:hidden">{title}</p>
    </Link>
  );
};

export default CategoryCard;
