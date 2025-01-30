import { useState } from "react";
import { Link } from "react-router-dom";
import { SIGN_IN, GET_AUTHUSER } from "../graphql/index.jsx";
import { useMutation } from "@apollo/client";
import { toast } from 'react-toastify';

export default function SigninPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [Signin] = useMutation(SIGN_IN, {
    refetchQueries: [GET_AUTHUSER],
  });

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Signin({
        variables: {
          input: formData,
        },
      });
      toast.success("Sign In successfully!")
    } catch (error) {
      toast.error("Error while signing in!")
      console.error("Error signing in:", error);
    }
  };
  return (
    <main className="min-w-screen min-h-screen bg-gray-950 flex flex-col items-center pt-20">
      <form className="w-80 md:w-96 bg-gray-900 rounded-md drop-shadow-xl flex flex-col px-4 py-3 gap-3 justify-center items-center">
        <h3 className="text-2xl text-white font-bold">Sign In</h3>
        <div className="flex w-full flex-col">
          <label htmlFor="email" className="leading-7 text-base text-gray-400">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            name="email"
            onChange={handleFormChange}
            className="w-full bg-gray-800 rounded border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-900 text-base outline-none text-gray-100 py-1 px-3  transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="flex flex-col w-full">
          <label
            htmlFor="password"
            className="leading-7 text-base text-gray-400"
          >
            Password
          </label>
          <input
            type="password"
            value={formData.password}
            name="password"
            onChange={handleFormChange}
            className="w-full bg-gray-800 rounded border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-900 text-base outline-none text-gray-100 py-1 px-3  transition-colors duration-200 ease-in-out"
          />
        </div>

        <button
          className="text-white bg-pink-500 border-0 py-1 px-6 focus:outline-none hover:bg-pink-600 rounded text-lg w-full mt-3"
          type="submit"
          onClick={handleSubmit}
        >
          Signin
        </button>
        <p className="text-white self-end">
          Don&apos;t have account?{" "}
          <Link to="/signup" className="border-b border-pink-500 text-pink-500">
            Signup
          </Link>
        </p>
      </form>
    </main>
  );
}
