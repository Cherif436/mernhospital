import React from 'react'
import patient from '../assets/patient.png'

const Hero = () => {
  return (
    <div className='max-w-[1540px] mx-auto pt-24 flex flex-col items-center'>
      <div className='w-[1500px] h-[600px] mx-auto py-4'>
        <div className='relative w-full h-full group'>
          <div className='absolute flex flex-col items-center justify-center w-full h-full text-black transition-opacity duration-500 ease-in-out opacity-0 bg-indigo-300/80 rounded-xl group-hover:opacity-100'>
            <p className="px-4 text-4xl font-bold text-center">
              Hospital Management System
            </p>
            <p className="px-4 py-4 text-xl text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
              fugiat repudiandae, similique alias consectetur suscipit odit
              temporibus culpa illum nesciunt et perferendis cupiditate minima
              cum. fugiat repudiandae, similique alias consectetur suscipit odit
              temporibus culpa illum nesciunt et perferendis cupiditate minima
              cum.
            </p>
            <div className="text-center">
              <button
                className="px-4 py-2 mt-4 text-black bg-white border-white rounded-md hover:border-2 hover:border-pink-500"
              >
                Appoiment Your Doctor
              </button>
            </div>
          </div>
          <img className="object-cover w-full h-full transition-all duration-500 ease-in-out reunded-xl bg-red-600/50 group-hover:bg-transparent" src={patient} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Hero
