import { Route,Routes } from "react-router-dom";
import Welcome from "../pages/guide/Welcome";
import Registration from "../pages/guide/Registration";
import Dashboard from "../pages/guide/dashboard";

const GuideRoutes = () => {
    console.log('kkkkkllllpppp');
    
  return (

    <div>
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/registration" element={<Registration/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </div>
  )
}

export default GuideRoutes