const mongoose = require('mongoose')

const returnSchema = new mongoose.Schema({
    userName:{type: String},
    bookName:{type: String},
    date:{type: Number},
    issueDate:{type: Date},
    expiryDate:{type: Date},
    today: { type: Date,default: Date.now }
})
const Return = mongoose.model('Return',returnSchema);
module.exports = Return;