import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const isAdmin = (req, res, next) => {
  const token = req.cookies.access;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // Attach user to request
    req.user = user;

    if (user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
  });
};
