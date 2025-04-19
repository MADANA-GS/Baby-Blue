import React from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Title from "./Components/Title";

const App = () => {
  return (
    <div className="px-4 sm:px-[6vw] md:px-[7vw] lg:px-[9vw] xl:px-[12vw] 2xl:px-[15vw] ">
      <Navbar />
      <Hero />
      <Title/>
      
    </div>
  );
};

export default App;
