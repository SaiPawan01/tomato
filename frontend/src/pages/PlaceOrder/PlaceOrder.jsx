import React, { useContext } from 'react';
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios'


const PlaceOrder = () => {

    const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext)
    const [data,setData] = useState({
        firstName : "",
        lastName : "",
        email : "",
        street : "",
        city : "",
        state : "",
        zipcode : "",
        country : "",
        phone : "",
    })

    const onChangeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData({...data,[name]:value});
    }

    const placeOrder = async (event)=>{
        event.preventDefault();
        let orderItems = [];
        food_list.map((item)=>{
            if(cartItems[item._id] > 0){
                let itemInfo = item;
                itemInfo['quantity'] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        })
        let orderData ={
            address:data,
            items : orderItems,
            amount : getTotalCartAmount()+2
        }
        let response = await axios.post(url+'/api/order/place',orderData,{headers:{token}})
        console.log(response)
        if(response.data.success){
            const {session_url} = response.data;
            window.location.replace(session_url)
        }
        else{
            alert("Error");
        }

    }

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='place-order-title'>Delivey Information</p>
                <div className="multi-fields">
                    <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
                    <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
                </div>
                <input required name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Email address' />
                <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='street' />
                <div className="multi-fields">
                    <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='city' />
                    <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
                </div>
                <div className="multi-fields">
                    <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='zipcode' />
                    <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='country' />
                </div>
                <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='phone' />
            </div>



            <div className="place-order-right">
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
                            <p>$ {getTotalCartAmount() ? 2 : 0}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Discount</p>
                            <p>$ {0}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total Amount</b>
                            <b>$ {getTotalCartAmount() ? getTotalCartAmount() + 2 : 0}</b>
                        </div>
                    </div>
                    <div className="checkout-btn-container">
                        <button type="submit">PROCEED TO PAYMENT</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder