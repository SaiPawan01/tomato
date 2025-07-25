import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets.js'

function Navbar() {
  return (
    <div className='Navbar'>
      <img src={assets.logo} alt="" className="logo" />
      <img src={assets.profile_image} alt="" className="profile-logo" />
    </div>
  )
}

export default Navbar
