const authResolver = require("./auth");
const productResolver = require("./product");

module.exports = {
  ...authResolver,
  ...productResolver,
};
