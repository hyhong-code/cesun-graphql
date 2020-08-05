const router = require("express").Router();

const { register, login, loadUser } = require("../controller/auth");
const auth = require("../middlewares/auth");

router.route("/").get(auth, loadUser);
router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
