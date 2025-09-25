import React from 'react'
import "./Unregistered.css"
import { Link } from 'react-router-dom'

const Unregistered = () => {
  return (
    <nav>
        <div className='container'>
          <Link to="/">
            <div className='logo'>Logo</div>
          </Link>
          <Link to="/login">
            <button className='login'>Bejelentkezés</button>
          </Link>
        </div>
    </nav>
  )
}

export default Unregistered