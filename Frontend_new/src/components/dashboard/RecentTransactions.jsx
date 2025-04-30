import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { 
  FiDollarSign, 
  FiHome,
  FiShoppingBag, 
  FiCoffee, 
  FiCreditCard, 
  FiWifi,
  FiTruck,
  FiMusic,
  FiBriefcase
} from 'react-icons/fi'

const RecentTransactions = ({ transactions }) => {
  // Get only the 5 most recent transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
  
  const getCategoryIcon = (category) => {
    const icons = {
      salary: <FiBriefcase className="h-4 w-4" />,
      freelance: <FiDollarSign className="h-4 w-4" />,
      rent: <FiHome className="h-4 w-4" />,
      groceries: <FiShoppingBag className="h-4 w-4" />,
      food: <FiCoffee className="h-4 w-4" />,
      utilities: <FiWifi className="h-4 w-4" />,
      entertainment: <FiMusic className="h-4 w-4" />,
      transport: <FiTruck className="h-4 w-4" />,
      shopping: <FiShoppingBag className="h-4 w-4" />,
      investments: <FiDollarSign className="h-4 w-4" />,
    }
    
    return icons[category] || <FiCreditCard className="h-4 w-4" />
  }
  
  const getCategoryColorClass = (category, type) => {
    if (type === 'income') return 'bg-success-100 text-success-700'
    
    const colorMap = {
      rent: 'bg-primary-100 text-primary-700',
      groceries: 'bg-secondary-100 text-secondary-700',
      food: 'bg-warning-100 text-warning-700',
      utilities: 'bg-accent-100 text-accent-700',
      entertainment: 'bg-indigo-100 text-indigo-700',
      transport: 'bg-cyan-100 text-cyan-700',
      shopping: 'bg-rose-100 text-rose-700',
    }
    
    return colorMap[category] || 'bg-gray-100 text-gray-700'
  }
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }
  
  if (recentTransactions.length === 0) {
    return <p className="text-gray-500 text-center py-4">No recent transactions</p>
  }
  
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="divide-y divide-gray-100"
    >
      {recentTransactions.map((transaction) => (
        <motion.div
          key={transaction.id}
          variants={item}
          className="flex items-center py-3 hover:bg-gray-50 rounded-lg px-2 transition-colors"
        >
          <div className={`p-2 rounded-full mr-4 ${getCategoryColorClass(transaction.category, transaction.type)}`}>
            {getCategoryIcon(transaction.category)}
          </div>
          
          <div className="flex-1">
            <p className="font-medium text-gray-800">{transaction.description}</p>
            <p className="text-xs text-gray-500">
              {format(new Date(transaction.date), 'MMM d, yyyy')} • {transaction.category}
            </p>
          </div>
          
          <div className={`font-semibold ${transaction.type === 'income' ? 'text-success-600' : 'text-error-600'}`}>
            {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default RecentTransactions