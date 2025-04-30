import { useState } from 'react'
import { motion } from 'framer-motion'
import { Line } from 'react-chartjs-2'
import { FiPlus, FiArrowUp, FiArrowDown } from 'react-icons/fi'

const Savings = () => {
  const [savings, setSavings] = useState([
    {
      id: 1,
      name: 'Emergency Fund',
      balance: 6500,
      target: 10000,
      transactions: [
        { date: '2025-01-01', amount: 500 },
        { date: '2025-01-15', amount: 1000 },
        { date: '2025-02-01', amount: 500 },
        { date: '2025-02-15', amount: 1000 },
        { date: '2025-03-01', amount: 500 },
      ]
    },
    {
      id: 2,
      name: 'Vacation Fund',
      balance: 2500,
      target: 5000,
      transactions: [
        { date: '2025-01-01', amount: 300 },
        { date: '2025-01-15', amount: 500 },
        { date: '2025-02-01', amount: 300 },
        { date: '2025-02-15', amount: 500 },
        { date: '2025-03-01', amount: 300 },
      ]
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState(savings[0])

  const chartData = {
    labels: selectedAccount.transactions.map(t => new Date(t.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Balance',
        data: selectedAccount.transactions.map((_, index) => {
          return selectedAccount.transactions
            .slice(0, index + 1)
            .reduce((sum, t) => sum + t.amount, 0)
        }),
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.4
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Balance: ₹${context.parsed.y.toLocaleString()}`
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '₹' + value.toLocaleString()
          }
        }
      }
    }
  }

  const handleAddSaving = (e) => {
    e.preventDefault()
    // Add new saving account logic here
    setShowAddForm(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Savings Accounts</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn btn-primary flex items-center gap-2"
        >
          <FiPlus className="w-4 h-4" />
          Add Account
        </button>
      </div>

      {showAddForm && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="card"
        >
          <form onSubmit={handleAddSaving} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Account Name</label>
                <input type="text" className="input" required />
              </div>
              <div>
                <label className="label">Initial Balance</label>
                <input type="number" className="input" required />
              </div>
              <div>
                <label className="label">Target Amount</label>
                <input type="number" className="input" required />
              </div>
              <div>
                <label className="label">Account Type</label>
                <select className="input">
                  <option value="savings">Regular Savings</option>
                  <option value="emergency">Emergency Fund</option>
                  <option value="goal">Goal-based Savings</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add Account
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Accounts Summary */}
        <div className="lg:col-span-1 space-y-4">
          {savings.map((account) => (
            <motion.div
              key={account.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`card cursor-pointer transition-all ${
                selectedAccount.id === account.id
                  ? 'border-primary-500 shadow-lg'
                  : 'hover:border-primary-200'
              }`}
              onClick={() => setSelectedAccount(account)}
            >
              <h3 className="text-lg font-semibold mb-2">{account.name}</h3>
              <div className="flex justify-between items-baseline mb-4">
                <p className="text-2xl font-bold text-primary-600">
                  ₹{account.balance.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Target: ₹{account.target.toLocaleString()}
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-500 h-2 rounded-full"
                  style={{
                    width: `${(account.balance / account.target) * 100}%`
                  }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Account Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Balance History</h3>
            <div className="h-64">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {selectedAccount.transactions.map((transaction, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-success-100 text-success-600">
                      <FiArrowUp className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium">Deposit</p>
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-success-600">
                    +₹{transaction.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Savings