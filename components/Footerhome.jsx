import { Categories } from '@/lib/categories'
import Link from 'next/link'
import React from 'react'
import { FaEnvelope, FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'

const Footerhome = () => {
  return (
    <footer className="bg-black text-white py-8 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-red-600">Indian World Times</h3>
                <p className="text-gray-400">
                  Bringing you accurate and timely news from India and around the world.
                </p>
                <div className="flex space-x-4 mt-4">
                  <a href="#" className="text-gray-400 hover:text-white">
                    <FaFacebook size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <FaTwitter size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <FaLinkedin size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <FaYoutube size={20} />
                  </a>
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-4">Sections</h4>
                <ul className="space-y-2">
                  {Categories.map((category) => (
                    <li key={category.id}>
                      <Link href={`/category/${category.id}`} className="text-gray-400 hover:text-white">
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                  <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                  <li><Link href="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
                  <li><Link href="/advertise" className="text-gray-400 hover:text-white">Advertise</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Contact Us</h4>
                <address className="text-gray-400 not-italic">
                  <p>123 News Street</p>
                  <p>New Delhi, India 110001</p>
                  <p className="mt-2 flex items-center">
                    <FaEnvelope className="mr-2" /> patelabhay550@gmail.com
                  </p>
                </address>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} Indian World Times. All rights reserved.</p>
            </div>
          </div>
        </footer>
  )
}

export default Footerhome