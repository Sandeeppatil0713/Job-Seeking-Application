# JobZee — Backend API

REST API for the JobZee Job Seeking Application, built with Node.js, Express, and MongoDB.

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js v5
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens) + bcrypt
- **File Uploads:** express-fileupload + Cloudinary
- **Other:** cookie-parser, cors, dotenv, validator

---

## Project Structure

```
Backend/
├── config/
│   └── config.env          # Environment variables (not committed)
├── controllers/
│   ├── userController.js   # Register, login, logout, getUser
│   ├── jobController.js    # CRUD operations for jobs
│   └── applicationController.js  # Job application logic
├── database/
│   └── dbConnection.js     # MongoDB connection
├── middlewares/
│   ├── auth.js             # JWT authorization middleware
│   ├── catchAsyncError.js  # Async error wrapper
│   └── error.js            # Global error handler
├── models/
│   ├── userSchema.js       # User model
│   ├── jobSchema.js        # Job model
│   └── applicationSchema.js # Application model
├── routes/
│   ├── userRouter.js       # /api/v1/user
│   ├── jobRouter.js        # /api/v1/job
│   └── applicationRouter.js # /api/v1/application
├── utils/
│   └── jwtToken.js         # JWT token generator & cookie sender
├── app.js                  # Express app setup
└── server.js               # Server entry point + Cloudinary config
```

---

## API Endpoints

### User — `/api/v1/user`

| Method | Endpoint      | Access  | Description          |
|--------|---------------|---------|----------------------|
| POST   | `/register`   | Public  | Register a new user  |
| POST   | `/login`      | Public  | Login user           |
| GET    | `/logout`     | Private | Logout user          |
| GET    | `/getuser`    | Private | Get logged-in user   |

### Jobs — `/api/v1/job`

| Method | Endpoint         | Access   | Description              |
|--------|------------------|----------|--------------------------|
| GET    | `/getall`        | Public   | Get all active jobs      |
| POST   | `/post`          | Employer | Post a new job           |
| GET    | `/getmyjobs`     | Employer | Get employer's own jobs  |
| PUT    | `/update/:id`    | Employer | Update a job             |
| DELETE | `/delete/:id`    | Employer | Delete a job             |
| GET    | `/:id`           | Private  | Get single job details   |

### Applications — `/api/v1/application`

| Method | Endpoint                | Access     | Description                        |
|--------|-------------------------|------------|------------------------------------|
| GET    | `/jobseeker/getall`     | Job Seeker | Get all applications by job seeker |
| GET    | `/employer/getall`      | Employer   | Get all applications for employer  |
| POST   | `/post`                 | Job Seeker | Submit a job application           |
| DELETE | `/delete/:id`           | Job Seeker | Delete an application              |

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- Cloudinary account

### Installation

```bash
# Install dependencies
npm install

# Create the environment file
# Add the following to config/config.env
```

### Environment Variables

Create a `config/config.env` file in the root of the Backend folder:

```env
PORT=4000

MONGO_URI=your_mongodb_connection_string

FRONTEND_URL=http://localhost:5173

JWT_SECRET_KEY=your_jwt_secret
JWT_EXPIRE=7d
COOKIE_EXPIRE=5

CLOUDINARY_CLIENT_NAME=your_cloudinary_cloud_name
CLOUDINARY_CLIENT_API=your_cloudinary_api_key
CLOUDINARY_CLIENT_SECRET=your_cloudinary_api_secret
```

### Run the Server

```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

Server runs on `http://localhost:4000`

---

## User Roles

| Role        | Permissions                                              |
|-------------|----------------------------------------------------------|
| Job Seeker  | Browse jobs, apply with resume, manage own applications  |
| Employer    | Post/edit/delete jobs, view applications to their jobs   |

---

## Notes

- Resumes are uploaded as images (PNG, JPG, WEBP) and stored on Cloudinary.
- Passwords are hashed using bcrypt before storing.
- JWT token is stored in an HTTP-only cookie for security.
- The `config/config.env` file is excluded from version control via `.gitignore`.
