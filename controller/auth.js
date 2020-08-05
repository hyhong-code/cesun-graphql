const User = require("../model/User");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const bodyFilter = require("../utils/bodyFilter");

// @desc    Register
// @route   POST /api/v1/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const filteredBody = bodyFilter(
    req.body,
    "email",
    "firstName",
    "lastName",
    "address",
    "password",
    "confirmPassword"
  );

  const user = await User.create(filteredBody);
  res.status(200).json({
    status: "success",
    data: { token: user.genJwtToken() },
  });
});

// @desc    Login
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  // Handle missing fields
  if (!(email && password)) {
    return next(new AppError("Password and email are required.", 400));
  }

  // Handle user not found
  if (!user) {
    return next(new AppError("User not found, please sign up.", 404));
  }

  // Handler user pssword incorrect
  if (!(await user.correctPassword(password))) {
    return next(new AppError("Password incorrect, please try again.", 401));
  }

  res.status(200).json({
    status: "success",
    data: { token: user.genJwtToken() },
  });
});

// @desc    Load User
// @route   GET /api/v1/auth
// @access  Private
exports.loadUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select(
    "-amazonOrderId -password -confirmPassword -passwordResetToken -resetTokenExpires -__v"
  );

  res.status(200).json({
    status: "success",
    data: { user },
  });
});
