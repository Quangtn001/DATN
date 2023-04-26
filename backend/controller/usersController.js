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
  const { password, token } = req.body;
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await UserModel.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({
      errors: [{ msg: `Invalid token` }],
    });
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  user.password = hashedPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.passwordChangedAt = Date.now();
  await user.save();

  return res.status(200).json({
    success: user ? true : false,
    message: user ? "Updated password" : "Something went wrong!",
  });
};
