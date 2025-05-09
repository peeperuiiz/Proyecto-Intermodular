import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const MainLayout = () => {

    const [typeUser, setTypeUser] = useState();
    
    useEffect(() => {
    fetch('http://localhost/Proyecto-Intermodular/BACKEND/CONTROLADOR/index.php?action=getTypeUser', {
        method: 'POST',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {

        let options;

        switch (data.type) {
        case 'A':
            options = ['Schedule', 'Accounting'];
        break;
        
        case 'R':
            options = ['Home', 'Fleet', 'Book', 'Contact', 'Log Out'];
        break;

        case 'G':
            options = ['Home', 'Contact', 'Sign In'];
        break;
        }

        setTypeUser(options);
    })
    }, [])

    while(!typeUser) return <div className="text-center text-gray-600 mt-10">Loading...</div>;

  return (
    <>
        <Header type = {typeUser}/>
            <Outlet/>
        <Footer/>
    </>
  )
}

export default MainLayout