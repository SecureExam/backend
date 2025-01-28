const express = require("express");

//controller
const loginController = require("../controller/login");

const router = express.Router();

router.post("/login", loginController);

module.exports = router;
