import React, { useEffect, useState } from 'react';

const Maintenance = () => {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [aviones, setAviones] = useState([]);
  const [mantenimientos, setMantenimientos] = useState([]);

  useEffect(() => {
    fetch('http://localhost/Proyecto-Intermodular/BACKEND/CONTROLADOR/index.php?action=obtainFleetForMaintenance', {
      method: 'POST',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setAviones(data.aviones);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost/Proyecto-Intermodular/BACKEND/CONTROLADOR/index.php?action=obtainMaintenances', {
      method: 'POST',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setMantenimientos(data.mantenimientos);
      });
  }, []);

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
  };

  const handleSelectSuggestion = (avion) => {
    const fullName = `${avion.marca} ${avion.modelo}`;
    setSearchInput(fullName);
    setSuggestions([]);
  };

  return (
    <main className="flex-1 flex flex-col justify-center items-center p-6">
      <h2 className="text-2xl font-bold mb-4">Jet's Maintenance Panel</h2>

      {/* Input y select */}
      <div className="flex gap-4 mb-6 w-full max-w-4xl">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Buscar por marca o modelo..."
            value={searchInput}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="border p-2 rounded w-full"
          />
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
        <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} className="border p-2 rounded">
          <option value="Rutinario">Routine</option>
          <option value="Preventivo">Preventive</option>
          <option value="Correctivo">Corrective</option>
        </select>
      </div>
      <div className="flex gap-6 w-full max-w-6xl">
        <div className="w-1/2">
          <h3 className="text-lg font-semibold mb-2">Last 5 Maintenances</h3>
          <table className="w-full table-auto border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Modelo</th>
                <th className="border p-2">Fecha</th>
                <th className="border p-2">Tipo</th>
              </tr>
            </thead>
            <tbody>
              {mantenimientos.slice(0, 5).map((entry) => (
                <tr key={entry.id_mantenimiento}>
                  <td className="border p-2">{entry.modelo}</td>
                  <td className="border p-2">{entry.fecha}</td>
                  <td className="border p-2">{entry.tipo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-1/2 bg-gray-50 border border-dashed border-gray-300 rounded p-4">
        </div>
      </div>
    </main>
  );
};

export default Maintenance;