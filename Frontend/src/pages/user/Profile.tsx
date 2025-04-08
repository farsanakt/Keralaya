import React, { useEffect, useState } from "react";
import UserHeader from "../../components/user/UserHeader";
import {  useSelector } from "react-redux";
import {  RootState } from "../../redux/store";
import { changePassword, profileRequest, updateProfie } from "../../service/user/userApi";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UserSidebar from "@/components/user/UserSidebar";

type User = {
  _id: string;
  username: string;
  email: string;
};

type PasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const Profile: React.FC = () => {
  

  const [userData, setUserData] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [editData, setEditData] = useState<User | null>(null);
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { currentUser } = useSelector((state: RootState) => state.user);

  const fetchUserProfile = async () => {
    if (currentUser?.message?.data?.email) {
      try {
        const response = await profileRequest(currentUser.message.data.email);
        setUserData(response.data);
        setEditData(response.data);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    } else {
      console.warn("Email not found in currentUser");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handlePasswordClick = () => {
    setIsPasswordModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handlePasswordModalClose = () => {
    setIsPasswordModalOpen(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editData) {
      setEditData({
        ...editData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editData) {
      console.error("Edit data is empty.");
      return;
    }
  
    const { username, email, _id } = editData;

    try {
      const response = await updateProfie({ username, email, id: _id });

      if (response.data.message) {
        toast.success(response.data.message);
        setUserData(editData);
        setIsModalOpen(false);
      }
      
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error updating profile");
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!userData?._id) {
      console.error("User ID is missing.");
      return;
    }
  
    const { currentPassword, newPassword, confirmPassword } = passwordData;
  
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All password fields are required");
      return;
    }
  
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
  
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
  
    try {
      const response = await changePassword({
        userId: userData._id,
        currentPassword,
        newPassword,
      });
  
      const result = response?.message;
  
      console.log(result, 'res');
  
     
      if (result) {
        if (result.success) {
          toast.success(result.message || "Password changed successfully");
          handlePasswordModalClose();
        } else {
          toast.error(result.message || "Failed to change password");
        }
      } else {
        toast.error("Unexpected response from server");
      }
  
    } catch (error: any) {
      console.log(error, 'po');
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <header className="w-full bg-[#f8fafc] shadow-md">
        <UserHeader />
      </header>
      <div className="flex flex-grow">
        <UserSidebar />
        <main className="flex-grow flex items-center justify-center mt-6">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
            <div className="flex flex-col items-center mb-6">
              <img
                src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                alt="User Avatar"
                className="w-24 h-24 rounded-full shadow-lg mb-4"
              />
              <h2 className="text-2xl font-bold text-[#1a202c]">
                {userData?.username || "Loading..."}
              </h2>
              <p className="text-sm text-[#4a5568]">{userData?.email || ""}</p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-[#1a202c] mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={editData?.username || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00563f]"
                disabled
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#1a202c] mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={editData?.email || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00563f]"
                disabled
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-3">
              <button
                onClick={handleEditClick}
                className="w-full sm:w-auto py-2 px-4 bg-[#00563f] text-white font-medium rounded-md hover:bg-[#00482f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00563f]"
              >
                Edit Profile
              </button>
              <button
                onClick={handlePasswordClick}
                className="w-full sm:w-auto py-2 px-4 bg-[#0077b6] text-white font-medium rounded-md hover:bg-[#006299] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0077b6]"
              >
                Change Password
              </button>
              <button className="w-full sm:w-auto py-2 px-4 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Logout
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-[#1a202c] mb-1"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={editData?.username || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00563f]"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#1a202c] mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editData?.email || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00563f]"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="py-2 px-4 bg-gray-300 text-gray-800 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-[#00563f] text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-[#1a202c] mb-1"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00563f]"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-[#1a202c] mb-1"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00563f]"
                  required
                  minLength={6}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-[#1a202c] mb-1"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00563f]"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handlePasswordModalClose}
                  className="py-2 px-4 bg-gray-300 text-gray-800 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-[#0077b6] text-white rounded-md"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;