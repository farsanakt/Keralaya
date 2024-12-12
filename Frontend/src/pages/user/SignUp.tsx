import React, { useState } from "react";
import { resendOtp, singUpRequest,verifyOtp } from "../../service/user/userApi";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<any>({});
  const [otpData, setOtpData] = useState<string>("");
  const [formError, setFormError] = useState<string | null>(null);
  const [showOtpModal, setShowOtpModal] = useState<boolean>(false);
  const [resendDisabled, setResendDisabled] = useState<boolean>(true);
  const [timer, setTimer] = useState<number>(60);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setFormData({ ...formData, [e.target.id]: e.target.value });

    if (formError && (e.target.id === "password" || e.target.id === "confirmPassword")) {

      setFormError(null);
    }
  };

  const closeOtpModal = () => {
    setShowOtpModal(false);
  };

  const handleOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtpData(e.target.value);
  };

  const startResendTimer = () => {
    setResendDisabled(true);
    setTimer(60);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setResendDisabled(false);
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendOtp = async () => {

    try {
      
      const email=formData.email
      console.log(email)

      const response = await resendOtp(email)

      if (response.data.success) {

        toast.success(response.data.message.message);
        startResendTimer();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to resend OTP.");
    }
  };

  const handleOtpSubmit = async () => {
    console.log('handle')
    try {
      const email = formData.email;
      const response = await verifyOtp(otpData, email);

      if (response.data.message.message) {
        toast.success(response.data.message.message);
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid OTP.");
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

      if (response.data.success) {
        
        setShowOtpModal(true);
        startResendTimer();
      }
    } catch (error: any) {

      toast.error(error.response?.data?.message || "An unexpected error occurred");

      setShowOtpModal(true)

    }
  };


  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <header className="w-full bg-[#f8fafc] shadow-md">
        {/* <UserHeader /> */}
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
      
      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold text-center mb-4">Enter OTP</h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Please enter the OTP sent to your registered email.
            </p>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00563f]"
                value={otpData}
                onChange={handleOtp}
              />
              <div className="flex justify-between items-center mt-4">
                <button
                  type="button"
                  onClick={closeOtpModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleOtpSubmit}
                  className="px-4 py-2 bg-[#00563f] text-white rounded-md hover:bg-[#00482f]"
                >
                  Verify
                </button>
              </div>
              <div className="mt-4 text-center">
                {resendDisabled ? (
                  <p className="text-sm text-gray-500">
                    Resend OTP in {timer} seconds
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-sm text-[#00563f] hover:underline"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    
    
    </div>
  );
};

export default Signup;
