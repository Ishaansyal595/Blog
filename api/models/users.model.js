import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
    required: true,
    trim: true,
  },
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  bio: { type: String, trim: true },
  avatar: { type: String, trim: true },
  password: { type: String, required: true, trim: true },
});

const User = mongoose.model("User", userSchema, "users");
export default User;
