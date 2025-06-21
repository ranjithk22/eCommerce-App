import './App.css'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store/Store'
import { updateUserAfterAuth } from './store/UserSlice';
import PrivateRoutes from './components/PrivateRoutes';
import ProtectedRoutes from './components/ProtectedRoutes';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  const [currentUser, setCurrentUser] = useState<string>('')
  const IdAtLocalStorage = localStorage.getItem('IdAtLocalStorage')
  const EmailAtLocalStorage = localStorage.getItem('EmailAtLocalStorage')

  const dispatch = useDispatch<AppDispatch>()

  // After refresh get user from localstorage
  useEffect(() => {
    if (IdAtLocalStorage !== null && EmailAtLocalStorage !== null) {
      setCurrentUser(EmailAtLocalStorage)
      dispatch(updateUserAfterAuth({ 'userId': IdAtLocalStorage, 'email': EmailAtLocalStorage }))
    }
  }, [IdAtLocalStorage, EmailAtLocalStorage])



  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes currentUser={currentUser} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<ProtectedRoutes currentUser={currentUser} />}>
          <Route path="/" element={<Home currentUser={currentUser} />} />
          {currentUser === 'admin@test.com' && <Route path="/admin" element={<Admin />} />}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
