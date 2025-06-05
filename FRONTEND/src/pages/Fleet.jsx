import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const Fleet = () => {

    const[aviones, setAviones] = useState();
    const location = useLocation();
    const tipo = location.state?.tipo;

    useEffect(() => {
        fetch('http://localhost/Proyecto-Intermodular/BACKEND/CONTROLADOR/index.php?action=obtainFleet', {
        method: 'POST',
        credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setAviones(data.aviones);
        })
    }, [])

    while(!aviones) return <div className="text-center text-gray-600 mt-10">Loading...</div>;

    if (tipo !== 'R' && tipo !== 'A') {
        return ( <Navigate to='/notfound' replace />)
    }

  return (
    <>
    
    <main>
        <h2 className='text-5xl text-[#0B1F3A] font-bold text-center my-12'>Our Fleet</h2>
        <div className='w-[80%] flex flex-wrap mx-auto justify-center gap-5'>
            {
            aviones.map((item, index) => {
                return(
                    <div className='w-[350px] border-2 border-[#0B1F3A] rounded-lg mb-5'>
                        <div className='bg-cover bg-center rounded-lg h-[300px] w-[90%]' style={{ backgroundImage: `url(${item.ruta})` }}></div>
                        <div className='w-full p-2 text-center text-[#0B1F3A]'>
                            <h3 className='text-[30px]'>{item.marca} {item.modelo}</h3>
                            <p className='py-3'>Max range: {item.rango_max} Km</p>
                            <button className='text-[#0B1F3A] py-3 px-5 border-2 border-[#0B1F3A] rounded-[8px] font-semibold hover:text-white hover:border-[#0B1F3A] hover:bg-[#0B1F3A] ease-in-out duration-200 mb-3 cursor-pointer'>Book</button>
                        </div>
                    </div>
                )
            })
            }
        </div>
    </main>

    </>
  )
}

export default Fleet