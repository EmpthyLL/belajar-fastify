const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
    },
    role:{
        type:String,
        enum:['Admin','Project Manager','Team Member'],
        default:'Team Member',
    },
})

const User = mongoose.model('user',UserSchema)

module.exports = {User}