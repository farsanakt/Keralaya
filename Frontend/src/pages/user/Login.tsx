import React, { useState } from 'react';
import UserHeader from '../../components/user/UserHeader';
import { loginRequest } from '../../service/user/userApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {

  const [email,setEmail]=useState('')

  const [password,setPassword]=useState('')

  const navigate=useNavigate()

  const handleSubmit=async(e:React.FormEvent)=>{

    e.preventDefault()

    console.log(email, password, 'Submitted email and password');

    try {

      console.log('rrrrrrr')

      const response=await loginRequest(email,password)

      console.log(response,'rrrrrrrr')

      toast.success(response.data.message.message)

     navigate('/')
      
    } catch (error:any) {
      
      toast.error(error.response.data.message)

    }


  }
  

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <header className="w-full bg-[#f8fafc] shadow-md">
        <UserHeader />
      </header>

      <main className="flex-grow flex items-center justify-center bg-[#f8fafc] mt-6">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center text-[#1a202c] mb-6">
            Welcome Back!
          </h2>
          <form className="space-y-4"  onSubmit={handleSubmit}>
          
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1a202c] mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00563f]"
                required
              />
            </div>

           
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#1a202c] mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00563f]"
                required
              />
            </div>

          
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#00563f] text-white font-medium rounded-md hover:bg-[#00482f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00563f]"
              >
                Log In
              </button>
            </div>
          </form>

          
          <p className="text-sm text-center text-[#4a5568] mt-4">
            Don’t have an account?{' '}
            <a href="/signup" className="text-[#00563f] hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
