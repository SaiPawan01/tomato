import React, { useContext, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/frontend_assets/assets'
import axios from 'axios'
import { StoreContext } from '../../Context/StoreContext'

const LoginPopUp = ({setShowLogin}) => {

    const [currentState,setCurrentState] = useState('Sign Up') //or Login
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}));
    }

    //api calls to verify login
    const {url,token,setToken} = useContext(StoreContext)
    const onLogin = async (event)=>{
        event.preventDefault()
        let newUrl  = url;
        if(currentState == 'Login'){
            newUrl += '/api/user/login'
        }
        else{
            newUrl += '/api/user/register'
        }

        const response = await axios.post(newUrl,data)

        if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)
        }
        else{
            alert(response.data.message)
        }
    }

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="cross-icon" />
            </div>
            <div className="login-popup-inputs">
                {
                    currentState === 'Sign Up'?<input type="text" onChange={onChangeHandler} value={data.name} name='name' placeholder='Name' required />:<></>
                }
                <input name='email' type="email" onChange={onChangeHandler} value={data.email} placeholder='Email'  required/>
                <input name='password' type="password" onChange={onChangeHandler} value={data.password} placeholder='Password' required/>
            </div>
            {
                currentState === 'Sign Up'
                ?<div className='terms-conditions'>
                  <input type="checkbox" />
                  <p>By Clicking, Agree to the terms & conditions.</p>
                </div>
                :<></>
            }
            <button>{currentState === 'Sign Up'?"Create account":"Login"}</button>
            {
                currentState ==="Sign Up"
                ?<div>Already have an account ? <span onClick={()=>setCurrentState('Login')}>Login</span></div>
                :<div>Create new account.<span onClick={()=>setCurrentState('Sign Up')}>Sign Up</span></div>
            }
        </form>
    </div>
  )
}

export default LoginPopUp
