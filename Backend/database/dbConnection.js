import mongoose from 'mongoose';

let isConnected = false;

export const dbConnection = async () => {
    if (isConnected) {
        console.log('Using existing database connection');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "JOB_SEEKING_APPLICATION",
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            family: 4,
        });

        isConnected = db.connections[0].readyState === 1;
        console.log('Database connected Successfully');
    } catch (err) {
        console.log(`Database connection error: ${err}`);
        throw err;
    }
};
