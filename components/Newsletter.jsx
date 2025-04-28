import React from 'react'

const Newsletter = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-800 py-12 px-4">
    <div className="container mx-auto max-w-4xl text-center">
      <h2 className="text-2xl font-bold mb-4 font-serif">Stay Informed</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Subscribe to our newsletter for daily updates delivered to your inbox
      </p>
      <form className="flex flex-col sm:flex-row gap-2 justify-center">
        <input
          type="email"
          name="email"
          placeholder="Your email address"
          className="flex-grow max-w-md px-4 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-700"
          required
        />
        <button 
          type="submit" 
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Subscribe
        </button>
      </form>
    </div>
  </section>
  )
}

export default Newsletter