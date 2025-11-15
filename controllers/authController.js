import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc Register new user --> done --> tested --> works
export const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password)
    return res
      .status(400)
      .json({ code: 400, status: "failed", message: "Please fill all fields" });

  console.log(req.body);
  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({
      code: 400,
      status: "failed",
      message: "mail already registered! Try another one",
    });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    fullname,
    email,
    password: hashedPassword,
  });

  if (user) {
    console.log("registered : ", email);
    res.status(201).json({
      code: 201,
      status: "success",
      message: "register successfull... Now you can login",
    });
  } else {
    res
      .status(400)
      .json({ code: 400, status: "failed", message: "Invalid user data" });
  }
};

// @desc Authenticate user --> done --> tested --> works
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("password");
  if (user && (await bcrypt.compare(password, user.password))) {
    console.log("login", user);
    res.status(201).json({
      code: 201,
      status: "success",
      message: "login successful",
      data: { token: generateToken(user._id) },
    });
  } else {
    res.status(401).json({
      code: 401,
      status: "failed",
      message: "Invalid mail or password",
    });
  }
};

// @desc Get user profile (Protected)
export const getMe = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  console.log("authorize user : ", user.email);
  res.status(201).json({
    code: 201,
    status: "success",
    message: "info fetched",
    data: user,
  });
};
