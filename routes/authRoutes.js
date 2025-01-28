const express = require("express");

//controller
const loginController = require("../controller/login");

const router = express.Router();

// @route POST /api/auth/login
// @desc Login a student
// @access Public
router.get("/login", loginController);

module.exports = router;
