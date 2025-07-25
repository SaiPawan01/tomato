import React, { useContext, useEffect, useState } from 'react'
import './Orders.css'
import { StoreContext } from '../../Context/StoreContext'
import Header from '../../components/Header/Header'
import axios from 'axios'
import { assets } from '../../assets/frontend_assets/assets'

function Orders() {

    const { url, token } = useContext(StoreContext)
    const [data, setData] = useState([])

    const fetchOrders = async () => {
        try {
            const response = await axios.post(
                `${url}/api/order/user-orders`, 
                {}, 
                {
                    headers: {
                        token: token
                    }
                }
            );


            if (response.data && response.data.success) {
                console.log("Orders received:", response.data.data);
                setData(response.data.data);
            } else {
                console.error("Failed to fetch orders:", response.data.message);
            }
        } catch (error) {
            console.error("Error in fetchOrders:", error.message);
        }
    };
    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token])


    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className='container'>
                {
                    data.map((order,index)=>{
                        return (
                            <div key={index} className='my-orders-order'>
                                <img src={assets.parcel_icon} alt="" />
                                <p>{order.items.map((item,index)=>{
                                    if(index === order.items.length-1){
                                        return item.name+' X '+item.quantity
                                    }
                                    else{
                                        return item.name+" X "+item.quantity + ", "
                                    }
                                })}</p>
                                <p>${order.amount}.00</p>
                                <p>Items : {order.items.length}</p>
                                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                                <button>Track Order</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Orders
