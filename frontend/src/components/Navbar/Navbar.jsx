import React from 'react'
import Registered from './Registered'
import Unregistered from './Unregistered'

const Navbar = ({isRegistered}) => {

  return (
    <div>
      { isRegistered ? <Registered/> : <Unregistered/> }
    </div>
  )
}

export default Navbar