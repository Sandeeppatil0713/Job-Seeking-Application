import {catchAsyncError} from '../middlewares/catchAsyncError.js';
import {ErrorHandler} from '../middlewares/error.js';
import { Application } from '../models/applicationSchema.js'
import cloudinary from 'cloudinary';
import {Job} from '../models/jobSchema.js'

export const employerGetAllApplications = catchAsyncError(async (req,res,next)=>{
    const { role } = req.user;
      if (role === "Job Seeker") {
        return next(
          new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
        );
      }

    const {_id} = req.user;
    const applications  =await Application.find({'employerID.user':_id});
    res.status(200).json({
        success:true,
        applications
    })
});

export const jobSeekerGetAllApplications = catchAsyncError(async (req,res,next)=>{
    const { role } = req.user;
      if (role === "Employer") {
        return next(
          new ErrorHandler("Employer not allowed to access this resource.", 400)
        );
      }

    const {_id} = req.user;
    const applications  =await Application.find({'applicantID.user':_id});
    res.status(200).json({
        success:true,
        applications
    })
});

export const jobSeekerDeleteApplication = catchAsyncError(async(req,res,next)=>{
    const { role } = req.user;
      if (role === "Employer") {
        return next(
          new ErrorHandler("Employer not allowed to access this resource.", 400)
        );
      }

    const {id}= req.params;
    const application = await Application.findById(id);
    if(!application){
        return next(new ErrorHandler("Oops, Application not found",404));
    }
    await application.deleteOne();
    res.status(200).json({
        success:true,
        message:"Application Deleted successfully",
    });
});

export const postApplication = catchAsyncError(async(req,res,next)=>{
     const { role } = req.user;
      if (role === "Employer") {
        return next(
          new ErrorHandler("Employer not allowed to access this resource.", 400)
        );
      }
      if(!req.files || Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Resume file Required"));
      }
      const {resume} = req.files;
      const allowedFormats = ['image/png','image/jpeg','image/webp']
      if(!allowedFormats.includes(resume.mimetype)){
        return next(new ErrorHandler("Invalid File Type, Please upload a png, jpg, webp format",400))
      }


      const cloudinaryResponse = await cloudinary.v2.uploader.upload(
        resume.tempFilePath
      );

      if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary Error:",
            cloudinaryResponse.error || "Unknown Cloudinary error"
        );
        return next(new ErrorHandler("Failed to Upload Resume",500))
      }

      const{name, email, coverLetter, phone, address, jobId} = req.body;
      const applicantID={
        user:req.user._id,
        role:"Job Seeker"
      };
      if(!jobId){
        return next(new ErrorHandler("Job not found!",400))
      }

      const jobDeatils = await Job.findById(jobId);
      if(!jobDeatils){
        return next(new ErrorHandler("Job not found!",400))
      }


    const employerID={
        user:jobDeatils.PostedBy,
        role:"Employer"
    };
    if(!name || !email || !coverLetter || !phone || !address || !applicantID || !employerID || !resume){
        return next(new ErrorHandler("Please fill All the Details",400))
    }
    const application = await Application.create({
        name,
        email,
        coverLetter,
        phone,
        address,
        applicantID,
        employerID,
        resume:{
            public_id:cloudinaryResponse.public_id,
            url:cloudinaryResponse.secure_url,
        }
    })
    res.status(200).json({
        success:true,
        message:"Application Submitted",
        application,
    })
});
