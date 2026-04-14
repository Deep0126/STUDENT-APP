require("dotenv").config();
const authRoutes = require("./routes/auth");
const verifyToken = require("./middleware/verifyToken");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);


mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
  .then(async () => {
    console.log("DB Connected");
    
    const User = require("./models/User");
    const adminEmail = process.env.ADMIN_EMAIL || "sir1@gmail.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "12345";
    
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const newAdmin = new User({ email: adminEmail, password: hashedPassword });
      await newAdmin.save();
      console.log(`Default Admin user created: ${adminEmail}`);
    }
  })
  .catch(err => console.log(err));

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: { type: String, required: false },
  course: String,
  contact: String,
  idNo: String,
  dob: String,
  gender: String,
  address: String,
  pincode: String,
  state: String,
  city: String,
  country: String
});

const Student = mongoose.model("Student", StudentSchema);


app.post("/students", async (req, res) => {
  try {
    const existing = await Student.findOne({ email: req.body.email });
    if (existing) {
      return res.status(400).send("Account already exists with this email! Please login instead.");
    }

    const { password, ...rest } = req.body;
    
    const data = new Student({ ...rest, password: password });
    await data.save();
    
    const token = require("jsonwebtoken").sign({ id: data._id, role: "student" }, process.env.JWT_SECRET);
    res.send({ ...data.toObject(), token });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/student/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Student.findOne({ email });
    if (!user) return res.status(400).send("Student not found");

    if (!user.password && password) {
      return res.status(400).send("Legacy account has no password. Please recreate or contact Admin.");
    }

    let isMatch = false;
    if (user.password && user.password.startsWith("$2a$")) {
      isMatch = await bcrypt.compare(password, user.password); 
    } else {
      isMatch = (password === user.password);
    }

    if (!isMatch) return res.status(400).send("Wrong password");

    const userObj = user.toObject();
    delete userObj.password;

    const token = require("jsonwebtoken").sign({ id: user._id, role: "student" }, process.env.JWT_SECRET);
    res.json({ ...userObj, token });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});


app.get("/students", verifyToken, async (req, res) => {
  const data = await Student.find().select("-password");
  res.send(data);
});


app.put("/students/:id", verifyToken, async (req, res) => {
  const data = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.send(data);
});

app.delete("/students/:id", verifyToken, async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});


const ExamSchema = new mongoose.Schema({
  enrollNo: String,
  name: String,
  contact: String,
  department: String,
  branch: String,
  subject: [String],
  feesPaid: Boolean,
  referenceId: String
});

const Exam = mongoose.model("Exam", ExamSchema);


app.post("/exams", verifyToken, async (req, res) => {
  try {
    const newDoc = { ...req.body, referenceId: "APP-" + Date.now() };
    const data = new Exam(newDoc);
    await data.save();
    res.send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


app.get("/exams/student/:enrollNo", async (req, res) => {
  try {
    const data = await Exam.findOne({ enrollNo: req.params.enrollNo });
    if (!data) return res.status(404).send("Not found");
    res.send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


app.get("/exams", verifyToken, async (req, res) => {
  const data = await Exam.find();
  res.send(data);
});


app.put("/exams/:id", verifyToken, async (req, res) => {
  const data = await Exam.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.send(data);
});


app.delete("/exams/:id", verifyToken, async (req, res) => {
  await Exam.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));