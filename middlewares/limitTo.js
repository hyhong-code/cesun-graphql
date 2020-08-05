const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

module.exports = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("User not authorized to access this route.", 403)
      );
    }
    next();
  });
