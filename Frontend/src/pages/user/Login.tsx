import React, { useState } from 'react';
// import UserHeader from '../../components/user/UserHeader';
import { forgetPass, loginRequest } from '../../service/user/userApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../../redux/slices/userSlice';
import { RootState, AppDispatch } from '../../redux/store';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showOtpModal,setShowOtpModal]=useState(false)
    const [resetEmail, setResetEmail] = useState('');

    const { loading, error } = useSelector((state: RootState) => state.user)
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginStart());

        try {
            const response = await loginRequest(email, password);
            toast.success(response.data.message.message);

            dispatch(loginSuccess(response.data));
            navigate('/');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Something went wrong!';
            toast.error(errorMessage);
            dispatch(loginFailure(errorMessage));
        }
    };

    const handleForgotPassword = async (e: React.FormEvent) => {

        e.preventDefault();

        const response=await forgetPass(resetEmail)

        console.log(response,'kkkk')

        if(response.data){

            console.log(response.data,'jjjjjjjjjjjjjjjj')

            toast.success(response.data.response.message)

            setIsModalOpen(false);

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
                        Welcome Back!
                    </h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#1a202c] mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00563f]"
                                required
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-2 px-4 ${loading ? 'bg-gray-400' : 'bg-[#00563f]'} 
                                text-white font-medium rounded-md hover:bg-[#00482f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00563f]`}
                            >
                                {loading ? 'Logging in...' : 'Log In'}
                            </button>
                        </div>
                    </form>
                    <p className="text-sm text-center text-[#4a5568] mt-4">
                        <button
                            className="text-[#00563f] hover:underline"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Forgot Password?
                        </button>
                    </p>
                    <p className="text-sm text-center text-[#4a5568] mt-4">
                        Don’t have an account?{' '}
                        <a href="/signup" className="text-[#00563f] hover:underline">
                            Sign Up
                        </a>
                    </p>
                </div>
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-lg font-bold mb-4">Reset Password</h3>
                        <form onSubmit={handleForgotPassword}>
                            <label htmlFor="resetEmail" className="block text-sm font-medium text-[#1a202c] mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="resetEmail"
                                name="resetEmail"
                                onChange={(e) => setResetEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00563f]"
                                required
                            />
                            <div className="mt-4 flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#00563f] text-white rounded-md hover:bg-[#00482f]"
                                >
                                    Send Otp
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


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
                // value={otpData}
                // onChange={handleOtp}
              />
              <div className="flex justify-between items-center mt-4">
                <button
                  type="button"
                //   onClick={closeOtpModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                //   onClick={handleOtpSubmit}
                  className="px-4 py-2 bg-[#00563f] text-white rounded-md hover:bg-[#00482f]"
                >
                  Verify
                </button>
              </div>
              
            </form>
          </div>
        </div>
      )}


        </div>
    );
};

export default Login;
