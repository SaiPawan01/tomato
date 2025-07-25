import React from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets.js'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div className='Sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Add</p>
        </NavLink>

        <NavLink to='/list' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>List Items</p>
        </NavLink>

        <NavLink to='/orders' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
