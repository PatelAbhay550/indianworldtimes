import React from 'react'
import { FaSearch } from 'react-icons/fa'

const Headerhome = () => {
  return (
    <header className="border-b border-gray-200 dark:border-gray-700 py-4 px-4 md:px-8">
    <div className="flex flex-col md:flex-row justify-between items-center">
      <div className="text-center md:text-left mb-4 md:mb-0">
        <h1 className="text-4xl font-serif font-bold text-red-600">Indian World Times</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">Bringing you the truth since 2023</p>
      </div>
      <div className="relative w-full md:w-1/3">
        <form action="/search" method="GET">
          <input
            type="text"
            name="q"
            placeholder="Search news..."
            className="w-full border border-gray-300 dark:border-gray-600 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </form>
      </div>
    </div>
  </header>
  )
}

export default Headerhome