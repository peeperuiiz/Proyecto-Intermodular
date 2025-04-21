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
                <div className='m-auto text-center my-[50px]'>
                    <h2 className='text-neutral-900 text-[45px] font-semibold mb-10'>Fly wherever you want, whenever you want.</h2>
                    <a href="" className='text-neutral-900 py-3 px-5 border-2 border-neutral-900 rounded-[8px] font-semibold hover:text-white hover:border-white hover:bg-neutral-900 ease-in-out duration-200'>Book your jet</a>
                </div>
            </section>
            <section>   
                <div className='flex justify-evenly text-center text-neutral-900 font-semibold mb-[50px]'>      
                    <div className='gap-20 my-auto'>   
                        <p><span className='text-neutral-900'>&#10003;</span> Total privacity</p>   
                        <p><span className='text-neutral-900'>&#10003;</span> Transparent prices</p>
                        <p><span className='text-neutral-900'>&#10003;</span> Fully customizable</p>
                    </div>
                    <div>
                        <h2 className='text-[45px] mb-10'>Why choose us?</h2>
                        <div className='flex justify-evenly'>
                            <img src="" className='w-[30%]' alt="" />
                            <img src="" className='w-[30%]' alt="" />
                            <img src="" className='w-[30%]' alt="" />
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <h2></h2>
                <div>
                    <div>
                        <p></p>
                        <p></p>
                    </div>
                    <div>
                        <p></p>
                        <p></p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home