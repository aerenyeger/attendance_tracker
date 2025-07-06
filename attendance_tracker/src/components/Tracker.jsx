import React from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
const Tracker = () => {
  const location=useLocation();
  const[details,setdetails]=useState([])
  const[subject,setsubject]=useState([])
  const[fetched,setfetched]=useState(false)
  const[new_subj,setnew_subj]=useState("")
  const{username,password,_id}=location.state || {}
  async function fetch_attendance(){
    const attendance=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/attendance_info`,{
      username:username,
      password:password
    })
    console.log(username)
  console.log(password)
  console.log(_id)
    if(attendance.status===200){
      setdetails(attendance.data);
      setsubject(attendance.data.subjects)
      setfetched(true)
    }
  }
  async function add_subject(e){
    e.preventDefault(); 
    const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/add_subject`,{
      _id:_id,
      subject:new_subj
    })
    if(res.status===200){
      console.log("subject added successfully")
    }
    else{
      console.log("error while fetching the code")
    }
    setnew_subj("")
  }
  async function add_present(subject){
    const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/add_present`,{
      _id:_id,
      subject:subject
    })
    if(res.status===200){
      console.log("present added successfully")
    }
    else{
      console.log("error while adding present")
    }
  }
  
  async function add_absent(subject){
  const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/add_absent`,{
    _id:_id,
    subject:subject
  })
  if(res.status===200){
    console.log("absent addedd successfully")
  }
  else{
    console.log("error while adding absent")
  }
}

async function delete_subject(subject){
const res=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/delete_subject`,{
  _id:_id,
  subject:subject
})
if(res.status===200){
  console.log("subject deleted successfully")
}
else{
  console.log("error while deleting the data")
}
}
  return (
    <div>
      <button style={{border:"1px solid white"}} onClick={()=>{fetch_attendance()}}>fetch attendance</button>

      <form onSubmit={(e)=>{add_subject(e)}}>
        <textarea value={new_subj} onChange={(e)=>{
          setnew_subj(e.target.value)
        }}></textarea>

        <button style={{border:"1px solid white"}} type={'submit'}>add subj</button>
      </form>
      {fetched && (subject.map((subj,ind)=>(
        <div key={ind} style={{border:"1px solid white",marginBottom:"5px"}}>
          <h4>{subj.subject}</h4>
          <h4>present:  {subj.present}</h4>
          <h4>classes:   {subj.totalClasses}</h4>
          <button style={{border:"1px solid white"}} onClick={()=>{add_present(subj.subject)}}>add present</button>
          <button style={{border:"1px solid white"}} onClick={()=>{add_absent(subj.subject)}}>add absent</button>
          <button style={{border:"1px solid white"}} onClick={()=>{delete_subject(subj.subject)}}>delete</button>
        </div>
      )))}
    </div>
  )
}

export default Tracker
