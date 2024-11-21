import { Route, Routes } from "react-router-dom"
import Home from "../pages/user/Home"
import Login from "../pages/user/Login"
import Signup from "../pages/user/SignUp"
import Profile from "../pages/user/Profile"

const UserRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </div>
  )
}

export default UserRoutes
