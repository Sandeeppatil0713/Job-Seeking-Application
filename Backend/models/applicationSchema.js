import mongoose from "mongoose";
import validator from 'validator';

const applicationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Provide Your Name"],
        minLength:[3, "name must contain atleast 3 characters"],
        maxLength:[30,"Name doesn't excced 30 characters"],
    },
    email:{
        type:String,
        validate:[validator.isEmail,"please provide a valid email"],
        required:[true, "Please provide email"],
    },
    coverLetter:{
        type:String,
        required:[true, "Please Provide Cover letter"]
    },
    phone:{
        type:Number,
        required:[true,"Please Provide Phone Number"],
    },
    address:{
        type:String,
        required:[true,"Please Provide address"]
    },
    resume:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },
    },
    applicantID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        role:{
            type:String,
            enum:["Job Seeker"],
            required:true
        }
    },
    employerID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        role:{
            type:String,
            enum:["Employer"],
            required:true
        }
    },
});

export const Application = mongoose.model("Application",applicationSchema)