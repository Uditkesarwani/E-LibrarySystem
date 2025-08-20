const mongoose = require('mongoose')
const SignupSchema = new mongoose.Schema({
    name:{type: String,required: true},
    gender:{type: String,required: true},
    address:{type :String,required: true},
    phone:{type: String,required: true},
    email:{type: String,unique:true,required: true},
    password:{type: String,required: true},
    role:{type : String},
    cart:{type: Array},
    wishList:{type: Array}
    
})

const Signup = mongoose.model('Signup',SignupSchema);
module.exports = Signup;