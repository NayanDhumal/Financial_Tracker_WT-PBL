import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const AddDebtForm = ({ onAdd, onUpdate, onCancel, debt }) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    remainingAmount: '',
    interestRate: '',
    dueDate: '',
    lender: '',
    minimumPayment: '',
  })
  
  const [errors, setErrors] = useState({})
  
  // If editing an existing debt, populate the form
  useEffect(() => {
    if (debt) {
      setFormData({
        id: debt.id,
        name: debt.name,
        amount: debt.amount,
        remainingAmount: debt.remainingAmount,
        interestRate: debt.interestRate,
        dueDate: debt.dueDate,
        lender: debt.lender || '',
        minimumPayment: debt.minimumPayment || '',
        status: debt.status
      })
    }
  }, [debt])
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }
  
  const validate = () => {
    const newErrors = {}
    
    if (!formData.name) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Valid amount is required'
    }
    
    if (!formData.remainingAmount || formData.remainingAmount < 0) {
      newErrors.remainingAmount = 'Valid remaining amount is required'
    }
    
    if (parseFloat(formData.remainingAmount) > parseFloat(formData.amount)) {
      newErrors.remainingAmount = 'Remaining amount cannot exceed total amount'
    }
    
    if (!formData.interestRate || formData.interestRate < 0) {
      newErrors.interestRate = 'Valid interest rate is required'
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required'
    }
    
    if (!formData.minimumPayment || formData.minimumPayment <= 0) {
      newErrors.minimumPayment = 'Valid minimum payment is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validate()) {
      // Convert numeric fields to numbers
      const debtData = {
        ...formData,
        amount: parseFloat(formData.amount),
        remainingAmount: parseFloat(formData.remainingAmount),
        interestRate: parseFloat(formData.interestRate),
        minimumPayment: parseFloat(formData.minimumPayment)
      }
      
      if (debt) {
        onUpdate(debtData)
      } else {
        onAdd(debtData)
      }
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
      <h3 className="text-lg font-semibold mb-2">
        {debt ? 'Edit Debt' : 'Add New Debt'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="label">Debt Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="e.g., Car Loan, Credit Card"
            className={`input ${errors.name ? 'border-error-500 focus:ring-error-500' : ''}`}
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-error-500 text-xs mt-1">{errors.name}</p>}
        </div>
        
        {/* Lender */}
        <div>
          <label htmlFor="lender" className="label">Lender / Bank</label>
          <input
            type="text"
            id="lender"
            name="lender"
            placeholder="e.g., Chase Bank"
            className={`input ${errors.lender ? 'border-error-500 focus:ring-error-500' : ''}`}
            value={formData.lender}
            onChange={handleChange}
          />
          {errors.lender && <p className="text-error-500 text-xs mt-1">{errors.lender}</p>}
        </div>
        
        {/* Amount */}
        <div>
          <label htmlFor="amount" className="label">Total Amount</label>
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
        
        {/* Remaining Amount */}
        <div>
          <label htmlFor="remainingAmount" className="label">Remaining Amount</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">₹</span>
            </div>
            <input
              type="number"
              id="remainingAmount"
              name="remainingAmount"
              placeholder="0.00"
              step="0.01"
              min="0"
              className={`input pl-7 ${errors.remainingAmount ? 'border-error-500 focus:ring-error-500' : ''}`}
              value={formData.remainingAmount}
              onChange={handleChange}
            />
          </div>
          {errors.remainingAmount && <p className="text-error-500 text-xs mt-1">{errors.remainingAmount}</p>}
        </div>
        
        {/* Interest Rate */}
        <div>
          <label htmlFor="interestRate" className="label">Interest Rate (%)</label>
          <div className="relative">
            <input
              type="number"
              id="interestRate"
              name="interestRate"
              placeholder="0.00"
              step="0.01"
              min="0"
              className={`input pr-7 ${errors.interestRate ? 'border-error-500 focus:ring-error-500' : ''}`}
              value={formData.interestRate}
              onChange={handleChange}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500">%</span>
            </div>
          </div>
          {errors.interestRate && <p className="text-error-500 text-xs mt-1">{errors.interestRate}</p>}
        </div>
        
        {/* Due Date */}
        <div>
          <label htmlFor="dueDate" className="label">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            className={`input ${errors.dueDate ? 'border-error-500 focus:ring-error-500' : ''}`}
            value={formData.dueDate}
            onChange={handleChange}
          />
          {errors.dueDate && <p className="text-error-500 text-xs mt-1">{errors.dueDate}</p>}
        </div>
        
        {/* Minimum Payment */}
        <div>
          <label htmlFor="minimumPayment" className="label">Minimum Monthly Payment</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">₹</span>
            </div>
            <input
              type="number"
              id="minimumPayment"
              name="minimumPayment"
              placeholder="0.00"
              step="0.01"
              min="0"
              className={`input pl-7 ${errors.minimumPayment ? 'border-error-500 focus:ring-error-500' : ''}`}
              value={formData.minimumPayment}
              onChange={handleChange}
            />
          </div>
          {errors.minimumPayment && <p className="text-error-500 text-xs mt-1">{errors.minimumPayment}</p>}
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
          {debt ? 'Update Debt' : 'Add Debt'}
        </button>
      </div>
    </motion.form>
  )
}

export default AddDebtForm