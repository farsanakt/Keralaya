import React from 'react';
import { Route,Routes } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import { ToastContainer } from 'react-toastify';
import GuideRoutes from './routes/GuideRoutes';



const App: React.FC = () => {
  console.log('kkkkkk')
  return (
    <div>
      <Routes>
        <Route path='/*' element={<UserRoutes/>} />
        <Route path='/admin/*' element={<AdminRoutes/>} />
        <Route path='/guide/*' element={<GuideRoutes/>} />
        
      </Routes>
      <ToastContainer/>
    </div>
  );
};

export default App;
