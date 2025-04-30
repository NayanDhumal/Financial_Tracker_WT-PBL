import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiBell, FiSettings, FiLogOut, FiMenu } from 'react-icons/fi'

const Topbar = ({ user, toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left side - Mobile menu button and breadcrumb */}
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
          >
            <FiMenu className="h-6 w-6" />
          </button>
          <div className="ml-4 font-medium text-gray-800">
            {/* Context-aware title could go here */}
          </div>
        </div>
        
        {/* Right side - User info and actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            <FiBell className="h-5 w-5" />
          </button>
          
          {/* User profile */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-3 focus:outline-none"
            >
              <motion.img 
                src={user.avatar} 
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover border-2 border-white shadow-sm"
                whileHover={{ scale: 1.05 }}
              />
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
            </button>
            
            {/* Dropdown menu */}
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100"
              >
                <a 
                  href="/profile" 
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <img src={user.avatar} alt="" className="h-6 w-6 rounded-full mr-2" />
                  <span>My Profile</span>
                </a>
                
                <div className="border-t border-gray-100 my-1"></div>
                <a
                  href="#"
                  onClick={async (e) => {
                    e.preventDefault();
                    try {
                      await fetch('http://localhost:3000/api/users/logout', {
                        method: 'POST',
                        credentials: 'include', // important for cookie handling
                      });
                      window.location.href = '/login'; // redirect to login or home page
                    } catch (error) {
                      console.error('Logout failed:', error);
                    }
                  }}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FiLogOut className="h-4 w-4 mr-2" />
                  <span>Sign out</span>
                </a>

              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar