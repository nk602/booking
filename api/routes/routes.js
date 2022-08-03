const express = require("express");
const userController   = require("../controllers/users");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register",  userController.register);
router.post("/login", userController.login);
router.get("/get-users",auth, userController.userListing);

module.exports = router;
