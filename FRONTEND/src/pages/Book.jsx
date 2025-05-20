import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const Book = () => {
    const location = useLocation();
    const tipo = location.state?.tipo;
    const [aviones, setAviones] = useState();

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
    }, [])

    return (
        <>
            <main>
                <div className="max-w-5xl mx-auto p-6 space-y-8 text-[#0B1F3A]">
                    <h2 className="text-4xl font-bold text-center mb-6">Book Your Private Jet</h2>
                    <form onSubmit={handleBookingSubmit}>
                        
                    </form>
                </div>
            </main>
        </>
    )
}

export default Book