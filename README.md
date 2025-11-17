# 🏋️‍♂️ Gym Management System

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-19.1.0-61dafb.svg)

</div>

A comprehensive full-stack Gym Management System built with the MERN stack, designed to streamline fitness center operations. This enterprise-grade solution offers robust member management, automated membership tracking, and an intuitive admin dashboard for efficient gym administration.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Usage Guide](#-usage-guide)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## 🎯 Overview

The Gym Management System is a modern web application that provides a centralized platform for fitness centers to manage their daily operations efficiently. Built with scalability and user experience in mind, it offers real-time membership tracking, automated notifications, and comprehensive member analytics.

### Target Users

- 🏢 **Gym Owners & Administrators** - Complete oversight of gym operations
- 👥 **Fitness Center Staff** - Day-to-day member management
- 📞 **Receptionists** - Quick member check-ins and registration

---

## ✨ Features

### 🔐 Authentication & Security
- Secure user registration and login system
- JWT-based authentication with HTTP-only cookies
- Password encryption using bcrypt
- OTP-based password reset functionality
- Role-based access control

### 👤 Member Management
- Complete member registration and profile management
- Advanced member search and filtering
- Member status tracking (Active/Inactive)
- Detailed member profile views
- Member activity history

### 📊 Membership Plans
- Create and manage custom membership plans
- Flexible plan durations and pricing
- Plan assignment to members
- Automatic expiration tracking

### 📈 Dashboard & Analytics
- Real-time member statistics
- Monthly member registration trends
- Membership expiration alerts:
  - Members expiring within 3 days
  - Members expiring within 4-7 days
  - Expired memberships
- Active vs Inactive member insights

### 🔔 Notifications & Alerts
- Email notifications for password reset
- Membership expiration warnings
- Real-time toast notifications in UI

### 🎨 User Interface
- Clean, modern design with Tailwind CSS
- Material-UI components for enhanced UX
- Responsive layout for all devices
- Interactive data visualization
- Loading states and error handling

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.1.0 | UI Framework |
| React Router DOM | 7.6.2 | Client-side routing |
| Axios | 1.10.0 | HTTP client |
| Material-UI | 7.1.1 | Component library |
| Tailwind CSS | 3.4.17 | Utility-first CSS |
| React Toastify | 11.0.5 | Toast notifications |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | - | Runtime environment |
| Express.js | 5.1.0 | Web framework |
| MongoDB | - | Database |
| Mongoose | 8.16.0 | ODM for MongoDB |
| JWT | 9.0.2 | Authentication |
| Bcrypt.js | 3.0.2 | Password hashing |
| Nodemailer | 7.0.3 | Email service |
| CORS | 2.8.5 | Cross-origin resource sharing |

---

## 🏗️ Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │         │                 │
│  React Frontend │ ──────► │  Express API    │ ──────► │  MongoDB        │
│  (Port 3000)    │ ◄────── │  (Port 5000)    │ ◄────── │  Database       │
│                 │         │                 │         │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
        │                           │
        │                           │
        ▼                           ▼
   Tailwind CSS              JWT Auth + Nodemailer
   Material-UI               Cookie Parser + CORS
```

**Key Components:**
- **Frontend:** Single Page Application (SPA) with React Router
- **Backend:** RESTful API with Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT tokens stored in HTTP-only cookies
- **Email Service:** Nodemailer for transactional emails

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v6.0.0 or higher) - Comes with Node.js
- **MongoDB** (v4.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)

### Verify Installation

```powershell
node --version
npm --version
mongod --version
git --version
```

---

## 🚀 Installation

### 1. Clone the Repository

```powershell
git clone https://github.com/MHuzaifaMemon/GymManagementSystem.git
cd GymManagementSystem
```

### 2. Install Backend Dependencies

```powershell
npm install
```

### 3. Install Frontend Dependencies

```powershell
cd frontend
npm install
cd ..
```

---

## ⚙️ Configuration

### 1. Create Environment File

Create a `.env` file in the root directory:

```powershell
New-Item -Path ".env" -ItemType "file"
```

### 2. Configure Environment Variables

Add the following to your `.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/gym_management
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/gym_management

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Email Configuration (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_FROM=noreply@gymmanagement.com

# Frontend URL
FRONTEND_URL=http://localhost:3000

# OTP Configuration
OTP_EXPIRY=10
```

### 3. Gmail App Password Setup (for Email Service)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App Passwords
   - Select "Mail" and "Other (Custom name)"
   - Copy the generated password to `EMAIL_PASS` in `.env`

---

## 🎮 Running the Application

### Option 1: Run Both Servers Simultaneously (Recommended)

**Terminal 1 - Backend:**
```powershell
npm start
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm start
```

### Option 2: Development Mode with Auto-Reload

**Backend (with Nodemon):**
```powershell
npm start
```

**Frontend:**
```powershell
cd frontend
npm start
```

### Access the Application

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:5000](http://localhost:5000)
- **API Health Check:** [http://localhost:5000/](http://localhost:5000/)

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new gym admin | ❌ |
| POST | `/auth/login` | Login user | ❌ |
| POST | `/auth/logout` | Logout user | ✅ |
| POST | `/auth/reset-password/sendOtp` | Send OTP for password reset | ❌ |
| POST | `/auth/reset-password/checkOtp` | Verify OTP | ❌ |
| POST | `/auth/reset-password` | Reset password | ❌ |

### Member Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/members/all-member` | Get all members | ✅ |
| POST | `/members/register-member` | Register new member | ✅ |
| GET | `/members/searched-members` | Search members | ✅ |
| GET | `/members/monthly-member` | Get monthly statistics | ✅ |
| GET | `/members/within-3-days-expiring` | Members expiring soon | ✅ |
| GET | `/members/within-4-7-days-expiring` | Members expiring in 4-7 days | ✅ |
| GET | `/members/expired-member` | Get expired members | ✅ |
| GET | `/members/inactive-member` | Get inactive members | ✅ |
| GET | `/members/get-member/:id` | Get member details | ✅ |
| POST | `/members/change-status/:id` | Change member status | ✅ |
| PUT | `/members/update-member-plan/:id` | Update member plan | ✅ |

### Membership Plan Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/plans/add-Membership` | Add new membership plan | ✅ |
| GET | `/plans/get-Membership` | Get all membership plans | ✅ |

### Example Request

**POST** `/auth/login`
```json
{
  "email": "admin@gym.com",
  "password": "SecurePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "email": "admin@gym.com",
    "name": "Admin Name"
  }
}
```

---

## 📁 Project Structure

```
GMS-Project/
├── frontend/                      # React frontend application
│   ├── public/                    # Static files
│   │   ├── index.html            # HTML template
│   │   ├── manifest.json         # PWA manifest
│   │   └── robots.txt            # SEO configuration
│   ├── src/
│   │   ├── Components/           # Reusable components
│   │   │   ├── Addmembers/       # Add member form
│   │   │   ├── Addmemebership/   # Add membership form
│   │   │   ├── ForgotPassword/   # Password reset component
│   │   │   ├── Loader/           # Loading spinner
│   │   │   ├── Login/            # Login form
│   │   │   ├── MemberCard/       # Member card display
│   │   │   ├── Modal/            # Modal dialog
│   │   │   ├── Sidebar/          # Navigation sidebar
│   │   │   └── SignUp/           # Registration form
│   │   ├── Pages/                # Page components
│   │   │   ├── Dashboard/        # Main dashboard
│   │   │   ├── GeneralUser/      # User management
│   │   │   ├── Home/             # Landing page
│   │   │   ├── Member/           # Member list page
│   │   │   └── MemberDetail/     # Member detail view
│   │   ├── App.js                # Main App component
│   │   ├── App.css               # Global styles
│   │   ├── index.js              # App entry point
│   │   ├── input.css             # Tailwind input
│   │   └── output.css            # Compiled CSS
│   ├── package.json              # Frontend dependencies
│   ├── tailwind.config.js        # Tailwind configuration
│   └── README.md                 # Frontend documentation
│
├── Auth/                         # Authentication logic
│   └── auth.js                   # JWT verification middleware
│
├── Controllers/                  # Business logic
│   ├── gym.js                    # Auth controller
│   ├── member.js                 # Member controller
│   └── membership.js             # Membership controller
│
├── DBConn/                       # Database connection
│   └── conn.js                   # MongoDB connection
│
├── Modals/                       # Mongoose schemas
│   ├── gym.js                    # User schema
│   ├── member.js                 # Member schema
│   └── membership.js             # Membership schema
│
├── Routes/                       # API routes
│   ├── gym.js                    # Auth routes
│   ├── member.js                 # Member routes
│   └── membership.js             # Membership routes
│
├── .env                          # Environment variables (create this)
├── .gitignore                    # Git ignore rules
├── index.js                      # Server entry point
├── package.json                  # Backend dependencies
├── GMS.postman_collection.json   # Postman API collection
└── README.md                     # This file
```

---

## 📖 Usage Guide

### 1. First Time Setup

1. Start MongoDB service:
   ```powershell
   mongod
   ```

2. Register an admin account:
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - Click on "Sign Up"
   - Fill in the registration form

3. Login with your credentials

### 2. Adding Membership Plans

1. Navigate to the Membership Plans section
2. Click "Add Membership"
3. Enter plan details:
   - Plan name
   - Duration (in months)
   - Price
   - Description
4. Save the plan

### 3. Registering Members

1. Go to "Add Member" section
2. Fill in member information:
   - Full name
   - Email
   - Phone number
   - Address
   - Emergency contact
3. Select a membership plan
4. Set start date
5. Submit the form

### 4. Managing Members

- **View All Members:** See complete member list with status
- **Search Members:** Use the search bar to find specific members
- **View Details:** Click on any member card for detailed information
- **Update Status:** Activate or deactivate member accounts
- **Renew Membership:** Update member plans and extend expiration dates

### 5. Dashboard Analytics

The dashboard provides:
- Total active members count
- Members registered this month
- Expiration alerts (3 days, 4-7 days)
- Expired memberships list
- Inactive member tracking

### 6. Password Reset

If you forget your password:
1. Click "Forgot Password" on login page
2. Enter your registered email
3. Check email for OTP code
4. Enter OTP to verify
5. Set new password

---

## 🧪 Testing

### Using Postman

A Postman collection is included: `GMS.postman_collection.json`

**Import the collection:**
1. Open Postman
2. Click Import
3. Select `GMS.postman_collection.json`
4. Configure environment variables if needed

### Manual Testing

**Test Backend API:**
```powershell
# Test health endpoint
Invoke-WebRequest -Uri "http://localhost:5000/" -Method GET
```

**Run Frontend Tests:**
```powershell
cd frontend
npm test
```

---

## 🔧 Troubleshooting

### Common Issues

**1. Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Kill the process or change port in `.env`
```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process
```

**2. MongoDB Connection Failed**
```
MongoServerError: connect ECONNREFUSED
```
**Solution:** Ensure MongoDB is running
```powershell
mongod
```

**3. CORS Errors**
- Verify `FRONTEND_URL` in `.env` matches your frontend URL
- Check CORS configuration in `index.js`

**4. Email Not Sending**
- Verify Gmail App Password is correct
- Check email credentials in `.env`
- Ensure 2FA is enabled on Gmail

**5. JWT Token Issues**
- Clear browser cookies
- Verify `JWT_SECRET` is set in `.env`
- Check token expiration settings

---

## 🔒 Security Best Practices

- ✅ Never commit `.env` file to version control
- ✅ Use strong, unique JWT secrets in production
- ✅ Enable HTTPS in production
- ✅ Implement rate limiting for API endpoints
- ✅ Regularly update dependencies
- ✅ Use environment-specific configurations
- ✅ Implement proper input validation
- ✅ Use secure HTTP-only cookies for tokens

---

## 🚀 Deployment

### Frontend (Vercel/Netlify)

**Build command:**
```bash
cd frontend && npm run build
```

**Output directory:** `frontend/build`

### Backend (Heroku/Railway/DigitalOcean)

1. Set environment variables
2. Update MongoDB URI to production database
3. Change `NODE_ENV` to `production`
4. Deploy using platform-specific commands

### Environment Variables for Production

Ensure all `.env` variables are set in your hosting platform's environment configuration.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add YourFeature'`
4. Push to branch: `git push origin feature/YourFeature`
5. Open a Pull Request

### Code Style Guidelines

- Follow ESLint configuration
- Use meaningful variable names
- Add comments for complex logic
- Write clean, readable code
- Test before submitting PR

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

**Muhammad Huzaifa Memon**

- GitHub: [@MHuzaifaMemon](https://github.com/MHuzaifaMemon)
- Repository: [GymManagementSystem](https://github.com/MHuzaifaMemon/GymManagementSystem)

---

## 📞 Support

For issues, questions, or contributions:

- **Issues:** [GitHub Issues](https://github.com/MHuzaifaMemon/GymManagementSystem/issues)
- **Discussions:** [GitHub Discussions](https://github.com/MHuzaifaMemon/GymManagementSystem/discussions)

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js community
- MongoDB for the robust database
- Material-UI for beautiful components
- Tailwind CSS for utility-first styling
- All contributors and supporters

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by [Muhammad Huzaifa Memon](https://github.com/MHuzaifaMemon)

</div>