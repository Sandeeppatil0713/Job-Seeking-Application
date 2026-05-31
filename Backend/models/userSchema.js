import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:[3, "Name must Contain 3 characters"],
        maxLength:[30, "Name cannot excced Contain 30 characters"]
    },
    email:{
        type:String,
        required:[true, "please provide your email"],
        validate:[validator.isEmail, "Plese Provide a valid Email"],
    },
    phone:{
        type:Number,
        required:[true,"Please Provide your phone number"]
    },
    password:{
        type:String,
        required:[true,"please provide your password"],
        minLength:[8, 'Password must Contain at least 8 Characters!!'],
        maxLength:[15, 'Password must Contain at least 15 Characters!!'],
        select:false
    },
    role:{
        type:String,
        required:[true,"Please provide your role"],
        enum:["Job Seeker", "Employer"],
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});

// Hassing the Password 

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password,10);
});

// Comparing Password 
userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

// creating Json web token for authorization
userSchema.methods.getJWTToken = async function (){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE,
    })
};

export const User = mongoose.model("User", userSchema);