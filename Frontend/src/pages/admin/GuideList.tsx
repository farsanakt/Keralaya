import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';
import { guidelist,updateGuideStatus } from '../../service/admin/adminApi';

type Guide = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  expertise: string;
  languages: string[];
  isBlocked: boolean;
};

const GuideList: React.FC = () => {
  const [guideList, setGuideList] = useState<Guide[]>([]);


  const fetchGuides = async () => {

    try {

      const response = await guidelist()

      console.log(response.data)

      setGuideList(response.data)

    } catch (error) {

      console.error('Error fetching guides:', error)

    }
  };

  
  const toggleStatus = async (guideId: string, isBlocked: boolean) => {
    try {

      console.log(guideId,'guideid')

    const response=await updateGuideStatus(guideId)

    console.log(response)
     
      setGuideList((prevGuides) =>

        prevGuides.map((guide) =>

          guide._id === guideId ? { ...guide, isBlocked: !isBlocked } : guide

        )
      );
    } catch (error) {
      console.error('Error updating guide status:', error);
    }
  };

  useEffect(() => {

    fetchGuides()

  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-[#f8fafc] min-h-screen">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#1a202c]">Guide List</h2>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-[#1a202c] text-white">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Phone</th>
                <th className="py-3 px-6 text-left">Experience</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {guideList.map((guide) => (
                <tr key={guide._id} className="border-b">
                  <td className="py-4 px-6 text-[#2d3748]">{guide.name}</td>
                  <td className="py-4 px-6 text-[#2d3748]">{guide.email}</td>
                  <td className="py-4 px-6 text-[#2d3748]">{guide.phone}</td>
                  <td className="py-4 px-6 text-[#2d3748]">{guide.experience} years</td>
                  <td className="py-4 px-6 text-[#2d3748]">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-white ${
                        guide.isBlocked ? 'bg-red-500' : 'bg-green-500'
                      }`}
                    >
                      {guide.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => toggleStatus(guide._id, guide.isBlocked)}
                      className={`px-4 py-2 rounded-md font-medium text-white ${
                        guide.isBlocked
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-red-600 hover:bg-red-700'
                      }`}
                    >
                      {guide.isBlocked ? 'Unblock' : 'Block'}
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

export default GuideList;
