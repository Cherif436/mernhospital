import React, { useContext, useEffect } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { Context } from './main'
import axios from 'axios'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Appointment from './pages/Appointment'
import Services from './pages/Services'
import Contact from './pages/Contact'
import PageNotFound from './pages/PageNotFound'
import PrivacyandPolicy from './pages/PrivacyandPolicy'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'

const App = () => {
  const { setIsAuth, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3030/api/v1/user/single-patient", { withCredentials: true })
        setIsAuth(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuth(false);
        setUser({});
      }
    }
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacyAndPolicy" element={<PrivacyandPolicy />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <Footer />
      <ToastContainer position="top-center" />
    </div>
  )
}

export default App