import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/frontend_assets/assets'

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        {/* <p>Choose from a diverse menu featuring a delecatable of dishes. Our mission is to satisfy your carvings and elevate your dinning experience, one delicious meal at a time</p> */}
        <div className="explore-menu-list">
            {menu_list.map((item,index) =>{
                return(
                    <div key = {index} onClick={()=>setCategory((prev) => (prev === item.menu_name ? "All" : item.menu_name))} className="explore-menu-list-item">
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="menu_img" />
                        <p className={category===item.menu_name?"active-text":""} >{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu
