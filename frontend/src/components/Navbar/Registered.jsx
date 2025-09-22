import React from 'react'
import './registered.css'

const Registered = () => {
  return (
    <nav>
      <div className="container">
          <div className="logo">Logo</div>
          <div className="middle">
            <button className="favourites">Kedvencek</button>
            <button className="ownJokes">Saját viccek</button>
          </div>
          <div className="right">
            <button className="newJoke">Új vicc</button>
            <button className="profile">Profil</button>
          </div>
      </div>
    </nav>

  )
}

export default Registered