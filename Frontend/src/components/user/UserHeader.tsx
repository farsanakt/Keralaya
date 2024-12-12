import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";

const UserHeader: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="text-2xl font-bold text-green-800">Keralaya</div>
        <nav className="space-x-6">
          <a href="/" className="text-gray-700 hover:text-green-800">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-green-800">
            Category
          </a>
          <a href="#" className="text-gray-700 hover:text-green-800">
            About
          </a>
          <a href="#" className="text-gray-700 hover:text-green-800">
            Contact
          </a>
          {currentUser ? (
            <Link
              to={"/login"}
              className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
            >
              Logout
            </Link>
          ) : (
            <Link
              to={"/login"}
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
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
