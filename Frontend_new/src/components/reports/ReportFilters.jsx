import { motion } from 'framer-motion'
import { format } from 'date-fns'

const ReportFilters = ({ filters, setFilters }) => {
  // Generate month options
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: format(new Date(2025, i, 1), 'MMMM')
  }))
  
  // Generate year options (last 5 years)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => ({
    value: currentYear - i,
    label: (currentYear - i).toString()
  }))
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: parseInt(value) })
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4"
    >
      <div className="flex-1">
        <label htmlFor="month" className="label">Month</label>
        <select
          id="month"
          name="month"
          className="input"
          value={filters.month}
          onChange={handleChange}
        >
          {months.map(month => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex-1">
        <label htmlFor="year" className="label">Year</label>
        <select
          id="year"
          name="year"
          className="input"
          value={filters.year}
          onChange={handleChange}
        >
          {years.map(year => (
            <option key={year.value} value={year.value}>
              {year.label}
            </option>
          ))}
        </select>
      </div>
      
      <button className="btn btn-primary">
        Generate Report
      </button>
    </motion.div>
  )
}

export default ReportFilters