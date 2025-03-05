
import { Route, Routes } from 'react-router-dom';
import Welcome from "../pages/guide/Welcome";
import Registration from "../pages/guide/Registration";
import Dashboard from "../pages/guide/Dashboard";
import GuideLogin from "../pages/guide/GuideLogin";
import ProtectedRoute from "../service/guide/ProtectedRoutes";
import PublicRoute from "../service/guide/PublicRoute";
import Places from "@/pages/guide/Places";
import GuideProfileComponent from "@/pages/guide/Profile";
import GuideSlotCalendar from '@/pages/guide/Slot';

const GuideRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Welcome />} />
      <Route path="login" element={<PublicRoute> <GuideLogin /> </PublicRoute>} />
      <Route path="registration" element={<PublicRoute> <Registration /> </PublicRoute>} />
      
      {/* Protected Routes */}
      <Route path="dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
      <Route path="places" element={<ProtectedRoute> <Places /> </ProtectedRoute>} />
      <Route path="profile" element={<ProtectedRoute> <GuideProfileComponent /> </ProtectedRoute>} />
      <Route path='slot' element={<ProtectedRoute><GuideSlotCalendar/></ProtectedRoute>} />
      
    </Routes>
  );
};

export default GuideRoutes;
