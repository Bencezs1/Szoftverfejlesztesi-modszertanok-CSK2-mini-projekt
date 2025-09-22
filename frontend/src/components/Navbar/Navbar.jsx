import React from 'react'
import Registered from './Registered'
import Unregistered from './Unregistered'
import JokeCard from '../JokeCard/JokeCard'

const Navbar = ({isRegistered}) => {

  return (
    <div>
      { isRegistered ? <Registered/> : <Unregistered/> }
    </div>
  )
}

export default Navbar