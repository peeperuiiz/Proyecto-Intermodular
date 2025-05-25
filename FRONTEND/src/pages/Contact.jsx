import React, { useState } from 'react'

const Contact = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [comment, setComment] = useState('');
    
    const handleSubmitContact = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('comment', comment);

        fetch('https://localhost/Proyecto-Intermodular/BACKEND/CONTROLADOR/index.php?action=submitContactData', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        })
        .then((res) => res.text())
    }


  return (
    <>

    <main>
        <h2 className='text-5xl text-[#0B1F3A] font-bold text-center my-12'>Contact Us</h2>
        <section className='flex flex-col lg:flex-row justify-center items-center w-[90%] lg:w-[70%] mx-auto mb-12 gap-10'>
            <div className='text-justify lg:text-left w-full lg:w-[40%]'>
                <h3 className='text-[35px] font-semibold py-[25px] text-[#0B1F3A]'>How can we <span className='text-cyan-700'>help</span> you?</h3>
                <p className='text-[20px] text-[#0B1F3A] pb-[20px]'>At our company, we believe that exceptional customer service is the foundation of lasting relationships. We’re committed to listening with empathy, responding with care, and delivering solutions that truly make a difference. Whether you have a question, concern, or idea, our team is here to support you with integrity, respect, and a genuine desire to help. Your satisfaction is not just our priority — it's part of our values. <br /><br /> If you want to contact us directly: <br />&#10242;info@aeroelite.com <br />	&#10242;+1 (234) 567-890</p>
                <div className='flex justify-center gap-10'>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48" className='w-[40px] cursor-pointer hover:fill-[#0B1F3A]'><path d="M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 32.380773 34.967178 39.306373 27 40.720703 L 27 29 L 30.625 29 C 31.129 29 31.555188 28.623047 31.617188 28.123047 L 31.992188 25.123047 C 32.028188 24.839047 31.938047 24.553891 31.748047 24.337891 C 31.559047 24.122891 31.287 24 31 24 L 27 24 L 27 20.5 C 27 19.397 27.897 18.5 29 18.5 L 31 18.5 C 31.552 18.5 32 18.053 32 17.5 L 32 14.125 C 32 13.607 31.604844 13.174906 31.089844 13.128906 C 31.030844 13.123906 29.619984 13 27.833984 13 C 23.426984 13 21 15.616187 21 20.367188 L 21 24 L 17 24 C 16.448 24 16 24.447 16 25 L 16 28 C 16 28.553 16.448 29 17 29 L 21 29 L 21 40.720703 C 13.032822 39.306373 7 32.380773 7 24 C 7 14.593391 14.593385 7 24 7 z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 26 26" className='w-[35px] cursor-pointer hover:fill-[#0B1F3A]'><path d="M 7.546875 0 C 3.390625 0 0 3.390625 0 7.546875 L 0 18.453125 C 0 22.609375 3.390625 26 7.546875 26 L 18.453125 26 C 22.609375 26 26 22.609375 26 18.453125 L 26 7.546875 C 26 3.390625 22.609375 0 18.453125 0 Z M 7.546875 2 L 18.453125 2 C 21.527344 2 24 4.46875 24 7.546875 L 24 18.453125 C 24 21.527344 21.53125 24 18.453125 24 L 7.546875 24 C 4.472656 24 2 21.53125 2 18.453125 L 2 7.546875 C 2 4.472656 4.46875 2 7.546875 2 Z M 20.5 4 C 19.671875 4 19 4.671875 19 5.5 C 19 6.328125 19.671875 7 20.5 7 C 21.328125 7 22 6.328125 22 5.5 C 22 4.671875 21.328125 4 20.5 4 Z M 13 6 C 9.144531 6 6 9.144531 6 13 C 6 16.855469 9.144531 20 13 20 C 16.855469 20 20 16.855469 20 13 C 20 9.144531 16.855469 6 13 6 Z M 13 8 C 15.773438 8 18 10.226563 18 13 C 18 15.773438 15.773438 18 13 18 C 10.226563 18 8 15.773438 8 13 C 8 10.226563 10.226563 8 13 8 Z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30" className='w-[35px] cursor-pointer hover:fill-[#0B1F3A]'><path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path></svg>
                </div>
            </div>
            <div className='w-full lg:w-[40%] bg-[#0B1F3A] p-[30px] rounded-lg'>
                <form onSubmit={handleSubmitContact} className='flex flex-col h-full'>
                    <label htmlFor="name" className='text-[20px] font-semibold text-white mb-1'>Full Name</label>
                    <input type="text" name="name" id="name" placeholder="Your name" className='mb-2 px-3 py-1 bg-white rounded-lg border-1 border-gray-300' required onChange={(e) => setName(e.target.value)}/>
                    <label htmlFor="email" className='text-[20px] font-semibold text-white mb-1'>Email Address</label>
                    <input type="email" name="email" id="email" placeholder="you@example.com" className='mb-2 px-3 py-1 bg-white rounded-lg border-1 border-gray-300' required onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="message" className='mb-1  text-[20px] font-semibold text-white'>Message</label>
                    <textarea name="message" id="message" placeholder="Write your message here..."className='px-3 py-2 bg-white rounded-md border-1 border-gray-300 min-h-[200px] max-h-[200px] mb-[20px]' onChange={(e) => setComment(e.target.value)}></textarea>
                    <input type="submit" value="SUBMIT" className='rounded-full px-6 py-2 text-white border-2 border-white font-bold text-sm hover:text-[#0B1F3A] hover:border-white hover:bg-white ease-in-out duration-200 w-fit mx-auto cursor-pointer'/>
                </form>
            </div>
        </section>
    </main>

    </>
  )
}

export default Contact