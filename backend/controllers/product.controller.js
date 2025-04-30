import Product from "../models/product.model.js";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      qikinkId,
      originalPrice,
      discountPrice,
      image,
      images,
      category,
      subcategory,
      shortDescription,
      longDescription,
      features,
      isFeatured,
      offers,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !originalPrice ||
      !discountPrice ||
      !image ||
      !category ||
      !subcategory ||
      !shortDescription ||
      !longDescription
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    // Create new Product
    const newProduct = new Product({
      title,
      qikinkId: qikinkId || null,
      originalPrice,
      discountPrice,
      image,
      images: images || [],
      category,
      subcategory,
      shortDescription,
      longDescription,
      features: features || [],
      isFeatured: isFeatured || false,
      offers: offers || [],
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create product", error: error.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({
      message: "Products fetched successfully",
      count: products.length,
      products,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch products", error: error.message });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch product", error: error.message });
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update product", error: error.message });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete product", error: error.message });
  }
};
