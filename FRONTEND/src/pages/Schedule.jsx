import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const Schedule = () => {
    const location = useLocation();
    const tipo = location.state?.tipo;

    const [viajes, setViajes] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [filterDate, setFilterDate] = useState('');

    if (tipo !== 'A') {
        return <Navigate to='/notfound' replace />;
    }

    useEffect(() => {
        fetch('http://localhost/Proyecto-Intermodular/BACKEND/CONTROLADOR/index.php?action=obtainViajes', {
            method: 'POST',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => setViajes(data.viajes));
    }, []);

    const handleCancelFlight = (nom_usu, matricula, fecha) => {
        if (confirm('¿Estás seguro de que quieres cancelar este vuelo?')) {
            fetch('http://localhost/Proyecto-Intermodular/BACKEND/CONTROLADOR/index.php?action=cancelViaje', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nom_usu, matricula, fecha }),
            })
            .then(res => res.json())
            .then(data => {
                if (data.canceled !== 'false') {
                    alert('Vuelo cancelado correctamente');
                    window.location.reload();
                } else {
                    alert('Error al cancelar el vuelo');
                }
            })
        }
    };

    const filteredViajes = viajes.filter((item) => {
        const nameMatch = item.nom_usu.toLowerCase().includes(filterName.toLowerCase());
        const dateMatch = item.fecha.includes(filterDate);
        return nameMatch && dateMatch;
    });

    return (
        <main className='flex-1 flex flex-col items-center p-8'>
            <h2 className='text-5xl font-bold text-[#0B1F3A]'>Flight Schedule</h2>
            <div className="flex gap-10 mt-10 mb-6">
                <div className='flex gap-2 items-center text-[#0B1F3A]'>
                    <label className='font-semibold'>Name:</label>
                    <input type="text" className="bg-gray-200 px-3 py-2 rounded-md" value={filterName} onChange={(e) => setFilterName(e.target.value)} />
                </div>
                <div className='flex gap-2 items-center'>
                    <label className='font-semibold'>Date:</label>
                    <input type="date" className="bg-gray-200 px-3 py-2 rounded-md" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
                </div>
            </div>
            <div>
                <table className="w-[1300px] border-collapse">
                    <thead>
                        <tr className='border-b'>
                            <th className='text-center p-2 text-[#0B1F3A]'>User</th>
                            <th className='text-center p-2 text-[#0B1F3A]'>Model</th>
                            <th className='text-center p-2 text-[#0B1F3A]'>Date</th>
                            <th className='text-center p-2 text-[#0B1F3A]'>Departure</th>
                            <th className='text-center p-2 text-[#0B1F3A]'>Arrival</th>
                            <th className='text-center p-2 text-[#0B1F3A]'>Distance</th>
                            <th className='text-center p-2 text-[#0B1F3A]'>Duration</th>
                            <th className='text-center p-2 text-[#0B1F3A]'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredViajes.map((item, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100 text-center text-[#0B1F3A]' : 'bg-white text-center text-[#0B1F3A]'}>
                                    <td className='p-2'>{item.nom_usu}</td>
                                    <td className='p-2'>{item.marca} {item.modelo}</td>
                                    <td className='p-2'>{item.fecha}</td>
                                    <td className='p-2'>{item.salida}</td>
                                    <td className='p-2'>{item.llegada}</td>
                                    <td className='p-2'>{item.distancia} Km</td>
                                    <td className='p-2'>{item.duracion} Hours</td>
                                    <td className='p-2'>
                                        <form onSubmit={(e) => {
                                            e.preventDefault(); 
                                            handleCancelFlight(item.nom_usu, item.matricula, item.fecha)}}
                                        >
                                            <input type='submit' value='CANCEL' className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-1 rounded-md cursor-pointer" />
                                        </form>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default Schedule;