const userResolver = require("./user");
const productResolver = require("./product");
const orderResolver = require("./order");
const formResolver = require("./form");

module.exports = {
  ...userResolver,
  ...productResolver,
  ...orderResolver,
  ...formResolver,
};
