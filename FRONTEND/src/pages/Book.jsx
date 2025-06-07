import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const Book = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const tipo = location.state?.tipo;
    const [membership, setMembership] = useState('');
    const [aviones, setAviones] = useState([]);
    const [plane, setPlane] = useState('');
    const [selectedPlane, setSelectedPlane] = useState(null);
    const [aeropuertos, setAeropuertos] = useState([]);
    const [salida, setSalida] = useState('');
    const [sugerenciasSalida, setSugerenciasSalida] = useState([]);
    const [llegada, setLlegada] = useState('');
    const [sugerenciasLlegada, setSugerenciasLlegada] = useState([]);
    const [fecha, setFecha] = useState('');
    const [puedeReservar, setPuedeReservar] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const [distancia, setDistancia] = useState(null);
    const [duracion, setDuracion] = useState(null);
    const [escalas, setEscalas] = useState(null);
    const [precioTotal, setPrecioTotal] = useState(null);

    if (tipo !== 'R' && tipo !== 'A') {
        return (<Navigate to='/notfound' replace />);
    }

    useEffect(() => {
        fetch('http://localhost/Proyecto-Intermodular/BACKEND/CONTROLADOR/index.php?action=obtainFleet', {
            method: 'POST',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            const ordenados = data.aviones.sort((a, b) =>
                (a.marca + a.modelo).localeCompare(b.marca + b.modelo)
            )
            setAviones(ordenados);
        })
    }, [])

    useEffect(() => {
        fetch('/airports.json')
        .then(res => res.json())
        .then(data => {
            setAeropuertos(Object.values(data));
        })
    }, [])

    useEffect(() => {
        const filtro = (input, lista, setter) => {
            if (input.length < 2) return setter([]);
            const res = lista.filter(a =>
                (a.name?.toLowerCase().includes(input.toLowerCase()) ||
                a.icao?.toLowerCase().includes(input.toLowerCase()) ||
                a.iata?.toLowerCase().includes(input.toLowerCase()))
            )
            setter(res.slice(0, 3));
        }

        filtro(salida, aeropuertos, setSugerenciasSalida);
    }, [salida, aeropuertos])

    useEffect(() => {
        const filtro = (input, lista, setter) => {
            if (input.length < 2) return setter([]);
            const res = lista.filter(a =>
                (a.name?.toLowerCase().includes(input.toLowerCase()) ||
                a.icao?.toLowerCase().includes(input.toLowerCase()) ||
                a.iata?.toLowerCase().includes(input.toLowerCase()))
            )
            setter(res.slice(0, 3));
        }

        filtro(llegada, aeropuertos, setSugerenciasLlegada);
    }, [llegada, aeropuertos])

    useEffect(() => {
        fetch('http://localhost/Proyecto-Intermodular/BACKEND/CONTROLADOR/index.php?action=getMembershipForBooking', {
            method: 'POST',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => setMembership(data.membership))
    }, [])

    useEffect(() => {
        const aeropuertoSalida = aeropuertos.find(a => salida.includes(a.iata || a.icao));
        const aeropuertoLlegada = aeropuertos.find(a => llegada.includes(a.iata || a.icao));
        if (!aeropuertoSalida || !aeropuertoLlegada) return;

        const continent1 = aeropuertoSalida.tz.split('/')[0];
        const continent2 = aeropuertoLlegada.tz.split('/')[0];

        if (membership == 2 && aeropuertoSalida.country === aeropuertoLlegada.country) {
            setPuedeReservar(true);
        } else if (membership == 3 && continent1 === continent2) {
            setPuedeReservar(true);
        } else if (membership == 4) {
            setPuedeReservar(true);
        } else {
            setPuedeReservar(false);
        }
    }, [salida, llegada, aeropuertos, membership])

    const calcularDistancia = (lat1, lon1, lat2, lon2) => {
        const toRad = (value) => value * Math.PI / 180;
        const R = 6371;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) ** 2 +
                  Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                  Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    const calcularPrecioHora = (rango_max) => {
        if (rango_max < 2500) return 8000;
        if (rango_max <= 5000) return 10000;
        if (rango_max <= 7000) return 12000;
        return 15000;
    }

    const calcularCostoEscalas = (rango_max, escalas) => {
        let extra = 0;
        if (rango_max < 2500) extra = 5000;
        else if (rango_max <= 5000) extra = 10000;
        else if (rango_max <= 7000) extra = 15000;
        else extra = 20000;
        return escalas * extra;
    }

    const calcularItinerario = () => {
        const aeropuertoSalida = aeropuertos.find(a => salida.includes(a.iata || a.icao));
        const aeropuertoLlegada = aeropuertos.find(a => llegada.includes(a.iata || a.icao));
        const avion = aviones.find(a => a.matricula === plane);

        if (!aeropuertoSalida || !aeropuertoLlegada || !avion) return;

        if ((aeropuertoSalida.iata || aeropuertoSalida.icao) === (aeropuertoLlegada.iata || aeropuertoLlegada.icao)) {
            alert('Departure and arrival airports cannot be the same.');
            setVisible(false);
            return;
        }

        const dist = calcularDistancia(aeropuertoSalida.lat, aeropuertoSalida.lon, aeropuertoLlegada.lat, aeropuertoLlegada.lon);
        const horas = dist / 900;
        const escalas = Math.floor(dist / avion.rango_max);
        const precioHora = calcularPrecioHora(avion.rango_max);
        const precioEscalas = calcularCostoEscalas(avion.rango_max, escalas);

        let precio = Math.ceil(horas) * precioHora + precioEscalas;

        if (puedeReservar) {
            precio = 0;
        }

        setDistancia(dist.toFixed(2));
        setDuracion(horas.toFixed(2));
        setEscalas(escalas);
        setPrecioTotal(precio);
        setSelectedPlane(avion);
        setVisible(true);
    }

    const getTomorrowDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        return today.toISOString().split('T')[0];
    }

    const handleSubmitBooking = (e) => {
        e.preventDefault();
        if (!distancia || !selectedPlane) return;

        const formData = new FormData();
        formData.append('plane', plane);
        formData.append('salida', salida);
        formData.append('llegada', llegada);
        formData.append('fecha', fecha);
        formData.append('distancia', distancia);
        formData.append('duracion', duracion);
        formData.append('precio', precioTotal);

        fetch('http://localhost/Proyecto-Intermodular/BACKEND/CONTROLADOR/index.php?action=bookFlight', {
            method: 'POST',
            body: formData,
            credentials: 'include',
        })
        .then(res => res.json())
        .then(() => {
            alert('Reserva realizada correctamente')
            
            navigate('/dashboard');
        });
    }

    return (
        <>
            <main className='flex-1 flex justify-center items-center'>
                <div className="w-[1000px] p-6 space-y-8 text-[#0B1F3A]">
                    <h2 className="text-5xl font-bold text-center mt-6 mb-12">Book Your Private Jet</h2>
                    <form className='mb-6' onSubmit={handleSubmitBooking}>
                        <div className='flex flex-col lg:flex-row gap-5 lg:items-center'>
                            <label htmlFor="jet" className='w-full md:w-1/6 font-semibold'>Choose your Jet:</label>
                            <select
                                name="jet"
                                id="jet"
                                className='rounded-md px-4 py-2 bg-gray-200 w-full lg:w-5/6'
                                onChange={e => {
                                    setPlane(e.target.value);
                                    calcularItinerario();
                                }}
                                required
                            >
                                <option value="">-- Select --</option>
                                {aviones.map((item, index) => (
                                    <option key={index} value={item.matricula}>
                                        {item.marca} {item.modelo}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='flex flex-col md:flex-row gap-5 my-6'>
                            <div className='flex-col w-full md:w-1/2'>
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
                            <div className='flex-col w-full md:w-1/2'>
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

                        <div className='flex flex-col md:flex-row gap-5'>
                            <label htmlFor="fecha" className='w-full md:w-1/6 font-semibold'>When are you going to travel?</label>
                            <input
                                type="date"
                                id="fecha"
                                value={fecha}
                                onChange={e => setFecha(e.target.value)}
                                min={getTomorrowDate()}
                                className='rounded-md px-4 py-2 bg-gray-200 w-full md:w-5/6'
                                required
                            />
                        </div>

                        {
                            !puedeReservar ? (
                                <p className='text-red-700 text-center font-semibold my-4'>Your book does not match with your membership</p>
                            ) : (
                                <p className='text-green-600 text-center font-semibold my-4'>Your book matches your membership</p>
                            )
                        }

                        <div className='text-center mt-6'>
                            <button
                                type="button"
                                className='rounded-full px-6 py-2 text-[#0B1F3A] border-2 border-[#0B1F3A] font-bold text-sm hover:text-white hover:bg-[#0B1F3A] ease-in-out duration-200 mx-auto cursor-pointer'
                                onClick={() => {
                                    if (salida && llegada && fecha && plane) {
                                        calcularItinerario();
                                        setVisible(true);
                                    } else {
                                        alert('Complete all fields to calculate itinerary and proceed.');
                                    }
                                }}
                            >
                                BOOK
                            </button>
                        </div>

                        {isVisible && (
                            <div className='w-[90%] md:w-[550px] flex flex-col justify-center items-center mx-auto mt-20 mb-12 border-2 border-[#0B1F3A] rounded-lg p-5'>
                                <h4 className='text-2xl font-bold text-center mb-4'>Itinerary Summary</h4>
                                <ul className='mb-6 text-left'>
                                    <li><strong>Distance:</strong> {distancia} km</li>
                                    <li><strong>Duration:</strong> {duracion} hours</li>
                                    <li><strong>Stops:</strong> {escalas}</li>
                                    <li><strong>Total Price:</strong> €{precioTotal}</li>
                                </ul>
                                {precioTotal > 0 &&(
                                    <div className='w-full flex flex-col gap-5'>
                                        <div>
                                            <label className='font-semibold'>Credit Card Number</label>
                                            <input type="text" className='rounded-md px-4 py-2 bg-gray-200 w-full' required/>
                                        </div>
                                        <div className='flex flex-col gap-5 md:flex-row md:items-center justify-between'>
                                            <div className='flex flex-col md:flex-row md:items-center md:gap-5'>
                                                <label className='font-semibold'>Validity date</label>
                                                <div className='flex items-center'>
                                                    <input type="text" className='rounded-md px-4 py-2 bg-gray-200 w-[50px]' required/>
                                                    <p className='font-semibold'>/</p>
                                                    <input type="text" className='rounded-md px-4 py-2 bg-gray-200 w-[50px]' required/>
                                                </div>
                                            </div>
                                            <div className='flex flex-col md:flex-row md:items-center md:gap-5'>
                                                <label className='font-semibold'>CVC</label>
                                                <input type="number" className='rounded-md px-4 py-2 bg-gray-200' required/>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <input
                                    type="submit"
                                    className='rounded-full px-6 py-2 mt-5 text-[#0B1F3A] border-2 border-[#0B1F3A] font-bold text-sm hover:text-white hover:bg-[#0B1F3A] ease-in-out duration-200 mx-auto cursor-pointer'
                                    value='SUBMIT'
                                />

                                <button
                                    onClick={() => setVisible(false)}
                                    className='rounded-full px-6 py-2 mt-5 text-sm border-2 border-red-700 font-bold text-red-700 hover:bg-red-700 hover:text-white duration-200 ease-in-out cursor-pointer'
                                >
                                    CLOSE
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </main>
        </>
    )
}

export default Book;