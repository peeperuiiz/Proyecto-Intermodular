import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const Membership = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const tipo = location.state?.tipo;
    const [membership, setMembership] = useState([]);
    const [isVisible, setVisible] = useState(false);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedName, setSelectedName] = useState('');

    if (tipo !== 'R' && tipo !== 'A') {
        return (<Navigate to='/notfound' replace />);
    }

    useEffect(() => {
        fetch('http://localhost/Proyecto-Intermodular/BACKEND/CONTROLADOR/index.php?action=obtainMemberships', {
            method: 'POST',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            setMembership(data.memberships)
        })
    }, []);

    const handleBuyClick = (price, name) => {
        setSelectedPrice(price);
        setSelectedName(name);
        setVisible(true);
    };

    const handleClose = () => {
        setVisible(false);
        setSelectedPrice(null);
        setSelectedName('');
    };

    const handlePayment = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('membership', selectedName);

        fetch('http://localhost/Proyecto-Intermodular/BACKEND/CONTROLADOR/index.php?action=updateMembership', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        })
        .then((res) => res.text())
        .then(data => {

            if (!data.includes('err')) {
                navigate('/');
            }
        })
    }

    return (
        <main>
            <section>
                <div className='text-[#0B1F3A] p-6'>
                    <h2 className='text-5xl font-bold text-center mt-6 mb-12'>Memberships</h2>
                    <div className='w-full flex flex-wrap justify-center mx-auto gap-10 mb-6'>
                        {
                            membership.map((item, index) => (
                                <div key={index} className='w-[400px] p-5 border-2 border-[#0B1F3A] rounded-lg flex flex-col items-center'>
                                    <div className='h-[250px] bg-cover bg-center w-full' style={{ backgroundImage: `url(${item.ruta})` }}></div>
                                    <h3 className='text-2xl font-bold text-center my-3'>{item.nombre}</h3>
                                    <div className='font-semibold text-center flex flex-col items-center justify-center'>
                                        <span>Enabled flight hours: {item.h_vuelo_disp}</span>
                                        <span>Enabled range: {item.rango_vuelo}</span>
                                    </div>
                                    <p className='text-justify my-3'>{item.descripcion}</p>
                                    <button
                                        className='rounded-lg px-6 py-2 text-[#0B1F3A] border-2 border-[#0B1F3A] font-bold text-sm hover:text-white hover:bg-[#0B1F3A] ease-in-out duration-200 mx-auto cursor-pointer'
                                        onClick={() => handleBuyClick(item.precio, item.nombre)}
                                    >
                                        BUY
                                    </button>
                                </div>
                            ))
                        }
                    </div>

                    {
                        isVisible && (
                            <div className='w-[90%] md:w-[550px] flex flex-col justify-center items-center mx-auto mt-20 mb-12 border-2 border-[#0B1F3A] rounded-lg p-5'>
                                <h4 className='text-2xl font-bold text-center mb-3'>You selected: {selectedName} which is {selectedPrice}€</h4>
                                <form onSubmit={handlePayment} className='w-full flex flex-col gap-5'>
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
                                    <input
                                        type="submit"
                                        className='rounded-full px-6 py-2 text-[#0B1F3A] border-2 border-[#0B1F3A] font-bold text-sm hover:text-white hover:bg-[#0B1F3A] ease-in-out duration-200 mx-auto cursor-pointer'
                                        value={'PAY'}
                                    />
                                </form>
                                <button
                                    onClick={handleClose}
                                    className='rounded-full px-6 py-2 mt-5 text-sm border-2 border-red-700 font-bold text-red-700 font-semibold hover:bg-red-700 hover:text-white duration-200 ease-in-out cursor-pointer'
                                >
                                    CLOSE
                                </button>
                            </div>
                        )
                    }
                </div>
            </section>
        </main>
    );
};

export default Membership