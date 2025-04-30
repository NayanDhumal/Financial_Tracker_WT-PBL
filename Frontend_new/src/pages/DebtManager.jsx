import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getDebts, addDebt, updateDebt, deleteDebt } from '../services/api'
import DebtList from '../components/debts/DebtList'
import AddDebtForm from '../components/debts/AddDebtForm'

const DebtManager = () => {
  const [debts, setDebts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingDebt, setEditingDebt] = useState(null)

  useEffect(() => {
    const fetchDebts = async () => {
      setIsLoading(true)
      try {
        const data = await getDebts()
        setDebts(data)
      } catch (error) {
        console.error('Error fetching debts:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDebts()
  }, [])

  const handleAddDebt = async (debt) => {
    try {
      const newDebt = await addDebt(debt)
      setDebts([...debts, newDebt])
      setShowAddForm(false)
    } catch (error) {
      console.error('Error adding debt:', error)
    }
  }

  const handleEditDebt = (debt) => {
    setEditingDebt(debt)
    setShowAddForm(true)
  }

  const handleUpdateDebt = async (updatedDebt) => {
    try {
      const res = await updateDebt(updatedDebt)
      setDebts(debts.map(d => d.id === updatedDebt.id ? res : d))
      setShowAddForm(false)
      setEditingDebt(null)
    } catch (error) {
      console.error('Error updating debt:', error)
    }
  }

  const handleDeleteDebt = async (id) => {
    try {
      await deleteDebt(id)
      setDebts(debts.filter(d => d.id !== id))
    } catch (error) {
      console.error('Error deleting debt:', error)
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>
  }

  const totalDebt = debts.reduce((total, debt) => total + debt.remainingAmount, 0)
  const totalMonthlyPayment = debts.reduce((total, debt) => total + debt.minimumPayment, 0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Debt Manager</h1>
        <button
          onClick={() => {
            setEditingDebt(null)
            setShowAddForm(!showAddForm)
          }}
          className="btn btn-primary"
        >
          {showAddForm ? 'Cancel' : 'Add Debt'}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
          <h3 className="text-lg font-semibold text-primary-800 mb-2">Total Debt</h3>
          <p className="text-3xl font-bold text-primary-700">₹{totalDebt.toLocaleString()}</p>
        </div>

        <div className="card bg-gradient-to-br from-secondary-50 to-secondary-100 border-secondary-200">
          <h3 className="text-lg font-semibold text-secondary-800 mb-2">Monthly Payment</h3>
          <p className="text-3xl font-bold text-secondary-700">₹{totalMonthlyPayment.toLocaleString()}</p>
        </div>

        <div className="card bg-gradient-to-br from-accent-50 to-accent-100 border-accent-200">
          <h3 className="text-lg font-semibold text-accent-800 mb-2">Number of Debts</h3>
          <p className="text-3xl font-bold text-accent-700">{debts.length}</p>
        </div>
      </div>

      {/* Add/Edit Debt Form */}
      {showAddForm && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="card"
        >
          <AddDebtForm
            onAdd={handleAddDebt}
            onUpdate={handleUpdateDebt}
            onCancel={() => {
              setShowAddForm(false)
              setEditingDebt(null)
            }}
            debt={editingDebt}
          />
        </motion.div>
      )}

      {/* Debts List */}
      <div className="card">
        <DebtList
          debts={debts}
          onDelete={handleDeleteDebt}
          onEdit={handleEditDebt}
        />
      </div>
    </motion.div>
  )
}

export default DebtManager
