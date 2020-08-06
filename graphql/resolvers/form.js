const Form = require("../../model/Form");
const Product = require("../../model/Product");

module.exports = {
  createGuestForm: async ({ input }, req) => {
    try {
      const form = await Form.create({ ...input, isLoggedIn: false });
      return form;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  createAuthForm: async ({ input }, req) => {
    try {
      if (!req.isAuth) throw new Error("Please log in");
      const product = await Product.findById(input.product);
      if (!product) throw new Error("Product not found");
      let form = await Form.create({
        ...input,
        isLoggedIn: true,
        user: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
      });
      form = await form.populate("user product").execPopulate();
      return form;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
