const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = new User({ email, password: hash });
  await user.save();

  res.send("User Registered");
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).send("User not found");

  let isMatch = false;
  if (user.password && user.password.startsWith("$2a$")) {
    isMatch = await bcrypt.compare(password, user.password);
  } else {
    isMatch = (password === user.password);
  }

  if (!isMatch) return res.status(400).send("Wrong password");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret123");

  res.json({ token });
});

module.exports = router;
