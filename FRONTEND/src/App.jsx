import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import SignIn from './pages/Signin';
import MainLayout from './layout/MainLayout';
import SignLayout from './layout/SignLayout';
import Contact from './pages/Contact';
import Fleet from './pages/Fleet';
import NotFound from './pages/NotFound';
import Book from './pages/Book';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/fleet' element={<Fleet />} />
            <Route path='/book' element={<Book />} />
            <Route path='/notfound' element={<NotFound />} />
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
