import React from "react";
import './Header.css'
const Header = () => {
    return(
        <div className = 'header'>
            <div className="header-contents">
                <h1>Order your favorite food here.</h1>
                <p>Choose from a diverse menu featuring a delecatable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your carvings and elevate your dinning experience, one delicious meal at a time</p>
                <button>Order now</button>
            </div>
        </div>
    )
}

export default Header