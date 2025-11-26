import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/adminLog/Sidebar'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {


   const {axios, setToken, navigate}= useAppContext();


   const logout = ()=>{
    localStorage.removeItem('token');
    axios.defaults.headers.common['authorization'] = null;
    setToken(null);
    navigate('/');
   }

  return (
    <>
    <div className='flex justify-between items-center   py-2 h-[78px] px-4 sm:px-12 border-b border-gray-200'>
        <img src={assets.Edit_Logo} alt=""  className='mb-3 w-32 sm:w-[250px] cursor-pointer' onClick={()=> navigate('/')}/>
        <button onClick={logout} className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>Logout</button>
    </div>
    <div className='flex h-[calc(100vh-70px)]'> 
        <Sidebar/>
        <Outlet/>

    </div>
    </>
  )
}

export default Layout
