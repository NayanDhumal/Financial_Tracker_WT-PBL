import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { FiEdit, FiTrash2 } from 'react-icons/fi'

const DebtList = ({ debts, onDelete, onEdit }) => {
  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'bg-warning-100 text-warning-800 border-warning-200',
      paid: 'bg-success-100 text-success-800 border-success-200',
      overdue: 'bg-error-100 text-error-800 border-error-200',
    }
    
    return (
      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${statusClasses[status] || statusClasses.active}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }
  
  const calculateProgress = (debt) => {
    const paid = debt.amount - debt.remainingAmount
    const percentage = (paid / debt.amount) * 100
    return Math.round(percentage)
  }
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }
  
  if (debts.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">No debts found. Add your first debt to start tracking.</p>
      </div>
    )
  }
  
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Name</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Total</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Remaining</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Interest Rate</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Due Date</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Progress</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Status</th>
              <th className="py-3 px-4 text-right font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {debts.map((debt) => (
              <motion.tr
                key={debt.id}
                variants={item}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4 font-medium">{debt.name}</td>
                <td className="py-3 px-4">₹{debt.amount.toLocaleString()}</td>
                <td className="py-3 px-4">₹{debt.remainingAmount.toLocaleString()}</td>
                <td className="py-3 px-4">{debt.interestRate}%</td>
                <td className="py-3 px-4">{format(new Date(debt.dueDate), 'MMM d, yyyy')}</td>
                <td className="py-3 px-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full"
                      style={{ width: `4{calculateProgress(debt)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{calculateProgress(debt)}% paid</div>
                </td>
                <td className="py-3 px-4">{getStatusBadge(debt.status)}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => onEdit(debt)}
                      className="p-1 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
                      title="Edit"
                    >
                      <FiEdit className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={() => onDelete(debt.id)}
                      className="p-1 rounded-full hover:bg-red-100 text-gray-500 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default DebtList