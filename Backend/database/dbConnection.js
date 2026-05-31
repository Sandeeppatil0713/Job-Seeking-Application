import mongoose from 'mongoose';


 export const dbConnection = () =>{
    mongoose.connect(process.env.MONGO_URI, {
    dbName:"JOB_SEEKING_APPLICATION",
    }).then(()=>{
        console.log('Database connected Successfully');
    }).catch((err)=>{
        console.log(`Some error ouccered while connecting to database : ${err}`)   
    });

};