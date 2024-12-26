import React, { useState } from "react";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { guideLogin } from "../../service/guide/guideApi";
import { loginStart,loginFailed,loginSuccess } from "../../redux/slices/guideSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from '../../redux/store';
const GuideLogin: React.FC = () => {
  
  const { loading, error } = useSelector((state: RootState) => state.user)
 
     const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;

    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    dispatch(loginStart())
  
    try {
      const response = await guideLogin(loginData);

      console.log(response,'this is')

      const message = response.data.message?.message;
  
      if (response.data.message.success) {


        localStorage.setItem('accessToken',response.data.accessToken)

        toast.success(message);

        dispatch(loginSuccess(response.data))

        navigate("/guide/dashboard");

      }

    } catch (error: any) {

      
      const errorMessage = error.response?.data?.message || "Login failed!";

      toast.error(errorMessage);

      dispatch(loginFailed(errorMessage))

    }
    
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-6">Guide Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={loginData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={loginData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
  <button
    type="submit"
    className={`bg-green-600 text-white px-6 py-3 rounded-md shadow ${
      loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700 transition duration-300"
    }`}
    disabled={loading}
  >
    {loading ? "Logging in..." : "Login"}
  </button>
</div>



        </form>
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/guide/registration")}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default GuideLogin;
