import { useState, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from "./pages/Home"
import Login from './auth/login.jsx'
import AuthProvider, { AuthContext } from './auth/AuthContext.jsx'

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
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </>
  )
}

export default App;
