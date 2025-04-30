const express = require('express')
const {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense
} = require( '../controllers/expenseController.js')

const router = express.Router()
const { protect } = require("../middlewares/authMiddleware");

router.get('/', protect,getExpenses)
router.post('/',protect, addExpense)
router.put('/:id',protect, updateExpense)
router.delete('/:id',protect, deleteExpense)

module.exports = router
