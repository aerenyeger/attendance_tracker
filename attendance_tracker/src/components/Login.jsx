import React from 'react'
import { useState } from 'react'
import  axios  from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
const Login = () => {
  const[username,setusername]=useState("")
  const[password,setpassword]=useState("")
  const[_id,set_id]=useState("")
  const[login,setlogin]=useState(true)
  const navigate=useNavigate();
  async function handleSubmit(e){
    e.preventDefault();
    if(login){
      const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/check_login`,{
        username:username,
        password:password
      })
      if(res.status===200){
        set_id(res.data._id)
        navigate("/tracker",{state:{username:res.data.username,password:res.data.password,_id: res.data._id,}})
        toast.success("logged in successfully")
        // set_id(res.data._id) and then immediately use _id in navigate, 
        // but setState in React is asynchronous, so _id may still be empty at that point.
      }
    }
    else{
      try {
        const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/check_signup`,{
        username:username,
        password:password
      })
      if(res.status===200){
        console.log(res.data)
        navigate("/Tracker",{
          state:{
            username,
            password:res.data.password,
            _id: res.data._id,
          }
        })
        toast.success("sign up successfull")
      }
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  }
  return (
    <div className="h-screen w-full bg-gradient-to-tr from-black via-gray-800 to-gray-900  ">
      <div className='bg-white w-145 absolute top-50 left-120 opacity-80 rounded-md'>
      <h1 className='text-4xl font-bold ml-2 mt-4'>Welcome to Attendance Tracker</h1>
        <button className={`${login?`bg-blue-500`:``} rounded-md p-0.5 text-2xl mt-4 ml-35`} onClick={()=>{setlogin(true)}}>Login</button>
      <button className={`${login?``:`bg-blue-500`} rounded-md p-0.5 text-2xl mt-4 ml-35`}onClick={()=>{setlogin(false)}}>Signup</button>
      <form onSubmit={(e)=>{handleSubmit(e)}}>
        <p className='text-xl ml-4 mt-2'>Username</p>
        <input className="border border-black w-50 rounded-md mb-5 ml-4"  type="text" value={username} onChange={(e)=>{
          setusername(e.target.value)
        }}></input>
        <p className='text-xl ml-4 mt-2'>Password</p>
        <input className="border border-black w-50 rounded-md mb-5 ml-4" type="password" value={password} onChange={(e)=>{
          setpassword(e.target.value)
        }}></input>
        <br />
        <button className="bg-blue-500 rounded-md p-1 text-2xl mt-2 ml-3 mb-6" type={'submit'}>submit</button>
      </form>
      </div>
    </div>
  )
}

export default Login