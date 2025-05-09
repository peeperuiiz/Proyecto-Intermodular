import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import SignIn from './pages/Signin';
import MainLayout from './layout/MainLayout';
import SignLayout from './layout/SignLayout';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path='/signin' element={<SignLayout />}>
            <Route index element={<SignIn />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
