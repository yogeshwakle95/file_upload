const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        // required:true
    },
    profile_pic:{
        type:String,
        default:null,
    },
    date:{
        type:Date,
    }
});

module.exports = mongoose.model('users',userSchema);