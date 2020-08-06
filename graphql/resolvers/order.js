const DataLoader = require("dataloader");
const Order = require("../../model/Order");
const generateOrderId = require("../../utils/generateOrderId");
const Product = require("../../model/Product");

module.exports = {
  getUserOrder: async ({ orderId }, req) => {
    try {
      if (!req.isAuth) throw new Error("Please log in");
      const order = await Order.findById(orderId).populate("user product");
      if (!order) {
        throw new Error("Order not found");
      }
      if (order.user.id !== req.user.id) {
        throw new Error("User not authorized");
      }
      return order;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  listUserOrders: async (args, req) => {
    try {
      if (!req.isAuth) throw new Error("Please log in");
      const orders = await Order.find({ user: req.user.id }).populate(
        "user product"
      );
      return orders;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  createOrder: async ({ productId }, req) => {
    try {
      if (!req.isAuth) throw new Error("Please log in");

      // Check if product exists
      const product = await Product.findById(productId);
      if (!product) throw new Error("Product not found");

      // Check if user already ordered this item twice
      const productOrders = await Order.find({
        user: req.user.id,
        product: productId,
      });
      if (productOrders.length >= 2) {
        throw new Error("You can only pre-order the same item twice");
      }

      // For generating order meaningful order id
      const latestOrder = await Order.findOne().sort({ createdAt: -1 });
      const order = await Order.create({
        product: productId,
        user: req.user.id,
        orderId: generateOrderId(latestOrder, req.user.id),
        sku: product.sku,
        price: product.price,
      });

      return { ...order._doc, user: req.user, product };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
