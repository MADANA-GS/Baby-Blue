import React, { lazy, Suspense, useContext } from "react";

import { motion } from "framer-motion";
const ProductCard = lazy(() => import("../Components/ProductCard"));
const ProductDiv = lazy(() => import("../Components/ProductDiv"));
const TrustCard = lazy(() => import("../Components/TrustCard"));
import Hero from "../Components/Hero";
import Title from "../Components/Title";
import CategoryCard from "../Components/CategoryCard";
import ItemsDiv from "../Components/ItemsDiv";


import SaleCard from "../Components/SaleCard";
import FeaturedTexts from "../Components/FeaturedTexts";
import Subscribe from "../Components/Subscribe";
import { AllContext } from "../Context/AllContext";

const categories = [
  {
    title: "Men",
    image:
      "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
  },
  {
    title: "Women",
    image:
      "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
  },
  {
    title: "Kids",
    image:
      "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
  },
  {
    title: "Couple",
    image:
      "https://cdn.prod.website-files.com/67b017470cb9f27876f6a2f1/67b0298bcb9d879ac7d60ea7_categories-06.jpg",
  },
];

const HomePage = () => {
  const {products } = useContext(AllContext);
  return (
    <div>
      <Hero />

      {/* Lazy-wrapped content */}
      <Suspense fallback={<div>Loading sections...</div>}>
        {/* Categories */}
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

        {/* Featured Products */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.1 }}
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

        {/* Trending Products */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.1 }}
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

        {/* Trust Section */}
        <div className="md:mb-32 sm:mb-14 mb-10">
          <TrustCard />
        </div>
        <SaleCard />
        <div className="md:mb-12 sm:mb-14 mb-10">
          <FeaturedTexts />
        </div>
        <Subscribe />
      </Suspense>
    </div>
  );
};

export default HomePage;
