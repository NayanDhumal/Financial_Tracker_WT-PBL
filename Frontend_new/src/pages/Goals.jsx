import { useState } from 'react'
import { motion } from 'framer-motion'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'

const Goals = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: 'Emergency Fund',
      target: 10000,
      current: 6500,
      deadline: '2025-12-31',
      category: 'savings',
      priority: 'high'
    },
    {
      id: 2,
      name: 'New Car',
      target: 25000,
      current: 8000,
      deadline: '2026-06-30',
      category: 'purchase',
      priority: 'medium'
    },
    {
      id: 3,
      name: 'House Down Payment',
      target: 50000,
      current: 15000,
      deadline: '2027-01-31',
      category: 'savings',
      priority: 'high'
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    target: '',
    current: '',
    deadline: '',
    category: 'savings',
    priority: 'medium'
  })

  const calculateProgress = (current, target) => {
    return Math.round((current / target) * 100)
  }

  const getProgressColor = (progress) => {
    if (progress < 25) return '#EF4444'
    if (progress < 50) return '#F59E0B'
    if (progress < 75) return '#3B82F6'
    return '#10B981'
  }

  const getPriorityBadge = (priority) => {
    const colors = {
      high: 'bg-error-100 text-error-700',
      medium: 'bg-warning-100 text-warning-700',
      low: 'bg-success-100 text-success-700'
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[priority]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newGoal = {
      id: goals.length + 1,
      ...formData,
      target: parseFloat(formData.target),
      current: parseFloat(formData.current)
    }
    setGoals([...goals, newGoal])
    setShowAddForm(false)
    setFormData({
      name: '',
      target: '',
      current: '',
      deadline: '',
      category: 'savings',
      priority: 'medium'
    })
  }

  const handleDelete = (id) => {
    setGoals(goals.filter(goal => goal.id !== id))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Financial Goals</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn btn-primary flex items-center gap-2"
        >
          <FiPlus className="w-4 h-4" />
          Add Goal
        </button>
      </div>

      {showAddForm && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="card"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Goal Name</label>
                <input
                  type="text"
                  className="input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="label">Target Amount</label>
                <input
                  type="number"
                  className="input"
                  value={formData.target}
                  onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="label">Current Amount</label>
                <input
                  type="number"
                  className="input"
                  value={formData.current}
                  onChange={(e) => setFormData({ ...formData, current: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="label">Deadline</label>
                <input
                  type="date"
                  className="input"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="label">Category</label>
                <select
                  className="input"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="savings">Savings</option>
                  <option value="purchase">Purchase</option>
                  <option value="debt">Debt Payoff</option>
                  <option value="investment">Investment</option>
                </select>
              </div>
              <div>
                <label className="label">Priority</label>
                <select
                  className="input"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
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
                Add Goal
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const progress = calculateProgress(goal.current, goal.target)
          return (
            <motion.div
              key={goal.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="card"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{goal.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{goal.category}</p>
                </div>
                {getPriorityBadge(goal.priority)}
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="w-24 h-24">
                  <CircularProgressbar
                    value={progress}
                    text={`${progress}%`}
                    styles={buildStyles({
                      pathColor: getProgressColor(progress),
                      textColor: getProgressColor(progress),
                      trailColor: '#E5E7EB'
                    })}
                  />
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Progress</p>
                  <p className="text-lg font-semibold">
                    ₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    Deadline: {new Date(goal.deadline).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                  title="Edit"
                >
                  <FiEdit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(goal.id)}
                  className="p-2 rounded-full hover:bg-error-100 text-gray-500 hover:text-error-600 transition-colors"
                  title="Delete"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default Goals