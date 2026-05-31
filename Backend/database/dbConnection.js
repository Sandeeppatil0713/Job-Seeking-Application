import mongoose from 'mongoose';


 export const dbConnection = () =>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "JOB_SEEKING_APPLICATION",
        serverSelectionTimeoutMS: 10000,
        family: 4,
    }).then(()=>{
        console.log('Database connected Successfully');
    }).catch((err)=>{
        console.log(`Some error occurred while connecting to database : ${err}`)   
    });
};