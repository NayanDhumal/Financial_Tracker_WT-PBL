const mongoose = require('mongoose')

const incomeSchema = new mongoose.Schema({
  description: String,
  amount: Number,
  category: String,
  date: Date
})
module.exports =  mongoose.model('Income', incomeSchema)
