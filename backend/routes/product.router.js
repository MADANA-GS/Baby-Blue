import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.controller.js";

const productRouter = express.Router();

// Create a new product
productRouter.post("/", createProduct);

// Get all products
productRouter.get("/", getAllProducts);

// Get a single product by ID
productRouter.get("/:id", getProductById);

// Update a product by ID
productRouter.put("/:id", updateProduct);

// Delete a product by ID
productRouter.delete("/:id", deleteProduct);

export default productRouter;
