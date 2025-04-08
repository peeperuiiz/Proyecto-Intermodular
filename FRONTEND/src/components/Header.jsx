import React from 'react'
import '../App.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
        <header className='bg-[#0B1F3A] text-white'>
            <nav className='w-[80%] m-auto flex justify-between items-center'>
                <div className='w-[20%]'>
                    <img src="" alt="" />
                </div>
                <div className='w-[20%] flex justify-between'>
                    <Link to='/'>Home</Link>
                    <Link to='/contact'>Contact</Link>
                </div>
                <div className='w-[20%] text-end'>
                    <Link to='/register'>Registrar</Link>
                </div>
            </nav>
        </header>
    </>
  )
}

export default Header