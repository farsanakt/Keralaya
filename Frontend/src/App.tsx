import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import GuideRoutes from './routes/GuideRoutes';
import { ToastContainer } from 'react-toastify';
import { Toaster } from './components/ui/toaster';
// import { SocketProvider } from '@/contexts/SocketContext'; // ✅ Import SocketProvider

const App: React.FC = () => {
  console.log("🟢 Index.tsx is running...");
  return (
    // <SocketProvider> {/* ✅ Wrap App content with SocketProvider */}
      <div>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/guide/*" element={<GuideRoutes />} />
        </Routes>
        <ToastContainer />
        <Toaster />
      </div>
    // </SocketProvider>
  );
};

export default App;
