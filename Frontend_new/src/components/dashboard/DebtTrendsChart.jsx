import { Bar } from 'react-chartjs-2'

const DebtTrendsChart = ({ debts }) => {
  // Group debts by type and calculate values
  const debtsByCategory = debts.reduce((acc, debt) => {
    const category = debt.name
    acc[category] = {
      total: debt.amount,
      remaining: debt.remainingAmount,
      paid: debt.amount - debt.remainingAmount
    }
    return acc
  }, {})
  
  const data = {
    labels: Object.keys(debtsByCategory),
    datasets: [
      {
        label: 'Paid',
        data: Object.values(debtsByCategory).map(d => d.paid),
        backgroundColor: 'rgb(16, 185, 129)',
        barPercentage: 0.7,
      },
      {
        label: 'Remaining',
        data: Object.values(debtsByCategory).map(d => d.remaining),
        backgroundColor: 'rgb(239, 68, 68)',
        barPercentage: 0.7,
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
        stacked: true,
        grid: {
          display: false
        }
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '₹' + value.toLocaleString();
          }
        }
      }
    }
  }
  
  return (
    <div className="h-64">
      <Bar data={data} options={options} />
    </div>
  )
}

export default DebtTrendsChart