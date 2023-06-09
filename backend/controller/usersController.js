const { validationResult } = require("express-validator");
const UserModel = require("../models/User.js");
const {
  hashedPassword,
  createToken,
  comparePassword,
} = require("../services/authServices");
const sendMail = require("../utils/sendMail.js");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
// @route POST /api/register
// @access Public
// @desc Create user and return a token
module.exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { name, email, password } = req.body;
    try {
      const emailExist = await UserModel.findOne({ email });
      if (!emailExist) {
        const hashed = await hashedPassword(password);
        const user = await UserModel.create({
          name,
          email,
          password: hashed,
        });
        const token = createToken({ id: user._id, name: user.name });
        return res
          .status(201)
          .json({ msg: "Your account has been created!", token });
      } else {
        // email already taken
        return res.status(400).json({
          errors: [{ msg: `${email} is already taken`, param: "email" }],
        });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json("Server internal error!");
    }
  } else {
    // validations failed
    return res.status(400).json({ errors: errors.array() });
  }
};

// @route POST /api/login
// @access Public
// @desc Login user and return a token

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        if (await comparePassword(password, user.password)) {
          const token = createToken({ id: user._id, name: user.name });
          if (user.admin) {
            return res.status(201).json({ token, admin: true });
          } else {
            return res.status(201).json({ token, admin: false });
          }
        } else {
          return res.status(400).json({
            errors: [{ msg: "password not matched!", param: "password" }],
          });
        }
      } else {
        return res.status(400).json({
          errors: [{ msg: `${email} is not found!`, param: "email" }],
        });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json("Server internal error!");
    }
  } else {
    //  validations failed
    return res.status(400).json({ errors: errors.array() });
  }
};

module.exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      errors: [{ msg: "Invalid email address", param: "email" }],
    });
  }

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      errors: [{ msg: `${email} is not found!`, param: "email" }],
    });
  }
  const resetToken = await user.createPasswordResetToken();
  await user.save();

  const html = `Xin vui lòng click vào đường dẫn dưới đây để thay đổi mật khẩu của bạn. Link này sẽ hết hạn sau 15 phút! <a href=${process.env.CLIENT}/reset-password/${resetToken}>Click here</a>`;

  const data = {
    email,
    html,
  };
  try {
    const rs = await sendMail(data);
    return res.status(200).json({
      success: true,
      rs,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      success: false,
      error: "Error sending email",
    });
  }
};

module.exports.resetPassword = async (req, res) => {
  const { password } = req.body;

  // Thực hiện các bước reset mật khẩu
  try {
    const user = await UserModel.findById(req.userId); // Lấy thông tin người dùng từ đường dẫn của yêu cầu hoặc thông qua xác thực trước đó

    if (!user) {
      return res.status(404).json({
        errors: [{ msg: `User not found` }],
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user.password = hashedPassword;
    user.passwordChangedAt = Date.now();
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated",
    });
  } catch (error) {
    return res.status(500).json({
      errors: [{ msg: `Something went wrong!` }],
    });
  }
};

module.exports.getAUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Server internal error!");
  }
};

module.exports.getAllUser = async (req, res) => {
  try {
    const users = await UserModel.find({ admin: false });
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server internal error!");
  }
};

module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await UserModel.deleteOne({ _id: id });
    return res.status(200).json({ message: "User has deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Server internal error!");
  }
};

module.exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userUpdate = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(userUpdate);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Server internal error!");
  }
};
