import React from "react";
import category from "../assets/category.svg";
import { motion } from "framer-motion";

const Title = ({ text1, text2 }) => {
  return (
    <div className=" flex  flex-col gap-0.5 mb-9 items-start">
      <div className="text-sm uppercase  flex gap-0.5 font-[300] items-center justify-center ">
        <img  loading="lazy" src={category} alt="" />
        <p>{text1}</p>
      </div>
      <h1 className="md:text-3xl lg:text-4xl 2xl:text-5xl text-2xl   font-[400]">
        {text2}
      </h1>
    </div>
  );
};

export default Title;
