import React from 'react';
import { Route,Routes } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';



const App: React.FC = () => {
  console.log('kkkkkk')
  return (
    <div>
      <Routes>
        <Route path='/*' element={<UserRoutes/>} />
        <Route path='/admin/*' element={<AdminRoutes/>} />
        
      </Routes>
    </div>
  );
};

export default App;
