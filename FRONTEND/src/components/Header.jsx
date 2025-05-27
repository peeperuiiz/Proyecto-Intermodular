import React from 'react'
import '../App.css';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = ({type, user}) => {    
    const [menuOpen, setMenuOpen] = useState(false);

    const handleSubmitLogOut = (e) => {
        e.preventDefault();

        fetch('https://localhost/Proyecto-Intermodular/BACKEND/CONTROLADOR/index.php?action=logOutUser', {
            method: 'POST',
            credentials: 'include'
        })
        .then((res) => res.text())
        .then(data => {
            if (!data.includes('err')) {
                window.location.href = '/';
            }
        })
    }

  return (
    <>
        <header className='bg-[#0B1F3A] text-white text-xl font-semibold'>
            <nav className='w-[80%] m-auto flex justify-between items-center'>
                <div className='w-[20%]'>
                    <img src={logo} alt="" className='w-[75px]'/>
                </div>
                <div className='hidden lg:w-[300px] lg:flex lg:justify-center lg:gap-15 lg:text-cyan-200'>
                    {
                    type.filter(item => item !== 'Log Out' && item !== 'Sign In').map((item, index) => {
                    
                        return (
                            <Link
                                key={index}
                                to={{pathname: item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '')}`}}
                                state={
                                    item !== 'Home' && item !== 'Contact' 
                                        ? { tipo: user } 
                                        : null
                                }
                                className="hover:text-white duration-300 flex-1"
                            >
                            {item}
                            </Link>
                        )
                    
                    })
                    }
                </div>
                <div className='hidden lg:block lg:w-[20%] lg:text-end lg:text-cyan-200'>
                    {
                    type.filter(item => item === 'Log Out' || item === 'Sign In').map((item, index) => {
                    
                        const handleClick = item === 'Log Out' ? handleSubmitLogOut : undefined;

                        return (
                            <Link key={index} to={item === 'Log Out' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '')}`} onClick={handleClick} className='hover:text-white duration-300'>{item}</Link>
                        )
                    
                    })}
                </div>
                <div className="lg:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-cyan-200 cursor-pointer">
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>
            {menuOpen && (
                <div className="lg:hidden flex flex-col px-6 pb-4 space-y-3 text-cyan-200 font-semibold text-lg">
                    {
                    type.map((item, index) => {
                    
                        return (
                            <Link
                                key={index}
                                to={{pathname: item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '')}`}}
                                state={
                                    item !== 'Home' && item !== 'Contact' && item !== 'Sign In' && item !== 'Log Out'
                                        ? { tipo: user } 
                                        : null}
                                className="hover:text-white duration-300 flex-1"
                            >
                                {item}
                            </Link>
                        )
                    
                    })}
                </div>
            )}
        </header>
    </>
  )
}

export default Header