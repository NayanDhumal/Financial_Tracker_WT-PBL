import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiHome, 
  FiDollarSign, 
  FiCreditCard, 
  FiPieChart, 
  FiSettings,
  FiChevronLeft,
  FiChevronRight,FiTarget,
  FiStar,
  FiUser,
} from 'react-icons/fi'

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <FiHome className="w-5 h-5" /> },
    { path: '/transactions', name: 'Transactions', icon: <FiDollarSign className="w-5 h-5" /> },
    { path: '/debts', name: 'Debt Manager', icon: <FiCreditCard className="w-5 h-5" /> },
     { path: '/goals', name: 'Goals', icon: <FiTarget className="w-5 h-5" /> },
    { path: '/savings', name: 'Savings', icon: <FiStar className="w-5 h-5" /> },
    { path: '/reports', name: 'Reports', icon: <FiPieChart className="w-5 h-5" /> },
    { path: '/profile', name: 'Profile', icon: <FiUser className="w-5 h-5" /> },
    
  ]
  
  return (
    <motion.aside
      className={`bg-white shadow-md z-20 h-full ${isOpen ? 'w-64' : 'w-20'} transition-width duration-300 ease-in-out flex flex-col`}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b">
        {isOpen ? (
          <h1 className="text-xl font-bold text-primary-600">FinTrack</h1>
        ) : (
          <span className="text-xl font-bold text-primary-600">FT</span>
        )}
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          {isOpen ? (
            <FiChevronLeft className="w-5 h-5" />
          ) : (
            <FiChevronRight className="w-5 h-5" />
          )}
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-2 px-3">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => `
                  flex items-center p-3 rounded-lg transition-all
                  ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}
                `}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {isOpen && <span className="ml-3 font-medium">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t">
        {isOpen && (
          <div className="text-xs text-gray-500">
            <p>FinTrack v1.0</p>
            <p>© 2025 All rights reserved</p>
          </div>
        )}
      </div>
    </motion.aside>
  )
}

export default Sidebar