const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/jwt").generateToken;
const verifyToken = require("../utils/jwt").verifyToken;


exports.registerUser = async (req, res) => {
  const { name, email, password, phone, income } = req.body;
  if (!name||!email||!password)
    return res.status(400).json({ message: "All fields are required" });

  if (await userModel.findOne({ email }))
    return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  console.log(hashed);
  const user = await userModel.create({ name, email, password: hashed, phone, income });
  const token = generateToken(user._id);
  console.log(token);

 
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    maxAge: 24*60*60*1000,
  });



  res.status(201).json({
    message: "User registered successfully",
    user: { _id:user._id, name:user.name, email:user.email, phone:user.phone, income:user.income }
  });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email||!password)
    return res.status(400).json({ message: "Email and password required" });

  const user = await userModel.findOne({ email });
  console.log(user);
  if (!user || !await bcrypt.compare(password, user.password))
    return res.status(401).json({ message: "Invalid credentials" });

  console.log("User ID in token:", user._id);

  const token = generateToken(user._id);
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    maxAge: 24*60*60*1000,
  });

  res.status(200).json({
    message: "Login successful",
    user: { _id:user._id, name:user.name, email:user.email, phone:user.phone, income:user.income }
  });
};
  

exports.logoutUser = async(req, res) => {
  res
    .clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    .status(200)
    .json({ message: 'Logged out successfully' })
  ;
  redirect("/login");
};

exports.getCurrentUser = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "No token provided" });

  const decoded = verifyToken(token);
  if (!decoded) return res.status(403).json({ message: "Invalid token" });

  const user = await userModel.findById(decoded.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json(user);
};

exports.updateUser = async (req, res) => {
  const { name, email, phone, income } = req.body;
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "No token provided" });

  const decoded = verifyToken(token);
  if (!decoded) return res.status(403).json({ message: "Invalid token" });

  const user = await userModel.findByIdAndUpdate(decoded.id, { name, email, phone, income }, { new: true });
  if (!user) return res.status(404).json({ message: "User not found" });

  res.status(200).json(user);
};



