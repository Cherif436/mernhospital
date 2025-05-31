import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../main';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Patient");
  const navigate = useNavigate();

  // Accessing context
  const { setIsAuth, setUser } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3030/api/v1/user/login-user", { email, password, role }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      // Update context on successful login
      setIsAuth(true);
      setUser(response.data.message);

      toast.success(response.data.message);
      navigate("/");
      setEmail("");
      setPassword("");
      setRole("Patient");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-slate-300'>
      <section className='flex justify-center items-center py-24 w-[500px] rounded-md'>
        <div className='px-4 bg-white p-2 py-6 w-full lg:max-w-[650px] md:max-w-[500px] max-w-[300px] mx-auto flex flex-col rounded-lg shadow-lg'>
          <div className='flex flex-col items-center justify-center'>
            <h2 className="py-8 text-xl font-bold text-center text-indigo-500 md:text-2xl">
              Login
            </h2>
            <form className='flex flex-col w-full gap-6' onSubmit={handleLogin}>
              <div className='flex flex-col gap-6'>
                <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full p-3 border border-gray-300 rounded-md shadow-md outline-none bg-slate-300' />
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full p-3 border border-gray-300 rounded-md shadow-md outline-none bg-slate-300' />
                <select value={role} onChange={(e) => setRole(e.target.value)} className='w-full p-3 border border-gray-300 rounded-md shadow-md outline-none bg-slate-300'>
                  <option value="">Select role</option>
                  <option value="Patient">Patient</option>
                  <option value="Doctor">Doctor</option>
                </select>
              </div>

              <div className='flex items-center justify-between px-4 mb-4'>
                <p className="mb-0">Don't have an Account?</p>
                <Link to="/register" className='text-blue-600 hover:underline'>Register now</Link>
              </div>
              <div className='flex items-center justify-center'>
                <button className='w-full px-5 py-1 text-lg text-center text-black bg-indigo-200 border-2 border-black rounded-lg cursor-pointer hover:border-3 hover:scale-105'>Login</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login
