import React, { useEffect, useState } from "react";
import UserHeader from "../../components/user/UserHeader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { profileRequest, updateProfie } from "../../service/user/userApi";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import UserSidebar from "@/components/user/UserSidebar";

type User = {
  _id: string;
  username: string;
  email: string;
};

const Profile: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const [userData, setUserData] = useState<User | null>(null)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [editData, setEditData] = useState<User | null>(null)

  const { currentUser } = useSelector((state: RootState) => state.user);

  console.log(currentUser,'userop')



  const fetchUserProfile = async () => {

    if (currentUser?.message?.data?.email) {

      try {

        const response = await profileRequest(currentUser.message.data.email)

        setUserData(response.data)

        setEditData(response.data)

        console.log(response.data, "Fetched User Data")

      } catch (error) {

        console.error("Failed to fetch user profile", error)

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

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (editData) {
      setEditData({
        ...editData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleFormSubmit = async(e: React.FormEvent) => {

    e.preventDefault()

    if (!editData) {

      console.error("Edit data is empty.")

      return;
    }
  
    const { username, email ,_id} = editData;

    console.log(username,email,_id)

    try {

     const response=await updateProfie({username,email,id:_id})

     if(response.data.message){

      toast.success(response.data.message)

      setUserData(editData)

      setIsModalOpen(false)

     }
      
    } catch (error:any) {

      toast.error(error.response.data.message)
      
    }
    
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <header className="w-full bg-[#f8fafc] shadow-md">
        <UserHeader />
      </header>
      <div className="flex flex-grow">
      <UserSidebar/>
        <main className="flex-grow flex items-center justify-center mt-6">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
            <div className="flex flex-col items-center mb-6">
              <img
                src="https://via.placeholder.com/100"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00563f]" disabled
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00563f]" disabled
                />
              </div>
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handleEditClick}
                className="py-2 px-4 bg-[#00563f] text-white font-medium rounded-md hover:bg-[#00482f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00563f]"
              >
                Edit Profile
              </button>
              <button className="py-2 px-4 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Logout
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
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
    </div>
  );
};

export default Profile;
