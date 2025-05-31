import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from 'react-toastify';

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get("http://localhost:3030/api/v1/user/get-all-doctor", { withCredentials: true });
        setDoctors(data.doctor);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch doctors."
        )
      }
    }
    fetchDoctors();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className='max-w-[1500px] mx-auto py-10'>
      <h1 className="py-2 text-4xl font-bold text-center cursor-pointer">
        All Doctors
      </h1>
      <Slider {...settings} className='w-[1540px] bg-indigo-100 h-[600px] mt-[30px] gap-5'>
        {doctors.map((item) => (
          <div key={item._id} className='flex justify-center gap-5 items-center w-[450px] h-[600px] rounded-md'>
            <img src={item.docImage.url} alt={`Doctor ${item._id}`} className='object-cover w-full h-full px-4 cursor-pointer rounded-xl' />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Doctor
