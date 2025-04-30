import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { getTransactions, getDebts, getMonthlyReport } from '../services/api'
import StatCard from '../components/dashboard/StatCard'
import ExpenseChart from '../components/dashboard/ExpenseChart'
import DebtTrendsChart from '../components/dashboard/DebtTrendsChart'
import RecentTransactions from '../components/dashboard/RecentTransactions'

const Dashboard = () => {
  const [transactions, setTransactions] = useState([])
  const [debts, setDebts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    totalBalance: 0,
    totalDebt: 0
  })
  
  // For demo purposes, let's add some mock data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
  
      try {
        // Fetch from backend APIs
        const transactions = await getTransactions()
        const debts = await getDebts()
  
        setTransactions(transactions)
        setDebts(debts)
  
        // Calculate stats
        const totalIncome = transactions
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0)
  
        const totalExpenses = transactions
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0)
  
        const totalDebt = debts.reduce((sum, d) => sum + d.remainingAmount, 0)
  
        setStats({
          totalIncome,
          totalExpenses,
          totalBalance: totalIncome - totalExpenses,
          totalDebt
        })
  
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }
  
    fetchData()
  }, [])
  
  
  if (isLoading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="text-sm text-gray-500">
          {format(new Date(), 'EEEE, MMMM d, yyyy')}
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Income"
          value={stats.totalIncome}
          type="currency"
          trend={+12.5}
          color="primary"
        />
        <StatCard
          title="Total Expenses"
          value={stats.totalExpenses}
          type="currency"
          trend={-5.2}
          color="warning"
        />
        <StatCard
          title="Balance"
          value={stats.totalBalance}
          type="currency"
          trend={+8}
          color="success"
        />
        <StatCard
          title="Total Debt"
          value={stats.totalDebt}
          type="currency"
          trend={-3.4}
          color="error"
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          className="card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold mb-4">Income vs. Expenses</h3>
          <ExpenseChart transactions={transactions} />
        </motion.div>
        
        <motion.div
          className="card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-4">Debt Trends</h3>
          <DebtTrendsChart debts={debts} />
        </motion.div>
      </div>
      
      {/* Recent Transactions */}
      <motion.div
        className="card"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <a href="/transactions" className="text-sm text-primary-600 hover:text-primary-800">View All</a>
        </div>
        <RecentTransactions transactions={transactions} />
      </motion.div>
    </motion.div>
  )
}

export default Dashboard