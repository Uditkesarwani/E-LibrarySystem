const express = require('express');
const AdminOprationsRoute = express.Router()
const Signup = require("../Models/Signup_model");
const Book = require("../Models/Books_model");
const issueBook = require("../Models/issueBook_model");
const Return = require("../Models/Return_model");
const fs = require('fs')
const path = require('path')



AdminOprationsRoute.get("/update-book/:id", async (req, res) => {
  let updateBook = await Book.findOne({ _id: req.params.id });

  res.json({ success: true, book: updateBook });
});




AdminOprationsRoute.get("/allReturnBook", async (req, res) => {
  const returnBook = await Return.find();

  res.json({ success: true, returnBook });
});

AdminOprationsRoute.get("/totalIssue", async (req, res) => {
  // console.log('hey');
  const allBooks = await issueBook.find();

  res.json({ success: true, allBooks });
});

module.exports = AdminOprationsRoute