const User = require("../model/User");
const asyncHandler = require("../utils/asyncHandler");
const bodyFilter = require("../utils/bodyFilter");

// @desc    Update an user
// @route   PATCH /api/v1/users
// @access  Public
exports.updateLoggedinUser = asyncHandler(async (req, res, next) => {
  const updateObj = bodyFilter(
    req.body,
    "email",
    "firstName",
    "lastName",
    "address"
  );

  const user = await User.findByIdAndUpdate(req.user.id, updateObj, {
    new: true,
    runValidators: true,
  }).select(
    "-amazonOrderId -password -confirmPassword -passwordResetToken -resetTokenExpires -__v"
  );

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

// @desc    Delete an user
// @route   DELETE /api/v1/users
// @access  Public
exports.deleteLoggedinUser = asyncHandler(async (req, res, next) => {
  await User.findByIdAndDelete(req.user.id);
  res.status(204).json({ status: "success", data: {} });
});
