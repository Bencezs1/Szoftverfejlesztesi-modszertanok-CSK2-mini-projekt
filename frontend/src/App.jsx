import { useState, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from "./pages/Home"
import Login from './auth/login.jsx'
import AuthProvider, { AuthContext } from './auth/AuthContext.jsx'
import Register from './auth/register.jsx'
import OwnJokes from './pages/OwnJokes.jsx'
import FavJokes from './pages/FavJokes.jsx'
import Profile from './auth/profile.jsx'
function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  )
}

function AppContent() {
  const { access } = useContext(AuthContext)

  return (
    <>
      <Navbar isRegistered={!!access} />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/own' element={<OwnJokes/>}/>
          <Route path='/favourite' element={<FavJokes/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App;
