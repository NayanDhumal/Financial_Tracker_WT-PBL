const express = require("express");
const dotenv = require("dotenv");
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

dotenv.config();
// Connect MongoDB
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("MONGO_URI is not defined in d:\\CLG_assignment\\WT_PBL\\backend\\.env");
  process.exit(1);
}
mongoose.connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/debts", debtRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/users", userRoutes);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
