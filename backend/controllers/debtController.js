const Debt = require('../models/debtModel'); // Assuming you have a Debt model defined in models/debtModel.js

// Create a new debt entry
exports.createDebt = async (req, res) => {
  try {
    const { name, amount, remainingAmount, interestRate, dueDate, status, lender, minimumPayment } = req.body;

    const newDebt = new Debt({
      userId: req.user._id, // assuming user is authenticated via middleware
      name,
      amount,
      remainingAmount,
      interestRate,
      dueDate,
      status,
      lender,
      minimumPayment,
    });

    const savedDebt = await newDebt.save();
    res.status(201).json(savedDebt);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create debt', details: err.message });
  }
};

// Get all debts for a user
exports.getUserDebts = async (req, res) => {
  try {
    const debts = await Debt.find({ userId: req.user._id }).sort({ dueDate: 1 });
    console.log("User in request:", req.user);
    console.log("Debts fetched:", debts);
    res.status(200).json(debts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch debts', details: err.message });
  }
};

// Get a single debt by ID
exports.getDebtById = async (req, res) => {
  try {
    const debt = await Debt.findOne({ _id: req.params.id, userId: req.user.id });
    if (!debt) return res.status(404).json({ error: 'Debt not found' });

    res.status(200).json(debt);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch debt', details: err.message });
  }
};

// Update a debt
exports.updateDebt = async (req, res) => {
  try {
    const updatedDebt = await Debt.findOneAndUpdate(
      { _id: req.params._id, userId: req.user._id },
      { $set: req.body },
      { new: true }
    );

    if (!updatedDebt) return res.status(404).json({ error: 'Debt not found or not authorized' });

    res.status(200).json(updatedDebt);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update debt', details: err.message });
  }
};

// Delete a debt
exports.deleteDebt = async (req, res) => {
  try {
    const deletedDebt = await Debt.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!deletedDebt) return res.status(404).json({ error: 'Debt not found or not authorized' });

    res.status(200).json({ message: 'Debt deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete debt', details: err.message });
  }
};

