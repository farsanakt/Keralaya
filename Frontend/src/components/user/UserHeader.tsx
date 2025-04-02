import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { FaUserCircle } from "react-icons/fa"
import { userlogout } from "../../service/user/userApi";
import { logout } from "../../redux/slices/userSlice";

const UserHeader: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = async () => {
    try {
      const response = await userlogout();
      dispatch(logout());
      localStorage.removeItem('accessToken');
      setDropdownOpen(false);
      console.log(response);
    } catch (error) {
      
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="text-2xl font-bold text-black">Keralaya</div>
        <nav className="space-x-6 flex items-center">
          <a href="/" className="text-gray-700 hover:text-black">
            Home
          </a>
          {/* <a href="#" className="text-gray-700 hover:text-black">
            Category
          </a> */}
          <a href="/aboutUs" className="text-gray-700 hover:text-black">
            About
          </a>
          <a href="/contactus" className="text-gray-700 hover:text-black">
            Contact
          </a>
          {currentUser ? (
            <div className="relative">
              <button
                className="text-gray-700 hover:text-black focus:outline-none"
                onClick={toggleDropdown}
              >
                <FaUserCircle className="w-8 h-8" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <Link
                    to={"/profile"}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to={"/login"}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link
              to={"/login"}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default UserHeader;