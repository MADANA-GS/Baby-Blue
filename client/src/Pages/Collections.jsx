import React from "react";
import Title from "../Components/Title";
import CategoryCard from "../Components/CategoryCard";
import ItemsDiv from "../Components/ItemsDiv";

const Collections = () => {

  const categories = [
    {
      title: "Men",
      link: "/products/men",
      image: "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
    },
    {
      title: "Women",
      link: "/products/women",
      image: "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
    },
    {
      title: "Kids",
      link: "/products/kids",
      image: "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
    },
    {
      title: "Anime",
      link: "/products/anime",
      image: "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
    },
    {
      title: "Oversized",
      link: "/products/oversized",
      image: "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
    },
    {
      title: "Graphic Printed",
      link: "/products/graphic-printed",
      image: "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
    },
    {
      title: "Minimalist",
      link: "/products/minimalist",
      image: "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
    },
    {
      title: "Couple",
      link: "/products/couple",
      image: "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
    },
  ];
  
  
  return (
    <div className="w-full h-full flex flex-col items-start px-4 py-20 ">
      <Title text1={"Categories"} text2={"Our collections"} />
      <ItemsDiv CardComponents={CategoryCard} items={categories} />
    </div>
  );
};

export default Collections;
