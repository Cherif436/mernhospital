import React, { useContext, useEffect, useState } from 'react'
import { toast } from "react-toastify";
import { Context } from '../main';
import axios from "axios";
import { Navigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get("http://localhost:3030/api/v1/message/get-all-message", { withCredentials: true });
        setMessages(data.message);
      } catch (error) {
        console.error(error.response.data.message);
      }
    }
    fetchMessages();
  }, []);

  const handleDelete = async (messageId) => {
    try {
      const { data } = await axios.delete(`http://localhost:3030/api/v1/message/message-delete/${messageId}`, { withCredentials: true });
      setMessages((prevMessages) => prevMessages.filter((message) => message._id !== messageId));
      toast.success(data?.message);
    } catch (error) {
      
    }
  }

  if(!isAuthenticated) {
    return <Navigate to={"/login"} />
  }

  return (
    <section className='h-screen p-10 mx-20 bg-gray-200 page rounded-l-3xl'>
      <h1 className="mb-8 text-2xl font-bold text-center text-indigo-600">
        MESSAGE
      </h1>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white rounded-lg shadow-md'>
          <thead className="text-white bg-gray-800">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Message</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages && messages.length > 0 ? (
              messages.map((element, index) => (
                <tr key={element._id} className='hover:bg-gray-300'>
                  <td className='px-4 py-2 text-center'>{index + 1}</td>
                  <td className='px-4 py-2 text-center'>{element.firstName}</td>
                  <td className='px-4 py-2 text-center'>{element.lastName}</td>
                  <td className='px-4 py-2 text-center'>{element.email}</td>
                  <td className='px-4 py-2 text-center'>{element.phone}</td>
                  <td className='px-4 py-2 text-center'>
                    {element.message.slice(0, 20) + (element.message.length > 20 ? "..." : "")}
                  </td>
                  <td className='px-4 py-2 text-center'>
                    <MdDelete size={25} onClick={() => handleDelete(element._id)} className='mx-auto text-red-500 cursor-pointer' />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className='px-4 py-4 text-center'>
                  No Messages!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Messages
