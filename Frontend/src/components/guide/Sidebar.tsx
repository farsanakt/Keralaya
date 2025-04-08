
import { Home, Star, BookOpen, User, Clock, MapPin } from 'lucide-react';


// /**
//  * @typedef {Object} SidebarProps
//  * @property {string} activeSection - The currently active section
//  * @property {function} setActiveSection - Function to set the active section
//  * @property {function} navigate - Function to handle navigation
//  */

/**
 
//  * @param {SidebarProps} props
 */
const Sidebar = ({ activeSection, setActiveSection, navigate }:any) => {
 
  const menuItems = [
    { id: "Dashboard", icon: Home, action: () => setActiveSection("Dashboard") },
    { id: "Reviews", icon: Star, action: () => setActiveSection("Reviews") },
    { id: "Booking", icon: BookOpen, action: () => setActiveSection("Booking") },
    // { id: "Revenue", icon: BarChart2, action: () => setActiveSection("Revenue") },
    { id: "Profile", icon: User, action: () => navigate("/guide/profile") },
    // { id: "Transaction", icon: DollarSign, action: () => setActiveSection("Transaction") },
    { id: "Slot", icon: Clock, action: () => setActiveSection("Slot") },
    { id: "Locations", icon: MapPin, action: () => navigate("/guide/places") }
  ];

  return (
    <aside className="w-1/5 bg-white shadow-lg p-6 rounded-r-lg">
      <h1 className="text-2xl font-bold text-black mb-8 text-center">Dashboard</h1>
      <ul className="space-y-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <li 
              key={item.id}
              className={`flex items-center space-x-4 cursor-pointer p-2 rounded ${
                activeSection === item.id ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
              onClick={item.action}
            >
              <Icon className="text-xl" />
              <span className="text-lg">{item.id}</span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;