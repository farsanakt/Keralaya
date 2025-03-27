const UserSidebar = () => {
    return (
      <aside className="w-64 bg-[#00563f] text-white flex flex-col shadow-lg mt-6 mb-6 ml-4 rounded-md">
        <div className="p-6 text-center font-bold text-lg">
          <p>User Dashboard</p>
        </div>
        <nav className="flex-grow space-y-4 p-4">
          <a href="/profile" className="block py-2 px-4 rounded-md hover:bg-[#00482f] transition">
            My Profile
          </a>
          <a href="/guides" className="block py-2 px-4 rounded-md hover:bg-[#00482f] transition">
            Guides
          </a>
          <a href="/booking" className="block py-2 px-4 rounded-md hover:bg-[#00482f] transition">
            Bookings
          </a>
          {/* <a href="/reports" className="block py-2 px-4 rounded-md hover:bg-[#00482f] transition">
            Reports
          </a> */}
        </nav>
        <footer className="p-4 text-center text-sm border-t border-[#00482f]">
          © 2024 YourApp
        </footer>
      </aside>
    );
  };
  
  export default UserSidebar;
  