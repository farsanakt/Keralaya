import { Route, Routes } from "react-router-dom";
import Home from "../pages/user/Home";
import Login from "../pages/user/Login";
import Signup from "../pages/user/SignUp";
import Profile from "../pages/user/Profile";
import ProtectedRoute from "../service/user/ProtectedRoute";
import PublicRoute from "../service/user/PublicRoute";
import CardComponent from "@/pages/user/SingleLocation";
import GuideList from '../pages/user/GuideList';
import GuideDetails from "@/pages/user/GuideDetails";
import BookingDetailsTable from "@/pages/user/Booking";
import Chat from "@/pages/user/Chat";




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
        <Route path="/singlelocation/:id"  element={<CardComponent/>}/>
        <Route path="/guidelist/:locationId"   element={<ProtectedRoute element={<GuideList/>}/>}/>
        <Route path="/guidedetails/:id/:locationId"   element={<ProtectedRoute element={<GuideDetails/>}/>}/>
        <Route path='/booking'element={<ProtectedRoute element={<BookingDetailsTable/>}/>}/>
        <Route path="/chat" element={<Chat />} />

        {/* <Route path='/checkout' element={</>} */}
       
      </Routes>
    </div>
  );
};

export default UserRoutes;
