const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register/:userType", authController.register);
router.post("/login/:userType", authController.login);
router.get("/refresh/:userType", authController.refreshAccessToken);

module.exports = router;
