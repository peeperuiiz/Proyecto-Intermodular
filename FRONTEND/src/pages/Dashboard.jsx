import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
    const [tipo, setTipo] = useState('');
    const [dni, setDni] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [nom_u, setNomUsu] = useState('');
    const [h_vuelo, setHvuelo] = useState(null);
    const [member, setMember] = useState('');
    const [viajes, setViajes] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        fetch('http://localhost/Proyecto-Intermodular/BACKEND/CONTROLADOR/index.php?action=getTypeUser', {
            method: 'POST',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            setTipo(data.type);
        })
        }, [])

    setTimeout(() => {
        if (tipo !== 'R' && tipo !== 'A') {
            return (<Navigate to='/notfound' replace />)
        }
    }, 200)

    const toggleAccordion = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    useEffect(() => {
        fetch('http://localhost/Proyecto-Intermodular/BACKEND/CONTROLADOR/index.php?action=dataDashboard', {
            method: 'POST',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                setDni(data.dni)
                setNombre(data.nom)
                setApellidos(data.ape)
                setEmail(data.email)
                setNomUsu(data.nom_u)
                setHvuelo(data.h_vuelo)
                setMember(data.member)
                setViajes(data.viajes)
            })
    }, [])

    return (
        <>

            <main className='flex-1 flex justify-center items-center'>
                <div className='flex p-5 flex-col lg:grid lg:grid-cols-5 lg:grid-rows-5 gap-4 lg:w-[1000px]'>
                    <div className="col-span-4">
                        <h2 className='text-5xl text-[#0B1F3A] font-semibold mb-1'>Dear {nom_u},</h2>
                    </div>
                    <div className="flex justify-between lg:row-span-5 lg:col-start-5 flex flex-row lg:flex-col lg:justify-center">
                        <div className="w-[200px] lg:w-full border-2 border-[#0B1F3A] rounded-md">
                            <img src="/src/assets/profile.png" alt="" className='rounded-md' />
                        </div>
                        <div className='w-1/2 lg:w-full text-center space-y-2 my-4 font-semibold'>
                            <p>{dni}</p>
                            <p>{nombre} {apellidos}</p>
                            <p>{nom_u}</p>
                            <p>{email}</p>
                            <p>Flight hours, {h_vuelo}</p>
                        </div>
                    </div>
                    <div className="block lg:col-span-4 lg:row-span-4 lg:row-start-2">
                        <h3 className='text-2xl text-[#0B1F3A] mb-2'>Your schedule:</h3>
                        {
                            <div className="flex space-x-4 bg-gray-100 p-4 rounded-lg">
                                <div className="space-y-4 w-full">
                                    {viajes.map((item, index) => {
                                        const isOpen = openIndex === index;

                                        return (
                                            <div key={item.id || index} className="accordion pb-4 border-b border-gray-200">
                                                <button onClick={() => toggleAccordion(index)} className="accordion-toggle group inline-flex items-center justify-between text-lg font-normal leading-8 w-[100%] transition duration-300 hover:text-indigo-600" aria-expanded={isOpen} aria-controls={`panel-${index}`} id={`accordion-${index}`}>
                                                    <h5 className='text-[#0B1F3A]'>{item.fecha} &#129062; {item.llegada}</h5>
                                                    <svg className={`transform transition-transform duration-300 ${isOpen ? "rotate-180 text-indigo-600" : "text-gray-900"}`} width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                                                            stroke="currentColor"
                                                            strokeWidth="1.6"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </button>

                                                {isOpen && (
                                                    <div id={`panel-${index}`} className="accordion-content w-full px-1 pt-2 transition-all duration-300 ease-in-out" aria-labelledby={`accordion-${index}`}>
                                                        <p className="text-base text-[#0B1F3A]">Departure from <strong>{item.salida}</strong></p>
                                                        <p className="text-base text-[#0B1F3A]">You will be flying on a <strong>{item.marca} {item.modelo}</strong> during <strong>{item.duracion} hours</strong>, traveling <strong>{item.distancia} Km.</strong></p>
                                                        <p className="text-base text-[#0B1F3A]">The price is <strong>{item.precio}€</strong>. {item.precio == 0 ? "It matches your membership" : "It doesn't match your membership"}</p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </main>

        </>
    )
}

export default Dashboard