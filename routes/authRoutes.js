const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

const router = express.Router();

// @route POST /api/auth/login
// @desc Login a student
// @access Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    // Check if user exists
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: student._id, email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    res.status(200).json({
      message: "Login successful.",
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        rollNumber: student.rollNumber,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
