const Order = require("../model/Order");
const asyncHandler = require("../utils/asyncHandler");
const generateOrderId = require("../utils/generateOrderId");
const AppError = require("../utils/AppError");
const Product = require("../model/Product");

// @desc    Create an order
// @route   POST /api/v1/products/productId/orders
// @access  Private
exports.createOrder = asyncHandler(async (req, res, next) => {
  // Hanlde user level not hight enough
  const product = await Product.findById(req.params.productId);

  // Handle no such product
  if (!product) {
    return next(new AppError("Please select a product.", 400));
  }

  // Handle user already made 2 orders of the same item
  const productOrders = await Order.find({
    userId: req.user.id,
    productId: req.params.productId,
  });

  if (productOrders.length >= 2) {
    return next(
      new AppError("You can only pre order 2 of the same items", 400)
    );
  }

  // Build up order id
  const lastestOrder = await Order.findOne({ userId: req.user.id }).sort({
    createdAt: -1,
  });

  // Create order
  const order = await Order.create({
    userId: req.user.id,
    orderId: generateOrderId(lastestOrder, req.user.id),
    productId: product.id,
    sku: product.sku,
    price: product.price,
  });

  res.status(201).json({
    status: "success",
    data: { order },
  });
});

// @desc    Get all orders of logged in user
// @route   Get /api/v1/orders
// @access  Private
exports.getOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({ userId: req.user.id }).populate({
    path: "productId",
    select: "name",
  });
  res.status(200).json({
    status: "success",
    data: { orders },
  });
});

// @desc    Get an order of an user
// @route   Get /api/v1/orders/:orderId
// @access  Private
exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.orderId);

  // Handler order not found
  if (!order) {
    return next(new AppError("Order not found.", 404));
  }

  // Handler order does not belong to logged in user
  if (order.userId.toString() !== req.user.id) {
    return next(new AppError("User not authorized", 401));
  }

  res.status(200).json({
    status: "success",
    data: { order },
  });
});
