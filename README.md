# JobZee — Frontend

React-based frontend for the JobZee Job Seeking Application, built with Vite.

---

## Tech Stack

- **Framework:** React 19
- **Bundler:** Vite
- **Routing:** React Router DOM v7
- **HTTP Client:** Axios
- **Notifications:** React Hot Toast
- **Icons:** React Icons

---

## Project Structure

```
Frontend/
├── public/
│   ├── CVs/                    # Sample CV images
│   ├── heroS.jpg               # Hero section image
│   ├── JobZeelogo.png          # App logo
│   ├── login.png               # Login page banner
│   ├── register.png            # Register page banner
│   └── notfound.png            # 404 page image
├── src/
│   ├── components/
│   │   ├── Application/
│   │   │   ├── Application.jsx     # Job application form
│   │   │   ├── MyApplication.jsx   # View submitted applications
│   │   │   └── ResumeModal.jsx     # Resume image preview modal
│   │   ├── Auth/
│   │   │   ├── Login.jsx           # Login page
│   │   │   └── Register.jsx        # Register page
│   │   ├── Home/
│   │   │   ├── Home.jsx            # Home page wrapper
│   │   │   ├── Hero.jsx            # Hero section with stats
│   │   │   ├── HowItWorks.jsx      # How it works section
│   │   │   ├── PopluarCategories.jsx # Job categories section
│   │   │   └── PopularCompanies.jsx  # Top companies section
│   │   ├── Job/
│   │   │   ├── Jobs.jsx            # All jobs listing
│   │   │   ├── JobDetails.jsx      # Single job detail view
│   │   │   ├── PostJobs.jsx        # Post a new job (Employer)
│   │   │   └── MyJobs.jsx          # Manage posted jobs (Employer)
│   │   ├── Layout/
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   └── Footer.jsx          # Footer with social links
│   │   └── NotFound/
│   │       └── NotFound.jsx        # 404 page
│   ├── App.jsx                 # Root component with routes
│   ├── App.css                 # Global styles
│   └── main.jsx                # Entry point + Context provider
├── index.html
└── package.json
```

---

## Pages & Routes

| Route               | Component        | Access      | Description                        |
|---------------------|------------------|-------------|------------------------------------|
| `/`                 | Home             | Private     | Landing page with stats & sections |
| `/login`            | Login            | Public      | User login                         |
| `/register`         | Register         | Public      | User registration                  |
| `/job/getall`       | Jobs             | Private     | Browse all active job listings     |
| `/job/:id`          | JobDetails       | Private     | View details of a single job       |
| `/application/:id`  | Application      | Job Seeker  | Submit application for a job       |
| `/applications/me`  | MyApplications   | Private     | View own applications              |
| `/job/post`         | PostJob          | Employer    | Post a new job listing             |
| `/job/me`           | MyJobs           | Employer    | Manage your posted jobs            |
| `*`                 | NotFound         | Public      | 404 page                           |

---

## Getting Started

### Prerequisites

- Node.js v18+
- Backend server running on `http://localhost:4000`

### Installation

```bash
# Install dependencies
npm install
```

### Environment Variables

If you need to change the backend URL, create a `.env` file in the Frontend root:

```env
VITE_API_BASE_URL=http://localhost:4000
```

> Currently the API base URL is hardcoded in each component as `http://localhost:4000`. Update it there if your backend runs on a different port.

### Run the App

```bash
# Development
npm run dev
```

App runs on `http://localhost:5173`

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

---

## Features

### Job Seeker
- Register and log in as a Job Seeker
- Browse all active job listings
- View full job details
- Apply for a job with name, email, phone, address, cover letter, and resume (image upload)
- View and delete own submitted applications

### Employer
- Register and log in as an Employer
- Post new job listings with title, category, location, description, and salary
- View, edit, and delete own posted jobs
- Mark jobs as expired
- View all applications submitted to their jobs with resume preview

---

## Context (Global State)

The app uses React Context (`Context` in `main.jsx`) to share:

| Value            | Description                        |
|------------------|------------------------------------|
| `isAuthorized`   | Whether the user is logged in      |
| `setIsAuthorized`| Update auth state                  |
| `user`           | Logged-in user object              |
| `setUser`        | Update user state                  |

---

## Notes

- The Navbar and Footer are hidden on the login/register pages using conditional CSS classes.
- Resume files must be PNG, JPG, or WEBP format (validated on the backend).
- The `.env` file is excluded from version control via `.gitignore`.
