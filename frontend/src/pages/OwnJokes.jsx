import React from 'react'
import JokeCard from '../components/JokeCard/JokeCard'

const OwnJokes = () => {
  return (
    <div className="container mt-4">
      <div className="row g-3">
        <div className="col-12 col-md-6 col-lg-4">
          <JokeCard />
        </div>
      </div>
    </div>
  )
}

export default OwnJokes