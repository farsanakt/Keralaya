import { Route,Routes } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";
import UserList from "../pages/admin/UserList";
import GuideList from "../pages/admin/GuideList";
import PlacesManagement from "@/pages/admin/PlacesManagement";

const AdminRoutes = () => {
    console.log('kkkkkllllpppp');
    
  return (

    <div>
      <Routes>
        <Route path="/" element={<AdminLogin/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/userlist" element={<UserList/>} />
        <Route path="/guidelist" element={<GuideList/>} />
        <Route path="/places/*" element={<PlacesManagement />} />
        
      </Routes>
    </div>
  )
}

export default AdminRoutes
