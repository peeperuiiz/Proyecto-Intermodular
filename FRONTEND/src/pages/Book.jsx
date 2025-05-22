import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const Book = () => {
    const location = useLocation();
    const tipo = location.state?.tipo;
    const [aviones, setAviones] = useState([]);
    const [aeropuertos, setAeropuertos] = useState([]);
    const [salida, setSalida] = useState('');
    const [sugerenciasSalida, setSugerenciasSalida] = useState([]);
    const [llegada, setLlegada] = useState('');
    const [sugerenciasLlegada, setSugerenciasLlegada] = useState([]);

    if (tipo !== 'R' && tipo !== 'A') {
        return (<Navigate to='/notfound' replace />)
    }

    useEffect(() => {
        fetch('https://localhost/Proyecto-Intermodular/BACKEND/CONTROLADOR/index.php?action=obtainFleet', {
            method: 'POST',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setAviones(data.aviones);
        })
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

    return (
        <>
            <main>
                <div className="max-w-5xl mx-auto p-6 space-y-8 text-[#0B1F3A]">
                    <h2 className="text-4xl font-bold text-center mb-6">Book Your Private Jet</h2>
                    <form>
                        <label htmlFor="jet">Choose your Jet.</label>
                        <select name="jet" id="jet">
                            {aviones.map((item, index) => (
                                <option key={index} value={item.matricula}>
                                    {item.marca} {item.modelo}
                                </option>
                            ))}
                        </select>
                        <div className='flex'>
                            <label htmlFor="salida" className="block mt-6">Choose the departure airport.</label>
                            <div className="relative">
                                <input
                                    id="salida"
                                    type="text"
                                    value={salida}
                                    onChange={e => setSalida(e.target.value)}
                                    className="border px-2 py-1 w-full"
                                    autoComplete="off"
                                    role="combobox"
                                    aria-expanded={sugerenciasSalida.length > 0}
                                    aria-controls="lista-salida"
                                    aria-autocomplete="list"
                                    aria-label="Buscar aeropuerto de salida"
                                    />
                                {sugerenciasSalida.length > 0 && (
                                    <ul
                                    id="lista-salida"
                                    role="listbox"
                                    className="absolute bg-white border w-full mt-1 z-10 max-h-60 overflow-auto"
                                    >
                                        {sugerenciasSalida.map((a, idx) => {
                                            console.log(a);
                                            return (
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
                                            );
                                        })}
                                    </ul>
                                )}
                            </div>
                            <label htmlFor="llegada" className="block mt-6">Choose the arrival airport.</label>
                            <div className="relative">
                                <input
                                    id="llegada"
                                    type="text"
                                    value={llegada}
                                    onChange={e => setLlegada(e.target.value)}
                                    className="border px-2 py-1 w-full"
                                    autoComplete="off"
                                    role="combobox"
                                    aria-expanded={sugerenciasLlegada.length > 0}
                                    aria-controls="lista-llegada"
                                    aria-autocomplete="list"
                                    aria-label="Buscar aeropuerto de llegada"
                                    />
                                {sugerenciasLlegada.length > 0 && (
                                    <ul
                                    id="lista-Llegada"
                                    role="listbox"
                                    className="absolute bg-white border w-full mt-1 z-10 max-h-60 overflow-auto"
                                    >
                                        {sugerenciasLlegada.map((a, idx) => {
                                            console.log(a);
                                            return (
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
                                            );
                                        })}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default Book;