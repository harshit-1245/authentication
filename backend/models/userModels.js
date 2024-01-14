const mongoose = require('mongoose');
const jwt=require("jsonwebtoken")
require("dotenv").config()

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Place timestamps as an option of the Schema method
);



//generate refresh token
// Define a method to generate a refresh token

userSchema.methods.generateRefreshToken=function(){
  const refreshToken=jwt.sign(
      {_id:this._id}, // Payload with user ID or any other necessary information
      process.env.REFRESH_TOKEN_SECRET, // Replace with your refresh token secret
      {expiresIn: '7d'} // Set the expiration for the refresh token as needed
  );

  this.refreshToken=refreshToken; // Update the refreshToken field in the schema
  return refreshToken; // Return the generated refresh token
}

const User=mongoose.model('User',userSchema)

module.exports=User;