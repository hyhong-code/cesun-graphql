const Form = require("../model/Form.js");
const Product = require("../model/Product");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const bodyFilter = require("../utils/bodyFilter");

exports.createFormAuth = asyncHandler(async (req, res, next) => {
  const { productId, subject, message } = req.body;

  if (!(productId && subject && message)) {
    return next(
      new AppError(
        "Please select a product then provide a subject and a message.",
        400
      )
    );
  }

  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  const form = await Form.create({
    isLoggedIn: true,
    userId: req.user.id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    productId,
    subject,
    message,
  });

  res.status(200).json({
    status: "success",
    data: { form },
  });
});

exports.createFormGuest = asyncHandler(async (req, res, next) => {
  const filteredBody = bodyFilter(
    req.body,
    "amazonOrderId",
    "firstName",
    "lastName",
    "message",
    "subject"
  );
  console.log(filteredBody);
  const form = await Form.create({ ...filteredBody, isLoggedIn: false });
  res.status(200).json({ status: "success", data: { form } });
});
