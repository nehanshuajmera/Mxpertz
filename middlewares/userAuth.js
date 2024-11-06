import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

/* User Authentication Middleware */
export const userAuth = async (req, res, next) => {
  try {
    // Get token from cookie or Authorization header
    const token =
      req.cookies.authToken ||
      (req.header("Authorization") &&
        req.header("Authorization").split(" ")[1]);
    if (!token) {
      return res.status(401).json({
        errorMessage:
          "Access denied: No authentication token found. Please log in and try again.",
      });
    }

    // Verify and decode token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified.id);
    if (!user) {
      return res.status(401).json({
        errorMessage:
          "Invalid or expired token: User account not found. Please log in again to continue.",
      });
    }

    // Attach user ID to req.user for authorization in further requests
    req.user = { id: user._id.toString() };
    next();
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(401).json({
      errorMessage: `Authorization error: Your session token is invalid or expired. Please log in again.`,
    });
  }
};

/* Helper Function: Authorize User for Restricted Routes */
export const authorizeUser = (req, res, next) => {
  const { id } = req.params;

  // Check if the logged-in user's ID matches the resource ID
  if (req.user.id !== id) {
    return res.status(403).json({
      errorMessage:
        "Permission denied: You are not authorized to perform this action on another user's account.",
    });
  }

  next();
};
