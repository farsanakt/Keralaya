import { Route,Routes } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";
import UserList from "../pages/admin/UserList";




const AdminRoutes = () => {
    console.log('kkkkkllllpppp');
    
  return (

    <div>
      <Routes>
        <Route path="/" element={<AdminLogin/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/userlist" element={<UserList/>} />
      </Routes>
    </div>
  )
}

export default AdminRoutes
