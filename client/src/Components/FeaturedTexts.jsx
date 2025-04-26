import React from "react";

const LogoMarquee = () => {
  const logos = [
    { id: 1, name: "Feminine Vibes" }, // Women's T-shirt collection
    { id: 2, name: "Bold & Brave" }, // Men's T-shirt collection
    { id: 3, name: "Tiny Trendsetters" }, // Kids' T-shirt collection
    { id: 4, name: "Street Style" }, // Unisex T-shirt collection
    { id: 5, name: "Effortless Chic" }, // Women's T-shirt collection
    { id: 6, name: "Urban Legends" }, // Men's T-shirt collection
    { id: 7, name: "Kiddie Cool" }, // Kids' T-shirt collection
    { id: 8, name: "Retro Vibes" }, // Unisex T-shirt collection
    { id: 9, name: "Everyday Essentials" }, // Unisex T-shirt collection
    { id: 10, name: "Graphic Magic" }, // Unisex T-shirt collection
  ];

  // Double the array for continuous scrolling
  const scrollLogos = [...logos, ...logos];

  return (
    <div className="w-full  py-10">
      <div className="overflow-hidden relative">
        <div className="flex">
          {/* First marquee row */}
          <div
            className="flex py-3 animate-marquee whitespace-nowrap"
            style={{
              animation: "scroll 45s linear infinite",
            }}
          >
            {scrollLogos.map((logo , index) => (
              <div
                key={index}
                className="flex items-center justify-center mx-4 bg-white  rounded-md shadow-md h-24 w-48"
              >
                <span className="text-gray-500 font-medium text-lg">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>

          {/* Second marquee row (duplicate for seamless loop) */}
          <div
            className="flex py-3 animate-marquee2 whitespace-nowrap absolute left-0"
            style={{
              animation: "scroll2 45s linear infinite",
            }}
          >
            {scrollLogos.map((logo , index) => (
              <div
                key={index}
                className="flex items-center justify-center mx-4 bg-white rounded-md shadow-md h-24 w-48"
              >
                <span className="text-gray-500 font-medium text-lg">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes scroll2 {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LogoMarquee;
