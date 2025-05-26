import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const Book = () => {
    const location = useLocation();
    const tipo = location.state?.tipo;
    const [aviones, setAviones] = useState([]);
    const [plane, setPlane] = useState('');
    const [aeropuertos, setAeropuertos] = useState([]);
    const [salida, setSalida] = useState('');
    const [sugerenciasSalida, setSugerenciasSalida] = useState([]);
    const [llegada, setLlegada] = useState('');
    const [sugerenciasLlegada, setSugerenciasLlegada] = useState([]);
    const [fecha, setFecha] = useState('');

    if (tipo !== 'R' && tipo !== 'A') {
        return (<Navigate to='/notfound' replace />);
    }

    useEffect(() => {
        fetch('https://localhost/Proyecto-Intermodular/BACKEND/CONTROLADOR/index.php?action=obtainFleet', {
            method: 'POST',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setAviones(data.aviones);
        });
    }, []);

    useEffect(() => {
        fetch('/airports.json')
        .then(res => res.json())
        .then(data => {
            const listaAeropuertos = Object.values(data);
            setAeropuertos(listaAeropuertos);
        });
    }, []);

    useEffect(() => {
        if (salida.length < 2) {
            setSugerenciasSalida([]);
            return;
        }

        const filtrados = aeropuertos.filter(a =>
            (a.name?.toLowerCase().includes(salida.toLowerCase()) ||
            a.icao?.toLowerCase().includes(salida.toLowerCase()) ||
            a.iata?.toLowerCase().includes(salida.toLowerCase()))
        );
        setSugerenciasSalida(filtrados.slice(0, 3));
    }, [salida, aeropuertos]);

    useEffect(() => {
        if (llegada.length < 2) {
            setSugerenciasLlegada([]);
            return;
        }

        const filtrados = aeropuertos.filter(a =>
            (a.name?.toLowerCase().includes(llegada.toLowerCase()) ||
            a.icao?.toLowerCase().includes(llegada.toLowerCase()) ||
            a.iata?.toLowerCase().includes(llegada.toLowerCase()))
        );
        setSugerenciasLlegada(filtrados.slice(0, 3));
    }, [llegada, aeropuertos]);

    const handleSubmitBooking = (e) => {
        e.preventDefault();

        const aeropuertoSalida = aeropuertos.find(a => salida.includes(a.iata || a.icao));
        const aeropuertoLlegada = aeropuertos.find(a => llegada.includes(a.iata || a.icao));
        const lat1 = aeropuertoSalida.lat;
        const lon1 = aeropuertoSalida.lon;
        const lat2 = aeropuertoLlegada.lat;
        const lon2 = aeropuertoLlegada.lon;
        

        const toRad = (value) => value * Math.PI / 180;
        const R = 6371;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distancia = R * c;

        const formData = new FormData();
        formData.append('plane', plane);
        formData.append('salida', salida);
        formData.append('llegada', llegada);
        formData.append('fecha', fecha);
        formData.append('distancia', distancia.toFixed(2));

        fetch('https://localhost/Proyecto-Intermodular/BACKEND/CONTROLADOR/index.php?action=bookFlight', {
            method: 'POST',
            body: formData,
            credentials: 'include',
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            alert('Reserva realizada correctamente');
        })
    };

    return (
        <>
            <main className='flex-1 flex items-center'>
                <div className="w-[1000px] mx-auto p-6 space-y-8 text-[#0B1F3A]">
                    <h2 className="text-5xl font-bold text-center mt-6 mb-12">Book Your Private Jet</h2>
                    <form className='mb-6' onSubmit={handleSubmitBooking}>
                        <div className='flex gap-5 items-center'>
                            <label htmlFor="jet" className='w-1/6 font-semibold'>Choose your Jet:</label>
                            <select name="jet" id="jet" className='rounded-md px-4 py-2 bg-gray-200 w-5/6' onChange={e => setPlane(e.target.value)}>
                                {aviones.map((item, index) => (
                                    <option key={index} value={item.matricula}>
                                        {item.marca} {item.modelo}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='flex gap-5 my-6'>
                            <div className='flex-col w-1/2'>
                                <label htmlFor="salida" className="block mb-2 font-semibold">Choose the departure airport.</label>
                                <div className="relative">
                                    <input
                                        id="salida"
                                        type="text"
                                        value={salida}
                                        onChange={e => setSalida(e.target.value)}
                                        className="rounded-md px-4 py-2 bg-gray-200 w-full"
                                        autoComplete="off"
                                        role="combobox"
                                        aria-expanded={sugerenciasSalida.length > 0}
                                        aria-controls="lista-salida"
                                        aria-autocomplete="list"
                                        aria-label="Buscar aeropuerto de salida"
                                        required
                                    />
                                    {sugerenciasSalida.length > 0 && (
                                        <ul
                                            id="lista-salida"
                                            role="listbox"
                                            className="absolute bg-white border w-full mt-1 z-10 max-h-60 overflow-auto"
                                        >
                                            {sugerenciasSalida.map((a, idx) => (
                                                <li
                                                    key={idx}
                                                    role="option"
                                                    id={`salida-${idx}`}
                                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                                    onClick={() => {
                                                        setSalida(`${a.name} (${a.iata || a.icao})`);
                                                        setSugerenciasSalida([]);
                                                    }}
                                                >
                                                    {a.name} ({a.iata || a.icao})
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <div className='flex-col w-1/2'>
                                <label htmlFor="llegada" className="block mb-2 font-semibold">Choose the arrival airport.</label>
                                <div className="relative">
                                    <input
                                        id="llegada"
                                        type="text"
                                        value={llegada}
                                        onChange={e => setLlegada(e.target.value)}
                                        className="rounded-md px-4 py-2 bg-gray-200 w-full"
                                        autoComplete="off"
                                        role="combobox"
                                        aria-expanded={sugerenciasLlegada.length > 0}
                                        aria-controls="lista-llegada"
                                        aria-autocomplete="list"
                                        aria-label="Buscar aeropuerto de llegada"
                                        required
                                    />
                                    {sugerenciasLlegada.length > 0 && (
                                        <ul
                                            id="lista-llegada"
                                            role="listbox"
                                            className="absolute bg-white border w-full mt-1 z-10 max-h-60 overflow-auto"
                                        >
                                            {sugerenciasLlegada.map((a, idx) => (
                                                <li
                                                    key={idx}
                                                    role="option"
                                                    id={`llegada-${idx}`}
                                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                                    onClick={() => {
                                                        setLlegada(`${a.name} (${a.iata || a.icao})`);
                                                        setSugerenciasLlegada([]);
                                                    }}
                                                >
                                                    {a.name} ({a.iata || a.icao})
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='flex gap-5 items-center'>
                            <label htmlFor="fecha" className='w-1/6 font-semibold'>When are you going to travel?</label>
                            <input
                                type="date"
                                id="fecha"
                                value={fecha}
                                onChange={e => setFecha(e.target.value)}
                                className='rounded-md px-4 py-2 bg-gray-200 w-5/6'
                                required
                            />
                        </div>

                        <div className='text-center mt-6'>
                            <input
                                type="submit"
                                value="SUBMIT"
                                className='rounded-full px-6 py-2 text-[#0B1F3A] border-2 border-[#0B1F3A] font-bold text-sm hover:text-white hover:bg-[#0B1F3A] ease-in-out duration-200 mx-auto cursor-pointer'
                            />
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default Book
