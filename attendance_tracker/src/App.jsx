import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import Tracker from './components/Tracker'
import { BrowserRouter,Router,Routes,RouterProvider, createBrowserRouter } from 'react-router-dom'
import{Toaster} from "react-hot-toast"
function App() {
  const router=createBrowserRouter([{
    path:"/",
    element:
    <Login/>
  },{
    path:"/Tracker",
    element:
    <Tracker/>
  }])
  return (
    <>
    <Toaster position='top-center'></Toaster>
    <RouterProvider router={router}>
    </RouterProvider></>
  )
}

export default App
