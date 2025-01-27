import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from '../utils';

const Main = () => {
    const [LoggedInUser , setLoggedInUser] = useState('');
    const navigate = useNavigate()
    useEffect(()=>{
        setLoggedInUser(localStorage.getItem('LoggedInUser'))
    },[])

    const handleLogoutClick =(e) =>{
        localStorage.removeItem('token')
        localStorage.removeItem('LoggedInUser')
        handleSuccess('Logout Successfully')
        setTimeout(()=>{
            navigate('/login')
        },1000)
    }


    const fetchProducts = async () => {
        try {
            const url = url('http://localhost:8080/product')
            const headers = {
                header:{
                    'Authorization':localStorage.getItem('token')
                }
            }
            const response = await fetch(url,headers);
            const result = await response.json();
            console.log(result)
        } catch (error) {
            
        }
    }
    
    useEffect(()=>{
        fetchProducts()
    })
  return (
    <div>
        <h1>Welcome , {LoggedInUser}</h1>
        <button onClick={handleLogoutClick}>Logout</button>

        <ToastContainer />
    </div>

  )
}

export default Main