import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#0B1F3A] text-white font-semibold py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-10 justify-between">
        <div className="w-full md:w-[30%]">
          <h2 className="text-2xl font-semibold tracking-wide">AeroElite</h2>
          <p className="mt-4 text-sm text-gray-400">
            Luxury private jet services for elite travelers. Safety, privacy, and punctuality are our top priorities.
          </p>
        </div>
        <div className="w-full sm:w-[45%] md:w-[20%]">
          <h3 className="text-lg font-medium mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Fleet</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Book</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
        <div className="w-full sm:w-[45%] md:w-[20%]">
          <h3 className="text-lg font-medium mb-4">Contact</h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>Email: <a href="mailto:info@aeroelite.com" className="hover:text-white">info@aeroelite.com</a></li>
            <li>Phone: <a href="tel:+1234567890" className="hover:text-white">+1 (234) 567-890</a></li>
            <li>Location: Miami, FL, USA</li>
          </ul>
        </div>
      </div>
      <div className="mt-10 text-center text-sm text-gray-600">
        &copy; 2025 AeroElite. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer