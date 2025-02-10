import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Clock, LayoutDashboard, Users, MapPin, ShieldAlert, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Sidebar: React.FC = () => {
  return (
    <div className="w-56 bg-[#1a202c] text-white h-screen flex flex-col p-6 mt-10 mb-10 ml-5 mr-5 rounded-lg shadow-md">
      <div>
        <h2 className="text-3xl font-bold text-center text-white mb-8">Admin Dashboard</h2>
        
        <ul className="space-y-4">
          <li>
            <div className="bg-[#2d3748] p-3 rounded-md hover:bg-[#4CAF50] transition duration-200 ease-in-out">
              <Link
                to="/admin/dashboard"
                className="text-white hover:text-white text-lg font-medium flex items-center gap-2"
              >
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </Link>
            </div>
          </li>
          <li>
            <div className="bg-[#2d3748] p-3 rounded-md hover:bg-[#4CAF50] transition duration-200 ease-in-out">
              <Link
                to="/admin/userlist"
                className="text-white hover:text-white text-lg font-medium flex items-center gap-2"
              >
                <Users className="w-5 h-5" />
                Users
              </Link>
            </div>
          </li>
          <li>
            <div className="bg-[#2d3748] p-3 rounded-md hover:bg-[#4CAF50] transition duration-200 ease-in-out">
              <Link
                to="/admin/guidelist"
                className="text-white hover:text-white text-lg font-medium flex items-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                Guides
              </Link>
            </div>
          </li>
          <li>
            <div className="bg-[#2d3748] p-3 rounded-md hover:bg-[#4CAF50] transition duration-200 ease-in-out">
              <Link
                to="/admin/blacklisted"
                className="text-white hover:text-white text-lg font-medium flex items-center gap-2"
              >
                <ShieldAlert className="w-5 h-5" />
                Blacklisted
              </Link>
            </div>
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="bg-[#2d3748] p-3 rounded-md hover:bg-[#4CAF50] transition duration-200 ease-in-out cursor-pointer">
                  <div className="text-white text-lg font-medium flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Places
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-[#2d3748] border-[#1a202c]">
                <DropdownMenuItem className="focus:bg-[#4CAF50]">
                  <Link 
                    to="/admin/places/approved" 
                    className="flex items-center gap-2 w-full text-white"
                  >
                    <Building2 className="w-4 h-4 text-green-500" />
                    <span>Approved Places</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-[#4CAF50]">
                  <Link 
                    to="/admin/places/pending" 
                    className="flex items-center gap-2 w-full text-white"
                  >
                    <Clock className="w-4 h-4 text-yellow-500" />
                    <span>Pending Places</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </div>

      <div className="mt-auto">
        <div className="bg-[#2d3748] p-3 rounded-md hover:bg-[#4CAF50] transition duration-200 ease-in-out">
          <Link
            to="/admin"
            className="text-white hover:text-white text-lg font-medium flex items-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Logout 
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;