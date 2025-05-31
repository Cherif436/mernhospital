import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3030/api/v1/user/create-patient", {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        role: "Patient",
      }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      });

      toast.success(res.data.message);
      navigate("/login");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setNic("");
      setDob("");
      setGender("");

    } catch (error) {
      console.error("Registration Error:", error);
      if(error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Registration failed. Please try again");
      }
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-slate-300'>
      <section className='flex items-center justify-center py-24 w-[500px] rounded-md'>
        <div className='px-4 bg-white p-2 py-6 w-full lg:max-w-[650px] md:max-w-[500px] max-w-[300px] mx-auto flex flex-col rounded-lg shadow-lg'>
          <div className='flex flex-col items-center justify-center'>
            <h2 className="py-8 text-xl font-bold text-center text-indigo-500 md:text-2xl">
              Register Page
            </h2>
            <form className='flex flex-col w-full gap-6' onSubmit={handleRegistration}>
              <div className='flex gap-6'>
                <input type="text" placeholder='First name'
                value={firstName} onChange={(e) => setFirstName(e.target.value)} className='w-full p-3 border border-gray-300 rounded-md shadow-md outline-none md:w-1/2 bg-slate-300' />
                <input type="text" placeholder='Last name' value={lastName} onChange={(e) => setLastName(e.target.value)} className='w-full p-3 border border-gray-300 rounded-md shadow-md outline-none md:w-1/2 bg-slate-300' />
              </div>
              <div className='flex gap-6'>
                <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full p-3 border border-gray-300 rounded-md shadow-md outline-none md:w-1/2 bg-slate-300' />
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full p-3 border border-gray-300 rounded-md shadow-md outline-none md:w-1/2 bg-slate-300' />
              </div>
              <div className='flex gap-6'>
                <input type="text" placeholder='NIC' value={nic} onChange={(e) => setNic(e.target.value)} className='w-full p-3 border border-gray-300 rounded-md shadow-md outline-none md:w-1/2 bg-slate-300' />
                <input type="date" placeholder='Date of birth' value={dob} onChange={(e) => setDob(e.target.value)} className='w-full p-3 border border-gray-300 rounded-md shadow-md outline-none md:w-1/2 bg-slate-300' />
              </div>
              <div className='flex gap-6'>
                <select value={gender} onChange={(e) => setGender(e.target.value)} className='w-full p-3 border border-gray-300 rounded-md shadow-md outline-none md:w-1/2 bg-slate-300'>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <input type="phone" placeholder='Phone number' value={phone} onChange={(e) => setPhone(e.target.value)} className='w-full p-3 border border-gray-300 rounded-md shadow-md outline-none md:w-1/2 bg-slate-300' />
              </div>
              <div className='flex items-center justify-between px-4 mb-4'>
                <p className="mb-0">Already have an account?</p>
                <Link to={"/login"} className='text-blue-600 hover:underline'>Login now</Link>
              </div>
              <div className='flex items-center justify-center'>
                <button className='w-full px-5 py-1 text-lg text-center text-black bg-indigo-200 border-2 border-black rounded-lg cursor-pointer hover:border-3'>Register</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Register
