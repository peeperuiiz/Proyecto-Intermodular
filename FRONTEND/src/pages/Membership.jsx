import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const Membership = () => {
    const location = useLocation();
    const tipo = location.state?.tipo;
    const [membership, setMembership] = useState([]);

    if (tipo !== 'R' && tipo !== 'A') {
        return (<Navigate to='/notfound' replace />);
    }

    useEffect(() => {
        fetch('https://localhost/Proyecto-Intermodular/BACKEND/CONTROLADOR/index.php?action=obtainMemberships', {
            method: 'POST',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setMembership(data.memberships)
        })
    }, []);

  return (
    <>

        <main>
            <section>
                <div className='text-[#0B1F3A] p-6'>
                    <h2 className='text-5xl font-bold text-center mt-6 mb-12'>Memberships</h2>
                    <div className='w-full flex flex-wrap justify-center mx-auto gap-10 mb-6'>
                        {
                            membership.map((item, index) => (
                                <div className='w-[400px] p-5 border-2 border-[#0B1F3A] rounded-lg flex flex-col items-center'>
                                    <div className='h-[250px]' style={{ backgroundImage: `url(${item.ruta})` }}></div>
                                    <h3 className='text-2xl font-bold text-center my-3'>{item.nombre}</h3>
                                    <div className='font-semibold text-center flex flex-col items-center justify-center'>
                                        <span>Enabled flight hours, {item.h_vuelo_disp}</span>
                                        <span>Enabled range, {item.rango_vuelo}</span>
                                    </div>
                                    <p className='text-justify my-3'>{item.descripcion}</p>
                                    <a href='' className='rounded-lg px-6 py-2 text-[#0B1F3A] border-2 border-[#0B1F3A] font-bold text-sm hover:text-white hover:bg-[#0B1F3A] ease-in-out duration-200 mx-auto cursor-pointer'>BUY</a>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </main>

    </>
  )
}

export default Membership