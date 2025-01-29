import { Route,Routes } from "react-router-dom";
import Welcome from "../pages/guide/Welcome";
import Registration from "../pages/guide/Registration";
import Dashboard from "../pages/guide/Dashboard";
import GuideLogin from "../pages/guide/GuideLogin";
import ProtectedRoute from "../service/guide/ProtectedRoutes";
import PublicRoute from "../service/guide/PublicRoute";
import Places from "@/pages/guide/Places";
import GuideProfileComponent from "@/pages/guide/Profile";

const GuideRoutes = () => {
   
    
  return (

    <div>
      <Routes>
      <Route path="/" element={<PublicRoute> <Welcome/></PublicRoute>} />

        <Route path="/login" element={<PublicRoute> <GuideLogin/></PublicRoute>} />
        <Route path="/registration" element={<PublicRoute> <Registration/></PublicRoute>} />
        

        <Route path='/dashboard' element={<ProtectedRoute element={<Dashboard/>} />} />
        <Route path='/places' element={<Places/>} />
        <Route path='/profile'  element={<GuideProfileComponent/>} />
       
      </Routes>
    </div>
  )
}

export default GuideRoutes