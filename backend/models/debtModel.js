const mongoose = require('mongoose');

const debtSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: String,
  amount: Number,
  remainingAmount: Number,
  interestRate: Number,
  dueDate: Date,
  lender: String,
  status: {
    type: String,
    enum: ['active', 'paid', 'defaulted'],
    default: 'active',
  },
  minimumPayment: Number,
}, { timestamps: true });

module.exports = mongoose.model('Debt', debtSchema);
