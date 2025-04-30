import mongoose from "mongoose";

const mainCategories = ["Men", "Women", "Kids", "Couple"];
const subCategories = [
  "Anime",
  "Oversized",
  "Hoodies",
  "Graphic Printed",
  "Sweatshirts",
  "Minimalist",
  "Couple T-Shirts",
];

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    qikinkId: {
      type: String,
      default: null,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
      enum: mainCategories,
      required: true,
    },
    subcategory: {
      type: String,
      enum: subCategories,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      required: true,
    },
    features: [
      {
        type: String,
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false, // By default, products are not featured
    },
    offers: [
      {
        description: { type: String }, // A short description of the offer
        discountPercentage: { type: Number, min: 0, max: 100 }, // Percentage discount (e.g., 20)
        validTill: { type: Date }, // Optional: When the offer expires
        terms: { type: String }, // Optional: Any specific terms for the offer (e.g., minimum purchase)
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
