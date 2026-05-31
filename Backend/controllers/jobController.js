import { catchAsyncError} from '../middlewares/catchAsyncError.js';
import {ErrorHandler} from '../middlewares/error.js';
import {Job} from '../models/jobSchema.js';

export const getAllJobs = catchAsyncError (async(req,res,next)=>{
    const jobs= await Job.find({
        expired:false
    });
    res.status(200).json({
        success:true,
        jobs,
    })
});

export const postJob = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if(role === "Job Seeker"){
        return next(new ErrorHandler("Job Seeker is not Allowed to access the resources",400));
    }
    const {
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryTo,
        salaryFrom,
    } = req.body;
   
    if(!title || !description || !category || !country || !city ||!location){
        return next(new ErrorHandler("Please Provide Full Job details", 400));
    }

    if((!salaryFrom || !salaryTo) && !fixedSalary){
        return next(new ErrorHandler("Please Provide Fixed Salary or Ranged Salary", 400));
    }
    if((salaryFrom || salaryTo) && fixedSalary){
        return next(new ErrorHandler("Cannot enter Fixed Salary and Ranged Salary together", 400));
    }

    const PostedBy = req.user._id;
    const job = await Job.create({
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryTo,
        salaryFrom,
        PostedBy
    })

    res.status(200).json({
        success:true,
        message:"Job posted Successfully",
        job,
    });
});

export const getmyJobs = catchAsyncError(async(req,res,next)=>{
    const {role} = req.user;
    if(role === "Job Seeker"){
        return next(new ErrorHandler("Job Seeker is not Allowed to access the resources",400));
    }
    const myjobs= await Job.find({
        PostedBy:req.user._id
    });
    res.status(200).json({
        success:true,
        myjobs,
    });
});

export const updateJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }
  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Job Updated!",
  });
});

export const deleteJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job Deleted!",
  });
});


export const getSingleJob = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return next(new ErrorHandler("Job not found.", 404));
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});


