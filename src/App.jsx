import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './pages/Navbar';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import { useContext, useEffect } from 'react';
import authContext from './context/authContext';
import { Loader, MessageSquare } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

function App() {

  const context = useContext(authContext);
  const { authUser, isCheckingAuth, checkAuth } = context;

  useEffect(() => {
    checkAuth();
  }, [authUser]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex flex-col items-center justify-center h-screen bg-slate-800 text-4xl font-semibold text-gray-200'>
        <div><MessageSquare className="size-10 inline-block text-violet-500 bg-slate-950 p-2 rounded-lg mr-2 animate-pulse"/><span className='text-violet-500'>S</span>tream <span className='text-violet-500'>C</span>hat</div>
        <div className='mt-2 text-3xl font-light'> Loading...
          <Loader className='size-6 text-white animate-spin inline-block ml-1' />
        </div>
        <p className='font-normal text-base mt-2'>It may take sometime!</p>
      </div>
    )
  }

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </>
  )
}

export default App;