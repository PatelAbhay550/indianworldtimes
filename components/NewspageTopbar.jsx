import Link from 'next/link'
import React from 'react'
import { FaArrowLeft, FaBookmark, FaShareAlt } from 'react-icons/fa'

const NewspageTopbar = () => {
  return (
    <div className="bg-black text-white py-3">
            <div className="container mx-auto flex justify-between items-center px-4">
              <Link href="/" className="flex items-center hover:text-gray-300">
                <FaArrowLeft className="mr-2" />
                Home
              </Link>
              <div className="flex gap-4">
                <button className="hover:text-gray-300">
                  <FaShareAlt />
                </button>
                <button className="hover:text-gray-300">
                  <FaBookmark />
                </button>
              </div>
            </div>
          </div>
  )
}

export default NewspageTopbar