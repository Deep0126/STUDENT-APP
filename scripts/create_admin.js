require("dotenv").config({ path: "../SERVER/.env" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../SERVER/models/User");

async function createAdmin() {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect("mongodb://127.0.0.1:27017/studentDB", {
      serverSelectionTimeoutMS: 5000
    });
    console.log("Connected!");
    
    const email = process.env.ADMIN_EMAIL || "sir1@gmail.com";
    const password = process.env.ADMIN_PASSWORD || "12345";
    
    const existing = await User.findOne({ email });
    if (existing) {
      console.log(`Admin account exists: ${email}`);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new User({ email, password: hashedPassword });
      await newAdmin.save();
      console.log(`Admin created: ${email} / ${password}`);
    }
    
    await mongoose.connection.close();
  } catch (err) {
    console.error("Failed:", err.message);
    process.exit(1);
  }
}

createAdmin();
