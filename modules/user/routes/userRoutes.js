const express = require("express");
const router = express.Router();
const userController = require("../../user/controllers/userController");

router.post('/', userController.register);

module.exports = router;