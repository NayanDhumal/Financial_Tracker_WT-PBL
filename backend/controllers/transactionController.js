const Transaction = require("../models/transactionModel");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");

exports.getTransactions = async (req, res) => {
  console.log("User in request:", req.user);
  const transactions = await Transaction.find({ userId: req.user._id });
  res.json(transactions);
};

exports.createTransaction = async (req, res) => {
  const { type, category, amount, date,description} = req.body;

  const newTxn = new Transaction({
    userId: req.user._id,
    type,
    category,
    amount,
    date,
    description,
    
  });
  const saved = await newTxn.save();
  res.status(201).json(saved);
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid transaction ID' });
    }

    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    if (transaction.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await transaction.deleteOne();

    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: error.message });
  }
};

