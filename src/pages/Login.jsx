import React, { useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"


function Login() {

  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")

  const navigate=useNavigate()

  const handlesubmit =async(e)=>{
    e.preventDefault();
    const response= await axios.post("http://localhost:6001/admin/login",{email,password})
      if(response.data.success==true){
        navigate("/createuser")
      }else{
        alert("invalid credential")
      }
   
  }
    return (
        <>
  
          <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="w-full max-w-sm p-8 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
            <form onSubmit={handlesubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  onChange={(e)=>setemail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  onChange={(e)=>setpassword(e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
    
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
              >
                login In
              </button>
            </form>
          </div>
        </div>
        </>
      )
}

export default Login
