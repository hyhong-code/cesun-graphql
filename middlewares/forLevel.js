const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

module.exports = (...levels) =>
  asyncHandler(async (req, res, next) => {
    if (!levels.includes(req.user.level)) {
      return next(new AppError("You level is not yet high enough.", 403));
    }
    next();
  });
