import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

const Accounting = () => {
  const location = useLocation();
  const tipo = location.state?.tipo;
  const [ingreso, setIngreso] = useState(null);
  const [gasto, setGasto] = useState(null);
  const [mem1, setMem1] = useState(null);
  const [mem2, setMem2] = useState(null);
  const [mem3, setMem3] = useState(null);
  const [incomeMems, setIncomeMems] = useState(null);
  const [medias, setMedias] = useState([]);
  const [avg, setAvg] = useState(null);

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

  useEffect(() => {
    fetch('http://localhost/Proyecto-Intermodular/BACKEND/CONTROLADOR/index.php?action=memsBought', {
      method: 'POST',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      setMem1(data.mem1)
      setMem2(data.mem2)
      setMem3(data.mem3)
      setIncomeMems(data.income);
    })
  }, [])

  useEffect(() => {
    fetch('http://localhost/Proyecto-Intermodular/BACKEND/CONTROLADOR/index.php?action=avgGrowth', {
      method: 'POST',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      setMedias(data.income)
      setAvg(data.media)
    })
  }, [])

  return (
    <>
    
    <main className='flex-1 flex flex-col items-center justify-center'>
      <h2 className='text-[#0B1F3A] text-5xl font-bold mb-7 mt-7'>Accounting</h2>
      <div className='flex flex-wrap justify-center mb-20 gap-20'>
        <div className='flex flex-col border-2 rounded-md border-[#0B1F3A] text-[#0B1F3A] p-2'>
          <div className='text-center min-w-[500px]'>
            <h3 className='text-xl font-semibold'>Total Income</h3>
            <p className='text-3xl font-bold'>{ingreso-gasto}€</p>
          </div>
          <div>
            <BarChart
              xAxis={[{ data: ['']}]}
              series={[
                { data: [ingreso], label: 'Income', color: 'blue' },
                { data: [gasto], label: 'Outcome', color: 'red' },
              ]}
              height={300}
            />
          </div>
        </div>
        <div className='flex flex-col border-2 rounded-md border-[#0B1F3A] text-[#0B1F3A] p-2'>
          <div className='text-center min-w-[500px]'>
            <h3 className='text-xl font-semibold'>Memberships Bought</h3>
            <p className='text-3xl font-bold'>{incomeMems}€</p>
          </div>
          <div>
            <PieChart
              colors={['blue', '#79C6F3', '#0B1F3A']}
              series={[
                {
                  data: [
                    {value: mem1, label: 'FlyLocal'},
                    {value: mem2, label: 'AeroPlus'},
                    {value: mem3, label: 'GlobalReach'}
                  ],
                  innerRadius: 30,
                  outerRadius: 100,
                  paddingAngle: 1,
                  cornerRadius: 5,
                  startAngle: 0,
                  endAngle: 360,
                  cx: 150,
                  cy: 150,
                }
              ]}
  
              width={300}
              height={300}
            />
          </div>
        </div>
        <div className='flex flex-col border-2 rounded-md border-[#0B1F3A] text-[#0B1F3A] p-2'>
          <div className='text-center min-w-[500px]'>
            <h3 className='text-xl font-semibold'>Avg. Growth Expected</h3>
            <p className='text-3xl font-bold'>{avg}€/month</p>
          </div>
          <div>
            {console.log(medias)}
            <BarChart
              xAxis={[{
                data: medias?.map(m => m.label),
                scaleType: 'band'
              }]}
              series={[{
                data: medias?.map(m => parseInt(m.value))
              }]}
              height={300}
            />
          </div>
        </div>
      </div>
    </main>
    
    </>
  )
}

export default Accounting