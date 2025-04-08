import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { FaUserCircle } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { ChatDetails, userlogout } from "../../service/user/userApi";
import { logout } from "../../redux/slices/userSlice";
import { io } from "socket.io-client";
import ChatModal from "./chat/chatModal";

const socket = io("http://localhost:4000", {
  transports: ["websocket"],
  withCredentials: true,
});

const UserHeader: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();


  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [notifDropdown, setNotifDropdown] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [bookingId, setBookingId] = useState<string>("");

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = async () => {
    try {
      const response = await userlogout();
      dispatch(logout());
      localStorage.removeItem("accessToken");
      setDropdownOpen(false);
      console.log(response);
    } catch (error) {}
  };

  useEffect(() => {
    if (!currentUser) return;

    const userEmail = currentUser.message.data.email;

    socket.on("notification", (data) => {
      if (data.receiverId === userEmail) {
        setHasNotification(true);
        setNotifications((prev) => [...prev, data]);
      }
    });

    return () => {
      socket.off("notification");
    };
  }, [currentUser]);

  const clearNotification = () => {
    setHasNotification(false);
    setNotifDropdown(!notifDropdown);
  };

  const handleCloseChat = () => {
    setShowChatModal(false);
  };


  const handleNotificationClick = async (chatRoomId: string) => {
    console.log(chatRoomId, "ayee");
    const response = await ChatDetails(chatRoomId);

    if (response) {
      setBookingId(response.data);
      setShowChatModal(true);

      
      setNotifications((prev) =>
        prev.filter((note) => note.chatRoomId !== chatRoomId)
      );

      
      if (notifications.length <= 1) {
        setHasNotification(false);
      }
    }

    setNotifDropdown(false);
  };

  const handleClearAll = () => {
    setNotifications([]);
    setHasNotification(false);
    setNotifDropdown(false);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="text-2xl font-bold text-black">Keralaya</div>
        <nav className="space-x-6 flex items-center">
          <a href="/" className="text-gray-700 hover:text-black">
            Home
          </a>
          <a href="/aboutUs" className="text-gray-700 hover:text-black">
            About
          </a>
          <a href="/contactus" className="text-gray-700 hover:text-black">
            Contact
          </a>

          {currentUser && (
            <div className="relative">
              <button
                onClick={clearNotification}
                className="relative text-gray-700 hover:text-black"
              >
                <IoMdNotificationsOutline className="w-6 h-6" />
                {hasNotification && (
                  <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
                )}
              </button>

              {notifDropdown && (
                <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-auto bg-white shadow-md border rounded-md z-50">
                  <div className="flex justify-between items-center px-4 py-2 border-b bg-gray-100">
                    <span className="text-sm font-semibold text-gray-700">Notifications</span>
                    <button
                      onClick={handleClearAll}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Clear All
                    </button>
                  </div>

                  {notifications.length > 0 ? (
                    notifications.map((note, index) => (
                      <button
                        key={index}
                        onClick={() => handleNotificationClick(note.chatRoomId)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-100 border-b"
                      >
                        <p className="text-sm font-semibold">
                          {note.receiverId?.split("@")[0] || "Someone"}
                        </p>
                        <p className="text-xs text-gray-600 truncate">
                          {note.message}
                        </p>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-center text-gray-500 text-sm">
                      No new notifications
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {showChatModal && (
            <ChatModal
              bookingId={bookingId}
              onClose={handleCloseChat}
              role="user"
            />
          )}

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
