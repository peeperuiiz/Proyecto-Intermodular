import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const Accounting = () => {
  const location = useLocation();
  const tipo = location.state?.tipo;
  const [ingreso, setIngreso] = useState(null);
  const [gasto, setGasto] = useState(null);

  if (tipo !== 'A') {
    return <Navigate to='/notfound' replace />;
  }

  useEffect(() => {
    fetch('http://localhost/Proyecto-Intermodular/BACKEND/CONTROLADOR/index.php?action=obtainTotalIncome', {
      method: 'POST',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setIngreso(data.income)
        setGasto(data.outcome)
      })
    }, [])

  return (
    <>
    
    <main className='flex-1 flex flex-col items-center justify-center'>
      <h2 className='text-[#0B1F3A] text-5xl font-bold'>Accounting</h2>
      <div className='flex flex-wrap justify-center my-20 gap-20'>
        <div className='flex flex-col border-2 rounded-md border-[#0B1F3A] text-[#0B1F3A]'>
          <div className='text-center min-w-[500px]'>
            <h3 className='text-xl font-semibold'>Total Income</h3>
            <p className='text-3xl font-bold'>{ingreso-gasto}€</p>
          </div>
          <div>

          </div>
        </div>
        <div className='flex flex-col border-2 rounded-md border-[#0B1F3A] text-[#0B1F3A]'>
          <div className='text-center min-w-[500px]'>
            <h3 className='text-xl font-semibold'>Memberships Bought</h3>
            <p className='text-3xl font-bold'>€</p>
          </div>
          <div>

          </div>
        </div>
        <div className='flex flex-col border-2 rounded-md border-[#0B1F3A] text-[#0B1F3A]'>
          <div className='text-center min-w-[500px]'>
            <h3 className='text-xl font-semibold'>Avg. Growth Expected</h3>
            <p className='text-3xl font-bold'>€/month</p>
          </div>
          <div>

          </div>
        </div>
      </div>
    </main>
    
    </>
  )
}

export default Accounting