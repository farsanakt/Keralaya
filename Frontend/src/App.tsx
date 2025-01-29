import React from 'react';
import { Route,Routes } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import { ToastContainer } from 'react-toastify';
import GuideRoutes from './routes/GuideRoutes';
import { Toaster } from './components/ui/toaster';



const App: React.FC = () => {

  return (
    <div>
      <Routes>
        <Route path='/*' element={<UserRoutes/>} />
        <Route path='/admin/*' element={<AdminRoutes/>} />
        <Route path='/guide/*' element={<GuideRoutes/>} />
        
      </Routes>
      <ToastContainer/>
      <Toaster />
    </div>
  );
};

export default App;
