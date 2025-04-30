import { Line } from 'react-chartjs-2'
import { format, subMonths } from 'date-fns'

const ExpenseChart = ({ transactions }) => {
  // Generate last 6 months labels
  const generateMonthLabels = (count) => {
    const labels = []
    const today = new Date()
    
    for (let i = count - 1; i >= 0; i--) {
      const month = subMonths(today, i)
      labels.push(format(month, 'MMM'))
    }
    
    return labels
  }
  
  // Generate mock data for the last 6 months
  const generateMockData = () => {
    // For a real app, we would process transactions to generate this data
    return {
      income: [4200, 4500, 4300, 5100, 4800, 5500],
      expenses: [3100, 3300, 3200, 3600, 3400, 3700]
    }
  }
  
  const monthLabels = generateMonthLabels(6)
  const { income, expenses } = generateMockData()
  
  const data = {
    labels: monthLabels,
    datasets: [
      {
        label: 'Income',
        data: income,
        fill: 'start',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: expenses,
        fill: 'start',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        borderColor: 'rgb(245, 158, 11)',
        tension: 0.4,
      }
    ]
  }
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          boxWidth: 6,
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '₹' + value.toLocaleString();
          }
        }
      }
    },
    elements: {
      point: {
        radius: 3,
        hoverRadius: 5
      }
    }
  }
  
  return (
    <div className="h-64">
      <Line data={data} options={options} />
    </div>
  )
}

export default ExpenseChart