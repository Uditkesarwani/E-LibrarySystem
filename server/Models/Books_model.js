const mongoose = require('mongoose')
const BookSchema = new mongoose.Schema({
    id:{type: String},
    title:{type: String},
    author:{type: String},
    catogory:{type :String},
    image:{type: String},
    copy:{type: Number},
})

const Book = mongoose.model('Book',BookSchema)
module.exports = Book;