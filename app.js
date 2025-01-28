const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");

//CORS
const cors = require("cors");
// const examRoutes = require("./routes/examRoutes");
// const monitorRoutes = require("./routes/monitorRoutes");

// Load environment variables
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"], // Define allowed methods
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());

// // Routes
app.use("/api/auth", authRoutes);
// app.use("/api/exams", examRoutes);
// app.use("/api/monitor", monitorRoutes);

// Database connection
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
