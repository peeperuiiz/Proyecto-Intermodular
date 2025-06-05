import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const [dni, setDni] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [nom_u, setNomUsu] = useState('');
    const [h_vuelo, setHvuelo] = useState(null);
    const [member, setMember] = useState('');
    const [viajes, setViajes] = useState([]);
    const [openSubmenuId, setOpenSubmenuId] = useState(null);

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
            <div className='grid grid-cols-5 grid-rows-5 gap-4 w-[1000px]'>
                <div className="col-span-4">
                    <h2>Dear {nom_u}</h2>
                </div>
                <div className="row-span-5 col-start-5">

                </div>
                <div className="col-span-4 row-span-4 row-start-2">
                    {

                        <div className="flex space-x-4 bg-gray-100 p-4 rounded-lg">
                            {viajes.map((item) => (
                                <div key={item.id} className="relative group">
                                    <button
                                        onClick={() => 
                                        setOpenSubmenuId(openSubmenuId === item.id ? null : item.id)
                                        }
                                        className="px-4 py-2 bg-white rounded-md shadow-sm hover:bg-blue-50 focus:outline-none"
                                    >
                                        {item.fecha}
                                    </button>

                                    {openSubmenuId === item.id && (
                                        <div className="absolute left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                                            <p>{item.salida}</p>
                                            <p>{item.llegada}</p>
                                            <p>{item.duracion}</p>
                                            <p>{item.distancia}</p>
                                            <p>{item.precio}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                    }
                </div>
            </div>
        </main>
    
    </>
  )
}

export default Dashboard