import React,{useState} from "react";
import {Link} from "react-router-dom"

export default function SigninPage() {
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })
  const handleFormChange=(e)=>{
    setFormData((prev)=>({...prev,[e.target.name]:e.target.value,}))
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
  }
    return (
        <main className="min-w-screen min-h-screen bg-gray-950 flex flex-col items-center pt-20">
            <form className="w-80 md:w-96 bg-gray-900 rounded-md drop-shadow-xl flex flex-col px-4 py-3 gap-3 justify-center items-center">
            <h3 className="text-2xl text-white font-bold">Sign In</h3>
            <div className="flex w-full flex-col" >
            <label htmlFor="email" className="leading-7 text-base text-gray-400">Email</label>
                <input
                    type="email"
                    value={formData.email}
                    name="email"
                    onChange={handleFormChange}
                    className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3  transition-colors duration-200 ease-in-out"
                />
                </div>
                <div className="flex flex-col w-full">
                <label htmlFor="password" className="leading-7 text-base text-gray-400">Password</label>
                <input
                    type="password"
                     value={formData.password}
                    name="password"
                    onChange={handleFormChange}
                    className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3  transition-colors duration-200 ease-in-out"
                />
                </div>
          
                <button className="text-white bg-indigo-500 border-0 py-1 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg w-full mt-3" type="submit" onClick={handleSubmit}>
                    Signin
                </button>
                <p className="text-white self-end">Don't have account? <Link to="/signup" className="border-b border-indigo-500 text-indigo-500">Signup</Link></p>
            </form>
        </main>
    );
}
