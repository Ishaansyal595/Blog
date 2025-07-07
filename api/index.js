import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import AuthRoute from "./routes/AuthRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import CategoryRoutes from "./routes/CategoryRoutes.js";
import PublicCategoryRoutes from "./routes/PublicCatgoryRoutes.js";
import BlogRoutes from "./routes/BlogRoutes.js";
import PublicBlogRoutes from "./routes/PublicBlogRoutes.js";
import path from "path";
import MailRouter from "./routes/SendMailRoutes.js";

dotenv.config();

const port = process.env.PORT;
const frontend = process.env.FRONTEND_URL;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: frontend,
    credentials: true,
  })
);

app.use("/api/auth", AuthRoute);
app.use("/api/user", UserRoutes);

app.use("/api/category", CategoryRoutes);
app.use("/api/public/category", PublicCategoryRoutes);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/blogs", BlogRoutes);
app.use("/api/public/blogs", PublicBlogRoutes);

app.use("/api/public", MailRouter);

mongoose
  .connect(process.env.MONGODB_CONN, { dbName: "mern-blog" })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(`Error in Connecting to Database with Error: ${err}`);
  });

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
