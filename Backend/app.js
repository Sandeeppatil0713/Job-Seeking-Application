import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import cloudinary from 'cloudinary';
import userRouter from './routes/userRouter.js';
import applicationRouter from './routes/applicationRouter.js';
import jobRouter from './routes/jobRouter.js';
import { dbConnection } from './database/dbConnection.js';
import { errorMiddleware } from './middlewares/error.js';

dotenv.config({ path: "./config/config.env" });

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

const app = express();

const allowedOrigins = [
    process.env.FRONTEND_URL,
    "https://job-seeking-application-ilvb.vercel.app",
    "http://localhost:5173",
].filter(Boolean);

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS blocked for origin: ${origin}`));
        }
    },
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    credentials: true,
};

app.use(cors(corsOptions));
app.options("/{*path}", cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));

// health check
app.get("/", (req, res) => {
    res.status(200).json({ message: "Backend is running" });
});

app.use('/api/v1/user', userRouter);
app.use('/api/v1/application', applicationRouter);
app.use('/api/v1/job', jobRouter);

dbConnection();

app.use(errorMiddleware);

export default app;
