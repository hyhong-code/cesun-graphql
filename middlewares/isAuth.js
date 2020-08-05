const User = require("../model/User");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Handle no token
  if (!token) {
    req.isAuth = false;
    return next();
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    // Handle jwt is tempered
    req.isAuth = false;
    return next();
  }

  const userId = decoded.id;
  const user = await User.findById(userId);

  // Handle user deleted
  if (!user) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.user = user;
  next();
};
