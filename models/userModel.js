const mongoose = require('mongoose');

const usersSchema=new mongoose.Schema({
full_name: {
    type: String,
    required: [true, "full_name is required"],//validation from the database
    },
    email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    },
    birthday:{
        type:Date,
        required: [true, "password is required"]
    },
    gender:{
        type:String,
        required:[true,"gender is required"]
    },
    password: {
    type: String,
    required: [true, "password is required"],
    },
    resetcode:{
    type:Number,//it not a required field because it is only used when user forgets password
    }
},{
    timestamps:true,
});

const userModel = mongoose.model("users", usersSchema);

module.exports = userModel;