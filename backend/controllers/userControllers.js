const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const bcrypt = require("bcrypt");

const secretKey='your-secret-key'

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const getUser = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

const createUser = asyncHandler(async (req, res) => {
  const { firstname, email, password } = req.body;

  if (!firstname || !email || !password) {
    return res.status(400).json({ message: "Please fill required fields" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User or email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstname,
      email,
      password: hashedPassword,
    });

    const accessToken = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '24h' });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  
    user.refreshToken = refreshToken;
    await user.save();

    const createdUser = await User.findById(user._id).select('-password -refreshToken');

    if (!createdUser) {
      return res.status(500).json({ message: "Something went wrong while registering" });
    }

    return res.status(201).json({ message: "User created successfully", createdUser, accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error registering user" });
  }
});

const logInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const accessToken = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '24h' });
    const refreshToken = user.generateRefreshToken(); // Assuming this method generates a refresh token
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
const options ={
  httpOnly:true,
  secure:true,
};

   
    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json({
      user: loggedInUser,
      accessToken,
      refreshToken,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error logging in' });
  }
});


const logOut=asyncHandler(async(req,res)=>{
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {$unset:{refreshToken:" "}},
      {new:true}
    );

   const options={
    httpOnly:true,
    secure:true,
    expires: new Date(0), // Expire the cookies immediately
    sameSite: 'strict' // Set your preferred sameSite option
   }

   res.clearCookie("accessToken",options);
   res.clearCookie("refreshToken",options);
   return res.status(200).json({message:"User logged out"});

  } catch (error) {
    return res.status(500).json({message:"Error logging out"});
  }
})

module.exports = { getUser, createUser, logInUser,logOut };
