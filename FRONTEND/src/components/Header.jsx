import React from 'react'
import '../App.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = ({type}) => {
    
    const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
        <header className='bg-[#0B1F3A] text-white text-xl font-semibold'>
            <nav className='w-[80%] m-auto flex justify-between items-center'>
                <div className='w-[20%]'>
                    <img src={logo} alt="" className='w-[75px]'/>
                </div>
                <div className='hidden md:w-[300px] md:flex md:justify-between md:text-cyan-200'>
                    {
                    type.filter(item => item !== 'Log Out' && item !== 'Sign In').map((item, index) => {
                    
                        return (
                            <Link key={index} to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '')}`} className='hover:text-white duration-300'>{item}</Link>
                        )
                    
                    })}
                </div>
                <div className='hidden md:block md:w-[20%] md:text-end md:text-cyan-200'>
                {
                    type.filter(item => item === 'Log Out' || item === 'Sign In').map((item, index) => {
                    
                        return (
                            <Link key={index} to={item === 'Log Out' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '')}`} className='hover:text-white duration-300'>{item}</Link>
                        )
                    
                    })}
                </div>
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-cyan-200 cursor-pointer">
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>
            {menuOpen && (
                <div className="md:hidden px-6 pb-4 space-y-3 text-cyan-200 font-semibold text-lg">
                    <Link to="/" className="block hover:text-white duration-300 w-[15%]">Home</Link>
                    <Link to="/contact" className="block hover:text-white duration-300 w-[15%]">Contact</Link>
                    <Link to="/register" className="block hover:text-white duration-300 w-[15%]">Sign In</Link>
                </div>
            )}
        </header>
    </>
  )
}

export default Header