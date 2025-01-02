import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const userSchema = new mongoose.Schema({
    name : String,
    profileImage : {
        type : String,
        default : "defaultIcons/user.png"
    },
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
    },
},{
    timestamps : true,
});


userSchema.methods.comparePassword = async function(password){
    const result = await bcrypt.compare(password,this.password);
    return result;
}

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
        return next();
    }
    return next();
})

const User = mongoose.models.User || mongoose.model("User",userSchema);

export default User;