const userResolver = require("./user");
const productResolver = require("./product");

module.exports = {
  ...userResolver,
  ...productResolver,
};
