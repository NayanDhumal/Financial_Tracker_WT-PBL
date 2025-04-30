import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Layouts
import MainLayout from './layouts/MainLayout'
import axios from 'axios'

// Pages
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import DebtManager from './pages/DebtManager'
import Reports from './pages/Reports'
import Login from './pages/Login'
import Register from './pages/Register'
import Landing from './pages/Landing'
import Profile from './pages/Profile'
import Goals from './pages/Goals'
import Savings from './pages/Savings'
// Services
import { setupAxiosInterceptors } from './services/api'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [user, setUser] = useState({
    
    name: 'User.name',
    email: 'alex@example.com',
    avatar: 'https://i.pravatar.cc/150?img=68'
  })

  useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await axios.get('http://localhost:3000/api/users/profile', {
            withCredentials: true // if you're using cookies/JWT auth
          })
          setUser(res.data)
          console.log(res.data)
          
        } catch (error) {
          console.error('Error fetching user:', error)
        }
      }
  
      fetchUser()
    }, [])

  if (!isAuthenticated) {
    // In a real app, you would redirect to login
    return <div>Not authenticated</div>
  }

  return (
    <AnimatePresence mode="wait">
      <Routes>
      <Route path="/landing" element={<Landing />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />


        <Route path="/" element={<MainLayout user={user} />}>
          <Route index element={<Navigate to="/dashboard" replace />} />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="debts" element={<DebtManager />} />
          <Route path="reports" element={<Reports />} />
          <Route path="goals" element={<Goals />} />
          <Route path="savings" element={<Savings />} />
          <Route path="profile" element={<Profile user={user} setUser={setUser} />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default App