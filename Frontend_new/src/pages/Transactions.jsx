import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getTransactions, addTransaction, updateTransaction, deleteTransaction } from '../services/api'
import TransactionList from '../components/transactions/TransactionList'
import TransactionFilters from '../components/transactions/TransactionFilters'
import AddTransactionForm from '../components/transactions/AddTransactionForm'
import axios from 'axios'

const Transactions = () => {
  const [transactions, setTransactions] = useState([])
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
    dateRange: 'all',
    search: ''
  })
  const [showAddForm, setShowAddForm] = useState(false)
  
  useEffect(() => { 
    const fetchTransactions = async () => {
      setIsLoading(true)
  
      try {
        const response = await getTransactions()
        setTransactions(response)
        setFilteredTransactions(response)
      } catch (error) {
        console.error('Error fetching transactions:', error)
      } finally {
        setIsLoading(false)
      }
    }
  
    fetchTransactions()
  }, [])
  
  useEffect(() => {
    let result = [...transactions]
    
    if (filters.type !== 'all') {
      result = result.filter(t => t.type === filters.type)
    }
    
    if (filters.category !== 'all') {
      result = result.filter(t => t.category === filters.category)
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(t => 
        t.description.toLowerCase().includes(searchLower) || 
        t.category.toLowerCase().includes(searchLower)
      )
    }
    
    result.sort((a, b) => new Date(b.date) - new Date(a.date))
    
    setFilteredTransactions(result)
  }, [transactions, filters])
  
  const handleAddTransaction = async (newTransaction) => {
    try {
      const addedTransaction = await addTransaction(newTransaction)
      setTransactions((prev) => [...prev, addedTransaction])
      setFilteredTransactions((prev) => [...prev, addedTransaction])
    } catch (error) {
      console.error('Error adding transaction:', error)
  
      if (error.response) {
        alert(`Error: ${error.response.data.message || 'Something went wrong'}`)
      } else if (error.message) {
        alert(`Error: ${error.message}`)
      } else {
        alert('An unknown error occurred.')
      }
    }
  }

  const handleDeleteTransaction = async (id) => {
    try {
      console.log('Deleting ID:', id) // ✅ Add this log
      await axios.delete(`http://localhost:3000/api/transactions/${id}`, {
        withCredentials: true
      })
      setTransactions((prev) => prev.filter((t) => t._id !== id))
      setFilteredTransactions((prev) => prev.filter((t) => t._id !== id))
    } catch (error) {
      console.error('Error deleting transaction:', error)
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn btn-primary"
        >
          {showAddForm ? 'Cancel' : 'Add Transaction'}
        </button>
      </div>
      
      {/* Add Transaction Form */}
      {showAddForm && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="card"
        >
          <AddTransactionForm onAdd={handleAddTransaction} onCancel={() => setShowAddForm(false)} />
        </motion.div>
      )}
      
      {/* Filters */}
      <TransactionFilters filters={filters} setFilters={setFilters} />
      
      {/* Transactions List */}
      <div className="card">
        <TransactionList 
          transactions={filteredTransactions} 
          onDelete={handleDeleteTransaction} 
        />
      </div>
    </motion.div>
  )
}

export default Transactions
