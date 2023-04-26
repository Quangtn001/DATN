const express = require("express");
const {
  registerValidations,
  loginValidations,
} = require("../validations/userValidations");

const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controller/usersController");
const router = express.Router();
router.post("/register", registerValidations, register);
router.post("/login", loginValidations, login);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);

module.exports = router;
