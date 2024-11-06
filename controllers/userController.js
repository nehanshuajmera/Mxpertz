import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { User } from "../models/userModel.js";

/* Create Token */
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

/* User Signup */
export const userSignup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.signup(username, email, password);
    const token = createToken(user._id, "User");

    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      // secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({ user: user.username, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* User Signin */
export const userSignin = async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    const user = await User.signin(usernameOrEmail, password);
    const token = createToken(user._id, "User");

    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      // secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ user: user.username, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* User Signout */
export const userSignout = async (req, res) => {
  try {
    res.clearCookie("authToken");
    res.status(200).json({ message: "User signed out" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* Get All Users */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* Get User */
export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* Update User */
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, oldPassword } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Object to store updates
    const updates = {};

    // Validate and add username to updates if provided
    if (username) {
      if (username === user.username) {
        return res
          .status(400)
          .json({ message: "Username is the same as the current one" });
      }
      if (!validator.matches(username, /^[a-z0-9_.-]{8,}$/)) {
        return res.status(400).json({
          message:
            "Username must be at least 8 characters and can contain lowercase letters, numbers, underscores, hyphens, and periods",
        });
      }
      // Check if username already exists (excluding current user)
      const userExists = await User.findOne({ username, _id: { $ne: id } });
      if (userExists) {
        return res.status(400).json({ message: "Username already taken" });
      }
      updates.username = username;
    }

    // Validate and add email to updates if provided
    if (email) {
      if (email === user.email) {
        return res
          .status(400)
          .json({ message: "Email is the same as the current one" });
      }
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }
      // Check if email already exists (excluding current user)
      const emailExists = await User.findOne({ email, _id: { $ne: id } });
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use" });
      }
      updates.email = email;
    }

    // If password update is requested, verify old password and validate new password
    if (password) {
      if (!oldPassword) {
        return res
          .status(400)
          .json({ message: "Old password is required to update password" });
      }

      // Verify the old password
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }

      const isSamePassword = await bcrypt.compare(password, user.password);
      if (isSamePassword) {
        return res
          .status(400)
          .json({
            message: "New password cannot be the same as the current password",
          });
      }

      if (
        !validator.isStrongPassword(password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      ) {
        return res.status(400).json({
          message:
            "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol",
        });
      }

      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }

    // Update the user document with validated and sanitized data
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* Delete User */
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
