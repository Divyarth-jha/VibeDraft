import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext.jsx'

const Navbar = () => {


const {navigate, token}= useAppContext();

  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32 '>
      <img onClick={()=>navigate('/')} src={assets.Edit_Logo} alt="logo" className='w-32 sm:w-55 cursor-pointer'/>
      <button onClick={()=>navigate('/admin')} className='flex gap-2 items-center rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>
       {token ? 'Dashboard' : 'Login'}
        <img  src={assets.arrow} alt="arrow" className='w-3' />
      </button>
    </div>
  )
}

export default Navbar
