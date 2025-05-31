import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import { Context } from '../main';
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);

  // get all appointments
  useEffect(() => {
    const fatchAppointments = async () => {
      try {
        const { data } = await axios.get("http://localhost:3030/api/v1/appointments/get-all-appiontment", { withCredentials: true });
        setAppointments(data.appiontment);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    fatchAppointments();
  }, []);

  // update status on appointment
  const handleStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(`http://localhost:3030/api/v1/appointments/update-status-appointment/${appointmentId}`, { status }, { withCredentials: true });
      setAppointments((preAppointments) => {
        preAppointments.map((appointmet) => {
          appointmet._id === appointmentId
            ? { ...appointmet, status }
            : appointmet;
        });
      });
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message.data.message);
    }
  }

  // delete appointment by admin
  const handleDelete = async (appointmentId) => {
    try {
      const { data } = await axios.delete(`http://localhost:3030/api/v1/appointments/delete-appointment/${appointmentId}`, { withCredentials: true });
      setAppointments((app) => {
        app.filter((appointmet) => appointmet._id !== appointmentId)
      });
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const { isAuthenticated } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className='flex flex-col h-screen gap-5 p-4 mx-4 bg-gray-100 rounded-lg md:mx-20 md:p-10'>
      <div className='flex flex-col md:flex-row gap-5 h-auto min-h-[35vh]'>
        <div className='flex items-center flex-1 p-5 bg-blue-200 rounded-lg'>
          <div className='ml-4 flex-2 md:md-0'>
            <div className="flex items-center mb-3 text-2xl font-bold cursor-pointer md:text-3xl">
              <p className="mr-2">Hello,</p>
              <p className="text-pink-500">Admin</p>
            </div>
            <p className="text-sm md:text-base">
              Welcome to the admin Dashboard <div className="br"></div> Here You
              can message all the appointments and doctors
            </p>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center flex-1 p-5 text-white bg-blue-500 rounded-lg'>
          <p className="text-xl font-semibold md:text-2xl">Total Appointment</p>
          <h1 className="text-2xl font-bold tracking-wider md:text-3xl">150</h1>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 p-5 text-pink-500 bg-blue-200 rounded-lg">
          <p className="text-xl font-semibold md:text-2xl">Registerd Doctors</p>
          <p className="text-2xl font-bold tracking-wider md:text-3xl">55</p>
        </div>
      </div>
      <div className='bg-white rounded-lg p-5 md:p-10 h-auto md:h-[65vh] overflow-y-auto'>
        <h4 className="mb-5 text-xl font-semibold text-center text-gray-800 cursor-pointer md:text-2xl">
          Appointments
        </h4>
        <table className='min-w-[1450px] mx-auto bg-white px-12  shadow-md rounded-lg'>
          <thead className="p-2 text-white bg-gray-800">
            <tr>
              <th className="py-2 md:py-3">Patient</th>
              <th className="py-2 md:py-3">Date</th>
              <th className="py-2 md:py-3">Doctor</th>
              <th className="py-2 md:py-3">Department</th>
              <th className="py-2 md:py-3">Status</th>
              <th className="py-2 md:py-3">Visited</th>
              <th className="py-2 md:py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments && appointments.length > 0 ? (
              appointments.map((items) => (
                <tr key={items._id} className='hover:bg-gray-300'>
                  <td className='py-2 text-center cursor-pointer md:py-3'>
                    {`${items.lastName} ${items.firstName}`}
                  </td>
                  <td className='py-2 text-center cursor-pointer md:py-3'>
                    {items.appointment_date.substring(0, 10)}
                  </td>
                  <td className='py-2 text-center cursor-pointer md:py-3'>
                    {`${items.doctor.firstName} ${items.doctor.lastName}`}
                  </td>
                  <td className='py-2 text-center cursor-pointer md:py-3'>
                    {items.department}
                  </td>
                  <td className='py-2 text-center cursor-pointer md:py-3'>
                    <select value={items.status} onChange={(e) => handleStatus(items._id, e.target.value)} className={`w-full text-md lg:text-lg font-semibold border-none ${
                      items.status === "Pending"
                      ? "text-yellow-500"
                      : items.status === "Acceped"
                      ? "text-green-500"
                      : "text-red-500"
                    }`}>
                      <option value="Pending" className='text-center text-yellow-500 cursor-pointer'>Pending</option>
                      <option value="Accepted" className='text-center text-green-500 cursor-pointer'>Accepted</option>
                      <option value="Rejected" className='text-center text-red-500 cursor-pointer'>Rejected</option>
                    </select>
                  </td>
                  <td className='py-2 text-center cursor-pointer md:py-3'>
                    {appointments.hasVisited ? (
                      <GoCheckCircleFill className="mx-auto text-xl text-green-500 md:text-2xl" />
                    ) : (
                      <AiFillCloseCircle className="mx-auto text-red-500 md:text-2xl lg:text-3xl" />
                    )}
                  </td>
                  <td className='py-2 text-center cursor-pointer md:py-3'>
                    <MdDelete size={20} className="flex items-center justify-center text-center text-red-600" onClick={() => handleDelete(items._id)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No Registered Patients Founds</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
