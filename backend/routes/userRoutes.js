const express = require("express");
const {
  registerValidations,
  loginValidations,
} = require("../validations/userValidations");
const Authorization = require("../services/Authorization");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  getAUser,
  updateUser,
  getAllUser,
  deleteUser,
} = require("../controller/usersController");
const router = express.Router();
router.post("/register", registerValidations, register);
router.post("/login", loginValidations, login);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);
router.get("/user/:id", [Authorization.authorized], getAUser);
router.put("/user/:id", [Authorization.authorized], updateUser);
router.get("/all-user", [Authorization.authorized], getAllUser);
router.delete("/delete-user/:id", [Authorization.authorized], deleteUser);

module.exports = router;
