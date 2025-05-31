import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Context } from '../main';
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(Context);
  const navigate = useNavigate();

  // logout handle
  const logOutHangle = async () => {
    try {
      const res = await axios.get("http://localhost:3030/api/v1/user/logout-patient", {
        withCredentials: true,
      })
      toast.success(res.data.message);
      setIsAuth(false);
      navigate("/login");
      
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Logout failed. Please try again"
      )
    } 
  }

  // Handle login navigation
  const handleLogin = async () => {
    navigate("/login");
  }

  return (
    <div className='fixed top-0 left-0 right-0 z-10 bg-indigo-200 shadow-lg'>
      <div className='max-w-[1540px] mx-auto py-5 px-8 text-black'>
        <nav className='flex items-center justify-between'>
          <div className='flex-1 text-2xl font-bold'>
            <Link to="/">Hospital Management System</Link>            
          </div>
          <div className='hidden lg:flex flex-2'>
            <div className='flex gap-6'>
              <Link to="/" className='font-semibold text-gray-900 cursor-pointer hover:text-black hover:underline hover:underline-offset-8'>Home</Link>
              <Link to="/about" className='font-semibold text-gray-900 cursor-pointer hover:text-black hover:underline hover:underline-offset-8'>About</Link>
              <Link to="/appointment" className='font-semibold text-gray-900 cursor-pointer hover:text-black hover:underline hover:underline-offset-8'>Appointment</Link>
              {isAuth ? (<button onClick={logOutHangle} className='font-semibold text-gray-900 cursor-pointer hover:text-black hover:underline hover:underline-offset-8'>LogOut</button>) : (<button onClick={handleLogin} className='font-semibold text-gray-900 cursor-pointer hover:text-black hover:underline hover:underline-offset-8'>Login</button>)}
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
