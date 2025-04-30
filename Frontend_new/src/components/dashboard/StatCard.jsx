import { motion } from 'framer-motion'
import { FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi'

const StatCard = ({ title, value, type, trend, color }) => {
  
  const formatValue = () => {
    if (type === 'currency') {
      return `₹${value.toLocaleString()}`
    }
    if (type === 'percentage') {
      return `${value}%`
    }
    return value
  }
  
  const getTrendColor = () => {
    if (trend > 0) return 'text-success-500'
    if (trend < 0) return 'text-error-500'
    return 'text-gray-500'
  }
  
  const getTrendIcon = () => {
    if (trend > 0) return <FiArrowUpRight className="h-4 w-4" />
    if (trend < 0) return <FiArrowDownRight className="h-4 w-4" />
    return null
  }
  
  // Determine background gradient based on color prop
  const getBgClass = () => {
    const colorMap = {
      primary: 'from-primary-50 to-primary-100 border-primary-200',
      secondary: 'from-secondary-50 to-secondary-100 border-secondary-200',
      success: 'from-success-50 to-success-100 border-success-200',
      warning: 'from-warning-50 to-warning-100 border-warning-200',
      error: 'from-error-50 to-error-100 border-error-200',
      accent: 'from-accent-50 to-accent-100 border-accent-200',
    }
    
    return colorMap[color] || colorMap.primary
  }
  
  return (
    <motion.div
      className={`card bg-gradient-to-br ${getBgClass()}`}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="flex flex-col h-full">
        <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
        <p className="text-2xl font-bold">{formatValue()}</p>
        <div className="mt-auto pt-2 flex items-center">
          <span className={`flex items-center text-sm font-medium ${getTrendColor()}`}>
            {Math.abs(trend)}%
            {getTrendIcon()}
          </span>
          <span className="text-xs text-gray-500 ml-1">vs last month</span>
        </div>
      </div>
    </motion.div>
  )
}

export default StatCard