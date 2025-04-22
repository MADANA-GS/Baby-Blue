import React from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Title from "./Components/Title";
import CategoryCard from "./Components/CategoryCard";
import ItemsDiv from "./Components/ItemsDiv";
import ProductCard from "./Components/ProductCard";
import ProductDiv from "./Components/ProductDiv";

import luffy from "./assets/luffy.png";

import { AnimatePresence, motion } from "framer-motion";

const App = () => {
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
  const products = [
    {
      title: "Blue Jacket",
      originalPrice: "120",
      discountPrice: "89",
      image:  luffy ,
    },
    {
      title: "Sneakers",
      originalPrice: "120",
      discountPrice: "89",
      image:
        "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
    },
    {
      title: "Blue Jacket",
      originalPrice: "120",
      discountPrice: "89",
      image:
        "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
    },
    {
      title: "Sneakers",
      originalPrice: "120",
      discountPrice: "89",
      image:
        "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
    },
  ];
  return (
    <div className="px-4 sm:px-[6vw] md:px-[7vw] lg:px-[9vw] xl:px-[12vw] 2xl:px-[15vw] ">
      <Navbar />
      <Hero />
      {/* Categories */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
          className="md:mb-28 sm:mb-14 mb-10"
        >
          <Title text1={"Categories"} text2={"Our collections"} />
          <ItemsDiv CardComponents={CategoryCard} items={categories} />
        </motion.div>
        {/* Feautured Products */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
          className="md:mb-28 sm:mb-14 mb-10"
        >
          <Title text1={"Exclusive Finds"} text2={"Featured Products"} />

          <ProductDiv
            CardComponents={ProductCard}
            gender={"Men"}
            items={products}
          />
          <ProductDiv
            CardComponents={ProductCard}
            gender={"Women"}
            items={products}
          />
        </motion.div>
        {/*  */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
          className="md:mb-28 sm:mb-14 mb-10"
        >
          <Title text1={"Now trending"} text2={"Latest Products"} />

          <ProductDiv
            CardComponents={ProductCard}
            gender={"Men"}
            items={products}
          />
          <ProductDiv
            CardComponents={ProductCard}
            gender={"Women"}
            items={products}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;
