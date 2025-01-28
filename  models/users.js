const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is mandatory
    trim: true, // Removes extra spaces
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate emails
    lowercase: true, // Converts email to lowercase
    trim: true,
  },
  password: {
    type: String,
    required: true, // Mandatory for authentication
    minlength: 8, // Ensures password strength
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{10}$/, "Please enter a valid 10-digit phone number."],
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate roll numbers
    trim: true,
    },
    suspeciousActivity: {
        type: Number
  },
  examsAttempted: [
    {
      examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam", // Reference to the Exam model
      },
      score: {
        type: Number,
        default: 0,
      },
      attemptDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Student", studentSchema);
