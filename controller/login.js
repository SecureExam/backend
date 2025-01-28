const jwt = require("jsonwebtoken");
const Student = require("../ models/users");

const loginUser = async (req, res) => {
  const { seatno, password } = req.body;

  // Validate input
  if (!seatno || !password) {
    return res
      .status(400)
      .json({ message: "Seat No and password are required." });
  }

  try {
    // Check if user exists
    const student = await Student.findOne({ seatno });
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    // Verify password (plain-text comparison)
    if (password !== student.password) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: student._id, email: student.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    return res.status(200).json({
      message: "Login successful.",
      token,
      student: {
        id: student._id,
        name: student.name,
        seatno: student.seatno,
        email: student.email,
        rollNumber: student.rollNumber,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = loginUser;
