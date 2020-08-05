const router = require("express").Router();

const orderRouter = require("./orders");
const {
  createProduct,
  getProducts,
  getProduct,
} = require("../controller/products");

router.use("/:productId/orders", orderRouter);

router.route("/").get(getProducts).post(createProduct);
router.route("/:slug").get(getProduct);

module.exports = router;
