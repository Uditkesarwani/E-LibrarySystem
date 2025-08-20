const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const Signup = require("./Models/Signup_model");
const Book = require("./Models/Books_model");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const issueBook = require("./Models/issueBook_model");
const Return = require("./Models/Return_model");
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASS

const AuthenticationRoute = require('./routes/AuthenticationRoute')
const StudentOprationRoute = require('./routes/StudentOprationRoute')
const AdminOprationsRoute  = require('./routes/AdminOprationsRoute')

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(mongoURI)
  .then(() => console.log("Database is Connected"))
  .catch((err) => console.log("Connection err", err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const newfileName = Date.now() + path.extname(file.originalname);
    cb(null, newfileName);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 3,
};

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("only image is alloawed to upload!! "));
  }
};

const upload = multer({
  storage: storage,
  limits: limits,
  fileFilter: fileFilter,
});

app.get("/", (req, res) => {
  res.send("hey dev");
});


app.use('/auth',AuthenticationRoute)
app.use('/admin',AdminOprationsRoute)
app.use('/student',StudentOprationRoute)


// app.post('/addAdmin',async(req,res)=>{
//   const checkAdmin = await Signup.findOne({role:'Admin'})
//   if(!checkAdmin){
//     await Signup.insertOne({
//       name:'admin',
//       gender:'male',
//       address:'localadress',
//       phone:'1234564321',
//       email:adminEmail,
//       password:adminPassword,
//       role:'Admin'
//     })
//   }else{
     
//     return;
//   } 
 
  
// })


app.post("/admin/add-book", upload.single("image"), async (req, res) => {
  try {
    // console.log(req.body);
    // console.log(req.file);
    const newBook = new Book({
      id: req.body.id,
      title: req.body.title,
      author: req.body.author,
      catogory: req.body.catogory,
      copy: req.body.copy,
      image: req.file.filename, // Save just the filename or path
    });

    await newBook.save();

    res.json({ success: true, msg: "Book added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});


app.post("/admin/update-book/:id", upload.single("image"), async (req, res) => {
  try {
    const delbook = await Book.findOne({ _id: req.params.id });

    fs.unlink(folderPath + "/" + delbook.image, (err) => {
      if (err) {
        return console.log(" image updated failed:", err.message);
      }
      console.log(" image Updated successfully!");
    });

    await issueBook.updateMany(
      { BookName: delbook.title },
      { $set: { BookName: req.body.title } }
    );
    await Return.updateMany(
      { bookName: delbook.title },
      { $set: { bookName: req.body.title } }
    );

    const book = await Book.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          author: req.body.author,
          catogory: req.body.catogory,
          copy: req.body.copy,
          image: req.file.filename,
        },
      }
    );
    res.json({ success: true, msg: "Book updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
});



const folderPath = path.join(__dirname, "uploads");
// console.log(folderPath);

app.get("/student/allBooks", async (req, res) => {
  let books = await Book.find();
  // console.log(books);

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return console.log("Error reading folder:", err);
    }
    res.json({
      success: true,
      books: books,
    });
  });
});



app.post("/admin/delete-book/:id", async (req, res) => {
  const delbook = await Book.findOne({ _id: req.params.id });
  await issueBook.deleteMany({ BookName: delbook.title });
  await Return.deleteMany({ bookName: delbook.title });

  let studentCart = await Signup.find();
  studentCart.map(async (student) => {
    if (student.cart.length > 0) {
      const update = student.cart.filter((item) => {
        return item.title !== delbook.title;
      });
      student.cart = update;
    }
    await student.save();
  });

  let deleteBook = await Book.deleteOne({ _id: req.params.id });

  if (deleteBook) res.json({ success: true, books: deleteBook });
});


app.listen(4000, () => {
  console.log("server started");
});






