import mongoose from "mongoose";

const  jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "Please provide job title"],
        minLength:[3,"Job title must contain at least 3 character"],
        maxLength:[50,"Job title cannot exceed 50 character"],
    },
    description:{
        type:String,
        required:[true, "Please provide Job Description"],
        minLength:[50,"Job description must contain at least 50 character"],
        maxLength:[350,"Job description cannot exceed 350 character"],
    },
    category:{
        type:String,
        required:[true,"Job Category is Required"]
    },
    country:{
        type:String,
        required:[true,"Job Country is Required"]
    },
    city:{
        type:String,
        required:[true,"Job City is Required"]
    },
    location:{
        type:String,
        required:[true,"Please Provide Exact location"],
        minLength:[50,"Job Location must contain at least 50 character"],
    },
    fixedSalary:{
        type:Number,
        min:[1000,"Fixed Salary Must contain at least 4 digits"],
        max:[999999999,"Fixed Salary cannot exceed 9 digits"]
    },
    salaryFrom:{
        type:Number,
        min:[1000,"Salary from Must contain at least 4 digits"],
        max:[999999999,"Salary from cannot exceed 9 digits"]
    },
    salaryTo:{
        type:Number,
        min:[1000,"Salary To Must contain at least 4 digits"],
        max:[999999999,"Salary To cannot exceed 9 digits"]
    },
    expired:{
        type:Boolean,
        default:false,
    },
    JobPostedOn:{
        type:Date,
        default:Date.now,
    },
    PostedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User", 
        required:true,
    }
});

export const Job = mongoose.model("Job",jobSchema);