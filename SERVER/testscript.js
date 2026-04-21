require('dotenv').config();
const mongoose = require('mongoose');

async function test() {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {serverSelectionTimeoutMS: 5000});
    console.log("DB_SUCCESS");

    const axios = require('axios');
    console.log("Sending POST to live server...");
    const res = await axios.post("https://student-app-m60q.onrender.com/auth/login", {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD
    });
    console.log("LIVE_SERVER_LOGIN_SUCCESS", res.data);

  } catch (err) {
    if (err.response) {
      console.log("LIVE_SERVER_REJECTED:", err.response.status, err.response.data);
    } else {
      console.log("ERROR:", err.message);
    }
  } finally {
    process.exit();
  }
}
test();
