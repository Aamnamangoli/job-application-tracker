# 💼 Job Application Tracker

A full-stack web application that helps students and job seekers **track, manage, and organize their job applications** in one place.

The application provides secure user authentication, application management, dashboard statistics, search and filtering, and persistent storage using MongoDB.

---

## 📌 Project Overview

The **Job Application Tracker** is designed to simplify the process of managing multiple job applications.

Users can create an account, securely log in, add job applications, update their application status, search and filter applications, and delete applications when required.

The project follows a **MERN-based full-stack architecture**:

* **Frontend:** React.js
* **Backend:** Node.js + Express.js
* **Database:** MongoDB Atlas
* **Authentication:** JWT
* **HTTP Client:** Axios
* **Version Control:** Git & GitHub

---

## ✨ Features

### 🔐 Authentication

* User registration
* User login
* JWT-based authentication
* Protected application routes
* Secure token storage
* Automatic handling of expired/invalid sessions
* Logout functionality

### 📋 Job Application Management

Users can:

* Add a new job application
* Edit an existing application
* Delete an application
* View all saved applications
* Track application status

### 📝 Application Information

Each application can contain:

* Company Name
* Job Role
* Location
* Application Status
* Applied Date
* Email
* Phone
* Salary / Stipend
* Job Type
* Work Mode
* Job Link

### 📊 Application Status

The application supports four statuses:

* **Applied**
* **Interview**
* **Selected**
* **Rejected**

### 🔎 Search & Filter

Users can:

* Search by company name
* Search by job role
* Search by location
* Filter applications by status

### 📊 Dashboard

The dashboard provides an overview of job applications and their statuses, making it easier to monitor the job-search process.

### 🚪 Logout

A logout confirmation modal is provided to prevent accidental logout.

---

## 🛠️ Technologies Used

### Frontend

* React.js
* React Router
* Axios
* CSS
* Recharts

### Backend

* Node.js
* Express.js
* Mongoose
* CORS
* dotenv
* JSON Web Token (JWT)

### Database

* MongoDB Atlas

### Development Tools

* Visual Studio Code
* Git
* GitHub
* MongoDB Atlas
* MongoDB Compass

---

## 🏗️ Project Architecture

```text
Job Application Tracker
│
├── backend/
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Application.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── application.js
│   │   └── auth.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api.js
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── Applications.js
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   └── ...
│   │
│   ├── .env
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## 🔄 Application Flow

```text
User
 │
 ▼
Register / Login
 │
 ▼
JWT Authentication
 │
 ▼
Dashboard
 │
 ├── View Application Statistics
 │
 └── Manage Applications
       │
       ├── Add
       ├── View
       ├── Edit
       ├── Delete
       ├── Search
       └── Filter
              │
              ▼
         Express API
              │
              ▼
          MongoDB Atlas
```

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Move into the project:

```bash
cd job-application-tracker
```

---

# 🔧 Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

The backend uses the following start command:

```bash
npm start
```

For development with nodemon:

```bash
npm run dev
```

---

## 🔐 Backend Environment Variables

Create a file named:

```text
backend/.env
```

Add:

```env
MONGO_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING
PORT=5000
CLIENT_URL=http://localhost:3000
JWT_SECRET=YOUR_SECRET_KEY
```

### Example

```env
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/jobApplicationDB
PORT=5000
CLIENT_URL=http://localhost:3000
JWT_SECRET=your_secure_secret_key
```

### ⚠️ Important

Never upload your real `.env` file to GitHub.

Your `.gitignore` should contain:

```text
node_modules/
.env
.env.*
!.env.example
```

---

# ▶️ Start the Backend

From the `backend` directory:

```bash
npm start
```

The backend should run on:

```text
http://localhost:5000
```

Expected output:

```text
Server running on port 5000
MongoDB connected
```

---

# 🎨 Frontend Setup

Open a **new terminal**.

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

---

## 🔐 Frontend Environment Variable

Create:

```text
frontend/.env
```

Add:

```env
REACT_APP_API_URL=http://localhost:5000
```

The frontend uses this URL to communicate with the Express backend.

---

# ▶️ Start the Frontend

From the `frontend` directory:

```bash
npm start
```

The application will normally open at:

```text
http://localhost:3000
```

---

# 🔗 API Overview

The backend provides authentication and job-application APIs.

## Authentication

### Register

```http
POST /auth/register
```

Used to create a new user account.

### Login

```http
POST /auth/login
```

Used to authenticate an existing user and receive a JWT token.

---

## Applications

All application management routes require authentication.

The token is sent using:

```http
Authorization: Bearer YOUR_TOKEN
```

### Get Applications

```http
GET /applications
```

### Add Application

```http
POST /applications
```

### Update Application

```http
PUT /applications/:id
```

### Delete Application

```http
DELETE /applications/:id
```

---

# 🗄️ Database

The project uses **MongoDB Atlas** for persistent data storage.

The main collections are:

```text
Users
Applications
```

### User

Stores user authentication information.

### Application

Stores job application information such as:

```text
Company
Job Role
Location
Status
Applied Date
Email
Phone
Salary
Job Type
Work Mode
Job Link
```

---

# 🔒 Authentication & Security

The application uses **JSON Web Tokens (JWT)** to protect authenticated routes.

The general authentication flow is:

```text
Login
  │
  ▼
Backend verifies credentials
  │
  ▼
JWT token generated
  │
  ▼
Token stored in browser
  │
  ▼
Token sent with protected API requests
  │
  ▼
Backend verifies token
  │
  ▼
Application data accessed
```

If the token becomes invalid or expires, the application clears the stored authentication information and redirects the user to the login page.

---

# 🔍 Search & Filtering

Applications can be searched using:

* Company name
* Job role
* Location

Applications can also be filtered using:

```text
All Status
Applied
Interview
Selected
Rejected
```

---

# 📊 Dashboard

The dashboard provides a quick overview of the user's job-search activity.

It can display application statistics such as:

* Total Applications
* Applied
* Interviews
* Selected
* Rejected

The project also includes a visual representation of application status using a chart.

---

# 🧪 Testing Checklist

Before considering the application complete, verify the following:

* [ ] User registration works
* [ ] User login works
* [ ] JWT token is generated
* [ ] Dashboard opens after login
* [ ] Applications are loaded from MongoDB
* [ ] New application can be added
* [ ] Application can be edited
* [ ] Application can be deleted
* [ ] Search works
* [ ] Status filtering works
* [ ] Logout works
* [ ] Login works again after logout
* [ ] Application data remains stored in MongoDB
* [ ] Invalid/expired token redirects the user to login
* [ ] `.env` is not tracked by Git

---

# 📸 Screenshots

Add screenshots of your application here.

Recommended screenshots:

### Login Page

```text
Add your Login screenshot here
```

### Registration Page

```text
Add your Register screenshot here
```

### Dashboard

```text
Add your Dashboard screenshot here
```

### Applications Page

```text
Add your Applications screenshot here
```

### Add/Edit Application

```text
Add your Application Form screenshot here
```

---

# 🚀 Future Scope

The project can be extended with:

* Email notifications for interviews
* Interview scheduling
* Application deadlines and reminders
* Resume upload
* Multiple resume management
* Job portal integration
* Advanced analytics
* Export applications to CSV/PDF
* Dark mode
* Profile management
* Password reset
* Cloud deployment
* Mobile-responsive improvements
* Job recommendations

---

# 🎯 Learning Outcomes

Through this project, the following concepts were implemented:

* React component development
* React state management
* React Router
* REST API integration
* Axios
* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT authentication
* Protected API routes
* CRUD operations
* Search and filtering
* Git and GitHub
* Environment variables
* Full-stack application development

---

# 💼 Project Highlights for Resume

You can describe the project on your resume as:

> **Job Application Tracker — Full-Stack Web Application**
> Developed a full-stack job application management system using React.js, Node.js, Express.js, and MongoDB Atlas. Implemented JWT-based authentication, protected REST APIs, CRUD operations, application status tracking, search and filtering, dashboard statistics, and persistent database storage.

### Key technologies

```text
React.js | Node.js | Express.js | MongoDB | Mongoose | JWT | Axios | Git | GitHub
```

---

# 📚 Git Workflow

To save future changes:

```bash
git status
```

Add changes:

```bash
git add .
```

Commit:

```bash
git commit -m "Describe your changes"
```

Push:

```bash
git push origin main
```

---

# ⚠️ Security Notice

Never commit sensitive information such as:

* MongoDB passwords
* MongoDB connection strings containing passwords
* JWT secrets
* API keys
* Private credentials

Use `.env` files for local secrets and make sure they are included in `.gitignore`.

---

# 👩‍💻 Author

**Aamna Mangoli**

Computer Science & Engineering Student

---

# ⭐ Project

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is created for **educational and portfolio purposes**.

## Screenshots

### Login

![Login Page](screenshots/login.png)

### Register

![Register Page](screenshots/register.png)

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Applications

![Applications Page](screenshots/applications.png)

### Profile

![Profile Page](screenshots/profile.png)

### Settings

![Settings Page](screenshots/settings.png)