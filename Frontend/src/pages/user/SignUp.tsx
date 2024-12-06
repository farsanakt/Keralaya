import React, { useState } from "react";
import UserHeader from "../../components/user/UserHeader";
import { singUpRequest } from "../../service/user/userApi";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Signup: React.FC = () => {

  const [formData, setFormData] = useState<any>({});

  const [formError, setFormError] = useState<string | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

      setFormData({ ...formData, [e.target.id]: e.target.value });


     if (formError && (e.target.id === "password" || e.target.id === "confirmPassword")) {

      setFormError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

  
    if (formData.password !== formData.confirmPassword) {

      setFormError("Passwords do not match");
     
      return;

    }

    try {

      const response = await singUpRequest(formData);

      console.log(response.data, 'signup response data');

      if (response.data.success) {

        toast.success(response.data.message);

      }

    } catch (error: any) {

      console.log('error in the handlesubmit', error);

      toast.error(error.response?.data?.message || "An unexpected error occurred");
      
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <header className="w-full bg-[#f8fafc] shadow-md">
        <UserHeader />
      </header>

      <main className="flex-grow flex items-center justify-center bg-[#f8fafc] mt-6">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center text-[#1a202c] mb-6">
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-[#1a202c] mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="username"
                name="name"
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00563f]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#1a202c] mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00563f]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#1a202c] mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00563f]"
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-[#1a202c] mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleChange}
                placeholder="Re-enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00563f]"
                required
              />
              {formError && <p className="text-red-500 text-sm mt-2">{formError}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#00563f] text-white font-medium rounded-md hover:bg-[#00482f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00563f]"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="text-sm text-center text-[#4a5568] mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-[#00563f] hover:underline">
              Log In
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Signup;
