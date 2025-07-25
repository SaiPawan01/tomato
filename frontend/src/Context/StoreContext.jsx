import {createContext, useEffect, useState} from 'react'
import axios from 'axios'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems,setCartItems] = useState({})
    const url = "http://localhost:3000"
    const [token,setToken] = useState("")

    const [food_list,setFoodList] = useState([])

    const addToCart = async (itemId) => {
        if(!cartItems[itemId]){
            setCartItems((prev) =>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }

        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }
    const removeFromCart =async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmount =() => {
        let totalAmount = 0;
        
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item)
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }


    const fetchFoodList =async ()=>{
        const response = await axios.get(url+'/api/food/list')
        setFoodList(response.data.data)
    }

    const loadCartData = async (userToken) => {
        try {
            const res = await axios.post(`${url}/api/user/get`, {}, { headers: { token: userToken } });
            setCartItems(res.data.cartData || {});
        } catch (err) {
            console.error('loadCartData error:', err);
        }
    };

    useEffect(()=>{
        async function loadData() {
            const token = localStorage.getItem('token')
            if (token) {
                setToken(token)
                await loadCartData(localStorage.getItem("token"))
            }
            await fetchFoodList();
        }
        loadData();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;






