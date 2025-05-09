import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Signin = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <>
            <main className='h-screen bg-[#0B1F3A] flex items-center justify-center'>
                <Link to='/' className='absolute top-[50px] left-[50px] text-[40px] text-cyan-200 hover:text-white ease-in-out duration-200'>&#11164;</Link>
                <div className="relative flex w-full max-w-4xl min-h-[500px] mx-auto mt-10 bg-white shadow-xl overflow-hidden rounded-lg">
                    <div className="flex my-auto w-full">
                        <div className="w-1/2 p-10 flex flex-col justify-center items-center transition-all duration-500">
                            <form className="w-full max-w-xs text-center space-y-4">
                                <h1 className="text-4xl font-bold text-[#0B1F3A]">Log In</h1>
                                <input type="email" placeholder="Email" className="w-full rounded-full px-4 py-2 bg-gray-200" required />
                                <input type="password" placeholder="Password" className="w-full rounded-full px-4 py-2 bg-gray-200" required />
                                <div className='flex gap-2'>
                                    <input type="checkbox" name="" id="" className='ml-2'/>
                                    <p className='text-[#0B1F3A]'>Remember me</p>
                                </div>
                                <input type="submit" value="SUBMIT" className="rounded-full px-6 py-2 text-[#0B1F3A] border-2 border-[#0B1F3A] bg-white font-bold text-sm hover:text-white hover:border-[#0B1F3A] hover:bg-[#0B1F3A] ease-in-out duration-200"/>
                            </form>
                        </div>
                        <div className="w-1/2 p-10 flex flex-col justify-center items-center transition-all duration-500">
                            <form className="w-full max-w-xs text-center space-y-4">
                                <h1 className="text-4xl font-bold text-[#0B1F3A]">Create an Account</h1>
                                <input type="text" placeholder="Name" className="w-full rounded-full px-4 py-2 bg-gray-200" required />
                                <input type="email" placeholder="Email" className="w-full rounded-full px-4 py-2 bg-gray-200" required />
                                <input type="password" placeholder="Password" className="w-full rounded-full px-4 py-2 bg-gray-200" required />
                                <div className='flex gap-2'>
                                    <input type="checkbox" name="" id="" className='ml-2'/>
                                    <p className='text-[#0B1F3A]'>Remember me</p>
                                </div>
                                <input type="submit" value="SING UP" className="rounded-full px-6 py-2 text-[#0B1F3A] border-2 border-[#0B1F3A] bg-white font-bold text-sm hover:text-white hover:border-[#0B1F3A] hover:bg-[#0B1F3A] ease-in-out duration-200"/>
                            </form>
                        </div>
                    </div>
                    <div className={`absolute top-0 h-full w-1/2 overflow-hidden z-10 transition-all duration-500 ${isSignUp ? 'right-0' : 'right-1/2'}`}>
                        <div className={`flex w-[200%] bg-[url('/src/assets/home/grid3.jpg')] bg-cover bg-center h-full transition-transform duration-500 transform ${isSignUp ? '-translate-x-1/2' : 'translate-x-0'}`}>
                            {/* Left Panel */}
                            <div className="w-1/2 text-white flex flex-col items-center justify-center text-center px-10">
                                <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
                                <p className="mb-6 text-md font-semibold">If you already have an account log in.</p>
                                <button onClick={() => setIsSignUp(true)} className="rounded-full border-2 hover:border-white px-6 py-2 text-sm font-bold uppercase hover:bg-transparent border-[#0B1F3A] bg-[#0B1F3A] ease-in-out duration-200">Log In</button>
                            </div>

                            {/* Right Panel */}
                            <div className="w-1/2 text-white flex flex-col items-center justify-center text-center px-10">
                                <h1 className="text-4xl font-bold mb-4">Hello!</h1>
                                <p className="mb-6 text-md font-semibold">Enter your personal details and start</p>
                                <button onClick={() => setIsSignUp(false)} className="rounded-full border-2 hover:border-white px-6 py-2 text-sm font-bold uppercase hover:bg-transparent border-[#0B1F3A] bg-[#0B1F3A] ease-in-out duration-200">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Signin