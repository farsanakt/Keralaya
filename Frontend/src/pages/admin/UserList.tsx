import React, { useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';



const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'blocked' },
  { id: 3, name: 'Tom Brown', email: 'tom@example.com', status: 'active' },
  { id: 4, name: 'Lucy Green', email: 'lucy@example.com', status: 'blocked' },
];

const UserList: React.FC = () => {
  const [userList, setUserList] = useState(users);

 
  const toggleStatus = (userId: number) => {
    const updatedUsers = userList.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' }
        : user
    );
    setUserList(updatedUsers);
  };

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
                <tr key={user.id} className="border-b">
                  <td className="py-4 px-6 text-[#2d3748]">{user.name}</td>
                  <td className="py-4 px-6 text-[#2d3748]">{user.email}</td>
                  <td className="py-4 px-6 text-[#2d3748]">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-white ${
                        user.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => toggleStatus(user.id)}
                      className={`px-4 py-2 rounded-md font-medium text-white ${
                        user.status === 'active' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                      }`}
                    >
                      {user.status === 'active' ? 'Block' : 'Unblock'}
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
