const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    blogs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Blogs"
        }
    ],
    isAdmin:{
        type:Boolean,
        default:false
    },
    isVerified:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('User',userSchema);