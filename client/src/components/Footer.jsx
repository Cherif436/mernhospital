import React from "react";
import { FaLocationArrow, FaPhone, FaSquareInstagram } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";
import { FaYoutube, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const hours = [
    { id: 1, day: "Monday", time: "9:00 AM to 11:00P PM" },
    { id: 2, day: "Tuesday", time: "9:00 AM to 11:00P PM" },
    { id: 3, day: "Wednesday", time: "9:00 AM to 11:00P PM" },
    { id: 4, day: "Thursday", time: "9:00 AM to 11:00P PM" },
    { id: 5, day: "Friday", time: "9:00 AM to 11:00P PM" },
    { id: 6, day: "Saturday", time: "9:00 AM to 11:00P PM" },
  ];
  return (
    <div className="text-black bg-indigo-100 shadow-xl">
      <footer className="max-w-[1540px] mx-auto py-8 px-4">
        <div className="flex flex-wrap gap-6">
          <div className="flex-1">
            <h1 className="text-xl font-bold text-black cursor-pointer">
              Hospital Managements System
            </h1>
            <p className="text-lg text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              a cumque velit assumenda voluptatem, doloribus dolor tempora
              soluta commodi facere officiis quaerat quo culpa mollitia!
            </p>
          </div>
          <div className="flex-1">
            <h4 className="mb-4 text-xl font-bold cursor-pointer">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to={"/"} className="text-gray-700 hover:text-black">
                  Home
                </Link>
              </li>
              <li>
                {" "}
                <Link to={"/about"} className="text-gray-700 hover:text-black">
                  About
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  to={"/services"}
                  className="text-gray-700 hover:text-black"
                >
                  Services
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  to={"/contact"}
                  className="text-gray-700 hover:text-black"
                >
                  Contact
                </Link>
              </li>
              <li>
                {" "}
                <Link
                  to={"/privacyAndPolicy"}
                  className="text-gray-700 hover:text-black"
                >
                  Privacy And Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <h4 className="mb-4 text-xl font-bold cursor-pointer">Hours</h4>
            <ul className="space-y-2">
              {hours.map((element) => (
                <li
                  key={element.id}
                  className="flex justify-between text-gray-700"
                >
                  <span>{element.day}</span>
                  <span>{element.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1">
            <h4 className="mb-4 text-xl font-bold cursor-pointer">Contact</h4>
            <div className="flex items-center gap-2 mb-2">
              <FaPhone className="text-gray-700" />
              <span className="text-gray-700">+32485949531</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <MdEmail className="text-gray-700" />
              <span className="text-gray-700">chercher1909@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <FaLocationArrow className="text-gray-700" />
              <span className="text-gray-700">Suisse</span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 cursor-pointer">
            <FaFacebookSquare />
            <FaYoutube />
            <FaSquareInstagram />
            <FaGithub />
          </div>
        </div>
      </footer>
      <p className="py-4 text-center cursor-pointer text-md">
        &copy;CopyRight
      </p>
    </div>
  );
};

export default Footer;