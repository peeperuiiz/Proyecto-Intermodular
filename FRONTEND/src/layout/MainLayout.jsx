import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const MainLayout = () => {

    const [links, setLinks] = useState();
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
            options = ['Schedule', 'Maintenance', 'Accounting', 'Log Out'];
        break;
        
        case 'R':
            options = ['Dashboard', 'Fleet', 'Book', 'Membership', 'Contact', 'Log Out'];
        break;

        case 'G':
            options = ['Home', 'Contact', 'Sign In'];
        break;
        }

        setLinks(options);
        setTypeUser(data.type);
    })
    }, [])

    if (!typeUser) return <div className="text-center text-gray-600 mt-10">Loading...</div>;
    

  return (
    <>
        <div className='min-h-screen flex flex-col'>
            <Header type = {links} user={typeUser}/>
                <Outlet/>
            <Footer/>
        </div>
    </>
  )
}

export default MainLayout