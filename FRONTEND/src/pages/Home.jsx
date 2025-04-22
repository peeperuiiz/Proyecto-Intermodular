import React from 'react';
import '../App.css';


const Home = () => {

    return (
        <main>
            <section className="bg-[url('/src/assets/home/banner.jpg')] bg-cover bg-center h-screen flex">
                <div className='m-auto text-white font-semibold text-shadow-lg/80'>
                    <h1 className='text-[125px]'>AeroElite</h1>
                    <p className='text-lg'>Fly better, fly elite</p>
                </div>
            </section>
            <section>   
                <div className='flex flex-col justify-evenly items-center text-neutral-900 font-semibold my-[50px]'>      
                    <div className='flex gap-50 my-auto text-neutral-900 text-[20px] mb-[50px]'>   
                        <p><span className=''>&#10003;</span> Total privacity</p>   
                        <p><span className=''>&#10003;</span> Transparent prices</p>
                        <p><span className=''>&#10003;</span> Fully customizable</p>
                    </div>
                    <div className='text-center'>
                        <h2 className='text-[45px]'>Our fleet</h2>
                        <div className="grid grid-cols-5 grid-rows-5 gap-4">
                            <div className="col-span-3 row-span-2">
                                <img src="" alt="" />
                            </div>
                            <div className="col-span-2 row-span-2 col-start-4">
                                <img src="" alt="" />
                            </div>
                            <div className="col-span-2 row-span-2 row-start-3">
                                <img src="" alt="" />
                            </div>
                            <div className="col-span-3 row-span-2 col-start-3 row-start-3">
                                <img src="" alt="" />
                            </div>
                        </div>
                        <a href="" className='text-neutral-900 py-3 px-5 border-2 border-neutral-900 rounded-[8px] font-semibold hover:text-white hover:border-white hover:bg-neutral-900 ease-in-out duration-200'>See More</a>                    </div>
                </div>
            </section>
            <section className='bg-[#0B1F3A] text-white'>
                <h2 className='text-[45px] font-semibold w-[50%] mx-auto py-[35px]'>Our Clients</h2>
                <div className='flex justify-center gap-[50px] pb-[50px]'>
                    <div className='w-[20%]'>
                        <p><i>"Exceptional service from start to finish. The jet was immaculate, and the crew was incredibly professional."</i></p>
                        <p>- James</p>
                    </div>
                    <div className='w-[20%]'>
                        <p><i>"Flying privately has never felt this smooth and personalized."</i></p>
                        <p>- Tod</p>
                    </div>
                </div>
            </section>
            <section>
                <div className='m-auto text-center my-[50px]'>
                    <h2 className='text-neutral-900 text-[45px] font-semibold mb-10'>Fly wherever you want, whenever you want.</h2>
                    <a href="" className='text-neutral-900 py-3 px-5 border-2 border-neutral-900 rounded-[8px] font-semibold hover:text-white hover:border-white hover:bg-neutral-900 ease-in-out duration-200'>Book your jet</a>
                </div>
            </section>
        </main>
    )
}

export default Home