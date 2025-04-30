import axios from 'axios'

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies/authentication
})

// Setup axios interceptors for authentication
export const setupAxiosInterceptors = () => {
  // Request interceptor
  api.interceptors.request.use(
    (config) => {
      // You can add auth token from cookies/localStorage here if needed
      return config
    },
    (error) => Promise.reject(error)
  )
  
  // Response interceptor
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle authentication errors (401, 403)
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        console.error('Authentication error', error)
        // In a real app, you might redirect to login or refresh token
      }
      return Promise.reject(error)
    }
  )
}

// Transactions API
 // assuming axios instance is configured here

 export const getTransactions = async (filters = {}) => {
  try {
    const response = await api.get('/transactions', {
      withCredentials: true, 
      params: filters
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error.response?.data || error.message);
    throw error;
  }
};


export const addTransaction = async (transactionData) => {
  const response = await api.post('/transactions', transactionData);
  return response.data;
};



export const updateTransaction = async (id, transaction) => {
  try {
    const response = await api.put(`/transactions/${id}`, transaction)
    return response.data
  } catch (error) {
    console.error('Error updating transaction:', error)
    throw error
  }
}

export const deleteTransaction = async (id) => {
  const res = await axios.delete(`http://localhost:3000/api/transactions/${id}`, {
    withCredentials: true,
  });
  return res.data;
};


// Debts API
export const getDebts = async () => {
  const res = await api.get('/debts')
  return res.data
}



export const addDebt = async (debt) => {
  try {
    const response = await api.post('/debts', debt)
    return response.data
  } catch (error) {
    console.error('Error adding debt:', error)
    throw error
  }
}

export const updateDebt = async (debt) => {
  const res = await api.put(`/debts/${debt.id}`, debt)
  return res.data
}

export const deleteDebt = async (id) => {
  try {
    const response = await api.delete(`/debts/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting debt:', error)
    throw error
  }
}

// Reports API
export const getMonthlyReport = async (month, year) => {
  try {
    const response = await api.get('/reports/monthly', {
      params: { month, year}
    })

    const rawData = response.data

    const incomeTotal = rawData.transactionSummary
      .filter(txn => txn.type === 'income')
      .reduce((acc, txn) => acc + txn.amount, 0)

    const expenseTotal = rawData.transactionSummary
      .filter(txn => txn.type === 'expense')
      .reduce((acc, txn) => acc + txn.amount, 0)

    const debtPaid = rawData.debtSummary
      .reduce((acc, debt) => acc + (debt.amount - debt.remainingAmount), 0)

    const structuredData = {
      income: { total: incomeTotal },
      expenses: { total: expenseTotal },
      savings: incomeTotal - expenseTotal,
      debt: { totalPaid: debtPaid },
      ...rawData
    }

    return structuredData
  } catch (error) {
    console.error('Error fetching monthly report:', error)
    throw error
  }
}


export const downloadReport = async (month, year, format = 'pdf') => {
  try {
    const response = await api.get('/reports/download', {
      params: { month, year, format },
      responseType: 'blob', // Important for downloading files
    })
    
    // Create a download link
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `financial-report-${year}-${month}.${format}`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    
    return true
  } catch (error) {
    console.error('Error downloading report:', error)
    throw error
  }
}

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password })
    console.log('Trying to login with:', { email, password })
    return response.data
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData)
    return response.data
  } catch (error) {
    console.error('Registration failed:', error)
    throw error
  }
}

export const logoutUser = async () => {
  try {
    const response = await api.post('/auth/logout')
    return response.data
  } catch (error) {
    console.error('Logout failed:', error)
    throw error
  }
}

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me')
    return response.data
  } catch (error) {
    console.error('Error fetching current user:', error)
    throw error
  }
}

export default api