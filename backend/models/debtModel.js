const mongoose = require("mongoose");

const DebtSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  lender: { type: String, required: true }, // Who gave the loan
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ["pending", "paid"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
  IntrestRate: { type: Number, required: true }, // Interest rate for the loan
});

module.exports = mongoose.model("Debt", DebtSchema);
