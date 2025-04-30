import { motion } from 'framer-motion'
import { FiSearch, FiFilter, FiX } from 'react-icons/fi'

const TransactionFilters = ({ filters, setFilters }) => {
  // Define category options
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'salary', label: 'Salary' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'investments', label: 'Investments' },
    { value: 'rent', label: 'Rent/Mortgage' },
    { value: 'groceries', label: 'Groceries' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'transport', label: 'Transportation' },
    { value: 'food', label: 'Food & Dining' },
    { value: 'shopping', label: 'Shopping' },
  ]
  
  // Define type options
  const types = [
    { value: 'all', label: 'All Types' },
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
  ]
  
  // Define date range options
  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'this_month', label: 'This Month' },
    { value: 'last_month', label: 'Last Month' },
    { value: '3_months', label: 'Last 3 Months' },
    { value: '6_months', label: 'Last 6 Months' },
    { value: 'this_year', label: 'This Year' },
  ]
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }
  
  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      setFilters({ ...filters, search: e.target.value })
    }
  }
  
  const clearFilters = () => {
    setFilters({
      type: 'all',
      category: 'all',
      dateRange: 'all',
      search: ''
    })
  }
  
  // Check if any filters are active
  const hasActiveFilters = filters.type !== 'all' || filters.category !== 'all' || filters.dateRange !== 'all' || filters.search !== ''
  
  return (
    <div className="card bg-white">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search transactions..."
            className="pl-10 input"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            onKeyDown={handleSearch}
            onBlur={handleSearch}
          />
        </div>
        
        {/* Type Filter */}
        <div className="w-full lg:w-auto">
          <select
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="input"
          >
            {types.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* Category Filter */}
        <div className="w-full lg:w-auto">
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="input"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* Date Range Filter */}
        <div className="w-full lg:w-auto">
          <select
            name="dateRange"
            value={filters.dateRange}
            onChange={handleChange}
            className="input"
          >
            {dateRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* Clear Filters */}
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="btn btn-error flex items-center gap-1"
            onClick={clearFilters}
          >
            <FiX className="h-4 w-4" />
            Clear
          </motion.button>
        )}
      </div>
    </div>
  )
}

export default TransactionFilters