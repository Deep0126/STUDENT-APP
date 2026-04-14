require("dotenv").config({ path: "../SERVER/.env" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

async function fixAdmin() {
  try {
    console.log("Connecting to MongoDB at 127.0.0.1:27017...");
    await mongoose.connect("mongodb://127.0.0.1:27017/studentDB", {
      serverSelectionTimeoutMS: 5000
    });
    console.log("Connected Successfully!");

    const email = process.env.ADMIN_EMAIL || "sir1@gmail.com";
    const password = process.env.ADMIN_PASSWORD || "12345";

  
    await User.deleteMany({ email });
    console.log("Cleaned up old accounts.");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new User({
      email,
      password: hashedPassword
    });

    await newAdmin.save();
    console.log("-----------------------------------------");
    console.log("ADMIN ACCOUNT CREATED/RESET SUCCESSFULLY!");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log("-----------------------------------------");

    await mongoose.connection.close();
  } catch (err) {
    console.error("CRITICAL ERROR:", err.message);
    process.exit(1);
  }
}

fixAdmin();
