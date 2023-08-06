const { default: mongoose } = require("mongoose");

const userSchema={
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    token:{
        type:String,
        required:false,
        default:""
    }
};
const User=mongoose.model("users",userSchema);
module.exports=User;