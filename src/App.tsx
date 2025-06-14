import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store/Store'
import NotFound from './pages/NotFound';
import { useEffect, useState } from 'react';
import ProtectedRoutes from './components/ProtectedRoutes';
import Signup from './pages/Signup';
import PrivateRoutes from './components/PrivateRoutes';
import { updateUserInStoreAfterAuth } from './store/UserSlice';

function App() {
  const [currentUser, setCurrentUser] = useState<string>('')
  const IdAtLocalStorage = localStorage.getItem('IdAtLocalStorage')
  const EmailAtLocalStorage = localStorage.getItem('EmailAtLocalStorage')

  const dispatch = useDispatch<AppDispatch>()

  // After refresh get user from localstorage
  useEffect(() => {
    if (IdAtLocalStorage !== null && EmailAtLocalStorage !== null) {
      setCurrentUser(EmailAtLocalStorage)
      dispatch(updateUserInStoreAfterAuth({ 'userId': IdAtLocalStorage, 'email': EmailAtLocalStorage }))
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
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
