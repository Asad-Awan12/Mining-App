import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './Components/Forms/Signup'
import Login from './Components/Forms/Login'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { NavBar } from './Components/NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import { Footer } from './Components/Footer/Footer'

function App() {
 
  return (
    <>
    <NavBar  />
    <Outlet />
    <Footer />
      {/* <Register /> */}
      {/* <Login /> */}
      {/* <ToastContainer /> */}

       
    </>
  )
}

export default App
