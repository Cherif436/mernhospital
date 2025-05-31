import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);

  // get all doctor
  // by one function useEffect
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get("http://localhost:3030/api/v1/user/get-all-doctor", { withCredentials: true });
        setDoctors(data.doctor);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    fetchDoctors();
  }, []);

  if(!isAuthenticated) {
    <Navigate to="/login" />
  }

  // delete doctor by admin

  const handleDelete = async (doctorId) => {
    try {
      const { data } = await axios.delete(`http://localhost:3030/api/v1/user/delete/doctor/${doctorId}`, { withCredentials: true });
      setDoctors((prevDoctors) => prevDoctors.filter((doctor) => doctor._id !== doctorId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className='py-20 bg-gray-200'>
      <h1 className="py-4 mb-8 text-2xl font-bold text-center text-indigo-600 cursor-pointer md:text-3xl">
        All Doctor{" "}
      </h1>
      <div className='overflow-x-auto'>
        <table className='min-w-[1540px] mx-auto bg-white shadow-md rounded-lg'>
          <thead className="p-2 text-white bg-gray-800">
            <tr className="py-2">
              <th className="px-4 py-2 text-lg cursor-pointer">#</th>
              <th className="px-4 py-2 text-lg cursor-pointer">Image</th>
              <th className="px-4 py-2 text-lg cursor-pointer">Name </th>
              <th className="px-4 py-2 text-lg cursor-pointer">Department</th>
              <th className="px-4 py-2 text-lg cursor-pointer">NIC</th>
              <th className="px-4 py-2 text-lg cursor-pointer">Phone</th>
              <th className="px-4 py-2 text-lg cursor-pointer">Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors && doctors.length > 0 ? (
              doctors.map((ele, index) => (
                <tr key={ele._id} className='hover:bg-gray-300'>
                  <td className='px-4 py-2 text-center cursor-pointer'>
                    {index + 1}
                  </td>
                  <td className='px-4 py-2 text-center cursor-pointer'>
                    {ele.docImage.url}
                  </td>
                  <td className='px-4 py-2 text-center cursor-pointer'>
                    {`${ele.firstName} ${ele.lastName}`}
                  </td>
                  <td className='px-4 py-2 text-center cursor-pointer'>
                    {ele.doctorDepartment}
                  </td>
                  <td className='px-4 py-2 text-center cursor-pointer'>
                    {ele.nic}
                  </td>
                  <td className='px-4 py-2 text-center cursor-pointer'>
                    {ele.phone}
                  </td>
                  <td>
                    <MdDelete size={25} onClick={() => handleDelete(ele._id)} className='mx-auto text-3xl text-red-600 cursor-pointer' />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No Registered Doctor Founds</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Doctors
