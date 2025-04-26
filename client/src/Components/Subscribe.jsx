import React from "react";

const Subscribe = () => {
  const onSubmitHandle = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
  };
  return (
    <div className="text-center md:mb-28 mb-10">
      <p className="text-2xl font-[350] text-gray-800">
        Subscribe Now and get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
        ullam.
      </p>
      <form
        onSubmit={onSubmitHandle}
        className="w-full md:w-1/2 flex items-center mx-auto my-6 gap-3 border pl-3"
      >
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="w-full flex-1 outline-none "
        />
        <button
          type="submit"
          className="bg-gray-800 ml-2 uppercase text-white py-3 px-4 rounded-sm"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Subscribe;
