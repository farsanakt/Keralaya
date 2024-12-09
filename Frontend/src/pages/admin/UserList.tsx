import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import { userlist,updateUserStatus } from '../../service/admin/adminApi';

type User = {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  isBlocked: boolean;
};

const UserList: React.FC = () => {

  const [userList, setUserList] = useState<User[]>([]);

  const toggleStatus = async (userId: string, isBlocked: boolean) => {

    console.log('llllooopp[',userId)

    try {

      const response=await updateUserStatus(userId)

      console.log(response)

      setUserList((prevUsers) =>

        prevUsers.map((user) =>

          user._id === userId ? { ...user, isBlocked: !isBlocked } : user

        )
      )

    } catch (error) {

      console.error('Error updating user status:', error)

    }
  };

  const requestApi = async () => {

    try {

      const response = await userlist()

      setUserList(response.data)

    } catch (error) {

      console.error('Error fetching user data:', error)

    }
    
  };

  useEffect(() => {
    requestApi();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-[#f8fafc] min-h-screen">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#1a202c]">User List</h2>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-[#1a202c] text-white">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="py-4 px-6 text-[#2d3748]">{user.username}</td>
                  <td className="py-4 px-6 text-[#2d3748]">{user.email}</td>
                  <td className="py-4 px-6 text-[#2d3748]">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-white ${
                        user.isBlocked ? 'bg-red-500' : 'bg-green-500'
                      }`}
                    >
                      {user.isBlocked ? 'Non-Active' : 'Active'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => toggleStatus(user._id, user.isBlocked)}
                      className={`px-4 py-2 rounded-md font-medium text-white ${
                        user.isBlocked
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-red-600 hover:bg-red-700'
                      }`}
                    >
                      {user.isBlocked ? 'Unblock' : 'Block'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
