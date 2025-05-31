import React, { useContext, useState } from 'react'
import { Context } from '../main';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3030/api/v1/user/login-user", { email, password, role: "Admin" }, { 
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
       });

      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigate("/");
      setEmail("");
      setPassword("");

    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  if(isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-slate-300'>
      <section className='flex justify-center items-center py-24 w-[500px] rounded-md'>
        <div className='px-4 bg-white p-2 py-6 w-full lg:max-w-[650px] md:max-w-[500px] max-w-[300px] mx-auto flex flex-col rounded-lg shadow-lg'>
          <div className='flex flex-col items-center justify-center'>
            <h2 className="py-8 text-xl font-bold text-center text-indigo-500 md:text-2xl">
              Login
            </h2>
            <form onSubmit={handleLogin} className='flex flex-col w-full gap-6'>
              <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full p-3 border border-gray-300 rounded-md shadow-md outline-none bg-slate-300' required />
              <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full p-3 border border-gray-300 rounded-md shadow-md outline-none bg-slate-300' required />
              <div className='flex items-center justify-center'>
                <button type="submit" className='w-full px-5 py-1 text-lg text-center text-black bg-indigo-200 border-2 border-black rounded-lg cursor-pointer hover:border-3'>Login</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login
