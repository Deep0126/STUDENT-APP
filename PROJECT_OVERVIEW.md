# Student Management System - Project Overview

## 🚀 Tech Stack
### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Security**: 
  - **JWT (JSON Web Tokens)**: For secure API access control.
  - **Bcrypt.js**: For password hashing and security.
  - **Dotenv**: For environment variable management.

### **Frontend**
- **Library**: React.js
- **Styling**: Vanilla CSS with Modern Glassmorphism UI.
- **State Management**: React Hooks (useState, useEffect).
- **API Client**: Axios.

---

## 📁 Project Structure (Modular Architecture)
```text
STUDENT-APP/
├── client/                   # Frontend Application
│   └── src/
│       ├── components/       # Reusable UI e.g., Navbar
│       ├── pages/            # View Logic (Login, Dashboards, Managers)
│       └── App.js            # Main Routing & State
├── SERVER/                   # Backend Application
│   ├── models/               # MongoDB Database Schemas
│   ├── routes/               # API Endpoint Definitions
│   ├── middleware/           # Access Control (Token Verification)
│   ├── server.js             # Main Server Entry Point
│   └── .env                  # Environment Config
├── scripts/                  # Utility Scripts (Admin Setup/Reset)
└── PROJECT_OVERVIEW.md       # Project Documentation
```

---

## 🛡️ API Endpoints & Security Status

| Endpoint | Method | Security | Purpose |
| :--- | :--- | :--- | :--- |
| `/auth/login` | POST | Public | Admin Authentication |
| `/student/login` | POST | Public | Student Authentication |
| `/students` | POST | Public | New Student Registration |
| `/students` | GET | **Protected (JWT)** | Fetch Student List (Admin only) |
| `/exams` | POST | **Protected (JWT)** | Submit Exam Form (Logged-in only) |
| `/exams` | GET | **Protected (JWT)** | View All Exams (Admin only) |
| `/students/:id` | PUT/DEL | **Protected (JWT)** | Update/Delete Student Records |

---

## 🔑 Key Features
1. **Token-Based Access**: API endpoints are locked. Only users with a valid token (provided after login) can access sensitive data.
2. **Modular Design**: Code is divided into logical modules for better maintenance.
3. **Responsive UI**: Modern "Glassmorphism" design that works on all screen sizes.
4. **Environment Safety**: Sensitive info like DB keys and Admin passwords are kept in `.env` files.

---

## 👨‍💻 Administrative Credentials
- **Admin Email**: `sir1@gmail.com`
- **Admin Password**: `12345`
