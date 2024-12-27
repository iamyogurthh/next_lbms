import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : true,
        required : true,
    },
    phone : {
        type : String,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    isAdmin : {
        type : Boolean,
        default : false,
    }
},{
    timestamps : true,
});

const User = mongoose.models.User || mongoose.model("User",userSchema);

export default User;