const router = require("express").Router();

const auth = require("../middlewares/auth");
const limitTo = require("../middlewares/limitTo");
const {
  updateLoggedinUser,
  deleteLoggedinUser,
} = require("../controller/users");

router
  .route("/")
  .patch(auth, limitTo("USER"), updateLoggedinUser)
  .delete(auth, limitTo("USER"), deleteLoggedinUser);

module.exports = router;
