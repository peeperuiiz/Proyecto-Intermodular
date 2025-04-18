import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Layout from './layout/Layout';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}/>
          {/* <Route index element={<Home />} />
          <Route path='/contact' element={<Contacto />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
