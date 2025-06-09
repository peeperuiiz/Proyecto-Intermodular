import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { PieChart } from '@mui/x-charts/PieChart';

const Maintenance = () => {
  const location = useLocation();
  const tipo = location.state?.tipo;

  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Rutinario");
  const [aviones, setAviones] = useState([]);
  const [mantenimientos, setMantenimientos] = useState([]);
  const [params, setParams] = useState([]);

  if (tipo !== 'A') {
    return <Navigate to='/notfound' replace />;
  }

  useEffect(() => {
    fetch('http://localhost/Proyecto-Intermodular/BACKEND/CONTROLADOR/index.php?action=obtainFleetForMaintenance', {
      method: 'POST',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setAviones(data.aviones);
      })
  }, [])

  useEffect(() => {
    fetch('http://localhost/Proyecto-Intermodular/BACKEND/CONTROLADOR/index.php?action=obtainMaintenances', {
      method: 'POST',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setMantenimientos(data.mantenimientos);
      })
  }, [])

  useEffect(() => {
    fetch('http://localhost/Proyecto-Intermodular/BACKEND/CONTROLADOR/index.php?action=obtainChartParams', {
      method: 'POST',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        const transformed = [
          {value: data.params[0].Routine, label: 'Routine'},
          {value: data.params[0].Preventive, label: 'Preventive'},
          {value: data.params[0].Corrective, label: 'Corrective'},
          {value: data.params[0].Unmaintained, label: 'Unmaintained'}
        ]

        setParams(transformed)
      })
  }, [])

  const handleSearchChange = (value) => {
    setSearchInput(value);
    if (!value) {
      setSuggestions([]);
      return;
    }

    const filtered = aviones.filter((avion) => {
      const fullName = `${avion.marca} ${avion.modelo}`.toLowerCase();
      return fullName.includes(value.toLowerCase());
    });

    setSuggestions(filtered);
  }

  const handleSelectSuggestion = (avion) => {
    const fullName = `${avion.marca} ${avion.modelo}`;
    setSearchInput(fullName);
    setSuggestions([]);
  }

  const handleSubmitMaintenance= (e) => {
    e.preventDefault();

    const searchNormalized = searchInput.trim().toLowerCase();

    const avionSeleccionado = aviones.find(
      (item) => `${item.marca} ${item.modelo}`.toLowerCase() === searchNormalized
    );

    const formData = new FormData();
    formData.append('plane', avionSeleccionado.matricula);
    formData.append('tipo', selectedOption);

    fetch('http://localhost/Proyecto-Intermodular/BACKEND/CONTROLADOR/index.php?action=insertMaintenances', {
        method: 'POST',
        body: formData,
        credentials: 'include',
    })
    .then(res => res.json())
    .then((data) => {
        if (!data.err) { 
          alert('Maintenance added')
          window.location.reload();
        }else{
          alert("Couldn't add maintenance")
        }
        
        
    });
  }

  return (
    <main className="flex-1 flex flex-col justify-center items-center p-6">
      <h2 className="text-[#0B1F3A] text-5xl font-bold my-10">Jet's Maintenance Panel</h2>
      <div className="mb-6 w-full max-w-4xl">
        <form className='flex flex-col md:flex-row items-center gap-4' onSubmit={handleSubmitMaintenance}>
          <div className="relative flex flex-col md:flex-row md:items-center gap-4 w-[80%] md:w-2/3">
            <label className='font-semibold text-[#0B1F3A]'>Model:</label>
            <input type="text" value={searchInput} onChange={(e) => handleSearchChange(e.target.value)} className="bg-gray-200 p-2 rounded w-full" />
            {suggestions.length > 0 && (
              <ul className="absolute bg-white border w-full shadow z-10 max-h-48 overflow-y-auto">
                {suggestions.map((avion) => (
                  <li key={avion.id_avion} onClick={() => handleSelectSuggestion(avion)} className="p-2 hover:bg-gray-100 cursor-pointer">
                    {avion.marca} {avion.modelo}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className='flex flex-col md:flex-row w-[80%] gap-4 md:w-1/3'>
            <div className='flex flex-col md:flex-row md:items-center gap-4 w-full'>
              <label className='font-semibold text-[#0B1F3A]'>Type:</label>
              <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} className="border p-2 w-full rounded ">
                <option value="Rutinario">Routine</option>
                <option value="Preventivo">Preventive</option>
                <option value="Correctivo">Corrective</option>
              </select>
            </div>
            <input type="submit" value="SUBMIT" className='rounded-md px-6 py-2 text-[#0B1F3A] border-2 border-[#0B1F3A] font-bold text-sm hover:text-white hover:bg-[#0B1F3A] ease-in-out duration-200 mx-auto cursor-pointer' />
          </div>
        </form>
      </div>
      <div className="flex flex-wrap gap-6 justify-center w-full max-w-6xl">
        <div className="w-[500px] p-4">
          <h3 className="text-lg font-semibold mb-2">Last 5 Maintenances</h3>
          <table className="w-full text-[#0B1F3A]">
            <thead className="">
              <tr className='border-b bg-gray-200'>
                <th className="p-2">Modelo</th>
                <th className="p-2">Fecha</th>
                <th className="p-2">Tipo</th>
              </tr>
            </thead>
            <tbody>
              {mantenimientos.slice(0, 5).map((item, index) => {
                const avion = aviones.find(a => a.matricula === item.avion);

                return (
                  <tr key={item.id_mantenimiento} className={index % 2 === 0 ? 'bg-white text-center border-b' : 'bg-gray-200 text-center border-b'}>
                    <td className='py-2'>{avion ? `${avion.marca} ${avion.modelo}` : item.avion}</td>
                    <td className='py-2'>{item.fecha}</td>
                    <td className='py-2'>{item.tipo_mant}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="w-[500px] rounded p-4">
          <PieChart
            colors={['blue', '#79C6F3', 'gray', '#0B1F3A']}
            series={[
              {
                data: params,
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
    </main>
  );
};

export default Maintenance;