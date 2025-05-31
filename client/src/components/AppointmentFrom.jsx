import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const AppointmentFrom = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctor = async () => {
      const { data } = await axios.get("http://localhost:3030/api/v1/user/get-all-doctor", { withCredentials: true });
      setDoctors(data?.doctor);
    }
    fetchDoctor();
  }, [])

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await axios.post("http://localhost:3030/api/v1/appointments/create-appointment", { 
        firstName, 
        lastName, 
        email, 
        phone, 
        nic, 
        dob, 
        gender, 
        appointment_date: appointmentDate,
        department,
        doctor_firstName: doctorFirstName,
        doctor_lastName: doctorLastName,
        hasVisited: hasVisitedBool,
        address,
      }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      toast.success(data.message);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setNic("");
      setDob("");
      setGender("");
      setAppointmentDate("");
      setDepartment("");
      setDoctorFirstName("");
      setDoctorLastName("");
      setHasVisited(false);
      setAddress("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className='container px-4 py-12 mx-auto my-4 bg-indigo-100'>
      <h1 className="mb-8 text-3xl font-bold text-center cursor-pointer">
        Appointment
      </h1>
      <form className='space-y-6' onSubmit={handleAppointment}>
        <div className='flex flex-col gap-4 mb-4 md:flex-row'>
          <input type="text" placeholder='First name' value={firstName} onChange={(e) => setFirstName(e.target.value)} className='w-full p-3 border border-gray-300 rounded-md shadow-md outline-none md:w-1/2 bg-slate-300' />
          <input type="text" placeholder='Last name' value={lastName} onChange={(e) => setLastName(e.target.value)} className='w-full p-3 border border-gray-300 rounded-md shadow-md outline-none md:w-1/2 bg-slate-300' />
        </div>
        <div className='flex flex-col gap-4 mb-4 md:flex-row'>
          <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full p-3 border border-gray-300 rounded-md shadow-md outline-none md:w-1/2 bg-slate-300' />
          <input type="number" placeholder='Mobile number' value={phone} onChange={(e) => setPhone(e.target.value)} className='w-full p-3 border border-gray-300 rounded-md shadow-md outline-none md:w-1/2 bg-slate-300' />
        </div>
        <div className='flex flex-col gap-4 mb-4 md:flex-row'>
          <input type="text" placeholder='NIC' value={nic} onChange={(e) => setNic(e.target.value)} className='w-full p-3 border border-gray-300 rounded-md shadow-md outline-none md:w-1/2 bg-slate-300' />
          <input type="date" placeholder='Date of birth' value={dob} onChange={(e) => setDob(e.target.value)} className='w-full p-3 border border-gray-300 rounded-md shadow-md outline-none md:w-1/2 bg-slate-300' />
        </div>
        <div className='flex flex-col gap-4 mb-4 md:flex-row'>
          <select value={gender} onChange={(e) => setGender(e.target.value)} className='w-full p-3 border border-gray-300 rounded-md shadow-md outline-none md:w-1/2 bg-slate-300'>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input type='date' placeholder='Appointment Date' value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} className='w-full p-3 border border-gray-300 rounded-md shadow-md outline-none md:w-1/2 bg-slate-300' />
        </div>
        <div className='flex flex-col gap-4 mb-4 md:flex-row'>
          <select value={department} onChange={(e) => {
            setDepartment(e.target.value);
            setDoctorFirstName("");
            setDoctorLastName("");
          }} className='w-full p-3 border border-gray-300 rounded-md shadow-md outline-none md:w-1/2 bg-slate-300'>
            {departmentsArray.map((depart, index) => (
              <option value={depart} key={index}>
                {depart}
              </option>
            ))}
          </select>
          <select value={`${doctorFirstName} ${doctorLastName}`} onChange={(e) => {
            const [firstName, lastName] = e.target.value.split(" ");
            setDoctorFirstName(firstName);
            setDoctorLastName(lastName);
          }} disabled={!department} className='w-full p-3 border border-gray-300 rounded-md shadow-md outline-none md:w-1/2 bg-slate-300'>
            <option value="">Select Doctor</option>
            {doctors
              .filter((doctor) => doctor.doctorDepartment === department)
              .map((doctor, index) => (
                <option
                  value={`${doctor.firstName} ${doctor.lastName}`}
                  key={index}
                >
                  {doctor.firstName} {doctor.lastName}
                </option>
              ))}
          </select>
        </div>
        <textarea rows="4" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' className='w-full p-3 border border-gray-300 rounded-md shadow-md outline-none bg-slate-300' />
        <div className='flex items-center justify-center gap-4 mb-4 text-center'>
          <p className="justify-center mb-0 text-center cursor-pointer">
            Have you visited before?
          </p>
          <input type="checkbox" checked={hasVisited} onChange={(e) => setHasVisited(e.target.checked)} className='w-6 h-6 rounded-full' />
        </div>
        <button type='submit' className='w-full px-6 py-3 mx-auto text-black bg-blue-400 rounded-md cursor-pointer hover:text-white hover:bg-blue-700'>GET APPOINTMENT</button>
      </form>
    </div>
  )
}

export default AppointmentFrom
