import { Doughnut } from 'react-chartjs-2'

const MonthlyReportChart = ({ reportData }) => {
  // Fallback for loading state or incomplete data
  if (
    !reportData?.expenses?.categories ||
    !reportData?.income?.categories
  ) {
    return <p className="text-center text-gray-500">Loading chart data...</p>
  }

  // Prepare expense data
  const expenseCategories = Object.keys(reportData.expenses.categories || {})
  const expenseValues = Object.values(reportData.expenses.categories || {})

  // Prepare income data
  const incomeCategories = Object.keys(reportData.income.categories || {})
  const incomeValues = Object.values(reportData.income.categories || {})

  // Color palettes
  const expenseColors = [
    'rgb(239, 68, 68)',
    'rgb(245, 158, 11)',
    'rgb(16, 185, 129)',
    'rgb(14, 165, 233)',
    'rgb(139, 92, 246)',
    'rgb(236, 72, 153)',
    'rgb(96, 165, 250)',
    'rgb(244, 114, 182)',
    'rgb(251, 146, 60)',
  ]

  const incomeColors = [
    'rgb(59, 130, 246)',
    'rgb(16, 185, 129)',
    'rgb(139, 92, 246)',
    'rgb(14, 165, 233)',
    'rgb(236, 72, 153)',
  ]

  // Chart Data
  const expenseData = {
    labels: expenseCategories.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1)),
    datasets: [
      {
        data: expenseValues,
        backgroundColor: expenseColors,
        borderColor: expenseColors.map(color =>
          color.replace('rgb', 'rgba').replace(')', ', 0.5)')
        ),
        borderWidth: 1,
        cutout: '70%',
      },
    ],
  }

  const incomeData = {
    labels: incomeCategories.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1)),
    datasets: [
      {
        data: incomeValues,
        backgroundColor: incomeColors,
        borderColor: incomeColors.map(color =>
          color.replace('rgb', 'rgba').replace(')', ', 0.5)')
        ),
        borderWidth: 1,
        cutout: '70%',
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw
            const total = context.dataset.data.reduce((sum, val) => sum + val, 0)
            const percentage = Math.round((value / total) * 100)
            return `${context.label}: $${value.toLocaleString()} (${percentage}%)`
          },
        },
      },
    },
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h4 className="text-center font-medium mb-4">Expense Breakdown</h4>
        <div className="h-64">
          <Doughnut data={expenseData} options={options} />
        </div>
      </div>

      <div>
        <h4 className="text-center font-medium mb-4">Income Sources</h4>
        <div className="h-64">
          <Doughnut data={incomeData} options={options} />
        </div>
      </div>
    </div>
  )
}

export default MonthlyReportChart
