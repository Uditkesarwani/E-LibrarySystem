const express = require("express");
const StudentOprationRoute = express.Router();
const Signup = require("../Models/Signup_model");
const Book = require("../Models/Books_model");
const issueBook = require("../Models/issueBook_model");
const Return = require("../Models/Return_model");
const fs = require("fs");
const path = require("path");

const folderPath = path.join(__dirname, "uploads");
console.log(folderPath);

// StudentOprationRoute.get("/allBooks", async (req, res) => {
//   let books = await Book.find();
//   // console.log(books);

//   fs.readdir(folderPath, (err, files) => {
//     if (err) {
//       return console.log("Error reading folder:", err);
//     }
//     res.json({
//       success: true,
//       books: books,
//     });
//   });
// });

StudentOprationRoute.post("/filterBooks", async (req, res) => {
  let { filter } = req.body;
  if (filter === "") {
    let books = await Book.find({});
    res.json({ success: true, books: books });
  } else {
    let books = await Book.find({
      $or: [{ title: filter }, { catogory: filter }, { author: filter }],
    });
    res.json({ success: true, books: books });
  }
});

// StudentOprationRoute.post("/addToCart/:id", async (req, res) => {
//   let product = req.params.id;

//   let product2 = product.split("").splice(0, 16).join("");

//   let studentCart = await Signup.findOne({ _id: req.body.userId });
//   let items = await Book.find({ id: product2 });

//   items[0].copy = items[0].copy - 1;
//   await items[0].save();

//   items.map((item) => {
//     studentCart.cart.push({
//       _id: item._id,
//       id: product,
//       title: item.title,
//       author: item.author,
//       catogory: item.catogory,
//       image: item.image,
//     });
//   });

//   await studentCart.save();
//    res.send({success:true, length:studentCart.cart.length})
//   res.end();
// });

// StudentOprationRoute.post("/addToCart/:id", async (req, res) => {
//   // console.log(req.params.id);
//   let studentCart = await Signup.findOne({ _id: req.body.userId });
//   let items = await Book.find({ _id: req.params.id });

//   // console.log(studentCart);
//   // console.log(items);

//   items[0].copy = items[0].copy - 1;
//   // await items[0].save();
//   let msg = false;
//   items.map((item) => {
//     // console.log(item._id.toString());
//     let store = studentCart.cart.filter((a) => {
//       return a._id.toString() === item._id.toString();
//     });

//     if (store.length > 0) {
//       msg = true;
//       return (items[0].copy = items[0].copy + 1);
//     } else {
//       studentCart.cart.push({
//         _id: item._id,
//         id: item.id,
//         title: item.title,
//         author: item.author,
//         catogory: item.catogory,
//         image: item.image,
//       });
//     }
//   });

//   await studentCart.save();
//   await items[0].save();
//   res.send({ success: true, length: studentCart.cart.length, msg });
// });

StudentOprationRoute.get("/TotalissueCount/:id", async (req, res) => {
  const totalissue = await issueBook.find({ userId: req.params.id });

  if (totalissue) res.send({ success: true, length: totalissue.length });
});

StudentOprationRoute.get("/allcart/:id", async (req, res) => {
  let studentCart = await Signup.findOne({ _id: req.params.id });

  res.json({ success: true, length: studentCart.cart.length });

  res.end();
});

StudentOprationRoute.get("/allcartItem/:id", async (req, res) => {
  let studentCart = await Signup.findOne({ _id: req.params.id });

  res.json({ success: true, cartItem: studentCart.cart });
  res.end();
});

StudentOprationRoute.post("/removeCart/:id", async (req, res) => {
  const studentCart = await Signup.findOne({ _id: req.body.userId });

  //  console.log(req.params.id);

  let notUpdatedCart = studentCart.cart.filter((item) => {
    return item._id.toString() === req.params.id;
    // console.log(new objectiD(item._id));
    //  console.log(item._id);
  });

  // console.log(notUpdatedCart);

  let books = await Book.findOne({ _id: notUpdatedCart[0]._id });
  books.copy = books.copy + 1;
  await books.save();

  let updatedCart = studentCart.cart.filter((item) => {
    return item._id.toString() !== req.params.id;
  });

  studentCart.cart = updatedCart;
  await studentCart.save();

  res.json({ success: true });
});

StudentOprationRoute.post("/CheckOut/:id", async (req, res) => {
  let studentCart = await Signup.findOne({ _id: req.params.id });
  const { CheckId } = req.body;

  let checkIssueBook = await issueBook.find();
  let insertedCount = 0;

  for (let book of CheckId) {
    let total = await issueBook.find();
    let check = await issueBook.findOne({
      bookId: book._id,
      userId: req.params.id,
    });

    if (!check) {
      if (total.length < 3 || !check) {
        let updatedCart = studentCart.cart.filter((item) => {
          return item._id.toString() !== book._id;
        });
        studentCart.cart = updatedCart;

        await issueBook.insertOne({
          userId: req.params.id,
          userName: studentCart.name,
          bookId: book._id,
          entryId: book.id,
          BookName: book.title,
        });
        insertedCount++;
      }
    }

    // console.log(total.length);
  }
  await studentCart.save();
  return res.json({ success: true, inserted: checkIssueBook.length });
});

// StudentOprationRoute.post("/CheckOut/:id", async (req, res) => {

//  let studentCart = await Signup.findOne({ _id: req.params.id });
// //   console.log(studentCart);
// //   res.end()
// //  let updatedCart = studentCart.cart.filter((item) => {
// //     return item.id !== book.id;
// //   });
// //   studentCart.cart = updatedCart;

//   const { CheckId } = req.body;

//   let checkIssueBook = await issueBook.find();

//   if (checkIssueBook.length >= 3) {
//     return res.json({ success: true, message: "Maximum limit reached", length: checkIssueBook.length });
//   }

//   let insertedCount = 0;
//   for (let book of CheckId) {
//     if (checkIssueBook.length + insertedCount >= 3) {
//       break;
//     }

// //  console.log(book.id);
//     //  console.log(studentCart.cart)

//     // let studentCart = await Signup.findOne({ id: book.id });
//     // console.log(studentCart);

//     await issueBook.insertOne({ userId: req.params.id ,bookId: book.id,BookName:book.title });
//     insertedCount++;
//   }

//   await studentCart.save()

//   return res.json({ success: true, inserted: checkIssueBook.length });
// });

StudentOprationRoute.get("/TotalCheckOut/:id", async (req, res) => {
  const totalCart = await issueBook.find({ userId: req.params.id });
  return res.json({
    success: true,
    message: "Maximum limit reached",
    length: totalCart.length,
  });
});

StudentOprationRoute.get("/issueBook/:id", async (req, res) => {
  // console.log(req.params.id);

  const Books = await issueBook.find({ userId: req.params.id });
  // console.log(Books);

  res.json({ success: true, allBooks: Books });

  res.end();
});

// StudentOprationRoute.post("/returnBook/:id", async (req, res) => {
//   try {
//     let id = req.params.id;

//     let books = await Book.findOne({ _id: id });
//     if (!books) {
//       return res.status(404).json({ error: "Book not found" });
//     }

//     books.copy += 1;
//     await books.save();

//     const issuedRecord = await issueBook.findOne({
//       userId: req.body.userId,
//       bookId: id,
//     });

//     if (!issuedRecord) {
//       return res.status(404).json({ error: "Issued record not found" });
//     }

//     let nowDate = new Date();
//     let bookReturnDate = new Date(issuedRecord.expiryDate);

//     let diffInMs = nowDate - bookReturnDate;
//     let diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

//     if (diffInDays < 0) {
//       diffInDays = 0;
//     }

//     await Return.create({
//       userName: issuedRecord.userName,
//       bookName: issuedRecord.BookName,
//       issueDate: issuedRecord.createdAt,
//       expiryDate: issuedRecord.expiryDate,
//       returnDate: nowDate,
//       date: diffInDays,
//     });

//     let remainBook = await issueBook.deleteOne({ _id: issuedRecord._id });
//     res.json({ success: true, allBooks: remainBook });
//   } catch (error) {
//     console.error("Error returning book:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });



StudentOprationRoute.post("/returnBook/:id", async (req, res) => {
  try {
    let id = req.params.id;

    let books = await Book.findOne({ _id: id });
    if (!books) {
      return res.status(404).json({ error: "Book not found" });
    }

    books.copy += 1;
    await books.save();

    const issuedRecord = await issueBook.findOne({
      userId: req.body.userId,
      bookId: id,
    });

    if (!issuedRecord) {
      return res.status(404).json({ error: "Issued record not found" });
    }

    
   let nowDate = new Date();
let bookReturnDate = new Date(issuedRecord.expiryDate);


nowDate.setHours(0, 0, 0, 0);
bookReturnDate.setHours(0, 0, 0, 0);

let diffInMs = nowDate - bookReturnDate;
let diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));


   

    await Return.create({
      userName: issuedRecord.userName,
      bookName: issuedRecord.BookName,
      issueDate: issuedRecord.createdAt,
      expiryDate: issuedRecord.expiryDate,
      returnDate: nowDate,
      date: diffInDays,
    });

    let remainBook = await issueBook.deleteOne({ _id: issuedRecord._id });
    res.json({ success: true, allBooks: remainBook });
  } catch (error) {
    console.error("Error returning book:", error);
    res.status(500).json({ error: "Server error" });
  }
});



StudentOprationRoute.post("/addToCart/:id", async (req, res) => {
  let studentCart = await Signup.findOne({ _id: req.body.userId });
  let items = await Book.find({ _id: req.params.id });

  items[0].copy = items[0].copy - 1;
  let msg = false;
  items.map((item) => {
    let store = studentCart.cart.filter((a) => {
      return a._id.toString() === item._id.toString();
    });

    if (store.length > 0) {
      msg = true;
      return (items[0].copy = items[0].copy + 1);
    } else {
      studentCart.cart.push({
        _id: item._id,
        id: item.id,
        title: item.title,
        author: item.author,
        catogory: item.catogory,
        image: item.image,
      });
    }
  });

  await studentCart.save();
  await items[0].save();
  res.send({ success: true, length: studentCart.cart.length, msg });
});

StudentOprationRoute.post("/addwishlist/:wishId", async (req, res) => {
  let student = await Signup.findOne({ _id: req.body.userId });
  let books = await Book.find({ _id: req.params.wishId });
  let msg = false;

  books.map((item) => {
    let store = student.wishList.filter((a) => {
      return a._id.toString() === item._id.toString();
    });

    if (store.length > 0) {
      msg = true;
    } else {
      student.wishList.push({
        _id: item._id,
        id: item.id,
        title: item.title,
        author: item.author,
        catogory: item.catogory,
        image: item.image,
      });
    }
  });
  await student.save();

  res.send({ success: true, wishList: student.wishList, msg });
});



StudentOprationRoute.get("/getWishlist/:userId",async (req, res) => {

  let wish = await Signup.find({_id:req.params.userId})
  if(wish)
    res.send({success:true,books:wish[0].wishList}) 
});


StudentOprationRoute.post('/remove-Wishlist/:remId',async(req,res)=>{
  
    let student = await Signup.findOne({ _id: req.body.userId });
   const temp =  student.wishList.filter((item)=>{
       return item._id.toString()!== req.params.remId 
    })

     student.wishList = temp;
  await student.save();
  res.send({success:true})
    
})
// StudentOprationRoute.post("/returnBook/:id", async (req, res) => {
//   let id = req.params.id;
//   // console.log(id);

//   let books = await Book.findOne({ _id: id });
//   // console.log(books);

//   books.copy = books.copy + 1;
//   await books.save();

//   const returnBook = await issueBook.findOne({ userId: req.body.userId });

//   let nowDate = new Date();
//   let bookReturnDate = new Date(returnBook.expiryDate);

//   if (nowDate > bookReturnDate) {
//     const diffInMs = nowDate - bookReturnDate;
//     const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

//     await Return.insertOne({
//       userName: returnBook.userName,
//       date: diffInDays,
//       issueDate: new Date(returnBook.createdAt),
//       bookName: returnBook.BookName,
//     });
//   } else {
//     const diffInMs = nowDate - bookReturnDate;
//     const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
//     await Return.insertOne({
//       userName: returnBook.userName,
//       date: diffInDays,
//       issueDate: new Date(returnBook.createdAt),
//       expiryDate: new Date(returnBook.expiryDate),
//       bookName: returnBook.BookName,
//     });
//   }

//   let remainBook = await issueBook.deleteOne({ bookId: id });
//   res.json({ success: true, allBooks: remainBook });
// });

module.exports = StudentOprationRoute;
