import React, { useContext } from "react";
import './Cart.css'
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/frontend_assets/assets";
import { useNavigate } from "react-router-dom";

const Cart = () =>{

    const {food_list,cartItems,removeFromCart,addToCart,getTotalCartAmount,url} = useContext(StoreContext);

    const navigate = useNavigate();
    return(
        <div className="cart">
            <div className="cart-items">
                <div className="cart-item-title main-title">
                    <p className="hide-media-query">Item</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p className="hide-media-query">Total</p>
                </div>
                <br />
                <hr />
                {
                    food_list.map((item,index)=>{
                        if(cartItems[item._id] > 0){
                            return(
                                <>
                                    <div className="cart-item-title cart-items-item">
                                        <img className="hide-media-query" src={url+"/images/"+item.image} alt="" />
                                        <p>{item.name}</p>
                                        <p>${item.price}</p>
                                        <p>{cartItems[item._id]}</p>
                                        <p className="hide-media-query">${item.price * cartItems[item._id]}</p>
                                        <p className='cross-icon cross-green' onClick={()=>{addToCart(item._id)}}>
                                            <button>add</button>
                                        </p>
                                        <p className='cross-icon' onClick={()=>{removeFromCart(item._id)}}>
                                            <button>remove</button>
                                        </p>
                                    </div>
                                    <hr />
                                </>
                                
                            )
                        }
                    })
                }
            </div>

            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Summary</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Sub Toatal</p>
                            <p>$ {getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery charges</p>
                            <p>$ {getTotalCartAmount()?2:0}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Discount</p>
                            <p>$ {0}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total Amount</b>
                            <b>$ {getTotalCartAmount()?getTotalCartAmount()+2:0}</b>
                        </div>
                    </div>
                    <div className="checkout-btn-container">
                        <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
                    </div>
                    
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promo code, Enter it</p>
                        <div className="cart-promocode-input">
                            <input type="text" placeholder="Promo code" />
                            <button>submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;