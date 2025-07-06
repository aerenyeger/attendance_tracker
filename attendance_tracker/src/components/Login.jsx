import React from 'react'
import { useState } from 'react'
import  axios  from 'axios'
import { useNavigate } from 'react-router-dom'
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
        // set_id(res.data._id) and then immediately use _id in navigate, 
        // but setState in React is asynchronous, so _id may still be empty at that point.
      }
    }
    else{
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
      }
    }
  }
  return (
    <div>
      <button onClick={()=>{setlogin(true)}}>login</button>
      <button onClick={()=>{setlogin(false)}}>signup</button>
      <form onSubmit={(e)=>{handleSubmit(e)}}>
        <p>username</p>
        <textarea value={username} onChange={(e)=>{
          setusername(e.target.value)
        }}></textarea>
        <p>password</p>
        <input type="password" value={password} onChange={(e)=>{
          setpassword(e.target.value)
        }}></input>
        <button type={'submit'}>submit</button>
      </form>
    </div>
  )
}

export default Login