const Product = require("../../model/Product");

module.exports = {
  createProduct: async ({ input }, req) => {
    try {
      if (!req.isAuth) throw new Error("Please log in");
      if (req.user.role !== "ADMIN") {
        throw new Error("User not authorized");
      }
      const product = await Product.create(input);
      return product;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getProduct: async ({ productId }, req) => {
    try {
      const product = await Product.findById(productId);
      return product;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  listProducts: async () => {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
