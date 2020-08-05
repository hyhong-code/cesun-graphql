const asyncHandler = require("../utils/asyncHandler");
const Product = require("../model/Product");
const AppError = require("../utils/AppError");

// @desc    Create a product
// @route   POST /api/v1/products
// @access  Public
exports.createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    status: "success",
    data: { product },
  });
});

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    status: "success",
    data: { products },
  });
});

// @desc    Get all products
// @route   GET /api/v1/products/:slug
// @access  Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
  const product = await Product.findOne({ slug });
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});
