const mongoose = require("mongoose");
const User = require("../SERVER/models/User");

async function run() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/studentDB");
    const users = await User.find();
    if (users.length === 0) {
      console.log("No users found in database.");
    } else {
      console.log("Existing users:");
      users.forEach(u => console.log(`- Email: ${u.email}`));
    }
    await mongoose.connection.close();
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }




  
}

run();
