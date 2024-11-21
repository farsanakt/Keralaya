import React, { useState } from 'react';

interface UserProfile {
  fullName: string;
  phone: string;
  email: string;
  lastVisitedCity: string;
}

const ProfileForm: React.FC = () => {
  const [user, setUser] = useState<UserProfile>({
    fullName: 'Farsana',
    phone: '1234567890',
    email: 'farsana@example.com',
    lastVisitedCity: 'Calicut',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Phone No</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Last Visited City</label>
          <select
            name="lastVisitedCity"
            value={user.lastVisitedCity}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="Calicut">Calicut</option>
            <option value="Kochi">Kochi</option>
            <option value="Trivandrum">Trivandrum</option>
          </select>
        </div>
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
