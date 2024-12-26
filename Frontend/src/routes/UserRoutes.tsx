import { Route, Routes } from "react-router-dom";
import Home from "../pages/user/Home";
import Login from "../pages/user/Login";
import Signup from "../pages/user/SignUp";
import Profile from "../pages/user/Profile";
import ProtectedRoute from "../service/user/ProtectedRoute";
import PublicRoute from "../service/user/PublicRoute";



const UserRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />
        <Route path="/signup"  element={<PublicRoute><Signup/></PublicRoute>} />
        
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
      </Routes>
    </div>
  );
};

export default UserRoutes;
