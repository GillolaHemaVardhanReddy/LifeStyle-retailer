import React from 'react'
import './Navbar.css'
import logo from "../../assets/logo.png"

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='nav-logo'>
            <img src={logo} alt='logo'/>
            <p>LIFESTYLE</p>
        </div>
      <p className='nav-profile'>ADMIN</p>
    </div>
  )
}

export default Navbar