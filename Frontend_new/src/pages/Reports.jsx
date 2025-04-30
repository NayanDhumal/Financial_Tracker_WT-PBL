import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { getMonthlyReport, downloadReport } from '../services/api'
import MonthlyReportChart from '../components/reports/MonthlyReportChart'
import ReportFilters from '../components/reports/ReportFilters'
import ReportSummary from '../components/reports/ReportSummary'
import axios from 'axios'

const Reports = () => {
  const [reportData, setReportData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  })
  
  // For demo purposes, let's add some mock data
  useEffect(() => {
    const fetchReport = async () => {
      setIsLoading(true)
      try {
        const data = await getMonthlyReport(filters.month+1, filters.year)
        console.log('Report data:', data)
        setReportData(data)
      } catch (error) {
        console.error('Error loading report:', error)
      } finally {
        setIsLoading(false)
      }
    }
  
    fetchReport()
  }, [filters])
  
  
  
  const handleDownload = async (format) => {
    try {
      // In a real app, this would trigger an API call
      alert(`Downloading report as ${format}...`)
      
      // Simulate API call
      downloadReport(filters.month+1, filters.year, format)
    } catch (error) {
      console.error('Error downloading report:', error)
    }
  }
  
  if (isLoading || !reportData) {
    return <div className="flex justify-center items-center h-full">Loading...</div>
  }
  
  const monthName = format(new Date(filters.year, filters.month), 'MMMM')
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Financial Reports</h1>
        <div className="flex gap-2">
          <button
            onClick={() => handleDownload('pdf')}
            className="btn btn-outline-primary"
          >
            Download PDF
          </button>
          <button
            onClick={() => handleDownload('csv')}
            className="btn btn-outline-secondary"
          >
            Export CSV
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="card">
        <ReportFilters filters={filters} setFilters={setFilters} />
      </div>
      
      {/* Report Title */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-800">{monthName} {filters.year} Financial Summary</h2>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
          <h3 className="text-lg font-semibold text-primary-800 mb-2">Total Income</h3>
          <p className="text-3xl font-bold text-primary-700">₹{reportData.income.total.toLocaleString()}</p>
        </div>
        
        <div className="card bg-gradient-to-br from-warning-50 to-warning-100 border-warning-200">
          <h3 className="text-lg font-semibold text-warning-800 mb-2">Total Expenses</h3>
          <p className="text-3xl font-bold text-warning-700">₹{reportData.expenses.total.toLocaleString()}</p>
        </div>
        
        <div className="card bg-gradient-to-br from-success-50 to-success-100 border-success-200">
          <h3 className="text-lg font-semibold text-success-800 mb-2">Savings</h3>
          <p className="text-3xl font-bold text-success-700">₹{reportData.savings.toLocaleString()}</p>
        </div>
        
        <div className="card bg-gradient-to-br from-error-50 to-error-100 border-error-200">
          <h3 className="text-lg font-semibold text-error-800 mb-2">Debt Paid</h3>
          <p className="text-3xl font-bold text-error-700">₹{reportData.debt.totalPaid.toLocaleString()}</p>
        </div>
      </div>
      
      {/* Charts */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Monthly Overview</h3>
        <MonthlyReportChart reportData={reportData} />
      </div>
      
      {/* Detailed Summary */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Detailed Summary</h3>
        <ReportSummary reportData={reportData} />
      </div>
    </motion.div>
  )
}

export default Reports