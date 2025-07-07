import express from "express";
import { getUser, updateUser } from "../controller/User.controller.js";
import upload from "../config/multer.js";

const UserRoutes = express.Router();

UserRoutes.get("/get-user/:userId", getUser);
UserRoutes.put("/update-user/:userId", upload.single("file"), updateUser);

export default UserRoutes;
