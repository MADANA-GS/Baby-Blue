import React from "react";

const features = [
  {
    title: "Free Shipping",
    description: "We offer fast and free shipping on all orders above $50.",
    icon: "https://cdn.prod.website-files.com/678ca1173be404b47f58be4e/67b032a24b77b1d5954cc7e8_ic-shipping.svg",
  },
  {
    title: "Secure Payments",
    description: "Your transactions are safe with our end-to-end encryption.",
    icon: "https://cdn.prod.website-files.com/678ca1173be404b47f58be4e/67b032a24b77b1d5954cc7e8_ic-shipping.svg",
  },
  {
    title: "24/7 Support",
    description: "Need help? Our support team is available around the clock.",
    icon: "https://cdn.prod.website-files.com/678ca1173be404b47f58be4e/67b032a24b77b1d5954cc7e8_ic-shipping.svg",
  },
  {
    title: "Easy Returns",
    description: "Not satisfied? Return products hassle-free within 30 days.",
    icon: "https://cdn.prod.website-files.com/678ca1173be404b47f58be4e/67b032a24b77b1d5954cc7e8_ic-shipping.svg",
  },
];

const TrustCard = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:gap-10 gap-5  max-w-7xl mx-auto">
      {/* Left Image Section */}
      <div className="w-full md:w-[25%]">
        <img
          loading="lazy"
          src="https://cdn.prod.website-files.com/678ca1173be404b47f58be4e/67b0332f67098fb5c4ef4b64_perk-image.jpg"
          alt="Perks"
          className="w-full h-full rounded-sm object-cover shadow-lg"
        />
      </div>

      {/* Features Section */}
      <div className="w-full md:flex-1 grid grid-cols-1 md:grid-cols-2 py-4 gap-y-1  md:gap-x-6 md:gap-y-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col px-5 py-5 border-t items-start gap-3 bg-white rounded-xl"
          >
            <div className="flex items-center gap-3">
              <img
                loading="lazy"
                src={feature.icon}
                alt="icon"
                className="w-8 h-8"
              />
              <h3 className="text-2xl font-[300]">{feature.title}</h3>
            </div>
            <p className="text-base text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustCard;
