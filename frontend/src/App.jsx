import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'

function App() {

  const  [isRegistered, setIsRegistered] = useState(true)

  return (
    <Navbar isRegistered={isRegistered}/>
  )
}

export default App
