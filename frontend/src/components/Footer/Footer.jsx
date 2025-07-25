import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer' id ='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <Link to='/'><img src={assets.logo} alt="" /></Link>
                <p>Choose from a diverse menu featuring a delecatable array of dishes crafted with the finest ingredients and culinary expertise.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="facebook" />
                    <img src={assets.linkedin_icon} alt="linkedin" />
                    <img src={assets.twitter_icon} alt="twitter" />
                </div>
            </div>
            <div className="footer-content-middle">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91-888-777-666</li>
                    <li>contact@tomato.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <div className="footer-copyright">
             <p>Copyright 2024 @ Tomato.com - All Rights Reserved</p>
        </div>
       
    </div>
  )
}

export default Footer
