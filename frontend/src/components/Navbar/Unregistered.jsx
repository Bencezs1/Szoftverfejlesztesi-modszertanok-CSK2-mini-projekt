import React from 'react'
import "./Unregistered.css"
import { Link } from 'react-router-dom'

const Unregistered = () => {
  return (
    <nav>
        <div className='container'>
            <div className='logo'>Logo</div>
            <Link to="/login">
              <button className='login'>Bejelentkezés</button>
            </Link>
        </div>
    </nav>
  )
}

export default Unregistered