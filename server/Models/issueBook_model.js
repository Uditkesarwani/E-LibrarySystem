const mongoose = require('mongoose')

const IssueSchema = new mongoose.Schema({
    userId:{type: String},
    userName:{type: String},
    bookId:{type:String},
    BookName:{type:String},
    entryId:{type:String},
    createdAt: { type: Date,default: Date.now },
     expiryDate: {
    type: Date,
    default: () => {
      let date = new Date();
      date.setDate(date.getDate() + 7);  
      return date;
    }
  }
})

const issueBook = mongoose.model('issueBook',IssueSchema)
module.exports = issueBook