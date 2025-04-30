import { motion } from 'framer-motion'

const ReportSummary = ({ reportData }) => {
  // Calculate savings percentage
  const savingsPercentage =
    (reportData.savings ?? 0) / (reportData.income?.total ?? 1) * 100

  // Calculate expense category percentages
  const expensePercentages = {}
  Object.entries(reportData.expenses?.categories ?? {}).forEach(([category, amount]) => {
    expensePercentages[category] = (amount / (reportData.expenses?.total ?? 1)) * 100
  })

  // Income category percentages
  const incomePercentages = {}
  Object.entries(reportData.income?.categories ?? {}).forEach(([category, amount]) => {
    incomePercentages[category] = (amount / (reportData.income?.total ?? 1)) * 100
  })

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h4 className="font-medium mb-2 text-gray-700">Income Summary</h4>
          <div className="space-y-2">
            {Object.entries(reportData.income?.categories ?? {}).map(([category, amount]) => (
              <div key={category} className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="capitalize">{category}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-800 font-medium">
                    ${amount?.toLocaleString() ?? '0'}
                  </span>
                  <span className="text-xs text-gray-500">({incomePercentages[category].toFixed(1)}%)</span>
                </div>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-2 flex justify-between font-medium">
              <span>Total Income</span>
              <span className="text-primary-600">
                ${reportData.income?.total?.toLocaleString() ?? '0'}
              </span>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="font-medium mb-2 text-gray-700">Expense Summary</h4>
          <div className="space-y-2">
            {Object.entries(reportData.expenses?.categories ?? {}).map(([category, amount]) => (
              <div key={category} className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="capitalize">{category}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-800 font-medium">
                    ${amount?.toLocaleString() ?? '0'}
                  </span>
                  <span className="text-xs text-gray-500">({expensePercentages[category].toFixed(1)}%)</span>
                </div>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-2 flex justify-between font-medium">
              <span>Total Expenses</span>
              <span className="text-error-600">
                ${reportData.expenses?.total?.toLocaleString() ?? '0'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Savings & Debt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-4 bg-gray-50 rounded-lg border border-gray-100"
      >
        <h4 className="font-medium mb-4 text-gray-700">Monthly Overview</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Income</p>
            <p className="text-lg font-semibold text-primary-600">
              ₹{reportData.income?.total?.toLocaleString() ?? '0'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Expenses</p>
            <p className="text-lg font-semibold text-error-600">
              ₹{reportData.expenses?.total?.toLocaleString() ?? '0'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Savings</p>
            <p className="text-lg font-semibold text-success-600">
              ₹{reportData.savings?.toLocaleString() ?? '0'}
              <span className="text-xs font-normal ml-1">({savingsPercentage.toFixed(1)}% of income)</span>
            </p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h5 className="font-medium mb-2 text-gray-700">Debt Payments</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Paid Towards Debt</p>
              <p className="text-lg font-semibold text-accent-600">
                ₹{reportData.debt?.totalPaid?.toLocaleString() ?? '0'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Interest Paid</p>
              <p className="text-lg font-semibold text-warning-600">
                ₹{reportData.debt?.totalInterest?.toLocaleString() ?? '0'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-4 bg-primary-50 rounded-lg border border-primary-100"
      >
        <h4 className="font-medium mb-2 text-primary-700">Recommendations</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Your savings rate is {savingsPercentage.toFixed(1)}%. Aim to save at least 20% of your income.</li>
          <li>Consider reducing spending on entertainment to increase your savings.</li>
          <li>You're making good progress on your debt payments!</li>
        </ul>
      </motion.div>
    </div>
  )
}

export default ReportSummary
