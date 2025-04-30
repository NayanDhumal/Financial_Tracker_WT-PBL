import { useState } from 'react'
import { motion } from 'framer-motion'

const AddTransactionForm = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    type: 'expense',
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  })
  
  const [errors, setErrors] = useState({})
  
  // Define category options based on type
  const getCategories = () => {
    if (formData.type === 'income') {
      return [
        { value: '', label: 'Select Category' },
        { value: 'salary', label: 'Salary' },
        { value: 'freelance', label: 'Freelance' },
        { value: 'investments', label: 'Investments' },
        { value: 'other', label: 'Other Income' },
      ]
    } else {
      return [
        { value: '', label: 'Select Category' },
        { value: 'rent', label: 'Rent/Mortgage' },
        { value: 'groceries', label: 'Groceries' },
        { value: 'utilities', label: 'Utilities' },
        { value: 'entertainment', label: 'Entertainment' },
        { value: 'transport', label: 'Transportation' },
        { value: 'food', label: 'Food & Dining' },
        { value: 'shopping', label: 'Shopping' },
        { value: 'other', label: 'Other Expense' },
      ]
    }
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
    
    // Reset category when type changes
    if (name === 'type') {
      setFormData(prev => ({ ...prev, category: '' }))
    }
  }
  
  const validate = () => {
    const newErrors = {}
    
    if (!formData.category) {
      newErrors.category = 'Category is required'
    }
    
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Valid amount is required'
    }
    
    if (!formData.description) {
      newErrors.description = 'Description is required'
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validate()) {
      // Convert amount to number
      const transaction = {
        ...formData,
        amount: parseFloat(formData.amount)
      }
      
      onAdd(transaction)
    }
  }
  
  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <h3 className="text-lg font-semibold mb-2">Add New Transaction</h3>
      
      {/* Transaction Type */}
      <div className="flex gap-4 mb-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="type"
            value="expense"
            checked={formData.type === 'expense'}
            onChange={handleChange}
            className="mr-2"
          />
          <span>Expense</span>
        </label>
        
        <label className="flex items-center">
          <input
            type="radio"
            name="type"
            value="income"
            checked={formData.type === 'income'}
            onChange={handleChange}
            className="mr-2"
          />
          <span>Income</span>
        </label>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category */}
        <div>
          <label htmlFor="category" className="label">Category</label>
          <select
            id="category"
            name="category"
            className={`input ${errors.category ? 'border-error-500 focus:ring-error-500' : ''}`}
            value={formData.category}
            onChange={handleChange}
          >
            {getCategories().map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-error-500 text-xs mt-1">{errors.category}</p>}
        </div>
        
        {/* Amount */}
        <div>
          <label htmlFor="amount" className="label">Amount</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">₹</span>
            </div>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="0.00"
              step="0.01"
              min="0"
              className={`input pl-7 ${errors.amount ? 'border-error-500 focus:ring-error-500' : ''}`}
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
          {errors.amount && <p className="text-error-500 text-xs mt-1">{errors.amount}</p>}
        </div>
        
        {/* Description */}
        <div>
          <label htmlFor="description" className="label">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="What was this for?"
            className={`input ${errors.description ? 'border-error-500 focus:ring-error-500' : ''}`}
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && <p className="text-error-500 text-xs mt-1">{errors.description}</p>}
        </div>
        
        {/* Date */}
        <div>
          <label htmlFor="date" className="label">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            className={`input ${errors.date ? 'border-error-500 focus:ring-error-500' : ''}`}
            value={formData.date}
            onChange={handleChange}
          />
          {errors.date && <p className="text-error-500 text-xs mt-1">{errors.date}</p>}
        </div>
      </div>
      
      {/* Buttons */}
      <div className="flex justify-end space-x-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          Cancel
        </button>
        
        <button
          type="submit"
          className="btn btn-primary"
        >
          Add Transaction
        </button>
      </div>
    </motion.form>
  )
}

export default AddTransactionForm