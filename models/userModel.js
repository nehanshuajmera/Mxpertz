import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

/* Statics Method */ 
userSchema.statics.signup = async function (username, email, password) {
  if (!username || !email || !password) {
    throw new Error("All fields are required");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Invalid Email");
  }
  if (!validator.matches(username, "^[a-z0-9_.-]{8,}$")) {
    throw new Error(
      "username must be at least 8 characters long and contain only small letters, numbers, underscores, hyphens, and periods"
    );
  }
  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
    })
  ) {
    throw new Error(
      "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol"
    );
  }

  const userExists = await this.findOne({ username });
  if (userExists) {
    throw new Error("User already exists");
  }

  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw new Error("Email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    username,
    email,
    password: hashedPassword,
  });

  return user;
};

/* Statics Method */
userSchema.statics.signin = async function (usernameOrEmail, password) {
  if (!usernameOrEmail || !password) {
    throw new Error("All fields are required");
  }

  const user = await this.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  });
  if (!user) {
    throw new Error("Invalid Credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrect Password");
  }

  return user;
};

export const User = mongoose.model("User", userSchema);
