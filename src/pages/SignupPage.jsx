import React,{useState} from "react";
import {Link} from "react-router-dom"
import {SIGN_UP,GET_AUTHUSER} from "../graphql/index.jsx"
import { useMutation } from "@apollo/client";

export default function SignupPage() {
  const [formData,setFormData]=useState({
    name:"",
    email:"",
    password:"",
    gender:""
  })
  const [Signup] = useMutation(SIGN_UP, {
    refetchQueries: [GET_AUTHUSER],});

  const handleFormChange=(e)=>{
    setFormData((prev)=>({...prev,[e.target.name]:e.target.value,}))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Signup({
				variables: {
					input: formData,
				},
			});
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };
  
    return (
        <main className="min-w-screen min-h-screen bg-gray-950 flex flex-col items-center pt-20">
            <form className="w-80 md:w-96 bg-gray-900 rounded-md drop-shadow-xl flex flex-col px-4 py-3 gap-3 justify-center items-center">
            <h3 className="text-2xl text-white font-bold">Sign Up</h3>
            
            <div className="flex w-full flex-col" >
            <label htmlFor="name" className="leading-7 text-base text-gray-400">Full Name</label>
                <input
                    type="text"
                    value={formData.name}
                    name="name"
                    onChange={handleFormChange}
                    className="w-full bg-gray-800 rounded border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-900 text-base outline-none text-gray-100 py-1 px-3  transition-colors duration-200 ease-in-out"
                />
                </div>
            <div className="flex w-full flex-col" >
            <label htmlFor="email" className="leading-7 text-base text-gray-400">Email</label>
                <input
                    type="email"
                    value={formData.email}
                    name="email"
                    onChange={handleFormChange}
                    className="w-full bg-gray-800 rounded border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-900 text-base outline-none text-gray-100 py-1 px-3  transition-colors duration-200 ease-in-out"
                />
                </div>
                <div className="flex flex-col w-full">
                <label htmlFor="password" className="leading-7 text-base text-gray-400">Password</label>
                <input
                    type="password"
                     value={formData.password}
                    name="password"
                    onChange={handleFormChange}
                    className="w-full bg-gray-800 rounded border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-900 text-base outline-none text-gray-100 py-1 px-3  transition-colors duration-200 ease-in-out"
                />
                </div>
              <div className="flex w-full flex-col" >
            <label htmlFor="gender" className="leading-7 text-base text-gray-400">Gender</label>
                <div className="flex gap-2 px-2">
                <div className="flex gap-1">
                <label htmlFor="male" className="leading-5 text-base text-gray-300">Male:</label>
                             <input type="radio" name="gender" value="male" onChange={handleFormChange}/>
                </div>
                <div className="flex gap-1">
                <label htmlFor="female" className="leading-5 text-base text-gray-300">Female:</label>
                <input type="radio" name="gender" value="female" onChange={handleFormChange}/>
                </div>
                </div>
                </div>
                <button className="text-white bg-pink-500 border-0 py-1 px-6 focus:outline-none hover:bg-pink-600 rounded text-lg w-full mt-3" type="submit" onClick={handleSubmit}>
                    Signup
                </button>
                <p className="text-white self-end">Already have account? <Link to="/signin" className="border-b border-pink-500 text-pink-500">Signin</Link></p>
            </form>
        </main>
    );
}
