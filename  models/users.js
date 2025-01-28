const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  seatno: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
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
    unique: true,
    trim: true,
  },
  suspeciousActivity: {
    type: Number,
  },
  examsAttempted: [
    {
      examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam",
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
