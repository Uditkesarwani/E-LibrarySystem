const express = require('express');
const AuthenticationRoute = express.Router()
const Signup = require("../Models/Signup_model");
const Book = require("../Models/Books_model");
const issueBook = require("../Models/issueBook_model");
const Return = require("../Models/Return_model");
const fs = require('fs')

AuthenticationRoute.get("/getStudent", async (req, res) => {});

AuthenticationRoute.post("/signupStudent", async (req, res) => {
  let { name, gender, address, phone, email, password, role } = req.body;
  try{
  const Student = await Signup.insertOne({
    name,
    gender,
    address,
    phone,
    email,
    password,
    role: "Student",
  });

  res.json({ success: true, msg: "Signup successfully" });
}catch(err){
  console.log('Error',err);
    res.json({ success: false, msg: "This email is already registered or every field is required" });
}
});

AuthenticationRoute.post("/login", async (req, res) => {
  // console.log(req.body.select);

  if (req.body.select === "Student") {
    const checksign = await Signup.findOne({
      email: req.body.email,
      role: "Student",
    });
    if (!checksign) {
      res.json({ success: false, msg: "email or password not matched" });
    } else {
      if (checksign.password === req.body.password) {
        res.json({
          success: true,
          msg: "success full login",
          route: "Studenthome",
          id: checksign._id,
          email: checksign.email,
        });
      } else {
        res.json({ success: false, msg: "email or password not matched" });
      }
    }
  } else {
    const checksign = await Signup.findOne({
      email: req.body.email,
      role: "Admin",
    });

    if (!checksign) {
      res.json({ success: false, msg: "email or password not matched" });
    } else {
      if (checksign.password === req.body.password) {
        res.json({
          success: true,
          msg: "success full login",
          route: "viewBook",
          id: checksign._id,
          email: checksign.email,
        });
      } else {
        res.json({ success: false, msg: "email or password not matched" });
      }
    }
  }
});


module.exports = AuthenticationRoute