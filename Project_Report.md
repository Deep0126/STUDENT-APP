# Student Management System - Project Report

## 1. Project Overview
The objective of this project is to build a robust, full-stack **Student Management Application** that operates across multiple devices (PCs/Mobile phones) securely over a local network or live server. 

## 2. Core Features
- **Student Portal:** Allows students to register, securely log in, and fill out their Exam Forms securely.
- **Admin Gateway:** Allows administrators to securely log in, view the list of registered students, and manage submitted exam forms.
- **Cross-Device Compatibility:** The API and frontend are configured to run not just on `localhost`, but also via Local Network IP (e.g., `192.168.x.x`), allowing other PCs and Mobile phones to interact with the system simultaneously.

## 3. Technology Stack
- **Frontend:** React.js, Bootstrap (Responsive styling)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Local/Atlas)
- **Security & Authentication:** JSON Web Tokens (JWT), bcryptjs (Password Hashing)

## 4. How Security is Maintained (Secure API)
One of the core requirements was to ensure the API is fully secure when accessed from another device. 
1. **No Session Storage:** Instead of relying on traditional sessions, this system uses stateless **JWT (JSON Web Token)** authentication.
2. **Token Generation:** When a user (Admin/Student) logs in with valid credentials, the server encrypts a unique digital token using a secret key (`JWT_SECRET`) and sends it to the device.
3. **Protected Routes:** Every time a different device requests data (like viewing student lists or submitting forms), it *must* send this token in the API `Authorization` header (`Bearer <token>`).
4. **Access Denied Protocol:** If someone tries to access the API endpoint directly from another PC without logging in, the server catches the missing/invalid token and throws an `401 Access Denied` error, making the system 100% impenetrable without valid credentials.

## 5. How It Runs on Another Device
We moved away from hardcoded `localhost` to make the application network-ready:
1. Checked the Host machine's IPv4 Address (e.g., `192.168.1.3`).
2. Configured the React app's API calls to point to `http://192.168.1.3:5000` instead of `localhost`.
3. Allowed **CORS (Cross-Origin Resource Sharing)** on the Express server to accept requests from any IP address on the network.
4. The user simply connects to the same Wi-Fi network and types `http://192.168.1.3:3000` on their phone or second PC. The site opens, the secure Login checks their credentials, and the API responds safely.

## 6. Conclusion
The system successfully meets the requirements: it is dynamic, seamlessly handles remote connections within a network, hides and responsive data properly on mobile screens, and strictly enforces JWT token-based API security.
