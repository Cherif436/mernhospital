import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import p from "../assets/p.jpg";

const Subscript = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const userInfo = {
      access_key: "09cde5f4-62d0-4585-b944-a21ab2619e45",
      name: data.name,
      email: data.email,
      message: data.message,
    }

    try {
      const { data } = await axios.post('https://api.web3forms.com/submit', userInfo);
      if(data) {
        toast.success("Message sent successfull");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className="max-w-[1540px] mx-auto py-10">
      <div className="flex items-center justify-around gap-5">
        <div className="w-[700px] h-[450px] ">
          <img
            className="object-cover w-full h-full rounded-md "
            src={p}
            alt=""
          />
        </div>
        <div className="flex flex-col items-center">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 text-black">
            <div className="w-[600px] flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-xl font-semibold text-yellow-700 cursor-pointer"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter Your Full Name"
                className="w-full px-4 py-1 text-lg border rounded-md outline-none bg-slate-300"
                name="name" 
                {...register("name", { required: true })}
              />
              {errors.name && <span className="text-xs text-red-600">Name field is required</span>}
            </div>
            <div className="w-[600px] flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-xl font-semibold text-yellow-700 cursor-pointer"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                className="w-full px-4 py-1 text-lg border rounded-md outline-none bg-slate-300"
                name="email" 
                {...register("email", { required: true })}
              />
              {errors.email && <span className="text-xs text-red-600">Email field is required</span>}
            </div>
            <div className="w-[600px] h-[300px]">
              <textarea
                type="text"
                placeholder="SubScribe OUr Youtube Channel "
                className="w-full h-full px-4 py-2 border rounded-md outline-none bg-slate-300"
                name="message" 
                {...register("message", { required: true })}
              ></textarea>
              {errors.message && <span className="text-xs text-red-600">Message field is required</span>}
            </div>
            <button className="text-black bg-indigo-500 w-[600px] h-[30px] cursor-pointer rounded-md hover:bg-black hover:text-green-500">
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Subscript;