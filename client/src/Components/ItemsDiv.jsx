import React from "react";
import CategoryCard from "./CategoryCard";

const ItemsDiv = () => {
  const categories = [
    {
      title: "Men",
      image:
        "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
    },

    {
      title: "Men",
      image:
        "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
    },

    {
      title: "Men",
      image:
        "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
    },

    {
      title: "Men",
      image:
        "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
    },
  ];

  return (
    <div className="grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4">
      {categories.map((cat, index) => (
        <CategoryCard key={index} title={cat.title} image={cat.image} />
      ))}
    </div>
  );
};

export default ItemsDiv;
