import { handleError } from "../helpers/handleError.js";
import User from "../models/users.model.js";
import bcryptjs from "bcryptjs";
import cloudinary from "../config/cloudinary.js";

export const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId }).lean().exec();

    if (!user) {
      return next(handleError(404, "User not Found!"));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(handleError(404, error.message));
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    const { userId } = req.params;

    const user = await User.findById(userId);
    user.email = data.email;
    user.username = data.username;
    user.bio = data.bio;

    if (data.password && data.password.length >= 8) {
      const hashedPassword = bcryptjs.hashSync(data.password);
      user.password = hashedPassword;
    }

    if (req.file) {
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, {
          folder: "mern-blog",
          resource_type: "auto",
        })
        .catch((error) => {
          next(handleError(500, error.message));
        });

        user.avatar = uploadResult.secure_url
    }

    await user.save();

    const existingUser = user.toObject({ getters: true });
    delete existingUser.password;

    res.status(200).json({
      success: true,
      message: "Profile Updated.",
      user: existingUser,
    });
  } catch (error) {
    next(handleError(404, error.message));
  }
};
