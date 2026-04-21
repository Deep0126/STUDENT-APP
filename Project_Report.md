# Student Management System - Project Report

## 1. Project Overview
The objective of this project is to build a robust, full-stack **Student Management Application** that operates across multiple devices (PCs/Mobile phones) securely over a local network or live server. 

## 2. Core Features
- **Student Portal:** Allows students to register, securely log in, and fill out their Exam Forms securely.
- **Admin Gateway:** Allows administrators to securely log in, view the list of registered students, and manage submitted exam forms.
- **Cross-Device Compatibility:** The API and frontend are configured to run not just on `localhost`, but also via Local Network IP (e.g., `192.168.x.x`) or globally via cloud deployment.

## 3. Technology Stack
- **Frontend:** React.js, Bootstrap (Responsive styling), TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Local Network & Cloud via MongoDB Atlas)
- **Security & Authentication:** JSON Web Tokens (JWT), bcryptjs (Password Hashing)
- **Configuration Management:** dotenv (Secure `.env` environment variables)

## 4. How Security is Maintained (Secure API)
One of the core requirements was to ensure the API is fully secure when accessed from another device. 
1. **No Session Storage:** Instead of relying on traditional sessions, this system uses stateless **JWT (JSON Web Token)** authentication.
2. **Token Generation:** When a user (Admin/Student) logs in with valid credentials, the server encrypts a unique digital token using a secret key (`JWT_SECRET`) and sends it to the device.
3. **Protected Routes:** Every time a different device requests data (like viewing student lists or submitting forms), it *must* send this token in the API `Authorization` header (`Bearer <token>`).
4. **Access Denied Protocol:** If someone tries to access the API endpoint directly from another PC without logging in, the server catches the missing/invalid token and throws an `401 Access Denied` error.
5. **Secure Admin Bootstrapping:** The server automatically creates a default Admin user on DB connection if one doesn't exist, utilizing securely hashed passwords via `bcryptjs` and credentials loaded from the `.env` file. Legacy plain-text passwords for older student accounts are gracefully handled alongside secure hashed passwords.

## 5. Configuration & Deployment
The system has been modernized to support deployment to cloud providers (e.g., Render for backend, Vercel for frontend).
1. **Environment Variables:** Confidential values such as `MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, and `PORT` are now safely stored in a `.env` file, keeping them out of the source code.
2. **CORS Configuration:** Enabled via Express `cors()` to allow cross-origin requests from frontend hosts.
3. **Network Readiness:** Configured to dynamically bind to the necessary `process.env.PORT`, ensuring the app can be hosted online or connected to via a local network IP address (e.g., `192.168.1.3:3000`).

## 6. Conclusion
The system successfully meets all requirements: it is dynamic, comfortably runs via local network or cloud deployments, securely manages passwords with bcrypt, strictly enforces API security with JWT, and hides sensitive app configurations completely from the client-side via environmental variables.
