const router = require("express").Router();

const { createFormAuth, createFormGuest } = require("../controller/forms");
const auth = require("../middlewares/auth");

router.route("/guest").post(createFormGuest);
router.route("/auth").post(auth, createFormAuth);

module.exports = router;
