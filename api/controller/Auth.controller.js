import User from "../models/users.model.js";
import { handleError } from "./../helpers/handleError.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// ==========================
// 📌 REGISTER CONTROLLER
// ==========================
export const Register = async (req, res, next) => {
  try {
    const { username, email, password, avatar } = req.body;

    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return next(handleError(409, "User Already Registered!"));
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    const user = new User({
      username,
      email,
      avatar,
      password: hashedPassword,
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "User Created Successfully!",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// ==========================
// 📌 LOGIN CONTROLLER
// ==========================
export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(handleError(404, "User not found"));
    }

    const comparePassword = await bcryptjs.compare(password, user.password);
    if (!comparePassword) {
      return next(handleError(401, "Invalid login details!"));
    }

    // ✅ FIXED: Use user.avatar instead of req.body.avatar
    // ✅ ADDED: expiresIn for better security
    const jwtToken = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: "7d" }
    );

    res.cookie("access", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    const existingUser = user.toObject({ getters: true });
    delete existingUser.password;

    res.status(200).json({
      success: true,
      user: existingUser,
      message: "Logged in Successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// ==========================
// 📌 GOOGLE LOGIN CONTROLLER
// ==========================
export const GoogleLogin = async (req, res, next) => {
  try {
    const { username, email, avatar } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if not exists
      const password = Math.round(Math.random() * 10000000).toString();
      const hashedPassword = bcryptjs.hashSync(password);

      const newUser = new User({
        email,
        username,
        avatar,
        password: hashedPassword,
      });

      await newUser.save();

      // ✅ FIXED: Refetch the newly created user
      user = await User.findOne({ email });
    }

    // ✅ ADDED: expiresIn for better security
    const jwtToken = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: "7d" }
    );

    res.cookie("access", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    const existingUser = user.toObject({ getters: true });
    delete existingUser.password;

    res.status(200).json({
      success: true,
      user: existingUser,
      message: "Logged in Successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// ==========================
// 📌 LOGOUT CONTROLLER
// ==========================
export const Logout = async (req, res, next) => {
  try {
    // ✅ FIXED: Removed invalid 2nd parameter (jwtToken), only options are needed
    res.clearCookie("access", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Logged out Successfully",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
