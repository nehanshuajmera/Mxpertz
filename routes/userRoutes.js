import express from "express";
const router = express.Router();
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  userSignin,
  userSignout,
  userSignup,
} from "../controllers/userController.js";

// Get all users
router.get("/", getAllUsers);

// Get user by id
router.get("/:id", getUser);

// User signup
router.post("/signup", userSignup);

// User signin
router.post("/signin", userSignin);

// User signout
router.post("/signout", userSignout);

// update user
router.patch("/:id", updateUser);

// delete user
router.delete("/:id", deleteUser);

export const userRoutes = router;