import React from "react";
import category from "../assets/category.svg";

const Title = ({ text1, text2, img }) => {
  return (
    <div className=" flex flex-col gap-0.5 items-start">
      <div className="text-sm  flex gap-0.5 font-[300] items-center justify-center ">
        <img src={category} alt="" />
        <p>Categories</p>
      </div>
      <h1 className="md:text-3xl lg:text-4xl 2xl:text-5xl text-2xl   font-[400]">
        Our collections
      </h1>
    </div>
  );
};

export default Title;
