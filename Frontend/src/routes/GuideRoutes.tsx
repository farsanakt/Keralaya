import { Route,Routes } from "react-router-dom";
import Welcome from "../pages/guide/Welcome";
import Registration from "../pages/guide/Registration";
import Dashboard from "../pages/guide/dashboard";
import GuideLogin from "../pages/guide/GuideLogin";

const GuideRoutes = () => {
    console.log('kkkkkllllpppp');
    
  return (

    <div>
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/registration" element={<Registration/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/login' element={<GuideLogin/>}/>
      </Routes>
    </div>
  )
}

export default GuideRoutes