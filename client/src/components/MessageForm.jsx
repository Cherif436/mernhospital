import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleMessage = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3030/api/v1/message/create-message", { firstName, lastName, email, phone, message }, { 
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
     })
     .then((res) => {
      toast.success(res?.data?.message);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
     })
     .catch((err) => {
      console.log(err);
      toast.err(err.response?.data?.message);
     })
  } 

  return (
    <div className='max-w-[1540px] mx-auto py-12 mb-2 px-4 bg-indigo-100'>
      <h2 className="mb-6 text-2xl font-bold text-center text-yellow-700">
        Send Message Form Us
      </h2>
      <form className='space-y-6' onSubmit={handleMessage}>
        <div className='flex flex-col gap-4 mb-4 md:flex-row'>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='Frist Name' className='w-full p-3 text-xl border-gray-300 rounded-md shadow-md md:w-1/2 bg-slate-300 outlien-none' />
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' className='w-full p-3 text-xl border-gray-300 rounded-md shadow-md md:w-1/2 bg-slate-300 outlien-none' />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='w-full p-3 text-xl border-gray-300 rounded-md shadow-md md:w-1/2 bg-slate-300 outlien-none' />
          <input type="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone' className='w-full p-3 text-xl border-gray-300 rounded-md shadow-md md:w-1/2 bg-slate-300 outlien-none' />
        </div>
        <textarea placeholder='Message Lenght More than 10 Digits' rows="7" value={message} onChange={(e) => setMessage(e.target.value)} className='w-full p-3 border border-gray-300 rounded-md shadow-md outline-none text-md bg-slate-300' />
        <div className='flex justify-center mb-4'>
          <button className='px-24 py-2 text-black bg-indigo-500 rounded hover:bg-blue-600'>Message Send</button>
        </div>
      </form>
    </div>
  )
}

export default MessageForm