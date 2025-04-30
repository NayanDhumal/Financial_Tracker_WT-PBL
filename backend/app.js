const express = require("express");
// const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const transactionRoutes = require("./routes/transactionRoutes");
const authRoutes = require("./routes/authroutes");
const cookieParser = require("cookie-parser");
const debtRoutes = require("./routes/debtRoutes")
const reportRoutes = require("./routes/reportRoutes");
const userRoutes = require("./routes/userRoutes");

// dotenv.config();
const app = express();

app.use(cors({
    origin: "http://localhost:5173", // frontend port
    credentials: true
  }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connect MongoDB
// mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected"));

// Routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/debts", debtRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/users", userRoutes);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
