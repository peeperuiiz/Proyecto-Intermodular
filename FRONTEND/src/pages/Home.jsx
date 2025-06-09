import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';


const Home = () => {

    return (
        <main>
            <section className="bg-[url('/src/assets/home/banner.jpg')] bg-cover bg-center h-screen flex">
                <div className='m-auto text-white font-semibold text-shadow-lg/80'>
                    <h1 className='text-[100px] md:text-[125px]'>AeroElite</h1>
                    <p className='text-lg'>Fly better, fly elite</p>
                </div>
            </section>
            <section>   
                <div className='flex flex-col justify-evenly items-center text-neutral-900 font-semibold my-[50px]'>      
                    <div className='flex flex-col text-center lg:flex-row gap-10 lg:gap-50 my-auto text-neutral-900 text-[20px] mb-[50px]'>   
                        <p className='text-[#0B1F3A]'><span>&#10003;</span> Total privacity</p>   
                        <p className='text-[#0B1F3A]'><span>&#10003;</span> Transparent prices</p>
                        <p className='text-[#0B1F3A]'><span>&#10003;</span> Fully customizable</p>
                    </div>
                    <div className='text-center w-[80%] mx-auto'>
                        <h2 className='text-[45px] text-[#0B1F3A]'>Our fleet</h2>
                        <div className="flex-col lg:grid lg:grid-cols-5 lg:grid-rows-4 lg:gap-4 my-[50px]">
                            <div className="w-full lg:col-span-3 lg:row-span-2 bg-[url(/src/assets/home/grid1.webp)] bg-center bg-cover h-[250px]">
                            </div>
                            <div className="w-full lg:col-span-2 lg:row-span-2 lg:col-start-4 bg-[url(/src/assets/home/grid2.jpg)] bg-center bg-cover h-[250px]">
                            </div>
                            <div className="w-full lg:col-span-2 lg:row-span-2 lg:row-start-3 bg-[url(/src/assets/home/grid3.jpg)] bg-center bg-cover h-[250px]">
                            </div>
                            <div className="w-full lg:col-span-3 lg:row-span-2 lg:col-start-3 lg:row-start-3 bg-[url(/src/assets/home/grid4.jpeg)] bg-center bg-cover h-[250px]">
                            </div>
                        </div>
                        <Link to='/signin' className='text-[#0B1F3A] py-3 px-5 border-2 border-[#0B1F3A] rounded-[8px] font-semibold hover:text-white hover:border-[#0B1F3A] hover:bg-[#0B1F3A] ease-in-out duration-200'>See More</ Link>                    
                    </div>
                </div>
            </section>
            <section className='bg-[#0B1F3A] text-white'>
                <h2 className='text-[45px] font-semibold w-[70%] mx-auto py-[35px] text-white'>Our Clients</h2>
                <div className='flex flex-col lg:flex-row justify-center items-center gap-[50px] pb-[50px]'>
                    <div className='w-[200px] md:w-[400px] lg:w-[17%]'>
                        <p><i>"Exceptional service from start to finish. The jet was immaculate, and the crew was incredibly professional."</i></p>
                        <p>- James</p>
                    </div>
                    <div className='w-[200px] md:w-[400px] lg:w-[17%]'>
                        <p><i>"Flying privately has never felt this smooth and personalized."</i></p>
                        <p>- Tod</p>
                    </div>
                    <div className='w-[200px] md:w-[400px] lg:w-[17%]'>
                        <p><i>"AeroElite offers top-tier private jet services with exceptional comfort, punctuality, and personalized attention—ideal for business or luxury travel."</i></p>
                        <p>- Jeff</p>
                    </div>
                </div>
            </section>
            <section>
                <div className='m-auto text-center my-[50px]'>
                    <h2 className='text-neutral-900 text-[45px] font-semibold mb-10 text-[#0B1F3A]'>Fly wherever you want, whenever you want.</h2>
                    <Link to='/signin' className='text-[#0B1F3A] py-3 px-5 border-2 border-[#0B1F3A] rounded-[8px] font-semibold hover:text-white hover:border-[#0B1F3A] hover:bg-[#0B1F3A] ease-in-out duration-200'>Book your jet</Link>
                </div>
            </section>
        </main>
    )
}

export default Home