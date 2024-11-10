require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Database connection
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Define user schema and model
const userSchema = new mongoose.Schema({
  f_sno: Number,
  f_userName: { type: String, unique: true },
  f_Email: { type: String, unique: true, required: true },
  f_Pwd: String
});
const userModel = mongoose.model("t_login", userSchema);

// Signup route
app.post("/signup", async (req, res) => {
  const { f_userName, f_Email, f_Pwd } = req.body;

  if (!f_userName || !f_Email || !f_Pwd) {
    return res.status(400).json({ error: "Username, email, and password are required" });
  }

  try {
    const existingUser = await userModel.findOne({ $or: [{ f_userName }, { f_Email }] });
    if (existingUser) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    const lastUser = await userModel.findOne().sort({ f_sno: -1 });
    const sno = lastUser ? lastUser.f_sno + 1 : 1;

    const newUser = new userModel({ f_sno: sno, f_userName, f_Email, f_Pwd });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { f_Email, f_Pwd } = req.body;

  try {
    const user = await userModel.findOne({ f_Email, f_Pwd });
    if (user) {
      return res.status(200).send("Login successful");
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).send("Internal Server Error");
  }
});

// Employee schema and model
let lastId = 0;
function generateId() {
  lastId++;
  return lastId;
}

const employeeSchema = new mongoose.Schema({
  f_Id: { type: Number, unique: true, default: generateId },
  f_Image: { type: String, required: true },
  f_Name: { type: String, required: true },
  f_Email: { type: String, required: true, unique: true },
  f_Mobile: { type: String, required: true },
  f_Designation: { type: String, required: true },
  f_gender: { type: String, required: true },
  f_Course: { type: String, required: true },
  f_Createdate: { type: String, default: () => new Date().toISOString().split('T')[0] }
});

const Employee = mongoose.model("Employee", employeeSchema);

// Configure storage for employee image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Add new employee route
app.post('/addEmployee', upload.single('f_Image'), async (req, res) => {
  try {
    const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;
    const newEmployee = new Employee({
      f_Image: req.file.path,
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course
    });
    await newEmployee.save();
    res.status(201).json({ message: "Employee added successfully" });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all employees
app.get('/getEmployees', async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error retrieving employees:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete employee route
app.delete('/deleteEmployee/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update employee route
app.put('/updateEmployee/:id', async (req, res) => {
  const { id } = req.params;
  const updatedEmployeeData = req.body;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedEmployeeData, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get employee by ID route
app.get('/getEmployee/:id', async (req, res) => {
  const employeeId = req.params.id;

  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    console.error('Error fetching employee data by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Find employee by f_Id
app.get('/searchEmployee/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findOne({ f_Id: id });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    console.error('Error finding employee by f_Id:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
