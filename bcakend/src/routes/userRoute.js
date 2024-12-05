const express = require("express");
const userRoute = express.Router();

//Controllers
const {
  handleSignupPage,
  handleLoginPage,
} = require("../controller/userController");

userRoute.post("/signup", handleSignupPage);
userRoute.post("/login", handleLoginPage);

module.exports = { userRoute };
