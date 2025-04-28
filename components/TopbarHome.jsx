import React from 'react'
import { FaBars, FaUser } from 'react-icons/fa'

const TopbarHome = () => {
  return (
    <div className="bg-black text-white py-2 px-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button className="md:hidden">
                  <FaBars />
                </button>
                <span className="text-sm">Today: {new Date().toLocaleDateString('en-IN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-1">
                  <FaUser />
                </button>
                <button className="bg-red-600 px-3 py-1 text-sm rounded">Subscribe</button>
              </div>
            </div>
  )
}

export default TopbarHome