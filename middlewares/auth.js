const AppError = require("../utils/AppError");
const User = require("../model/User");
const ayncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");

module.exports = ayncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Handle no token
  if (!token) {
    return next(new AppError("Authorization failed, please login.", 401));
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error(error);
    // Handle tempered json web token
    return next(new AppError("Authorization failed, please login.", 401));
  }

  const user = await User.findById(decoded.id);

  // Handler user account deleted
  if (!user) {
    return next(new AppError("User not found.", 404));
  }

  req.user = user;
  next();
});
