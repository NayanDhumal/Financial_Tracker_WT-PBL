const Expense = require('../models/expense')

exports.getExpenses = async (req, res) => {
  const expenses = await Expense.find()
  res.json(expenses)
}

exports.addExpense = async (req, res) => {
  const expense = new Expense(req.body)
  await expense.save()
  res.status(201).json(expense)
}

exports.updateExpense = async (req, res) => {
  const { id } = req.params
  const updated = await Expense.findByIdAndUpdate(id, req.body, { new: true })
  res.json(updated)
}

exports.deleteExpense = async (req, res) => {
  const { id } = req.params
  await Expense.findByIdAndDelete(id)
  res.status(204).end()
}
