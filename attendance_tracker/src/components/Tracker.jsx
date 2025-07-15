import React from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast'
const Tracker = () => {
  const location = useLocation();
  const [details, setdetails] = useState([])
  const [subject, setsubject] = useState([])
  const [fetched, setfetched] = useState(false)
  const [new_subj, setnew_subj] = useState("")
  const { username, password, _id } = location.state || {}
  async function fetch_attendance() {
    try {
      const attendance = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/attendance_info`, {
      username: username,
      password: password
    })
    console.log(username)
    console.log(password)
    console.log(_id)
    if (attendance.status === 200) {
      setdetails(attendance.data);
      setsubject(attendance.data.subjects)
      setfetched(true)
    }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  async function add_subject(e) {
    try {
      e.preventDefault();
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/add_subject`, {
      _id: _id,
      subject: new_subj
    })
    if (res.status === 200) {
      console.log("subject added successfully")
      toast.success("subject added successfully")
    }
    else {
      console.log("error while fetching the code")
    }
    setnew_subj("")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  async function add_present(subject) {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/add_present`, {
      _id: _id,
      subject: subject
    })
    if (res.status === 200) {
      console.log("present added successfully")
      toast.success("click on fetch to see updated attendance")
    }
    else {
      console.log("error while adding present")
    }
  }

  async function add_absent(subject) {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/add_absent`, {
      _id: _id,
      subject: subject
    })
    if (res.status === 200) {
      console.log("absent addedd successfully")
      toast.success("click on fetch to see updated attendance")
    }
    else {
      console.log("error while adding absent")
    }
  }

  async function delete_subject(subject) {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/delete_subject`, {
      _id: _id,
      subject: subject
    })
    if (res.status === 200) {
      console.log("subject deleted successfully")
      toast.success("click on fetch to see updated attendance")
    }
    else {
      console.log("error while deleting the data")
    }
  }
  return (
    <div className="h-screen w-full bg-gradient-to-tr from-black via-gray-800 to-gray-900  ">
      <div className='text-2xl '>
        <button className=' bg-blue-500 rounded-md p-1 ml-155 mt-2' onClick={() => { fetch_attendance() }}>Fetch Attendance</button>
      </div>


      <form onSubmit={(e) => { add_subject(e) }}>
        <input className="bg-white ml-148 rounded-md" value={new_subj} type="text" onChange={(e) => {
          setnew_subj(e.target.value)
        }}></input>

        <button className='bg-blue-500 rounded-md p-1 ml-4 mt-2' type={'submit'}>add subj</button>
      </form>
      {fetched && <div className='max-h-160 overflow-y-auto'>
        {(subject.map((subj, ind) => (
        <div key={ind} className='bg-white w-3/12 opacity-85 m-3 p-2 rounded-md ml-140 mt-2'>
          <h4>Subject:{subj.subject}</h4>
          <h4>present:  {subj.present}</h4>
          <h4>classes:   {subj.totalClasses}</h4>
          <h5>
            Attendance:{" "}
            {subj.totalClasses > 0
              ? ((subj.present / subj.totalClasses) * 100).toFixed(2) + "%"
              : "N/A"}
          </h5>
          <button className='bg-blue-500 rounded-md p-1 ml-4 mt-2' style={{ border: "1px solid white" }} onClick={() => { add_present(subj.subject) }}>add present</button>
          <button className='bg-blue-500 rounded-md p-1 ml-4 mt-2' style={{ border: "1px solid white" }} onClick={() => { add_absent(subj.subject) }}>add absent</button>
          <button className='bg-blue-500 rounded-md p-1 ml-4 mt-2' style={{ border: "1px solid white" }} onClick={() => { delete_subject(subj.subject) }}>delete</button>
        </div>
      )))}</div>}
    </div>
  )
}

export default Tracker
