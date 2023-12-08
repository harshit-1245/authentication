const asyncHandler=require('express-async-handler')
const User=require('../models/userModels')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


const getUser=asyncHandler(async(req,res)=>{
    try {
        const users=await User.find();
        res.json(users)
    } catch (error) {
        res.status(500).json({message: "Error fetching users"})
    }
})

const createUser=asyncHandler(async(req,res)=>{
    const {firstname,email,password}=req.body;

    const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const namePattern = /^[A-Za-z\s]+$/;

     // Check if the email matches the regex pattern
  if (!emailPattern.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Check if the password matches the regex pattern
  if (!passwordPattern.test(password)) {
    return res.status(400).json({ message: 'Password does not meet requirements' });
  }

  // Check if the name matches the regex pattern
  if (!namePattern.test(firstname)) {
    return res.status(400).json({ message: 'Invalid name format' });
  }
  const hashedPassword=await bcrypt.hash(password,10);
    try {
      const user=await User.create({firstname,email,password:hashedPassword});
      const token=jwt.sign({userId:user._id},'your_secret_key');
      res.status(201).json({ message: 'User created successfully', user, token });

    } catch (error) {
  
        res.status(500).json({ message: 'Error creating user' });
    }
})
const loginUser=asyncHandler(async(req,res)=>{

})

const logOut=asyncHandler(async(req,res)=>{

})

module.exports={getUser,createUser,loginUser,logOut}